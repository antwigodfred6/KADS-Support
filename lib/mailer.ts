import "server-only";
import nodemailer from "nodemailer";
import { enquiryTypes } from "@/content/contact";
import type { ContactInput } from "./contact-schema";

/**
 * Message delivery for the contact form.
 *
 * CONTACT_DELIVERY:
 *   (unset) | "none"  → not configured: the visitor is told plainly that the
 *                       message was NOT sent and is shown the phone and email.
 *   "log"             → development only: logs metadata (never content) and
 *                       reports success labelled as a test.
 *   "zoho"            → sends through KADS Support's Zoho Mail (EU) mailbox
 *                       over authenticated SMTP. Needs the variables below;
 *                       if any is missing it behaves like "not configured".
 *
 * Zoho variables (server-side only, never NEXT_PUBLIC_):
 *   ZOHO_SMTP_USER     full mailbox address that sends the email
 *   ZOHO_SMTP_PASS     a Zoho *app-specific password* for that mailbox
 *   CONTACT_TO_EMAIL   inbox that receives enquiries (client to confirm)
 * Optional: ZOHO_SMTP_HOST (default smtp.zoho.eu), ZOHO_SMTP_PORT (465),
 *           ZOHO_SMTP_SECURE ("true"), CONTACT_REFERRAL_TO_EMAIL.
 *
 * It never pretends a message was sent.
 */
export type DeliveryResult =
  | { ok: true; mode: "log" | "zoho" }
  | { ok: false; reason: "not_configured" | "failed" };

function zohoConfig() {
  const user = process.env.ZOHO_SMTP_USER?.trim();
  const pass = process.env.ZOHO_SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!user || !pass || !to) return null;
  return {
    host: process.env.ZOHO_SMTP_HOST?.trim() || "smtp.zoho.eu",
    port: Number(process.env.ZOHO_SMTP_PORT || 465),
    secure: (process.env.ZOHO_SMTP_SECURE ?? "true") !== "false",
    user,
    pass,
    to,
    referralTo: process.env.CONTACT_REFERRAL_TO_EMAIL?.trim() || to,
  };
}

/** Strip line breaks so visitor input can never add email headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function buildEnquiryEmail(input: ContactInput) {
  const typeLabel = enquiryTypes.find((t) => t.value === input.enquiryType)?.label ?? input.enquiryType;
  const name = oneLine(input.name);
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", oneLine(input.email)],
    ["Phone", oneLine(input.phone) || "Not given"],
    ["Enquiry type", typeLabel],
  ];
  const subject = `Website enquiry: ${typeLabel} from ${name}`.slice(0, 160);
  const text = [
    "New message from the KADS Support website contact form.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    input.message,
    "",
    "The sender agreed to KADS Support using these details to respond to this enquiry.",
    "Reply to this email to answer them directly.",
  ].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#0e2a3d">
<p>New message from the KADS Support website contact form.</p>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#3d4f5c"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
<p><strong>Message:</strong></p>
<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
<p style="color:#3d4f5c;font-size:13px">The sender agreed to KADS Support using these details to respond to this enquiry. Reply to this email to answer them directly.</p>
</div>`;
  return { subject, text, html };
}

/**
 * True when the contact form can actually deliver a message. The Contact page
 * shows the form only when this is true; otherwise it shows phone and email,
 * so nobody fills in a form that can't be sent.
 */
export function isDeliveryConfigured(): boolean {
  const mode = process.env.CONTACT_DELIVERY ?? "none";
  if (mode === "log") return process.env.NODE_ENV !== "production";
  if (mode === "zoho") return zohoConfig() !== null;
  return false;
}

export async function deliverEnquiry(input: ContactInput): Promise<DeliveryResult> {
  const mode = process.env.CONTACT_DELIVERY ?? "none";

  if (mode === "log" && process.env.NODE_ENV !== "production") {
    // Never log the message body or contact details (personal data).
    console.info("[contact] dev delivery (not sent)", {
      enquiryType: input.enquiryType,
      messageLength: input.message.length,
      hasPhone: input.phone.length > 0,
    });
    return { ok: true, mode: "log" };
  }

  if (mode === "zoho") {
    const cfg = zohoConfig();
    if (!cfg) {
      console.warn("[contact] CONTACT_DELIVERY=zoho but ZOHO_SMTP_USER, ZOHO_SMTP_PASS or CONTACT_TO_EMAIL is missing");
      return { ok: false, reason: "not_configured" };
    }
    const transport = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    const { subject, text, html } = buildEnquiryEmail(input);
    try {
      await transport.sendMail({
        // Zoho only accepts mail "from" the authenticated mailbox
        from: { name: "KADS Support website", address: cfg.user },
        to: input.enquiryType === "referral" ? cfg.referralTo : cfg.to,
        replyTo: { name: oneLine(input.name), address: oneLine(input.email) },
        subject,
        text,
        html,
      });
      return { ok: true, mode: "zoho" };
    } catch (err) {
      // Log only the error type/code, never the message contents.
      const e = err as { code?: string; responseCode?: number; command?: string };
      console.error("[contact] zoho delivery failed", { code: e.code, responseCode: e.responseCode, command: e.command });
      return { ok: false, reason: "failed" };
    }
  }

  return { ok: false, reason: "not_configured" };
}
