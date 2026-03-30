import React from "react";

const PropertyCardSkeleton = () => {
  return (
    <div className="max-w-[400px] w-full bg-white rounded-2xl overflow-hidden shadow animate-pulse">
      
      {/* Image Skeleton */}
      <div className="relative h-[240px] w-full bg-gray-100">
        <div className="absolute top-4 left-4 w-20 h-6 bg-gray-200 rounded" />
        <div className="absolute top-4 right-4 w-16 h-10 bg-gray-200 rounded-lg" />
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-gray-200 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        
        <div className="flex gap-2 items-center">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-100 rounded" />
        </div>

        <div className="h-5 w-3/4 bg-gray-200 rounded" />

        <div className="h-4 w-1/2 bg-gray-100 rounded" />

        <div className="h-4 w-1/3 bg-gray-200 rounded" />

        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-5/6 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;