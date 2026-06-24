import { NextResponse } from "next/server";
import { adminProspectSchema } from "@/domain/prospect/adminInput";
import { insertProspect } from "@/infrastructure/supabase/prospects";
import { getOperator } from "@/lib/auth";

// POST /api/admin/prospects — create a prospect (operator console).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!(await getOperator())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const parsed = adminProspectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid prospect", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const prospect = await insertProspect(parsed.data);
  if (!prospect) {
    return NextResponse.json(
      { ok: false, error: "Could not create — the slug may already be in use." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, prospect });
}
