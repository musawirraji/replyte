import { NextResponse } from "next/server";
import { adminProspectSchema } from "@/domain/prospect/adminInput";
import { updateProspect, deleteProspect } from "@/infrastructure/supabase/prospects";
import { getOperator } from "@/lib/auth";

// PUT /api/admin/prospects/[id] — update; DELETE — remove. Operator console.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getOperator())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const parsed = adminProspectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid prospect", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const prospect = await updateProspect(id, parsed.data);
  if (!prospect) {
    return NextResponse.json({ ok: false, error: "Could not update" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, prospect });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getOperator())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteProspect(id);
  return NextResponse.json({ ok });
}
