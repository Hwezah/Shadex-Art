import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * shadcn-style form primitives in the Shadex idiom: no radius, hairline
 * underline fields, small uppercase labels. Errors use aria-invalid.
 */

const fieldBase =
  "w-full rounded-none border-0 border-b border-line-grey bg-transparent px-0 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink aria-invalid:border-destructive";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input data-slot="input" className={cn(fieldBase, className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(fieldBase, "min-h-32 resize-y leading-[1.7]", className)} {...props} />;
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("text-[11px] tracking-[0.2em] text-muted uppercase", className)}
      {...props}
    />
  );
}

function FieldError({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="text-[12.5px] text-destructive">
      {children}
    </p>
  );
}

/** Checkbox/radio rendered as a toggle chip. */
function Chip({
  type,
  name,
  value,
  defaultChecked,
  children,
  onChange,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: React.ReactNode;
  onChange?: () => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="inline-flex items-center border border-line-grey px-3.5 py-2 text-[13px] transition-colors select-none peer-checked:border-ink peer-checked:bg-ink peer-checked:text-background peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring hover:border-ink">
        {children}
      </span>
    </label>
  );
}

export { Chip, FieldError, Input, Label, Textarea };
