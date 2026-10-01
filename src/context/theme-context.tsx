"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const EVENT = "shadex:theme";

/**
 * Runs in <head> before first paint: applies the saved theme so a dark-mode
 * visitor never sees a white flash. Light is the default.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

// The DOM attribute is the source of truth (the head script sets it before React loads).
const read = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

type ThemeContextValue = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);
  const toggle = useCallback(() => setTheme(read() === "dark" ? "light" : "dark"), [setTheme]);

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
