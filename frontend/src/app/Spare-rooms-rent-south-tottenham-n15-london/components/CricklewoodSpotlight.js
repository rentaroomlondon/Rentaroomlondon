import React from "react";
import { MapPin, Train, ShieldAlert, GraduationCap, TreePine, TrendingUp } from "lucide-react";

const SouthTottenhamSpotlight = () => {
  const highlights = [
    { icon: <MapPin size={20} />, text: "Zone 3 — Victoria line & Gospel Oak–Barking Overground at Seven Sisters" },
    { icon: <Train size={20} />, text: "King's Cross St Pancras reachable in under 20 minutes via Victoria line" },
    { icon: <ShieldAlert size={20} />, text: "North Middlesex University Hospital under 2 miles away" },
    { icon: <GraduationCap size={20} />, text: "Proximity to Middlesex University (The Burroughs), UCL, and London Metropolitan" },
    { icon: <TreePine size={20} />, text: "Chestnuts Park and Lee Valley green corridor nearby for recreation" },
    { icon: <TrendingUp size={20} />, text: "Active regeneration zone — strong and rising rental demand in N15" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Rent a Single or Double Room in <span className="text-[#FF6B35] italic">South Tottenham, N15</span>
                <span className="block mt-2">With Bills Included</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                South Tottenham sits at the southern edge of Haringey, where Tottenham's ongoing regeneration meets some of North London's most reliable transport links. Seven Sisters station puts both the Victoria line and the Gospel Oak–Barking Overground within minutes of your door — connecting tenants to King's Cross in under 20 minutes, Canary Wharf via Stratford, and the Euston Road universities in a single tube ride.
              </p>
              <p>
                The area's proximity to North Middlesex University Hospital and Whittington Hospital makes it a practical choice for NHS staff, while students from UCL, Middlesex University, and London Metropolitan consistently find it one of the best-value Zone 3 options in North London. Regeneration investment around the High Road West scheme and the legacy of the Tottenham Hotspur Stadium development continues to lift the rental appeal of N15 year on year.
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
                    <div className="p-3 bg-[#FF6B351A] rounded-xl text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300 flex-shrink-0">
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
                  Competitive rents. Victoria line speed. Rapidly improving neighbourhood.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SouthTottenhamSpotlight;