"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { cn } from "cn";
import { submitEnquiry } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { enquiryTypes } from "@/content/contact";
import { site } from "@/content/site";
import {
  contactSchema,
  fieldOrder,
  flattenErrors,
  readForm,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact-schema";
import { routes } from "@/lib/routes";

const initialState: ContactFormState = { status: "idle" };

const fieldLabels: Record<ContactField, string> = {
  name: "Full name",
  email: "Email address",
  phone: "Phone number",
  enquiryType: "What is your enquiry about?",
  message: "Your message",
  consent: "Consent",
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [clientErrors, setClientErrors] = useState<Partial<Record<ContactField, string>> | null>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const [enquiry, setEnquiry] = useState<string>(state.values?.enquiryType ?? "");
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Time the form was shown (used by the server's anti-spam check)
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, [state.nonce]);

  const errors = clientErrors ?? state.fieldErrors ?? {};
  const errorList = fieldOrder.filter((f) => errors[f]);

  // Move focus to the summary or status message so screen-reader and keyboard users hear the result
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.fieldErrors && Object.keys(state.fieldErrors).length) summaryRef.current?.focus();
    else statusRef.current?.focus();
  }, [state]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const parsed = contactSchema.safeParse(readForm(new FormData(e.currentTarget)));
    if (!parsed.success) {
      e.preventDefault();
      setClientErrors(flattenErrors(parsed.error));
      setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    setClientErrors(null);
  }

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-(--radius-card) border border-teal-600/30 bg-mist p-8 focus:outline-none md:p-10">
        <CheckCircle2 aria-hidden="true" className="size-10 text-teal-600" strokeWidth={1.75} />
        <h3 className="mt-5 text-h3">{state.testOnly ? "Test complete: not sent" : "Message sent"}</h3>
        <p className="mt-3 text-lead text-slate">{state.message}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const hint = enquiryTypes.find((t) => t.value === enquiry)?.hint;

  return (
    <form key={state.nonce ?? 0} action={formAction} onSubmit={onSubmit} noValidate aria-describedby="form-intro" className="space-y-7">
      <p id="form-intro" className="text-slate">
        All fields are required unless marked optional.
      </p>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="error-summary-title" className="rounded-(--radius-card) border-2 border-destructive bg-white p-6 focus:outline-none">
          <h3 id="error-summary-title" className="flex items-center gap-2 font-display text-lg font-bold text-destructive">
            <AlertCircle aria-hidden="true" className="size-5" />
            There is a problem
          </h3>
          <ul className="mt-3 space-y-1">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#field-${f}`} className="font-medium text-destructive underline underline-offset-4">
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.status === "error" && !state.fieldErrors && state.message && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-(--radius-card) border-2 border-orange-700/60 bg-orange-100 p-6 focus:outline-none">
          <p className="flex items-start gap-2 font-medium text-ink">
            <AlertCircle aria-hidden="true" className="mt-1 size-5 shrink-0 text-orange-700" />
            {state.message}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
            <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline underline-offset-4">
              <Phone aria-hidden="true" className="size-4" />
              {site.phone.display}
            </a>
            <a href={site.email.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline underline-offset-4">
              <Mail aria-hidden="true" className="size-4" />
              {site.email.display}
            </a>
          </div>
        </div>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="name" label={fieldLabels.name} error={errors.name}>
          <Input id="field-name" name="name" autoComplete="name" defaultValue={v.name} aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field id="email" label={fieldLabels.email} error={errors.email}>
          <Input id="field-email" name="email" type="email" autoComplete="email" inputMode="email" spellCheck={false} defaultValue={v.email} aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
      </div>

      <Field id="phone" label={fieldLabels.phone} optional error={errors.phone}>
        <Input id="field-phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className="sm:max-w-sm" aria-invalid={!!errors.phone || undefined} aria-describedby={errors.phone ? "phone-error" : undefined} />
      </Field>

      <fieldset id="field-enquiryType" tabIndex={-1} aria-describedby={[errors.enquiryType ? "enquiryType-error" : "", hint ? "enquiry-hint" : ""].filter(Boolean).join(" ") || undefined} className="focus:outline-none">
        <legend className="font-display font-semibold text-ink">{fieldLabels.enquiryType}</legend>
        {errors.enquiryType && <ErrorText id="enquiryType-error">{errors.enquiryType}</ErrorText>}
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {enquiryTypes.map((t) => (
            <label
              key={t.value}
              className="flex min-h-14 cursor-pointer items-center gap-3 rounded-(--radius-field) border border-input bg-white px-4 py-3 transition-colors hover:border-ink/60 has-checked:border-teal-600 has-checked:bg-mist has-focus-visible:ring-4 has-focus-visible:ring-teal-600/25"
            >
              <input
                type="radio"
                name="enquiryType"
                value={t.value}
                defaultChecked={v.enquiryType === t.value}
                onChange={(e) => setEnquiry(e.target.value)}
                className="size-5 shrink-0 accent-teal-600 focus-visible:outline-none"
              />
              <span className="text-[0.95rem] font-medium text-ink">{t.label}</span>
            </label>
          ))}
        </div>
        <p id="enquiry-hint" aria-live="polite" className={cn("mt-3 text-[0.95rem] text-slate", !hint && "sr-only")}>
          {hint}
        </p>
      </fieldset>

      <Field id="message" label={fieldLabels.message} error={errors.message}>
        <Textarea id="field-message" name="message" rows={6} maxLength={3000} defaultValue={v.message} aria-invalid={!!errors.message || undefined} aria-describedby={errors.message ? "message-error" : undefined} />
      </Field>

      <div>
        {errors.consent && <ErrorText id="consent-error">{errors.consent}</ErrorText>}
        <label className="mt-1 flex cursor-pointer items-start gap-3">
          <input
            id="field-consent"
            type="checkbox"
            name="consent"
            value="yes"
            aria-invalid={!!errors.consent || undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-teal-600"
          />
          <span className="text-slate">
            I agree to KADS Support using these details to respond to my enquiry, as explained in the{" "}
            <Link href={routes.privacy} className="font-semibold text-teal-600 underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
      </div>

      {/* Anti-spam: hidden from people and assistive tech; bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="started_at" defaultValue="" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
          {pending ? <Loader2 aria-hidden="true" className="animate-spin" /> : <Send aria-hidden="true" />}
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p aria-live="polite" className="text-sm text-slate">
          {pending ? "Sending your message, please wait." : ""}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="font-display font-semibold text-ink">
        {label}
        {optional && <span className="ml-1.5 font-sans font-normal text-slate">(optional)</span>}
      </label>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[0.95rem] font-medium text-destructive">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      <span>
        <span className="sr-only">Error: </span>
        {children}
      </span>
    </p>
  );
}
