"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useReveal } from "./reveal";

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
};

/**
 * Image frame from the prototype's `img[data-px]`:
 * clip-path wipe on enter + strong parallax (scale 1.55, ±24% travel).
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
}: MediaProps) {
  const { ref, animRef, style } = useReveal<HTMLDivElement, HTMLDivElement>("image", index);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-24%", "24%"]);
  const glide = parallax && !reduce;

  return (
    // Outer frame is observed (never clipped); the inner layer carries the wipe.
    <div ref={ref} className={cn("relative min-w-0 overflow-hidden", className)}>
      <div
        ref={animRef}
        data-reveal-image=""
        style={reveal ? style : undefined}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={glide ? { y, scale: 1.55 } : undefined}
        >
          <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
        </motion.div>
      </div>
    </div>
  );
}
