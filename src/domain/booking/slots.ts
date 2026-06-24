import type { Availability } from "@/domain/prospect/types";

// ─── Viewing-slot generation (pure, timezone-aware) ─────────
// Generates the next few viewing windows in the prospect's timezone, so a
// buyer in any market is offered sensible local times. No external calendar —
// swap for the Cal.com v2 API later if a prospect wants real sync.

export interface Slot {
  /** ISO datetime (UTC instant) of the slot start. */
  datetime: string;
  /** Human label in the prospect's tz, e.g. "Fri, Jun 26 · 2:30 PM". */
  label: string;
}

const FALLBACK: Availability = {
  tz: "America/Chicago",
  days: [1, 2, 3, 4, 5],
  hours: [10, 14, 17],
};

// Offset (ms) of `tz` at a given instant: (tz wall-clock read as UTC) − actual UTC.
function tzOffsetMs(date: Date, tz: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) p[part.type] = part.value;
  const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return asUTC - date.getTime();
}

// The UTC instant for a wall-clock (y, mo, d, h) in `tz`.
function zonedTimeToUtc(y: number, mo: number, d: number, h: number, tz: string): Date {
  const utcGuess = Date.UTC(y, mo, d, h, 0, 0);
  const offset = tzOffsetMs(new Date(utcGuess), tz);
  return new Date(utcGuess - offset);
}

// The y/m/d + weekday of an instant, read in `tz`.
function tzParts(date: Date, tz: string): { y: number; mo: number; d: number; dow: number } {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) p[part.type] = part.value;
  const dow: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { y: +p.year, mo: +p.month - 1, d: +p.day, dow: dow[p.weekday] ?? 0 };
}

/** "Fri, Jun 26 · 2:30 PM" — a slot label in the given timezone. */
export function formatSlotInTz(iso: string, tz: string): string {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: tz,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Generate the next `count` viewing slots in the prospect's tz, skipping days
 * not in `availability.days` and any window already passed.
 */
export function generateSlots(
  availability: Availability = FALLBACK,
  count = 3,
  from: Date = new Date(),
): Slot[] {
  const tz = availability.tz || FALLBACK.tz;
  const days = availability.days?.length ? availability.days : FALLBACK.days;
  const hours = availability.hours?.length ? availability.hours : FALLBACK.hours;

  const slots: Slot[] = [];
  const start = tzParts(from, tz);

  for (let offset = 0; offset < 21 && slots.length < count; offset++) {
    // Anchor at noon `offset` days out, then normalise back to tz calendar parts.
    const anchor = zonedTimeToUtc(start.y, start.mo, start.d + offset, 12, tz);
    const day = tzParts(anchor, tz);
    if (!days.includes(day.dow)) continue;

    for (const hour of hours) {
      if (slots.length >= count) break;
      const slot = zonedTimeToUtc(day.y, day.mo, day.d, hour, tz);
      if (slot.getTime() <= from.getTime()) continue;
      slots.push({ datetime: slot.toISOString(), label: formatSlotInTz(slot.toISOString(), tz) });
    }
  }
  return slots;
}

/** Render slots as a one-line SMS suffix the qualifier can offer. */
export function slotsToSmsLine(slots: Slot[]): string {
  return slots.map((s) => s.label).join(" · ");
}
