"use server";

import { enquirySchema, enquiryText, readEnquiry, whatsappEnquiryHref, type EnquiryField, type EnquiryState } from "@/lib/contact";

/**
 * Contact form submission.
 *
 * Sends the enquiry by email through Resend when these env vars are set
 * (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      — from resend.com
 *   CONTACT_TO_EMAIL    — inbox that receives enquiries
 *   CONTACT_FROM_EMAIL  — optional verified sender, e.g. "Shadex Website <hello@shadex.co.ug>"
 *
 * Without them (or if sending fails) the visitor is handed to WhatsApp with
 * the whole enquiry pre-filled, so no lead is lost.
 */
export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("company_website") ?? "") !== "") return { status: "sent", name: "" };

  const raw = readEnquiry(formData);
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<EnquiryField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as EnquiryField;
      errors[key] ??= issue.message;
    }
    return { status: "invalid", errors, values: raw };
  }

  const data = parsed.data;
  const firstName = data.name.split(/\s+/)[0];
  const handoff = (reason: "not-configured" | "failed"): EnquiryState => ({
    status: "handoff",
    name: firstName,
    whatsapp: whatsappEnquiryHref(data),
    reason,
  });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return handoff("not-configured");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Shadex Website <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email || undefined,
        subject: `New enquiry — ${data.name} (${data.projectType})`,
        text: enquiryText(data),
      }),
    });
    if (!res.ok) {
      console.error("Contact email failed", res.status, await res.text());
      return handoff("failed");
    }
  } catch (err) {
    console.error("Contact email failed", err);
    return handoff("failed");
  }

  return { status: "sent", name: firstName };
}
