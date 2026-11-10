"use client";
import { hideDoorNumber } from "@/app/utils/formatAddress";

import { useEffect, useState } from "react";
import { BusFront, GraduationCap, ShoppingBag, TrainFront } from "lucide-react";
import PropertyCardSkeleton from "@/app/Shared/PropertyCardSkeleton";
import HendonRoomCard from "./HendonRoomCard";

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

const propertyConnections = {
  "28 Babington Road": [
    { icon: TrainFront, name: "Hendon Central", time: "5–10 min walk", detail: "Northern Line, direct into Central and South London" },
    { icon: TrainFront, name: "Hendon Thameslink", time: "15–17 min walk", detail: "National Rail connections" },
    { icon: BusFront, name: "Local buses", time: "1–2 min walk", detail: "Bus stops close to the property" },
    { icon: GraduationCap, name: "Middlesex University", time: "2–10 min", detail: "Hendon campus" },
  ],
  "9 Kennylands Court Hendon Way": [
    { icon: TrainFront, name: "Hendon Central", time: "About 5 min walk", detail: "Northern Line to Euston, King's Cross, Charing Cross and South London" },
    { icon: TrainFront, name: "Hendon Thameslink", time: "12–15 min walk", detail: "Or a quick local bus ride" },
    { icon: BusFront, name: "Buses on Hendon Way", time: "1 min walk", detail: "Routes 83, 183, 143, 326 and night buses N5 and N83" },
    { icon: GraduationCap, name: "Middlesex University", time: "8–12 min walk", detail: "Or a short ride on the 183 bus" },
  ],
  "16 Hendale Avenue": [
    { icon: TrainFront, name: "Hendon Central", time: "10–12 min walk", detail: "Northern Line to Euston, King's Cross, Charing Cross and South London" },
    { icon: TrainFront, name: "Hendon Thameslink", time: "12–15 min walk", detail: "Fast trains to Farringdon, Blackfriars, St Albans and Luton" },
    { icon: BusFront, name: "Local buses", time: "Moments away", detail: "Connections to Barnet, Golders Green, Brent Cross and Finchley" },
    { icon: GraduationCap, name: "Middlesex University", time: "5–10 min walk", detail: "Or a quick local transport trip" },
    { icon: ShoppingBag, name: "Brent Cross", time: "2–5 min", detail: "One Tube stop north, or a short bus ride" },
  ],
};

const travelTimes = [
  { destination: "Brent Cross Shopping Centre", time: "2–5 min", route: "Tube or bus" },
  { destination: "Borehamwood & Elstree", time: "7 min", route: "Thameslink" },
  { destination: "Central London (City, Camden, Euston)", time: "15–25 min", route: "Northern Line" },
  { destination: "St Albans", time: "16–20 min", route: "Thameslink" },
  { destination: "Luton", time: "28–35 min", route: "Thameslink" },
  { destination: "Westminster & South London", time: "30–40 min", route: "Northern Line" },
  { destination: "Brighton", time: "About 1 hr 40 min", route: "Rail" },
];
const WHATSAPP_URL = `https://wa.me/447419990126?text=${encodeURIComponent(
  "Hello! I would like to book a viewing for a room in Hendon NW4."
)}`;

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

        setListings(
          data.listings.filter((listing) => listing.status === "available")
        );
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
      className="scroll-mt-24 px-4 py-12 md:px-6 md:py-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B35]">
              Room listings
            </p>
            <h2 className="font-playfair text-3xl font-bold md:text-4xl">
              Rent a Room in Northwest of London With Bills included
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
            aria-label="Loading available Hendon rooms"
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
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
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {listings.map((listing) => {
              return (
                <HendonRoomCard
                  key={listing._id || listing.slug}
                  listing={listing}
                />
              );
            })}
          </div>
        )}

        {!loading && !error && groupedProperties.length > 0 && (
          <div className="mt-16 border-t border-[#E8E4DF] pt-14">
            <div className="mb-8 max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B35]">
                Find your neighbourhood
              </p>
              <h2 className="font-playfair text-3xl font-bold md:text-4xl">
                Find a Single Occupancy Rooms near Hendon Central
              </h2>
              <p className="mt-3 leading-7 text-[#6B7280]">
                Compare live room availability, rents and the nearby transport
                links for each home.
              </p>
            </div>
            <div className="grid gap-5">
              {groupedProperties.map((property) => {
                const firstListing = property.listings[0];
                const prices = property.listings
                  .map((listing) => Number(listing.monthlyPrice))
                  .filter(Boolean);
                const billsIncluded = property.listings.every((listing) =>
                  ["electricity", "gas", "water", "wifi"].every(
                    (bill) => listing.billsIncluded?.[bill]
                  )
                );
                const connections =
                  propertyConnections[property.address] || [];

                return (
                  <article
                    key={property.address}
                    className="overflow-hidden rounded-[1.75rem] border border-[#E8E4DF] bg-white shadow-[0_12px_36px_rgba(26,35,50,0.06)]"
                  >
                    <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                      <div className="p-6 sm:p-8">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B35]">
                          Hendon · {firstListing.location?.postcode} · Zone 3
                        </p>
                        <h4 className="mt-3 font-playfair text-2xl font-bold text-[#1A2332]">
                          {hideDoorNumber(firstListing.location?.address || property.address)}
                        </h4>
                        <div className="mt-6 space-y-3">
                          {[
                            ["Rooms", `${property.listings.length} available`],
                            [
                              "Rent",
                              prices.length
                                ? `${prices.map((price) => `£${price}`).join(" and ")} per month`
                                : "Ask when you enquire",
                            ],
                            ["Bills", billsIncluded ? "Included" : "Ask when you enquire"],
                            [
                              "Occupancy",
                              firstListing.occupancy === "double"
                                ? "Double occupancy"
                                : "Single occupancy",
                            ],
                          ].map(([label, value]) => (
                            <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                              <span className="text-[#6B7280]">{label}</span>
                              <span className="font-semibold text-[#1A2332]">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-[#E8E4DF] bg-[#FAF9F6] p-6 sm:p-8 lg:border-l lg:border-t-0">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                          Getting around
                        </p>
                        <ul className="space-y-4">
                          {connections.map(({ icon: Icon, name, time, detail }) => (
                            <li key={name} className="flex gap-3">
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#FF6B35] shadow-sm">
                                <Icon size={17} aria-hidden="true" />
                              </span>
                              <div>
                                <p className="text-sm font-bold text-[#1A2332]">
                                  {name}
                                  <span className="ml-2 text-[#156082]">{time}</span>
                                </p>
                                <p className="mt-1 text-sm leading-5 text-[#6B7280]">
                                  {detail}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        <section className="mt-16 overflow-hidden rounded-[1.75rem] bg-[#1A2332] text-white shadow-[0_18px_48px_rgba(26,35,50,0.16)]">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            <div className="relative overflow-hidden p-7 sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FF6B35]/10" />
              <div className="relative">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#FF8A5B]">
                  Get around with ease
                </p>
                <h3 className="font-playfair text-3xl font-bold md:text-4xl">
                  Travel times from Hendon
                </h3>
                <p className="mt-4 max-w-md leading-7 text-white/70">
                  Approximate journey times from the area. Routes and times can
                  vary, so check live services before travelling.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
                  <TrainFront size={16} className="text-[#FF8A5B]" />
                  Northern Line & Thameslink
                </div>
              </div>
            </div>

            <div className="bg-white p-4 text-[#1A2332] sm:p-6">
              <div className="hidden grid-cols-[1fr_8rem_9rem] gap-4 border-b border-[#E8E4DF] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6B7280] sm:grid">
                <span>Destination</span>
                <span>Journey</span>
                <span>Route</span>
              </div>
              <ul className="divide-y divide-[#E8E4DF]">
                {travelTimes.map(({ destination, time, route }) => (
                  <li
                    key={destination}
                    className="grid gap-1 px-4 py-3 sm:grid-cols-[1fr_8rem_9rem] sm:items-center sm:gap-4"
                  >
                    <span className="font-semibold">{destination}</span>
                    <span className="text-sm font-bold text-[#156082]">{time}</span>
                    <span className="text-sm text-[#6B7280]">{route}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
