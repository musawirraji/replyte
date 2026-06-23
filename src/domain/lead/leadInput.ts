import { z } from "zod";

// ─── Enquiry form input (validation) ────────────────────────
// The single source of truth for the enquiry payload, shared by the form
// and the /api/lead route. Phone is the demo's whole point, so it's required
// and lightly normalised; email/message are optional.

export const leadInputSchema = z.object({
  slug: z.string().min(1),
  buyerName: z.string().trim().min(1, "Please enter your name").max(120),
  buyerPhone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[+0-9 ()\-]+$/, "Please enter a valid phone number"),
  buyerEmail: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

/**
 * Normalise a phone to E.164-ish for Twilio: strip spaces/punctuation, keep
 * a leading +. Assumes US (+1) when no country code is given — adequate for a
 * single-market demo; revisit for international.
 */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits.startsWith("+") ? digits : `+${digits}`;
}
