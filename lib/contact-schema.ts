import { z } from "zod";
import { enquiryTypes } from "@/content/contact";

const enquiryValues = enquiryTypes.map((e) => e.value) as [string, ...string[]];

/** Shared by the browser (instant feedback) and the server (source of truth). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100, "Name must be 100 characters or fewer"),
  email: z.string().trim().max(200, "Email must be 200 characters or fewer").pipe(z.email("Enter an email address in the correct format, like name@example.com")),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or fewer")
    .refine((v) => v === "" || /^[0-9+()\-\s]{7,}$/.test(v), "Enter a phone number, like 020 3657 5651, or leave this blank"),
  enquiryType: z.enum(enquiryValues, { error: "Choose what your enquiry is about" }),
  message: z.string().trim().min(10, "Enter a message of at least 10 characters").max(3000, "Message must be 3,000 characters or fewer"),
  consent: z.literal("yes", { error: "Confirm that we can use your details to reply to you" }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

/** Order used for the error summary (matches the visual order of the form). */
export const fieldOrder: ContactField[] = ["name", "email", "phone", "enquiryType", "message", "consent"];

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the user doesn't lose what they typed */
  values?: Partial<Record<ContactField, string>>;
  /** True when the dev-only "log" mode handled the message (nothing was sent) */
  testOnly?: boolean;
  /** Changes on every response so the form can re-mount with fresh defaults */
  nonce?: number;
};

export function readForm(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    enquiryType: get("enquiryType"),
    message: get("message"),
    consent: get("consent"),
  };
}

export function flattenErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const out: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
