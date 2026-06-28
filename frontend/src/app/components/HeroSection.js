"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Searchbar from './Searchbar';

const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0);

  // Background images for the auto-slider
  const bgImages = [
    {
      src: "/rent-room-london.webp",
      alt: "Rent a room in London affordable and comfortable"
    },
    {
      src: "/cheap-rooms-rent-london.webp",
      alt: "Cheap rooms to rent in London for students and professionals"
    },
    {
      src: "/student-rooms-london.webp",
      alt: "Student rooms to rent in London close to universities"
    }
  ];

  // Auto-play logic for background slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section 
        className="relative min-h-200 md:min-h-150 h-200 md:h-162.5 w-full flex flex-col items-center justify-start pt-10 md:pt-20 bg-cover bg-center transition-all duration-1000 ease-in-out" 
        // style={{ backgroundImage: `url('${bgImages[currentBg]}')` }}
      >
        <div className="absolute inset-0">
          {bgImages.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              quality={75}
              sizes="100vw"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className={`object-cover transition-opacity duration-1000 ${
                currentBg === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full max-w-285 mx-auto text-center text-white px-6">
          <div className="flex flex-col items-center">
            
            {/* Trophy Icon */}
            <div className="mb-3">
              <Image
                src="/trophy.avif"
                alt="Trophy"
                width={48}
                height={40}
                className="object-contain"
              />
            </div>
            
            <p className="uppercase tracking-[0.2em] text-[11px] font-sans md:text-[14px] font-normal mb-2 opacity-90">
              London's #1 Room Rental Agency
            </p>

            {/* Stars Rating */}
            <div className="flex items-center gap-1.5 mb-4">
                <span className="text-xl font-thin text-white">(</span>

                <div className="flex items-center text-white gap-1">
                    ★★★★★
                </div>

                <span className="text-xl font-thin text-white">)</span>
            </div>

            <h1 className="text-[34px] md:text-[55px] font-sans font-bold leading-[1.1] mb-5">
                Find  <span className="text-[#F47C3C]"> Affordable  </span>
                <span className="text-[#F47C3C]">Rooms</span> <br className="hidden md:block" />for Room Rent in London
            </h1>
            
            {/* Description Text */}
            <p className="text-[14px] md:text-lg font-light font-sans opacity-90 max-w-82 md:max-w-lg mx-auto leading-relaxed">
              Browse verified room listings across London's top neighborhoods. Short-term, long-term, bills included — your perfect room is one search away.
            </p>
            
            {/* Slider Dots */}
            <div className="flex gap-2.5 mt-8" aria-hidden="true">
              {bgImages.map((_, idx) => (
                <span 
                  key={idx}
                  className={`transition-all duration-300 rounded-full ${
                    currentBg === idx ? 'w-2.5 h-2.5 bg-[#F68B51]' : 'w-2 h-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* FLOATING SEARCH BAR */}
        <Searchbar />
      </section>
      
      <div className="hidden md:block h-37.5 bg-white"></div>
    </>
  );
};

export default HeroSection;