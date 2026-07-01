"use client";
import Link from "next/link";
import React from "react";

export default function AffordableDoubleRooms() {
  // Sample data for Google Business Profile Reviews
  const reviews = [
    {
      id: 1,
      author: "Sarah Jenkins",
      date: "2 weeks ago",
      rating: 5,
      text: "Rented a double room in Cricklewood. Zero broker fees saved me hundreds upfront. The room was exactly as pictured and the landlord has been great!"
    },
    {
      id: 2,
      author: "David Kovacs",
      date: "1 month ago",
      rating: 5,
      text: "Extremely transparent pricing. All bills were included, so I know exactly what I am paying each month. Highly recommend if you are moving to London."
    }
  ];

  // Comprehensive Regional Directory Dataset serving as the core layout source
  const regionalDirectory = [
    {
      title: "North West London",
      tagline: "Excellent connectivity & spacious residential layouts",
      links: [
        { label: "All NW London", href: "#" },
        { label: "Cricklewood", href: "/rental-rooms-students-cricklewood-uk" },
        { label: "Harlesden", href: "/rooms-rent-harlesden-nw10-bills-included" },
        { label: "Kingsbury", href: "/shared-rental-rooms-kingsbury-london-nw9" },
        { label: "West Hampstead", href: "/rooms-rental-nw6-west-hampstead-london" },
        { label: "Hendon", href: "/cheap-rental-rooms-hendon-nw4-london" },
      ],
    },
    {
      title: "South East London",
      tagline: "Bustling cultural hubs & exceptional student communities",
      links: [
        { label: "All SE London", href: "#" },
        { label: "Plumstead", href: "/affordable-rental-rooms-se18-plumstead-bills-included" },
        { label: "Eltham", href: "/rental-rooms-eltham-london-se9-bills-included" },
        { label: "Greenwich", href: "/best-rental-rooms-greenwich-university-se10-london" },
        { label: "Stockwell", href: "/stockwell-sw9-student-housing-bills-included" },
      ],
    },
    {
      title: "East London",
      tagline: "Vibrant high streets, arts, & seamless transit points",
      links: [
        { label: "All East London", href: "#" },
        { label: "South Tottenham", href: "/Spare-rooms-rent-south-tottenham-n15-london" },
        { label: "Leyton", href: "/rent-single-double-rooms-leyton-e10-london" },
        { label: "East Ham", href: "/east-ham-e6-properties-rent-bills-included" },
      ],
    },
    {
      title: "Out of London",
      tagline: "Premium regional student housing & central developments",
      links: [
        { label: "All out of London", href: "#" },
        { label: "Birmingham", href: "/birmingham-city-centre-student-housing-bills-included" },
      ],
    },
  ];

  return (
    <div className="bg-[#0B111E] text-slate-100 font-sans antialiased min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <header className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-gray-800 bg-gradient-to-b from-[#111827] to-[#0B111E] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold uppercase tracking-wider rounded-full">
              ⚡ Verified Double Rooms
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white">
              Affordable Double Rooms <br />
              <span className="text-[#FF6B35]">In London, Made Simple</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Skip the agency commissions and hidden markups. Discover fully furnished, spacious double rooms rented directly from trusted landlords across London's most desirable communities.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-900/60 border border-gray-800 px-4 py-2 rounded-xl">
                <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fully Furnished
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-900/60 border border-gray-800 px-4 py-2 rounded-xl">
                <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bills Included Options
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-900/60 border border-gray-800 px-4 py-2 rounded-xl">
                <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Zero Agent Fees
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- REFACTORED UNIQUE LOCATION MATRIX SECTION --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <span className="text-[#FF6B35] font-bold text-xs uppercase tracking-[3px] block">Prime Flatshare Matrix</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Explore Double Rooms By Region</h2>
          <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
            Select an area below to view dedicated double room opportunities. All locations feature seamless transit access, modern furnishings, and absolute direct-to-landlord contracts.
          </p>
        </div>

        {/* Unified, Conversion-Oriented Regional Cards Grid Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {regionalDirectory.map((region, index) => (
            <div 
              key={index} 
              className="bg-[#111827]/30 border border-gray-800/80 p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-gray-700/60 transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-md border border-[#FF6B35]/20">
                    {region.links.filter(l => !l.label.startsWith("All")).length} Active Hubs
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    REG-0{index + 1}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B35] transition-colors">
                    {region.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    {region.tagline}
                  </p>
                </div>

                {/* Interactive Dynamic Link Stream */}
                <div className="pt-2">
                  <ul className="space-y-2.5">
                    {region.links.map((link, linkIdx) => {
                      const isMainHub = link.label.startsWith("All");
                      return (
                        <li key={linkIdx}>
                          <a
                            href={link.href}
                            className={`text-sm flex items-center justify-between group/link rounded-xl transition-all ${
                              isMainHub
                                ? "text-blue-400 font-semibold border border-blue-500/10 bg-blue-500/5 px-3 py-1.5 hover:bg-blue-500/10"
                                : "text-gray-400 hover:text-white py-0.5 px-1"
                            }`}
                          >
                            <span className="truncate">{link.label}</span>
                            <span className={`text-[10px] transform transition-transform duration-150 ${
                              isMainHub 
                                ? "opacity-100 translate-x-0" 
                                : "opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-[#FF6B35]"
                            }`}>
                              &rarr;
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-900 text-[11px] text-gray-500 flex items-center justify-between">
                <span>Verified Facilities</span>
                <span className="font-medium group-hover:text-gray-400 transition-colors">Direct Lease</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- GOOGLE BUSINESS PROFILE INTEGRATION BLOCK --- */}
      <section className="bg-[#111827]/40 border-y border-gray-800/60 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Local Business Trust Stat */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Highly Rated On Google Business Profile
            </h2>
            <p className="text-gray-400 leading-relaxed text-[15px]">
              We take pride in our direct-to-landlord rental model. Read verified reviews from tenants who successfully settled into their London flatshares without paying middleman markups.
            </p>
            
            <div className="pt-2">
              <a 
                href="https://share.google/bBoarwjkYkiRGGr3Y" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6B35] uppercase tracking-wider hover:underline"
              >
                View Official Business Listing 
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Mini Interactive Review Cards Feed */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-[#0B111E] border border-gray-800 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{rev.author}</h4>
                    <span className="text-[11px] text-gray-500">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium pt-1 border-t border-gray-900">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Verified Tenant Review
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- COMFORT FEATURES MATRIX --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-16">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-[#FF6B35] font-bold text-xs uppercase tracking-[3px] block">Standard Inclusion</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Everything You Expect, Included</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#111827]/20 border border-gray-800/60 p-8 rounded-2xl space-y-4 hover:border-gray-800 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-[#FF6B35] mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-bold text-white">Full Sized Double Bed</h3>
            <p className="text-gray-400 text-sm leading-relaxed">High-quality, comfortable orthopedic mattresses and under-bed smart storage space.</p>
          </div>

          <div className="bg-[#111827]/20 border border-gray-800/60 p-8 rounded-2xl space-y-4 hover:border-gray-800 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-[#FF6B35] mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-white">Business Grade WiFi</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Mesh WiFi network routing throughout the property for uninterrupted remote working.</p>
          </div>

          <div className="bg-[#111827]/20 border border-gray-800/60 p-8 rounded-2xl space-y-4 hover:border-gray-800 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-[#FF6B35] mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-white">Fixed Utility Cost</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Gas, electricity, council tax, water, and cleaning service completely managed in one sum.</p>
          </div>

          <div className="bg-[#111827]/20 border border-gray-800/60 p-8 rounded-2xl space-y-4 hover:border-gray-800 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-[#FF6B35] mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-white">Deposit Protection</h3>
            <p className="text-gray-400 text-sm leading-relaxed">All government-mandated deposit frameworks (DPS) fully verified and compliant.</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0B111E] to-[#060a12] text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 via-[#111827] to-gray-900 border border-gray-800 rounded-[32px] py-12 px-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B35]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to secure your double room?</h3>
            <p className="text-gray-400 max-w-md mx-auto text-sm">
              Our high-demand rooms fill up fast. Connect directly with an accommodation lead to discuss upcoming availability and contract terms today.
            </p>
            <div className="pt-2">
              <Link
                href="/find-a-room"
                className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e05621] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-md transition duration-200 cursor-pointer transform hover:scale-[1.01]"
              >
                Rent a Room
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}