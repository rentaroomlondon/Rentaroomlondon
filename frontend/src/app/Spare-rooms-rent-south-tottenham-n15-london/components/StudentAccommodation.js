import React from "react";
import { Train, Wallet, Network, TreePine } from "lucide-react";

const StudentAccommodation = () => {
  const stats = [
    {
      label: "Commute",
      value: "18–22 min",
      description: "Victoria line direct to Euston & King's Cross",
      icon: <Train size={20} />,
    },
    {
      label: "Affordability",
      value: "Lower N15 Rents",
      description: "Cheaper than Finsbury Park & Highbury",
      icon: <Wallet size={20} />,
    },
    {
      label: "Connectivity",
      value: "Zone 3",
      description: "Victoria line & Overground access",
      icon: <Network size={20} />,
    },
    {
      label: "Parks",
      value: "Chestnuts Park",
      description: "10-min walk from most rooms",
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
              Student Accommodation Near Universities in South Tottenham N15 <span className="text-[#FF6B35] italic">— Bills Included</span>
            </h2>

            <div className="space-y-6 text-[#6B7280] text-[17px] md:text-[18px] leading-relaxed">
              <p>
                For students at Middlesex University, UCL, or London Metropolitan, South Tottenham combines a fast Victoria line commute with rents that sit meaningfully below Finsbury Park, Highbury, or Kentish Town. Seven Sisters station places students on a direct line to the Euston Road cluster of universities, while the Overground opens routes east toward Hackney and Stratford.
              </p>

              <p className="bg-[#FAF5F0] p-6 rounded-2xl border-l-4 border-[#FF6B35] italic text-[#1A2332] font-medium">
                "Students who discover South Tottenham consistently find a smarter trade-off — a 20-minute commute to campus, bills included, and a neighbourhood with genuine character and affordability that the better-known stops simply cannot match."
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