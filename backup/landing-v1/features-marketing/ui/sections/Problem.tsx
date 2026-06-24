"use client";

import { useState, type CSSProperties } from "react";
import { PROBLEM_CARDS, type Accent } from "@/domain/marketing/content";
import { ArrowButton } from "../components/ArrowButton";
import { Check } from "../components/Icons";

// §3 — Problem. A 3-card spotlight carousel: exactly one card is "active"
// (full colour), the others dim to grayscale. Click a card or use the ‹ ›
// arrows to move the spotlight.

const BAND: Record<Accent, string> = {
  slate: "linear-gradient(135deg,#64727f 0%,#2b3641 100%)",
  blue: "linear-gradient(135deg,#3b7bf5 0%,#15336e 100%)",
  violet: "linear-gradient(135deg,#7c63d8 0%,#392c70 100%)",
  green: "linear-gradient(135deg,#1f9d57 0%,#0f6b3a 100%)",
  coral: "linear-gradient(135deg,#f0815f 0%,#b23c1d 100%)",
};

const ACTIVE_BORDER: Record<Accent, string> = {
  slate: "#6b7785",
  blue: "#2f6bf2",
  violet: "#6d56cf",
  green: "#1f9d57",
  coral: "#e0623f",
};

export function Problem() {
  const [active, setActive] = useState(1);
  const count = PROBLEM_CARDS.length;
  const move = (dir: number) => setActive((a) => (a + dir + count) % count);

  return (
    <section className="sl-mkt-problem" data-screen-label="The problem">
      <div className="sl-mkt-problem__head">
        <span className="sl-mkt-eyebrow">The cost of waiting</span>
        <h2 className="sl-mkt-h2">Every hour a lead sits, it cools.</h2>
        <p className="sl-mkt-lead">
          The leads are already coming in. The only question is whether you
          reach them before the agent down the street does.
        </p>
        <ArrowButton href="#how" variant="blue">
          See how we close the gap
        </ArrowButton>
      </div>

      <div className="sl-mkt-problem__grid">
        {PROBLEM_CARDS.map((card, i) => {
          const isActive = i === active;
          const style = {
            "--card-border": ACTIVE_BORDER[card.accent],
          } as CSSProperties;
          return (
            <button
              key={card.index}
              type="button"
              className={`sl-mkt-pcard${isActive ? " sl-mkt-pcard--active" : ""}`}
              style={style}
              onClick={() => setActive(i)}
            >
              <div
                className="sl-mkt-pcard__band"
                style={{ backgroundImage: BAND[card.accent] }}
              >
                <span className="sl-mkt-pcard__quote">{card.quote}</span>
                <span className="sl-mkt-pcard__chip">{card.index}</span>
                <span className="sl-mkt-pcard__scoop" />
              </div>
              <div className="sl-mkt-pcard__body">
                <span className="sl-mkt-pcard__stat">{card.stat}</span>
                <span className="sl-mkt-pcard__caption">{card.caption}</span>
                <ul className="sl-mkt-pcard__bullets">
                  {card.bullets.map((b) => (
                    <li key={b}>
                      <Check size={14} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          );
        })}
      </div>

      <div className="sl-mkt-problem__arrows">
        <button type="button" aria-label="Previous" onClick={() => move(-1)}>
          ‹
        </button>
        <button type="button" aria-label="Next" onClick={() => move(1)}>
          ›
        </button>
      </div>
    </section>
  );
}
