import type { LeadWithThread } from "./types";

// ─── Dashboard summary stats (pure) ─────────────────────────
// Derives the bento metric cards from the loaded leads. No I/O, no React.

export interface DashboardStats {
  total: number; // all enquiries
  replied: number; // buyer texted back (engaged)
  booked: number; // viewings booked
  fastestSeconds: number | null; // best response time
  avgResponseSeconds: number | null; // mean response time
}

export function computeStats(leads: LeadWithThread[]): DashboardStats {
  const responded = leads
    .map((l) => l.response_seconds)
    .filter((s): s is number => s != null);

  const fastestSeconds = responded.length ? Math.min(...responded) : null;
  const avgResponseSeconds = responded.length
    ? Math.round(responded.reduce((a, b) => a + b, 0) / responded.length)
    : null;

  return {
    total: leads.length,
    replied: leads.filter((l) => l.messages.some((m) => m.role === "buyer")).length,
    booked: leads.filter((l) => l.booking != null).length,
    fastestSeconds,
    avgResponseSeconds,
  };
}

/** Proportional bar widths for the hero "you vs industry" race (0–100). */
export function compareWidths(): { you: number; industry: number } {
  // Not literal (8s vs 15h would be invisible) — a legible visual contrast.
  return { you: 7, industry: 100 };
}
