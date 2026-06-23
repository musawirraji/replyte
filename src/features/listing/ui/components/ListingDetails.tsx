import type { PublicProspect } from "@/domain/prospect/types";
import { formatPrice, listingFacts } from "@/domain/prospect/listing";

// Render-only. Price, address, the bed/bath fact row, and the description.
// All formatting/derivation is imported from the domain layer.

export function ListingDetails({ prospect }: { prospect: PublicProspect }) {
  const facts = listingFacts(prospect);

  return (
    <section>
      <p className="sl-price">{formatPrice(prospect.listing_price)}</p>
      <h1 className="sl-address">{prospect.listing_address}</h1>

      {facts.length > 0 && (
        <div className="sl-facts">
          {facts.map((f) => (
            <div className="sl-fact" key={f.label}>
              <div className="sl-fact__value">{f.value}</div>
              <div className="sl-fact__label">{f.label}</div>
            </div>
          ))}
        </div>
      )}

      {prospect.listing_description && (
        <p className="sl-description">{prospect.listing_description}</p>
      )}
    </section>
  );
}
