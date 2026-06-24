import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/ui/LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in — Replyte",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <LoginForm next={next ?? "/app"} />;
}
