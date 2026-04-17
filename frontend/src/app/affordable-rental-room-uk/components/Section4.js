import React from "react";
import { PlaneTakeoff, Globe, BadgePercent } from "lucide-react"; // Using subtle icons for the list
import Link from 'next/link';

const Section4 = () => {
  const perks = [
    {
      text: "Exclusive welcome pricing for first-time international tenants",
      icon: <BadgePercent className="w-5 h-5 text-[#FF6B35]" />,
    },
    {
      text: "Pre-arrival room booking — secured before you fly",
      icon: <PlaneTakeoff className="w-5 h-5 text-[#FF6B35]" />,
    },
    {
      text: "Multilingual support team ready to help you settle in",
      icon: <Globe className="w-5 h-5 text-[#FF6B35]" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A2332] rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          
          {/* Left Side: Content Box */}
          <div className="w-full lg:w-3/5 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h3 className="text-[#FF6B35] font-bold text-[14px] uppercase tracking-[3px]">
                Rental Rooms For International tenants
              </h3>
              <h4 className="text-white text-[28px] md:text-[42px] font-semibold font-playfair leading-tight">
                Coming from abroad? We've got a special offer for renting room from us
              </h4>
              <p className="text-[#FFFFFFA6] text-[16px] md:text-[18px] leading-relaxed font-light">
                We understand moving to a new country is a big step. That's why we go the extra
                mile for international arrivals — with dedicated support, better pricing, and a
                smooth onboarding experience.
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-4">
              {perks.map((perk, index) => (
                <li key={index} className="flex items-center gap-4 text-white font-medium text-[15px] md:text-[16px]">
                  <div className="bg-[#FF6B351A] p-2 rounded-lg">
                    {perk.icon}
                  </div>
                  {perk.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: CTA Box */}
          <div className="w-full lg:w-2/5 bg-[#243044] p-10 md:p-16 flex flex-col justify-center items-center text-center relative">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B3514] rounded-full -mr-16 -mt-16" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-20 h-20 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Globe className="text-white w-10 h-10" />
              </div>
              <h5 className="text-white text-xl font-bold font-sans">
                Ready to move to the UK?
              </h5>
              <Link href="find-a-room" className="w-full bg-[#FF6B35] text-white px-8 py-4 rounded-xl font-bold text-[14px] uppercase tracking-widest hover:bg-[#e55a2a] transition-all transform hover:scale-105 shadow-xl shadow-[#0000004D]">
                Get the Rental Room offer
              </Link>
              <p className="text-[#FFFFFFA6] text-xs">
                *Terms and conditions apply to international offers.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Section4;