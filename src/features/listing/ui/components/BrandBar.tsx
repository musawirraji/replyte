import type { PublicProspect } from "@/domain/prospect/types";
import { agentLine } from "@/domain/prospect/listing";

// Render-only. The skinned header: prospect logo (or name) on the left, the
// agent contact line on the right. Derivations come from the domain layer.

export function BrandBar({ prospect }: { prospect: PublicProspect }) {
  return (
    <header className="sl-brandbar">
      {prospect.logo_url ? (
        <img
          className="sl-brandbar__logo"
          src={prospect.logo_url}
          alt={prospect.brand_name}
        />
      ) : (
        <span className="sl-brandbar__name">{prospect.brand_name}</span>
      )}
      <span className="sl-brandbar__agent">{agentLine(prospect)}</span>
    </header>
  );
}
