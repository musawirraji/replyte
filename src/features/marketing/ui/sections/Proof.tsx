"use client";

import { useEffect, useState } from "react";
import { PROOF } from "@/domain/marketing/content";
import { useInView } from "../hooks/scroll";

// §7 — Proof (NOT FINAL per handoff). Two race bars + count-up numbers that
// fire once when the section scrolls into view.

function useCountUp(target: number, durationMs: number, run: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      setValue(target * p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, run]);
  return value;
}

export function Proof() {
  const { ref, inView } = useInView<HTMLElement>(0.45);
  const fast = useCountUp(8, 650, inView);
  const slow = useCountUp(15, 4400, inView);

  return (
    <section ref={ref} className="sl-mkt-proof" id="proof" data-screen-label="Proof">
      <span className="sl-mkt-eyebrow sl-mkt-eyebrow--green">{PROOF.eyebrow}</span>
      <h2 className="sl-mkt-h2 sl-mkt-proof__title">{PROOF.title}</h2>

      <div className={`sl-mkt-proof__bars${inView ? " is-run" : ""}`}>
        <div className="sl-mkt-proof__row">
          <span className="sl-mkt-proof__num sl-mkt-ac-green">{Math.round(fast)}s</span>
          <span className="sl-mkt-proof__track">
            <span className="sl-mkt-proof__fill sl-mkt-proof__fill--fast" />
          </span>
          <span className="sl-mkt-proof__label">{PROOF.fastLabel}</span>
        </div>
        <div className="sl-mkt-proof__row">
          <span className="sl-mkt-proof__num sl-mkt-ac-slate">{Math.round(slow)}h</span>
          <span className="sl-mkt-proof__track">
            <span className="sl-mkt-proof__fill sl-mkt-proof__fill--slow" />
            <span className="sl-mkt-proof__waiting">still waiting…</span>
          </span>
          <span className="sl-mkt-proof__label">{PROOF.slowLabel}</span>
        </div>
      </div>

      <p className="sl-mkt-lead sl-mkt-proof__closing">{PROOF.closing}</p>
    </section>
  );
}
