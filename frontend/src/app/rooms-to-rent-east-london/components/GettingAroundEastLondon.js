import React from "react";
import { Train, Navigation, Clock, Compass } from "lucide-react";

const GettingAroundEastLondon = () => {
  const transitData = [
    {
      area: "South Tottenham",
      zone: "3",
      lines: "Victoria, Overground",
      journey: "~18–20 min",
      icon: <Train size={20} />,
    },
    {
      area: "Leyton",
      zone: "3",
      lines: "Central, Overground",
      journey: "~20–25 min",
      icon: <Compass size={20} />,
    },
    {
      area: "East Ham",
      zone: "3/4",
      lines: "District, H&C",
      journey: "~25–30 min",
      icon: <Navigation size={20} />,
    },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header & Intro */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-block bg-[#F47C3C15] px-4 py-2 rounded-lg">
            <span className="text-[#FF6B35] font-bold text-xs uppercase tracking-widest">
              Transit & Connectivity
            </span>
          </div>

          <h2 className="text-[32px] md:text-[44px] font-semibold text-[#1A2332] font-playfair leading-tight">
            Getting Around <span className="text-[#FF6B35] italic">East London</span>
          </h2>

          <p className="text-[#6B7280] text-[17px] md:text-[18px] leading-relaxed font-light">
            East London is exceptionally well-connected by multiple Underground lines, the Overground, and national rail networks, keeping daily commutes into Central London fast and predictable.
          </p>
        </div>

        {/* Transit Breakdown Cards / Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transitData.map((item, idx) => (
            <div 
              key={idx}
              className="group relative p-8 bg-[#FAF9F6] border border-[#E8E4DF] rounded-[32px] flex flex-col justify-between space-y-6 overflow-hidden transition-all duration-500 hover:border-[#FF6B35] hover:shadow-lg"
            >
              {/* Full Orange Background on Hover */}
              <div className="absolute inset-0 bg-[#FF6B35] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

              {/* Top Row: Icon & Zone Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-white p-4 rounded-2xl text-[#FF6B35] shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="px-3 py-1 bg-white/80 rounded-full text-xs font-bold text-[#1A2332] group-hover:bg-white/20 group-hover:text-white transition-colors">
                  Zone {item.zone}
                </span>
              </div>

              {/* Middle Content */}
              <div className="relative z-10 space-y-3">
                <h3 className="text-[22px] font-semibold text-[#1A2332] font-playfair group-hover:text-white transition-colors">
                  {item.area}
                </h3>
                
                <div className="space-y-1 text-sm">
                  <p className="text-gray-500 group-hover:text-orange-100 transition-colors">
                    <strong className="text-[#1A2332] group-hover:text-white">Key Lines:</strong> {item.lines}
                  </p>
                </div>
              </div>

              {/* Bottom Journey Time */}
              <div className="relative z-10 pt-4 border-t border-gray-200/60 group-hover:border-white/20 flex items-center justify-between transition-colors">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold group-hover:text-orange-100">
                  To Central London
                </span>
                <span className="text-[#FF6B35] font-bold text-base group-hover:text-white flex items-center gap-1.5 transition-colors">
                  <Clock size={15} /> {item.journey}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GettingAroundEastLondon;