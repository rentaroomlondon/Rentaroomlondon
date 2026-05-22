import React from "react";
import { MapPin, Train, GraduationCap, Building2 } from "lucide-react";

const CricklewoodSpotlight = () => {
  const highlights = [
    { icon: <MapPin size={20} />, text: "Zone 4 — Direct Jubilee line access" },
    { icon: <Train size={20} />, text: "Fast links to Canary Wharf, Wembley & West End" },
    { icon: <GraduationCap size={20} />, text: "Proximity to University of Westminster (Harrow)" },
    { icon: <Building2 size={20} />, text: "Quiet residential feel with strong community" },
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
                Rent a Room in <span className="text-[#FF6B35] italic">Kingsbury, UK</span>
                <span className="block mt-2">With Bills Included</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                Kingsbury is a well-established residential neighbourhood in North West London, located in Zone 4 with direct Jubilee line access to Wembley Park, London Bridge, and Canary Wharf. Its close proximity to the University of Westminster (Harrow), Middlesex University, and Wembley's growing employment hub makes it a sought-after destination for students and working professionals alike.
              </p>
              <p>
                Landlords find Kingsbury highly rewarding — a strong South Asian and diverse community, consistent demand for well-maintained rooms, and some of the most competitively priced HMOs in North West London. Great for families and single professionals seeking a quieter base with excellent tube access.
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
                  Higher demand. Better connectivity. Premium rooms.
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