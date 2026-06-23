import { ArrowRight } from "./Icons";

// Render-only call-to-action button used across the marketing page. Supports
// the shared "wipe-fill on hover" pattern (CSS) and an optional trailing
// circular arrow that sits above the fill. Renders an <a> (anchor/link) or a
// <button> when an onClick handler is supplied.

export type ArrowButtonVariant =
  | "primary" // dark → blue wipe
  | "glass" // translucent, fills dark on hover
  | "blue" // solid blue gradient pill
  | "ghost" // outline
  | "light"; // light-blue (on dark / gradient)

export interface ArrowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ArrowButtonVariant;
  arrow?: boolean;
  className?: string;
}

export function ArrowButton({
  children,
  href,
  onClick,
  variant = "primary",
  arrow = true,
  className,
}: ArrowButtonProps) {
  const cls = `sl-mkt-btn sl-mkt-btn--${variant}${className ? ` ${className}` : ""}`;
  const inner = (
    <>
      <span className="sl-mkt-btn__label">{children}</span>
      {arrow && (
        <span className="sl-mkt-btn__arrow" aria-hidden>
          <ArrowRight size={15} />
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {inner}
      </button>
    );
  }
  return (
    <a className={cls} href={href}>
      {inner}
    </a>
  );
}
