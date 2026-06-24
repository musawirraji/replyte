import type { Metadata } from "next";

// Public Privacy Policy — used for Twilio toll-free verification and linked
// from the listing pages. Edit the entity name + contact email to your real
// business before submitting to carriers.

export const metadata: Metadata = {
  title: "Privacy Policy — Replyte",
  description: "How Replyte collects, uses, and protects the information you provide.",
};

const ENTITY = "Replyte (operated by ForgedByRaji)";
const CONTACT = "hello@forgedbyraji.com";
const UPDATED = "June 24, 2026";

export default function PrivacyPage() {
  return (
    <main className="sl-legal">
      <h1>Privacy Policy</h1>
      <p className="sl-legal__updated">Last updated {UPDATED}</p>

      <p>
        This Privacy Policy explains how {ENTITY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and
        uses information when you submit an enquiry on a property listing page powered by Replyte.
      </p>

      <h2>Information we collect</h2>
      <p>When you complete an enquiry form, we collect the information you provide:</p>
      <ul>
        <li>Your name</li>
        <li>Your mobile phone number</li>
        <li>Your email address (optional)</li>
        <li>Any message you choose to include</li>
      </ul>

      <h2>How we use it</h2>
      <p>We use your information solely to respond to your enquiry about the specific property, namely to:</p>
      <ul>
        <li>Send you a reply by SMS text message and email about that listing</li>
        <li>Answer your questions and help you arrange a viewing</li>
        <li>Keep a record of the conversation for the listing agent</li>
      </ul>

      <h2>SMS / text messaging</h2>
      <p>
        By submitting the enquiry form you consent to receive text messages from the listing
        agent about the property you enquired about. Message frequency varies. Message and data
        rates may apply. You can opt out at any time by replying <strong>STOP</strong>, or reply{" "}
        <strong>HELP</strong> for help. We do <strong>not</strong> send marketing or promotional
        texts, and we do not text anyone who has not submitted an enquiry.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell or rent your information. <strong>No mobile information is shared with third
        parties or affiliates for marketing or promotional purposes.</strong> Information is shared
        only with the service providers that operate the messaging (e.g. our SMS and email
        providers) strictly to deliver the reply you requested.
      </p>

      <h2>Retention</h2>
      <p>
        We keep enquiry and conversation records only as long as needed to handle your enquiry and
        for the listing agent&rsquo;s records, after which they are deleted on request.
      </p>

      <h2>Your choices</h2>
      <p>
        Reply STOP to stop receiving texts. You may request access to or deletion of your
        information at any time by contacting us.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>
    </main>
  );
}
