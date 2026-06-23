import {
  formatResponseTime,
  formatBenchmark,
  firstResponderLine,
  respondedInSentence,
} from "@/domain/lead/responseTime";

// Render-only. THE hero — the side-by-side timer that is the star of the
// build. Our most-recent response time in huge type next to the industry
// benchmark, with the "answer first" stat underneath. All copy/derivation is
// imported from the domain layer.

export function ResponseHero({ responseSeconds }: { responseSeconds: number | null }) {
  return (
    <section className="sl-hero">
      <div className="sl-hero__grid">
        <div className="sl-hero__cell sl-hero__cell--ours">
          <p className="sl-hero__num sl-hero__num--ours">
            {formatResponseTime(responseSeconds)}
          </p>
          <p className="sl-hero__caption">{respondedInSentence(responseSeconds)}</p>
        </div>
        <div className="sl-hero__cell">
          <p className="sl-hero__num sl-hero__num--bench">{formatBenchmark()}</p>
          <p className="sl-hero__caption">The average agent’s first response</p>
        </div>
      </div>
      <p className="sl-hero__stat">
        <strong>{firstResponderLine()}</strong>
      </p>
    </section>
  );
}
