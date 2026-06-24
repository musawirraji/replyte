"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/infrastructure/supabase/browser";

// Email + password sign-in. On success, sends the user to `next` (the
// post-login router at /app decides where operators vs brokers land).

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <main className="sl-adm-gate">
      <form className="sl-adm-gate__card" onSubmit={onSubmit}>
        <h1 className="sl-adm-gate__title">Sign in</h1>
        <p className="sl-adm-gate__sub">Replyte dashboard access</p>
        <input
          className="sl-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@agency.com"
          autoComplete="email"
          autoFocus
        />
        <input
          className="sl-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
        />
        {error && <p className="sl-form__error">{error}</p>}
        <button className="sl-btn sl-btn--block" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
