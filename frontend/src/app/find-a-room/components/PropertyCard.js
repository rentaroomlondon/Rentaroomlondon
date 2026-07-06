"use client"
import React, { useState } from 'react';
import { Heart, ArrowRight, Check } from 'lucide-react';
import { useWishlist } from '@/app/utils/useWishlist';
import Link from 'next/link';

const PropertyCard = ({ data }) => {
   const { isSaved, toggleWishlist,isLoaded } = useWishlist();
   const [imageLoaded, setImageLoaded] = useState(false);

  // 🔥 Auto-generate tags from real DB fields
  const generatedTags = [
    data.roomType === "double" && "Double Room",
    data.roomType === "single" && "Single Room",
    data.roomType === "ensuite" && "Ensuite",
    data.roomType === "studio" && "Studio",
    data.roomType === "ensuite_double" && "Ensuite Double",
    data.occupancy === "single" && "Single Use",
    data.occupancy === "double" && "Double Use",
    data.furnished && "Furnished",
    data.bathroomType === "private" && "Private Bathroom",
    data.bathroomType === "shared" && "Shared Bathroom",
  ].filter(Boolean); // remove false/null

  const image = data.images?.[0] || "/placeholder.png";

  const shortDescription = data.description.split(" ").slice(0, 5).join(" ") + "...";


  const handleWishlist = (e) => {
    e.stopPropagation();  // ⛔ stops click from opening link
    e.preventDefault();   // ⛔ stops <Link> navigation
    toggleWishlist({
      id: data._id,
      title: data.title,
      price: data.monthlyPrice,
      image: data.images?.[0],
      address: data.location,
      slug: data.slug,
      listingId: data.listingId,
      availability: data.availableImmediately ? "Available Now" : "Check Availability",
      description: data.description,
    });
  };

  return (
    <div className="w-full bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image Container: Strict Fixed Width and Height */}
        <div className="relative w-full md:w-[300px] h-[240px] md:h-[280px] flex-shrink-0 overflow-hidden">
          {/* Airbnb Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="w-full h-full bg-gray-200" />
              <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          )}

          {/* Image: Now strictly contained */}
          <img
            src={image}
            alt={data.title}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "/placeholder.png";
              setImageLoaded(true);
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            }`}
          />

          {data.monthlyPrice && (
            <div className="absolute top-4 left-4 bg-[#FF7A45] text-white px-2.5 py-1.5 rounded-lg font-bold text-[11px] md:text-[12px] shadow-lg">
              £{data.monthlyPrice} PM
            </div>
          )}

          {data.availableImmediately && (
            <div className="block md:hidden absolute top-4 right-4 bg-[#22C55E] text-white px-3 py-1.5 rounded-lg font-bold text-[10px] tracking-wider uppercase">
              NOW
            </div>
          )}
        </div>

        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[#0F253B] md:text-[#1A2332] text-[15px] md:text-[16px] font-bold leading-tight mb-2">
              {data.title}
            </h3>

            <div className="flex items-start gap-1 text-gray-400 mb-4">
              📍
              <span className="text-xs md:text-[13px] font-normal text-[#6B7280]">
                {data.listingId && <span className="font-semibold mr-1">{data.listingId} ·</span>}
                {data.location?.address}, {data.location?.postcode}, {data.location?.city}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {generatedTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#FFF8F3] text-[#6B7280] px-2.5 py-1 rounded-full text-[11px] md:text-[12px] font-medium border border-orange-50/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="hidden md:block text-[#6B7280] text-[13px] leading-relaxed mb-6">
              {shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-[#FF6B35] text-xl font-bold">£{data.monthlyPrice}</span>
                <span className="text-[#6B7280] text-[10px]">per month</span>
              </div>

              {data.availableImmediately && (
                <div className="flex items-center gap-1 text-[#2ECC71] text-[12px] font-bold mt-0.5">
                  <Check className="w-3 h-3" /> Available Now
                </div>
              )}
            </div>

            <div className="flex gap-2">
  
              <button
                onClick={handleWishlist}
                className={`p-2.5 border rounded-xl transition-colors ${
                  isSaved(data._id) ? "border-gray-300 bg-gray-50" : "border-gray-100 hover:bg-gray-50"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isSaved(data._id) ? "text-gray-500 fill-gray-500" : "text-gray-500"
                  }`}
                />
              </button>
              <Link
                href={`/listings/${data.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#112233] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 text-xs"
              >
                View Room <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;