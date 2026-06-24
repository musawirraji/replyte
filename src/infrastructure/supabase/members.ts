import { createSupabaseAdminClient } from "./admin";

// ─── Prospect membership (infrastructure) ───────────────────
// Which broker users may access which prospect. Operators bypass this
// (allowlist). Reads/writes via the service-role client.

export async function isMember(userId: string, prospectId: string): Promise<boolean> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("prospect_members")
    .select("prospect_id")
    .eq("user_id", userId)
    .eq("prospect_id", prospectId)
    .maybeSingle();
  if (error) {
    console.error("[members] isMember:", error.message);
    return false;
  }
  return !!data;
}

export async function listMemberProspectIds(userId: string): Promise<string[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("prospect_members")
    .select("prospect_id")
    .eq("user_id", userId);
  if (error) {
    console.error("[members] listMemberProspectIds:", error.message);
    return [];
  }
  return (data ?? []).map((r) => r.prospect_id as string);
}

export async function addMember(prospectId: string, userId: string): Promise<void> {
  const db = createSupabaseAdminClient();
  const { error } = await db
    .from("prospect_members")
    .upsert({ prospect_id: prospectId, user_id: userId });
  if (error) console.error("[members] addMember:", error.message);
}
