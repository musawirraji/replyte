import { anthropic } from "@ai-sdk/anthropic";
import { generateText, type CoreMessage } from "ai";
import { serverEnv } from "@/lib/env";

// ─── Claude call (infrastructure) ───────────────────────────
// Thin wrapper around the Anthropic model via the AI SDK. The grounded
// system prompt and the message mapping are built in domain/qualifier; this
// module only performs the call. Tuned for near-instant SMS replies:
//   • claude-haiku-4-5 (fast, cheap, real-time) — from env
//   • a hard, low maxTokens cap (output length is the dominant latency cost)
//   • no extended thinking (default off)
// See speed-to-lead-build-research.md → "Claude qualifier".

const SMS_MAX_TOKENS = 160;

export interface GenerateReplyArgs {
  system: string;
  messages: CoreMessage[];
}

/**
 * Generate one short, grounded reply. Returns the trimmed text, or null if
 * the model isn't configured / the call fails — callers fall back to a safe
 * canned line so the demo never hard-fails mid-pitch.
 */
export async function generateReply({
  system,
  messages,
}: GenerateReplyArgs): Promise<string | null> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("[anthropic] ANTHROPIC_API_KEY unset — skipping model call.");
    return null;
  }
  try {
    const { text } = await generateText({
      model: anthropic(serverEnv.ANTHROPIC_MODEL),
      system,
      messages,
      maxTokens: SMS_MAX_TOKENS,
      temperature: 0.6,
    });
    return text.trim();
  } catch (err) {
    console.error("[anthropic] generateReply failed:", err);
    return null;
  }
}
