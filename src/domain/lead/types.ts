// ─── Lead / message / booking types ─────────────────────────
// Mirror the leads, messages, bookings tables. Pure types.

import type { Slot } from "@/domain/booking/slots";

export type MessageRole = "assistant" | "buyer";
export type MessageChannel = "sms" | "email" | "chat";

export type LeadStage = "new" | "qualifying" | "slots_offered" | "booked";

export interface Lead {
  id: string;
  prospect_id: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_email: string | null;
  message: string | null;
  created_at: string;
  first_response_at: string | null;
  response_seconds: number | null;
  stage: LeadStage;
  offered_slots: Slot[];
}

export interface Message {
  id: string;
  lead_id: string;
  role: MessageRole;
  channel: MessageChannel;
  body: string;
  created_at: string;
}

export interface Booking {
  id: string;
  lead_id: string;
  slot_datetime: string;
  status: "booked" | "cancelled" | "completed";
  created_at: string;
}

/** A lead with its thread + booking, for the dashboard detail view. */
export interface LeadWithThread extends Lead {
  messages: Message[];
  booking: Booking | null;
}
