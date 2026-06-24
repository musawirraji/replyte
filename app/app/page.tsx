import { redirect } from "next/navigation";
import { getAuthUser, isOperatorEmail } from "@/lib/auth";
import { listMemberProspectIds } from "@/infrastructure/supabase/members";
import { getProspectById } from "@/infrastructure/supabase/prospects";

// Post-login router: sends operators to /admin and brokers to their dashboard.

export const dynamic = "force-dynamic";

export default async function AppPage() {
  const user = await getAuthUser();
  if (!user) redirect("/login");
  if (isOperatorEmail(user.email)) redirect("/admin");

  const ids = await listMemberProspectIds(user.id);
  if (ids.length > 0) {
    const prospect = await getProspectById(ids[0]!);
    if (prospect) redirect(`/${prospect.slug}/dashboard`);
  }

  return (
    <main className="sl-notice">
      <h1 className="sl-notice__title">No dashboard yet</h1>
      <p className="sl-notice__body">
        Your account isn&rsquo;t linked to a listing yet. Ask your operator to add you, then sign in
        again.
      </p>
    </main>
  );
}
