"use client";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const areas = [
  {
    name: "Shoreditch",
    postcode: "E1",
    rooms: 34,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Marylebone",
    postcode: "W1",
    rooms: 28,
    image:
      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Canary Wharf",
    postcode: "E14",
    rooms: 41,
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Dalston",
    postcode: "E8",
    rooms: 19,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Greenwich",
    postcode: "SE10",
    rooms: 22,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Stratford",
    postcode: "E15",
    rooms: 37,
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Hoxton",
    postcode: "N1",
    rooms: 15,
    image:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Mile End",
    postcode: "E3",
    rooms: 26,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
];


export default function AreaGuides() {
  
  const router = useRouter();

  const handleAreaClick = (area) => {
    const query = new URLSearchParams({
      search: area.postcode, // ✅ use postcode
      label: area.name,      // optional (for UI)
    }).toString();

    router.push(`/find-a-room?${query}`);
  };
  return (
    <section className="bg-[#FFFFFF] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-left sm:text-center mb-10 sm:mb-14">
          <h2 className="text-[28px] sm:text-[48px] font-black leading-none tracking-[-0.55px] text-[#0F253B]">
            Area <span className="text-[#F47C3C]">Guides</span>
          </h2>

          <p className="mt-2 sm:mt-4 text-[14px] sm:text-[16.5px] text-[#888888] sm:max-w-140 sm:mx-auto">
            Click any neighbourhood to find available rooms nearby.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {areas.map((area, index) => (
            <div
              key={index}
              onClick={() => handleAreaClick(area)}
              className="relative h-42.5 sm:h-105 rounded-[14px] sm:rounded-[18px] overflow-hidden group cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}
              <img
                src={area.image}
                alt={area.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

              {/* Content */}
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 text-white transition-all duration-300 group-hover:-translate-y-1.25">

                {/* Pin */}
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#F47C3C] flex items-center justify-center mb-1 sm:mb-2 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <MapPin size={14} className="inline" />
                </div>

                <h3 className="text-[14px] sm:text-[18px] font-semibold leading-tight">
                  {area.name}
                </h3>

                <p className="text-[11px] sm:text-[13px] text-gray-300">
                  {area.rooms} rooms
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 sm:hidden">
          <button className="w-full border border-[#0F253B] text-[#0F253B] py-3 rounded-xl font-semibold tracking-wide hover:bg-[#0F253B] hover:text-white transition">
            VIEW ALL AREAS
          </button>
        </div>

      </div>
    </section>
  );
}