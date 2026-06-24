"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// The operator key gate for /admin. Posts the key for an httpOnly cookie, then
// refreshes so the server page re-renders the console.

export function AdminLogin() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setError("That key didn't work.");
      setBusy(false);
    }
  }

  return (
    <main className="sl-adm-gate">
      <form className="sl-adm-gate__card" onSubmit={onSubmit}>
        <h1 className="sl-adm-gate__title">Operator console</h1>
        <p className="sl-adm-gate__sub">Enter your admin key to continue.</p>
        <input
          className="sl-input"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Admin key"
          autoFocus
        />
        {error && <p className="sl-form__error">{error}</p>}
        <button className="sl-btn sl-btn--block" type="submit" disabled={busy}>
          {busy ? "Checking…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
