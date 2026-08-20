"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PropertiesSection = () => {

  // East London accommodations breakdown with name and postcode search query
  const areaAccommodations = [
    {
      title: "Rooms to Rent in South Tottenham (N15)",
      name: "South Tottenham",
      description:
        "South Tottenham sits between Seven Sisters and Tottenham Hale, giving direct Victoria line access into King's Cross in under 20 minutes. A diverse high street along West Green Road and the ongoing Tottenham Hotspur Stadium regeneration make it a strong-value pick for students and young professionals.",
      searchQuery: "N15",
    },
    {
      title: "Rooms to Rent in Leyton (E10)",
      name: "Leyton",
      description:
        "One Central line stop from Stratford, Leyton pairs fast transport with genuine green space at Leyton Jubilee Park and the Marsh. It's a popular choice for renters who want Stratford's connectivity without Stratford's price tag.",
      searchQuery: "E10",
    },
    {
      title: "Rooms to Rent in East Ham (E6)",
      name: "East Ham",
      description:
        "Served by both the District and Hammersmith & City lines, East Ham offers some of East London's lowest rents alongside easy access to London City Airport, the Royal Docks, and Queen's Market for daily shopping.",
      searchQuery: "E6",
    },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Area Breakdown Content (H3 section) */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[3px]">
              East London Accommodations We Cover
            </h3>
            <h2 className="text-[32px] md:text-[42px] font-semibold text-[#1A2332] font-playfair">
              Explore Neighborhoods Across East London
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {areaAccommodations.map((area, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <h4 className="text-[20px] font-semibold text-[#1A2332] font-playfair">
                    {area.title}
                  </h4>
                  <p className="text-gray-600 text-[15px] font-light leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <Link
                  href={`/find-a-room?search=${encodeURIComponent(area.searchQuery)}`}
                  className="inline-flex items-center gap-2 text-[#FF6B35] font-semibold text-sm hover:translate-x-1 transition-transform"
                >
                  View Rooms in {area.name} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PropertiesSection;