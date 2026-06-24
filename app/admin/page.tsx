import type { Metadata } from "next";
import { serverEnv, publicEnv } from "@/lib/env";
import { isAdminAuthed } from "@/lib/adminAuth";
import { listAllProspects } from "@/infrastructure/supabase/prospects";
import { AdminLogin } from "@/features/admin/ui/AdminLogin";
import { AdminScreen } from "@/features/admin/ui/screens/AdminScreen";

// Operator console at /admin — create/edit/delete prospects (the "skin a new
// prospect" workflow as a UI instead of raw DB rows). Gated by ADMIN_KEY.
// This is operator-only; broker auth remains out of scope (spec §15).

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Speed-to-Lead",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!serverEnv.ADMIN_KEY) {
    return (
      <main className="sl-notice">
        <h1 className="sl-notice__title">Admin not configured</h1>
        <p className="sl-notice__body">
          Set <code>ADMIN_KEY</code> in your environment to enable the operator console.
        </p>
      </main>
    );
  }
  if (!(await isAdminAuthed())) return <AdminLogin />;

  const prospects = await listAllProspects();
  return <AdminScreen prospects={prospects} appUrl={publicEnv.NEXT_PUBLIC_APP_URL} />;
}
