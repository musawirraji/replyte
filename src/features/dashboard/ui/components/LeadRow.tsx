import type { Lead } from "@/domain/lead/types";
import { relativeTime, initials } from "@/domain/lead/display";
import { formatResponseTime, isFastResponse } from "@/domain/lead/responseTime";

// Render-only. One row in the lead list: initials avatar, buyer name, when they
// enquired, and a response-time pill (green when answered within a minute).

export interface LeadRowProps {
  lead: Lead;
  active: boolean;
  onSelect: (id: string) => void;
}

export function LeadRow({ lead, active, onSelect }: LeadRowProps) {
  const fast = isFastResponse(lead.response_seconds);
  const responded = lead.response_seconds != null;
  return (
    <button
      type="button"
      className={active ? "sl-db-row sl-db-row--active" : "sl-db-row"}
      onClick={() => onSelect(lead.id)}
    >
      <span className="sl-db-row__avatar">{initials(lead.buyer_name)}</span>
      <span className="sl-db-row__name">{lead.buyer_name}</span>
      <span className="sl-db-row__time">{relativeTime(lead.created_at)}</span>
      <span
        className={
          "sl-db-row__pill " +
          (!responded
            ? "sl-db-row__pill--pending"
            : fast
              ? "sl-db-row__pill--fast"
              : "sl-db-row__pill--ok")
        }
      >
        {responded ? formatResponseTime(lead.response_seconds) : "pending"}
      </span>
    </button>
  );
}
