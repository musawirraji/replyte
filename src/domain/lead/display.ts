import type { Message } from "./types";

// ─── Lead/message display helpers (pure) ────────────────────

/** "just now" · "3m ago" · "2h ago" · "Jun 14" — for the lead list. */
export function relativeTime(iso: string, now: number = Date.now()): string {
  const then = new Date(iso).getTime();
  const secs = Math.max(0, Math.round((now - then) / 1000));
  if (secs < 45) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/** "2:45 PM" — timestamp shown under each message bubble. */
export function formatClock(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** "Fri, Jun 26 · 2:30 PM" — a booked viewing slot. */
export function formatSlot(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** CSS modifier for a message bubble based on who sent it. */
export function bubbleClass(role: Message["role"]): string {
  return role === "assistant" ? "sl-msg sl-msg--assistant" : "sl-msg sl-msg--buyer";
}

/** Label for the sender under a bubble. */
export function senderLabel(role: Message["role"], agentName: string): string {
  return role === "assistant" ? agentName : "Buyer";
}
