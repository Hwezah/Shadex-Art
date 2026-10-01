import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/data/site";
import { BackToTop } from "./back-to-top";
import { Logo } from "./logo";

const socials = [
  { label: "Instagram", href: site.social.instagram, icon: <InstagramIcon /> },
  { label: "Facebook", href: site.social.facebook, icon: <FacebookIcon /> },
  { label: "WhatsApp", href: site.phone.whatsapp, icon: <MessageCircle size={18} strokeWidth={1.5} aria-hidden /> },
  { label: "Call", href: site.phone.tel, icon: <Phone size={18} strokeWidth={1.5} aria-hidden /> },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-white text-ink">
      <div className="shell flex flex-col gap-[clamp(40px,5vw,72px)] pt-[clamp(64px,7vw,110px)] pb-7">
        <div className="flex flex-col gap-7">
          <Logo size="footer" className="self-start max-sm:self-center" />
          <div className="h-px bg-line" />
          <div className="flex flex-wrap justify-between gap-5 text-[12.5px] max-sm:flex-col max-sm:items-center">
            <nav aria-label="Footer" className="flex flex-wrap gap-[clamp(18px,3vw,40px)] max-sm:justify-center">
              {navLinks.map((l) => (
                <Link key={l.key} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-[22px]">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-6 max-sm:items-center max-sm:text-center">
            <h2 className="text-[clamp(32px,3.4vw,52px)] leading-[1.15] font-light">
              Ready to change a room?
              <br />
              Call Shadex.
            </h2>
            {/* TODO: swap for a call-back form once a submission target exists. */}
            <Button asChild variant="outline" size="sm" solo className="self-start">
              <a href={site.phone.tel}>Request a call back</a>
            </Button>
          </div>
          <div className="flex flex-col gap-3.5 text-[12.5px] leading-[1.7] tracking-[0.04em] max-sm:items-center">
            <a href={site.phone.whatsapp} className="self-start border-b border-ink whitespace-nowrap max-sm:self-center">
              WHATSAPP US
            </a>
            <a href={site.phone.tel} className="self-start whitespace-nowrap max-sm:self-center">
              {site.phone.display}
            </a>
            <span className="whitespace-nowrap uppercase">{site.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-muted max-sm:flex-col">
          <BackToTop />
          <span>© {new Date().getFullYear()} Shadex Art &amp; Interior Design</span>
        </div>
      </div>
    </footer>
  );
}
