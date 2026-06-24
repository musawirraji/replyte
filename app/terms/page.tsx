import type { Metadata } from "next";

// Public Terms & Conditions — used for Twilio toll-free verification and
// linked from the listing pages. Edit entity + contact before going live.

export const metadata: Metadata = {
  title: "Terms & Conditions — Replyte",
  description: "The terms that govern use of Replyte-powered listing enquiry pages.",
};

const ENTITY = "Replyte (operated by ForgedByRaji)";
const CONTACT = "hello@forgedbyraji.com";
const UPDATED = "June 24, 2026";

export default function TermsPage() {
  return (
    <main className="sl-legal">
      <h1>Terms &amp; Conditions</h1>
      <p className="sl-legal__updated">Last updated {UPDATED}</p>

      <p>
        These Terms govern your use of property listing enquiry pages powered by {ENTITY}. By
        submitting an enquiry you agree to these Terms and to our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>The service</h2>
      <p>
        When you submit your details on a listing page, an automated assistant acting for the
        listing agent replies by SMS and email about that property, may ask a few qualifying
        questions, and can help you arrange a viewing.
      </p>

      <h2>Messaging consent</h2>
      <p>
        By providing your mobile number you agree to receive text messages about the property you
        enquired about. Message frequency varies; message and data rates may apply. Reply{" "}
        <strong>STOP</strong> to opt out or <strong>HELP</strong> for help. Carriers are not liable
        for delayed or undelivered messages.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Provide accurate information and only submit a phone number you are authorised to use. Do
        not use the service for unlawful purposes.
      </p>

      <h2>No guarantee</h2>
      <p>
        Listing details are provided for convenience and may change; verify any material fact with
        the agent. The service is provided &ldquo;as is&rdquo; without warranties, and our liability
        is limited to the maximum extent permitted by law.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Email <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>
    </main>
  );
}
