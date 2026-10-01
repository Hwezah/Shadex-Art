"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { EASE_SOFT } from "@/components/motion/easing";
import { serviceHref, services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

/**
 * Full-width (100vw × 50vh) services panel that drops from the header.
 * Rendered inside the sticky <header>, so it sits flush under it.
 */
export function ServicesMegaMenu({
  open,
  onClose,
  activeSlug,
  id,
}: {
  open: boolean;
  onClose: () => void;
  activeSlug?: string;
  id: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dim the page below; click to close. */}
          <motion.div
            key="scrim"
            aria-hidden
            onClick={onClose}
            className="fixed inset-x-0 top-full -z-10 h-screen bg-black/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <motion.div
            key="panel"
            id={id}
            role="region"
            aria-label="Services"
            className="absolute inset-x-0 top-full h-[50vh] min-h-[380px] overflow-hidden border-t border-line bg-background text-ink shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE_SOFT }}
          >
            <div className="shell grid h-full grid-cols-1 gap-[clamp(24px,3vw,56px)] py-[clamp(24px,4vh,44px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
              <div className="hidden flex-col justify-between gap-6 lg:flex">
                <div className="flex flex-col gap-4">
                  <span className="eyebrow text-muted">Services</span>
                  <p className="text-[clamp(22px,1.9vw,30px)] leading-[1.25] text-balance">
                    Complete interiors, delivered by one team.
                  </p>
                  <p className="max-w-[300px] text-[13.5px] leading-[1.7] text-body">
                    Design, gypsum work, painting and art under one roof — planned together, finished properly.
                  </p>
                </div>
                <Link href="#contact" onClick={onClose} className="inline-flex items-center gap-2.5 self-start text-sm font-normal">
                  <span className="border-b border-current pb-[3px]">Book a site visit</span>
                  <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
                </Link>
              </div>

              <ul className="grid h-full min-h-0 grid-cols-4 gap-[clamp(12px,1.4vw,20px)]">
                {services.map((s, i) => (
                  <motion.li
                    key={s.slug}
                    className="min-h-0"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 + i * 0.06, ease: EASE_SOFT }}
                  >
                    <Link
                      href={serviceHref(s.slug)}
                      onClick={onClose}
                      aria-current={s.slug === activeSlug ? "page" : undefined}
                      className="group flex h-full flex-col gap-3"
                    >
                      <div className="relative min-h-0 flex-1 overflow-hidden bg-alt">
                        <Image
                          src={s.hero}
                          alt=""
                          fill
                          sizes="(min-width: 1001px) 18vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-[15px] font-normal",
                          s.slug === activeSlug && "text-accent",
                        )}
                      >
                        {s.title}
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          aria-hidden
                          className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </span>
                      <span className="line-clamp-2 text-[12.5px] leading-[1.6] text-body">{s.lead}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
