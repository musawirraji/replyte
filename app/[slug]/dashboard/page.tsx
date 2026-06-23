import type { Metadata } from "next";
import { getProspectForDashboard } from "@/infrastructure/supabase/prospects";
import {
  listLeads,
  getLeadWithThread,
} from "@/infrastructure/supabase/leads";
import type { LeadWithThread } from "@/domain/lead/types";
import { DashboardScreen } from "@/features/dashboard/ui/screens/DashboardScreen";

// The read-only response-time dashboard. Gated by a secret key in the query
// (?k=<dashboard_slug>) that must match the prospect's distinct, high-entropy
// dashboard_slug — so the public listing slug never reveals this page.
//
// NOTE: this is security-by-obscurity, NOT real auth. Fine for a demo; see
// README "Security notes". noindex so it never gets crawled.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Speed-to-Lead dashboard",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ k?: string }>;
}

export default async function DashboardPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { k } = await searchParams;

  // Fail closed: no key, or a key that doesn't match → generic notice.
  const prospect = k ? await getProspectForDashboard(slug, k) : null;
  if (!prospect) {
    return (
      <main className="sl-notice">
        <h1 className="sl-notice__title">Dashboard unavailable</h1>
        <p className="sl-notice__body">
          This dashboard link isn’t valid. Use the secret link from your setup.
        </p>
      </main>
    );
  }

  // Load every lead with its thread + booking (small N for a demo).
  const leadRows = await listLeads(prospect.id);
  const withThreads = await Promise.all(
    leadRows.map((l) => getLeadWithThread(l.id)),
  );
  const leads = withThreads.filter((l): l is LeadWithThread => l !== null);

  return (
    <DashboardScreen
      brandName={prospect.brand_name}
      agentName={prospect.agent_name}
      leads={leads}
    />
  );
}
