'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  ChevronRight,
  Plus,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import RoomCard from './RoomCard';

const GBP_LINK =
  'https://www.google.com/search?sca_esv=7653edd048582144&rlz=1C1CHZN_enKW1034KW1034&sxsrf=APpeQnuqDknmR_k5xlchENl18i8bPILKlA%3A1784893273111&q=RentaRoomLondon&stick=H4sIAAAAAAAAAONgU1I1qDCxMDczNEy2MDRMMk41NTW1MqgwS04xsLRIskxJtEgyMDYwWcTKH5SaV5IYlJ-f65Ofl5KfBwCThyX0OwAAAA&mat=Cc0ocppXRqjM&ved=2ahUKEwjQxoXMneuVAxWXT2wGHYLZEQkQrMcEegQIFBAF';

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
  if (listing.location?.address) features.push(listing.location.address);
  if (listing.roomType) features.push(`${listing.roomType.replace('_', ' ')} room`);
  if (listing.bathroomType) features.push(`${listing.bathroomType} bathroom`);
  if (listing.propertyAmenities?.length) {
    features.push(
      ...listing.propertyAmenities.slice(0, 3).map((a) => a.replace(/_/g, ' '))
    );
  }
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
    features,
    priceTag: listing.monthlyPrice
      ? `£${listing.monthlyPrice}/mo`
      : listing.roomType?.replace('_', ' ') || 'Available',
    address: listing.location?.address,
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

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryRoomTitle, setEnquiryRoomTitle] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

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

  // ── Dynamic categories + counts ────────────
  const categories = useMemo(() => {
    const counts = {};
    listings.forEach((l) => {
      counts[l.category] = (counts[l.category] || 0) + 1;
    });

    return [
      { id: 'All', label: 'All London Rooms', count: listings.length },
      {
        id: 'Greenwich',
        label: 'Greenwich & Deptford',
        count: (counts['Greenwich'] || 0) + (counts['Colindale'] || 0),
      },
      {
        id: 'Cricklewood',
        label: 'Cricklewood & Willesden',
        count: counts['Cricklewood'] || 0,
      },
      { id: 'Hendon', label: 'Hendon & Middlesex', count: counts['Hendon'] || 0 },
      { id: 'Eltham', label: 'Eltham & SE London', count: counts['Eltham'] || 0 },
      {
        id: 'Any Location',
        label: 'Custom Campus Search',
        count: counts['Any Location'] || 0,
      },
    ].filter((c) => c.id === 'All' || c.count > 0);
  }, [listings]);

  // ── Filtering ──────────────────────────────
  const filteredLocations = useMemo(() => {
    if (selectedCategory === 'All') return listings;
    if (selectedCategory === 'Greenwich') {
      return listings.filter(
        (loc) => loc.category === 'Greenwich' || loc.category === 'Colindale'
      );
    }
    return listings.filter((loc) => loc.category === selectedCategory);
  }, [listings, selectedCategory]);

  // Reset pagination when tab changes
  useEffect(() => {
    setVisibleCount(4);
  }, [selectedCategory]);

  const visibleLocations = filteredLocations.slice(0, visibleCount);
  const hasMore = visibleCount < filteredLocations.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // ── Handlers ───────────────────────────────
  const handleViewRoom = (loc) => {
    if (loc.slug) {
      router.push(`/listings/${loc.slug}`);
    } else {
      console.warn('Listing has no slug:', loc);
    }
  };

  const handleEnquire = (loc) => {
    setEnquiryRoomTitle(loc?.title || '');
    setEnquirySuccess(true);
  };

  // ── Render ─────────────────────────────────
  return (
    <div className="w-full bg-[#FAF8F5] text-slate-900 font-sans min-h-screen">
      <section
        id="locations-section"
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-200/80"
      >
        {/* Section Headings */}
        <div className="space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
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

        {/* Sidebar + Main Grid */}
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Left Vertical Navigation */}
          <div className="lg:col-span-4 bg-slate-50/80 border-r border-slate-200/80 p-4 sm:p-6 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 pb-2">
              Select London Area
            </div>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-md border border-slate-800'
                      : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-orange-500 animate-pulse' : 'bg-slate-300'
                      }`}
                    />
                    <span>{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.count}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive
                          ? 'text-orange-400 translate-x-1'
                          : 'text-slate-400 group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-8 p-4 sm:p-6 lg:p-8 space-y-6 bg-slate-50/30 flex flex-col justify-between">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <h4 className="text-xl font-black text-slate-900">
                  {selectedCategory === 'All'
                    ? 'All Available London Rooms'
                    : `Rooms in ${selectedCategory}`}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Direct landlord verified listings • All utility bills included
                </p>
              </div>
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
                {filteredLocations.length} Properties Available
              </span>
            </div>

            {/* Loading / Error / Empty / Cards */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((i) => (
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
            ) : filteredLocations.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <p className="font-bold text-lg">No rooms found in this area</p>
                <p className="text-sm mt-1">
                  Try another London area or check back later.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {visibleLocations.map((loc) => (
                    <RoomCard
                      key={loc.id}
                      loc={loc}
                      onEnquire={() => handleEnquire(loc)}
                      onView={() => handleViewRoom(loc)}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={handleShowMore}
                      className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-6 py-3 rounded-xl border border-slate-300 transition-all shadow-sm flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-orange-600" />
                      <span>Show More</span>
                      <span className="text-xs text-slate-500 font-medium">
                        (+{Math.min(4, filteredLocations.length - visibleCount)} more)
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Footer */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>
                  Showing {visibleLocations.length} of {filteredLocations.length}{' '}
                  verified listings
                </span>
              </div>
              <a
                href={GBP_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-orange-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>Read GBP Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP ENQUIRY DIALOG */}
      {enquirySuccess && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative border border-slate-200">
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