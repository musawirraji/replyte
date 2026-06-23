import type { PublicProspect } from "@/domain/prospect/types";
import { galleryImages } from "@/domain/prospect/listing";

// Render-only. Hero image + up to two thumbnails. Falls back to a neutral
// placeholder when a prospect has no photos yet (skin-in-progress).

export function Gallery({ prospect }: { prospect: PublicProspect }) {
  const { main, thumbs } = galleryImages(prospect);

  if (!main) {
    return <div className="sl-gallery__empty">Listing photos coming soon</div>;
  }

  return (
    <div className="sl-gallery">
      <img className="sl-gallery__main" src={main} alt={prospect.listing_address} />
      {thumbs.length > 0 && (
        <div className="sl-gallery__col">
          {thumbs.map((src, i) => (
            <img
              key={src}
              className="sl-gallery__thumb"
              src={src}
              alt={`${prospect.listing_address} — view ${i + 2}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
