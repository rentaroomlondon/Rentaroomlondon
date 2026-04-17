import React from "react";
import { Zap, Flame, Droplets, Wifi, Receipt } from "lucide-react";

const Section5 = () => {
  const billItems = [
    { name: "Electricity", icon: <Zap size={24} className="text-yellow-500" /> },
    { name: "Gas", icon: <Flame size={24} className="text-orange-500" /> },
    { name: "Water", icon: <Droplets size={24} className="text-blue-500" /> },
    { name: "3000Mbps Wi-Fi", icon: <Wifi size={24} className="text-indigo-500" /> },
  ];

  return (
    <section className="py-20 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-[3px]">
                Bills Included in Renting Room in UK
              </h3>
              <h2 className="text-[32px] md:text-[44px] font-semibold text-[#1A2332] font-playfair leading-tight">
                Bills Included Room Rent in London Near you
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed font-light">
                One simple monthly payment covers your room and every bill. No separate accounts, 
                no landlord chasing, and no surprises at month-end.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#FF6B351A] p-2 rounded-full mt-1">
                  <Receipt size={20} className="text-[#FF6B35]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2332]">Zero Admin Stress</h4>
                  <p className="text-gray-500 text-sm">We manage all providers so you don't have to.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bills Card Column - Inspired by your uploaded design */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#FAF9F6] border border-[#E8E4DF] rounded-[32px] p-8 md:p-10 shadow-sm relative">
              <div className="absolute -top-4 -right-4 bg-[#FF6B35] text-white text-[12px] font-bold px-4 py-2 rounded-full shadow-lg">
                ALL INCLUDED
              </div>
              
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-[#1A2332]">All Bills Included</h4>
                <div className="h-1 w-12 bg-[#FF6B35] mt-2 rounded-full"></div>
              </div>

              {/* Grid of Bill Icons */}
              <div className="grid grid-cols-2 gap-4">
                {billItems.map((item, idx) => (
                  <div key={idx} className="bg-white border border-[#E8E4DF] rounded-2xl p-6 flex flex-col items-center text-center group hover:shadow-md transition-all">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="font-bold text-[#1A2332] text-sm md:text-base">{item.name}</span>
                    <span className="text-[10px] text-green-500 font-bold uppercase mt-1 tracking-wider">
                      Included
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[12px] text-gray-400 font-sans italic text-center">
                * Council tax is payable by tenants and split equally between occupants. 
                Student inhabited properties are exempt.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Section5;