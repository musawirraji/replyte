import type { Metadata } from "next";
import { getProspectBySlug } from "@/infrastructure/supabase/prospects";
import { toPublicProspect, formatPrice } from "@/domain/prospect/listing";
import { ListingScreen } from "@/features/listing/ui/screens/ListingScreen";

// The skinned listing page. Server component: fetch the prospect row fresh on
// every request, strip the secret dashboard_slug, and hand the public shape
// to the client screen. No generateStaticParams — slugs are created at
// runtime in Supabase and must reflect live data.

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prospect = await getProspectBySlug(slug);
  if (!prospect) return { title: "Listing not found" };
  return {
    title: `${prospect.listing_address} · ${prospect.brand_name}`,
    description: `${formatPrice(prospect.listing_price)} — enquire and get a personalised reply in seconds.`,
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params;
  const prospect = await getProspectBySlug(slug);

  if (!prospect) {
    return (
      <main className="sl-notice">
        <h1 className="sl-notice__title">Listing not found</h1>
        <p className="sl-notice__body">
          This listing link isn’t active. Check the address and try again.
        </p>
      </main>
    );
  }

  return <ListingScreen prospect={toPublicProspect(prospect)} />;
}
