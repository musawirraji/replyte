"use client";

import type { CSSProperties } from "react";
import { BRAND, HERO } from "@/domain/marketing/content";
import { clamp, formatTimer } from "@/domain/marketing/motion";
import { useScrollY, useLoopingTimer } from "../hooks/scroll";
import { ArrowButton } from "../components/ArrowButton";
import { Check } from "../components/Icons";

// §2 — Hero. Parallax photo + colour glows + ripple rings behind a centred
// copy block, with a floating glass "stage" of 5 cards driven by a looping
// 0→8s timer. The timer is rAF-based (see useLoopingTimer) so it never
// restarts the sibling CSS animations.

export function Hero() {
  const scrollY = useScrollY();
  const t = useLoopingTimer(8, 1.4);

  const shown = clamp(t, 0, 8);
  const pct = (shown / 8) * 100;
  const timerLabel = formatTimer(t, 8);

  const bgStyle: CSSProperties = {
    transform: `translateY(${scrollY * 0.16}px) scale(${1 + clamp(scrollY / 900, 0, 1) * 0.12})`,
  };

  return (
    <section className="sl-mkt-hero" data-screen-label="Hero" id="top">
      {/* Background layers */}
      <div className="sl-mkt-hero__bg" aria-hidden>
        <div className="sl-mkt-hero__photo" style={bgStyle} />
        <div className="sl-mkt-hero__glows" />
        <div className="sl-mkt-hero__wash" />
        <div className="sl-mkt-hero__rings">
          <span /> <span /> <span />
        </div>
      </div>

      {/* Copy */}
      <div className="sl-mkt-hero__copy">
        <span className="sl-mkt-hero__eyebrow">
          <span className="sl-mkt-hero__dot" /> {HERO.eyebrow}
        </span>
        <h1 className="sl-mkt-hero__h1">
          Answer every buyer in{" "}
          <span className="sl-mkt-ac-green">8 seconds.</span> Not{" "}
          <span className="sl-mkt-ac-slate">15 hours.</span>
        </h1>
        <p className="sl-mkt-hero__sub">{HERO.sub}</p>
        <div className="sl-mkt-hero__cta">
          <ArrowButton href={BRAND.demoPath} variant="primary">
            {HERO.primaryCta}
          </ArrowButton>
          <ArrowButton href="#how" variant="glass" arrow={false}>
            {HERO.secondaryCta}
          </ArrowButton>
        </div>
      </div>

      {/* Floating glass stage */}
      <div className="sl-mkt-hero__stage" aria-hidden>
        {/* Center phone */}
        <div className="sl-mkt-stage-phone">
          <div className="sl-mkt-stage-phone__hdr">
            <span className="sl-mkt-stage-phone__name">Aspen Realty</span>
            <span className="sl-mkt-stage-phone__live">● now</span>
          </div>
          <div className="sl-mkt-stage-msg sl-mkt-stage-msg--in">
            Is 14 Aspen Court still available?
          </div>
          <div className="sl-mkt-stage-msg sl-mkt-stage-msg--out">
            Yes! I’ve got Sat 11am or Sun 2pm open — want me to lock one in?
          </div>
          <div className="sl-mkt-stage-phone__ftr">Delivered · {timerLabel}s</div>
        </div>

        {/* Left — response time */}
        <div className="sl-mkt-stage-card sl-mkt-stage-card--time">
          <span className="sl-mkt-stage-card__label">Response time</span>
          <span className="sl-mkt-stage-card__num sl-mkt-ac-green">{timerLabel}s</span>
          <span className="sl-mkt-stage-bar">
            <span style={{ width: `${pct}%` }} />
          </span>
        </div>

        {/* Right — qualified */}
        <div className="sl-mkt-stage-card sl-mkt-stage-card--qual">
          <span className="sl-mkt-stage-card__label">Jordan Mills</span>
          <span className="sl-mkt-stage-card__chip">Qualified</span>
          <span className="sl-mkt-stage-card__meta">Pre-approved · booked Sun 2pm</span>
        </div>

        {/* Lower-right — industry average */}
        <div className="sl-mkt-stage-card sl-mkt-stage-card--avg">
          <span className="sl-mkt-stage-card__label">Industry average</span>
          <span className="sl-mkt-stage-card__num sl-mkt-ac-slate">15 hrs</span>
          <span className="sl-mkt-stage-card__meta">to first reply</span>
        </div>

        {/* Bottom pill */}
        <div className="sl-mkt-stage-pill">
          <span className="sl-mkt-stage-pill__check">
            <Check size={13} />
          </span>
          Responded in 8s
        </div>
      </div>
    </section>
  );
}
