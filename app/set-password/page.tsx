import type { Metadata } from "next";
import { SetPasswordForm } from "@/features/auth/ui/SetPasswordForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Set password — Replyte",
  robots: { index: false, follow: false },
};

export default function SetPasswordPage() {
  return <SetPasswordForm />;
}
