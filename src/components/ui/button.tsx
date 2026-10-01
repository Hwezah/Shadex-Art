import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/** Rectangular buttons; hover inverts. Use `asChild` to wrap a <Link> or <a>. */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-none font-normal [text-shadow:none] transition-colors duration-300 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-ink text-background hover:bg-accent hover:text-background",
        outline: "border border-ink text-ink hover:bg-ink hover:text-background",
        // On-photo variants keep fixed colours in both themes.
        light: "bg-white text-onyx hover:bg-onyx hover:text-white",
        "outline-light": "border border-white text-white hover:bg-white hover:text-onyx",
      },
      size: {
        sm: "px-[18px] py-[11px] text-xs",
        md: "px-[22px] py-[13px] text-[13px]",
        lg: "px-6 py-3.5 text-[13px]",
      },
      /** A button with no sibling button: 80vw wide and centred on phone portrait. */
      solo: {
        true: "max-sm:w-[80vw] max-sm:self-center",
        false: "",
      },
    },
    defaultVariants: { variant: "outline", size: "md", solo: false },
  },
);

function Button({
  className,
  variant,
  size,
  solo,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, solo, className }))} {...props} />;
}

export { Button, buttonVariants };
