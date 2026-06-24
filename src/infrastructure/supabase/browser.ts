import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env";

// ─── Supabase auth client (browser) ─────────────────────────
// For client components that sign users in/out or set a password. Uses the
// public anon key only.

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
