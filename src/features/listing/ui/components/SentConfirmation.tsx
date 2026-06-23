import { formatResponseTime } from "@/domain/lead/responseTime";

// Render-only. Replaces the form after a successful enquiry: the "your phone
// is buzzing" moment, with the live response time and the drafted reply.

export interface SentConfirmationProps {
  responseSeconds: number;
  reply: string;
  dashboardHref: string | null;
}

export function SentConfirmation({
  responseSeconds,
  reply,
  dashboardHref,
}: SentConfirmationProps) {
  return (
    <div className="sl-enquiry">
      <div className="sl-sent">
        <div className="sl-sent__pulse" aria-hidden>
          ✓
        </div>
        <h2 className="sl-sent__title">Check your phone</h2>
        <p className="sl-sent__body">
          We just texted you a personalised reply about this home.
        </p>
        <p className="sl-sent__timer">Replied in {formatResponseTime(responseSeconds)}</p>
        <p className="sl-sent__body" style={{ marginTop: "16px", fontStyle: "italic" }}>
          “{reply}”
        </p>
        {dashboardHref && (
          <p className="sl-sent__body" style={{ marginTop: "16px" }}>
            <a href={dashboardHref}>See it on the dashboard →</a>
          </p>
        )}
      </div>
    </div>
  );
}
