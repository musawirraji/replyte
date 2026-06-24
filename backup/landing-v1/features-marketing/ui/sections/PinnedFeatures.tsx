"use client";

import type { CSSProperties } from "react";
import { FEATURE_STEPS } from "@/domain/marketing/content";
import { accentVars, stepFromProgress } from "@/domain/marketing/motion";
import { useSectionProgress } from "../hooks/scroll";
import { CheckCircle, ArrowRight } from "../components/Icons";

// §4 — Pinned features (dark). Left sticky nav + progress, middle scrolling
// copy blocks, right sticky product image that crossfades. The active step is
// derived from the section's own scroll progress and drives all three.

export function PinnedFeatures() {
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const active = stepFromProgress(progress, FEATURE_STEPS.length);

  return (
    <section
      ref={ref}
      className="sl-mkt-pf"
      data-screen-label="What it does"
    >
      <div className="sl-mkt-pf__grid">
        {/* Left — sticky nav */}
        <aside className="sl-mkt-pf__nav">
          <span className="sl-mkt-eyebrow sl-mkt-eyebrow--onDark">What it does</span>
          <ul className="sl-mkt-pf__list">
            {FEATURE_STEPS.map((s, i) => {
              const a = accentVars(s.accent);
              const style = {
                "--step-accent": a.light,
              } as CSSProperties;
              return (
                <li
                  key={s.num}
                  className={`sl-mkt-pf__item${i === active ? " sl-mkt-pf__item--active" : ""}`}
                  style={style}
                >
                  <span className="sl-mkt-pf__chip">{s.num}</span>
                  <span className="sl-mkt-pf__navlabel">{s.navLabel}</span>
                </li>
              );
            })}
          </ul>
          <span className="sl-mkt-pf__progress">
            <span style={{ width: `${progress * 100}%` }} />
          </span>
        </aside>

        {/* Middle — scrolling copy blocks */}
        <div className="sl-mkt-pf__blocks">
          {FEATURE_STEPS.map((s, i) => {
            const a = accentVars(s.accent);
            const style = { "--step-accent": a.light } as CSSProperties;
            return (
              <article
                key={s.num}
                className={`sl-mkt-pf__block${i === active ? " sl-mkt-pf__block--active" : ""}`}
                style={style}
              >
                <span className="sl-mkt-pf__beyebrow">
                  {s.num} — {s.navLabel}
                </span>
                <h3 className="sl-mkt-pf__title">{s.title}</h3>
                <p className="sl-mkt-pf__body">{s.body}</p>
                <ul className="sl-mkt-pf__bullets">
                  {s.bullets.map((b) => (
                    <li key={b}>
                      <CheckCircle size={18} /> {b}
                    </li>
                  ))}
                </ul>
                <span className="sl-mkt-pf__ghost">
                  {s.cta} <ArrowRight size={15} />
                </span>
              </article>
            );
          })}
        </div>

        {/* Right — sticky product visual */}
        <div className="sl-mkt-pf__visual">
          {FEATURE_STEPS.map((s, i) => (
            <img
              key={s.image}
              src={s.image}
              alt={s.navLabel}
              className={`sl-mkt-pf__img${i === active ? " sl-mkt-pf__img--active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
