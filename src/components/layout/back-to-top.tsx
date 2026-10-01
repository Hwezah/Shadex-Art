"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex cursor-pointer text-ink transition-colors hover:text-accent"
    >
      <ArrowUp size={18} strokeWidth={1.5} aria-hidden />
    </button>
  );
}
