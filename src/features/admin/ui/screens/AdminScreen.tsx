"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Prospect } from "@/domain/prospect/types";
import { parsePhotoList } from "@/domain/prospect/adminInput";
import { createSupabaseBrowserClient } from "@/infrastructure/supabase/browser";
import { ProspectForm, type ProspectFields } from "../components/ProspectForm";

// The operator console. Owns the create/edit form state + mutation flow;
// the form and rows are render-only. After a change it router.refresh()es so
// the server page re-loads the prospect list.

const EMPTY: ProspectFields = {
  slug: "",
  brand_name: "",
  agent_name: "",
  agent_phone: "",
  listing_address: "",
  logo_url: "",
  primary_color: "#1f6feb",
  listing_price: "",
  listing_beds: "",
  listing_baths: "",
  listing_description: "",
  photosText: "",
  tz: "America/Chicago",
};

function fieldsFrom(p: Prospect): ProspectFields {
  return {
    slug: p.slug,
    brand_name: p.brand_name,
    agent_name: p.agent_name,
    agent_phone: p.agent_phone,
    listing_address: p.listing_address,
    logo_url: p.logo_url ?? "",
    primary_color: p.primary_color ?? "#1f6feb",
    listing_price: p.listing_price != null ? String(p.listing_price) : "",
    listing_beds: p.listing_beds != null ? String(p.listing_beds) : "",
    listing_baths: p.listing_baths != null ? String(p.listing_baths) : "",
    listing_description: p.listing_description ?? "",
    photosText: (p.listing_photos ?? []).join("\n"),
    tz: p.availability?.tz ?? "America/Chicago",
  };
}

export function AdminScreen({ prospects, appUrl }: { prospects: Prospect[]; appUrl: string }) {
  const router = useRouter();
  const [fields, setFields] = useState<ProspectFields>(EMPTY);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Invite-a-broker state.
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteProspectId, setInviteProspectId] = useState(prospects[0]?.id ?? "");
  const [inviteMsg, setInviteMsg] = useState<string | null>(null);
  const [inviteBusy, setInviteBusy] = useState(false);

  function onField(name: keyof ProspectFields, value: string) {
    setFields((f) => ({ ...f, [name]: value }));
  }
  function reset() {
    setFields(EMPTY);
    setMode("create");
    setEditingId(null);
    setError(null);
  }
  function startEdit(p: Prospect) {
    setFields(fieldsFrom(p));
    setMode("edit");
    setEditingId(p.id);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toPayload() {
    const num = (s: string) => (s.trim() === "" ? null : Number(s));
    return {
      slug: fields.slug.trim(),
      brand_name: fields.brand_name.trim(),
      agent_name: fields.agent_name.trim(),
      agent_phone: fields.agent_phone.trim(),
      listing_address: fields.listing_address.trim(),
      logo_url: fields.logo_url.trim(),
      primary_color: fields.primary_color.trim(),
      listing_price: num(fields.listing_price),
      listing_beds: num(fields.listing_beds),
      listing_baths: num(fields.listing_baths),
      listing_description: fields.listing_description.trim(),
      listing_photos: parsePhotoList(fields.photosText),
      tz: fields.tz.trim() || undefined,
    };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const url = mode === "create" ? "/api/admin/prospects" : `/api/admin/prospects/${editingId}`;
    const method = mode === "create" ? "POST" : "PUT";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload()),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong.");
        return;
      }
      reset();
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(p: Prospect) {
    if (!window.confirm(`Delete ${p.brand_name}? This also removes its leads and conversations.`)) return;
    await fetch(`/api/admin/prospects/${p.id}`, { method: "DELETE" });
    if (editingId === p.id) reset();
    router.refresh();
  }

  async function onInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviteBusy(true);
    setInviteMsg(null);
    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail.trim(), prospectId: inviteProspectId }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string; error?: string };
      if (!res.ok || !json.ok) {
        setInviteMsg(json.error ?? "Could not send invite.");
        return;
      }
      setInviteMsg(json.message ?? "Invite sent.");
      setInviteEmail("");
    } catch {
      setInviteMsg("Network error.");
    } finally {
      setInviteBusy(false);
    }
  }

  async function logout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="sl-adm">
      <header className="sl-adm__head">
        <span className="sl-adm__title">Prospects</span>
        <button className="sl-adm-link" onClick={logout}>
          Log out
        </button>
      </header>

      <ProspectForm
        fields={fields}
        onField={onField}
        onSubmit={onSubmit}
        onCancel={reset}
        mode={mode}
        submitting={submitting}
        error={error}
      />

      <div className="sl-adm__list">
        <div className="sl-adm__listhead">
          {prospects.length} prospect{prospects.length === 1 ? "" : "s"}
        </div>
        {prospects.length === 0 ? (
          <div className="sl-adm__empty">No prospects yet — create your first above.</div>
        ) : (
          prospects.map((p) => (
            <div key={p.id} className="sl-adm-row">
              <div className="sl-adm-row__main">
                <span className="sl-adm-row__brand">{p.brand_name}</span>
                <span className="sl-adm-row__slug">/{p.slug}</span>
              </div>
              <div className="sl-adm-row__links">
                <a href={`${appUrl}/${p.slug}`} target="_blank" rel="noopener noreferrer">
                  Listing ↗
                </a>
                <a
                  href={`${appUrl}/${p.slug}/dashboard?k=${p.dashboard_slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dashboard ↗
                </a>
              </div>
              <div className="sl-adm-row__actions">
                <button className="sl-adm-link" onClick={() => startEdit(p)}>
                  Edit
                </button>
                <button className="sl-adm-link sl-adm-link--danger" onClick={() => onDelete(p)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <section className="sl-adm-invite">
        <h2>Invite a broker</h2>
        <p className="sl-adm-invite__hint">
          They&rsquo;ll get an email to set a password, then see only this prospect&rsquo;s dashboard.
        </p>
        <form className="sl-adm-invite__form" onSubmit={onInvite}>
          <input
            className="sl-input"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="broker@agency.com"
          />
          <select
            className="sl-input"
            value={inviteProspectId}
            onChange={(e) => setInviteProspectId(e.target.value)}
          >
            {prospects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.brand_name}
              </option>
            ))}
          </select>
          <button className="sl-btn" type="submit" disabled={inviteBusy || prospects.length === 0}>
            {inviteBusy ? "Sending…" : "Send invite"}
          </button>
        </form>
        {inviteMsg && <p className="sl-adm-invite__msg">{inviteMsg}</p>}
      </section>
    </main>
  );
}
