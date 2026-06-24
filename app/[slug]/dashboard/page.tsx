import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  getProspectForDashboard,
  getProspectBySlug,
} from "@/infrastructure/supabase/prospects";
import { listLeads, getLeadWithThread } from "@/infrastructure/supabase/leads";
import type { LeadWithThread } from "@/domain/lead/types";
import { getAuthUser, isOperatorEmail } from "@/lib/auth";
import { isMember } from "@/infrastructure/supabase/members";
import { DashboardScreen } from "@/features/dashboard/ui/screens/DashboardScreen";

// The response-time dashboard. Two ways in:
//  1) Pitch path — the secret ?k=<dashboard_slug> link (no login; for showing
//     an unconverted prospect their own demo).
//  2) Auth path — a signed-in operator, or a broker who is a member of this
//     prospect (the real product, post-conversion).

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

  // 1 — secret-link pitch path.
  let prospect = k ? await getProspectForDashboard(slug, k) : null;

  // 2 — authenticated path (operator or member of this prospect).
  if (!prospect) {
    const user = await getAuthUser();
    if (!user) redirect(`/login?next=/${slug}/dashboard`);
    const p = await getProspectBySlug(slug);
    if (!p) {
      return (
        <main className="sl-notice">
          <h1 className="sl-notice__title">Not found</h1>
          <p className="sl-notice__body">No listing exists at this address.</p>
        </main>
      );
    }
    if (isOperatorEmail(user.email) || (await isMember(user.id, p.id))) {
      prospect = p;
    } else {
      return (
        <main className="sl-notice">
          <h1 className="sl-notice__title">No access</h1>
          <p className="sl-notice__body">
            This account isn&rsquo;t linked to this listing.
          </p>
        </main>
      );
    }
  }

  const leadRows = await listLeads(prospect.id);
  const withThreads = await Promise.all(leadRows.map((l) => getLeadWithThread(l.id)));
  const leads = withThreads.filter((l): l is LeadWithThread => l !== null);

  return (
    <DashboardScreen
      brandName={prospect.brand_name}
      agentName={prospect.agent_name}
      leads={leads}
    />
  );
}
