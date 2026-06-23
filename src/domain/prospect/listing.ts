import type { Prospect, PublicProspect } from "./types";

// ─── Listing presentation helpers (pure) ────────────────────
// All formatting/derivation the listing UI needs. Components import these
// and stay render-only (CLAUDE.md §2). No I/O, no React.
//
// These take PublicProspect (no secret dashboard_slug) so they can run in
// client components; a full Prospect is structurally assignable too.

/** Strip the secret dashboard_slug before handing a prospect to the client. */
export function toPublicProspect(p: Prospect): PublicProspect {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dashboard_slug, ...rest } = p;
  return rest;
}

/** "$875,000" — whole-unit price, falls back to "Price on request". */
export function formatPrice(price: number | null): string {
  if (price == null) return "Price on request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

/** "4" or "4.5" — drop a trailing ".0". */
export function formatCount(n: number | null): string {
  if (n == null) return "—";
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export interface ListingFact {
  value: string;
  label: string;
}

/** The bed/bath/etc. row, omitting facts the prospect didn't provide. */
export function listingFacts(p: PublicProspect): ListingFact[] {
  const facts: ListingFact[] = [];
  if (p.listing_beds != null)
    facts.push({ value: formatCount(p.listing_beds), label: "Bedrooms" });
  if (p.listing_baths != null)
    facts.push({ value: formatCount(p.listing_baths), label: "Bathrooms" });
  return facts;
}

/** The accent colour to inject as --sl-accent, validated to a safe hex. */
export function accentColor(p: PublicProspect): string {
  const c = (p.primary_color ?? "").trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c) ? c : "#1f6feb";
}

/** Split photos into the hero image and up to two thumbnails. */
export function galleryImages(p: PublicProspect): { main: string | null; thumbs: string[] } {
  const photos = Array.isArray(p.listing_photos) ? p.listing_photos : [];
  return { main: photos[0] ?? null, thumbs: photos.slice(1, 3) };
}

/** Compact agent contact line for the brand bar. */
export function agentLine(p: PublicProspect): string {
  return `${p.agent_name} · ${p.agent_phone}`;
}
