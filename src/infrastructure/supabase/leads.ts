import { createSupabaseAdminClient } from "./admin";
import type {
  Lead,
  LeadStage,
  Message,
  Booking,
  MessageRole,
  MessageChannel,
  LeadWithThread,
} from "@/domain/lead/types";
import type { Slot } from "@/domain/booking/slots";
import { formatSlotInTz } from "@/domain/booking/slots";
import { getProspectById } from "./prospects";
import { sendEmail } from "@/infrastructure/resend/email";

// ─── Lead / message / booking data access (infrastructure) ──
// Typed reads + writes via the service-role client. Routes and the dashboard
// page call these; no SQL leaks into the app or domain layers.

export interface NewLead {
  prospectId: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string | null;
  message: string | null;
}

/** Insert an enquiry, returning the created lead. */
export async function insertLead(input: NewLead): Promise<Lead | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("leads")
    .insert({
      prospect_id: input.prospectId,
      buyer_name: input.buyerName,
      buyer_phone: input.buyerPhone,
      buyer_email: input.buyerEmail,
      message: input.message,
    })
    .select("*")
    .single();
  if (error) {
    console.error("[leads] insertLead:", error.message);
    return null;
  }
  return data as Lead;
}

/** Stamp first_response_at + response_seconds once the instant reply lands. */
export async function stampFirstResponse(
  leadId: string,
  respondedAt: Date,
  responseSeconds: number,
): Promise<void> {
  const db = createSupabaseAdminClient();
  const { error } = await db
    .from("leads")
    .update({
      first_response_at: respondedAt.toISOString(),
      response_seconds: responseSeconds,
    })
    .eq("id", leadId);
  if (error) console.error("[leads] stampFirstResponse:", error.message);
}

/** Append a message to a lead's thread. */
export async function insertMessage(args: {
  leadId: string;
  prospectId: string;
  role: MessageRole;
  channel: MessageChannel;
  body: string;
}): Promise<void> {
  const db = createSupabaseAdminClient();
  const { error } = await db.from("messages").insert({
    lead_id: args.leadId,
    prospect_id: args.prospectId,
    role: args.role,
    channel: args.channel,
    body: args.body,
  });
  if (error) console.error("[leads] insertMessage:", error.message);
}

/** A single lead by id. */
export async function getLeadById(leadId: string): Promise<Lead | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();
  if (error) {
    console.error("[leads] getLeadById:", error.message);
    return null;
  }
  return (data as Lead) ?? null;
}

/** Persist the slots last offered, so an SMS pick later resolves to a datetime. */
export async function setOfferedSlots(leadId: string, slots: Slot[]): Promise<void> {
  const db = createSupabaseAdminClient();
  const { error } = await db.from("leads").update({ offered_slots: slots }).eq("id", leadId);
  if (error) console.error("[leads] setOfferedSlots:", error.message);
}

/** Advance the lead's funnel stage. */
export async function updateStage(leadId: string, stage: LeadStage): Promise<void> {
  const db = createSupabaseAdminClient();
  const { error } = await db.from("leads").update({ stage }).eq("id", leadId);
  if (error) console.error("[leads] updateStage:", error.message);
}

/** Most recent lead for a buyer phone — used by the inbound reply webhook. */
export async function getLatestLeadByPhone(phone: string): Promise<Lead | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("leads")
    .select("*")
    .eq("buyer_phone", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("[leads] getLatestLeadByPhone:", error.message);
    return null;
  }
  return (data as Lead) ?? null;
}

/** Chronological messages for a lead. */
export async function getMessages(leadId: string): Promise<Message[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("messages")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[leads] getMessages:", error.message);
    return [];
  }
  return (data as Message[]) ?? [];
}

/** Insert a booked viewing slot. */
export async function insertBooking(
  leadId: string,
  prospectId: string,
  slotIso: string,
): Promise<Booking | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("bookings")
    .insert({ lead_id: leadId, prospect_id: prospectId, slot_datetime: slotIso })
    .select("*")
    .single();
  if (error) {
    console.error("[leads] insertBooking:", error.message);
    return null;
  }
  return data as Booking;
}

/**
 * Book a viewing: write the booking, mark the lead booked, and email the buyer
 * a confirmation (when an address/email are available). Shared by the SMS
 * qualifier tool and POST /api/book. Does NOT post a thread message — the
 * caller owns that (the model's SMS, or /api/book's confirmation line).
 */
export async function confirmBooking(
  leadId: string,
  slotIso: string,
): Promise<Booking | null> {
  const lead = await getLeadById(leadId);
  if (!lead) return null;

  const booking = await insertBooking(leadId, lead.prospect_id, slotIso);
  if (!booking) return null;
  await updateStage(leadId, "booked");

  if (lead.buyer_email) {
    const prospect = await getProspectById(lead.prospect_id);
    if (prospect) {
      const label = formatSlotInTz(slotIso, prospect.availability.tz);
      await sendEmail({
        to: lead.buyer_email,
        subject: `Viewing booked — ${prospect.listing_address}`,
        text: `Hi ${lead.buyer_name}, your viewing of ${prospect.listing_address} is booked for ${label}. ${prospect.agent_name} will see you there.\n\n— ${prospect.brand_name}`,
      });
    }
  }
  return booking;
}

/** All leads for a prospect, newest first (dashboard list). */
export async function listLeads(prospectId: string): Promise<Lead[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("leads")
    .select("*")
    .eq("prospect_id", prospectId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[leads] listLeads:", error.message);
    return [];
  }
  return (data as Lead[]) ?? [];
}

/** A lead with its full thread + booking, for the dashboard detail view. */
export async function getLeadWithThread(
  leadId: string,
): Promise<LeadWithThread | null> {
  const db = createSupabaseAdminClient();
  const { data: lead, error } = await db
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();
  if (error || !lead) {
    if (error) console.error("[leads] getLeadWithThread:", error.message);
    return null;
  }
  const messages = await getMessages(leadId);
  const { data: booking } = await db
    .from("bookings")
    .select("*")
    .eq("lead_id", leadId)
    .order("slot_datetime", { ascending: true })
    .limit(1)
    .maybeSingle();
  return {
    ...(lead as Lead),
    messages,
    booking: (booking as Booking) ?? null,
  };
}
