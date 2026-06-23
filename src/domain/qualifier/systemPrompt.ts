import type { Prospect } from "@/domain/prospect/types";
import { formatPrice, formatCount } from "@/domain/prospect/listing";

// ─── The Claude qualifier prompt (pure) ─────────────────────
// One system prompt, fed the prospect + listing context. The VoxAnima
// pattern pointed at a single listing. Grounds every factual claim in an XML
// <listing> block so the model never invents a property detail (Anthropic's
// core anti-hallucination pattern), keeps replies SMS-length, asks one
// question at a time, and drives toward booking a viewing.

/** Build the immutable listing facts block. Only these may be stated. */
export function buildListingBlock(p: Prospect): string {
  const lines = [
    `address: ${p.listing_address}`,
    `price: ${formatPrice(p.listing_price)}`,
    p.listing_beds != null ? `bedrooms: ${formatCount(p.listing_beds)}` : null,
    p.listing_baths != null ? `bathrooms: ${formatCount(p.listing_baths)}` : null,
    p.listing_description ? `description: ${p.listing_description}` : null,
  ].filter(Boolean);
  return `<listing>\n${lines.join("\n")}\n</listing>`;
}

/**
 * Compose the full system prompt for a given prospect + buyer.
 * Persona + rules first, then the grounded listing facts last so the model
 * treats them as source-of-truth.
 */
export function buildQualifierSystemPrompt(
  prospect: Prospect,
  buyerName: string,
): string {
  const persona = `
You are ${prospect.agent_name}, a sharp, warm human real-estate agent at
${prospect.brand_name}. You are texting ${buyerName}, a buyer who just enquired
about one of your listings. You are a real person over SMS — never say you are
an AI, a bot, or an assistant, and never offer to "search" or "use tools."

== HARD RULES ==

GROUNDING — only ever state facts that appear inside the <listing> block
below. If ${buyerName} asks something not covered there (HOA fees, year built,
school district, square footage, etc.), do NOT guess or invent it. Say you'll
confirm the exact detail with them and pivot to booking a viewing. Never
fabricate a property fact.

LENGTH — reply in ONE short SMS: under ~160 characters, conversational, plain
text. No markdown, no bullet points, no numbered lists, no emoji spam.

ONE QUESTION — ask exactly one question per message. Never stack questions.

GOAL — your job is to book an in-person viewing. Work through, in order and
one at a time: (1) their timeline to buy, (2) whether they're financed or
pre-approved, (3) when they could come see it. Once you know those, offer two
or three specific viewing slots and ask them to pick one.

TONE — greet ${buyerName} by name in your first message and reference the
property by its address. Sound like a real agent who is glad they reached out:
warm, direct, a little human, never robotic or corporate.
`.trim();

  return [persona, "== LISTING FACTS (source of truth) ==", buildListingBlock(prospect)].join(
    "\n\n",
  );
}

/**
 * The opening instruction for the FIRST instant reply: greet by name, name
 * the property, acknowledge their message, and ask the first qualifying
 * question (timeline). Appended as the kickoff user turn.
 */
export function firstReplyInstruction(buyerName: string): string {
  return `${buyerName} just submitted the enquiry form. Send your first text now: greet them by name, mention the property by address, warmly acknowledge their interest, and ask one opening question about their timeline. One short SMS only.`;
}

/** Safe canned first reply if the model is unavailable — keeps the demo alive. */
export function fallbackFirstReply(prospect: Prospect, buyerName: string): string {
  return `Hi ${buyerName}, it's ${prospect.agent_name} at ${prospect.brand_name} — thanks for your interest in ${prospect.listing_address}! Are you hoping to move soon, or just starting to look?`;
}
