import { NextResponse } from "next/server";
import { z } from "zod";
import { getOperator } from "@/lib/auth";
import { publicEnv } from "@/lib/env";
import { inviteBrokerUser } from "@/infrastructure/supabase/authAdmin";
import { addMember } from "@/infrastructure/supabase/members";

// POST /api/admin/invite — operator invites a broker by email and links them
// to a prospect. Sends a Supabase invite → set-password flow.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().trim().email(),
  prospectId: z.string().uuid(),
});

export async function POST(req: Request) {
  if (!(await getOperator())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email or prospect" }, { status: 400 });
  }
  const { email, prospectId } = parsed.data;

  const redirectTo = `${publicEnv.NEXT_PUBLIC_APP_URL}/auth/callback?next=/set-password`;
  const user = await inviteBrokerUser(email, redirectTo);
  if (!user) {
    return NextResponse.json({ ok: false, error: "Could not invite this email" }, { status: 500 });
  }

  await addMember(prospectId, user.id);
  return NextResponse.json({
    ok: true,
    invited: user.invited,
    message: user.invited
      ? `Invite sent to ${email}.`
      : `${email} already had an account — linked to this prospect.`,
  });
}
