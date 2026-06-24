import { tool } from "ai";
import { normalizePhone } from "@/domain/lead/leadInput";
import { buildQualifierSystemPrompt } from "@/domain/qualifier/systemPrompt";
import { bookViewingParameters, BOOK_VIEWING_DESCRIPTION } from "@/domain/qualifier/tools";
import { toModelMessages, clampSms } from "@/domain/qualifier/conversation";
import { generateSlots } from "@/domain/booking/slots";
import {
  getLatestLeadByPhone,
  getMessages,
  insertMessage,
  setOfferedSlots,
  updateStage,
  confirmBooking,
} from "@/infrastructure/supabase/leads";
import { getProspectById } from "@/infrastructure/supabase/prospects";
import { generateReply } from "@/infrastructure/anthropic/qualifier";
import {
  validateTwilioSignature,
  twimlMessage,
  twimlEmpty,
} from "@/infrastructure/twilio/sms";

// ─── POST /api/reply — Twilio inbound SMS webhook ───────────
// Validate signature → append the buyer's text → continue the qualifier with
// Claude, which can call the book_viewing tool to actually book a viewing from
// the prospect's available slots → reply via TwiML. Node + force-dynamic.

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
  const form = await req.formData();
  const params: Record<string, string> = {};
  for (const [k, v] of form.entries()) params[k] = String(v);

  if (process.env.TWILIO_AUTH_TOKEN) {
    const signature = req.headers.get("x-twilio-signature");
    if (!validateTwilioSignature(signature, req.url, params)) {
      return new Response("Invalid signature", { status: 403 });
    }
  }

  const from = params.From ? normalizePhone(params.From) : "";
  const body = (params.Body ?? "").trim();
  if (!from || !body) return xml(twimlEmpty());

  const lead = await getLatestLeadByPhone(from);
  if (!lead) return xml(twimlEmpty());

  // Log the inbound buyer message + mark them engaged.
  await insertMessage({ leadId: lead.id, prospectId: lead.prospect_id, role: "buyer", channel: "sms", body });
  if (lead.stage === "new") await updateStage(lead.id, "qualifying");

  const prospect = await getProspectById(lead.prospect_id);
  if (!prospect) return xml(twimlEmpty());

  // Resolve the bookable slots: reuse what was offered, else generate (and
  // persist) from the prospect's availability so picks stay stable across turns.
  let slots = lead.offered_slots ?? [];
  if (slots.length === 0) {
    slots = generateSlots(prospect.availability);
    await setOfferedSlots(lead.id, slots);
  }

  const history = await getMessages(lead.id);

  const tools = {
    book_viewing: tool({
      description: BOOK_VIEWING_DESCRIPTION,
      parameters: bookViewingParameters,
      execute: async ({ slot_datetime }) => {
        const valid = slots.some((s) => s.datetime === slot_datetime);
        if (!valid) return { ok: false, reason: "slot_not_offered" };
        const booking = await confirmBooking(lead.id, slot_datetime);
        return booking ? { ok: true, booked_for: slot_datetime } : { ok: false };
      },
    }),
  };

  const drafted = await generateReply({
    system: buildQualifierSystemPrompt(prospect, lead.buyer_name, slots),
    messages: toModelMessages(history),
    tools,
    maxSteps: 3,
  });
  if (!drafted) return xml(twimlEmpty());

  const reply = clampSms(drafted);
  await insertMessage({ leadId: lead.id, prospectId: lead.prospect_id, role: "assistant", channel: "sms", body: reply });
  return xml(twimlMessage(reply));
}
