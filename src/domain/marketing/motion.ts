import type { Accent } from "./content";

// ─── Marketing motion helpers (pure) ────────────────────────
// Math + small state helpers the animated sections import, so components
// stay declarative and the scroll/timer logic is testable in isolation.

/** Clamp n into [min, max]. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Linear 0→1 progress of `value` across [start, end], clamped. */
export function progress(value: number, start: number, end: number): number {
  if (end === start) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Map t in [0,1] through an ease-out cubic. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
}

/** Active step index from a 0→1 progress over `count` steps. */
export function stepFromProgress(p: number, count: number): number {
  return clamp(Math.floor(p * count), 0, count - 1);
}

/** The hero/demo timer label: one decimal, capped. */
export function formatTimer(t: number, cap = 8): string {
  return Math.min(t, cap).toFixed(1);
}

// ── Accent → CSS variable names ──
// Vars are emitted in globals.scss as --sl-mkt-<accent>[-light|-dark].
interface AccentVars {
  base: string;
  light: string;
  dark: string;
}

const ACCENT_VARS: Record<Accent, AccentVars> = {
  blue: {
    base: "var(--sl-mkt-blue)",
    light: "var(--sl-mkt-blue-light)",
    dark: "var(--sl-mkt-blue-dark)",
  },
  green: {
    base: "var(--sl-mkt-green)",
    light: "var(--sl-mkt-green-light)",
    dark: "var(--sl-mkt-green-dark)",
  },
  violet: {
    base: "var(--sl-mkt-violet)",
    light: "var(--sl-mkt-violet-light)",
    dark: "var(--sl-mkt-violet-dark)",
  },
  coral: {
    base: "var(--sl-mkt-coral)",
    light: "var(--sl-mkt-coral-light)",
    dark: "var(--sl-mkt-coral)",
  },
  slate: {
    base: "var(--sl-mkt-slate)",
    light: "var(--sl-mkt-slate)",
    dark: "var(--sl-mkt-slate)",
  },
};

export function accentVars(accent: Accent): AccentVars {
  return ACCENT_VARS[accent];
}

// ── Demo state machine ──
export type DemoStage = "idle" | "sending" | "typing" | "done";

/** Button label per demo stage. */
export function demoButtonLabel(stage: DemoStage, idle: string): string {
  switch (stage) {
    case "sending":
      return "Sending…";
    case "typing":
      return "Texting back…";
    case "done":
      return "Run it again ↺";
    default:
      return idle;
  }
}

/** Lead-status line per demo stage. */
export function demoStatusLabel(stage: DemoStage): string {
  switch (stage) {
    case "sending":
      return "texting back…";
    case "typing":
      return "typing…";
    case "done":
      return "qualified · booking sent";
    default:
      return "waiting for a lead";
  }
}

/** Reveal one more character of `full` given the current typed string. */
export function nextTyped(full: string, typed: string): string {
  if (typed.length >= full.length) return full;
  return full.slice(0, typed.length + 1);
}
