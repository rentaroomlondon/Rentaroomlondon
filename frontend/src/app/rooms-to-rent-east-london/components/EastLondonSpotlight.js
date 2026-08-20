import React from "react";
import { Train, ShoppingBag, PoundSterling, Store, Briefcase } from "lucide-react";

const EastLondonSpotlight = () => {
  const highlights = [
    { icon: <Train size={20} />, text: "Direct Victoria, Central, District & Hammersmith & City line access" },
    { icon: <ShoppingBag size={20} />, text: "Close to Stratford's Westfield, Elizabeth line & Olympic Park" },
    { icon: <PoundSterling size={20} />, text: "Genuinely affordable compared to Hackney, Islington & Zone 2" },
    { icon: <Store size={20} />, text: "Strong local high streets — West Green Road, Leyton High Road, East Ham High Street" },
    { icon: <Briefcase size={20} />, text: "Growing job market across Docklands, the City & London City Airport" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Why Rent a Room in <span className="text-[#FF6B35] italic">East London?</span>
                <span className="block mt-2">With Bills Included</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                East London combines fast Underground and Overground access with ongoing regeneration around Stratford, Tottenham, and the Royal Docks — meaning better amenities and transport are arriving in these areas year on year, without rents catching up to Zone 2 prices yet.
              </p>
              <p>
                From vibrant community spaces to thriving local markets and modern entertainment hubs, East London attracts a diverse mix of working professionals and students looking for well-connected and affordable shared living options.
              </p>
            </div>
          </div>

          {/* Right: Feature Highlights */}
          <div className="w-full lg:w-2/5 bg-[#243044] p-8 md:p-16 flex flex-col justify-center">
            <div className="space-y-6">
              <h4 className="text-white font-bold text-xl mb-4 border-b border-white/10 pb-4">
                Area Benefits
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="p-3 bg-[#FF6B351A] rounded-xl text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300 shrink-0">
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
                  Better connectivity. Vibrant culture. Premium rooms.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EastLondonSpotlight;