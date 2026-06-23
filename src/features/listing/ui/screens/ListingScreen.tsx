"use client";

import { useState, type CSSProperties } from "react";
import type { PublicProspect } from "@/domain/prospect/types";
import { accentColor } from "@/domain/prospect/listing";
import { leadInputSchema } from "@/domain/lead/leadInput";
import { BrandBar } from "../components/BrandBar";
import { Gallery } from "../components/Gallery";
import { ListingDetails } from "../components/ListingDetails";
import {
  EnquiryForm,
  type EnquiryFields,
} from "../components/EnquiryForm";
import { SentConfirmation } from "../components/SentConfirmation";

// The skinned listing page. Owns the enquiry form state and the submit flow;
// composes the render-only pieces. The per-prospect brand colour is applied
// as --sl-accent on the root (the one allowed dynamic inline value).

interface SentState {
  responseSeconds: number;
  reply: string;
}

const EMPTY: EnquiryFields = {
  buyerName: "",
  buyerPhone: "",
  buyerEmail: "",
  message: "",
};

export function ListingScreen({ prospect }: { prospect: PublicProspect }) {
  const [fields, setFields] = useState<EnquiryFields>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<SentState | null>(null);

  const accentStyle = {
    "--sl-accent": accentColor(prospect),
  } as CSSProperties;

  function onField(name: keyof EnquiryFields, value: string) {
    setFields((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate with the same schema the API uses.
    const candidate = {
      slug: prospect.slug,
      buyerName: fields.buyerName,
      buyerPhone: fields.buyerPhone,
      buyerEmail: fields.buyerEmail,
      message: fields.message,
    };
    const check = leadInputSchema.safeParse(candidate);
    if (!check.success) {
      const first = check.error.issues[0];
      setError(first?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      const json = (await res.json()) as {
        ok: boolean;
        responseSeconds?: number;
        reply?: string;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent({
        responseSeconds: json.responseSeconds ?? 0,
        reply: json.reply ?? "",
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="sl-listing" style={accentStyle}>
      <BrandBar prospect={prospect} />
      <Gallery prospect={prospect} />
      <div className="sl-body">
        <ListingDetails prospect={prospect} />
        {sent ? (
          <SentConfirmation
            responseSeconds={sent.responseSeconds}
            reply={sent.reply}
            dashboardHref={null}
          />
        ) : (
          <EnquiryForm
            fields={fields}
            onField={onField}
            onSubmit={onSubmit}
            error={error}
            submitting={submitting}
          />
        )}
      </div>
    </main>
  );
}
