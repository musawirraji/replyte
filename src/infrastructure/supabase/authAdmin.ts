import { createSupabaseAdminClient } from "./admin";

// ─── Auth admin (invite brokers) — service role ─────────────
// Operator-only flows that create/look up auth users. Uses the service-role
// client's auth.admin API.

/** Find an existing auth user by email (small-scale scan). */
async function findUserByEmail(email: string): Promise<{ id: string } | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) {
    console.error("[authAdmin] listUsers:", error.message);
    return null;
  }
  const match = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  return match ? { id: match.id } : null;
}

/**
 * Invite a broker by email (sends a Supabase invite link → set-password flow).
 * If the user already exists, returns their id so they can be added to another
 * prospect without re-inviting. Returns null on failure.
 */
export async function inviteBrokerUser(
  email: string,
  redirectTo: string,
): Promise<{ id: string; invited: boolean } | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.auth.admin.inviteUserByEmail(email, { redirectTo });
  if (!error && data.user) return { id: data.user.id, invited: true };

  // Likely already registered — fall back to looking them up.
  const existing = await findUserByEmail(email);
  if (existing) return { id: existing.id, invited: false };

  if (error) console.error("[authAdmin] inviteBrokerUser:", error.message);
  return null;
}
