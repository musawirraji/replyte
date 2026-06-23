import type { Lead } from "@/domain/lead/types";
import { relativeTime } from "@/domain/lead/display";
import { formatResponseTime, isFastResponse } from "@/domain/lead/responseTime";

// Render-only. One row in the lead list: buyer name, when they enquired, and
// a response-time badge (green when answered within a minute).

export interface LeadRowProps {
  lead: Lead;
  active: boolean;
  onSelect: (id: string) => void;
}

export function LeadRow({ lead, active, onSelect }: LeadRowProps) {
  const fast = isFastResponse(lead.response_seconds);
  return (
    <button
      type="button"
      className={active ? "sl-lead sl-lead--active" : "sl-lead"}
      onClick={() => onSelect(lead.id)}
    >
      <span className="sl-lead__name">{lead.buyer_name}</span>
      <span className="sl-lead__time">Enquired {relativeTime(lead.created_at)}</span>
      <span
        className={
          fast
            ? "sl-lead__badge sl-lead__badge--fast"
            : "sl-lead__badge sl-lead__badge--pending"
        }
      >
        {lead.response_seconds != null
          ? formatResponseTime(lead.response_seconds)
          : "pending"}
      </span>
    </button>
  );
}
