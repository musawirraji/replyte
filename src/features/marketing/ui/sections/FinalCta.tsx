"use client";

import { BRAND, FINAL_CTA } from "@/domain/marketing/content";
import { ArrowButton } from "../components/ArrowButton";
import { Star, Lightning } from "../components/Icons";

// §10 — Final CTA (NOT FINAL per handoff). A vivid gradient panel wrapping a
// centred white card with award badges, a star line, and two buttons.

export function FinalCta() {
  return (
    <section className="sl-mkt-cta" data-screen-label="Final CTA">
      <div className="sl-mkt-cta__panel">
        <div className="sl-mkt-cta__card">
          <div className="sl-mkt-cta__badges">
            <span className="sl-mkt-cta__badge sl-mkt-cta__badge--l">
              {FINAL_CTA.badges[0]}
            </span>
            <span className="sl-mkt-cta__logo">
              <Lightning size={18} />
            </span>
            <span className="sl-mkt-cta__badge sl-mkt-cta__badge--r">
              {FINAL_CTA.badges[1]}
            </span>
          </div>

          <div className="sl-mkt-cta__stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={15} />
            ))}
            <span>{FINAL_CTA.reviews}</span>
          </div>

          <h2 className="sl-mkt-cta__title">{FINAL_CTA.title}</h2>
          <p className="sl-mkt-cta__sub">{FINAL_CTA.sub}</p>

          <div className="sl-mkt-cta__buttons">
            <ArrowButton href={BRAND.demoPath} variant="primary">
              {FINAL_CTA.primaryCta}
            </ArrowButton>
            <ArrowButton href={BRAND.demoPath} variant="light" arrow={false}>
              {FINAL_CTA.secondaryCta}
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
