"use client"
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

const Searchbar = () => {
    const API_KEY = process.env.NEXT_PUBLIC_LOCATIONIQ_KEY;
    const [price, setPrice] = useState(800);
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const router = useRouter();

    const [filters, setFilters] = useState({
        search: "",
        lat: "",
        lng: "",
        date: "",
        roomType: "",
        minPrice: "",
        maxPrice: "",
    });

    const debounceRef = useRef(null);

    const roomTypes = [
        "single",
        "double",
        "ensuite",
        "ensuite_double",
        "studio",
    ];

    // 🔍 HANDLE LOCATION INPUT
    const handleLocationChange = (e) => {
      const value = e.target.value;

      setFilters((prev) => ({
        ...prev,
        search: value,
        lat: "",
        lng: "",
      }));

      clearTimeout(debounceRef.current);

      if (value.length < 2) { 
        setSuggestions([]);
        setShowHint(true);
        return;
      }

      setShowHint(false);

      debounceRef.current = setTimeout(async () => {
        try {
          setLoadingSuggestions(true);

          const res = await fetch(
            `https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${value}&format=json&limit=10&countrycodes=gb`
          );

          const data = await res.json();

          // ✅ FORMAT + DEDUP HERE
          const seen = new Set();
          const unique = [];

          data.forEach((place) => {
            const formatted = formatLocation(place);

            if (!seen.has(formatted)) {
              seen.add(formatted);
              unique.push({
                ...place,
                formatted,
              });
            }
          });

          setSuggestions(unique);
        } catch (err) {
          console.log("Autocomplete error:", err);
        } finally {
          setLoadingSuggestions(false);
        }
      }, 400);
    };

    // 📍 SELECT SUGGESTION
    const handleSelect = (place) => {
      const a = place.address || {};
      const prefix = getPostcodePrefix(a.postcode);

      setFilters((prev) => ({
        ...prev,
        search: prefix || place.formatted || "", 
        lat: place.lat,
        lng: place.lon,
      }));

      setSuggestions([]);
      setShowHint(false);
    };

  const getPostcodePrefix = (postcode) => {
    if (!postcode) return null;
    return postcode.split(" ")[0]; 
  };

  const formatLocation = (place) => {
    const a = place.address || {};
    const prefix = getPostcodePrefix(a.postcode);

    if (prefix) return prefix;

    if (a.suburb && a.city) return `${a.suburb}, ${a.city}`;
    if (a.city) return a.city;

    return place.display_name.split(",")[0];
  };

    // 🔍 SEARCH BUTTON CLICK
    const handleSearch = () => {
      let queryObj = {
        ...filters,
        minPrice: filters.minPrice || 0,
        maxPrice: filters.maxPrice || price,
      };

      // remove empty values
      Object.keys(queryObj).forEach(
        (key) =>
          (queryObj[key] === "" || queryObj[key] === null) &&
          delete queryObj[key]
      );

      const query = new URLSearchParams(queryObj).toString();

      router.push(`/find-a-room?${query}`);
    };

  return (
    <div className="relative md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 w-full max-w-262.5 px-5 z-20 mt-10 md:mt-0">
          <div className="bg-white rounded-3xl shadow-2xl overflow-visible">
            
            {/* Header Title instead of Tabs */}
            <div className="flex px-4 md:px-10 border-b border-gray-100">
              <span className="py-4 md:py-6 font-bold uppercase text-[10px] md:text-[13px] tracking-widest border-b-2 border-[#F68B51] text-[#F68B51]">
                Search By Location
              </span>
            </div>

            <div className="p-5 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-12 gap-4 items-end">
                <div className="col-span-2 md:col-span-3 relative z-50">
                  <label htmlFor="location" className="flex items-center gap-1.5 text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">
                    <span className="md:hidden text-[#E45D5D]">📍</span> WHERE ARE YOU LOOKING?
                  </label>
                  <input 
                    id="location"
                    value={filters.search}
                    onChange={handleLocationChange} 
                    type="text" 
                    placeholder="Enter Postcode..." 
                    className="w-full border border-gray-100 rounded-xl py-3 px-4 text-[13px] focus:outline-none focus:border-[#F68B51] bg-[#F9F9F9] md:bg-transparent" 
                  />
                    {(filters.search.length > 0 &&
                      (showHint || loadingSuggestions || suggestions.length > 0)) && (
                        <div className="absolute top-full left-0 w-full bg-white shadow rounded-lg z-50 mt-1">

                        {showHint && (
                          <div className="p-2 text-sm text-gray-500">
                            Enter at least 2 characters
                          </div>
                        )}

                        {loadingSuggestions && (
                          <div className="p-2 text-sm text-gray-500">
                            Searching...
                          </div>
                        )}

                        {suggestions.map((place, i) => (
                            <div
                            key={i}
                            onClick={() => handleSelect(place)}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                            {place.formatted}
                            </div>
                        ))}
                        </div>
                    )}
                </div>
                <div className="col-span-1 md:col-span-3">
                  <label htmlFor="date" className="flex items-center gap-1.5 text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">
                    <span className="md:hidden">📅</span> FROM DATE
                  </label>
                  <input 
                    id="date"
                    type="date" 
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            date: e.target.value,
                        }))
                    }
                    className="w-full border border-gray-100 rounded-xl py-3 px-4 text-[13px] focus:outline-none focus:border-[#F68B51] bg-[#F9F9F9] md:bg-transparent" 
                  />
                </div>
                <div className="col-span-1 md:col-span-3">
                  <label htmlFor="roomType" className="flex items-center gap-1.5 text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">
                    <span className="md:hidden">🛋️</span> ROOM TYPE
                  </label>
                  <select 
                    id="roomType"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            roomType: e.target.value,
                        }))
                    } 
                    className="w-full border border-gray-100 rounded-xl py-3 px-4 text-[13px] text-gray-500 focus:outline-none focus:border-[#F68B51] bg-[#F9F9F9] md:bg-transparent"
                  >
                    <option value="">Any</option>
                    {roomTypes.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="hidden md:block md:col-span-3">
                  <button onClick={handleSearch} className="w-full bg-[#F68B51] hover:bg-[#e87a3e] text-white font-bold py-[13.5px] rounded-xl shadow-lg uppercase text-[11px] md:text-[15px] tracking-widest transition-colors">
                    Search Rooms
                  </button>
                </div>
              </div>

              {/* MOBILE PRICE RANGE */}
              <div className="mt-6 pt-4 border-t border-gray-50 md:hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-[#B1B1B1] uppercase tracking-wider">Adjust Price</span>
                  <span className="text-[14px] font-extrabold text-[#2A3971]">£{price} PM</span>
                </div>
                <div className="relative h-1.5 bg-gray-100 rounded-full mb-2">
                  <div className="absolute h-full bg-[#F68B51] rounded-full" style={{ width: `${(price / 1500) * 100}%` }}></div>
                  <input 
                    type="range" min="0" max="1500" step="10" 
                    value={price} 
                    onChange={(e) => {
                    const value = Number(e.target.value);
                    setPrice(value);

                    setFilters((prev) => ({
                        ...prev,
                        maxPrice: value,
                    }));
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-[3.5px] border-[#F68B51] rounded-full shadow-md pointer-events-none" 
                    style={{ left: `calc(${(price / 1500) * 100}% - 10px)` }}
                  ></div>
                </div>
              </div>

              {/* DESKTOP PRICE SLIDER */}
              <div className="hidden md:block mt-8">
                <div className="flex justify-between text-[10px] font-bold text-[#B1B1B1] mb-3 uppercase tracking-tighter">
                  <span>£0 PM</span>
                  <span className="text-[#F68B51]">Selected: £{price} PM</span>
                  <span>£1,500 PM</span>
                </div>
                <div className="relative h-1 bg-gray-100 rounded-full">
                  <div className="absolute h-full bg-[#F68B51] rounded-full" style={{ width: `${(price / 1500) * 100}%` }}></div>
                  <input 
                    type="range" min="0" max="1500" 
                    value={price} 
                    onChange={(e) => {
                    const value = Number(e.target.value);
                    setPrice(value);

                    setFilters((prev) => ({
                        ...prev,
                        maxPrice: value,
                    }));
                    }}
                    className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer z-10" 
                  />
                </div>
              </div>

              {/* MOBILE SEARCH BUTTON */}
              <div className="md:hidden mt-6">
                <button onClick={handleSearch} className="w-full bg-[#F68B51] text-white font-bold py-4 rounded-xl shadow-lg uppercase text-[12px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <span className="text-lg">🔍</span> SEARCH ROOMS
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Searchbar