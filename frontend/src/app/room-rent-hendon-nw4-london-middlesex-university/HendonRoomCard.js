"use client";

import { useEffect, useState } from "react";
import {
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  PoundSterling,
  Ruler,
  Wifi,
  X,
} from "lucide-react";
import BookingModal from "@/app/listings/[slug]/component/BookingModal";

const ROOM_TYPE_LABELS = {
  single: "Single room",
  double: "Double room",
  ensuite: "Ensuite room",
  ensuite_double: "Ensuite double",
  studio: "Studio",
};

const ROOM_SIZE_LABELS = {
  "Small (up to 100 sq ft)": "9 m²",
  "Medium (100-150 sq ft)": "14 m²",
  "Large (150-200 sq ft)": "18 m²",
  "Extra Large (200+ sq ft)": "22+ m²",
};

const formatDate = (date) => {
  if (!date) return null;
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? null
    : parsedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

const normalizeMedia = (items, type) =>
  (Array.isArray(items) ? items : [])
    .map((item) => (typeof item === "string" ? item : item?.url))
    .filter(Boolean)
    .map((url) => ({ type, url }));

export default function HendonRoomCard({ listing }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const media = [
    ...normalizeMedia(listing.images, "image"),
    ...normalizeMedia(listing.videos, "video"),
  ];
  const bills = listing.billsIncluded || {};
  const includedBills = ["Electricity", "Gas", "Water", "Wi-Fi"].filter(
    (_, index) =>
      [
        bills.electricity,
        bills.gas,
        bills.water,
        bills.wifi,
      ][index]
  );
  const rent = Number(listing.monthlyPrice);
  const formattedRent =
    listing.monthlyPrice != null &&
    listing.monthlyPrice !== "" &&
    Number.isFinite(rent)
      ? `£${rent.toLocaleString("en-GB")}`
      : "Ask for rent";
  const moveInDate = listing.availableImmediately
    ? "Immediately"
    : formatDate(listing.availableFrom) || "Ask for availability";
  const location = [
    listing.location?.address,
    listing.location?.postcode,
    listing.location?.city,
  ]
    .filter(Boolean)
    .join(", ");
  const roomType =
    ROOM_TYPE_LABELS[listing.roomType] ||
    (listing.roomType
      ? listing.roomType.replaceAll("_", " ")
      : null);
  const roomSize =
    ROOM_SIZE_LABELS[listing.roomSize] || listing.roomSize || null;
  const amenities = [
    ...new Set([
      ...(Array.isArray(listing.roomAmenities) ? listing.roomAmenities : []),
      ...(Array.isArray(listing.propertyAmenities)
        ? listing.propertyAmenities
        : []),
    ]),
  ].slice(0, 6);
  const details = [
    { icon: BedDouble, label: "Room", value: roomType },
    { icon: Bath, label: "Bathroom", value: listing.bathroomType },
    { icon: Ruler, label: "Room size", value: roomSize },
  ].filter((detail) => detail.value);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsGalleryOpen(false);
      if (event.key === "ArrowRight" && media.length > 1) {
        setGalleryIndex((index) => (index + 1) % media.length);
      }
      if (event.key === "ArrowLeft" && media.length > 1) {
        setGalleryIndex((index) => (index - 1 + media.length) % media.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryOpen, media.length]);

  const openGallery = () => {
    setGalleryIndex(0);
    setIsGalleryOpen(true);
  };

  return (
    <>
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#E8E4DF] bg-white shadow-[0_12px_36px_rgba(26,35,50,0.08)]">
        <div className="relative h-56 bg-[#E8E4DF] sm:h-64">
          {media[0]?.type === "video" ? (
            <video
              src={media[0].url}
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              aria-label={`${listing.title} video preview`}
            />
          ) : media[0] ? (
            <img
              src={media[0].url}
              alt={`${listing.title} room`}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src="/rental-room-uk.avif"
              alt="Room interior"
              className="h-full w-full object-cover"
            />
          )}

          <div className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow">
            {listing.availableImmediately ? "Available now" : "Available"}
          </div>
          <div className="absolute right-4 top-4 rounded-xl bg-[#1A2332]/90 px-4 py-2 text-right text-white shadow">
            <p className="text-xl font-extrabold leading-tight">{formattedRent}</p>
            <p className="text-xs text-white/75">per month</p>
          </div>

          {media.length > 0 && (
            <button
              type="button"
              onClick={openGallery}
              className="absolute bottom-4 right-4 rounded-xl bg-[#1A2332]/90 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1A2332]"
            >
              View Photos ({media.length})
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-5">
            <h3 className="font-playfair text-lg font-bold text-[#1A2332] sm:text-2xl">
              {listing.title || roomType || "Hendon room"}
            </h3>
            {location && (
              <p className="mt-2 flex items-start gap-2 text-sm text-[#6B7280]">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[#FF6B35]"
                  aria-hidden="true"
                />
                {location}
              </p>
            )}
          </div>

          {details.length > 0 && (
            <div className="mb-5 grid grid-cols-2 gap-2">
              {details.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex min-w-0 items-center gap-2 rounded-xl bg-[#F7F7F5] p-3"
                >
                  <Icon
                    size={17}
                    className="shrink-0 text-[#FF6B35]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7A808A]">
                      {label}
                    </p>
                    <p className="truncate text-sm font-bold capitalize text-[#1A2332]">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 border-y border-[#E8E4DF] py-4 text-sm">
            {listing.deposit != null && (
              <p className="flex items-center gap-1.5 text-[#4B5563]">
                <PoundSterling
                  size={16}
                  className="text-[#FF6B35]"
                  aria-hidden="true"
                />
                <span>
                  Deposit: <strong>£{listing.deposit}</strong>
                </span>
              </p>
            )}
            <p className="flex items-center gap-1.5 text-[#4B5563]">
              <CalendarDays
                size={16}
                className="text-[#FF6B35]"
                aria-hidden="true"
              />
              <span>
                Move-in: <strong>{moveInDate}</strong>
              </span>
            </p>
            {listing.furnished != null && (
              <p className="flex items-center gap-1.5 text-[#4B5563]">
                <Check
                  size={16}
                  className="text-[#FF6B35]"
                  aria-hidden="true"
                />
                <strong>
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </strong>
              </p>
            )}
          </div>

          <div className="mb-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Bills included
            </p>
            {includedBills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {includedBills.map((bill) => (
                  <span
                    key={bill}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                  >
                    {bill === "Wi-Fi" && (
                      <Wifi size={13} className="mr-1 inline" aria-hidden="true" />
                    )}
                    {bill}
                    {bill === "Wi-Fi" && listing.wifiSpeed
                      ? ` · ${listing.wifiSpeed} Mbps`
                      : ""}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#6B7280]">
                Please ask us which bills are included.
              </p>
            )}
          </div>

          {amenities.length > 0 && (
            <div className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                Room &amp; property features
              </p>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-[#F2F4F7] px-3 py-1 text-xs font-medium text-[#4B5563]"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="flex flex-1 items-center justify-center rounded-xl bg-[#FF6B35] px-4 py-3 font-bold text-white shadow-[0_8px_20px_rgba(255,107,53,0.22)] transition-colors hover:bg-[#e85b27]"
            >
              Book viewing
            </button>
            <a
              href="tel:+447419990126"
              className="flex flex-1 items-center justify-center rounded-xl border border-[#1A2332]/15 px-4 py-3 font-bold text-[#1A2332] transition-colors hover:bg-[#F7F7F5]"
            >
              Call agent
            </a>
          </div>
        </div>
      </article>

      {isGalleryOpen && media.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${listing.title || "Room"} photos and videos`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setIsGalleryOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsGalleryOpen(false)}
            aria-label="Close media viewer"
            className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>

          <p className="absolute left-5 top-6 text-sm font-semibold text-white">
            {listing.title}
          </p>

          {media.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setGalleryIndex((index) => (index - 1 + media.length) % media.length);
              }}
              aria-label="Previous media"
              className="absolute left-3 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {media[galleryIndex].type === "video" ? (
            <video
              key={media[galleryIndex].url}
              src={media[galleryIndex].url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onClick={(event) => event.stopPropagation()}
              className="max-h-[82vh] max-w-[88vw] object-contain"
            />
          ) : (
            <img
              src={media[galleryIndex].url}
              alt={`${listing.title || "Room"} media ${galleryIndex + 1}`}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[82vh] max-w-[88vw] object-contain"
            />
          )}

          {media.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setGalleryIndex((index) => (index + 1) % media.length);
              }}
              aria-label="Next media"
              className="absolute right-3 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-8"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <p className="absolute bottom-5 text-sm text-white">
            {media[galleryIndex].type === "video" ? "Video" : "Photo"}{" "}
            {galleryIndex + 1} / {media.length}
          </p>
        </div>
      )}

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        listing={listing}
      />
    </>
  );
}
