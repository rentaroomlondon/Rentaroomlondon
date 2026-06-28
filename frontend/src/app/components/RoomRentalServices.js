import React from "react";
import { Train, ShieldCheck, MapPin, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

  const highlights = [
    {
      title: "Prime Connectivity",
      desc: "Situated near train stations and bus routes for a simple, efficient commute.",
      icon: <Train size={24} />,
    },
    {
      title: "Vibrant Local Life",
      desc: "Located in neighborhoods with easy access to shopping, dining, and leisure.",
      icon: <MapPin size={24} />,
    },
    {
      title: "Modern Amenities",
      desc: "Furnished rooms including modern utilities to ensure comfort and convenience.",
      icon: <Zap size={24} />,
    },
    {
      title: "Safe & Flexible",
      desc: "Secure housing options with flexible contracts tailored to your needs.",
      icon: <ShieldCheck size={24} />,
    },
  ];

const RoomRentalServices = () => {
  return (
    <section className="py-24 px-5 md:px-12 bg-[#FAF9F6] relative overflow-hidden">
      {/* Decorative Transit Line Graphic */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#FF6B3510] hidden lg:block -translate-y-1/2">
        <div className="absolute left-[20%] w-4 h-4 rounded-full bg-[#FF6B3520] -top-2" />
        <div className="absolute left-[50%] w-4 h-4 rounded-full bg-[#FF6B3520] -top-2" />
        <div className="absolute left-[80%] w-4 h-4 rounded-full bg-[#FF6B3520] -top-2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Impact Text */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="space-y-4">
              <h3 className="text-[#FF6B35] font-bold text-xs uppercase tracking-[4px]">Premium Standards</h3>
              <h2 className="text-[36px] md:text-[52px] font-semibold text-[#1A2332] font-playfair leading-[1.1]">
                Top-Rated <br/>
                Room Rental <br/>
                <span className="text-[#FF6B35] italic">Services in the UK</span>
              </h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              Properties situated near train stations and city centers, making commuting simple and efficient for professionals and students alike.
            </p>

            <Link
              href="/find-a-room"
              className="group flex items-center gap-3 bg-[#1A2332] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#FF6B35] transition-all duration-300"
            >
              Book a Room
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Right Side: The Pillars */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-10 rounded-[40px] transition-all duration-500 hover:-translate-y-2 ${
                    idx % 2 === 0 
                      ? "bg-white shadow-sm border border-gray-100" 
                      : "bg-[#1A2332] text-white lg:mt-12"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    idx % 2 === 0 ? "bg-[#FAF5F0] text-[#FF6B35]" : "bg-[#FF6B35] text-white"
                  }`}>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className={`${idx % 2 === 0 ? "text-gray-500" : "text-gray-400"} text-sm leading-relaxed`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RoomRentalServices;