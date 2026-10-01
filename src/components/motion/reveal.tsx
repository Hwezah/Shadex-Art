"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { createElement, useEffect, useRef, useState, type CSSProperties } from "react";
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
  /**
   * Hold the reveal until content is ready (e.g. the photo has decoded), so a
   * wipe never opens onto an empty frame. Falls back after 2.5s in view.
   */
  ready?: boolean;
};

const READY_TIMEOUT_MS = 2500;

/*
 * Image wipe as a transform-only "mask slide": the frame layer slides in from
 * off-edge while its content slides the opposite way, so the photo appears to
 * stay still while an edge sweeps across it. Transforms run on the compositor
 * (no per-frame repaint), which avoids the flicker a full-screen clip-path
 * animation causes on some devices — especially under the glass header.
 */
const FRAME_FROM: Record<WipeDirection, string> = {
  down: "translate3d(0px,-100%,0px)",
  up: "translate3d(0px,100%,0px)",
};
const CONTENT_FROM: Record<WipeDirection, string> = {
  down: "translate3d(0px,100%,0px)",
  up: "translate3d(0px,-100%,0px)",
};
const AT_REST = "translate3d(0px,0%,0px)";
const TEXT_FROM = "translate3d(0px,24px,0px)";

/**
 * Scroll reveal ported from shadex-motion.js.
 * - text fades up 24px (1.1s), images wipe open top → bottom (1.4s)
 * - siblings stagger by `index` × 110ms (max 4)
 * - anything on screen at page open reveals after a short settle, building
 *   top-to-bottom / left-to-right by its viewport position
 * - never re-hides; skipped entirely under prefers-reduced-motion
 *
 * `ref` is observed for visibility and is never transformed itself.
 * For images, `frameRef`/`contentRef` take the two counter-moving layers.
 */
export function useReveal<T extends HTMLElement>(
  kind: Kind,
  { index = 0, direction = "down", duration, ease, ready = true }: RevealOptions = {},
) {
  const ref = useRef<T>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px", amount: 0.05 });
  const reduce = useReducedMotion();
  const introStart = useIntroStart();

  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    if (!inView || ready) return;
    const t = setTimeout(() => setTimedOut(true), READY_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [inView, ready]);
  const go = inView && (ready || timedOut);

  useEffect(() => {
    const el = ref.current;
    if (!el || !go || reduce) return;
    let delay = Math.min(index, 4) * 0.11 + (kind === "text" ? 0.08 : 0);
    const since = performance.now() - introStart;
    if (since < INTRO_MS + 600) {
      const r = el.getBoundingClientRect();
      delay =
        Math.max(0, INTRO_MS - since) / 1000 +
        Math.min(Math.max(r.top, 0) / window.innerHeight, 1) * 0.42 +
        (r.left / window.innerWidth) * 0.16;
    }
    const timing = {
      duration: duration ?? (kind === "image" ? 1.4 : 1.1),
      ease: ease ?? (kind === "image" ? EASE_CURTAIN : EASE_SOFT),
      delay,
    };
    // Explicit [from, to] keyframes: Motion can't interpolate from the
    // browser-normalised computed value when the shapes differ.
    if (kind === "text") {
      animate(el, { opacity: [0, 1], transform: [TEXT_FROM, AT_REST] }, timing);
      return;
    }
    if (frameRef.current) animate(frameRef.current, { transform: [FRAME_FROM[direction], AT_REST] }, timing);
    if (contentRef.current) animate(contentRef.current, { transform: [CONTENT_FROM[direction], AT_REST] }, timing);
  }, [go, reduce, index, kind, introStart, direction, duration, ease]);

  const hidden = !reduce;
  return {
    ref,
    frameRef,
    contentRef,
    /** Text: applied to the element itself. */
    style: hidden && kind === "text" ? ({ opacity: 0, transform: TEXT_FROM } as CSSProperties) : undefined,
    frameStyle: hidden && kind === "image" ? ({ transform: FRAME_FROM[direction] } as CSSProperties) : undefined,
    contentStyle: hidden && kind === "image" ? ({ transform: CONTENT_FROM[direction] } as CSSProperties) : undefined,
  };
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
