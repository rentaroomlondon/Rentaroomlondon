"use client"
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Building2, Train } from "lucide-react";

const LocationDirectory = () => {
  const [activeTab, setActiveTab] = useState("Rental Rooms Available in North West");

  const locations = {
    "Rental Rooms Available in North West": [
      {
        pc: "NW2",
        areas: "Cricklewood, Dollis Hill, Neasden",
        desc: "Well-connected with shopping at Brent Cross.",
        href: "/rental-rooms-students-cricklewood-uk",
      },
      {
        pc: "NW4",
        areas: "Hendon, Brent Cross",
        desc: "Close to Middlesex University, ideal for students.",
        href: "/cheap-rental-rooms-hendon-nw4-london",
      },
      {
        pc: "NW6",
        areas: "Kilburn, West Hampstead",
        desc: "Popular with young professionals, Jubilee line access.",
        href: "/rooms-rental-nw6-west-hampstead-london",
      },
      {
        pc: "NW9",
        areas: "Colindale, Kingsbury",
        desc: "Residential area with easy access to universities.",
        href: "/shared-rental-rooms-kingsbury-london-nw9",
      },
      {
        pc: "NW10",
        areas: "Harlesden, Willesden",
        desc: "Affordable housing with strong central London links.",
        href: "/rooms-rent-harlesden-nw10-bills-included",
      },
    ],
    "Rental Rooms Available in North & East": [
      {
        pc: "N15",
        areas: "Seven Sisters, Tottenham",
        desc: "Lively multicultural area, close to transport hubs.",
        href: "/Spare-rooms-rent-south-tottenham-n15-london",
      },
      {
        pc: "E10",
        areas: "Leyton",
        desc: "Near Stratford and Olympic Park, great for city workers.",
        href: "/rent-single-double-rooms-leyton-e10-london",
      },
      {
        pc: "E6",
        areas: "East Ham, Beckton",
        desc: "Affordable East London location, good connections.",
        href: "/east-ham-e6-properties-rent-bills-included",
      },
    ],
    "Rental Rooms Available in South East": [
      {
        pc: "SE18",
        areas: "Woolwich, Plumstead",
        desc: "Historic riverside area via the Elizabeth Line.",
        href: "/affordable-rental-rooms-se18-plumstead-bills-included",
      },
      {
        pc: "SE9",
        areas: "Eltham, Mottingham",
        desc: "Green suburban setting, easy central commute.",
        href: "/rental-rooms-eltham-london-se9-bills-included",
      },
      {
        pc: "SE10",
        areas: "Greenwich",
        desc: "Close to Greenwich University and cultural attractions.",
        href: "/best-rental-rooms-greenwich-university-se10-london",
      },
    ],
    "Rental Rooms Available in South West & Birmingham": [
      {
        pc: "SW9",
        areas: "Brixton, Stockwell",
        desc: "Vibrant nightlife with Victoria line access.",
        href: "/stockwell-sw9-student-housing-bills-included",
      },
      {
        pc: "B24",
        areas: "Erdington, Birmingham",
        desc: "Quick access to Birmingham city centre.",
        href: "/birmingham-city-centre-student-housing-bills-included",
      },
    ],
  };

  return (
    <section className="py-24 px-5 md:px-12 bg-[#1A2332] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[4px] mb-4">
            Coverage Map
          </h3>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-white font-playfair">
            Rental Rooms Available in <br className="hidden md:block" />
            <span className="text-[#FF6B35] italic">Different Locations in the UK</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: Region Selector */}
          <div className="w-full lg:w-1/3 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
            {Object.keys(locations).map((region) => (
              <button
                key={region}
                onClick={() => setActiveTab(region)}
                className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal text-left ${
                  activeTab === region
                    ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B3533]"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <span className="font-bold tracking-wide">{region}</span>
                <ChevronRight
                  className={`hidden lg:block transition-transform ${
                    activeTab === region ? "rotate-90 lg:rotate-0" : ""
                  }`}
                  size={18}
                />
              </button>
            ))}
          </div>

          {/* Right Side: Area Details */}
          <div className="w-full lg:w-2/3">
            <div className="relative pl-8 md:pl-12 border-l-2 border-white/10 space-y-10">
              {locations[activeTab].map((loc, idx) => (
                <div key={idx} className="relative group">
                  {/* Station Dot */}
                  <div className="absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 rounded-full border-4 border-[#1A2332] bg-white group-hover:bg-[#FF6B35] transition-colors" />

                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-white/5 p-6 rounded-[24px] group-hover:bg-white/10 transition-all border border-transparent group-hover:border-white/10">
                    <div className="flex-shrink-0">
                      <span className="inline-block bg-[#FF6B351A] text-[#FF6B35] px-4 py-2 rounded-lg font-bold text-lg">
                        {loc.pc}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <h4 className="text-white font-bold text-xl mb-1 flex items-center gap-2">
                        {loc.areas}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {loc.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex gap-4 text-white/20">
                        <Building2 size={20} />
                        <Train size={20} />
                      </div>
                      <Link
                        href={loc.href}
                        className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                      >
                        Room Availablee
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDirectory;