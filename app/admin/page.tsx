import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env";
import { getAuthUser, isOperatorEmail } from "@/lib/auth";
import { listAllProspects } from "@/infrastructure/supabase/prospects";
import { AdminScreen } from "@/features/admin/ui/screens/AdminScreen";

// Operator console at /admin — create/edit/delete prospects and invite brokers.
// Gated by Supabase Auth + the OPERATOR_EMAILS allowlist. Broker accounts only
// reach their own dashboard, never this page (spec §15 → now a real product).

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Speed-to-Lead",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await getAuthUser();
  if (!user) redirect("/login?next=/admin");

  if (!isOperatorEmail(user.email)) {
    return (
      <main className="sl-notice">
        <h1 className="sl-notice__title">No access</h1>
        <p className="sl-notice__body">
          This account isn&rsquo;t an operator. Sign in with an operator account.
        </p>
      </main>
    );
  }

  const prospects = await listAllProspects();
  return <AdminScreen prospects={prospects} appUrl={publicEnv.NEXT_PUBLIC_APP_URL} />;
}
