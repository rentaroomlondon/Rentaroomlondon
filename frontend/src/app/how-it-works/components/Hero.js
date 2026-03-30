import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full flex items-center overflow-hidden 
    px-5 py-[40px] md:px-[60px] md:py-[120px] 
    bg-[#0F253B] md:bg-transparent">

      {/* Background Image (Desktop Only) */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/About-us.avif')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,35,50,0.5)] to-[rgba(36,48,68,0.5)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl">
        <div className="max-w-xl">

          {/* Badge */}
          <div className="inline-block mb-4 md:mb-6 
            bg-[#F47C3C2E] md:bg-white 
            rounded-[50px] px-[11px] py-[2px] 
            md:px-4 md:py-1 shadow-sm">

            <span className="uppercase text-[#F47C3C] font-sans font-bold 
            text-[10px] md:text-[11px] tracking-[1.5px]">
                Step by Step
            </span>

          </div>

          {/* Title */}
          <h1 className="text-white mb-4 playfair 
          text-[30px] leading-[34px] 
          md:text-[56px] md:leading-[64px] font-bold">
            How It <span className="text-orange-500 italic">Works</span>
          </h1>

          {/* Description */}
          <p className="text-[#FFFFFF99] md:text-white font-light font-sans 
          text-[13px] leading-[20px] 
          md:text-[16px] md:leading-[25px]">
            Your complete guide from first search to moving day and beyond.
            We make renting in London simple.
          </p>

        </div>
      </div>

      {/* Desktop Circle */}
      <div className="hidden lg:block absolute right-[-150px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B3514] rounded-full pointer-events-none" />

      {/* Mobile Circle */}
      <div className="md:hidden absolute right-[-50px] top-[-60px] w-[250px] h-[250px] bg-[#FF6B3514] rounded-full pointer-events-none" />

    </section>
  );
};

export default Hero;