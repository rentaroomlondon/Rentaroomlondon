"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown
} from "lucide-react";
import PropertyHeader from "./PropertyHeader";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";


const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function PropertySearchPage() {
  const searchParams = useSearchParams();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // ✅ DEFINE FIRST (IMPORTANT)
  const [filters, setFilters] = useState({
    search: "",
    lat: "",
    lng: "",
    radius: 5,
    roomType: "",
    date: "",
    minPrice: "",
    maxPrice: "",

    // ✅ ADD THIS
    start: "",
    travelLat: "",
    travelLng: "",
    maxTime: "",
    transport: "",
  });

  // ===============================
  // ✅ LOAD FROM URL
  // ===============================
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    const newFilters = {
      search: params.search || "",
      lat: params.lat || "",
      lng: params.lng || "",
      radius: params.radius || 5,
      roomType: params.roomType || "",
      date: params.date || "",
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",

      // ✅ ADD
      start: params.start || "",
      travelLat: params.travelLat || "",
      travelLng: params.travelLng || "",
      maxTime: params.maxTime || "",
      transport: params.transport || "",
    };

    setFilters(newFilters);
    fetchListings(newFilters); // ✅ ALWAYS fetch
  }, [searchParams]);

  // ===============================
  // ✅ FETCH FUNCTION
  // ===============================
  const fetchListings = async (customFilters = filters) => {
    try {
      setLoading(true);

      let queryObj = { ...customFilters };

      // ❌ remove empty fields
      Object.keys(queryObj).forEach(
        (key) =>
          (queryObj[key] === "" || queryObj[key] === null) &&
          delete queryObj[key]
      );

      // ❌ remove geo if missing
      if (!queryObj.lat || !queryObj.lng) {
        delete queryObj.lat;
        delete queryObj.lng;
      }

      const query = new URLSearchParams(queryObj).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/search?${query}`
      );

      const data = await res.json();
      setRooms(data.listings || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-white font-sans">

      <PropertyHeader
        filters={filters}
        setFilters={setFilters}
        onSearch={() => fetchListings()}
      />

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[65%] p-4 lg:p-8">
          <div className="max-w-237.5 mx-auto">

            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl lg:text-2xl font-bold text-[#111827]">
                <span className="text-[#FF7A45]">{rooms.length}</span> Rooms in{" "}
                <span className="capitalize">
                  {filters.search?.split(",")[0] || "London"}
                </span>
              </h1>

              <button className="flex items-center gap-1 border px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600">
                Sort <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="block lg:hidden w-full h-75 mb-5">
              <MapView listings={rooms} />
            </div>

            <div className="space-y-6">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))
              ) : rooms.length === 0 ? (
                <div className="text-center py-20">
                  <h2 className="text-xl font-semibold text-gray-700">
                    No Property Found
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters or search location.
                  </p>
                </div>
              ) : (
                rooms.map((room) => (
                  <PropertyCard key={room._id} data={room} />
                ))
              )}
            </div>

          </div>
        </div>

        <div className="hidden lg:block lg:flex-1 h-[calc(100vh-120px)] sticky top-30">
          <MapView listings={rooms} />
        </div>
      </div>
    </div>
  );
}