import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <>
      <section
        className="relative w-full flex items-center overflow-hidden 
        px-5 py-[40px] md:px-[60px] md:py-[70px] 
        bg-[#0F253B] md:bg-[linear-gradient(105.01deg,#1A2332_0%,#243044_100%)]"
      >
        {/* Desktop Background Elements */}
        <div className="hidden md:block absolute inset-0 z-0">
          <div className="absolute right-[-5%] top-[40%] -translate-y-1/2 w-[550px] h-[550px] bg-[#FF6B3514] rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-xl">
            {/* Badge */}
            <div
              className="inline-block mb-6 
              bg-[#F47C3C2E] md:bg-[#FF6B3533] 
              rounded-[50px] px-[12px] py-[4px]"
            >
              <span
                className="uppercase text-[#f47c3c] font-sans font-bold 
                text-[10px] md:text-[11px] tracking-[1.2px]"
              >
                Our Promise
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-white mb-4 font-serif 
              text-[30px] leading-[34px] 
              md:text-[56px] md:leading-[64px] font-bold"
            >
              Why <span className="text-[#f47c3c] italic">Choose</span> Us
            </h1>

            {/* Description */}
            <p
              className="text-[#FFFFFF99] md:text-white font-light font-sans 
              text-[13px] leading-[20px] 
              md:text-[16px] md:leading-[25px] mb-6"
            >
              Receive up-to-date available rooms to rent in London, with every
              detail of your move carefully managed.
            </p>

            {/* Button - Desktop Only */}
            <a
              href="/register-with-us"
              className="hidden md:inline-flex bg-[#FF6B35] hover:bg-[#ff8a5e] font-sans text-white px-8 py-4 rounded-lg font-bold items-center gap-2 transition-all uppercase text-sm tracking-wider no-underline"
            >
              Register Now
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Decorative Circle */}
        <div className="md:hidden absolute right-[-50px] top-[-60px] w-[250px] h-[250px] bg-[#FF6B3514] rounded-full pointer-events-none" />
      </section>

      {/* Mobile Only Registration Section */}
      <div 
        className="md:hidden w-full flex items-center justify-center bg-[#FFF7F2]"
        style={{ 
          height: '78px', 
          paddingTop: '16px', 
          paddingBottom: '16px', 
          paddingLeft: '18px', 
          paddingRight: '18px' 
        }}
      >
        <a
          href="/register-with-us"
          className="w-full h-full bg-[#F47C3C] text-white rounded-[14px] flex items-center justify-center gap-2 uppercase transition-active active:scale-[0.98]"
          style={{ 
            fontFamily: 'DM Sans, sans-serif', 
            fontWeight: 700, 
            fontSize: '14px',
            lineHeight: '100%'
          }}
        >
          Register Now
          <ArrowRight size={16} strokeWidth={3} />
        </a>
      </div>
    </>
  );
};

export default Hero;