"use client";
import React, { useState } from "react"; // Added useState import
import PropertyCardSkeleton from "@/app/find-a-room/components/PropertyCardSkeleton";
import PropertyCard from "@/app/find-a-room/components/PropertyCard";

const PropertiesSection = () => {
  // These are the states you will update when you add your "fetch" logic later
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  return (
    <section className="py-20 px-5 md:px-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[3px]">
              Available Rooms
            </h3>
            <h2 className="text-[32px] md:text-[42px] font-semibold text-[#1A2332] font-playfair">
              List of Rental Rooms in South Tottenham, N15
            </h2>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? ( // Changed from isLoading to loading
            // Show skeletons while data is being fetched
            Array.from({ length: 4 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))
          ) : rooms && rooms.length > 0 ? ( // Changed from listings to rooms
            // Render actual properties
            rooms.map((item) => (
              <PropertyCard key={item._id} data={item} />
            ))
          ) : (
            // Fallback UI if no listings found
            <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200">
              <div className="mb-4 text-4xl">🏘️</div>
              <p className="text-[#1A2332] font-semibold">No rooms currently listed.</p>
              <p className="text-gray-500 text-sm">Please check back later for new properties in Cricklewood.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default PropertiesSection;