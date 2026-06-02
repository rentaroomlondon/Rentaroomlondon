import React from "react";
import { MapPin, Train, GraduationCap, Building2, Store, Landmark } from "lucide-react";

const PlumsteadSpotlight = () => {
  const highlights = [
    { icon: <Train size={20} />, text: "Zone 3/4 — Woolwich Elizabeth line to Canary Wharf in 14 minutes" },
    { icon: <Train size={20} />, text: "Southeastern rail at Plumstead station — direct to Cannon Street & Charing Cross" },
    { icon: <MapPin size={20} />, text: "Lower rents than neighbouring Woolwich, Greenwich and Abbey Wood" },
    { icon: <GraduationCap size={20} />, text: "Plumstead Common, Bostall Woods and Crossness Nature Reserve nearby" },
    { icon: <Store size={20} />, text: "Thriving multicultural high street with strong local amenities" },
    { icon: <Landmark size={20} />, text: "Woolwich Arsenal retail and leisure quarter under 10 minutes away" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Rent a Room in <span className="text-[#FF6B35] italic">Plumstead SE18 — Zone 3/4</span>
                <span className=" "> With Elizabeth Line on Your Doorstep</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                Plumstead SE18 is one of South East London's most strategically positioned postcodes for renters who want city reach without central London costs. The Woolwich Elizabeth line — a short bus ride or brisk walk away — connects residents directly to Canary Wharf, Bond Street, Paddington, and Heathrow, placing Plumstead firmly in the orbit of London's most in-demand destinations. Meanwhile, Plumstead station on the Southeastern network provides direct services to Cannon Street and Charing Cross for City workers.
              </p>
              <p>
                Beyond the commute, SE18 rewards daily life. Plumstead Common offers open green space minutes from the front door, Bostall Woods provides longer walking routes through ancient woodland, and the multicultural Plumstead High Street delivers authentic food, independent shops, and a genuine sense of neighbourhood. With Woolwich's rapidly developing waterfront and retail quarter just 0.8 miles away, tenants here enjoy both residential calm and urban energy — a balance rarely available at this price point in London.
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
                  Superb connectivity. Community feel. Real London value.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlumsteadSpotlight;