import React from "react";
import { MapPin, Train, GraduationCap, Building2 } from "lucide-react";

const CricklewoodSpotlight = () => {
  const highlights = [
    { icon: <MapPin size={20} />, text: "Zone 4 — Southeastern rail direct to London Bridge and Cannon Street" },
    { icon: <Train size={20} />, text: "London Bridge reachable in under 30 minutes" },
    { icon: <GraduationCap size={20} />, text: "Leafy, spacious and community-oriented neighbourhood" },
    { icon: <Building2 size={20} />, text: "Eltham Palace, Oxleas Woods and Avery Hill Park nearby" },
    { icon: <Building2 size={20} />, text: "Strong local amenities and growing independent businessesss" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              {/* Updated Heading: West Hampstead, UK on the first line */}
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Rent a Room in <span className="text-[#FF6B35] italic">Eltham Zone-4, SE9</span>
                <span className="block mt-2">With Bills Included</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                Eltham is one of south-east London's most undervalued rental postcodes — spacious, green, and consistently more affordable than neighbouring Greenwich and Blackheath. Direct Southeastern services make London Bridge and Cannon Street accessible in under 30 minutes, positioning SE9 as a genuinely practical base for City commuters who want space and greenery without sacrificing connectivity.
              </p>
              <p>
                With Eltham Palace, Oxleas Woods, and Avery Hill Park all within walking distance, the quality of life here extends well beyond the commute. Eltham continues to attract professionals, families, and students looking for a balanced, rooted lifestyle in outer south-east London.
              </p>
            </div>
          </div>

          {/* Right: Feature Highlights */}
          <div className="w-full lg:w-2/5 bg-[#243044] p-8 md:p-16 flex flex-col justify-center">
            <div className="space-y-6">
              <h4 className="text-white font-bold text-xl mb-4 border-b border-white/10 pb-4">
                Location Benefits
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="p-3 bg-[#FF6B351A] rounded-xl text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-white/80 font-medium text-sm md:text-base">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[#FF6B35] font-bold text-sm italic">
                  Spacious living. Green surroundings. Affordable rooms.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CricklewoodSpotlight;