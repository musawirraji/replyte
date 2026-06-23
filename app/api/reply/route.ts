import { normalizePhone } from "@/domain/lead/leadInput";
import { buildQualifierSystemPrompt } from "@/domain/qualifier/systemPrompt";
import { toModelMessages, clampSms } from "@/domain/qualifier/conversation";
import {
  getLatestLeadByPhone,
  getMessages,
  insertMessage,
} from "@/infrastructure/supabase/leads";
import { getProspectById } from "@/infrastructure/supabase/prospects";
import { generateReply } from "@/infrastructure/anthropic/qualifier";
import {
  validateTwilioSignature,
  twimlMessage,
  twimlEmpty,
} from "@/infrastructure/twilio/sms";

// ─── POST /api/reply — Twilio inbound SMS webhook ───────────
// Twilio POSTs form-encoded params (From, Body, ...). We validate the
// signature (fail closed when the token is set), append the buyer's text,
// continue the qualifying conversation with Claude, log it, and reply via
// TwiML. Node runtime + force-dynamic (never cached).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function xml(body: string) {
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

export async function POST(req: Request) {
  // Twilio sends application/x-www-form-urlencoded, not JSON.
  const form = await req.formData();
  const params: Record<string, string> = {};
  for (const [k, v] of form.entries()) params[k] = String(v);

  // Validate the signature against the exact public URL Twilio called.
  // Enforce only when an auth token is configured; otherwise nothing is
  // wired and there's nothing to verify against.
  if (process.env.TWILIO_AUTH_TOKEN) {
    const signature = req.headers.get("x-twilio-signature");
    if (!validateTwilioSignature(signature, req.url, params)) {
      return new Response("Invalid signature", { status: 403 });
    }
  }

  const from = params.From ? normalizePhone(params.From) : "";
  const body = (params.Body ?? "").trim();
  if (!from || !body) return xml(twimlEmpty());

  // Find the conversation this buyer belongs to.
  const lead = await getLatestLeadByPhone(from);
  if (!lead) return xml(twimlEmpty());

  // Log the inbound buyer message.
  await insertMessage({ leadId: lead.id, role: "buyer", channel: "sms", body });

  // Continue qualifying, grounded in this prospect's listing.
  const prospect = await getProspectById(lead.prospect_id);
  if (!prospect) return xml(twimlEmpty());

  const history = await getMessages(lead.id);
  const drafted = await generateReply({
    system: buildQualifierSystemPrompt(prospect, lead.buyer_name),
    messages: toModelMessages(history),
  });
  if (!drafted) return xml(twimlEmpty());

  const reply = clampSms(drafted);
  await insertMessage({ leadId: lead.id, role: "assistant", channel: "sms", body: reply });
  return xml(twimlMessage(reply));
}
