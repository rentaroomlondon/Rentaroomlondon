"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PropertiesSection = () => {

  // North West London accommodations breakdown with name and postcode search query
  const areaAccommodations = [
    {
      title: "Rooms to Rent in Cricklewood (NW2)",
      name: "Cricklewood",
      description:
        "Zone 2/3, with direct Thameslink trains to St Pancras in around 15 minutes and 245/266 buses running straight to Middlesex University. Gladstone Park is a 10-minute walk away.",
      searchQuery: "NW2",
    },
    {
      title: "Rooms to Rent in Harlesden (NW10)",
      name: "Harlesden",
      description:
        "Well served by the Bakerloo line and London Overground, Harlesden offers competitively priced rooms with quick access into the West End and easy links across North West and West London.",
      searchQuery: "NW10",
    },
    {
      title: "Rooms to Rent in Kingsbury (NW9)",
      name: "Kingsbury",
      description:
        "On the Jubilee line, Kingsbury gives tenants a direct run into Central London and the West End, with Fryent Country Park providing genuine green space nearby.",
      searchQuery: "NW9",
    },
    {
      title: "Rooms to Rent in West Hampstead (NW6)",
      name: "West Hampstead",
      description:
        "A standout for connectivity — Overground, Jubilee line, and Thameslink all run through West Hampstead, alongside a lively high street of cafés, bars, and independent shops.",
      searchQuery: "NW6",
    },
    {
      title: "Rooms to Rent in Hendon (NW4)",
      name: "Hendon",
      description:
        "Home to Middlesex University's main campus, Hendon offers Northern line access plus Thameslink rail links, making it popular with students and university staff alike.",
      searchQuery: "NW4",
    },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Area Breakdown Content (H3 section) */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[3px]">
              North West London Accommodations We Cover
            </h3>
            <h2 className="text-[32px] md:text-[42px] font-semibold text-[#1A2332] font-playfair">
              Explore Neighborhoods Across North West London
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