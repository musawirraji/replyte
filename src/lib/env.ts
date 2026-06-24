import { z } from "zod";

// ─── Environment validation ─────────────────────────────────
// Server vars are only ever read on the server. Public vars are safe to
// inline into the browser bundle. We parse defensively: a missing var logs
// a warning instead of crashing the build, so the frontend shell still
// renders during early setup (per Oba's CLAUDE.md §5).

const serverSchema = z.object({
  // Supabase service role — full read/write, server-only. Optional so the
  // shell builds before keys are wired; the admin client throws clearly if
  // it's actually used while unset.
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Anthropic — the instant reply + the SMS qualifier.
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  // Fast, cheap model purpose-built for real-time SMS-length replies.
  ANTHROPIC_MODEL: z.string().default("claude-haiku-4-5"),

  // Twilio — outbound SMS + inbound webhook signature validation.
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_FROM_NUMBER: z.string().optional(),

  // Resend — instant confirmation email.
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().default("Acme Realty <onboarding@resend.dev>"),

  // n8n — the delayed follow-up drip (NOT the first reply).
  N8N_DRIP_WEBHOOK_URL: z.string().url().optional().or(z.literal("")),
  N8N_WEBHOOK_SECRET: z.string().optional(),

  // Operator allowlist — comma-separated emails. Anyone who signs in (via
  // Supabase Auth) with one of these emails is an operator (full admin, can
  // invite brokers); everyone else is a broker scoped to their prospect(s).
  OPERATOR_EMAILS: z.string().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

// ─── serverEnv ──────────────────────────────────────────────
// Guarded so it is never read in the browser. On invalid/missing vars we
// warn and fall through to process.env rather than throwing the build.
export const serverEnv = (() => {
  if (typeof window !== "undefined") return null as never;
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    console.warn(
      "[env] Missing or invalid server env vars:",
      parsed.error.flatten().fieldErrors,
    );
    return process.env as unknown as z.infer<typeof serverSchema>;
  }
  return parsed.data;
})();

// ─── publicEnv ──────────────────────────────────────────────
export const publicEnv = (() => {
  const parsed = publicSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });
  if (!parsed.success) {
    console.warn(
      "[env] Missing public env vars:",
      parsed.error.flatten().fieldErrors,
    );
    return {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      NEXT_PUBLIC_APP_URL:
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    };
  }
  return parsed.data;
})();
