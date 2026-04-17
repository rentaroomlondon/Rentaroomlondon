import React from "react";
import Link from "next/link"; // Assuming you use Next.js for navigation
import { ChevronRight } from "lucide-react";

const Hero = ({
  title = "Top Rated Rental Room ",
  highlight = "Service Provider in UK",
  description = "Contact RentaRoomLondon, to find the best accommodation near you.",
}) => {
  return (
    <section
      className="relative w-full flex items-center overflow-hidden 
      px-5 py-10 md:px-15 md:py-16 
      bg-[#1A2332] md:bg-[linear-gradient(102.2deg,#1A2332_0%,#243044_100%)]"
    >
      {/* Background Decorative Circle */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute right-[-15vw] top-1/2 -translate-y-1/2 
          w-[60vw] h-[60vw] max-w-175 max-h-175 
          rounded-full bg-[#FF6B3514]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          
          {/* Breadcrumb Navigation Area */}
          <nav className="flex items-center space-x-2 mb-8 text-[13px] md:text-[14px] font-sans">
            <Link href="/" className="text-[#FFFFFFA6] hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <span className="text-[#FFFFFFA6]"><ChevronRight className="relative z-10" /></span>
            <span className="text-white font-medium">About Rental Room</span>
          </nav>

          

          {/* Main Title */}
          <h1 className="text-white mb-4 font-playfair text-[36px] leading-10 md:text-[56px] md:leading-[1.2] font-bold">
            {title}{" "}
            <span className="text-[#FF6B35] italic font-playfair">
              {highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#FFFFFFA6] font-sans font-light text-[15px] leading-7 md:text-[17px] max-w-lg">
            {description}
          </p>

        </div>
      </div>

      {/* Mobile Decorative Circle */}
      <div className="md:hidden absolute -right-12.5 -top-15 w-62.5 h-62.5 bg-[#F47C3C14] rounded-full pointer-events-none" />
    </section>
  );
};

export default Hero;