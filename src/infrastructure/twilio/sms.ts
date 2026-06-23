import twilio from "twilio";
import { serverEnv } from "@/lib/env";

// ─── Twilio SMS (infrastructure) ────────────────────────────
// Outbound send + inbound webhook signature validation. Both degrade
// gracefully when unconfigured so the rest of the flow (DB write, email,
// dashboard) still works during setup.
//
// Real-world note (see research): unregistered US A2P traffic is BLOCKED,
// not throttled. Trial accounts send only to Verified Caller IDs with a
// trial prefix. None of that is enforceable here — it's an account concern.

function client() {
  const sid = serverEnv.TWILIO_ACCOUNT_SID;
  const token = serverEnv.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  return twilio(sid, token);
}

export interface SendSmsArgs {
  to: string;
  body: string;
}

/**
 * Send an SMS. Returns the message SID, or null if Twilio isn't configured
 * or the send failed (logged). Never throws — the lead flow must continue.
 */
export async function sendSms({ to, body }: SendSmsArgs): Promise<string | null> {
  const c = client();
  const from = serverEnv.TWILIO_FROM_NUMBER;
  if (!c || !from) {
    console.warn("[twilio] not configured — skipping SMS send.");
    return null;
  }
  try {
    const msg = await c.messages.create({ to, from, body });
    return msg.sid;
  } catch (err) {
    console.error("[twilio] sendSms failed:", err);
    return null;
  }
}

/**
 * Validate an inbound Twilio webhook signature.
 *
 * Twilio signs each request (X-Twilio-Signature) as an HMAC-SHA1 of the full
 * public URL + sorted POST params, keyed by the Auth Token. `url` must be the
 * exact externally-visible https URL Twilio called (mind proxy/SSL
 * termination on Vercel). Fails CLOSED: if the token is unset we reject.
 */
export function validateTwilioSignature(
  signature: string | null,
  url: string,
  params: Record<string, string>,
): boolean {
  const token = serverEnv.TWILIO_AUTH_TOKEN;
  if (!token || !signature) return false;
  return twilio.validateRequest(token, signature, url, params);
}

/** Wrap a reply string in TwiML for an inbound webhook response. */
export function twimlMessage(body: string): string {
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escaped}</Message></Response>`;
}

/** Empty TwiML — acknowledge the webhook without auto-replying. */
export function twimlEmpty(): string {
  return `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;
}
