import React from "react";
import { MapPin, Train, GraduationCap, Building2 } from "lucide-react";

const CricklewoodSpotlight = () => {
  const highlights = [
    { icon: <MapPin size={20} />, text: "Zone 3 — Northern line direct to City & King's Cross" },
    { icon: <Train size={20} />, text: "On-campus proximity to Middlesex University (The Burroughs)" },
    { icon: <GraduationCap size={20} />, text: "Close to Barnet Hospital and Metropolitan Police College" },
    { icon: <Building2 size={20} />, text: "Quiet, safe residential area with excellent amenities" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              {/* Updated Heading: Hendon, UK on the first line */}
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Rent a Room in <span className="text-[#FF6B35] italic">Hendon, UK</span>
                <span className="block mt-2">With Bills Included</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                Hendon is a highly sought-after rental destination in North West London, 
                located in Zone 3 on the Northern line with fast access to the City, 
                King's Cross, and Central London. Its direct campus proximity to Middlesex 
                University makes it the natural first choice for students, 
                while the presence of Barnet Hospital and the Metropolitan Police College 
                drives consistent demand from NHS and public sector professionals.
              </p>
              <p>
                Landlords benefit from one of NW London's most stable tenant markets — 
                Middlesex University alone generates thousands of lettings enquiries annually, 
                and the area's strong transport links ensure rooms are rarely vacant for long. 
                Hendon's suburban character, green spaces, and competitive rents provide exceptional 
                value for both tenants and investors.
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