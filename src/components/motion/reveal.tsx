"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { createElement, useEffect, useRef, type CSSProperties } from "react";
import { EASE_CURTAIN, EASE_SOFT, INTRO_MS, useIntroStart } from "./intro";

type Kind = "text" | "image";

const HIDDEN: Record<Kind, CSSProperties> = {
  text: { opacity: 0, transform: "translate3d(0,24px,0)" },
  image: { clipPath: "inset(0 0 100% 0)" },
};
const SHOWN: Record<Kind, Record<string, string | number>> = {
  text: { opacity: 1, transform: "translate3d(0,0px,0)" },
  image: { clipPath: "inset(0 0 0% 0)" },
};

/**
 * Scroll reveal ported from shadex-motion.js.
 * - text fades up 24px (1.1s), images wipe open top → bottom (1.4s)
 * - siblings stagger by `index` × 110ms (max 4)
 * - anything on screen at page open waits for the curtain, then builds
 *   top-to-bottom / left-to-right by its viewport position
 * - never re-hides; skipped entirely under prefers-reduced-motion
 */
export function useReveal<T extends HTMLElement>(kind: Kind, index = 0) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px", amount: 0.05 });
  const reduce = useReducedMotion();
  const introStart = useIntroStart();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    let delay = Math.min(index, 4) * 0.11 + (kind === "text" ? 0.08 : 0);
    const since = performance.now() - introStart;
    if (since < INTRO_MS + 600) {
      const r = el.getBoundingClientRect();
      delay =
        Math.max(0, INTRO_MS - since) / 1000 +
        Math.min(Math.max(r.top, 0) / window.innerHeight, 1) * 0.42 +
        (r.left / window.innerWidth) * 0.16;
    }
    animate(
      el,
      SHOWN[kind],
      kind === "image"
        ? { duration: 1.4, ease: EASE_CURTAIN, delay }
        : { duration: 1.1, ease: EASE_SOFT, delay },
    );
  }, [inView, reduce, index, kind, introStart]);

  return { ref, style: reduce ? undefined : HIDDEN[kind] };
}

type RevealTag = "h1" | "h2" | "h3" | "p" | "span" | "div" | "figcaption";

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  /** Position among siblings, for the 110ms stagger. */
  index?: number;
};

/** Text block that fades up into view. */
export function Reveal({ as = "div", index = 0, style, ...rest }: RevealProps) {
  const { ref, style: hidden } = useReveal<HTMLElement>("text", index);
  return createElement(as, { ...rest, ref, "data-reveal": "", style: { ...hidden, ...style } });
}
