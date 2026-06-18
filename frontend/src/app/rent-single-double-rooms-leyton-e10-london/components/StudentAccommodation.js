import React from "react";
import { Bus, Wallet, Map, TreePine } from "lucide-react";

const StudentAccommodation = () => {
  const stats = [
    {
      label: "Commute",
      value: "12–18 mins",
      description: "Central line direct to Mile End & Bank",
      icon: <Bus size={20} />,
    },
    {
      label: "Affordability",
      value: "Lower E10 Rents",
      description: "Cheaper than Stratford & Hackney",
      icon: <Wallet size={20} />,
    },
    {
      label: "Connectivity",
      value: "Zone 3",
      description: "Central line · Overground · Elizabeth via Stratford",
      icon: <Map size={20} />,
    },
    {
      label: "Parks",
      value: "Leyton Flats",
      description: "Open green space adjacent to Wanstead Flats",
      icon: <TreePine size={20} />,
    },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-3/5 space-y-8">
            <div className="inline-block bg-[#F47C3C15] px-4 py-2 rounded-lg">
              <span className="text-[#FF6B35] font-bold text-xs uppercase tracking-widest">
                University Life
              </span>
            </div>
            
            <h2 className="text-[32px] md:text-[44px] font-semibold text-[#1A2332] font-playfair leading-tight">
              Student Accommodation Near Universities in Leyton E10 <span className="text-[#FF6B35] italic">— Bills Included</span>
            </h2>

            <div className="space-y-6 text-[#6B7280] text-[17px] md:text-[18px] leading-relaxed">
              <p>
                Students at UEL's Royal Docks campus, Queen Mary's Mile End site, or London Metropolitan consistently find Leyton one of the best-positioned and most affordable East London bases. The Central line runs direct to Mile End, while Stratford's Elizabeth line opens rapid routes to the Euston corridor and Canary Wharf employment zone alike.
              </p>

              <p className="bg-[#FAF5F0] p-6 rounded-2xl border-l-4 border-[#FF6B35] italic text-[#1A2332] font-medium">
                "Leyton gives students what Stratford used to — a fast Central line connection, proximity to the Olympic Park, and a proper East London community feel — at a price point that leaves room for a life outside rent."
              </p>
            </div>
          </div>

          {/* Right Side: Quick Fact Cards */}
          <div className="w-full lg:w-2/5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group relative p-6 bg-white border border-[#E8E4DF] rounded-2xl flex items-center gap-5 overflow-hidden transition-all duration-500 hover:border-[#FF6B35]"
                >
                  {/* Full Orange Background on Hover */}
                  <div className="absolute inset-0 bg-[#FF6B35] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

                  {/* Icon Container */}
                  <div className="relative z-10 bg-[#FAF5F0] p-4 rounded-xl text-[#FF6B35] group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                    {stat.icon}
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 transition-colors duration-300">
                    <h4 className="text-[12px] uppercase tracking-tighter text-gray-400 font-bold group-hover:text-orange-100 transition-colors">
                      {stat.label}
                    </h4>
                    <div className="text-[#1A2332] font-bold text-lg group-hover:text-white transition-colors">
                      {stat.value}
                    </div>
                    <p className="text-gray-500 text-sm group-hover:text-white/90 transition-colors">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StudentAccommodation;