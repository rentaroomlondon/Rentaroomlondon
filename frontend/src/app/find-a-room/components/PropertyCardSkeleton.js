"use client";
import React from "react";

const PropertyCardSkeleton = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm animate-pulse">
      
      {/* FLEX WRAPPER → switches layout automatically */}
      <div className="flex flex-col md:flex-row">

        {/* LEFT IMAGE (desktop) / TOP IMAGE (mobile) */}
        <div className="w-full md:w-[320px] h-[240px] md:h-auto bg-gray-200" />

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">

          <div>
            {/* TITLE */}
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>

            {/* LOCATION */}
            <div className="h-3 w-2/3 bg-gray-200 rounded mb-4"></div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-14 bg-gray-200 rounded-full hidden md:block"></div>
            </div>

            {/* DESCRIPTION – only visible on desktop (matches your real card) */}
            <div className="hidden md:block space-y-2 mb-6">
              <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
              <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* PRICE + BUTTONS */}
          <div className="flex items-center justify-between mt-4">

            {/* PRICE */}
            <div>
              <div className="h-5 w-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* BTNS */}
            <div className="flex gap-2">
              <div className="h-9 w-9 bg-gray-200 rounded-xl"></div>
              <div className="h-9 w-24 bg-gray-200 rounded-xl"></div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;