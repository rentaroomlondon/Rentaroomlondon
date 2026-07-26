'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import RoomCard from './RoomCard';

const WHATSAPP_BASE = 'https://wa.me/447419990126';
const DEFAULT_WHATSAPP_TEXT = 'Hello! I am interested in booking a room.';

// ─────────────────────────────────────────────
// Helpers – map DB listing → UI card shape
// ─────────────────────────────────────────────
const getAreaFromPostcode = (postcode = '') => {
  const pc = postcode.toUpperCase().replace(/\s/g, '');
  if (pc.startsWith('SE10') || pc.startsWith('SE8')) return 'Greenwich';
  if (pc.startsWith('NW9')) return 'Colindale';
  if (pc.startsWith('SE9')) return 'Eltham';
  if (pc.startsWith('NW2')) return 'Cricklewood';
  if (pc.startsWith('NW4')) return 'Hendon';
  return 'Any Location';
};

const getZoneFromPostcode = (postcode = '') => {
  const pc = postcode.toUpperCase().replace(/\s/g, '');
  if (pc.startsWith('SE10') || pc.startsWith('SE8')) return 'ZONE 2';
  if (pc.startsWith('NW9') || pc.startsWith('NW4')) return 'ZONE 3–4';
  if (pc.startsWith('SE9')) return 'ZONE 4';
  if (pc.startsWith('NW2')) return 'ZONE 3';
  return 'ZONE 1–4';
};

const mapListingToCard = (listing) => {
  const postcode = listing.location?.postcode || 'London';
  const area = getAreaFromPostcode(postcode);

  const features = [];
  // Location / address removed as requested
  if (listing.roomType) features.push(`${listing.roomType.replace('_', ' ')} room`);
  if (features.length === 0 && listing.description) {
    features.push(
      listing.description.slice(0, 80) + (listing.description.length > 80 ? '…' : '')
    );
  }

  return {
    id: listing._id || listing.listingId || listing.slug,
    category: area,
    title: listing.title,
    postcode,
    zone: getZoneFromPostcode(postcode),
    image:
      listing.images?.[0] ||
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    images: listing.images || [],
    features,
    priceTag: listing.monthlyPrice
      ? `£${listing.monthlyPrice}/mo`
      : listing.roomType?.replace('_', ' ') || 'Available',
    slug: listing.slug,
    raw: listing,
  };
};

const buildWhatsAppUrl = (roomTitle) => {
  const text = roomTitle
    ? `Hello! I am interested in booking a room: ${roomTitle}`
    : DEFAULT_WHATSAPP_TEXT;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Tab() {
  const router = useRouter();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryRoomTitle, setEnquiryRoomTitle] = useState('');

  // Image gallery modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  const maxIndex = Math.max(0, listings.length - cardsPerView);

  // ── Responsive cardsPerView + isMobile ─────
  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);

      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Keep index in bounds when cardsPerView changes
  useEffect(() => {
    setCurrentIndex((prev) =>
      Math.min(prev, Math.max(0, listings.length - cardsPerView))
    );
  }, [cardsPerView, listings.length]);

  // ── Fetch from DB ──────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (cancelled) return;

        const mapped = (data.listings || data || []).map(mapListingToCard);
        setListings(mapped);
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load listings:', err);
          setError(err.message || 'Failed to load rooms');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Handlers ───────────────────────────────
  const handleViewRoom = (loc) => {
    const images =
      loc.images?.length > 0
        ? loc.images
        : loc.image
        ? [loc.image]
        : [];

    setModalImages(images);
    setModalTitle(loc.title || 'Room Images');
    setCurrentImageIndex(0);
    setShowImageModal(true);
  };

  const handleEnquire = (loc) => {
    setEnquiryRoomTitle(loc?.title || '');
    setEnquirySuccess(true);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? modalImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === modalImages.length - 1 ? 0 : prev + 1
    );
  };

  // ── Render ─────────────────────────────────
  return (
    <div className="w-full text-slate-900 font-sans">
      <section
        id="locations-section"
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      >
        {/* Section Headings */}
        <div className="space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
            <Building2 className="w-3.5 h-3.5 text-orange-600" />
            <span>London Direct Landlord Properties</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Book Your Perfect Student and Professional Housing
          </h3>
          <h4 className="text-lg sm:text-xl font-bold text-orange-600">
            Rent a Room in London, UK
          </h4>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 className="text-xl font-black text-slate-900">
              All Available London Rooms
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Direct landlord verified listings • All utility bills included
            </p>
          </div>
        </div>

        {/* Loading / Error / Empty / Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-slate-500">
            <p className="font-bold text-lg mb-2">Could not load rooms</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-orange-600 font-bold text-sm underline"
            >
              Try again
            </button>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="font-bold text-lg">No rooms found</p>
            <p className="text-sm mt-1">Please check back later.</p>
          </div>
        ) : isMobile ? (
          /* ── Mobile: vertical column (all cards stacked) ── */
          <div className="grid grid-cols-1 gap-5">
            {listings.map((loc) => (
              <RoomCard
                key={loc.id}
                loc={loc}
                onEnquire={() => handleEnquire(loc)}
                onView={() => handleViewRoom(loc)}
              />
            ))}
          </div>
        ) : (
          /* ── Tablet / Desktop: controlled slider with buttons ── */
          <div className="relative">
            {/* Left button */}
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
                         w-10 h-10 rounded-full bg-white shadow-md border border-slate-200
                         flex items-center justify-center
                         disabled:opacity-40 disabled:cursor-not-allowed
                         hover:bg-orange-50 hover:border-orange-300 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            {/* Cards track */}
            <div className="overflow-hidden mx-8">
              <div
                className="flex transition-transform duration-300 ease-out gap-5"
                style={{
                  transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {listings.map((loc) => (
                  <div
                    key={loc.id}
                    className="flex-shrink-0"
                    style={{
                      width: `calc((100% - ${(cardsPerView - 1) * 1.25}rem) / ${cardsPerView})`,
                    }}
                  >
                    <RoomCard
                      loc={loc}
                      onEnquire={() => handleEnquire(loc)}
                      onView={() => handleViewRoom(loc)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right button */}
            <button
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10
                         w-10 h-10 rounded-full bg-white shadow-md border border-slate-200
                         flex items-center justify-center
                         disabled:opacity-40 disabled:cursor-not-allowed
                         hover:bg-orange-50 hover:border-orange-300 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        )}
      </section>

      {/* ── IMAGE GALLERY MODAL ── */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            {/* Close button */}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Title */}
            <p className="text-white text-center text-sm font-medium mb-3 truncate">
              {modalTitle}
            </p>

            {/* Image */}
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video flex items-center justify-center">
              {modalImages.length > 0 ? (
                <img
                  src={modalImages[currentImageIndex]}
                  alt={`${modalTitle} - ${currentImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <p className="text-white/60">No images available</p>
              )}

              {/* Prev / Next image buttons */}
              {modalImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Dots indicator */}
            {modalImages.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {modalImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? 'bg-orange-500 w-5'
                        : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* WHATSAPP ENQUIRY DIALOG */}
      {enquirySuccess && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950">
              Direct WhatsApp Enquiry
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are connecting directly with our UK Landlord Network. Zero agency
              fees apply.
            </p>
            <a
              href={buildWhatsAppUrl(enquiryRoomTitle)}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl transition-all block shadow-md"
            >
              Open WhatsApp →
            </a>
            <button
              onClick={() => {
                setEnquirySuccess(false);
                setEnquiryRoomTitle('');
              }}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold block mx-auto"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}