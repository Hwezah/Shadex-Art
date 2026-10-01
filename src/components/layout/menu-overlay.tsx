"use client";

import { ArrowRight, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { useMenu } from "@/context/menu-context";
import { postHref, posts } from "@/lib/data/posts";
import { footerLinks, journalLink, site } from "@/lib/data/site";
import { serviceHref, services } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] tracking-[0.22em] text-muted uppercase">{children}</span>
);

/** Full-screen menu (all breakpoints). At ≤640px it also carries the page links. */
export function MenuOverlay() {
  const { open, setOpen } = useMenu();
  const [servicesOpen, setServicesOpen] = useState(false);
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col overflow-auto bg-background text-ink"
    >
      <div className="shell flex items-center justify-between gap-6 py-5 phone:py-3">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="-mr-2.5 flex size-16 cursor-pointer items-center justify-center phone:-mr-1 phone:size-11 [&>svg]:phone:size-9"
        >
          <X size={44} strokeWidth={1} aria-hidden />
        </button>
      </div>

      <div className="shell grid flex-1 grid-cols-1 content-between gap-[clamp(40px,6vw,120px)] pt-[clamp(32px,6vh,80px)] pb-[clamp(28px,4vh,48px)] md:grid-cols-2">
        <div className="flex max-w-[560px] flex-col gap-7">
          <nav
            aria-label="Mobile"
            className="flex flex-col items-start gap-4 border-b border-line pb-8 text-[32px] nav:hidden"
          >
            {footerLinks.map((l) =>
              l.key === "services" ? (
                // Services expands its list in place rather than navigating.
                <div key={l.key} className="flex flex-col items-start">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((o) => !o)}
                    aria-expanded={servicesOpen}
                    className="inline-flex cursor-pointer items-center gap-2 transition-colors hover:text-accent"
                  >
                    {l.label}
                    <ChevronDown
                      size={24}
                      strokeWidth={1}
                      aria-hidden
                      className={cn("transition-transform duration-300", servicesOpen && "rotate-180")}
                    />
                  </button>
                  {servicesOpen && (
                    <ul className="mt-3 flex flex-col gap-2.5 border-l border-line pl-4 text-lg">
                      {services.map((sv) => (
                        <li key={sv.slug}>
                          <Link href={serviceHref(sv.slug)}>{sv.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link key={l.key} href={l.href}>
                  {l.label}
                </Link>
              ),
            )}
          </nav>
          <Label>About Shadex</Label>
          <p className="text-[clamp(22px,2.4vw,34px)] leading-[1.35] text-pretty">
            An Art and Interior Design Studio in Kireka. We design and deliver complete interiors — gypsum
            ceilings and partitions, painting and finishes, artworks and décor — for homes, offices and shops across
            Kampala.
          </p>

          {/* Journal lives here rather than in the header (phones get it in the link list above). */}
          <div className="hidden flex-col gap-4 border-t border-line pt-7 nav:flex">
            <div className="flex items-baseline justify-between gap-4">
              <Label>From the Journal</Label>
              <Link href={journalLink.href} className="inline-flex items-center gap-1.5 text-[13px] font-normal">
                All articles <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
              </Link>
            </div>
            <ul className="flex flex-col">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug} className="border-b border-line last:border-b-0">
                  <Link href={postHref(p.slug)} className="group flex items-baseline justify-between gap-6 py-3">
                    <span className="text-[17px] leading-[1.35] transition-colors group-hover:text-accent">{p.title}</span>
                    <span className="shrink-0 text-[11px] tracking-[0.16em] text-muted uppercase">{p.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-8 self-end max-sm:items-center max-sm:text-center">
          <div className="flex flex-col gap-1.5 max-sm:items-center">
            <Label>Call / WhatsApp</Label>
            <a href={site.phone.tel} className="text-[clamp(28px,3vw,44px)]">
              {site.phone.display}
            </a>
          </div>
          <div className="flex flex-col gap-1.5 max-sm:items-center">
            <Label>Studio</Label>
            <span className="text-lg">{site.location}</span>
          </div>
          <div className="flex flex-col gap-1.5 max-sm:items-center">
            <Label>Services</Label>
            <span className="text-[15px] leading-[1.7] text-body-strong">
              {services.map((s) => s.title).join(" · ")}
            </span>
          </div>
          {/* Phone portrait: stacked, centred, 80vw each. */}
          <div className="flex flex-wrap gap-3 max-sm:flex-col max-sm:items-center">
            <Button asChild variant="solid" size="lg" className="max-sm:w-[80vw]">
              <WhatsAppLink>Message On WhatsApp</WhatsAppLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="max-sm:w-[80vw]">
              <a href={site.phone.tel}>Call Shadex Studio!</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
