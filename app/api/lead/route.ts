import { after } from "next/server";
import { leadInputSchema, normalizePhone } from "@/domain/lead/leadInput";
import { computeResponseSeconds } from "@/domain/lead/responseTime";
import {
  buildQualifierSystemPrompt,
  firstReplyInstruction,
  fallbackFirstReply,
} from "@/domain/qualifier/systemPrompt";
import { withKickoff, clampSms } from "@/domain/qualifier/conversation";
import { getProspectBySlug } from "@/infrastructure/supabase/prospects";
import {
  insertLead,
  insertMessage,
  stampFirstResponse,
} from "@/infrastructure/supabase/leads";
import { generateReply } from "@/infrastructure/anthropic/qualifier";
import { sendSms } from "@/infrastructure/twilio/sms";
import { sendEmail } from "@/infrastructure/resend/email";
import { fireDripWebhook } from "@/infrastructure/n8n/drip";

// ─── POST /api/lead — the demo moment ───────────────────────
// Does the first reply ITSELF, synchronously, so it's genuinely instant and
// never waits on an n8n cold start. Order: insert lead → Claude drafts the
// reply → send SMS + email → stamp response time + log the message → return.
// The n8n drip is fired in after(), so it never adds to the buyer's wait.
//
// Node runtime (the Twilio/Resend/Anthropic SDKs need it); maxDuration caps a
// hung external call well under Vercel's 300s default. See build research.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  // 1 — Validate input.
  const parsed = leadInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid enquiry", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const input = parsed.data;

  // 2 — Resolve the prospect (branding + grounded listing facts).
  const prospect = await getProspectBySlug(input.slug);
  if (!prospect) {
    return Response.json({ ok: false, error: "Unknown listing" }, { status: 404 });
  }

  // 3 — Insert the lead. created_at is the clock start for the hero metric.
  const phone = normalizePhone(input.buyerPhone);
  const lead = await insertLead({
    prospectId: prospect.id,
    buyerName: input.buyerName,
    buyerPhone: phone,
    buyerEmail: input.buyerEmail || null,
    message: input.message || null,
  });
  if (!lead) {
    return Response.json({ ok: false, error: "Could not save enquiry" }, { status: 500 });
  }

  // 4 — Draft the warm, grounded first reply (fallback keeps the demo alive).
  const system = buildQualifierSystemPrompt(prospect, input.buyerName);
  const drafted = await generateReply({
    system,
    messages: withKickoff([], firstReplyInstruction(input.buyerName)),
  });
  const reply = clampSms(drafted ?? fallbackFirstReply(prospect, input.buyerName));

  // 5 — Deliver it: SMS (the star) + email confirmation, in parallel.
  await Promise.all([
    sendSms({ to: phone, body: reply }),
    input.buyerEmail
      ? sendEmail({
          to: input.buyerEmail,
          subject: `Re: ${prospect.listing_address}`,
          text: reply,
        })
      : Promise.resolve(null),
  ]);

  // 6 — Stamp the response time + log the assistant message.
  const respondedAt = new Date();
  const responseSeconds =
    computeResponseSeconds(lead.created_at, respondedAt.toISOString()) ?? 0;
  await Promise.all([
    stampFirstResponse(lead.id, respondedAt, responseSeconds),
    insertMessage({ leadId: lead.id, prospectId: prospect.id, role: "assistant", channel: "sms", body: reply }),
  ]);

  // 7 — Kick off the follow-up drip AFTER responding (never blocks the buyer).
  after(() =>
    fireDripWebhook({
      leadId: lead.id,
      prospectId: prospect.id,
      buyerName: input.buyerName,
      buyerPhone: phone,
      slug: prospect.slug,
    }),
  );

  // 8 — Return the timing so the form can show the live confirmation.
  return Response.json({ ok: true, responseSeconds, reply });
}
