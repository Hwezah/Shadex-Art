"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReveal, type RevealOptions } from "./reveal";

type MediaProps = {
  src: string;
  alt?: string;
  /** Sizing for the frame: an aspect-* or h-* class. The image fills it. */
  className?: string;
  sizes: string;
  preload?: boolean;
  /** Position among siblings, for the reveal stagger. */
  index?: number;
  /** Frame glides over a slower, enlarged photo. On by default. */
  parallax?: boolean;
  /** Wipe the frame open when it enters the viewport. On by default. */
  reveal?: boolean;
  /** Rendered above the photo inside the wipe, so it reveals with it (e.g. a scrim). */
  overlay?: React.ReactNode;
  /** Wipe direction and timing overrides. */
  wipe?: Omit<RevealOptions, "index" | "ready">;
  /**
   * External readiness gate (e.g. several photos that must start together).
   * Defaults to this photo having loaded and decoded.
   */
  ready?: boolean;
  /** Called once this photo has loaded and decoded. */
  onLoaded?: () => void;
};

/**
 * Image frame from the prototype's `img[data-px]`:
 * transform-based wipe on enter (after the photo decodes) + strong parallax
 * (scale 1.55, ±24% travel).
 */
export function Media({
  src,
  alt = "",
  className,
  sizes,
  preload,
  index = 0,
  parallax = true,
  reveal = true,
  overlay,
  wipe,
  ready,
  onLoaded,
}: MediaProps) {
  const [loaded, setLoaded] = useState(false);
  const reported = useRef(false);
  const { ref, frameRef, contentRef, frameStyle, contentStyle } = useReveal<HTMLDivElement>("image", {
    index,
    ...wipe,
    ready: ready ?? loaded,
  });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-24%", "24%"]);
  const glide = parallax && !reduce;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // Wait for decode so the first revealed frame is the finished photo.
    (img.decode ? img.decode() : Promise.resolve())
      .catch(() => {})
      .then(() => {
        setLoaded(true);
        if (!reported.current) {
          reported.current = true;
          onLoaded?.();
        }
      });
  };

  return (
    // Outer box is observed and clips; the frame and content layers counter-slide for the wipe.
    <div ref={ref} className={cn("relative min-w-0 overflow-hidden", className)}>
      <div
        ref={frameRef}
        data-reveal-image=""
        style={reveal ? frameStyle : undefined}
        className="absolute inset-0 overflow-hidden"
      >
        <div ref={contentRef} data-reveal-image="" style={reveal ? contentStyle : undefined} className="absolute inset-0">
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={glide ? { y, scale: 1.55 } : undefined}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              preload={preload}
              onLoad={handleLoad}
              className="object-cover"
            />
          </motion.div>
          {overlay}
        </div>
      </div>
    </div>
  );
}
