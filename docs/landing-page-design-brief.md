# Speed-to-Lead — Design Brief (Marketing page + Listing page)

Feed this to your design tool to generate section-by-section inspiration, then
bring the designs back to build them into the existing app. Two pages are
covered: the **marketing page** at `/` (sells the service) and the **richer
listing page** at `/[slug]` (what buyers land on, with the demo CTA as hero).

---

## 1. What you're building (context for the designer)

**Product.** A "speed to lead" system for real-estate agencies. When a buyer
enquires about a listing, an AI texts them back a real, personalised reply in
seconds — not the ~15-hour industry average — then qualifies them over SMS and
books a viewing. It's skinned per agency: their brand, their listing, their
agent. The reusable demo lives at `demo.forgedbyraji.com/[slug]`.

**Who it's for.**
- *Marketing page* → real-estate brokers / agency owners (the buyers of the
  service). Skeptical, busy, money-motivated, not very technical.
- *Listing page* → home buyers (and the broker testing it on themselves). They
  should feel they're on a premium, trustworthy agency site.

**The one idea everything serves.** Whoever answers first wins the deal. The
demo proves it *viscerally*: you enter your own number on a page branded as the
agency, your phone buzzes in seconds, and a dashboard shows "Responded in 8s"
next to "Industry average: 15 hours." That side-by-side timer is the hero of
the whole product. Every design decision should push toward that feeling.

**Key stats / copy to reuse** (verify before publishing publicly):
- Average agent first-response time to a web lead: **~15 hours**.
- **78%** of buyers go with the first agent who responds.
- Most leads need **5+ follow-ups**, yet nearly **half of agents quit after
  one**.
- Our response time in the demo: **~8 seconds** (often 2–3).

**Tone.** Confident, sharp, credible. The marketing page can have more energy
and persuasion; the listing page is calm, editorial, premium. Never gimmicky or
"chatbot-y" — the whole point is that it does NOT feel like a bot.

---

## 2. Visual system (so designs are buildable as-is)

The app is SCSS-only with design tokens (prefix `sl-`). Designing within these
keeps everything one-to-one with the build. Designers can push the marketing
page further, but staying near this palette saves rework.

**Type**
- Display / headlines / the big hero number: **Fraunces** (serif, editorial).
- All UI / body: **DM Sans**.

**Color tokens**
- Ink (text): `#14171a`; secondary ink `#3d444c`; muted `#6b7280`; dim `#9aa1a9`.
- Surfaces: white `#ffffff`, off-white `#f7f8f9`, well `#eef0f2`.
- Borders/hairlines: `#e3e6e9`.
- Accent (brand): `#1f6feb` — **on the listing page this is per-prospect**
  (overridden from the agency's brand color); on the marketing page it's our
  own brand accent.
- "Fast / good" green: `#1f9d57`. Benchmark / slow amber: `#b54708`.

**Feel.** Editorial restraint: generous whitespace, hairline rules, one accent,
rounded-12px cards, soft focus rings. Whitespace does the work. Avoid heavy
drop-shadows, gradients-everywhere, or busy stock-photo collages.

**Build constraints to respect**
- Mobile-first; both pages must look great at 380px and on desktop.
- Components are render-only and composable — design in clear, repeatable
  blocks (cards, rows, stat tiles) rather than one bespoke illustration.
- The listing page is **skinnable**: logo, accent color, listing photos, agent
  name/phone all come from data. Don't bake brand-specific art into the layout.

---

## 3. MARKETING PAGE (`/`) — section by section

Goal: convince a broker that speed-to-lead wins deals, let them *feel* the demo,
and drive them to (a) try the live demo and (b) book a call.

**3.1 Top nav (sticky, minimal)**
Logo left; 3–4 anchor links (How it works · Proof · FAQ); right-side primary
button **"See the live demo."** Transparent over hero, solid on scroll.

**3.2 Hero**
- Headline (Fraunces, big): something like *"Answer every buyer in 8 seconds.
  Not 15 hours."*
- Subhead: *"The first agent to reply wins the deal 78% of the time. We give
  your listings an AI that texts buyers back instantly, qualifies them, and
  books the viewing — branded as your agency."*
- Primary CTA: **"Watch it text you →"** (scrolls to the interactive demo block
  / opens the live demo). Secondary: **"Book a 15-min call."**
- Visual: a phone mockup with an incoming SMS bubble + a live "00:08" timer
  ticking. This is the money image — get a few directions for it.

**3.3 The problem (make the pain visceral)**
Three stat tiles in a row: **15 hrs** (average first response) · **78%** (go
with whoever answers first) · **½** (of agents quit after one follow-up). Short
line under each. A sentence frames the cost: *"Every hour a lead sits, it cools.
While you're showing a house, your competitor already texted them back."*

**3.4 What it does (the solution)**
3–4 feature blocks (icon + title + one line):
- *Instant personalised reply* — greets them by name, references the exact
  listing, in seconds.
- *Qualifies like your best agent* — asks timeline, financing, availability,
  one question at a time.
- *Books the viewing* — offers real slots and confirms.
- *Never lets a lead go cold* — follows up 5× so you don't have to.

**3.5 How it works (3 steps)**
A simple horizontal timeline: **1.** Buyer enquires on your listing → **2.** AI
texts back in seconds and qualifies → **3.** Viewing booked, you get the warm
lead. Keep it skimmable; one illustration per step.

**3.6 Interactive demo block (the killer section)**
*"Don't take our word for it — feel it."* A mini enquiry form (name + phone) or
a big CTA into the live demo (`/demo-acres`). Copy: **"Enter your number and
watch your phone buzz."** Pair it with a peek of the dashboard hero
(8s vs 15hrs) so they see the proof and the product at once.

**3.7 Proof / results**
The side-by-side response-timer visual (our 8s vs the 15hr benchmark) rendered
large, plus a short "what this means in deals won" line. Optional: a
representative dashboard screenshot, and 1–2 testimonial slots (placeholder).

**3.8 Why us / differentiators**
3 points: *Live in minutes per agency* (one row + a logo, no rebuild) · *Branded
as you* (your name, your number — buyers never see a third party) · *No app, no
CRM migration* (it just works over SMS).

**3.9 Objection-handling FAQ**
Accordion. Cover the real objections: *Does it sound like a bot?* (no — it's
tuned to read like a sharp human agent) · *Is this spammy / compliant?* (only
texts people who enquire; A2P-registered) · *Does it work with my CRM?* ·
*What does it cost?* · *What if it doesn't know an answer about the home?* (it
says it'll check with you and pivots to booking — never invents facts).

**3.10 Final CTA**
Full-width band: *"Stop losing deals to whoever answers first."* Two buttons:
**See the live demo** · **Book a call.**

**3.11 Footer**
Logo, contact, the demo link, a quiet legal line. Note: marketing claims/stats
should be verified before this goes public.

---

## 4. LISTING PAGE (`/[slug]`) — section by section

Goal: look like a premium, trustworthy agency listing, with the enquiry CTA as
the hero of the demo moment. Everything here is skinnable per prospect.

**4.1 Brand bar**
Agency logo (or name) left; agent name + phone right. Thin, confident, uses the
prospect's accent color.

**4.2 Hero gallery**
Bigger, more immersive than today: a full-bleed main photo with a 2–3 image grid
or a lightbox. Should feel like a real listing site. Graceful placeholder when a
prospect hasn't uploaded photos yet.

**4.3 Price + address + key facts**
Price (Fraunces, large), address, and a facts row: beds · baths · sqft · lot ·
year. Hairline-bordered, scannable.

**4.4 Sticky enquiry card (THE demo CTA — keep it the hero)**
Sticky on desktop. Kicker "See it for yourself" → headline **"Enter your number
and see exactly what your buyer gets"** → subline "Your phone buzzes in seconds
with a real, personalised reply." Fields: name, mobile, (optional email,
optional message). Button: "Text me about this home." On success it flips to the
"Check your phone — replied in 8s" confirmation with the drafted message shown.
This card must never get buried — it's the moment.

**4.5 Description**
Editorial paragraph(s) about the home. Calm, lots of breathing room.

**4.6 Features / amenities**
A clean two-column checklist (e.g. chef's kitchen, hardwood floors, garage,
A/C). Optional per prospect.

**4.7 Neighborhood / location**
Map placeholder + a few nearby highlights (schools, parks, transit, walk score).
Builds trust and realism.

**4.8 Meet your agent**
Agent photo, name, a line of bio, and the same contact. Reinforces "a real human
is behind this," which is the whole positioning.

**4.9 Secondary CTA + footer**
A quiet "Prefer to schedule a viewing?" secondary, then a minimal footer with
the agency brand. The primary path stays the enquiry card.

---

## 5. How to use this with a design tool

1. Generate each section above as its own frame so you can iterate per section.
2. Keep the type pairing (Fraunces + DM Sans) and the token palette in §2 so
   what comes back maps cleanly onto the build.
3. Prioritise the two hero moments: the marketing **hero phone + timer** (3.2)
   and the listing **sticky enquiry card** (4.4). If you only perfect two
   frames, perfect those.
4. Bring the designs back here and I'll build them as render-only components in
   the existing layered structure, wired to the live `/api/lead` flow and the
   per-prospect data.
