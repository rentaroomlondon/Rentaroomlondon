// components/OfficeSection.js
import React from 'react';

const Office = () => {
  return (
    <section className="w-full bg-white py-16 px-6 sm:px-10 lg:px-24">
      <div className="mx-auto flex flex-col lg:flex-row items-start lg:items-center max-w-7xl md:gap-10">
        {/* Left Side: Contact Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4">
          {/* Heading */}
        
          <h2 className="text-2xl sm:text-[24.28px] font-extrabold font-sans text-[#2C3E50] flex items-center gap-2 sm:gap-3 pb-2">
            📍 Office
          </h2>
          
          {/* Address & Contact */}
          <p className="text-[15px] sm:text-[15.45px] text-gray-500">
            118 Cricklewood Broadway, NW2 3EJ
          </p>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 sm:gap-3 text-[#2C3E50] font-bold">
              📞 020 7790 5577
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-500">
              ✉️ info@rentaroomlondon.co.uk
            </div>
          </div>

          {/* Opening Hours */}
          <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider my-1">
            Opening Hours
          </h3>
          <div className="flex flex-col gap-2 sm:gap-2 text-[14px] sm:text-[15.45px] max-w-170">
            <div className="flex justify-between">
              <span>Mon–Fri</span>
              <span>10:00 – 6:00</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>11:00 – 5:00</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="w-full lg:w-1/2 h-80 sm:h-90 relative rounded-xl overflow-hidden border border-gray-200 mt-1 lg:mt-0">
          <iframe
            title="Cricklewood Office Map"
            src="https://www.google.com/maps?q=118+Cricklewood+Broadway,+NW2+3EJ&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="absolute inset-0"
          ></iframe>

          {/* Centered Marker Overlay */}
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF7E45] text-white px-3 sm:px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-lg whitespace-nowrap">
            📍 NestFinder — Stepney Green, E1
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Office;