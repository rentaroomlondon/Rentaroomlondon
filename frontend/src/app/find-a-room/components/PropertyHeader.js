"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  Bus,
} from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_LOCATIONIQ_KEY;

const PropertyHeader = ({ filters, setFilters, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const debounceRef = useRef(null);

  // 🔍 LOCATION INPUT WITH DEBOUNCE
  const handleLocationChange = (e) => {
    const value = e.target.value;

    setFilters((prev) => ({
      ...prev,
      search: value,
      lat: "",
      lng: "",
    }));

    clearTimeout(debounceRef.current);

    if (value.length < 2) { // 👈 allow NW typing
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

  // 📍 SELECT LOCATION
  const handleSelect = (place) => {

    const a = place.address || {};

    const prefix = getPostcodePrefix(a.postcode);

    const isCity =
        a.city ||
        a.town ||
        a.county;

    setFilters(prev => ({

        ...prev,

        search:
            prefix ||
            a.city ||
            a.town ||
            place.formatted ||
            "",


        // only postcode gets geo

        lat:
            prefix
                ? place.lat
                : "",


        lng:
            prefix
                ? place.lon
                : ""

    }));


    setSuggestions([]);

    setShowHint(false);

  };

  const handleAllProperties = () => {

    setFilters({
        search: "",
        lat: "",
        lng: "",
        minPrice: "",
        maxPrice: "",
        roomType: "",
        occupancy: "",
        furnished: "",
        date: "",
    });

    setSuggestions([]);
    setShowHint(false);

    // fetch all listings
    onSearch({
        search: "",
        lat: "",
        lng: "",
        minPrice: "",
        maxPrice: "",
        roomType: "",
        occupancy: "",
        furnished: "",
        date: "",
    });
  };

  // ❌ CLOSE DROPDOWN OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".price-dropdown")) {
        setShowPrice(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getPostcodePrefix = (postcode) => {
    if (!postcode) return null;
    return postcode.split(" ")[0]; // NW2 1LX → NW2
  };

  const formatLocation = (place) => {
    const a = place.address || {};
    const prefix = getPostcodePrefix(a.postcode);

    // 🎯 PRIORITY: postcode prefix
    if (prefix) return prefix;

    if (a.suburb && a.city) return `${a.suburb}, ${a.city}`;
    if (a.city) return a.city;

    return place.display_name.split(",")[0];
  };


  return (
    <header className="w-full font-sans">

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">

        {/* TOP BAR */}
        <div className="bg-[#0f172a] py-5 px-12">
          <div className="max-w-350 mx-auto flex gap-10 text-[10px] font-black text-[#94a3b8] uppercase">
            <div
                onClick={handleAllProperties}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition"
            >
                <MapPin className="w-4 h-4 text-red-500" />
                All Properties
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              30 min travel
            </div>
            <div className="flex items-center gap-2">
              <Bus className="w-5 h-5 text-yellow-400" />
              Public transport
            </div>
          </div>
        </div>

        {/* SEARCH AREA */}
        <div className="bg-[#1e293b] py-8 px-12">
          <div className="max-w-350 mx-auto flex items-center justify-between">

            <div className="flex gap-3 grow max-w-275">

              {/* LOCATION */}
              <div className="relative flex-[1.5]">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />

                <input
                  value={filters.search}
                  onChange={handleLocationChange}
                  placeholder="Enter Postcode..."
                  className="w-full bg-[#2a3645] border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white"
                />

                {(filters.search.length > 0 &&
                (showHint || loadingSuggestions || suggestions.length > 0)) && (
                  <div className="absolute top-full left-0 w-full bg-white text-black rounded-lg shadow-lg mt-1 z-50">

                    {showHint && (
                      <div className="p-3 text-sm text-gray-500">
                        Enter at least 2 characters
                      </div>
                    )}

                    {loadingSuggestions && (
                      <div className="p-3 flex items-center gap-2 text-sm text-gray-500">
                        <span className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></span>
                        Searching...
                      </div>
                    )}

                    {!loadingSuggestions &&
                      suggestions.map((place, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelect(place)}
                          className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          {place.formatted}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* DATE */}
              <input
                type="date"
                value={filters.date || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="flex-1 bg-[#2a3645] border border-gray-700 rounded-lg px-4 text-white"
              />

              {/* ROOM TYPE */}
              <select
                value={filters.roomType}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    roomType: e.target.value,
                  }))
                }
                className="flex-1 bg-[#2a3645] border border-gray-700 rounded-lg px-4 text-white"
              >
                <option value="">Any Room</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="ensuite">Ensuite</option>
                <option value="studio">Studio</option>
              </select>

              {/* PRICE */}
              <div className="relative flex-1 price-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPrice(!showPrice);
                  }}
                  className="w-full bg-[#2a3645] border border-gray-700 rounded-lg py-3 px-4 text-white flex justify-between"
                >
                  {filters.minPrice || filters.maxPrice
                    ? `£${filters.minPrice || 0} - £${filters.maxPrice || "∞"}`
                    : "Price"}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showPrice && (
                  <div className="absolute top-full left-0 w-full bg-white p-4 rounded-lg shadow-lg mt-2 z-50">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice || ""}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            minPrice: e.target.value,
                          }))
                        }
                        className="w-1/2 border px-2 py-2"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ""}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            maxPrice: e.target.value,
                          }))
                        }
                        className="w-1/2 border px-2 py-2"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setShowPrice(false);
                        onSearch();
                      }}
                      className="mt-3 w-full bg-[#FF7A45] text-white py-2 rounded"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SEARCH BTN */}
            <button
              onClick={onSearch}
              className="bg-[#FF7A45] px-6 py-3 rounded-xl text-white ml-4"
            >
              <Search />
            </button>

          </div>
        </div>
      </div>

      {/* ================= MOBILE (UNCHANGED DESIGN) ================= */}
      <div className="lg:hidden p-4 space-y-3 bg-[#111c2a]">

        <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />

            <input
                value={filters.search}
                onChange={handleLocationChange}
                placeholder="Enter postcode..."
                className="w-full bg-[#1b2a3d] rounded-xl py-4 pl-10 text-white"
            />

            {(filters.search.length > 0 &&
                (showHint || loadingSuggestions || suggestions.length > 0)) && (
                <div className="absolute top-full left-0 w-full bg-white text-black rounded-xl shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">

                {showHint && (
                    <div className="p-3 text-sm text-gray-500">
                    Enter at least 2 characters
                    </div>
                )}

                {loadingSuggestions && (
                    <div className="p-3 flex items-center gap-2 text-sm text-gray-500">
                    <span className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></span>
                    Searching...
                    </div>
                )}

                {!loadingSuggestions &&
                    suggestions.map((place, i) => (
                    <div
                        key={i}
                        onClick={() => handleSelect(place)}
                        className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                        {place.formatted}
                    </div>
                    ))}
                </div>
            )}
            </div>

        <div className="flex gap-2">
          <input
            type="date"
            value={filters.date || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            className="flex-1 bg-[#1b2a3d] rounded-xl px-3 py-3 text-white"
          />

          <select
            value={filters.roomType}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                roomType: e.target.value,
              }))
            }
            className="flex-1 bg-[#1b2a3d] rounded-xl px-3 py-3 text-white"
          >
            <option value="">Room</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="ensuite">Ensuite</option>
          </select>

          <button
            onClick={onSearch}
            className="bg-[#FF7A45] min-w-12 h-12 flex items-center justify-center rounded-xl text-white"
            >
            <Search size={20} />
          </button>
        </div>

        {/* PRICE */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min £"
            value={filters.minPrice || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: e.target.value,
              }))
            }
            className="w-1/2 bg-[#1b2a3d] rounded-xl px-3 py-3 text-white"
          />

          <input
            type="number"
            placeholder="Max £"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: e.target.value,
              }))
            }
            className="w-1/2 bg-[#1b2a3d] rounded-xl px-3 py-3 text-white"
          />
        </div>

      </div>
    </header>
  );
};

export default PropertyHeader;