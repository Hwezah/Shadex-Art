import { z } from "zod";
import { services } from "@/lib/data/services";
import { site } from "@/lib/data/site";

/** Options shown on the contact form. Values are what gets submitted. */
export const serviceOptions = [...services.map((s) => ({ value: s.slug, label: s.title })), { value: "not-sure", label: "Not sure yet" }];
export const projectTypes = ["Home", "Apartment", "Office", "Shop / restaurant", "Other"] as const;
export const timelines = ["As soon as possible", "Within 1–3 months", "Just planning"] as const;
export const contactMethods = ["WhatsApp", "Phone call", "Email"] as const;

const serviceValues = serviceOptions.map((s) => s.value) as [string, ...string[]];

export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please tell us your name.").max(80),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{9,18}$/, "Enter a phone number we can reach you on."),
    email: z.union([z.literal(""), z.string().trim().email("That email doesn't look right.")]),
    services: z.array(z.enum(serviceValues)).min(1, "Pick at least one — or “Not sure yet”."),
    projectType: z.enum(projectTypes, { error: "Choose a project type." }),
    area: z.string().trim().max(80).optional().default(""),
    timeline: z.enum(timelines).optional(),
    contactMethod: z.enum(contactMethods),
    message: z.string().trim().min(10, "A few words about the project helps us prepare.").max(2000),
  })
  .refine((d) => d.contactMethod !== "Email" || d.email !== "", {
    path: ["email"],
    message: "Add your email so we can reply there.",
  });

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryField = keyof Enquiry;

/** Read the raw form into the schema's shape. */
export function readEnquiry(fd: FormData) {
  return {
    name: String(fd.get("name") ?? ""),
    phone: String(fd.get("phone") ?? ""),
    email: String(fd.get("email") ?? ""),
    services: fd.getAll("services").map(String),
    projectType: String(fd.get("projectType") ?? ""),
    area: String(fd.get("area") ?? ""),
    timeline: fd.get("timeline") ? String(fd.get("timeline")) : undefined,
    contactMethod: String(fd.get("contactMethod") ?? "WhatsApp"),
    message: String(fd.get("message") ?? ""),
  };
}

/** Human-readable summary, used for the email body and the WhatsApp hand-off. */
export function enquiryText(e: Partial<ReturnType<typeof readEnquiry>>) {
  const serviceLabels = (e.services ?? [])
    .map((v) => serviceOptions.find((o) => o.value === v)?.label ?? v)
    .join(", ");
  const details = [
    serviceLabels && `Services: ${serviceLabels}`,
    e.projectType && `Project: ${e.projectType}${e.area ? ` — ${e.area}` : ""}`,
    e.timeline && `Timeline: ${e.timeline}`,
    e.phone && `Phone: ${e.phone}`,
    e.email && `Email: ${e.email}`,
    e.contactMethod && `Prefers: ${e.contactMethod}`,
  ].filter((l): l is string => !!l);
  return [`Hello Shadex Studio! New enquiry from ${e.name || "the website"}.`, "", ...details, "", e.message ?? ""]
    .join("\n")
    .trim();
}

/** wa.me link with the enquiry pre-filled. */
export function whatsappEnquiryHref(e: Partial<ReturnType<typeof readEnquiry>>) {
  const base = site.phone.whatsapp.split("?")[0];
  return `${base}?text=${encodeURIComponent(enquiryText(e))}`;
}

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EnquiryField, string>>; values: ReturnType<typeof readEnquiry> }
  | { status: "sent"; name: string }
  /** Email isn't configured (or failed): hand the enquiry to WhatsApp instead. */
  | { status: "handoff"; name: string; whatsapp: string; reason: "not-configured" | "failed" };
