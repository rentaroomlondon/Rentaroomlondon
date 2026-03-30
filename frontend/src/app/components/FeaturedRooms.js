"use client"
import React, { useEffect, useState } from "react";
import PropertyCard from "../Shared/PropertyCard";
import PropertyCardSkeleton from "../Shared/PropertyCardSkeleton";

const FeaturedRooms = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Custom Fetch (inside same file)
  const apiFetch = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "API Error");
      }

      return data;
    } catch (error) {
      console.error("Fetch Error:", error.message);
      throw error;
    }
  };

  // 🔥 Fetch Featured Listings
  const fetchFeatured = async () => {
    try {
      const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/featured`);

      const formatted = res.listings.map((item) => ({
        id: item._id,
        listingId: item.listingId,
        slug: item.slug,
        // 🔹 BASIC
        title: item.title,
        description: item.description || "No description available",

        // 🔹 LOCATION
        location: `${item.location?.address || ""}, ${item.location?.postcode || ""}`,

        // 🔹 PRICE (monthly → weekly)
        price: item.monthlyPrice
          ? `£${(item.monthlyPrice)}`
          : "N/A",

        // 🔹 AVAILABILITY
        availability: item.availableImmediately
          ? "Available NOW"
          : item.availableFrom
          ? `From ${new Date(item.availableFrom).toLocaleDateString()}`
          : "Check availability",

        // 🔹 IMAGE
        imageUrl:
          item.images?.[0] ||
          "https://via.placeholder.com/400x300?text=No+Image",
      }));

      setProperties(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <section className="bg-[#F47C3C0D] md:py-20 py-10">
      <div className="max-w-[1280px] mx-auto px-4">

        {/* Header */}
        <div className="text-left lg:text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0F253B] mb-3">
            Featured <span className="text-[#F47C3C]">Rooms</span>
          </h2>
          <p className="text-gray-500">
            A selection of our latest available properties across London
          </p>
        </div>

        {/* 🔄 Skeleton Loading */}
        {loading && (
          <>
            {/* 📱 Mobile Skeleton Slider */}
            <div className="flex gap-3 overflow-x-scroll lg:hidden pb-6 pr-4 no-scrollbar">
              {Array(4)
                .fill()
                .map((_, i) => (
                  <div key={i} className=" snap-start flex-shrink-0 w-[380px]">
                    <PropertyCardSkeleton />
                  </div>
                ))}
            </div>

            {/* 💻 Desktop Skeleton Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {Array(3)
                .fill()
                .map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
            </div>
          </>
        )}

        {/* ❌ Empty */}
        {!loading && properties.length === 0 && (
          <div className="text-center text-gray-500">
            No featured listings available
          </div>
        )}

        {/* 📱 Mobile Slider */}
        {!loading && properties.length > 0 && (
          <div className="flex gap-4 overflow-x-scroll snap-x snap-mandatory lg:hidden pb-6 pr-4 no-scrollbar">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="flex-shrink-0"
              >
                <PropertyCard {...prop} />
              </div>
            ))}
          </div>
        )}

        {/* 💻 Desktop Grid */}
        {!loading && properties.length > 0 && (
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedRooms;