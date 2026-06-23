import { z } from "zod";
import { insertBooking, insertMessage } from "@/infrastructure/supabase/leads";
import { formatSlot } from "@/domain/lead/display";

// ─── POST /api/book — accept a viewing slot ─────────────────
// Writes a bookings row when a buyer picks a slot, and logs a confirming
// message into the thread so the dashboard shows the booked viewing. Thin:
// validate → infrastructure → shaped response.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bookSchema = z.object({
  leadId: z.string().uuid(),
  slotDatetime: z.string().datetime(),
});

export async function POST(req: Request) {
  const parsed = bookSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Invalid booking" }, { status: 400 });
  }
  const { leadId, slotDatetime } = parsed.data;

  const booking = await insertBooking(leadId, slotDatetime);
  if (!booking) {
    return Response.json({ ok: false, error: "Could not book slot" }, { status: 500 });
  }

  await insertMessage({
    leadId,
    role: "assistant",
    channel: "sms",
    body: `Booked your viewing for ${formatSlot(slotDatetime)}. See you there!`,
  });

  return Response.json({ ok: true, booking });
}
