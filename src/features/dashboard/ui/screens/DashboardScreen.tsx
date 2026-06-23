"use client";

import { useState } from "react";
import type { LeadWithThread } from "@/domain/lead/types";
import { ResponseHero } from "../components/ResponseHero";
import { LeadList } from "../components/LeadList";
import { ConversationThread } from "../components/ConversationThread";

// The screen you screen-share on the call. Owns only selection state; the
// hero, list, and thread are render-only. Data is loaded server-side and
// passed in, so the page reflects live Supabase rows on each request.

export interface DashboardScreenProps {
  brandName: string;
  agentName: string;
  leads: LeadWithThread[];
}

export function DashboardScreen({
  brandName,
  agentName,
  leads,
}: DashboardScreenProps) {
  const mostRecent = leads[0] ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(
    mostRecent ? mostRecent.id : null,
  );

  const selected = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <main className="sl-dash">
      <div className="sl-dash__head">
        <span className="sl-dash__brand">{brandName}</span>
        <span className="sl-dash__tag">Speed-to-Lead dashboard</span>
      </div>

      <ResponseHero responseSeconds={mostRecent?.response_seconds ?? null} />

      <LeadList leads={leads} selectedId={selectedId} onSelect={setSelectedId} />

      {selected && <ConversationThread lead={selected} agentName={agentName} />}
    </main>
  );
}
