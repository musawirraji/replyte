import type { DashboardStats } from "@/domain/lead/stats";
import { formatResponseTime } from "@/domain/lead/responseTime";

// Render-only. A bento row of supporting metrics under the hero. Monochrome
// cards with one green accent on the success metric; subtle hover lives in CSS.

export function StatBento({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: "Enquiries", value: String(stats.total), good: false },
    { label: "Replied", value: String(stats.replied), good: false },
    { label: "Viewings booked", value: String(stats.booked), good: true },
    { label: "Avg response", value: formatResponseTime(stats.avgResponseSeconds), good: false },
  ];

  return (
    <div className="sl-db-stats">
      {cards.map((c) => (
        <div key={c.label} className={`sl-db-stat${c.good ? " sl-db-stat--good" : ""}`}>
          <span className="sl-db-stat__value">{c.value}</span>
          <span className="sl-db-stat__label">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
