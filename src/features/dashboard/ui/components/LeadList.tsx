import type { Lead } from "@/domain/lead/types";
import { LeadRow } from "./LeadRow";

// Render-only. The list of leads, newest first. Selection state lives in the
// screen; this just renders rows and forwards clicks.

export interface LeadListProps {
  leads: Lead[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LeadList({ leads, selectedId, onSelect }: LeadListProps) {
  if (leads.length === 0) {
    return (
      <div className="sl-leads">
        <div className="sl-leads__empty">
          No enquiries yet. Open the listing, enter your number, and watch one
          land here.
        </div>
      </div>
    );
  }

  return (
    <div className="sl-leads">
      {leads.map((lead) => (
        <LeadRow
          key={lead.id}
          lead={lead}
          active={lead.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
