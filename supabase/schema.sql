-- ─── Speed-to-Lead Supabase schema ──────────────────────────
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- Runnable top-to-bottom. Creates the four demo tables, RLS policies, and
-- a seed prospect so /demo-acres renders immediately.
--
-- Security model (v1): every table has RLS ENABLED with NO public policy,
-- so the anon/browser key can read nothing. All access goes through the
-- service-role key in the API routes (which bypasses RLS). The dashboard is
-- gated by an unguessable `dashboard_slug` — security-by-obscurity, fine for
-- a demo but NOT real auth. See README "Security notes".

-- ── prospects ───────────────────────────────────────────────
-- One row per skinned prospect. Skinning = insert a row + upload assets.
create table if not exists prospects (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,          -- public listing URL: /[slug]
  dashboard_slug      text unique not null,          -- secret dashboard URL: /[slug]/dashboard?k=...  (kept distinct + high-entropy)
  brand_name          text not null,
  logo_url            text,
  primary_color       text default '#1f6feb',        -- hex; overrides --sl-accent
  agent_name          text not null,
  agent_phone         text not null,                 -- the agent's own number (display only)
  listing_address     text not null,
  listing_price       bigint,                        -- whole currency units (e.g. dollars)
  listing_beds        int,
  listing_baths       numeric(3, 1),
  listing_description text,
  listing_photos      jsonb not null default '[]'::jsonb, -- array of image urls
  created_at          timestamptz not null default now()
);

create index if not exists prospects_slug_idx on prospects (slug);
create index if not exists prospects_dashboard_slug_idx on prospects (dashboard_slug);

-- ── leads ───────────────────────────────────────────────────
-- One row per enquiry. response_seconds is the hero metric.
create table if not exists leads (
  id                uuid primary key default gen_random_uuid(),
  prospect_id       uuid not null references prospects (id) on delete cascade,
  buyer_name        text not null,
  buyer_phone       text not null,
  buyer_email       text,
  message           text,
  created_at        timestamptz not null default now(),
  first_response_at timestamptz,
  response_seconds  numeric                          -- first_response_at - created_at, stamped by /api/lead
);

create index if not exists leads_prospect_idx on leads (prospect_id, created_at desc);
create index if not exists leads_phone_idx on leads (buyer_phone);

-- ── messages ────────────────────────────────────────────────
-- The two-way conversation log (instant reply, buyer replies, AI qualifier).
create table if not exists messages (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references leads (id) on delete cascade,
  role       text not null check (role in ('assistant', 'buyer')),
  channel    text not null default 'sms' check (channel in ('sms', 'email', 'chat')),
  body       text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_lead_idx on messages (lead_id, created_at asc);

-- ── bookings ────────────────────────────────────────────────
-- A booked viewing, written when the buyer accepts a slot.
create table if not exists bookings (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads (id) on delete cascade,
  slot_datetime timestamptz not null,
  status        text not null default 'booked' check (status in ('booked', 'cancelled', 'completed')),
  created_at    timestamptz not null default now()
);

create index if not exists bookings_lead_idx on bookings (lead_id, slot_datetime asc);

-- ── Row Level Security ──────────────────────────────────────
-- Enable RLS everywhere; add NO permissive policy. The anon key therefore
-- sees nothing; the service-role key (server-only) bypasses RLS entirely.
alter table prospects enable row level security;
alter table leads     enable row level security;
alter table messages  enable row level security;
alter table bookings  enable row level security;

-- ── Seed: one demo prospect ─────────────────────────────────
-- Renders at /demo-acres. Dashboard at /demo-acres/dashboard?k=demo-secret-7f3a9c2e.
-- Photos are Unsplash demo images; swap per real prospect.
insert into prospects (
  slug, dashboard_slug, brand_name, logo_url, primary_color,
  agent_name, agent_phone, listing_address, listing_price,
  listing_beds, listing_baths, listing_description, listing_photos
)
values (
  'demo-acres',
  'demo-secret-7f3a9c2e',
  'Demo Acres Realty',
  null,
  '#1f6feb',
  'Jordan Avery',
  '+15555550123',
  '128 Lakeview Terrace, Austin, TX 78701',
  875000,
  4,
  3.0,
  E'A light-filled modern home on a quiet tree-lined street, minutes from downtown.\n\nFloor-to-ceiling windows, a chef''s kitchen with quartz counters, and a landscaped backyard built for entertaining. Walk to parks, cafes, and the lake trail.',
  '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200","https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]'::jsonb
)
on conflict (slug) do nothing;
