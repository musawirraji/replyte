// ─── Marketing page content (pure data) ─────────────────────
// All copy for the Replyte landing page, verbatim from the design handoff.
// Sections import these so the UI stays declarative. No I/O, no React.

export type Accent = "blue" | "green" | "violet" | "coral" | "slate";

export const BRAND = {
  name: "Replyte",
  tagline:
    "Speed-to-lead for real estate. Answer every buyer in seconds — branded as your agency.",
  demoPath: "/demo-acres",
  demoDashboardPath: "/demo-acres/dashboard?k=demo-secret-7f3a9c2e",
} as const;

export const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Proof", href: "#proof" },
  { label: "FAQ", href: "#faq" },
] as const;

// ── §2 Hero ──
export const HERO = {
  eyebrow: "Speed-to-lead for real estate",
  // H1 is rendered with coloured spans in the component.
  sub: "The first agent to reply wins the deal 78% of the time. Give your listings an AI that texts buyers back instantly, qualifies them, and books the viewing — branded as your agency.",
  primaryCta: "Watch it text you",
  secondaryCta: "Book a 15-min call",
} as const;

// ── §3 Problem cards ──
export interface ProblemCard {
  index: string;
  stat: string;
  caption: string;
  quote: string;
  accent: Accent;
  bullets: string[];
}

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    index: "01",
    stat: "15 hrs",
    caption: "the average agent’s first reply to an online lead.",
    quote: "“By the time you call back, they’ve already toured two homes.”",
    accent: "slate",
    bullets: [
      "A hot lead cools within the hour",
      "Most never get a second touch",
      "By morning they’ve moved on",
    ],
  },
  {
    index: "02",
    stat: "78 %",
    caption: "of buyers go with the first agent who replies.",
    quote: "“Speed isn’t a nice-to-have. It’s the whole game.”",
    accent: "blue",
    bullets: [
      "Speed beats brand",
      "Speed beats price",
      "First reply wins the relationship",
    ],
  },
  {
    index: "03",
    stat: "½",
    caption: "of agents quit after a single follow-up.",
    quote: "“The deal goes to whoever’s still there on touch five.”",
    accent: "violet",
    bullets: [
      "Most leads need 5+ touches",
      "Manual follow-up never scales",
      "The deal goes to whoever stays",
    ],
  },
];

// ── §4 Pinned feature steps ──
export interface FeatureStep {
  num: string;
  navLabel: string;
  title: string;
  body: string;
  bullets: string[];
  cta: string;
  accent: Accent;
  image: string;
}

export const FEATURE_STEPS: FeatureStep[] = [
  {
    num: "01",
    navLabel: "Instant reply",
    title: "A real, personalised text back in seconds.",
    body: "The moment a buyer enquires, your agency texts back — by name, about that exact listing, in the time it takes to refresh the page.",
    bullets: [
      "Replies in ~8s, day or night",
      "Knows the listing details cold",
      "Tuned to your agency’s voice",
    ],
    cta: "Watch it text you",
    accent: "blue",
    image: "/marketing/vis-01.png",
  },
  {
    num: "02",
    navLabel: "Qualifies the lead",
    title: "Qualifies like your best agent would.",
    body: "It asks the questions a sharp agent asks — timeline, budget, financing — one at a time, conversationally, never a cold web form.",
    bullets: [
      "Buying timeline & motivation",
      "Pre-approved or financing",
      "One question at a time, never a form",
    ],
    cta: "See it qualify",
    accent: "violet",
    image: "/marketing/vis-02.png",
  },
  {
    num: "03",
    navLabel: "Books the viewing",
    title: "Offers real slots and books the viewing.",
    body: "When the buyer’s warm, it offers your actual open times, confirms the one they pick, and drops it straight onto your calendar.",
    bullets: [
      "Offers your real open slots",
      "Confirms and sends reminders",
      "Syncs straight to your calendar",
    ],
    cta: "See it book",
    accent: "green",
    image: "/marketing/vis-03.png",
  },
  {
    num: "04",
    navLabel: "Never goes cold",
    title: "Follows up 5×, so you never have to.",
    body: "If they go quiet, it keeps the thread warm with smart, spaced-out follow-ups — and steps back the instant they re-engage.",
    bullets: [
      "Five smart follow-ups, spaced out",
      "Stops the moment they re-engage",
      "Hands you only warm leads",
    ],
    cta: "See the sequence",
    accent: "coral",
    image: "/marketing/vis-04.png",
  },
];

// ── §5 How it works steps ──
export interface HowStep {
  eyebrow: string;
  // headline rendered with a coloured emphasis word
  lead: string;
  emphasis: string;
  sub: string;
  accent: Accent;
}

export const HOW_STEPS: HowStep[] = [
  {
    eyebrow: "Step 01 — The enquiry",
    lead: "A NEW",
    emphasis: "LEAD",
    sub: "They tap enquire on your branded listing and leave their number. That’s the only move they make.",
    accent: "blue",
  },
  {
    eyebrow: "Step 02 — 8 seconds later",
    lead: "YOU TEXT",
    emphasis: "BACK",
    sub: "Your agency replies instantly with a real, personalised message — and starts qualifying them over SMS.",
    accent: "green",
  },
  {
    eyebrow: "Step 03 — The handoff",
    lead: "VIEWING",
    emphasis: "BOOKED",
    sub: "It offers real slots, confirms, and hands you a warm, qualified buyer. You just show up.",
    accent: "violet",
  },
];

// ── §6 Demo ──
export const DEMO = {
  eyebrow: "[ Don’t take our word for it ]",
  title: "Watch your phone buzz.",
  body: "Enter your name and number. Watch a real, personalised reply land — then see it offer a viewing, just like your buyer would.",
  consent: "I agree to receive a demo text. Standard rates apply.",
  idleButton: "Text me about this home",
  agencyName: "Aspen Realty",
  buyerMessage:
    "Hi! Is 14 Aspen Court still available? Could I come see it this weekend?",
  /** The reply that types out, personalised with the entered first name. */
  reply(name: string): string {
    const who = name.trim() || "there";
    return `Hi ${who}! Yes — 14 Aspen Court is still available 👋 I’ve got Saturday 11am or Sunday 2pm open. Want me to lock one in for you?`;
  },
  successBadge: "Responded in 8.0s — beat the 15-hour average",
} as const;

// ── §7 Proof ──
export const PROOF = {
  eyebrow: "The proof",
  title: "The gap between 8 seconds and 15 hours is every deal you lose.",
  fastLabel: "Replyte responds",
  slowLabel: "Industry average",
  closing:
    "Fifteen hours is enough time for a buyer to find another agent, tour another home, and forget you ever existed. Eight seconds is enough to win them — and the first reply wins the deal 78% of the time.",
} as const;

// ── §8 Why us cards ──
export interface WhyCard {
  title: string;
  body: string;
  accent: Accent;
}

export const WHY_CARDS: WhyCard[] = [
  {
    title: "Live in minutes",
    body: "One row of data and your logo — no rebuild, no onboarding marathon. You can be live before your coffee gets cold.",
    accent: "blue",
  },
  {
    title: "Branded as you",
    body: "Your name, your number, your tone. Buyers only ever see your agency — never a third party, never ‘powered by’ anyone else.",
    accent: "green",
  },
  {
    title: "No CRM migration",
    body: "It just works over SMS. Nothing to install, nothing to move — it slots in beside the tools you already use.",
    accent: "violet",
  },
  {
    title: "Never off",
    body: "It replies at 2am, on weekends, mid-showing. The lead that used to cool overnight gets answered in seconds.",
    accent: "coral",
  },
];

// ── §9 FAQ ──
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "Does it actually sound like a bot?",
    answer:
      "No — that’s the whole point. It’s tuned to read like a sharp, human agent: short, warm, on-brand. Most buyers never suspect, and you can review every thread.",
  },
  {
    question: "Is this spammy or compliant?",
    answer:
      "It only ever texts people who enquired on your listing, and it’s A2P-registered for business messaging. No cold texting, no bought lists — ever.",
  },
  {
    question: "Does it work with my CRM?",
    answer:
      "It works over SMS with zero migration. If you want, leads and bookings sync to your CRM and calendar — but nothing is required to go live.",
  },
  {
    question: "What does it cost?",
    answer:
      "It’s priced per agency, not per lead, so a single saved deal pays for it many times over. Book a 15-minute call and we’ll size it to your volume.",
  },
  {
    question: "What if it doesn’t know an answer about the home?",
    answer:
      "It never invents facts. If a buyer asks something it isn’t sure of, it says it’ll check with you and pivots to booking the viewing — keeping the lead warm.",
  },
];

// ── §10 Final CTA ──
export const FINAL_CTA = {
  badges: ["Top 50 PropTech 2026", "Category Leader · Spring 2026"],
  reviews: "1,200+ 5-star agent reviews",
  title: "Be the first reply, every time.",
  sub: "Give every listing an agent that answers in seconds, qualifies the buyer, and books the viewing — all under your brand.",
  primaryCta: "Request a demo",
  secondaryCta: "Take a free tour",
} as const;

// ── §11 Footer ──
export const FOOTER = {
  columns: [
    {
      heading: "Product",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Proof", href: "#proof" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      heading: "Try it",
      links: [
        { label: "Live demo", href: BRAND.demoPath },
        { label: "Book a call", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Replyte. All rights reserved.",
  disclaimer:
    "Marketing claims and stats are illustrative — verify before publishing.",
} as const;
