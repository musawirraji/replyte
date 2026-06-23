// Render-only. The enquiry card — the demo's call to action. Controlled by
// ListingScreen: it owns the values, the change/submit handlers, and the
// busy/error flags. This component is pure props-in, JSX-out.

export interface EnquiryFields {
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  message: string;
}

export interface EnquiryFormProps {
  fields: EnquiryFields;
  onField: (name: keyof EnquiryFields, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  submitting: boolean;
}

export function EnquiryForm({
  fields,
  onField,
  onSubmit,
  error,
  submitting,
}: EnquiryFormProps) {
  return (
    <form className="sl-enquiry" onSubmit={onSubmit}>
      <div className="sl-label sl-enquiry__kicker">See it for yourself</div>
      <h2 className="sl-enquiry__cta">
        Enter your number and see exactly what your buyer gets
      </h2>
      <p className="sl-enquiry__sub">
        Your phone buzzes in seconds with a real, personalised reply.
      </p>

      <div className="sl-field">
        <label className="sl-field__label" htmlFor="sl-name">
          Your name
        </label>
        <input
          id="sl-name"
          className="sl-input"
          type="text"
          autoComplete="name"
          value={fields.buyerName}
          onChange={(e) => onField("buyerName", e.target.value)}
          placeholder="Jordan Avery"
        />
      </div>

      <div className="sl-field">
        <label className="sl-field__label" htmlFor="sl-phone">
          Mobile number
        </label>
        <input
          id="sl-phone"
          className="sl-input"
          type="tel"
          autoComplete="tel"
          value={fields.buyerPhone}
          onChange={(e) => onField("buyerPhone", e.target.value)}
          placeholder="(555) 555-0123"
        />
      </div>

      <div className="sl-field">
        <label className="sl-field__label" htmlFor="sl-email">
          Email <span style={{ color: "var(--sl-dim)" }}>(optional)</span>
        </label>
        <input
          id="sl-email"
          className="sl-input"
          type="email"
          autoComplete="email"
          value={fields.buyerEmail}
          onChange={(e) => onField("buyerEmail", e.target.value)}
          placeholder="you@email.com"
        />
      </div>

      <div className="sl-field">
        <label className="sl-field__label" htmlFor="sl-message">
          Anything you'd like to know? <span style={{ color: "var(--sl-dim)" }}>(optional)</span>
        </label>
        <textarea
          id="sl-message"
          className="sl-textarea"
          value={fields.message}
          onChange={(e) => onField("message", e.target.value)}
          placeholder="Is it still available? Can I see it this week?"
        />
      </div>

      {error && <p className="sl-form__error">{error}</p>}

      <button className="sl-btn sl-btn--block" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Text me about this home"}
      </button>
    </form>
  );
}
