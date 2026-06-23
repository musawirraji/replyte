import { serverEnv } from "@/lib/env";

// ─── n8n drip webhook (infrastructure) ──────────────────────
// Kicks off the delayed follow-up sequence (touches 1..5). Critically, this
// is fired from /api/lead via after() AFTER the instant reply has already
// gone out — the first reply NEVER depends on n8n, which has documented
// cold-start/queue delays on cloud. Best-effort, no retry; fine for a demo.

export interface DripPayload {
  leadId: string;
  prospectId: string;
  buyerName: string;
  buyerPhone: string;
  slug: string;
}

/**
 * Fire the n8n webhook. No-ops when unconfigured. Never throws — this runs
 * in a background after() callback where an error must not surface.
 */
export async function fireDripWebhook(payload: DripPayload): Promise<void> {
  const url = serverEnv.N8N_DRIP_WEBHOOK_URL;
  if (!url) {
    console.warn("[n8n] N8N_DRIP_WEBHOOK_URL unset — skipping drip kickoff.");
    return;
  }
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (serverEnv.N8N_WEBHOOK_SECRET) {
      headers.Authorization = `Bearer ${serverEnv.N8N_WEBHOOK_SECRET}`;
    }
    await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[n8n] fireDripWebhook failed:", err);
  }
}
