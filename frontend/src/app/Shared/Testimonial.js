import React from "react";

const Testimonial = ({ text, name, source, rating = 5 }) => {
  return (
    <section className="bg-[#1A2332] py-14 md:py-20 px-5 md:px-14 flex flex-col items-center justify-center font-sans">
      
      <div className="relative max-w-3xl w-full">

        {/* Quote Icon (Desktop Only) */}
        <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 text-[#2d3748] text-8xl opacity-30 select-none">
          &ldquo;&rdquo;
        </div>

        {/* Card */}
        <div className="bg-[#FFFFFF0F] md:bg-[#FFFFFF0D] border border-[#30394a] rounded-xl md:rounded-3xl p-6 md:p-16 text-left md:text-center shadow-xl">

          {/* Stars */}
          <div className="flex justify-start md:justify-center gap-1 mb-5 md:mb-8">
            {[...Array(rating)].map((_, i) => (
              <span key={i} className="text-[#F47C3C] text-base md:text-xl">
                ★
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-[#FFFFFFD9] italic text-[14px] md:text-lg leading-relaxed mb-5 md:mb-8">
            "{text}"
          </blockquote>

          {/* Author */}
          <div>
            <h4 className="text-white font-bold text-[14px] md:text-base mb-1">
              {name}
            </h4>
            <p className="text-[#FFFFFF80] text-xs md:text-sm">
              {source}
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="mt-8 md:mt-12 w-full md:w-auto bg-[#ff7a45] hover:bg-[#ff6a30] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wider text-sm">
        Testimonials
        <span className="text-lg">→</span>
      </button>
    </section>
  );
};

export default Testimonial;