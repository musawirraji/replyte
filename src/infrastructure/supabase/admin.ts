import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";

/**
 * Service-role Supabase client.
 *
 * Bypasses Row Level Security. The whole app reads/writes through this from
 * the API routes and server components — there are no browser→DB calls in
 * this design, so this is the only Supabase client we need.
 *
 * NEVER import this from client ("use client") code. It must only run inside
 * route handlers or server components. Throws clearly if the key is unset so
 * a misconfigured deploy fails loudly rather than silently leaking.
 */
export function createSupabaseAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Server operations require the service role key.",
    );
  }
  return createClient(publicEnv.NEXT_PUBLIC_SUPABASE_URL, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
