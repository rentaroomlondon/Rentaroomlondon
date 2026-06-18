import React from "react";
import { MapPin, Train, GraduationCap, Building2, Trees, CirclePercent } from "lucide-react";

const LeytonSpotlight = () => {
  const highlights = [
    { icon: <MapPin size={20} />, text: "Zone 3 — Central line direct to Bank, St Paul's, and Oxford Circus" },
    { icon: <Train size={20} />, text: "Stratford one stop away — Elizabeth line, DLR, national rail, and Eurostar interchange" },
    { icon: <GraduationCap size={20} />, text: "University of East London (Royal Docks campus) under 15 minutes via Central line" },
    { icon: <Building2 size={20} />, text: "Queen Elizabeth Olympic Park — world-class sport and leisure facilities on the doorstep" },
    { icon: <Trees size={20} />, text: "Leyton Flats and Wanstead Flats form one of East London's largest open green spaces" },
    { icon: <CirclePercent size={20} />, text: "Rents consistently below Stratford, Hackney, and Bethnal Green equivalents" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Rent a Single or Double Room in <span className="text-[#FF6B35] italic">Leyton, E10</span>
                <span className="block mt-2">With Bills Included</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                Leyton has quietly become one of East London's most sought-after rental locations. The Central line connects residents directly to the City and West End, with Oxford Circus reachable in under 25 minutes. One stop east sits Stratford — gateway to the Elizabeth line, the DLR, and international rail — meaning Leyton tenants enjoy extraordinary connectivity without paying Stratford's premium.
              </p>
              <p>
                The Queen Elizabeth Olympic Park, Westfield Stratford City, and Leyton's own celebrated Francis Road café strip make this a neighbourhood with genuine lifestyle appeal. Students from UEL, Queen Mary, and London Metropolitan have long favoured E10 for its value-to-commute ratio, and demand from young professionals has risen sharply as Waltham Forest's regeneration has gathered pace.
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
                  Unbeatable Central line access. Olympic legacy location. Below-market rents.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeytonSpotlight;