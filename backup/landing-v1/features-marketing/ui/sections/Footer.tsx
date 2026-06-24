import { BRAND, FOOTER } from "@/domain/marketing/content";

// §11 — Footer. Render-only: brand + tagline left, link columns right, legal
// row beneath a hairline.

export function Footer() {
  return (
    <footer className="sl-mkt-footer" data-screen-label="Footer">
      <div className="sl-mkt-footer__top">
        <div className="sl-mkt-footer__brand">
          <span className="sl-mkt-footer__word">
            <img src="/marketing/logo-mark.png" alt="" width={24} height={24} />
            {BRAND.name}
          </span>
          <p className="sl-mkt-footer__tag">{BRAND.tagline}</p>
        </div>
        <div className="sl-mkt-footer__cols">
          {FOOTER.columns.map((col) => (
            <div key={col.heading} className="sl-mkt-footer__col">
              <span className="sl-mkt-footer__heading">{col.heading}</span>
              {col.links.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="sl-mkt-footer__bottom">
        <span>{FOOTER.copyright}</span>
        <span className="sl-mkt-footer__disclaimer">{FOOTER.disclaimer}</span>
      </div>
    </footer>
  );
}
