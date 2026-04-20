import React from "react";
import Image from "next/image";
import Link from 'next/link';

const Section1 = () => {
  return (
    <section className="py-8 md:py-18 px-5 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          
          {/* Left Side: Modern Room Image */}
          <div className="w-full md:w-1/2 relative min-h-[350px] h-[500px]">
            <figure>
                <Image
                    src="/apartment-room-rental-service.webp"
                    alt="Modern apartment interior with kitchen, sofa, and rental service, UK"
                    fill
                    className="object-cover rounded-[24px] shadow-sm"
                    priority
                />
                <figcaption className="text-sm text-gray-500 mt-2">
                    Premium room rental service for students, professionals, and tenants in the UK.
                </figcaption>
            </figure>
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
            
            {/* H2 - About Best Room Rental Service Provider */}
            <h2 className="text-[32px] md:text-[42px] font-semibold text-[#1A2332] font-playfair leading-[1.2]">
              About Best Room Rental Service Provider
            </h2>

            {/* H3 - Rental Room Services */}
            <div className="space-y-4">
              <h3 className="text-[#FF6B35] font-bold text-[18px] md:text-[22px] font-sans tracking-tight">
                Rental Room Services: <span className="text-[#4B5563] font-medium">Students, Professionals & Tenants in UK</span>
              </h3>
              
              <p className="text-[#6B7280] text-[16px] md:text-[18px] leading-relaxed font-sans font-light">
                We're a premium rental room service built for students, working professionals, and international tenants. 
                Located near your university, your office, or the city's central hub—we've got the perfect room waiting for you.
              </p>
            </div>

            {/* H4 Button - Explore rooms */}
            <div className="pt-4">
              <Link href="find-a-room" className="bg-[#FF6B35] text-white px-10 py-4 rounded-full font-bold text-[13px] uppercase tracking-[2px] hover:bg-[#e55a2a] transition-all hover:shadow-xl hover:-translate-y-1 duration-300 shadow-lg shadow-[#FF6B3533]">
                Explore rooms
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Section1;