"use client"
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

const Searchbar = () => {
    const API_KEY = process.env.NEXT_PUBLIC_LOCATIONIQ_KEY;
      const [price, setPrice] = useState(800);
      const [activeTab, setActiveTab] = useState('location');
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

    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

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

        if (value.length < 3) {
        setSuggestions([]);
        return;
        }

        debounceRef.current = setTimeout(async () => {
        try {
            setLoading(true);

            const res = await fetch(
            `https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${value}&format=json&limit=5&countrycodes=gb`
            );

            const data = await res.json();

            // ✅ STRICT FILTER (postcode + place only)
            const filtered = data.filter(
            (item) =>
                item.type === "postcode" ||
                item.type === "city" ||
                item.type === "suburb"
            );

            setSuggestions(filtered);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
        }, 400);
    };

    // 📍 SELECT SUGGESTION
    const handleSelect = (place) => {
        setFilters((prev) => ({
        ...prev,
        search: place.display_name,
        lat: place.lat,
        lng: place.lon,
        }));

        setSuggestions([]);
    };

    // 🔍 SEARCH BUTTON CLICK
    const handleSearch = () => {
        const queryObj = {
            ...filters,
            minPrice: filters.minPrice || 0,
            maxPrice: filters.maxPrice || price, // slider fallback
        };

        // ❌ remove empty values
        Object.keys(queryObj).forEach(
            (key) => (queryObj[key] === "" || queryObj[key] === null) && delete queryObj[key]
        );

        const query = new URLSearchParams(queryObj).toString();

        router.push(`/find-a-room?${query}`);
    };

  return (
    <div className="relative md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 w-full max-w-[1050px] px-5 z-20 mt-10 md:mt-0">
          <div className="bg-white rounded-[24px] shadow-2xl overflow-visible">
            
            {/* Tabs */}
            <div className="flex px-4 md:px-10 border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('location')}
                className={`flex-1 md:flex-none py-4 md:py-6 font-bold uppercase text-[10px] md:text-[13px] tracking-widest border-b-2 transition-all ${
                  activeTab === 'location' ? 'text-[#F68B51] border-[#F68B51]' : 'text-[#B1B1B1] border-transparent'
                }`}
              >
                By Location
              </button>
              <button 
                onClick={() => setActiveTab('travel')}
                className={`flex-1 md:flex-none py-4 md:py-6 font-bold uppercase text-[10px] md:text-[13px] tracking-widest border-b-2 transition-all md:ml-10 ${
                  activeTab === 'travel' ? 'text-[#F68B51] border-[#F68B51]' : 'text-[#6B7280] border-transparent'
                }`}
              >
                Travel Time
              </button>
            </div>

            <div className="p-5 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-12 gap-4 items-end">
                {activeTab === 'location' ? (
                  <>
                    <div className="col-span-2 md:col-span-3 relative z-50">
                      <label className="flex items-center gap-1.5 text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">
                        <span className="md:hidden text-[#E45D5D]">📍</span> WHERE ARE YOU LOOKING?
                      </label>
                      <input 
                        value={filters.search}
                        onChange={handleLocationChange} 
                        type="text" 
                        placeholder="Place, Area, or Postcode..." 
                        className="w-full border border-gray-100 rounded-xl py-3 px-4 text-[13px] focus:outline-none focus:border-[#F68B51] bg-[#F9F9F9] md:bg-transparent" 
                      />
                        {(loading || suggestions.length > 0) && (
                            <div className="absolute top-full left-0 w-full bg-white shadow rounded-lg z-50 mt-1">

                            {loading && (
                                <div className="p-2 text-sm">Searching...</div>
                            )}

                            {suggestions.map((place, i) => (
                                <div
                                key={i}
                                onClick={() => handleSelect(place)}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                {place.display_name}
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                    <div className="col-span-1 md:col-span-3">
                      <label className="flex items-center gap-1.5 text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">
                        <span className="md:hidden">📅</span> FROM DATE
                      </label>
                      <input 
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
                      <label className="flex items-center gap-1.5 text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">
                        <span className="md:hidden">🛋️</span> ROOM TYPE
                      </label>
                      <select 
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                roomType: e.target.value,
                            }))
                        } 
                        className="w-full border border-gray-100 rounded-xl py-3 px-4 text-[13px] text-gray-500 focus:outline-none focus:border-[#F68B51] bg-[#F9F9F9] md:bg-transparent"
                      >
                        <option>Any</option>
                        {roomTypes.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-2 md:col-span-3">
                      <label className="flex items-center gap-1.5 text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">
                        <span className="md:hidden text-[#E45D5D]">🚩</span> START POINT
                      </label>
                      <input type="text" placeholder="Work/University..." className="w-full border border-gray-100 rounded-xl py-3 px-4 text-[13px] focus:outline-none focus:border-[#F68B51] bg-[#F9F9F9] md:bg-transparent" />
                    </div>
                    <div className="col-span-1 md:col-span-3">
                      <label className="block text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">MAX TIME</label>
                      <select className="w-full border border-gray-100 rounded-xl py-3 px-4 text-[13px] text-gray-500 focus:outline-none focus:border-[#F68B51] bg-[#F9F9F9] md:bg-transparent">
                        <option>30 Mins</option>
                        <option>45 Mins</option>
                      </select>
                    </div>
                    <div className="col-span-1 md:col-span-3">
                      <label className="block text-[10px] md:text-[13px] font-bold text-[#6B7280] uppercase mb-2 tracking-wider">TRANSPORT</label>
                      <select className="w-full border border-gray-100 rounded-xl py-3 px-4 text-[13px] text-gray-500 focus:outline-none focus:border-[#F68B51] bg-[#F9F9F9] md:bg-transparent">
                        <option>🚆 Public</option>
                        <option>🚲 Cycling</option>
                      </select>
                    </div>
                  </>
                )}

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
                <button  onClick={handleSearch} className="w-full bg-[#F68B51] text-white font-bold py-4 rounded-xl shadow-lg uppercase text-[12px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <span className="text-lg">🔍</span> SEARCH ROOMS
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Searchbar
