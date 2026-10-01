"use client";

import { motion, useReducedMotion } from "motion/react";
import { createContext, useContext, useState } from "react";

export const EASE_CURTAIN = [0.77, 0, 0.18, 1] as const;
export const EASE_SOFT = [0.22, 0.61, 0.36, 1] as const;
/** How long first-screen reveals wait for the curtain (ms). */
export const INTRO_MS = 700;

const IntroContext = createContext<number>(0);

/** Time (performance.now) at which the current page mounted. */
export const useIntroStart = () => useContext(IntroContext);

/**
 * Page-open curtain: a white layer lifts away, then first-screen content
 * reveals top-to-bottom. Rendered from app/template.tsx so it replays on
 * every navigation, like the prototype's full page loads.
 */
export function PageIntro({ children }: { children: React.ReactNode }) {
  const [start] = useState(() => (typeof performance === "undefined" ? 0 : performance.now()));
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  return (
    <IntroContext.Provider value={start}>
      {!done && !reduce && (
        <motion.div
          aria-hidden
          data-curtain
          className="pointer-events-none fixed inset-0 z-[9999] bg-white"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE_CURTAIN }}
          onAnimationComplete={() => setDone(true)}
        />
      )}
      {children}
    </IntroContext.Provider>
  );
}
