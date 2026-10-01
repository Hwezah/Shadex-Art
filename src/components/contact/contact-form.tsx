"use client";

import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useRef, useState } from "react";
import { sendEnquiry } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Chip, FieldError, Input, Label, Textarea } from "@/components/ui/field";
import {
  contactMethods,
  projectTypes,
  readEnquiry,
  serviceOptions,
  timelines,
  whatsappEnquiryHref,
  type EnquiryField,
  type EnquiryState,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type Prefill = { service?: string; intent?: string };

/** Reads ?service= / ?intent= so CTAs can pre-select the form. */
export function ContactFormFromParams() {
  const params = useSearchParams();
  return <ContactForm prefill={{ service: params.get("service") ?? undefined, intent: params.get("intent") ?? undefined }} />;
}

const MESSAGE_MAX = 2000;

export function ContactForm({ prefill = {} }: { prefill?: Prefill }) {
  const [state, formAction, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  // Fields edited since the last submit: hide their stale server errors.
  const [edited, setEdited] = useState<Set<EnquiryField>>(new Set());
  const callback = prefill.intent === "callback";
  const callbackMessage = callback ? "Please call me back to talk about a project." : undefined;
  const [messageLength, setMessageLength] = useState(callbackMessage?.length ?? 0);

  const errors = state.status === "invalid" ? state.errors : {};
  const values = state.status === "invalid" ? state.values : undefined;
  const err = (f: EnquiryField) => (edited.has(f) ? undefined : errors[f]);
  const touch = (f: EnquiryField) => () =>
    setEdited((s) => (s.has(f) ? s : new Set(s).add(f)));

  const defaults = {
    services: values?.services ?? (prefill.service ? [prefill.service] : []),
    projectType: values?.projectType,
    timeline: values?.timeline,
    contactMethod: values?.contactMethod ?? (callback ? "Phone call" : "WhatsApp"),
  };

  if (state.status === "sent") {
    return (
      <Outcome
        title={`Thank you${state.name ? `, ${state.name}` : ""}.`}
        body="Your enquiry is with the studio. We usually reply within one working day to arrange a site visit."
        onReset={() => location.reload()}
      />
    );
  }

  if (state.status === "handoff") {
    return (
      <Outcome
        title={`Almost there${state.name ? `, ${state.name}` : ""}.`}
        body={
          state.reason === "failed"
            ? "We couldn't send your enquiry by email just now. Tap below to send it on WhatsApp instead — everything you wrote is already filled in."
            : "Tap below to send your enquiry on WhatsApp — everything you wrote is already filled in."
        }
      >
        <Button asChild variant="solid" size="lg" solo className="self-start">
          <a href={state.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} strokeWidth={1.5} aria-hidden /> Send on WhatsApp
          </a>
        </Button>
      </Outcome>
    );
  }

  const openWhatsApp = () => {
    if (!formRef.current) return;
    window.open(whatsappEnquiryHref(readEnquiry(new FormData(formRef.current))), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(e) => {
        // Call the action directly so React doesn't reset the form: typed
        // values stay put if validation sends errors back. (Without JS the
        // plain `action` above still works.)
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setEdited(new Set());
        startTransition(() => formAction(fd));
      }}
      noValidate
      className="flex flex-col gap-9"
    >
      {/* Honeypot (hidden from people and assistive tech). */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-9 md:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={err("name")} required>
          <Input id="name" name="name" autoComplete="name" required defaultValue={values?.name} onChange={touch("name")} aria-invalid={!!err("name")} aria-describedby="name-error" placeholder="Full name" />
        </Field>
        <Field label="Phone" htmlFor="phone" error={err("phone")} required>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required defaultValue={values?.phone} onChange={touch("phone")} aria-invalid={!!err("phone")} aria-describedby="phone-error" placeholder="07xx xxx xxx" />
        </Field>
        <Field label="Email" htmlFor="email" error={err("email")} hint="Optional">
          <Input id="email" name="email" type="email" autoComplete="email" defaultValue={values?.email} onChange={touch("email")} aria-invalid={!!err("email")} aria-describedby="email-error" placeholder="you@example.com" />
        </Field>
        <Field label="Area" htmlFor="area" hint="Optional">
          <Input id="area" name="area" autoComplete="address-level2" defaultValue={values?.area} placeholder="e.g. Naalya, Kira, Ntinda" />
        </Field>
      </div>

      <ChoiceGroup legend="What do you need?" error={err("services")} id="services">
        {serviceOptions.map((o) => (
          <Chip key={o.value} type="checkbox" name="services" value={o.value} defaultChecked={defaults.services.includes(o.value)} onChange={touch("services")}>
            {o.label}
          </Chip>
        ))}
      </ChoiceGroup>

      <ChoiceGroup legend="Type of space" error={err("projectType")} id="projectType">
        {projectTypes.map((t) => (
          <Chip key={t} type="radio" name="projectType" value={t} defaultChecked={defaults.projectType === t} onChange={touch("projectType")}>
            {t}
          </Chip>
        ))}
      </ChoiceGroup>

      <ChoiceGroup legend="Timeline" hint="Optional" id="timeline">
        {timelines.map((t) => (
          <Chip key={t} type="radio" name="timeline" value={t} defaultChecked={defaults.timeline === t}>
            {t}
          </Chip>
        ))}
      </ChoiceGroup>

      <Field label="About the project" htmlFor="message" error={err("message")} required>
        <Textarea
          id="message"
          name="message"
          required
          maxLength={MESSAGE_MAX}
          defaultValue={values?.message ?? callbackMessage}
          onChange={(e) => {
            touch("message")();
            setMessageLength(e.currentTarget.value.length);
          }}
          aria-invalid={!!err("message")}
          aria-describedby="message-error"
          placeholder="Rooms, sizes, the look you're after, anything that helps."
        />
        <span className="self-end text-[11px] text-muted tabular-nums">
          {messageLength}/{MESSAGE_MAX}
        </span>
      </Field>

      <ChoiceGroup legend="Best way to reach you" error={err("contactMethod")} id="contactMethod">
        {contactMethods.map((m) => (
          <Chip key={m} type="radio" name="contactMethod" value={m} defaultChecked={defaults.contactMethod === m} onChange={touch("email")}>
            {m}
          </Chip>
        ))}
      </ChoiceGroup>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-8 max-sm:flex-col">
        <Button type="submit" variant="solid" size="lg" solo disabled={pending}>
          {pending ? "Sending…" : "Send enquiry"}
          {!pending && <ArrowRight size={15} strokeWidth={1.5} aria-hidden />}
        </Button>
        <button
          type="button"
          onClick={openWhatsApp}
          className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-body transition-colors hover:text-accent"
        >
          <MessageCircle size={15} strokeWidth={1.5} aria-hidden />
          <span className="border-b border-current pb-0.5">Prefer WhatsApp? Send it there</span>
        </button>
      </div>
      {state.status === "invalid" && edited.size === 0 && (
        <p role="status" className="-mt-4 text-[13px] text-destructive max-sm:text-center">
          A few details need attention — see the highlighted fields.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-accent"> *</span>}
        </Label>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
      <FieldError id={`${htmlFor}-error`}>{error}</FieldError>
    </div>
  );
}

function ChoiceGroup({
  legend,
  hint,
  error,
  id,
  children,
}: {
  legend: string;
  hint?: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined} className="flex flex-col gap-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <legend className="text-[11px] tracking-[0.2em] text-muted uppercase">{legend}</legend>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      <div className={cn("flex flex-wrap gap-2", error && "[&_span]:border-destructive/60")}>{children}</div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </fieldset>
  );
}

function Outcome({
  title,
  body,
  onReset,
  children,
}: {
  title: string;
  body: string;
  onReset?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div role="status" className="flex flex-col gap-5 py-6 max-sm:items-center max-sm:text-center">
      <span className="flex size-11 items-center justify-center border border-ink">
        <Check size={20} strokeWidth={1.5} aria-hidden />
      </span>
      <h2 className="text-[clamp(26px,2.6vw,36px)] leading-[1.25]">{title}</h2>
      <p className="max-w-[460px] text-[15px] leading-[1.75] text-body">{body}</p>
      {children}
      {onReset && (
        <button type="button" onClick={onReset} className="cursor-pointer self-start text-[13px] text-body underline-offset-4 hover:underline max-sm:self-center">
          Send another enquiry
        </button>
      )}
    </div>
  );
}
