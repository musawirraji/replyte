import { Nav } from "../sections/Nav";
import { Hero } from "../sections/Hero";
import { Problem } from "../sections/Problem";
import { PinnedFeatures } from "../sections/PinnedFeatures";
import { HowItWorks } from "../sections/HowItWorks";
import { Demo } from "../sections/Demo";
import { Proof } from "../sections/Proof";
import { WhyUs } from "../sections/WhyUs";
import { Faq } from "../sections/Faq";
import { FinalCta } from "../sections/FinalCta";
import { Footer } from "../sections/Footer";

// The Replyte marketing landing page — 11 sections in scroll order. Each
// section owns its own interaction state (per the handoff: no global store);
// this screen just composes them top to bottom.

export function MarketingScreen() {
  return (
    <div className="sl-mkt">
      <Nav />
      <Hero />
      <Problem />
      <PinnedFeatures />
      <HowItWorks />
      <Demo />
      <Proof />
      <WhyUs />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
