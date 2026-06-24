"use client";

import { useState } from "react";
import type { LeadWithThread } from "@/domain/lead/types";
import { computeStats } from "@/domain/lead/stats";
import { ResponseHero } from "../components/ResponseHero";
import { StatBento } from "../components/StatBento";
import { LeadList } from "../components/LeadList";
import { ConversationThread } from "../components/ConversationThread";

// The screen you screen-share on the call. Owns only selection state; the
// hero, bento, list, and thread are render-only and import every derivation
// from the domain layer. Master–detail: list left, conversation right.

export interface DashboardScreenProps {
  brandName: string;
  agentName: string;
  leads: LeadWithThread[];
}

export function DashboardScreen({ brandName, agentName, leads }: DashboardScreenProps) {
  const mostRecent = leads[0] ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(
    mostRecent ? mostRecent.id : null,
  );

  const selected = leads.find((l) => l.id === selectedId) ?? null;
  const stats = computeStats(leads);

  return (
    <main className="sl-db">
      <header className="sl-db__head">
        <span className="sl-db__brand">{brandName}</span>
        <span className="sl-db__tag">Speed-to-Lead dashboard</span>
      </header>

      <ResponseHero responseSeconds={mostRecent?.response_seconds ?? null} />
      <StatBento stats={stats} />

      <div className="sl-db-main">
        <LeadList leads={leads} selectedId={selectedId} onSelect={setSelectedId} />
        {selected ? (
          <ConversationThread lead={selected} agentName={agentName} />
        ) : (
          <section className="sl-db-thread sl-db-thread--empty">
            Select a lead to see the conversation.
          </section>
        )}
      </div>
    </main>
  );
}
