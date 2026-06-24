import { createSupabaseAdminClient } from "./admin";
import type { Availability, Prospect } from "@/domain/prospect/types";

// ─── Prospect data access (infrastructure) ──────────────────
// Typed reads against the prospects table via the service-role client.
// Returns domain Prospect objects (or null), normalising the jsonb columns.

const DEFAULT_AVAILABILITY: Availability = {
  tz: "America/Chicago",
  days: [1, 2, 3, 4, 5],
  hours: [10, 14, 17],
};

function parseAvailability(value: unknown): Availability {
  const v = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    tz: typeof v.tz === "string" ? v.tz : DEFAULT_AVAILABILITY.tz,
    days: Array.isArray(v.days) ? (v.days as number[]) : DEFAULT_AVAILABILITY.days,
    hours: Array.isArray(v.hours) ? (v.hours as number[]) : DEFAULT_AVAILABILITY.hours,
  };
}

function rowToProspect(row: Record<string, unknown>): Prospect {
  return {
    id: String(row.id),
    slug: String(row.slug),
    dashboard_slug: String(row.dashboard_slug),
    brand_name: String(row.brand_name),
    logo_url: (row.logo_url as string | null) ?? null,
    primary_color: (row.primary_color as string | null) ?? null,
    agent_name: String(row.agent_name),
    agent_phone: String(row.agent_phone),
    listing_address: String(row.listing_address),
    listing_price: (row.listing_price as number | null) ?? null,
    listing_beds: (row.listing_beds as number | null) ?? null,
    listing_baths: (row.listing_baths as number | null) ?? null,
    listing_description: (row.listing_description as string | null) ?? null,
    listing_photos: Array.isArray(row.listing_photos)
      ? (row.listing_photos as string[])
      : [],
    availability: parseAvailability(row.availability),
    created_at: String(row.created_at),
  };
}

/** Fetch a prospect by its public listing slug. */
export async function getProspectBySlug(slug: string): Promise<Prospect | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("prospects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[prospects] getProspectBySlug:", error.message);
    return null;
  }
  return data ? rowToProspect(data) : null;
}

/** Fetch a prospect by id — used by the inbound reply webhook. */
export async function getProspectById(id: string): Promise<Prospect | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("prospects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[prospects] getProspectById:", error.message);
    return null;
  }
  return data ? rowToProspect(data) : null;
}

/**
 * Fetch a prospect for the dashboard. Requires BOTH the public slug and the
 * secret dashboard_slug to match — so the public page never reveals the
 * dashboard. Still security-by-obscurity; see README.
 */
export async function getProspectForDashboard(
  slug: string,
  dashboardSlug: string,
): Promise<Prospect | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("prospects")
    .select("*")
    .eq("slug", slug)
    .eq("dashboard_slug", dashboardSlug)
    .maybeSingle();
  if (error) {
    console.error("[prospects] getProspectForDashboard:", error.message);
    return null;
  }
  return data ? rowToProspect(data) : null;
}
