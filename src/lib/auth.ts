import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { serverEnv } from "@/lib/env";

// ─── Auth helpers (server) ──────────────────────────────────
// Operators are identified by the OPERATOR_EMAILS allowlist (no DB row).
// Brokers are authenticated users who are members of a prospect (see
// infrastructure/supabase/members).

export interface AuthUser {
  id: string;
  email: string | null;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { id: user.id, email: user.email ?? null };
}

export function isOperatorEmail(email: string | null | undefined): boolean {
  const list = (serverEnv.OPERATOR_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return !!email && list.includes(email.toLowerCase());
}

/** The current user if they are an operator, else null. */
export async function getOperator(): Promise<AuthUser | null> {
  const user = await getAuthUser();
  return user && isOperatorEmail(user.email) ? user : null;
}
