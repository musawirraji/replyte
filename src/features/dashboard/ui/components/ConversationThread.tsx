import type { LeadWithThread } from "@/domain/lead/types";
import {
  bubbleClass,
  formatClock,
  formatSlot,
  senderLabel,
  initials,
} from "@/domain/lead/display";

// Render-only. The conversation for the selected lead (right pane of the
// master–detail), plus any booked viewing. All styling/derivation is imported.

export interface ConversationThreadProps {
  lead: LeadWithThread;
  agentName: string;
}

export function ConversationThread({ lead, agentName }: ConversationThreadProps) {
  return (
    <section className="sl-db-thread">
      <div className="sl-db-thread__head">
        <span className="sl-db-thread__avatar">{initials(lead.buyer_name)}</span>
        <span className="sl-db-thread__who">
          <span className="sl-db-thread__name">{lead.buyer_name}</span>
          <span className="sl-db-thread__phone">{lead.buyer_phone}</span>
        </span>
        {lead.booking && <span className="sl-db-thread__chip">Booked</span>}
      </div>

      <div className="sl-db-thread__body">
        {lead.messages.map((m) => (
          <div key={m.id} className={bubbleClass(m.role)}>
            {m.body}
            <span className="sl-db-msg__meta">
              {senderLabel(m.role, agentName)} · {formatClock(m.created_at)}
            </span>
          </div>
        ))}

        {lead.booking && (
          <div className="sl-db-booking">
            <span className="sl-db-booking__label">Viewing booked</span>{" "}
            {formatSlot(lead.booking.slot_datetime)}
          </div>
        )}
      </div>
    </section>
  );
}
