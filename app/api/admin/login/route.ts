import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env";
import { ADMIN_COOKIE } from "@/lib/adminAuth";

// POST /api/admin/login — exchange the admin key for an httpOnly session
// cookie. DELETE — log out. Operator-only gate; see lib/adminAuth.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { key?: string } | null;
  const key = body?.key ?? "";
  if (!serverEnv.ADMIN_KEY || key !== serverEnv.ADMIN_KEY) {
    return NextResponse.json({ ok: false, error: "Invalid key" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, key, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
