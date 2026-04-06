"use client"
import React, { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "../utils/useWishlist";

const PropertyCard = ({
  id,
  slug,
  listingId,
  title,
  location,
  price,
  availability,
  description,
  imageUrl,
}) => {
  const shortDescription = description.split(" ").slice(0, 5).join(" ") + "...";

  const { isSaved, toggleWishlist, isLoaded } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      id,
      slug,
      listingId,
      title,
      location,
      price,
      availability,
      description,
      imageUrl,
    });
  };
  
  return (
    <Link href={`/listings/${slug}`} className="block group">
      {/* Container: Mobile (rounded-3xl) vs Desktop (max-w-380, rounded-2xl) */}
      <div className="w-full max-w-[320px] lg:max-w-105 bg-white rounded-[20px] lg:rounded-2xl overflow-hidden shadow-sm lg:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 lg:hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 lg:border-none">
        
        {/* IMAGE SECTION */}
        <div className="relative h-60 lg:h-67.5 w-full overflow-hidden">
           {/* Skeleton Loader (Airbnb style) */}
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
            )}

            {/* Image */}
            <img
              src={imageUrl}
              alt={title}
              loading="eager"          // 🔥 load immediately
              fetchPriority="high"     // 🔥 boost LCP (very important)
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

          {/* Desktop Badge (Top Left) */}
          <div className="hidden lg:block absolute top-4 left-4 bg-[#0a1e35]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-sm text-xs font-bold tracking-wider">
            {availability}
          </div>

          {/* Mobile Badges (Screenshot Style) */}
          <div className="lg:hidden absolute top-3 left-3 bg-[#f38240] text-white px-4 py-1.5 rounded-lg font-bold text-[11px]">
            {price} PM
          </div>
          <div className="lg:hidden absolute top-3 right-3 bg-[#22c55e] text-white px-4 py-1.5 rounded-lg font-bold text-[10px]">
            NOW
          </div>

          {/* Desktop Price Badge (Top Right) */}
          <div className="hidden lg:block absolute top-4 right-4 bg-[#ff8c42] text-white p-3 rounded-lg text-center min-w-22.5 shadow-lg">
            <div className="text-lg font-bold leading-none">{price} PM</div>
            <div className="text-[10px] mt-1 opacity-90 font-medium">Tenancy Info</div>
          </div>

          {/* Heart Button: Mobile (White/Floating) vs Desktop (Dark/Bottom) */}
          <button
            onClick={handleSave}
            type="button"
            className={`absolute right-4 bottom-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all
              ${
                isLoaded && isSaved(id)
                  ? "bg-white lg:bg-[#0a2540]"
                  : "bg-white text-[#1e3a5f] lg:bg-[#0a2540] lg:text-white"
              }`}
          >
            <Heart
              size={20}
              className={`transition-all
                ${
                  isLoaded && isSaved(id)
                    ? "fill-[#1e3a5f] text-[#1e3a5f] lg:fill-white lg:text-white scale-110"
                    : "fill-transparent"
                }
              `}
            />
          </button>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-5 lg:p-6">
          {/* Desktop Only ID Header */}
          <div className="hidden lg:flex items-center gap-1.5 mb-2">
            <span className="text-xs text-[#888888] font-medium uppercase tracking-tight">
              {listingId} —
            </span>
            <span className="text-xs text-[#ff8c42] font-bold">Tenancy Info</span>
          </div>

          {/* Title: Darker on mobile per screenshot */}
          <h2 className="text-[#1e3a5f] lg:text-[#2c3e50] text-sm lg:text-lg font-bold leading-tight mb-1">
            {title}
          </h2>

          {/* Location: Red Pin on Mobile vs Gray text on Desktop */}
          <div className="flex items-center gap-1 mb-4 lg:mb-4">
            <span className="lg:hidden text-red-500 text-sm">📍</span>
            <p className="text-[#6B7280] lg:text-gray-400 text-[12px]">{location}</p>
          </div>

          {/* Mobile Bottom Row (Price + Info) */}
          <div className="lg:hidden flex items-center justify-between mt-0">
            <div className="flex items-baseline gap-1">
              <span className="text-[#F47C3C] text-lg font-bold">{price}</span>
              <span className="text-gray-400 text-[10px]">pm</span>
            </div>
            <div className="flex items-center gap-1 text-[#1e3a5f] font-bold text-sm">
              Info <span className="text-sm"><ArrowRight size={20} /></span>
            </div>
          </div>

          {/* Desktop Only Description & Availability */}
          <div className="hidden lg:block">
            <div className="text-[#0F253B] font-semibold text-base mb-3">
              {availability}
            </div>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              {shortDescription}
              <button type="button" aria-label={`Read more about ${title}`} className="ml-1 text-[#ff8c42] font-bold text-sm tracking-wide hover:underline">
                READ MORE
              </button>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;