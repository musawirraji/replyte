"use client";

import { useState } from "react";
import { FAQ } from "@/domain/marketing/content";

// §9 — FAQ folder tabs. Five tabs; the active one merges into the panel. The
// answer wipes up over the question via an animated clip-path.

function pad(n: number): string {
  return `N°${String(n + 1).padStart(2, "0")}`;
}

export function Faq() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const count = FAQ.length;

  const select = (i: number) => {
    setActive(i);
    setOpen(false);
  };
  const move = (dir: number) => {
    setActive((a) => (a + dir + count) % count);
  };

  const item = FAQ[active];

  return (
    <section className="sl-mkt-faq" id="faq" data-screen-label="FAQ">
      <div className="sl-mkt-faq__meta">
        <span>(FAQ)</span>
        <span>QUESTIONS</span>
        <span>N.05</span>
      </div>

      <h2 className="sl-mkt-faq__word">FAQ</h2>
      <p className="sl-mkt-faq__intro">
        <span className="sl-mkt-faq__dot" /> The questions every agency asks
        before they let an AI text their buyers.
      </p>

      <div className="sl-mkt-faq__panel">
        <div className="sl-mkt-faq__tabs">
          {FAQ.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`sl-mkt-faq__tab${i === active ? " sl-mkt-faq__tab--active" : ""}`}
              onClick={() => select(i)}
            >
              {pad(i)}
            </button>
          ))}
        </div>

        <div className="sl-mkt-faq__stage">
          <span className="sl-mkt-faq__qlabel">{pad(active)}</span>
          <h3 className="sl-mkt-faq__question">{item.question}</h3>

          <div className={`sl-mkt-faq__answer${open ? " is-open" : ""}`}>
            <p>{item.answer}</p>
          </div>
        </div>

        <div className="sl-mkt-faq__bar">
          <button
            type="button"
            className="sl-mkt-faq__read"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close answer" : "Read answer"}
          </button>
          <div className="sl-mkt-faq__nav">
            <button type="button" aria-label="Previous" onClick={() => move(-1)}>
              ‹
            </button>
            <button type="button" aria-label="Next" onClick={() => move(1)}>
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
