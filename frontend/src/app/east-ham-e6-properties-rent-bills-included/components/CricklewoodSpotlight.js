import React from "react";
import { MapPin, Train, Heart, GraduationCap, TreePine, Utensils } from "lucide-react";

const EastHamSpotlight = () => {
  const highlights = [
    { icon: <MapPin size={20} />, text: "Zone 3–4 — District line direct to Monument, Tower Hill, and Earl's Court" },
    { icon: <Train size={20} />, text: "Forest Gate Elizabeth line under 1 mile — Paddington in 16 mins, Heathrow in 35" },
    { icon: <Heart size={20} />, text: "Newham University Hospital under 1.5 miles — ideal for NHS staff" },
    { icon: <GraduationCap size={20} />, text: "University of East London (Royal Docks) reachable in under 20 minutes" },
    { icon: <TreePine size={20} />, text: "Central Park E6 — 37-acre community park with lake, pitches, and woodland" },
    { icon: <Utensils size={20} />, text: "East Ham High Street — celebrated South Asian dining and retail destination" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Rent a Single or Double Room in <span className="text-[#FF6B35] italic">East Ham, E6</span>
                <span className="block mt-2">With Bills Included</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                East Ham sits in the heart of Newham — one of London's most dynamic and
                culturally diverse boroughs. The District line runs directly through East Ham
                station into the City and West End, while Forest Gate's Elizabeth line stop,
                less than a mile away, has dramatically cut journey times to Paddington,
                Heathrow, and the Canary Wharf corridor. East Ham is now, in every practical
                sense, a more connected postcode than its rental prices reflect.
              </p>
              <p>
                Newham University Hospital is under 1.5 miles away, making E6 a natural
                base for NHS staff. Students from UEL's Royal Docks campus and Newham College
                have long found East Ham the most practical affordable option in the borough.
                Central Park E6's boating lake and sports pitches, combined with East Ham High
                Street's extraordinary South Asian food scene, give the neighbourhood a quality
                of life that its rents simply do not advertise.
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
                  Elizabeth line connectivity. NHS proximity. Exceptional high street value.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EastHamSpotlight;