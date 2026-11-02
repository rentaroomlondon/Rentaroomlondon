"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/app/Shared/PropertyCard";

const properties = [
  {
    address: "28 Babington Road",
    addressMatches: ["28 Babington Road", "Babington Road"],
    postcodes: ["NW4 4LD", "NW4 4HE"],
  },
  {
    address: "9 Kennylands Court Hendon Way",
    addressMatches: ["9 Kennylands Court"],
    postcodes: ["NW4 3LU"],
  },
  {
    address: "16 Hendale Avenue",
    addressMatches: ["16 Hendale Avenue"],
    postcodes: ["NW4 4LR"],
    unnumberedAddressMatch: "Hendale Avenue",
    unnumberedAddressPostcodes: ["NW4 4LL"],
  },
];

const normalize = (value = "") => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const matchesProperty = (listing, property) => {
  const address = normalize(listing.location?.address);
  const postcode = normalize(listing.location?.postcode);
  const addressMatches = property.addressMatches.some((candidate) =>
    address.includes(normalize(candidate))
  );
  const matchesKnownPostcode = property.postcodes.some(
    (candidate) => postcode === normalize(candidate)
  );
  const matchesUnnumberedAddress =
    property.unnumberedAddressMatch &&
    address.startsWith(normalize(property.unnumberedAddressMatch)) &&
    property.unnumberedAddressPostcodes.some(
      (candidate) => postcode === normalize(candidate)
    );

  return (
    (addressMatches && matchesKnownPostcode) || matchesUnnumberedAddress
  );
};

export default function HendonRooms() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not configured.");
      setError(true);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadListings = async () => {
      try {
        const response = await fetch(
          `${apiUrl.replace(/\/+$/, "")}/listings/hendon`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `Hendon room search failed with status ${response.status}`
          );
        }

        const data = await response.json();
        if (!data.success || !Array.isArray(data.listings)) {
          throw new Error("Hendon room search returned an invalid response.");
        }

        setListings(data.listings);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("Unable to load Hendon room listings:", fetchError);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadListings();
    return () => controller.abort();
  }, []);

  const groupedProperties = properties
    .map((property) => {
      const propertyListings = listings.filter(
        (listing) => matchesProperty(listing, property)
      );

      return { ...property, listings: propertyListings };
    })
    .filter((property) => property.listings.length > 0);

  return (
    <section
      id="available-rooms"
      className="scroll-mt-24 px-5 py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B35]">
              Room listings
            </p>
            <h2 className="font-playfair text-3xl font-bold md:text-4xl">
              Rooms at the three Hendon properties
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#6B7280]">
            Room details, rents, photos and availability are loaded from the
            listings database. Availability can change.
          </p>
        </div>

        {loading ? (
          <div
            role="status"
            className="rounded-2xl border border-[#E8E4DF] bg-white p-8 text-center text-[#6B7280]"
          >
            Loading Hendon rooms…
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-amber-200 bg-white p-8 text-center"
          >
            <p className="font-semibold">
              Hendon room details are temporarily unavailable.
            </p>
            <a
              href="#book-viewing"
              className="mt-3 inline-flex font-bold text-[#156082] underline"
            >
              Book a viewing
            </a>
          </div>
        ) : listings.length === 0 ? (
          <p className="rounded-2xl border border-[#E8E4DF] bg-white p-8 text-center text-[#6B7280]">
            No room listings were found for these Hendon properties. Contact
            us to check availability.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => {
              const address = listing.location?.address || listing.title;
              const status =
                listing.status === "available"
                  ? "Available"
                  : listing.status
                    ? listing.status.charAt(0).toUpperCase() +
                      listing.status.slice(1)
                    : "Check availability";

              return (
                <PropertyCard
                  key={listing._id || listing.slug}
                  id={listing._id}
                  slug={listing.slug}
                  listingId={listing.listingId}
                  title={listing.title}
                  location={`${address}, ${listing.location?.postcode || ""}`}
                  price={listing.monthlyPrice}
                  availability={status}
                  description={
                    listing.description ||
                    `${listing.roomLabel || "Room"} at ${address}`
                  }
                  imageUrl={listing.images?.[0] || "/rental-room-uk.avif"}
                />
              );
            })}
          </div>
        )}

        {!loading && !error && groupedProperties.length > 0 && (
          <div className="mt-14">
            <h3 className="mb-6 font-playfair text-2xl font-bold md:text-3xl">
              The three properties
            </h3>
            <div className="grid gap-5 md:grid-cols-3">
              {groupedProperties.map((property) => {
                const firstListing = property.listings[0];
                const prices = property.listings
                  .map((listing) => Number(listing.monthlyPrice))
                  .filter(Boolean);

                return (
                  <article
                    key={property.address}
                    className="rounded-2xl border border-[#E8E4DF] bg-white p-6"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">
                      Hendon · {firstListing.location?.postcode} · Zone 3
                    </p>
                    <h4 className="mt-2 text-lg font-bold">
                      {firstListing.location?.address || property.address}
                    </h4>
                    <p className="mt-4 text-sm text-slate-600">
                      {property.listings.length} database{" "}
                      {property.listings.length === 1 ? "listing" : "listings"}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {prices.length > 0
                        ? `Listed rents: ${prices
                            .map((price) => `£${price}`)
                            .join(", ")} per month`
                        : "Rent details available in individual listings"}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
