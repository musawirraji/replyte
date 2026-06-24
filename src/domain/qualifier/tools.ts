import { z } from "zod";

// ─── Qualifier tool definitions (pure schema) ───────────────
// The parameter schema + description for the booking tool. The AI SDK `tool()`
// (with its I/O `execute`) is constructed in /api/reply, which closes over the
// current lead; here we keep only the pure, reusable contract.

export const bookViewingParameters = z.object({
  slot_datetime: z
    .string()
    .describe(
      "The exact ISO datetime of the slot the buyer chose, copied verbatim from <available_slots>.",
    ),
});

export type BookViewingArgs = z.infer<typeof bookViewingParameters>;

export const BOOK_VIEWING_DESCRIPTION =
  "Record the booked in-person viewing once the buyer has clearly chosen one of the offered times. " +
  "Pass the exact slot_datetime from <available_slots>. Only call this after they confirm a specific time — never invent a time that isn't listed.";
