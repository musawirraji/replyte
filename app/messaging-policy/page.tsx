import type { Metadata } from "next";

// Public SMS / messaging policy — serves as the "Proof of consent (opt-in)"
// URL for Twilio toll-free verification. It documents exactly how consent is
// collected (web form) and the disclosures shown to the user.

export const metadata: Metadata = {
  title: "SMS Messaging Policy & Consent — Replyte",
  description: "How opt-in consent is collected for SMS on Replyte listing pages.",
};

const CONTACT = "hello@forgedbyraji.com";
const UPDATED = "June 24, 2026";

export default function MessagingPolicyPage() {
  return (
    <main className="sl-legal">
      <h1>SMS Messaging Policy &amp; Proof of Consent</h1>
      <p className="sl-legal__updated">Last updated {UPDATED}</p>

      <h2>How consent is collected</h2>
      <p>
        Consent is collected via a <strong>web form</strong>. On a property listing page, a visitor
        who wants a reply enters their own name and mobile number into the enquiry form and submits
        it. Submitting the form is an explicit, single opt-in to receive text messages from the
        listing agent about that specific property. We never text anyone who has not personally
        submitted the form, and numbers are never purchased, scraped, or imported.
      </p>

      <h2>Disclosure shown at opt-in</h2>
      <p>The following disclosure is displayed on the enquiry form, next to the submit button:</p>
      <blockquote>
        &ldquo;By entering your number you agree to receive text messages about this property from
        the listing agent. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to
        opt out, HELP for help. See our Privacy Policy and Terms.&rdquo;
      </blockquote>

      <h2>Message types &amp; frequency</h2>
      <p>
        Conversational, one-to-one messages in direct response to the enquiry (an instant reply, a
        few qualifying questions, and help booking a viewing). Frequency varies with the
        conversation; this is not a recurring marketing or promotional program.
      </p>

      <h2>Opt-out &amp; help</h2>
      <p>
        Reply <strong>STOP</strong> at any time to stop messages; reply <strong>HELP</strong> for
        assistance. Message and data rates may apply.
      </p>

      <h2>Privacy</h2>
      <p>
        <strong>No mobile information is shared with third parties or affiliates for marketing or
        promotional purposes.</strong> See our <a href="/privacy">Privacy Policy</a> and{" "}
        <a href="/terms">Terms &amp; Conditions</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Email <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>
    </main>
  );
}
