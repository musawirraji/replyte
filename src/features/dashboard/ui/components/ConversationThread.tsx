import type { LeadWithThread } from "@/domain/lead/types";
import {
  bubbleClass,
  formatClock,
  formatSlot,
  senderLabel,
} from "@/domain/lead/display";

// Render-only. The full conversation for the selected lead, plus any booked
// viewing. Bubble styling, timestamps, and labels come from the domain layer.

export interface ConversationThreadProps {
  lead: LeadWithThread;
  agentName: string;
}

export function ConversationThread({ lead, agentName }: ConversationThreadProps) {
  return (
    <section className="sl-thread">
      <div className="sl-thread__head">
        <span className="sl-thread__title">{lead.buyer_name}</span>
        <span className="sl-dash__tag">{lead.buyer_phone}</span>
      </div>

      {lead.messages.map((m) => (
        <div key={m.id} className={bubbleClass(m.role)}>
          {m.body}
          <span className="sl-msg__meta">
            {senderLabel(m.role, agentName)} · {formatClock(m.created_at)}
          </span>
        </div>
      ))}

      {lead.booking && (
        <div className="sl-booking">
          <span className="sl-booking__label">Viewing booked</span>{" "}
          {formatSlot(lead.booking.slot_datetime)}
        </div>
      )}
    </section>
  );
}
