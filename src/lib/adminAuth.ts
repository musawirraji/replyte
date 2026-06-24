import { cookies } from "next/headers";
import { serverEnv } from "@/lib/env";

// ─── Operator admin gate (v1) ───────────────────────────────
// A single shared secret (ADMIN_KEY) stored in an httpOnly cookie. This gates
// the /admin console only — it is NOT broker/customer auth (that's v2). Treat
// as operator-grade obscurity, not real multi-user authentication.

export const ADMIN_COOKIE = "sl_admin";

export async function isAdminAuthed(): Promise<boolean> {
  const key = serverEnv.ADMIN_KEY;
  if (!key) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === key;
}
