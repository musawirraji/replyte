// ─── Prospect / listing types ───────────────────────────────
// Mirrors the `prospects` table. Pure types — no I/O, no React.

/** Per-agency viewing availability (drives slot generation). */
export interface Availability {
  tz: string; // IANA timezone, e.g. "America/Chicago"
  days: number[]; // weekdays offered: 0=Sun … 6=Sat
  hours: number[]; // local start hours, e.g. [10, 14, 17]
}

export interface Prospect {
  id: string;
  slug: string;
  dashboard_slug: string;
  brand_name: string;
  logo_url: string | null;
  primary_color: string | null;
  agent_name: string;
  agent_phone: string;
  listing_address: string;
  listing_price: number | null;
  listing_beds: number | null;
  listing_baths: number | null;
  listing_description: string | null;
  listing_photos: string[];
  availability: Availability;
  created_at: string;
}

/**
 * Prospect minus the secret dashboard_slug. This is the ONLY shape allowed to
 * cross into client components / the public listing page, so the secret never
 * ships in the browser bundle.
 */
export type PublicProspect = Omit<Prospect, "dashboard_slug">;
