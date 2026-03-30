import React from "react";

const Hero = ({
  badge = "Help Centre",
  title = "Tenant",
  highlight = "FAQs",
  description = "",
  linkText,
  linkHref
}) => {
  return (
    <section
      className="relative w-full flex items-center overflow-hidden 
      px-5 py-10 md:px-15 md:py-17 
      bg-[#1A2332] md:bg-[linear-gradient(102.2deg,#1A2332_0%,#243044_100%)]"
    >
      {/* Desktop Circle */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute right-[-15vw] top-1/2 -translate-y-1/2 
          w-[60vw] h-[60vw] max-w-175 max-h-175 
          rounded-full bg-[#FF6B3514]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-xl">

          {/* Badge */}
          <div className="inline-block mb-4 bg-[#F47C3C2E] md:bg-[#FF6B3533] rounded-[50px] px-3.5 py-0.5">
            <span className="uppercase text-[#F47C3C] font-sans font-bold text-[10px] md:text-[11px] tracking-[1.2px]">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white mb-4 font-playfair text-[36px] leading-10 md:text-[56px] md:leading-16.25 font-bold">
            {title}{" "}
            <span className="text-[#FF6B35] italic font-playfair">
              {highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#FFFFFFA6] font-sans font-light text-[14px] leading-5.5 md:text-[16px] md:leading-7 ">
            {description}
            {linkText && linkHref && (
              <>
                {" "}
                <a 
                  href={linkHref} 
                  className="text-[#FF6B35] underline cursor-pointer"
                >
                  {linkText}
                </a>
              </>
            )}
          </p>

        </div>
      </div>

      {/* Mobile Circle */}
      <div className="md:hidden absolute -right-12.5 -top-15 w-62.5 h-62.5 bg-[#F47C3C14] rounded-full pointer-events-none" />
    </section>
  );
};

export default Hero;