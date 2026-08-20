import React from "react";
import { Train, ShoppingBag, PoundSterling, Store, Briefcase } from "lucide-react";

const SouthEastLondonSpotlight = () => {
  const highlights = [
    { icon: <Train size={20} />, text: "DLR, National Rail, Victoria & Northern line access" },
    { icon: <ShoppingBag size={20} />, text: "Greenwich Park, Oxleas Wood & Woolwich riverside on your doorstep" },
    { icon: <PoundSterling size={20} />, text: "Close to the University of Greenwich" },
    { icon: <Store size={20} />, text: "Established markets and high streets in every area" },
    { icon: <Briefcase size={20} />, text: "Strong value compared to Zone 1/2 South London" },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[32px] md:text-[40px] font-semibold text-white font-playfair leading-tight">
                Why Rent a Room in <span className="text-[#FF6B35] italic">South East London?</span>
                <span className="block mt-2">With Bills Included</span>
              </h2>
              <div className="h-1 w-20 bg-[#FF6B35] rounded-full"></div>
            </div>

            <div className="space-y-6 text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
              <p>
                These neighbourhoods offer a mix of riverside heritage, established high streets, and fast transport into Central London and the City — via the DLR, National Rail, and the Victoria and Northern lines — at rents that stay noticeably below Zone 1/2 equivalents.
              </p>
              <p>
                From green open spaces to vibrant local culture and excellent university links, South East London attracts students and working professionals looking for well-connected and comfortable shared living options.
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

export default SouthEastLondonSpotlight;