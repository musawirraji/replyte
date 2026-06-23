// ─── Viewing-slot generation (pure) ─────────────────────────
// A simple, self-contained slot generator for the demo (no external
// calendar). Offers the next few business-day viewing windows. Swap for the
// Cal.com v2 API later if a prospect wants real calendar sync.

export interface Slot {
  /** ISO datetime of the slot start. */
  datetime: string;
  /** Human label, e.g. "Fri, Jun 26 · 2:30 PM". */
  label: string;
}

// Fixed daily viewing windows (local hours).
const VIEWING_HOURS = [10, 14, 17];

/**
 * Generate the next `count` viewing slots starting from `from`, skipping
 * weekends and any window already passed today.
 */
export function generateSlots(count = 3, from: Date = new Date()): Slot[] {
  const slots: Slot[] = [];
  const cursor = new Date(from);
  cursor.setMinutes(0, 0, 0);

  // Walk forward day by day, hour by hour, until we have enough.
  for (let day = 0; day < 14 && slots.length < count; day++) {
    const d = new Date(cursor);
    d.setDate(cursor.getDate() + day);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue; // skip weekends

    for (const hour of VIEWING_HOURS) {
      if (slots.length >= count) break;
      const slot = new Date(d);
      slot.setHours(hour, 0, 0, 0);
      if (slot.getTime() <= from.getTime()) continue; // already passed
      slots.push({ datetime: slot.toISOString(), label: labelSlot(slot) });
    }
  }
  return slots;
}

function labelSlot(d: Date): string {
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Render slots as a one-line SMS suffix the qualifier can offer. */
export function slotsToSmsLine(slots: Slot[]): string {
  return slots.map((s) => s.label).join(" · ");
}
