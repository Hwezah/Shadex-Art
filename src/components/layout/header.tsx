"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useMenu } from "@/context/menu-context";
import { activeNavKey, navLinks } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MenuOverlay } from "./menu-overlay";
import { ServicesMegaMenu } from "./services-mega-menu";

/** Pages whose hero sits under a transparent header. */
const OVERLAY_PATHS = new Set(["/"]);

export function Header() {
  const pathname = usePathname();
  const active = activeNavKey(pathname);
  const overlay = OVERLAY_PATHS.has(pathname);
  const { toggle } = useMenu();

  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const megaId = useId();
  const activeService = pathname.startsWith("/services/") ? pathname.split("/")[2] : undefined;

  // Close the services panel on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setDropOpen(false);
  }

  // …and on Escape or a click outside the header.
  useEffect(() => {
    if (!dropOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setDropOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [dropOpen]);

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
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setPastHero(overlay && window.scrollY > window.innerHeight - 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overlay]);

  // transparent at the top → glass once scrolling → solid while the services panel is open.
  // Over the home hero the glass is a light tint with white text; elsewhere it follows the theme.
  const mode = dropOpen ? "solid" : !scrolled ? "clear" : overlay && !pastHero ? "glass-photo" : "glass";
  const onPhoto = overlay && !pastHero && mode !== "solid";

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-30 transition-[background-color,color,box-shadow,backdrop-filter] duration-[450ms] ease-out",
          onPhoto ? "text-white" : "text-ink",
          {
            clear: "bg-transparent shadow-none backdrop-blur-none",
            "glass-photo": "bg-white/10 shadow-[0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md backdrop-saturate-150",
            glass: "bg-background/65 shadow-[0_1px_0_var(--line)] backdrop-blur-md backdrop-saturate-150",
            solid: "bg-background shadow-[0_1px_0_var(--line)] backdrop-blur-md",
          }[mode],
        )}
      >
        <div className="shell flex items-center justify-between gap-6 py-5 phone:py-3">
          <Logo />
          <div className="flex items-center gap-[clamp(20px,4vw,72px)]">
            <nav
              aria-label="Main"
              className="hidden items-center gap-[18px] text-[14.5px] tracking-[0.02em] nav:flex navwide:gap-[clamp(16px,3.4vw,64px)]"
            >
              {navLinks.map((l) => {
                const isActive = l.key === active;
                const underline = (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-600 ease-underline",
                      isActive && shown ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                );
                const itemClass = "relative inline-flex items-center pb-1 whitespace-nowrap";
                return (
                  <div key={l.key} className="py-2">
                    {l.key === "services" ? (
                      // Services opens the mega menu instead of navigating.
                      <button
                        type="button"
                        onClick={() => setDropOpen((o) => !o)}
                        aria-expanded={dropOpen}
                        aria-controls={megaId}
                        className={cn(itemClass, "cursor-pointer tracking-[0.02em] transition-colors hover:text-accent")}
                      >
                        {l.label}
                        <ChevronDown
                          size={14}
                          strokeWidth={1.5}
                          aria-hidden
                          className={cn("ml-1 transition-transform duration-300", dropOpen && "rotate-180")}
                        />
                        {underline}
                      </button>
                    ) : (
                      <Link href={l.href} aria-current={isActive ? "page" : undefined} className={itemClass}>
                        {l.label}
                        {underline}
                      </Link>
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
        <ServicesMegaMenu open={dropOpen} onClose={() => setDropOpen(false)} activeSlug={activeService} id={megaId} />
      </header>
      <MenuOverlay />
    </>
  );
}
