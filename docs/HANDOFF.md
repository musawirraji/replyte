# Project Handoff — Speed-to-Lead / "Replyte"

You (Claude Code) are picking up an existing Next.js repo. You can read the
code; this brief gives you the context the code can't tell you. Read
`CLAUDE.md`, `README.md`, and `speed-to-lead-build-research.md` next.

---

## 1. Product

A reusable **real-estate "speed to lead" demo**. The pitch it proves: when a
buyer enquires on a property listing, an AI texts them back a real,
personalised reply in **seconds** (vs the ~15-hour industry average),
qualifies them over SMS (timeline → financing → availability), and books a
viewing — all **branded as the agency**, not a third party. It's built once and
**skinned per prospect** by inserting one Supabase row + a logo/photos (no
redeploy). Audience: real-estate brokers/agency owners being pitched the
service. The **one moment it must nail**: the broker enters their own phone
number on a page branded as their agency, their phone **buzzes within ~10s**
with a personalised text, and a dashboard shows "Responded in 8s" next to
"Industry average: 15 hours." That side-by-side timer is the hero of the entire
build — everything else serves it.

Naming note: the marketing landing page brands the product **"Replyte"**; the
repo, spec, and demo data use **"Speed-to-Lead"** (consultancy:
`forgedbyraji.com`, demo host `demo.forgedbyraji.com/[slug]`). **The product
name is not yet reconciled** — see Open Questions.

---

## 2. Scope — built vs planned vs out

### Built (exists and compiles; `typecheck` + `build` are green)
- **Marketing landing page** at `/` ("Replyte") — 11 animated sections
  reproduced **verbatim** from a design handoff (see §4). Hero with live
  ticker, problem spotlight carousel, dark pinned-features, pinned
  "how it works" with custom cursor, **playable demo** (front-end only),
  proof race bars, why-us stacking cards, FAQ folder-tabs, final CTA, footer.
- **Branded listing page** at `/[slug]` — server-fetches the prospect, renders
  brand bar, gallery, price/facts, description, and the **enquiry form** (the
  demo CTA). On submit it shows a live "Replied in Xs" confirmation.
- **Read-only dashboard** at `/[slug]/dashboard?k=<secret>` — response-time
  hero, a stat bento (total / replied / booked / fastest / avg), a lead list,
  and a per-lead conversation thread + booking. (See §3.)
- **API routes** (Node runtime): `POST /api/lead` (the synchronous first
  reply), `POST /api/reply` (Twilio inbound SMS webhook → continues the Claude
  qualifier), `POST /api/book` (writes a booking).
- **Supabase schema** (`supabase/schema.sql`): `prospects`, `leads`,
  `messages`, `bookings` + RLS + a seeded `demo-acres` prospect.
- **Infrastructure wrappers**, each degrading gracefully when its keys are
  unset: Supabase (service-role admin + typed repos), Anthropic (AI SDK),
  Twilio, Resend, n8n.

### Planned (designed/specced, not built)
- The **n8n follow-up drip** workflow (touches 1–5). The app already fires the
  webhook from `/api/lead` via `after()`; the n8n side does not exist yet.
- **Re-rendered §4 "What it does" visuals** at the right aspect ratio (prompts
  in `docs/pinned-visuals-prompts.md`). Current art is portrait and crops on
  wide screens (workaround: `object-position: center 40%` in `globals.scss`).
- **Booking slot UI** inside the SMS/qualifier flow (Cal.com API vs a custom
  Supabase slot picker — undecided).
- A **richer multi-section listing page** (brief in
  `docs/landing-page-design-brief.md`) — optional.
- The marketing **Proof (§7)** and **Final CTA (§10)** sections are flagged by
  the designer as "not final" first-pass versions slated for redesign.

### Explicitly OUT for v1
Multi-listing CMS; payments; heavy auth; any agent-facing admin **beyond the
read-only dashboard**. The mantra from the original spec: *"Ship the moment,
not a product. One listing, one flow, one timer."*

---

## 3. The dashboard — what it is and isn't (read this before touching it)

**Decision: the dashboard is a READ-ONLY demo artifact — the thing you
screen-share on a pitch call — NOT a working tool the agent operates.**

What it does today (`src/features/dashboard/`): shows the most-recent lead's
**response time vs the 15-hour benchmark** (hero), summary **stat cards**
(`computeStats` in `src/domain/lead/stats.ts`: total enquiries, replied,
booked, fastest, average), a **lead list** (master), and the **full
conversation thread + booking** for the selected lead (detail). State is just
the selected lead id; everything else is render-only and derived in `domain`.

What it deliberately does **NOT** have, and why: **no reply/take-over of
conversations, no lead-status editing, no filters/search, no live updates
(it's a server render per request, not realtime), no CRM sync, no export, no
login.** Rationale: the demo's job is to make the broker *feel* the instant
text on their own phone and see the timer — a working CRM-style console is the
product they pay for **after** the demo lands, and was scoped out to avoid
building past the moment. If the dashboard is ever promoted to a real tool,
that's a new project with real auth, realtime (Supabase subscriptions), and
write paths — treat it as such, don't bolt it on.

The dashboard is gated only by a secret `dashboard_slug` in `?k=` (kept
distinct from the public slug, never shipped to the client via
`PublicProspect`). This is **security-by-obscurity, not auth** — fine for a
demo, insufficient for anything real.

---

## 4. Architecture & key decisions

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict)
· **SCSS only** (no Tailwind, no CSS modules, no CSS-in-JS) · Supabase ·
Node 20. AI via the Vercel **AI SDK** (`ai` + `@ai-sdk/anthropic`) on
**`claude-haiku-4-5`**. SMS via **Twilio**, email via **Resend**, follow-up
drip via **n8n**. `gsap` + `@gsap/react` are installed (recent addition; used
for marketing motion polish).

**Layered architecture (enforced, dependencies point downward only):**
`app → features → domain → infrastructure → lib`. UI components in
`features/*/ui/components` are **render-only** (props in, JSX out); all logic,
formatting and derivation live in `src/domain/*` (pure, no I/O, no React);
**screens** (`features/*/ui/screens`) are the only UI allowed to hold state;
external systems live in `src/infrastructure/*`. Path aliases: `@/* → src/*`,
`@app/* → app/*`. Styling is one global `app/globals.scss` with `sl-`-prefixed
tokens from `src/shared/design/_tokens.scss`. Env is zod-validated in
`src/lib/env.ts` and parsed **defensively** (a missing var warns, doesn't crash
the build, so the shell renders during setup).

**Non-obvious decisions:**
- **The first reply is synchronous inside `/api/lead`.** It does, in order:
  insert lead → Claude drafts a grounded reply → send SMS (Twilio) + email
  (Resend) → stamp `first_response_at`/`response_seconds` → log the assistant
  message → **then** fire the n8n drip webhook via `after()` (so it never
  blocks the buyer). This is deliberate: n8n cloud has real cold-start/queue
  delays and a ~100s ceiling, which would wreck the "8 seconds" moment. n8n
  owns **only** the delayed drip, never the first reply.
- **Node runtime + `maxDuration = 30`** on the API routes (the Twilio/Resend/
  Anthropic SDKs need Node, not Edge). Vercel's old 10s Hobby cap is gone
  (Fluid Compute → 300s default), so the synchronous flow is safe.
- **Supabase: service-role key, server-side only** (no SSR/browser clients in
  this design). **RLS is enabled on every table with no public policy** — the
  anon key reads nothing; all access is via the service role (which bypasses
  RLS) inside server code. Never expose the service key to the client.
- **Claude qualifier** grounds all listing facts in an XML `<listing>` block in
  the system prompt (`src/domain/qualifier/systemPrompt.ts`) so it never
  invents a property detail; replies are capped to SMS length, one question
  per turn, driving toward a booking.
- **Graceful degradation:** every integration no-ops with a warning if its keys
  are missing, so the app runs end-to-end on just Supabase (Claude uses a
  canned fallback reply, SMS/email are skipped).
- **The marketing page is reproduced, not rebuilt.** `replyteMarkup.ts` is
  **auto-generated** from the design handoff's verbatim "Exact source" blocks
  and injected via `dangerouslySetInnerHTML`; `ReplyteLanding.tsx` ports the
  design's `DCLogic` class method-for-method as one imperative `useEffect`
  (hero ticker, nav, spotlight, pinned steps, cursor, demo state machine,
  proof, why-us stacking, FAQ reveal). This was a deliberate correction after a
  from-prose rebuild drifted. **Do not hand-edit the markup to change the
  design — regenerate it from the source** (see Open Questions / dead code).

**Real-world gotchas (documented in `speed-to-lead-build-research.md`):**
- **US SMS requires A2P 10DLC registration.** Unregistered traffic is *blocked*
  (Twilio error 30034), not throttled. Brand approval is minutes; campaign
  review is ~1–2 weeks. A Twilio **trial** number sending to a **verified**
  caller ID works for a self/broker demo today (with a trial prefix).
- **Resend** only delivers from `onboarding@resend.dev` to your own account
  email until you verify a sending domain (DKIM/SPF/DMARC).

---

## 5. Design direction

**Two distinct visual systems, intentionally:**
- **Marketing page (`/`) = the "Replyte" design system**, reproduced verbatim
  from the handoff. Fonts: **Space Grotesk** (display/numbers), **DM Sans**
  (UI), **DM Mono** (eyebrows/labels). A deliberate **multi-accent** palette
  (NOT one brand colour): blue `#2f6bf2`, green `#1f9d57` (= fast/success),
  violet `#6d56cf`, coral `#e0623f`; slate `#6b7785` = the "slow / 15-hour"
  functional colour (intentionally neutral, never red). Dark sections
  `#0d0f13`. Editorial restraint, generous negative space, glassmorphism, soft
  large-offset shadows, one wipe-fill button pattern.
- **Listing + dashboard = the `sl-` editorial system** (`_tokens.scss`):
  **Fraunces** display + **DM Sans**, calm, premium, hairline rules, one accent
  that's overridden per-prospect on the listing page from `primary_color`.

**Reference:** the pinned-features section is inspired by sanity.io's pinned
product sections (full-bleed right-column visual that fills edge-to-edge).

**Hard do's / don'ts:**
- **Do** keep SCSS-only, render-only components, all derivation in `domain`.
- **Do** honour `prefers-reduced-motion` (the marketing CSS already disables
  animation under it).
- **Don't** introduce Tailwind / CSS modules / styled-components / inline style
  objects for layout.
- **Don't** re-imagine the marketing markup from description — it must stay
  byte-identical to the design source; regenerate `replyteMarkup.ts` instead.
- **Don't** switch the §4 visuals to `object-fit: contain` (leaves dead side
  gaps, breaks the Sanity full-bleed look) — keep `cover`; the real fix is
  re-rendering the art (see roadmap).
- The marketing page makes stat claims (15 hrs, 78%, "1,200+ reviews", award
  badges) that are **illustrative/placeholder** — verify before any public
  launch.

---

## 6. Roadmap (priority order)

1. **Re-render the four §4 "What it does" visuals** at the column's aspect with
   the subject in the central 60% + dark margins (prompts ready in
   `docs/pinned-visuals-prompts.md`), drop into `public/marketing/`, then reset
   the crop to `object-position: center`.
2. **Reconcile the product name** (Replyte vs Speed-to-Lead/ForgedByRaji)
   across the marketing page, metadata, and copy.
3. **Delete the dead marketing rebuild files** (see §7) — they're unused and
   confusing.
4. **Make the live demo actually text:** wire real keys, start A2P 10DLC
   (Low-Volume Standard) registration, verify a Resend domain, and rehearse the
   end-to-end moment on a real phone.
5. **Build the n8n drip workflow** (webhook trigger → wait nodes → check
   Supabase for a reply → send touches 1–5 via Twilio, stop on re-engagement).
6. **Booking slot UI** in the qualifier/SMS flow (decide Cal.com API vs custom
   Supabase picker).
7. **Redesign Proof (§7) and Final CTA (§10)** — flagged not-final.
8. If the dashboard is promoted beyond a demo: **real auth + realtime + write
   paths** (separate effort).

---

## 7. Open questions / pending decisions

- **Product name:** Replyte vs Speed-to-Lead vs ForgedByRaji — pick one.
- **Dead code to remove:** the from-prose marketing rebuild was superseded by
  `ReplyteLanding.tsx` + `replyteMarkup.ts` but its files **could not be
  deleted in the previous environment** (filesystem blocked `rm`). Unused,
  not bundled, still type-checked. Safe to delete:
  `src/features/marketing/ui/{sections,screens,components,hooks}/` and
  `src/domain/marketing/{content,motion}.ts`. Keep `ReplyteLanding.tsx` and
  `replyteMarkup.ts`. After deleting, also remove the now-dead `--sl-mkt-*`
  token block + `sl-mkt-*` styles in `globals.scss` if you want a clean sheet
  (the authoritative marketing CSS is the handoff keyframes/responsive block
  near the end of `globals.scss`).
- **Is the dashboard ever a real tool?** (reply/takeover, filters, live
  updates, CRM/export) — currently a hard "no, demo only." Confirm before
  building any of it.
- **Booking:** Cal.com v2 API (real calendar sync) vs a custom Supabase
  `bookings` picker (self-contained). Undecided.
- **SMS path:** A2P 10DLC vs toll-free verification for the live, lead-facing
  demo.
- **`why-bg.png`** for the Why-us (§8) background was never supplied; the
  section uses a CSS gradient fallback. Generate it or accept the fallback.
- **Listing page depth:** ship the richer multi-section listing
  (`docs/landing-page-design-brief.md`) or keep the current single-CTA page?

---

## Environment notes for whoever runs this next

- Gates: `npm run typecheck` (must be clean) then `npm run build`. **No test
  framework** is wired up.
- First run: `npm install`, `cp .env.example .env.local` and fill keys, run
  `supabase/schema.sql` in the Supabase SQL editor. Then `npm run dev` →
  listing at `/demo-acres`, dashboard at
  `/demo-acres/dashboard?k=demo-secret-7f3a9c2e`, marketing at `/`.
- The previous environment was a sandboxed mount that **could not delete files
  and failed `next build`'s static-export cleanup with EPERM** (the compile +
  typecheck themselves passed). Those are environment quirks — a normal dev
  machine builds and deletes fine.
