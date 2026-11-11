"use server";

import { headers } from "next/headers";
import { contactSchema, flattenErrors, readForm, type ContactFormState } from "@/lib/contact-schema";
import { deliverEnquiry } from "@/lib/mailer";

/*
 * Anti-spam (no third-party service yet):
 *  1. Honeypot field ("company_website"): hidden from people, bots fill it
 *  2. Minimum fill time: a form submitted < 3s after render is treated as automated
 *  3. Basic per-IP rate limit (in-memory, per server instance)
 * Recommended before launch: Cloudflare Turnstile (free) once keys exist.
 */
const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function submitEnquiry(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const nonce = Date.now();
  const raw = readForm(formData);
  const values = { ...raw, consent: undefined };

  // Honeypot or too-fast: respond neutrally without delivering anything.
  const honeypot = formData.get("company_website");
  const startedAt = Number(formData.get("started_at"));
  if ((typeof honeypot === "string" && honeypot.length > 0) || !Number.isFinite(startedAt) || nonce - startedAt < MIN_FILL_MS) {
    return {
      status: "error",
      nonce,
      values,
      message: "Sorry, we couldn't send that. Please wait a moment and try again, or call or email us.",
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      nonce,
      values,
      message: "You've sent several messages in a short time. Please try again later, or call or email us.",
    };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", nonce, values, fieldErrors: flattenErrors(parsed.error), message: "There is a problem with your message" };
  }

  const result = await deliverEnquiry(parsed.data);
  if (result.ok) {
    return {
      status: "success",
      nonce,
      testOnly: result.mode === "log",
      message:
        result.mode === "log"
          ? "Development test only: your message was checked but NOT sent to anyone (CONTACT_DELIVERY=log)."
          : "Thank you. Your message has been sent and our team will reply as soon as we can.",
    };
  }

  return {
    status: "error",
    nonce,
    values,
    message:
      result.reason === "not_configured"
        ? "Our online form isn't switched on yet, so your message has not been sent. Please call or email us instead. We'd like to hear from you."
        : "Sorry, something went wrong and your message has not been sent. Please call or email us instead.",
  };
}
