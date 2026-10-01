"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMenu } from "@/context/menu-context";
import { activeNavKey, navLinks } from "@/lib/data/site";
import { serviceHref, services } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MenuOverlay } from "./menu-overlay";

/** Pages whose hero sits under a transparent header. */
const OVERLAY_PATHS = new Set(["/"]);

export function Header() {
  const pathname = usePathname();
  const active = activeNavKey(pathname);
  const overlay = OVERLAY_PATHS.has(pathname);
  const { toggle } = useMenu();

  const [pastHero, setPastHero] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [shown, setShown] = useState(false);

  // Active underline slides in after first paint.
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setShown(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight - 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overlay]);

  const solid = !overlay || pastHero || dropOpen;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 backdrop-blur-md backdrop-saturate-150 transition-[background-color,color,box-shadow] duration-[450ms] ease-out",
          solid
            ? "bg-white/96 text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : // Frosted glass over the hero: light tint + blur, hairline edge.
              "bg-white/10 text-white shadow-[0_1px_0_rgba(255,255,255,0.18)]",
        )}
      >
        <div className="shell flex items-center justify-between gap-6 py-5">
          <Logo />
          <div className="flex items-center gap-[clamp(20px,4vw,72px)]">
            <nav
              aria-label="Main"
              className="hidden items-center gap-[18px] text-[14.5px] tracking-[0.02em] nav:flex navwide:gap-[clamp(16px,3.4vw,64px)]"
            >
              {navLinks.map((l) => {
                const isActive = l.key === active;
                const hasDrop = l.key === "services";
                return (
                  <div
                    key={l.key}
                    className="relative py-2"
                    onMouseEnter={hasDrop ? () => setDropOpen(true) : undefined}
                    onMouseLeave={hasDrop ? () => setDropOpen(false) : undefined}
                    onFocus={hasDrop ? () => setDropOpen(true) : undefined}
                    onBlur={
                      hasDrop
                        ? (e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setDropOpen(false)
                        : undefined
                    }
                  >
                    <Link
                      href={l.href}
                      aria-current={isActive ? "page" : undefined}
                      aria-haspopup={hasDrop ? "true" : undefined}
                      aria-expanded={hasDrop ? dropOpen : undefined}
                      className="relative inline-flex items-center pb-1 whitespace-nowrap"
                    >
                      {l.label}
                      {hasDrop && <ChevronDown size={14} strokeWidth={1.5} className="ml-1" aria-hidden />}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-600 ease-underline",
                          isActive && shown ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                    {hasDrop && dropOpen && (
                      <div className="absolute top-full -left-5 flex min-w-60 flex-col border border-line bg-white py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={serviceHref(s.slug)}
                            onClick={() => setDropOpen(false)}
                            className="px-5 py-2.5 text-sm text-ink hover:bg-alt"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={toggle}
              aria-label="Open menu"
              className="flex size-11 cursor-pointer flex-col justify-center gap-[7px]"
            >
              <span className="block h-px w-11 bg-current" />
              <span className="block h-px w-11 bg-current" />
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay />
    </>
  );
}
