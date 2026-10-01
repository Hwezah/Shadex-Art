"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { createElement, useEffect, useRef, type CSSProperties } from "react";
import { EASE_CURTAIN, EASE_SOFT } from "./easing";
import { INTRO_MS, useIntroStart } from "./intro";

type Kind = "text" | "image";

/** Which way an image wipe travels: "down" opens top → bottom, "up" bottom → top. */
export type WipeDirection = "down" | "up";

export type RevealOptions = {
  /** Position among siblings, for the 110ms stagger. */
  index?: number;
  direction?: WipeDirection;
  /** Seconds. Defaults: 1.4 image, 1.1 text. */
  duration?: number;
  ease?: readonly [number, number, number, number];
};

const CLIP_HIDDEN: Record<WipeDirection, string> = {
  down: "inset(0% 0% 100% 0%)",
  up: "inset(100% 0% 0% 0%)",
};
const CLIP_SHOWN = "inset(0% 0% 0% 0%)";

function hiddenStyle(kind: Kind, direction: WipeDirection): CSSProperties {
  return kind === "image"
    ? { clipPath: CLIP_HIDDEN[direction] }
    : { opacity: 0, transform: "translate3d(0px,24px,0px)" };
}

// Explicit [from, to] keyframes with identical structure. Without a `from`,
// Motion reads the browser-normalised value (e.g. "inset(0px 0px 100%)"),
// can't interpolate it against the target, and the frame never opens.
function keyframes(kind: Kind, direction: WipeDirection): Record<string, (string | number)[]> {
  return kind === "image"
    ? { clipPath: [CLIP_HIDDEN[direction], CLIP_SHOWN] }
    : { opacity: [0, 1], transform: ["translate3d(0px,24px,0px)", "translate3d(0px,0px,0px)"] };
}

/**
 * Scroll reveal ported from shadex-motion.js.
 * - text fades up 24px (1.1s), images wipe open top → bottom (1.4s)
 * - siblings stagger by `index` × 110ms (max 4)
 * - anything on screen at page open reveals after a short settle, building
 *   top-to-bottom / left-to-right by its viewport position
 * - never re-hides; skipped entirely under prefers-reduced-motion
 */
export function useReveal<T extends HTMLElement, A extends HTMLElement = T>(
  kind: Kind,
  { index = 0, direction = "down", duration, ease }: RevealOptions = {},
) {
  /** Observed for visibility. Must not carry the hidden clip-path itself:
   *  IntersectionObserver honours the target's own clip-path, so a fully
   *  clipped element never reports as in view. */
  const ref = useRef<T>(null);
  /** Optional separate element that receives the animation (and `style`). */
  const animRef = useRef<A>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px", amount: 0.05 });
  const reduce = useReducedMotion();
  const introStart = useIntroStart();

  useEffect(() => {
    const el = animRef.current ?? ref.current;
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
    animate(el, keyframes(kind, direction), {
      duration: duration ?? (kind === "image" ? 1.4 : 1.1),
      ease: ease ?? (kind === "image" ? EASE_CURTAIN : EASE_SOFT),
      delay,
    });
  }, [inView, reduce, index, kind, introStart, direction, duration, ease]);

  return { ref, animRef, style: reduce ? undefined : hiddenStyle(kind, direction) };
}

type RevealTag = "h1" | "h2" | "h3" | "p" | "span" | "div" | "figcaption";

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  /** Position among siblings, for the 110ms stagger. */
  index?: number;
};

/** Text block that fades up into view. */
export function Reveal({ as = "div", index = 0, style, ...rest }: RevealProps) {
  const { ref, style: hidden } = useReveal<HTMLElement>("text", { index });
  return createElement(as, { ...rest, ref, "data-reveal": "", style: { ...hidden, ...style } });
}
