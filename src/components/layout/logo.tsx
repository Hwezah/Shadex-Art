import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Black square + stacked wordmark. SHADEX letters are spread so the word
 * spans exactly the width of "Art & Interior Design" below it.
 */
export function Logo({ size = "header", className }: { size?: "header" | "footer"; className?: string }) {
  const header = size === "header";
  return (
    <Link
      href="/"
      aria-label="Shadex Art & Interior Design — home"
      className={cn("flex items-center gap-2.5 text-current hover:text-current", className)}
    >
      <span className={cn("block flex-none bg-current", header ? "size-8" : "size-[29px]")} />
      <span className={cn("inline-flex flex-col leading-none", header ? "gap-1" : "gap-[3px]")}>
        <span className={cn("flex justify-between font-medium", header ? "text-[17px]" : "text-base")} aria-hidden>
          {"SHADEX".split("").map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </span>
        <span className={cn("font-normal tracking-[0.04em] whitespace-nowrap", header ? "text-xs" : "text-[11px]")}>
          Art &amp; Interior Design
        </span>
      </span>
    </Link>
  );
}
