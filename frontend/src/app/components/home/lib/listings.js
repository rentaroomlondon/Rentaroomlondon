// Server-side data for the "Rooms ready to move into" carousel.
// Uses the same API as /find-a-room (GET /listings/search) and maps each
// listing to the small shape the home page card needs.

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const FALLBACK_IMAGE = "/home/room-single.webp";

const ROOM_TYPE_LABELS = {
  single: "Single room",
  double: "Double room",
  ensuite: "Ensuite room",
  ensuite_double: "Ensuite double",
  studio: "Studio",
};

// "NW4 3AB" -> "NW4", "NW43AB" -> "NW4"
function postcodeDistrict(postcode = "") {
  const clean = postcode.toUpperCase().trim();
  if (clean.includes(" ")) return clean.split(/\s+/)[0];
  const match = clean.match(/^[A-Z]{1,2}\d[A-Z\d]?(?=\d[A-Z]{2}$)/) || clean.match(/^[A-Z]{1,2}\d{1,2}[A-Z]?/);
  return match ? match[0] : clean;
}

function availabilityLabel(listing) {
  if (listing.availableImmediately || !listing.availableFrom) return "now";
  const date = new Date(listing.availableFrom);
  if (Number.isNaN(date.getTime()) || date <= new Date()) return "now";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/London" });
}

export function toHomeRoom(listing) {
  const availability = availabilityLabel(listing);
  const image = listing.images?.[0] || FALLBACK_IMAGE;
  return {
    id: listing._id,
    href: listing.slug ? `/listings/${listing.slug}` : "/find-a-room",
    title: listing.title,
    image,
    district: postcodeDistrict(listing.location?.postcode),
    availability,
    badge: availability === "now" ? "Available now" : ROOM_TYPE_LABELS[listing.roomType] || "Room to rent",
    priceLabel: listing.monthlyPrice ? `£${Number(listing.monthlyPrice).toLocaleString("en-GB")}` : "Ask",
    // Same shape the site's wishlist (/saved) already stores.
    wishlistItem: {
      id: listing._id,
      title: listing.title,
      price: listing.monthlyPrice,
      image: listing.images?.[0],
      address: listing.location,
      slug: listing.slug,
      listingId: listing.listingId,
      availability: listing.availableImmediately ? "Available Now" : "Check Availability",
      description: listing.description,
    },
  };
}

/** Latest available rooms (featured first). Returns [] if the API is unreachable. */
export async function getHomeRooms(limit = 8) {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/listings/search`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const { listings = [] } = await res.json();
    return listings
      .filter((listing) => !listing.status || listing.status === "available")
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
      .slice(0, limit)
      .map(toHomeRoom);
  } catch (error) {
    console.error("Home rooms fetch failed:", error.message);
    return [];
  }
}
