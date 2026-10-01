import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/** Rectangular buttons; hover inverts. Use `asChild` to wrap a <Link> or <a>. */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-none font-normal transition-colors duration-300 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-ink text-white hover:bg-accent hover:text-white",
        outline: "border border-ink text-ink hover:bg-ink hover:text-white",
        light: "bg-white text-ink hover:bg-ink hover:text-white",
        "outline-light": "border border-white text-white hover:bg-white hover:text-ink",
      },
      size: {
        sm: "px-[18px] py-[11px] text-xs",
        md: "px-[22px] py-[13px] text-[13px]",
        lg: "px-6 py-3.5 text-[13px]",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
