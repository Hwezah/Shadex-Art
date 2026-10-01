"use client";

import { useState } from "react";
import { EASE_SMOOTH } from "@/components/motion/easing";
import { Media } from "@/components/motion/media";
import { pexels } from "@/lib/images";

const HERO_WIPE = { duration: 2.2, ease: EASE_SMOOTH };

/**
 * Studio hero imagery. On first load a finished apartment rises from below
 * while the studio photo descends from above — two wipes crossing. Both wait
 * until *both* photos have decoded, so they start on the same frame.
 */
export function HeroBackdrop() {
  const [loadedCount, setLoadedCount] = useState(0);
  const onLoaded = () => setLoadedCount((n) => n + 1);
  const ready = loadedCount >= 2;

  return (
    <>
      <Media
        src={pexels(1457842)}
        className="absolute inset-0"
        sizes="100vw"
        preload
        parallax={false}
        wipe={{ direction: "up", ...HERO_WIPE }}
        ready={ready}
        onLoaded={onLoaded}
      />
      <Media
        src={pexels(10322846)}
        alt="Shadex art studio with a painting on an easel"
        className="absolute inset-0"
        sizes="100vw"
        preload
        wipe={{ direction: "down", ...HERO_WIPE }}
        ready={ready}
        onLoaded={onLoaded}
        overlay={
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,0.45)_0%,rgba(18,16,14,0)_22%),linear-gradient(90deg,rgba(18,16,14,0.78)_0%,rgba(18,16,14,0.5)_38%,rgba(18,16,14,0.08)_72%)]"
          />
        }
      />
    </>
  );
}
