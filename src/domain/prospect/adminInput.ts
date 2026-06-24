import { z } from "zod";

// ─── Prospect create/edit input (validation, pure) ──────────
// Shared by the admin console form and the /api/admin/prospects routes. The
// secret dashboard_slug and availability defaults are generated server-side,
// not entered by the operator.

export const adminProspectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Slug: lowercase letters, numbers, hyphens only"),
  brand_name: z.string().trim().min(1, "Brand name is required").max(120),
  agent_name: z.string().trim().min(1, "Agent name is required").max(120),
  agent_phone: z.string().trim().min(1, "Agent phone is required").max(30),
  listing_address: z.string().trim().min(1, "Listing address is required").max(200),
  logo_url: z.string().trim().url().optional().or(z.literal("")),
  primary_color: z
    .string()
    .trim()
    .regex(/^#([0-9a-fA-F]{6})$/, "Use a hex colour like #1f6feb")
    .optional()
    .or(z.literal("")),
  listing_price: z.number().int().nonnegative().nullable().optional(),
  listing_beds: z.number().int().nonnegative().nullable().optional(),
  listing_baths: z.number().nonnegative().nullable().optional(),
  listing_description: z.string().trim().max(4000).optional().or(z.literal("")),
  listing_photos: z.array(z.string().url()).max(12).optional(),
  tz: z.string().trim().min(1).optional(),
});

export type AdminProspectInput = z.infer<typeof adminProspectSchema>;

/** Split a textarea of photo URLs (newline/comma separated) into a clean list. */
export function parsePhotoList(raw: string): string[] {
  return raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Slugify a brand name into a candidate slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
