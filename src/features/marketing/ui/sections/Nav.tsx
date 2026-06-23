"use client";

import { BRAND, NAV_LINKS } from "@/domain/marketing/content";
import { useNavVisibility } from "../hooks/scroll";
import { ArrowButton } from "../components/ArrowButton";

// §1 — fixed glass nav pill. Hides on scroll-down, reappears on scroll-up.

export function Nav() {
  const visible = useNavVisibility();
  return (
    <header
      className={`sl-mkt-nav${visible ? "" : " sl-mkt-nav--hidden"}`}
      data-screen-label="Nav"
    >
      <div className="sl-mkt-nav__bar">
        <a className="sl-mkt-nav__brand" href="#top">
          <img
            className="sl-mkt-nav__logo"
            src="/marketing/logo-mark.png"
            alt=""
            width={27}
            height={27}
          />
          <span className="sl-mkt-nav__word">{BRAND.name}</span>
        </a>
        <nav className="sl-mkt-nav__links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <ArrowButton href={BRAND.demoPath} variant="primary" className="sl-mkt-nav__cta">
          See the live demo
        </ArrowButton>
      </div>
    </header>
  );
}
