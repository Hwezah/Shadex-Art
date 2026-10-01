"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMenu } from "@/context/menu-context";
import { navLinks, site } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { Logo } from "./logo";

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] tracking-[0.22em] text-muted uppercase">{children}</span>
);

/** Full-screen menu (all breakpoints). At ≤640px it also carries the page links. */
export function MenuOverlay() {
  const { open, setOpen } = useMenu();
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col overflow-auto bg-white text-ink"
    >
      <div className="shell flex items-center justify-between gap-6 py-5">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="-mr-2.5 flex size-16 cursor-pointer items-center justify-center"
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
            {navLinks.map((l) => (
              <Link key={l.key} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Label>About Shadex</Label>
          <p className="text-[clamp(22px,2.4vw,34px)] leading-[1.35] text-pretty">
            An art and interior design studio in Kireka. We design and deliver complete interiors — gypsum
            ceilings and partitions, painting and finishes, artworks and décor — for homes, offices and shops across
            Kampala.
          </p>
        </div>

        <div className="flex flex-col gap-8 self-end">
          <div className="flex flex-col gap-1.5">
            <Label>Call / WhatsApp</Label>
            <a href={site.phone.tel} className="text-[clamp(28px,3vw,44px)]">
              {site.phone.display}
            </a>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Studio</Label>
            <span className="text-lg">{site.location}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Services</Label>
            <span className="text-[15px] leading-[1.7] text-body-strong">
              {services.map((s) => s.title).join(" · ")}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 max-sm:justify-center">
            <Button asChild variant="solid" size="lg">
              <a href={site.phone.whatsapp}>Message on WhatsApp</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.phone.tel}>Call now</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
