import { notFound } from "next/navigation";
import Client from "./client";

// 🔥 Fetch Listing (SSR)
const getListing = async (slug) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/listings/${slug}`,
      {
        cache: "no-store", // SSR
        // OR: next: { revalidate: 60 }
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.listing;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

// 🔥 SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ FIX

  const listing = await getListing(slug);

  if (!listing) {
    return {
      title: "Listing Not Found",
      description: "Property not found",
    };
  }

  return {
    title: `${listing.title} - RENTAROOMLONDON`,
    description:
      listing.description?.slice(0, 150) ||
      "View this listing",

    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.images?.[0]],
    },
  };
}

// 🔥 SSR Page
const Page = async ({ params }) => {
  const { slug } = await params; // ✅ FIX

  const listing = await getListing(slug);

  if (!listing) return notFound();

  return <Client listing={listing} />;
};

export default Page;