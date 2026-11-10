import { hideDoorNumber } from "@/app/utils/formatAddress";
const SITE_URL = "https://rentaroomlondon.co.uk";

const ListingSchema = ({ listing }) => {
  if (!listing) return null;

  const url = `${SITE_URL}/listings/${listing.slug}`;
  const images = (Array.isArray(listing.images) ? listing.images : [])
    .filter((image) => typeof image === "string" && image.trim())
    .map((image) => {
      try {
        return new URL(image, SITE_URL).href;
      } catch {
        return "";
      }
    })
    .filter(Boolean);
  const coordinates = listing.location?.coordinates;
  const latitude = Number(coordinates?.[1]);
  const longitude = Number(coordinates?.[0]);
  const hasCoordinates = Number.isFinite(latitude)
    && Number.isFinite(longitude)
    && (latitude !== 0 || longitude !== 0);
  const price = Number(listing.monthlyPrice);
  const availability = {
    available: "https://schema.org/InStock",
    reserved: "https://schema.org/LimitedAvailability",
    rented: "https://schema.org/OutOfStock",
  }[listing.status] || "https://schema.org/OutOfStock";
  const availableFrom = listing.availableFrom ? new Date(listing.availableFrom) : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    "@id": `${url}#accommodation`,
    name: listing.title,
    description: listing.description || `${listing.roomType || "Room"} to rent in ${listing.location?.city || "London"}.`,
    ...(images.length ? { image: images } : {}),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    address: {
      "@type": "PostalAddress",
      ...(listing.location?.address ? { streetAddress: hideDoorNumber(listing.location.address) } : {}),
      ...(listing.location?.city ? { addressLocality: listing.location.city } : {}),
      ...(listing.location?.postcode ? { postalCode: listing.location.postcode } : {}),
      addressCountry: "GB",
    },
    ...(hasCoordinates
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude,
            longitude,
          },
        }
      : {}),
    ...(listing.occupancy
      ? {
          occupancy: {
            "@type": "QuantitativeValue",
            maxValue: listing.occupancy === "double" ? 2 : 1,
            unitText: "people",
          },
        }
      : {}),
    ...(Number.isFinite(price) && price > 0
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "GBP",
            availability,
            url,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price,
              priceCurrency: "GBP",
              unitCode: "MON",
              unitText: "month",
            },
            seller: {
              "@type": "Organization",
              name: "Rent a Room London",
              url: SITE_URL,
            },
          },
        }
      : {}),
    ...((listing.roomAmenities?.length || listing.propertyAmenities?.length)
      ? {
          amenityFeature: [
            ...(listing.roomAmenities || []),
            ...(listing.propertyAmenities || []),
          ].map((amenity) => ({
            "@type": "LocationFeatureSpecification",
            name: String(amenity).replace(/_/g, " "),
            value: true,
          })),
        }
      : {}),
    additionalProperty: [
      listing.roomType && {
        "@type": "PropertyValue",
        name: "Room Type",
        value: listing.roomType.replace(/_/g, " "),
      },
      listing.propertyType && {
        "@type": "PropertyValue",
        name: "Property Type",
        value: listing.propertyType.replace(/_/g, " "),
      },
      typeof listing.furnished === "boolean" && {
        "@type": "PropertyValue",
        name: "Furnished",
        value: listing.furnished,
      },
      listing.availableFrom && {
        "@type": "PropertyValue",
        name: "Available From",
        value: availableFrom && !Number.isNaN(availableFrom.getTime())
          ? availableFrom.toISOString()
          : String(listing.availableFrom),
      },
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default ListingSchema;
