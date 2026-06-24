"use client";

import { useEffect, useState } from "react";
import {
  formatResponseTime,
  formatBenchmark,
  firstResponderLine,
  respondedInSentence,
} from "@/domain/lead/responseTime";
import { compareWidths } from "@/domain/lead/stats";

// The hero — a single north-star number (latest response time) that counts up
// on load, with the industry benchmark demoted to a race below it. Premium-
// fintech: one big trusted figure, calm supporting compare.

export function ResponseHero({ responseSeconds }: { responseSeconds: number | null }) {
  const [shown, setShown] = useState<number | null>(responseSeconds == null ? null : 0);
  const w = compareWidths();

  useEffect(() => {
    if (responseSeconds == null) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      setShown(Math.round(responseSeconds * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [responseSeconds]);

  return (
    <section className="sl-db-hero">
      <div className="sl-db-hero__main">
        <span className="sl-db-hero__label">Latest response time</span>
        <div className="sl-db-hero__num">
          {shown == null ? "—" : formatResponseTime(shown)}
        </div>
        <p className="sl-db-hero__sub">{respondedInSentence(responseSeconds)}</p>
      </div>

      <div className="sl-db-hero__compare">
        <div className="sl-db-hero__row">
          <span className="sl-db-hero__rowlabel">You</span>
          <span className="sl-db-hero__track">
            <span
              className="sl-db-hero__fill sl-db-hero__fill--you"
              style={{ width: `${w.you}%` }}
            />
          </span>
          <span className="sl-db-hero__rowval sl-db-hero__rowval--good">
            {formatResponseTime(responseSeconds)}
          </span>
        </div>
        <div className="sl-db-hero__row">
          <span className="sl-db-hero__rowlabel">Industry</span>
          <span className="sl-db-hero__track">
            <span
              className="sl-db-hero__fill sl-db-hero__fill--ind"
              style={{ width: `${w.industry}%` }}
            />
          </span>
          <span className="sl-db-hero__rowval">{formatBenchmark()}</span>
        </div>
        <p className="sl-db-hero__note">{firstResponderLine()}</p>
      </div>
    </section>
  );
}
