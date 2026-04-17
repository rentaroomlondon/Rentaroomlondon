import React from "react";
import { GraduationCap, Briefcase, Zap, ShieldCheck } from "lucide-react"; // Using lucide-react for clean icons

const Section2 = () => {
  const features = [
    {
      title: "Rental Rooms near every major university & college",
      desc: "We have rental rooms near universities & colleges to place you within walking or commuting distance of campus.",
      icon: <GraduationCap className="w-8 h-8 text-[#FF6B35]" />,
    },
    {
      title: "Accommodation close to offices & business districts",
      desc: "As a working professionals, you can rent our rooms near your company or central transport hubs.",
      icon: <Briefcase className="w-8 h-8 text-[#FF6B35]" />,
    },
    {
      title: "Move-in ready in days, not weeks",
      desc: "Simple online application, fast approval, and a furnished room that's ready when you are.",
      icon: <Zap className="w-8 h-8 text-[#FF6B35]" />,
    },
    {
      title: "Transparent, all-inclusive pricing",
      desc: "No hidden fees. What you see is what you pay, utilities, Wi-Fi, amenities and bills included.",
      icon: <ShieldCheck className="w-8 h-8 text-[#FF6B35]" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-[30px] md:text-[40px] font-semibold text-[#1A2332] font-playfair leading-tight">
            Why choose Our Property For Rent in UK
          </h2>
          <h3 className="text-[#FF6B35] font-bold text-[18px] md:text-[22px] font-sans">
            Find the Best Accommodation Near Office or University
          </h3>
          <p className="text-[#6B7280] text-[16px] md:text-[18px] leading-relaxed font-light">
            Whether you're starting university, joining a new job, or relocating to a new city, location is everything.
          </p>
        </div>

        {/* Features Grid (The H4s) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="p-8 bg-white border border-gray-100 rounded-[24px] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center space-y-4"
            >
              <div className="bg-[#FFE7DE] p-4 rounded-full">
                {item.icon}
              </div>
              
              <h4 className="text-[17px] font-bold text-[#1A2332] font-sans leading-snug min-h-[50px] flex items-center">
                {item.title}
              </h4>
              
              <p className="text-[#6B7280] text-[14px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Section2;