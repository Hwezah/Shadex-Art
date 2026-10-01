// Plain module (no "use client") so server components can pass these to motion components.
export const EASE_CURTAIN = [0.77, 0, 0.18, 1] as const;
export const EASE_SOFT = [0.22, 0.61, 0.36, 1] as const;
/** Gentle ease-in-out for the long hero wipes. */
export const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;
