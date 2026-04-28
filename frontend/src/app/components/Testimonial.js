"use client";
import React, { useState } from "react";

const slides = [
  {
    text: "My experience has been very positive. The staff working at RENTAROOMLONDON have proved to be honest, reliable and the team ensured a stress-free rent. Good communication during the whole process and a fast response when problems arise.",
    author: "Maria Ibañez, Madrid via Trustpilot",
  },
  {
    text: "The process of finding a new apartment was incredibly smooth. They understood my requirements perfectly and found me a place that exceeded my expectations within a week. Highly professional service.",
    author: "David Smith, Barcelona via Trustpilot",
  },
  {
    text: "Reliable, transparent, and very helpful. I was worried about moving to a new city, but the team made the rental process feel effortless. I highly recommend their services to anyone looking for a home.",
    author: "Elena Gomez, Valencia via Trustpilot",
  },
  {
    text: "Quick responses and a very friendly team. They managed everything from viewings to contract signing professionally. Best real estate experience I have had so far.",
    author: "Lucas Meyer, Madrid via Trustpilot",
  },
];

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="relative w-full flex items-center justify-center text-white overflow-hidden font-sans">
      {/* Mobile: solid color background */}
      <div className="absolute inset-0 z-0 bg-[#0F253B] md:hidden" />

      {/* Desktop: image + overlay */}
      <div
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/testimonials.avif')", // your desktop image
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />
      <div className="hidden md:block absolute inset-0 z-10 bg-[#2A353F]/92" /> {/* overlay with opacity */}

      {/* Content */}
      <div className="relative z-20 max-w-4xl px-6 py-10 md:py-20 flex flex-col items-center text-center">
        {/* Heading */}
        <h2 className="font-black text-[24px] md:text-[48px] leading-[48px] tracking-[0%] mb-2 md:mb-6 text-center">
          What Our <span className="text-[#f17a3e]">Clients Say</span>
        </h2>

        {/* Quote Icon */}
        <div className="hidden md:block">
            <svg
            width="40"
            height="32"
            viewBox="0 0 40 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#f17a3e] mb-8"
            >
            <path
                d="M7.04094 19.2004C5.04094 19.2004 3.36094 18.5204 2.00094 17.1604C0.667604 15.7737 0.000937611 13.7871 0.000937611 11.2004C0.000937611 9.14706 0.547604 7.28039 1.64094 5.60039C2.76094 3.89372 4.3476 2.53372 6.40094 1.52039C8.48094 0.507055 10.6409 0.000388622 12.8809 0.000388622L13.6809 1.12039C13.0143 1.12039 12.1609 1.25372 11.1209 1.52039C10.0809 1.76039 9.05427 2.13372 8.04094 2.64039C7.0276 3.14706 6.1876 3.78706 5.52094 4.56039C4.5076 5.73372 4.00094 6.69372 4.00094 7.44039C4.21427 7.14706 4.69427 6.89372 5.44094 6.68039C6.1876 6.44039 6.9876 6.32039 7.84094 6.32039C9.97427 6.32039 11.6009 7.20039 12.7209 8.96039C13.1209 7.17372 13.9209 5.61372 15.1209 4.28039C16.3476 2.94706 17.8409 1.90706 19.6009 1.16039C21.3876 0.387056 23.3076 0.000388622 25.3609 0.000388622L26.1609 1.12039C25.4943 1.12039 24.6409 1.25372 23.6009 1.52039C22.5609 1.76039 21.5343 2.13372 20.5209 2.64039C19.5076 3.14706 18.6676 3.78706 18.0009 4.56039C16.9876 5.73372 16.4809 6.69372 16.4809 7.44039C16.6943 7.14706 17.1743 6.89372 17.9209 6.68039C18.6676 6.44039 19.4676 6.32039 20.3209 6.32039C21.4943 6.32039 22.5209 6.60039 23.4009 7.16039C24.2809 7.72039 24.9743 8.48039 25.4809 9.44039C25.9876 10.3737 26.2409 11.4137 26.2409 12.5604C26.2409 14.4804 25.6276 16.0671 24.4009 17.3204C23.2009 18.5737 21.5743 19.2004 19.5209 19.2004C18.1343 19.2004 16.8809 18.8537 15.7609 18.1604C14.6409 17.4671 13.8143 16.5071 13.2809 15.2804C12.7743 16.5071 11.9876 17.4671 10.9209 18.1604C9.85427 18.8537 8.56094 19.2004 7.04094 19.2004Z"
                fill="#F47C3C"
            />
            </svg>
        </div>

        {/* Testimonial Text */}
        <p className="font-normal italic text-[16px] leading-[28px] text-white/80 mb-4 max-w-3xl text-center">
          "{slides[activeSlide].text}"
        </p>

        {/* Author */}
        <p className="font-semibold text-[12px] md:text-[13px] leading-[13px] text-white/50 mb-8 uppercase text-center">
          / {slides[activeSlide].author}
        </p>

        {/* Pagination */}
        <div className="flex space-x-3 mb-6 md:mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "bg-[#f17a3e] scale-110"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <button className="font-bold text-[13px] tracking-[0.5px] uppercase text-white px-8 py-3 rounded-md bg-[#f17a3e] hover:bg-[#d9662f] flex items-center transition-colors duration-300">
          Testimonials
          <span className="ml-2 group-hover:translate-x-1 transition-transform">›</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;