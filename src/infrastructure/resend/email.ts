import { Resend } from "resend";
import { serverEnv } from "@/lib/env";

// ─── Resend email (infrastructure) ──────────────────────────
// Instant confirmation email alongside the SMS. Degrades to a no-op when
// unconfigured. Note: onboarding@resend.dev only delivers to your own Resend
// account email — verify a domain to email real leads (see research).

export interface SendEmailArgs {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Send a transactional email. Returns the message id, or null if Resend
 * isn't configured / the send failed (logged). Never throws.
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailArgs): Promise<string | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[resend] RESEND_API_KEY unset — skipping email send.");
    return null;
  }
  try {
    const resend = new Resend(key);
    const { data, error } = await resend.emails.send({
      from: serverEnv.RESEND_FROM,
      to,
      subject,
      text,
      ...(html ? { html } : {}),
    });
    if (error) {
      console.error("[resend] sendEmail error:", error);
      return null;
    }
    return data?.id ?? null;
  } catch (err) {
    console.error("[resend] sendEmail failed:", err);
    return null;
  }
}
