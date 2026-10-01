import type { Metadata } from "next";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { Suspense } from "react";
import { ContactForm, ContactFormFromParams } from "@/components/contact/contact-form";
import { FacebookIcon, InstagramIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Shadex about your home, office or shop in Kampala. Free site visits, clear quotations — call, WhatsApp or send an enquiry.",
};

const steps = [
  { title: "We reply", body: "Usually within one working day, by your preferred channel." },
  { title: "Free site visit", body: "We measure, listen and talk through ideas and budget on site." },
  { title: "Clear quotation", body: "An itemised quote and timeline you can read line by line." },
];

const quick = [
  { icon: Phone, label: "Call the studio", value: site.phone.display, href: site.phone.tel },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: site.phone.whatsapp, whatsapp: true },
  { icon: MapPin, label: "Visit", value: "Kireka, Kampala", href: site.map.directions, external: true },
];

export default function ContactPage() {
  return (
    <>
      {/* Intro + quick actions */}
      <section className="shell grid grid-cols-1 items-end gap-[clamp(32px,5vw,96px)] pt-[clamp(40px,5vw,72px)] pb-[clamp(56px,7vw,100px)] md:grid-cols-2">
        <div className="flex flex-col gap-6 max-sm:items-center max-sm:text-center">
          <span className="eyebrow text-muted">Contact</span>
          <Reveal as="h1" className="text-[clamp(38px,4.4vw,64px)] leading-[1.05] tracking-[-0.015em] text-balance">
            Let&apos;s talk about your space.
          </Reveal>
          <Reveal as="p" index={1} className="max-w-[460px] text-[15px] leading-[1.75] text-pretty text-body">
            Tell us about the room, the building or the idea. We&apos;ll come back with a free site visit and a clear
            plan — whether it&apos;s one ceiling or a whole home.
          </Reveal>
        </div>
        <ul className="flex flex-col">
          {quick.map(({ icon: Icon, label, value, href, whatsapp, external }) => {
            const inner = (
              <>
                <span className="flex size-10 shrink-0 items-center justify-center border border-line-grey transition-colors group-hover:border-ink">
                  <Icon size={17} strokeWidth={1.5} aria-hidden />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[11px] tracking-[0.2em] text-muted uppercase">{label}</span>
                  <span className="text-lg font-normal">{value}</span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </>
            );
            const cls = "group flex items-center gap-5 border-b border-line py-5 first:border-t";
            return (
              <li key={label}>
                {whatsapp ? (
                  <WhatsAppLink className={cls}>{inner}</WhatsAppLink>
                ) : (
                  <a href={href} className={cls} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Form + next steps */}
      <section className="bg-alt">
        <div className="shell grid grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] py-[clamp(56px,7vw,110px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div id="enquiry" className="scroll-mt-28 bg-background p-[clamp(16px,3.4vw,56px)]">
            <div className="mb-9 flex flex-col gap-3 max-sm:items-center max-sm:text-center">
              <span className="eyebrow text-muted">Send an enquiry</span>
              <h2 className="text-[clamp(24px,2.2vw,32px)] leading-[1.25]">Tell us about your project</h2>
            </div>
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromParams />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-12 lg:sticky lg:top-[110px]">
            <div className="flex flex-col gap-6">
              <span className="eyebrow text-muted max-sm:text-center">What happens next</span>
              <ol className="flex flex-col">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-5 border-t border-line-step py-5">
                    <span className="w-[18px] shrink-0 text-[15px] text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex flex-col gap-1.5">
                      <span className="text-[15px] font-normal">{s.title}</span>
                      <span className="text-[13.5px] leading-[1.65] text-body">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line-step pt-8">
              <div className="flex flex-col gap-1.5">
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Studio</dt>
                <dd className="text-[15px]">{site.location}</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Site visits</dt>
                <dd className="text-[15px]">By appointment</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Areas</dt>
                <dd className="text-[15px]">Kampala &amp; surroundings</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">Follow</dt>
                <dd className="flex gap-4 pt-0.5">
                  <a href={site.social.instagram} aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href={site.social.facebook} aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="relative">
        <div className="h-[clamp(380px,46vw,600px)] w-full bg-alt">
          <iframe
            title="Map showing the Shadex studio in Kireka, Kampala"
            src={site.map.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0 [filter:grayscale(0.35)_contrast(1.05)] dark:[filter:invert(0.9)_hue-rotate(180deg)_grayscale(0.4)_contrast(0.95)]"
          />
        </div>
        <div className="shell pointer-events-none absolute inset-x-0 bottom-[clamp(20px,3vw,40px)] max-sm:static max-sm:pt-6 max-sm:pb-2">
          <div className="pointer-events-auto flex max-w-[380px] flex-col gap-4 bg-background p-7 shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-sm:mx-auto max-sm:max-w-none max-sm:items-center max-sm:p-0 max-sm:text-center max-sm:shadow-none">
            <span className="eyebrow text-muted">Find the studio</span>
            <p className="text-xl leading-[1.35]">Kireka, Kampala — Uganda</p>
            <p className="text-[13.5px] leading-[1.65] text-body">
              Call ahead and we&apos;ll share a pin for the exact location.
            </p>
            <Button asChild variant="outline" size="md" solo className="self-start">
              <a href={site.map.directions} target="_blank" rel="noopener noreferrer">
                Get directions <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
