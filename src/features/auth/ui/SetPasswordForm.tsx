"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/infrastructure/supabase/browser";

// Where an invited broker sets their password. They arrive here already
// signed in (the invite link exchanged a session via /auth/callback).

export function SetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    router.push("/app");
    router.refresh();
  }

  return (
    <main className="sl-adm-gate">
      <form className="sl-adm-gate__card" onSubmit={onSubmit}>
        <h1 className="sl-adm-gate__title">Set your password</h1>
        <p className="sl-adm-gate__sub">Choose a password to finish setting up your account.</p>
        <input
          className="sl-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          autoComplete="new-password"
          autoFocus
        />
        {error && <p className="sl-form__error">{error}</p>}
        <button className="sl-btn sl-btn--block" type="submit" disabled={busy}>
          {busy ? "Saving…" : "Set password & continue"}
        </button>
      </form>
    </main>
  );
}
