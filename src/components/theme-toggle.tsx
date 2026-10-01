"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-context";

/**
 * Compact light/dark switch pinned bottom-right: a white square with the sun
 * and a black square with the moon. An accent outline marks the active side.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <SwitchPrimitive.Root
      checked={dark}
      onCheckedChange={(on) => setTheme(on ? "dark" : "light")}
      aria-label="Dark mode"
      className="group fixed right-4 bottom-4 z-40 flex h-6 w-12 cursor-pointer outline-none ring-line shadow-[0_4px_14px_rgba(0,0,0,0.12)] ring-1 focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:bottom-6"
    >
      <span className="flex size-6 items-center justify-center bg-white text-black">
        <Sun size={13} strokeWidth={1.6} aria-hidden />
      </span>
      <span className="flex size-6 items-center justify-center bg-black text-white">
        <Moon size={12} strokeWidth={1.6} aria-hidden />
      </span>
      {/* Active-side marker */}
      <SwitchPrimitive.Thumb className="pointer-events-none absolute top-0 left-0 size-6 ring-[1.5px] ring-accent ring-inset transition-transform duration-300 ease-out data-[state=checked]:translate-x-6" />
    </SwitchPrimitive.Root>
  );
}
