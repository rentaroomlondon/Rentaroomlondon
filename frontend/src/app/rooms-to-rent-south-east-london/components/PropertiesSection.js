"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PropertiesSection = () => {

  // South East London accommodations breakdown with name and postcode search query
  const areaAccommodations = [
    {
      title: "Rooms to Rent in Plumstead (SE18)",
      name: "Plumstead",
      description:
        "Served by National Rail into London Bridge and Cannon Street, Plumstead offers some of the area's most affordable rooms, with Oxleas Woodland close by for green space.",
      searchQuery: "SE18",
    },
    {
      title: "Rooms to Rent in Eltham (SE9)",
      name: "Eltham",
      description:
        "A well-established high street and National Rail links into London Bridge and Charing Cross make Eltham a solid, good-value choice for renters wanting a quieter residential base.",
      searchQuery: "SE9",
    },
    {
      title: "Rooms to Rent in Greenwich (SE10)",
      name: "Greenwich",
      description:
        "Home to the University of Greenwich, with DLR, National Rail, and riverboat access into Central London and Canary Wharf, plus Greenwich Park and the historic Maritime Quarter on your doorstep.",
      searchQuery: "SE10",
    },
    {
      title: "Rooms to Rent in Stockwell (SW9)",
      name: "Stockwell",
      description:
        "On the Victoria and Northern lines, Stockwell offers some of the fastest direct journeys into Central London and the West End of any area on this list.",
      searchQuery: "SW9",
    },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Area Breakdown Content (H3 section) */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[3px]">
              South East London Accommodations We Cover
            </h3>
            <h2 className="text-[32px] md:text-[42px] font-semibold text-[#1A2332] font-playfair">
              Explore Neighborhoods Across South East London
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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