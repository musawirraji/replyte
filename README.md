# Speed-to-Lead Demo

A reusable real-estate speed-to-lead demo. A buyer lands on a listing branded
as the prospect's own agency, enters their number, and their phone buzzes with
a real, personalised text in seconds — then a dashboard shows that response
time next to the 15-hour industry average. Build it once; skin it per prospect
by adding one Supabase row and a few images.

## The demo moment

Open a skinned listing → "Enter your number and see exactly what your buyer
gets" → your phone buzzes in seconds with a text that greets you by name and
references the listing → the dashboard shows **"Responded in 8s"** beside
**"15 hrs"**. That side-by-side timer is the hero.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · SCSS · Supabase ·
Claude (`claude-haiku-4-5` via the AI SDK) · Twilio (SMS) · Resend (email) ·
n8n (the follow-up drip). Deploy target: Vercel.

## Setup

1. `npm install`
2. Copy `.env.example` → `.env.local` and fill in keys (see below).
3. In the Supabase SQL editor, run `supabase/schema.sql` top-to-bottom. It
   creates the four tables, enables RLS, and seeds one demo prospect.
4. `npm run dev`, then open:
   - Listing: `http://localhost:3000/demo-acres`
   - Dashboard: `http://localhost:3000/demo-acres/dashboard?k=demo-secret-7f3a9c2e`

`npm run typecheck` and `npm run build` should both be clean.

## How the flow works

1. The enquiry form on `/[slug]` posts to **`POST /api/lead`**, which does the
   first reply **synchronously** so it's genuinely instant and never waits on
   an n8n cold start: insert lead → Claude drafts a warm, grounded reply →
   send SMS (Twilio) + email (Resend) → stamp `response_seconds` → log the
   message. It then fires the n8n drip via `after()` (never blocks the buyer).
2. When the buyer replies, Twilio's inbound webhook hits **`POST /api/reply`**.
   It validates the signature, appends the buyer's text, and continues the
   Claude qualifier (timeline → financing → availability → offer slots).
3. Accepting a slot calls **`POST /api/book`**, writing a `bookings` row.
4. **`/[slug]/dashboard`** shows the response-time hero, the lead list, and the
   full conversation per lead.

## Skinning a new prospect

Insert one `prospects` row (brand name, colour, logo URL, agent name + phone,
listing fields, a `listing_photos` JSON array) with a unique `slug` and a
high-entropy `dashboard_slug`. Upload the logo/photos somewhere public (e.g.
Supabase storage) and reference the URLs. No redeploy.

## Environment

See `.env.example`. Notable: `SUPABASE_SERVICE_ROLE_KEY` (server-only, never
`NEXT_PUBLIC_`), `ANTHROPIC_MODEL=claude-haiku-4-5`, Twilio account/token/from,
`RESEND_FROM`, and `N8N_DRIP_WEBHOOK_URL`. Every integration **degrades
gracefully when unset** — the app still runs and logs a warning, so you can
wire services in one at a time.

## Security notes (read before any live demo)

- The dashboard is gated only by a secret `dashboard_slug` in `?k=`. This is
  **security-by-obscurity, not auth** — secrets in URLs leak via history,
  referer headers, and logs. It's deliberately kept **distinct from the public
  slug** and never shipped to the client (`PublicProspect`), but for anything
  beyond a demo, add real auth (Supabase Auth / a password / a signed token).
- All tables have RLS enabled with no public policy; access is via the
  service-role key in server code only.
- Pin Next.js at/above the CVE-2025-29927 patch (this uses 16.x, which is safe).

## Going live — the real-world gatekeepers

Full detail in `../speed-to-lead-build-research.md`. The two that bite:

- **A2P 10DLC.** Unregistered US SMS is **blocked** (error 30034), not
  throttled. Brand approval is minutes; campaign review is ~1–2 weeks. For a
  self/broker demo this week, use a Twilio **trial** number + verify the
  tester's number as a Caller ID (messages carry a trial prefix). Start
  Low-Volume Standard registration early for any lead-facing demo.
- **Resend domain.** `onboarding@resend.dev` only delivers to your own Resend
  account email. Verify a sending domain (DKIM/SPF/DMARC) to email real leads.

## Keep out of v1

No multi-listing CMS, no payments, no heavy auth, no agent admin beyond the
read-only dashboard. One listing, one flow, one timer. Ship the moment.
