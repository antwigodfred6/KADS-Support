import type { ContentStatus } from "./types";

export type Helpline = {
  name: string;
  number: string;
  href: string;
  description: string;
  status: ContentStatus;
  note?: string;
};

/**
 * Helplines. The old /contact/ page listed some outdated numbers.
 * Checked against official sites on 11 Nov 2026 (see QA_REPORT.md).
 */
export const helplines: Helpline[] = [
  {
    name: "Emergency services",
    number: "999",
    href: "tel:999",
    description: "If you or someone else is in immediate danger.",
    status: "verified",
  },
  {
    name: "NHS 111",
    number: "111",
    href: "tel:111",
    description: "Urgent medical help or advice when it isn't an emergency.",
    status: "verified",
    note: "Replaces 'NHS Direct 0845 46 47' on the old site (NHS Direct closed in 2014).",
  },
  {
    name: "Childline",
    number: "0800 1111",
    href: "tel:08001111",
    description: "Free, confidential support for children and young people.",
    status: "verified",
  },
  {
    name: "Coram Voice advocacy helpline",
    number: "0808 800 5792",
    href: "tel:08088005792",
    description: "Advocacy for children in care and care leavers.",
    status: "verified",
    note: "Old site listed 020 7833 5792. Updated from coramvoice.org.uk on 11 Nov 2026.",
  },
  {
    name: "FRANK (drugs & alcohol)",
    number: "0300 123 6600",
    href: "tel:03001236600",
    description: "Honest information about drugs, 24 hours a day. Or text 82111.",
    status: "verified",
    note: "Old site listed 0800 77 66 00. Updated from talktofrank.com on 11 Nov 2026.",
  },
];

/** From the old /contact/ FAQ, rewritten for clarity. */
export const contactFaqs: { q: string; a: string }[] = [
  {
    q: "What services do you offer?",
    a: "We provide supported accommodation, advice and support (including counselling and mentoring), and training and employment support for young people aged 16 and over.",
  },
  {
    q: "I need help. Is there someone I can talk to?",
    a: "Yes. Call us or send a message using the form on this page. If you need help urgently, use one of the helplines listed, or call 999 in an emergency.",
  },
  {
    q: "I want to get involved. How can I help?",
    a: "We'd love to hear from companies and individuals who want to help young people unlock their potential. Call us or choose 'Partnership or getting involved' in the form.",
  },
];

export const enquiryTypes = [
  {
    value: "referral",
    label: "Referral (professionals)",
    hint: "Please don't include a young person's personal details here. We'll contact you to take the referral securely.",
  },
  {
    value: "general",
    label: "General question",
    hint: "Ask us anything about our services.",
  },
  {
    value: "partnership",
    label: "Partnership or getting involved",
    hint: "Tell us about your organisation and how you'd like to help.",
  },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];
