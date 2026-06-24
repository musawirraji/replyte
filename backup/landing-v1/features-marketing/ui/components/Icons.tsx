// Render-only icon set for the marketing page. Simple, currentColor-driven
// inline SVGs so they inherit the accent of whatever element wraps them.

export interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function ArrowRight({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Check({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CheckCircle({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function PersonPlus({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M19 8v6M16 11h6" />
    </svg>
  );
}

export function Send({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

export function Eye({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function Star({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="m12 2 3 6.6 7.2.7-5.4 4.8 1.6 7.1L12 18.6 5.6 21.2l1.6-7.1L1.8 9.3 9 8.6z" />
    </svg>
  );
}

export function Lightning({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  );
}

export function Bolt({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  );
}

export function Clock({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
