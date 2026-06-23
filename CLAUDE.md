# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Project-specific notes. Inherits all of Oba's global build conventions
(layered architecture, render-only components, SCSS-only with the 2-letter
prefix, zod env, service-role Supabase). Prefix here is **`sl-`** (e.g.
`--sl-accent`).

## What this is

A reusable real-estate "speed to lead" demo. One app, skinned per prospect by
inserting a Supabase row + assets — no redeploy. A buyer enquires on a
branded listing page and gets a real, personalised SMS reply in seconds; a
dashboard shows that response time next to the 15-hour industry benchmark.
That side-by-side timer is the hero of the whole build.

## Commands

```bash
npm run dev        # next dev — listing at /demo-acres, dashboard at /demo-acres/dashboard?k=demo-secret-7f3a9c2e
npm run build      # next build
npm run start      # serve the production build
npm run lint       # next lint
npm run typecheck  # tsc --noEmit — must be clean before build
```

There is **no test framework** wired up — `typecheck` + `build` are the gates.
First-time setup: `npm install`, copy `.env.example` → `.env.local`, then run
`supabase/schema.sql` top-to-bottom in the Supabase SQL editor (creates the
four tables, enables RLS, seeds the `demo-acres` prospect).

Path aliases (`tsconfig.json`): `@/*` → `src/*`, `@app/*` → `app/*`.

## The one rule that shapes the architecture

The **first reply is done synchronously inside `/api/lead`** — insert lead →
Claude drafts → Twilio SMS + Resend email → stamp response time. It never
waits on n8n (which has real cold-start/queue delays on cloud). n8n owns only
the delayed follow-up drip (touches 1–5), fired via `after()` so it never
blocks the buyer's response. See `app/api/lead/route.ts` for the canonical
8-step order, and `../speed-to-lead-build-research.md` for the rationale.

## Layer map

- `app/page.tsx` — the public **Replyte marketing landing** (root `/`),
  rendered from `src/features/marketing` (`ReplyteLanding` + section
  components). Separate from the live demo.
- `app/[slug]/page.tsx` — server: fetch prospect, strip secret, render the
  branded **listing** screen (`src/features/listing`).
- `app/[slug]/dashboard/page.tsx` — server: secret-key gate, load
  leads+threads, render the **dashboard** (`src/features/dashboard`).
- `app/api/{lead,reply,book}/route.ts` — thin handlers, `runtime = "nodejs"`
  (the Twilio/Resend/Anthropic SDKs need Node), `maxDuration = 30`,
  `dynamic = "force-dynamic"`.
- `src/domain/*` — pure logic + types (prospect, lead, qualifier, booking,
  marketing). No I/O, no React. The qualifier system prompt lives here.
- `src/features/{marketing,listing,dashboard}/ui` — screens hold state;
  components are render-only and import every derivation from `domain`.
- `src/infrastructure/*` — Supabase (service-role admin + typed repos),
  anthropic, twilio, resend, n8n. Each degrades gracefully when unconfigured.
- `src/lib/env.ts` — all env, zod-validated, parsed defensively (a missing var
  warns instead of crashing the build, so the shell renders during setup).

## The request flow

1. Enquiry form on `/[slug]` → `POST /api/lead` (the synchronous first reply,
   above) → returns `{ responseSeconds, reply }` for the live confirmation.
2. Buyer's SMS reply → Twilio inbound webhook → `POST /api/reply`: validates
   signature, appends the buyer's text, continues the Claude qualifier
   (timeline → financing → availability → offer slots).
3. Accepting a slot → `POST /api/book` → writes a `bookings` row.
4. `/[slug]/dashboard` reads it all back: response-time hero, lead list, full
   per-lead conversation thread.

## Data model (`supabase/schema.sql`)

Four tables: `prospects` (one row per skin; `slug` public, `dashboard_slug`
secret), `leads` (one per enquiry; `response_seconds` is the hero metric,
clocked from `created_at`), `messages` (two-way log, `role` ∈ assistant|buyer,
`channel` ∈ sms|email|chat), `bookings`. RLS is enabled everywhere with **no
public policy** — the anon key reads nothing; all access is server-side via the
service-role key, which bypasses RLS.

## Security model (v1, demo only)

The dashboard is gated by a secret `dashboard_slug` passed as `?k=`, kept
**distinct from the public listing slug** so the public page never reveals it,
and never shipped to the client (see `PublicProspect`). This is
security-by-obscurity, NOT auth. For anything beyond a demo, add real auth.
See README.

## Model

`claude-haiku-4-5` via the AI SDK, tight `maxTokens`, no extended thinking —
tuned for near-instant SMS-length replies. Listing facts are grounded in an
XML `<listing>` block so it never invents a property detail.
