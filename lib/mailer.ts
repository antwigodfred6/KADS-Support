import "server-only";
import type { ContactInput } from "./contact-schema";

/**
 * Message delivery for the contact form.
 *
 * DELIBERATELY NOT CONNECTED. No email provider has been chosen, and no
 * recipient has been confirmed by the client (AUDIT.md §6, README "Contact
 * form"). Until then the form tells the visitor plainly that online messages
 * aren't switched on, and shows the phone number and email instead.
 * It never pretends a message was sent.
 *
 * CONTACT_DELIVERY:
 *   (unset) | "none"  → not configured: visitor sees an honest fallback
 *   "log"             → development only: logs metadata (not content) and
 *                       reports success labelled as a dev test
 *   later, e.g. "resend" / "smtp" once the client approves a provider
 */
export type DeliveryResult =
  | { ok: true; mode: "log" }
  | { ok: false; reason: "not_configured" | "failed" };

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

  return { ok: false, reason: "not_configured" };
}
