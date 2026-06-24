# Speed-to-Lead Demo — Full Build Spec (v2)

A complete, opinionated spec with the reasoning behind each choice, so you can verify your build is on the right path. Read the multi-tenancy section carefully, it's the load-bearing decision.

---

## 1. The target, so the build stays honest

This app is not a product you sell. It's the hook that lands real estate clients. Your fast channel is research-heavy one-to-one outreach, and your edge is showing instead of pitching. So this demo exists to do one thing: make a brokerage owner feel, on their own phone, the gap between how fast their leads should be answered and how slowly they actually are.

Your target buyer is a small to mid brokerage, roughly 1 to 50 people, in the UK, Norway, Sweden, or the US, run by an owner or principal who decides their own spend. The outcome you're chasing is a signed client inside 30 days. The job of this app is to turn a cold outreach message into a live link where the prospect watches their own listing reply to a buyer in seconds. Every feature decision below is judged against that. If it doesn't make the demo moment land harder, it waits.

## 2. What the app is, in one paragraph

A multi-tenant web app where each prospect gets their own branded property listing page. A visitor fills in an enquiry, and within seconds an AI replies by SMS and email, greets them by name, talks about that specific property, asks the few questions a good agent asks, and offers a viewing slot. Behind it, a dashboard shows the response time stamped against the industry average, plus the lead and the full conversation. One codebase, one database, one deployment, serving many prospects, each isolated and individually branded.

## 3. The three people who touch it

The buyer is whoever fills in the form. In a real deployment that's a property shopper. In your demo it's the broker testing their own page, or you. They submit, they get an instant reply, they can converse and book.

The broker is the prospect you're pitching. They never log in for v1. They open a secret dashboard link and watch the leads, the response times, and the conversations. They're the audience for the whole thing.

You are the operator. You skin a new prospect by adding one database row and a few images. You never touch code to onboard prospect number twenty.

## 4. The demo moment, the thing to optimize above all

The call to action on a skinned listing page is not "Enquire." It's "Enter your number and see exactly what your buyer gets." The broker tests it on themselves. Their phone buzzes in under ten seconds with a personalized text naming their property. They reply, the AI qualifies them and offers a viewing. Then they open the dashboard and see "Responded in 8 seconds" beside "The average agent takes over 15 hours, and 78 percent of buyers go with whoever answers first."

That contrast is the entire sale. Build outward from it. If you have to choose where to spend a polish hour, spend it here.

## 5. Multi-tenancy, the core architecture decision

A tenant is a prospect. The whole point is that one running app serves dozens of branded prospect experiences without a redeploy, because you're contacting six prospects a day and cannot stand up a new app for each.

Do it path-based, not deploy-based. One Next.js app on Vercel, one Supabase database. Each prospect is a row in a `prospects` table with a unique `slug`. The dynamic route `demo.forgedbyraji.com/[slug]` loads that prospect's branding and listing at request time. Onboarding a new prospect is an insert, not a deployment.

Tenant isolation is by row. Every table that holds prospect-specific data carries a `prospect_id` foreign key. Every query filters by it. A lead, a message, a booking always belongs to exactly one prospect, and nothing leaks across tenants because nothing is ever queried without the prospect filter.

Theming is data, not code. The prospect row holds `brand_name`, `logo_url`, and `primary_color`. At render you inject the color as a CSS variable and drop in the logo, so the same components reskin entirely from the row. No per-tenant CSS files, no forks.

Dashboard access without auth. For v1 you don't want a login system. Give each prospect row a long random `dashboard_token` and gate the dashboard at `demo.forgedbyraji.com/[slug]/dashboard?key=TOKEN`. It's per-tenant, unguessable, and good enough for a demo. Real auth is a v2 problem you don't have yet.

Path-based over subdomain-based for v1. Subdomains per tenant (`hannons.demo.forgedbyraji.com`) look slightly slicker but add DNS and certificate complexity for zero demo benefit. Paths ship today. Keep the option open, don't pay for it now.

If you've already built it as one app deploy per client, that's the thing to fix before you scale outreach. The row-per-tenant model is what makes the fifteen-minutes-per-prospect promise real.

## 6. Architecture overview

Next.js (App Router) on Vercel hosts the listing page, the dashboard, and the API routes. It renders each tenant from its row and owns the instant-reply logic.

Supabase is the database and file storage. It holds the tenants and all lead data, and stores logos and listing photos in a bucket.

The Claude API writes the personalized instant reply and runs the qualifying conversation, always grounded in the specific listing's facts so it never invents a detail.

n8n owns the follow-up drip after the first reply. The first reply itself does not go through n8n.

Twilio sends and receives SMS. Resend sends email. A slot picker or Cal.com handles the viewing booking.

A deliberate split worth understanding: the first reply fires synchronously from the Next.js API route, not from n8n, because n8n can cold-start and the entire effect depends on the reply being near-instant. n8n only handles the slower, scheduled follow-ups where a few seconds of latency doesn't matter. Get this wrong and your "8 seconds" becomes "90 seconds" and the demo dies.

## 7. Data model

`prospects`: id, slug, brand_name, logo_url, primary_color, agent_name, agent_phone, dashboard_token, listing_address, listing_price, listing_beds, listing_baths, listing_description, listing_photos (jsonb array of urls), created_at.

`leads`: id, prospect_id (fk), buyer_name, buyer_phone, buyer_email, message, created_at, first_response_at, response_seconds.

`messages`: id, lead_id (fk), prospect_id (fk), role (assistant or buyer), channel (sms, email, chat), body, created_at.

`bookings`: id, lead_id (fk), prospect_id (fk), slot_datetime, status, created_at.

Carry `prospect_id` even where you could reach it through a join. It makes tenant-scoped queries trivial and keeps isolation obvious. Turn on Row Level Security with policies scoped by prospect once you're past the first working version, it's cheap insurance and good habit, though the secret-token dashboard means it isn't blocking for v1.

## 8. The lead lifecycle, end to end

A visitor on `/[slug]` submits the enquiry form, which posts to `POST /api/lead`. That route, in order: looks up the prospect by slug, inserts the lead, calls Claude with the listing facts and the buyer's message to draft a warm reply, sends that reply by SMS via Twilio and by email via Resend, stamps `first_response_at` and computes `response_seconds`, writes the assistant message, and finally fires a webhook to n8n to begin the follow-up sequence. Target is under ten seconds end to end, usually two or three.

When the buyer replies by text, Twilio's inbound webhook hits `POST /api/reply`. That route identifies the lead, loads the conversation, calls Claude to continue qualifying, and texts back. Once the buyer is qualified, the AI offers two or three viewing slots, and accepting one writes a `bookings` row and notifies the agent.

## 9. The AI qualifier

One system prompt, fed the prospect and listing context plus the running conversation. It greets the buyer by name, names the property by address, sounds like a sharp human agent rather than a bot, keeps each message to SMS length, asks one qualifying question at a time, timeline then financing then viewing availability, and moves toward offering a slot. The listing facts live in the prompt so it cannot invent a detail about the property. This is your VoxAnima pattern aimed at a single listing.

## 10. Follow-up automation

n8n holds the drip, which is your visible answer to the stat that most leads need five or more touches while nearly half of agents quit after one. The webhook trigger waits, checks whether the buyer has replied, and if not sends a follow-up after an hour, then the next day, up to five touches, each one generated by Claude so it reads human. In the demo you can compress these intervals so a prospect can watch the persistence work in minutes.

## 11. The dashboard

One page at `/[slug]/dashboard`, gated by the token. The top is the hero: the latest lead's response time in large type next to the industry benchmark and the first-responder stat. Below it, the lead list, and clicking a lead opens the full conversation and any booking. This is what you screen-share. Make the hero number impossible to miss, it is the proof.

## 12. Skinning a new prospect

Insert one `prospects` row with their branding, agent details, and a fresh dashboard token. Upload their logo and three or four photos of one real listing to the Supabase bucket. Paste the listing's address, price, beds, baths, and description into the row. Done. The page at their slug is now live and branded as them. This should take fifteen minutes, and if it takes longer, something in your config is still hard-coded that should be data.

## 13. Build order, one to two days

Day one morning: scaffold the app, create the schema, build the `/[slug]` page that renders branding and listing from a row, and seed one test tenant.

Day one afternoon: the enquiry form, the `/api/lead` route, the Claude-written instant reply, and the Twilio plus Resend send. Land one real text on your phone in seconds. Do not move on until this works end to end, it's the core.

Day two morning: the dashboard with the response-time hero and the conversation view, then the inbound `/api/reply` route so the AI qualifies a reply and offers slots.

Day two afternoon: the n8n follow-up drip, the booking slot picker, polish, deploy to the `demo.forgedbyraji.com` subdomain, and seed one full prospect to rehearse the whole moment yourself.

## 14. Definition of done

You open a skinned page, enter your number, and within ten seconds your phone has a personalized text naming the property. You reply, the AI qualifies you and offers a viewing slot, and booking one writes to the database. The dashboard shows the response time against the 15-hour benchmark. Adding a brand new prospect is one row plus images, no code. When all of that is true, stop building.

## 15. Out of scope for v1

No multi-listing CMS per tenant, one listing each is enough to sell. No payment. No real auth, the token is fine. No agent-facing admin beyond the read-only dashboard. No analytics suite. The product is what they pay you to build after the demo lands them, not the demo itself.

## 16. The one multi-tenant gotcha to plan for

Inbound SMS. When a buyer texts back, Twilio tells you which number it came from, and you have to map that back to the right tenant and lead. With a single shared Twilio number and one tester at a time, match the inbound by the buyer's phone to their most recent open lead. That's fine for demos. If you ever run two live prospects whose buyers text the same number at once, you'll need either a dedicated Twilio number per tenant or a routing key, but that's a v2 concern. Just know it's there so it doesn't surprise you.

## 17. Accounts and keys to line up

Anthropic API key. A Twilio account and number, noting the trial only texts verified numbers, which is fine since the tester is the broker or you. A Resend key with a verified sending domain. A Supabase project with a storage bucket. A Vercel project on the `demo.forgedbyraji.com` subdomain. An n8n instance, cloud or self-hosted.

## 18. Demo safety

The number that gets texted is always whoever filled the form, which during a pitch is the broker on their own page, or you. Never wire the demo to text real buyers pulled from a prospect's site. The whole effect comes from the broker feeling it on their own phone, and a stranger getting an unexpected text is the one way this backfires.
