"use client";

import { createContext, useContext, useState } from "react";

export const EASE_CURTAIN = [0.77, 0, 0.18, 1] as const;
export const EASE_SOFT = [0.22, 0.61, 0.36, 1] as const;
/** Short settle before first-screen reveals start (ms). */
export const INTRO_MS = 250;

const IntroContext = createContext<number>(0);

/** Time (performance.now) at which the current page mounted. */
export const useIntroStart = () => useContext(IntroContext);

/**
 * Records when the page mounted so content already on screen reveals
 * top-to-bottom / left-to-right in sequence. Rendered from app/template.tsx
 * so it resets on every navigation.
 */
export function PageIntro({ children }: { children: React.ReactNode }) {
  const [start] = useState(() => (typeof performance === "undefined" ? 0 : performance.now()));
  return <IntroContext.Provider value={start}>{children}</IntroContext.Provider>;
}
