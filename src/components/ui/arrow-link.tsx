import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** "Contact us →" style text link. `underline` draws a 1px rule under the label only. */
export function ArrowLink({
  href,
  children,
  underline = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  underline?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 self-start text-sm font-normal max-sm:self-center", className)}
    >
      <span className={cn(underline && "border-b border-current pb-[3px]")}>{children}</span>
      <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
    </Link>
  );
}
