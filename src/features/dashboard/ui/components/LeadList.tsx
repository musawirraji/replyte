import type { Lead } from "@/domain/lead/types";
import { LeadRow } from "./LeadRow";

// Render-only. The selectable lead list (left pane of the master–detail).
// Selection state lives in the screen; this renders rows and forwards clicks.

export interface LeadListProps {
  leads: Lead[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LeadList({ leads, selectedId, onSelect }: LeadListProps) {
  return (
    <div className="sl-db-list">
      <div className="sl-db-list__head">
        <span>Leads</span>
        <span className="sl-db-list__count">{leads.length}</span>
      </div>
      {leads.length === 0 ? (
        <div className="sl-db-list__empty">
          No enquiries yet. Open the listing, enter your number, and watch one land here.
        </div>
      ) : (
        <div className="sl-db-list__rows">
          {leads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              active={lead.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
