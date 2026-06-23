// ─── Response-time math + benchmark (pure) ──────────────────
// Powers the dashboard hero — the star of the build. Everything the UI
// needs to render "8s vs 15 hours" lives here; components stay render-only.

// Industry benchmark figures the demo contrasts against. Sourced from the
// build spec's speed-to-lead stats.
export const INDUSTRY_AVERAGE_HOURS = 15;
export const FIRST_RESPONDER_WIN_PCT = 78; // % of buyers go with whoever answers first

/** Seconds between enquiry and first response. Null if not yet responded. */
export function computeResponseSeconds(
  createdAt: string,
  respondedAt: string | null,
): number | null {
  if (!respondedAt) return null;
  const ms = new Date(respondedAt).getTime() - new Date(createdAt).getTime();
  if (!Number.isFinite(ms) || ms < 0) return 0;
  return Math.round(ms / 1000);
}

/**
 * Human label for our response time — the big hero number.
 * "8s" · "47s" · "2 min" · "1 hr".
 */
export function formatResponseTime(seconds: number | null): string {
  if (seconds == null) return "—";
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.round(mins / 60);
  return `${hrs} hr${hrs === 1 ? "" : "s"}`;
}

/** The benchmark label for the other side of the hero. */
export function formatBenchmark(): string {
  return `${INDUSTRY_AVERAGE_HOURS} hrs`;
}

/** The "78% of buyers..." line, as a single sentence for the hero footer. */
export function firstResponderLine(): string {
  return `${FIRST_RESPONDER_WIN_PCT}% of buyers go with whoever answers first.`;
}

/** A lead counts as "fast" (green badge) when answered within a minute. */
export function isFastResponse(seconds: number | null): boolean {
  return seconds != null && seconds <= 60;
}

/** "Responded in 8 seconds" — the sentence under the hero number. */
export function respondedInSentence(seconds: number | null): string {
  if (seconds == null) return "Awaiting first response";
  if (seconds < 60) return `Responded in ${seconds} seconds`;
  return `Responded in ${formatResponseTime(seconds)}`;
}
