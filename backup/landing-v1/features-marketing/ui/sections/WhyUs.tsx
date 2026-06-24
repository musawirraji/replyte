"use client";

import type { CSSProperties } from "react";
import { WHY_CARDS } from "@/domain/marketing/content";
import {
  accentVars,
  clamp,
  easeOutCubic,
  stepFromProgress,
} from "@/domain/marketing/motion";
import { useSectionProgress } from "../hooks/scroll";
import { Bolt, CheckCircle, Send, Clock } from "../components/Icons";

// §8 — Why us. A pinned scroll-stack: 4 cards spring up from the bottom at an
// alternating tilt and stack as you scroll; passed cards' plates dim to gray.

const ICONS = [Bolt, CheckCircle, Send, Clock];
const TILT = [-6.5, 6.5, -6.5, 6.5];
const STACK_TOP = [0, 82, 164, 246];

export function WhyUs() {
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const active = stepFromProgress(progress, WHY_CARDS.length);

  return (
    <section ref={ref} className="sl-mkt-why" id="why" data-screen-label="Why us">
      <div className="sl-mkt-why__frame">
        <div className="sl-mkt-why__head">
          <span className="sl-mkt-eyebrow sl-mkt-eyebrow--violet">
            Why agencies choose us
          </span>
          <h2 className="sl-mkt-h2">Four reasons it wins the room.</h2>
        </div>

        <div className="sl-mkt-why__stack">
          {WHY_CARDS.map((card, i) => {
            const cardP = easeOutCubic(clamp(progress * WHY_CARDS.length - i, 0, 1));
            const dimmed = i < active;
            const Icon = ICONS[i] ?? Bolt;
            const style = {
              top: `${STACK_TOP[i]}px`,
              transform: `translateY(${(1 - cardP) * 120}%) rotate(${(1 - cardP) * TILT[i]}deg)`,
              opacity: Math.max(0.15, cardP),
              zIndex: i + 1,
              "--plate": dimmed ? "#d4d6d2" : accentVars(card.accent).base,
              "--plate-ink": dimmed ? "#8a9099" : "#ffffff",
            } as CSSProperties;
            return (
              <article key={card.title} className="sl-mkt-wcard" style={style}>
                <div className="sl-mkt-wcard__plate">{card.title}</div>
                <div className="sl-mkt-wcard__body">
                  <span
                    className="sl-mkt-wcard__icon"
                    style={{ color: accentVars(card.accent).base }}
                  >
                    <Icon size={22} />
                  </span>
                  <p>{card.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
