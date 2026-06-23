import type { CoreMessage } from "ai";
import type { Message } from "@/domain/lead/types";

// ─── Conversation mapping (pure) ────────────────────────────
// Translates our stored message rows into the AI SDK message shape, and
// enforces SMS length as a belt-and-suspenders alongside maxTokens.
//
// Role mapping: our "assistant" (the agent) → model "assistant"; our "buyer"
// → model "user". The model is playing the agent, so its outputs are
// assistant turns and the buyer's texts are the user turns.

/** Map stored messages (chronological) to CoreMessages for the model. */
export function toModelMessages(messages: Message[]): CoreMessage[] {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.body,
  }));
}

/** Append a kickoff user instruction (used for the very first reply). */
export function withKickoff(
  messages: CoreMessage[],
  instruction: string,
): CoreMessage[] {
  return [...messages, { role: "user", content: instruction }];
}

const SMS_HARD_LIMIT = 320; // two segments — a hard backstop, not the target

/**
 * Trim a model reply to a safe SMS length without cutting mid-word. The
 * prompt + maxTokens already keep replies short; this only guards outliers.
 */
export function clampSms(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= SMS_HARD_LIMIT) return clean;
  const slice = clean.slice(0, SMS_HARD_LIMIT);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim() + "…";
}
