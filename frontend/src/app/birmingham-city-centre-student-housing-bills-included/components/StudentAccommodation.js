import React from "react";
import { Bus, Wallet, Map, TreePine } from "lucide-react";

const StudentAccommodation = () => {
  const stats = [
    {
      label: "Commute",
      value: "8–20 mins",
      description: "West Midlands Metro tram, local rail & bus network to all campuses",
      icon: <Bus size={20} />,
    },
    {
      label: "Affordability",
      value: "Highly Competitive Rates",
      description: "Among the UK's most competitive rates for city-centre student living",
      icon: <Wallet size={20} />,
    },
    {
      label: "Connectivity",
      value: "City Centre",
      description: "City centre location — Metro + Bus + 3 main rail stations",
      icon: <Map size={20} />,
    },
    {
      label: "Parks",
      value: "Cannon Hill Park",
      description: "Birmingham's most popular park — 15 min tram or bus",
      icon: <TreePine size={20} />,
    },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-3/5 space-y-8">
            <div className="inline-block bg-[#F47C3C15] px-4 py-2 rounded-lg">
              <span className="text-[#FF6B35] font-bold text-xs uppercase tracking-widest">
                University Life
              </span>
            </div>
            
            <h2 className="text-[32px] md:text-[44px] font-semibold text-[#1A2332] font-playfair leading-tight">
              Student Accommodation near Universities — Birmingham City Centre{" "}
              <span className="text-[#FF6B35] italic">With Bills Included</span>
            </h2>

            <div className="space-y-6 text-[#6B7280] text-[17px] md:text-[18px] leading-relaxed">
              <p>
                For students across the UK seeking affordable city-centre accommodation, Birmingham stands out as one of the best-value major student cities in the country. Home to five universities within the city and its immediate surroundings, Birmingham's city centre postcodes place students within easy reach of every campus — while offering rents that are significantly lower than London, Manchester, or Edinburgh.
              </p>

              <p className="bg-[#FAF5F0] p-6 rounded-2xl border-l-4 border-[#FF6B35] italic text-[#1A2332] font-medium">
                "Students searching for affordable student accommodation with bills included in Birmingham choose the city for its unbeatable combination of low cost of living, excellent university choice, world-class amenities, and a young, culturally diverse population that makes student life here genuinely exciting."
              </p>
            </div>
          </div>

          {/* Right Side: Quick Fact Cards */}
          <div className="w-full lg:w-2/5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group relative p-6 bg-white border border-[#E8E4DF] rounded-2xl flex items-center gap-5 overflow-hidden transition-all duration-500 hover:border-[#FF6B35]"
                >
                  {/* Full Orange Background on Hover */}
                  <div className="absolute inset-0 bg-[#FF6B35] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

                  {/* Icon Container */}
                  <div className="relative z-10 bg-[#FAF5F0] p-4 rounded-xl text-[#FF6B35] group-hover:bg-white/20 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    {stat.icon}
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 transition-colors duration-300">
                    <h4 className="text-[12px] uppercase tracking-tighter text-gray-400 font-bold group-hover:text-orange-100 transition-colors">
                      {stat.label}
                    </h4>
                    <div className="text-[#1A2332] font-bold text-lg group-hover:text-white transition-colors">
                      {stat.value}
                    </div>
                    <p className="text-gray-500 text-sm group-hover:text-white/90 transition-colors mt-0.5 leading-snug">
                      {stat.description}
                    </p>
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

export default StudentAccommodation;