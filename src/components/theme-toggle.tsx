"use client";

import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/theme-context";

/** Small light/dark switch pinned to the bottom-right of every page. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className="fixed right-4 bottom-4 z-40 flex items-center gap-2 border border-line bg-background/80 px-2.5 py-2 text-ink shadow-[0_6px_20px_rgba(0,0,0,0.08)] backdrop-blur-md sm:right-6 sm:bottom-6">
      <Sun size={14} strokeWidth={1.5} aria-hidden className={dark ? "opacity-40" : ""} />
      <Switch
        checked={dark}
        onCheckedChange={(on) => setTheme(on ? "dark" : "light")}
        aria-label="Dark mode"
      />
      <Moon size={14} strokeWidth={1.5} aria-hidden className={dark ? "" : "opacity-40"} />
    </div>
  );
}
