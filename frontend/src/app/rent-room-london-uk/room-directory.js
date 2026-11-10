"use client";
import { hideDoorNumber } from "@/app/utils/formatAddress";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BedDouble, ChevronDown, MapPin, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/app/Shared/PropertyCard";
import PropertyCardSkeleton from "@/app/Shared/PropertyCardSkeleton";
import { areaNameForPostcode, areaSlug, postcodeAliases, postcodeByArea, postcodeDistrictFromValue, postcodesForArea } from "./directory-areas";
import "./room-directory.css";

const roomFilters = ["Single", "Double", "Ensuite", "Ensuite Double", "Studio"];
const emptyAreaNames = {};
let roomDirectoryCache = null;
let roomDirectoryCacheTime = 0;
let roomDirectoryRequest = null;
const regionOrder = ["East London", "North London", "South London", "West London", "Central London", "Other locations"];
const knownAreas = Object.entries(postcodeByArea).flatMap(([area, postcodes]) => postcodes.map((postcode) => [postcode, area]));
const areaDescriptions = { Hackney: "Find rooms in Hackney, close to Dalston, London Fields and the East London transport network.", Stratford: "Explore rooms in Stratford near the Elizabeth Line, Queen Elizabeth Olympic Park and Leyton.", "Canary Wharf": "Browse rooms around Canary Wharf, with easy access to the Isle of Dogs and the Elizabeth Line.", Camden: "Find a room in Camden near King's Cross, Regent's Park and central London connections.", London: "Browse rooms across London, from East London neighbourhoods to central and south London." };
const first = (...values) => values.find((value) => value !== undefined && value !== null && value !== "");
const priceOf = (room) => Number(first(room.monthlyPrice, room.price, room.rent, 0));
const locationOf = (room) => [hideDoorNumber(room.location?.address), room.location?.postcode, room.location?.city].filter(Boolean).join(", ");
const normalizePostcode = (room) => String(room.location?.postcode || "").toUpperCase().replace(/\s/g, "");
const postcodeDistrict = (room) => postcodeDistrictFromValue(normalizePostcode(room));
const areaDetails = (room, postcodeAreas = {}) => {
  const postcode = normalizePostcode(room);
  const district = postcodeDistrict(room);
  const address = `${room.location?.address || ""} ${room.title || ""}`;
  const known = Object.keys(postcodeByArea).find((name) => new RegExp(`\\b${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\b`, "i").test(address))
    || postcodeAreas[district]?.area
    || knownAreas.find(([prefix]) => postcode.startsWith(prefix))?.[1];
  const city = String(room.location?.city || "").trim();
  const area = known || (city && !/^(greater )?london$/i.test(city) ? city : district ? areaNameForPostcode(district) : city || "London");
  const prefix = district.match(/^[A-Z]+/)?.[0] || "";
  const region = ({ E: "East London", SE: "South London", SW: "South London", NW: "North London", N: "North London", EC: "Central London", WC: "Central London", W: "West London", HA: "North London" })[prefix]
    || (/^(greater )?london$/i.test(city) ? "Central London" : city ? "Other locations" : "Central London");
  return { area, region };
};
const buildAreaGroups = (rooms, postcodeAreas) => {
  const areasByRegion = new Map();
  for (const room of rooms) {
    const { area, region } = areaDetails(room, postcodeAreas);
    if (postcodeDistrictFromValue(area) && areaNameForPostcode(area) === area && !postcodeAreas[area]?.area) continue;
    if (!areasByRegion.has(region)) areasByRegion.set(region, new Set());
    areasByRegion.get(region).add(area);
  }
  const groups = regionOrder.map((title) => ({ title, areas: [...(areasByRegion.get(title) || [])].sort((a, b) => a.localeCompare(b)) }));
  return [{ title: "All London", areas: [...new Set(groups.flatMap((group) => group.areas))].sort((a, b) => a.localeCompare(b)) }, ...groups];
};
const roomIsInArea = (room, area, areaGroups, city = "", postcodeAreas = {}) => {
  const roomCity = String(room.location?.city || "").trim();
  const isLondonListing = areaDetails(room, postcodeAreas).region !== "Other locations";
  if (area === "All UK") return true;
  if (city && city.toLowerCase() !== "london") {
    if (roomCity.toLowerCase() !== city.toLowerCase()) return false;
  } else if (city.toLowerCase() === "london" && !isLondonListing) {
    return false;
  }
  if (!area || area === "London" || area === "All London" || area === city) return true;
  const normalizedArea = area.toUpperCase().replace(/\s/g, "");
  if (/^[A-Z]{1,2}\d{1,2}[A-Z]?$/.test(normalizedArea)) {
    return normalizePostcode(room).startsWith(normalizedArea);
  }
  const group = areaGroups.find((item) => item.title === area);
  if (group && area !== "All London") {
    return group.areas.includes(areaDetails(room, postcodeAreas).area);
  }
  return areaDetails(room, postcodeAreas).area === area;
};
const roomMatchesFilter = (room, filter) => {
  const types = { Single: "single", Double: "double", Ensuite: "ensuite", "Ensuite Double": "ensuite_double", Studio: "studio" };
  return room.roomType === types[filter];
};
const regionForArea = (area, areaGroups) => areaGroups.find((group) => group.title === area)?.title || areaGroups.find((group) => group.title !== "All London" && group.areas.includes(area))?.title || "All London";

const areaFromSlug = (slug) => {
  const normalized = areaSlug(decodeURIComponent(slug || ""));
  if (normalized === "all-uk") return "All UK";
  const postcode = postcodeDistrictFromValue(normalized);
  if (postcode) return postcode;
  return Object.keys(postcodeByArea).find((name) => areaSlug(name) === normalized) || (normalized ? normalized.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") : "");
};
const roomTypeApiValue = { Single: "single", Double: "double", Ensuite: "ensuite", "Ensuite Double": "ensuite_double", Studio: "studio" };
const roomTypeSlugPrefix = {
  Single: "single-rooms-to-rent-in-",
  Double: "double-rooms-to-rent-in-",
  Ensuite: "ensuite-rooms-to-rent-in-",
  "Ensuite Double": "ensuite-double-rooms-to-rent-in-",
  Studio: "studio-rooms-to-rent-in-",
};
const seoDirectoryPath = (area, filter, city) => {
  const location = areaSlug(area || city || "London");
  const type = roomTypeSlugPrefix[filter];
  if (type) return `/rent-room-london-uk/${type}${location}`;
  return location === "london"
    ? "/rent-room-london-uk/london"
    : locationDirectoryPath(area);
};
const locationDirectoryPath = (area, postcodeAreas = {}) => {
  if (regionOrder.includes(area)) return `/rent-room-london-uk/${areaSlug(area)}`;
  const dynamicPostcode = Object.entries(postcodeAreas)
    .find(([, location]) => location.area?.toLowerCase() === area.toLowerCase())?.[0];
  const postcode = postcodesForArea(area)[0] || dynamicPostcode;
  if (postcodeAliases[area]) {
    return `/rent-room-london-uk/${areaSlug(area)}-${postcode.toLowerCase()}`;
  }
  if (!postcode && postcodeDistrictFromValue(area)) {
    return `/rent-room-london-uk/${areaSlug(postcodeDistrictFromValue(area))}`;
  }
  return postcode
    ? `/rent-room-london-uk/${areaSlug(area)}-${postcode.toLowerCase()}`
    : `/rent-room-london-uk/london/london-${areaSlug(area)}`;
};

const directoryFilterUrl = (endpoint, area, selected, city = "", postcodeAreas = {}) => {
  const params = new URLSearchParams();
  if (roomTypeApiValue[selected]) params.set("roomType", roomTypeApiValue[selected]);
  if (city && city.toLowerCase() !== "london") params.set("city", city);
  if (regionOrder.includes(area)) params.set("region", area);
  else if (area !== "London" && (postcodesForArea(area).length || Object.entries(postcodeAreas).some(([, location]) => location.area?.toLowerCase() === area.toLowerCase()))) {
    const areaPostcodes = postcodesForArea(area).length
      ? postcodesForArea(area)
      : Object.entries(postcodeAreas).filter(([, location]) => location.area?.toLowerCase() === area.toLowerCase()).map(([postcode]) => postcode);
    params.set("postcodes", areaPostcodes.join(","));
  }
  else if (area !== "London" && postcodeDistrictFromValue(area)) params.set("postcodes", postcodeDistrictFromValue(area));
  else if (area !== "London" && area !== city && area !== "All UK") params.set("area", area);
  return `${endpoint}/listings/directory${params.size ? `?${params}` : ""}`;
};

export default function RoomDirectory({ initialLocation = "", initialCity = "", seoPage = null, initialAreaNames = emptyAreaNames }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seoFilter = seoPage?.filter || "";
  const [rooms, setRooms] = useState(() => roomDirectoryCache || []);
  const [postcodeAreas, setPostcodeAreas] = useState(initialAreaNames);
  const [apiRooms, setApiRooms] = useState(null);
  const [apiQueryKey, setApiQueryKey] = useState("");
  const [loading, setLoading] = useState(() => !roomDirectoryCache);
  const [error, setError] = useState(false);
  const [area, setArea] = useState(() => areaFromSlug(initialLocation) || initialCity || "London");
  const [activeRegion, setActiveRegion] = useState("All London");
  const [selected, setSelected] = useState(searchParams.get("filter") || seoFilter);
  const [sort, setSort] = useState("recommended");
  const cityRooms = useMemo(() => {
    if (!initialCity) return rooms;
    if (initialCity.toLowerCase() === "london") {
      return rooms.filter((room) => areaDetails(room).region !== "Other locations");
    }
    return rooms.filter((room) => String(room.location?.city || "").trim().toLowerCase() === initialCity.toLowerCase());
  }, [rooms, initialCity]);
  const areaGroups = useMemo(() => buildAreaGroups(cityRooms, postcodeAreas), [cityRooms, postcodeAreas]);
  const queryKey = `${initialCity}|${area}|${selected}`;

  const updateUrl = useCallback((nextArea, nextFilter) => {
    if (seoPage || nextFilter) {
      router.replace(seoDirectoryPath(nextArea, nextFilter, initialCity), { scroll: false });
      return;
    }
    const params = new URLSearchParams();
    if (nextFilter) params.set("filter", nextFilter);
    const suffix = params.toString() ? `?${params}` : "";
    const citySlug = areaSlug(initialCity || "London");
    const path = nextArea === "All UK"
      ? "/rent-room-london-uk"
      : nextArea === "London"
      ? "/rent-room-london-uk/london"
      : nextArea
      ? locationDirectoryPath(nextArea, postcodeAreas)
      : initialCity ? `/rent-room-london-uk/${citySlug}` : "/rent-room-london-uk";
    router.replace(`${path}${suffix}`, { scroll: false });
  }, [router, initialCity, seoPage, postcodeAreas]);

  useEffect(() => {
    const queryFilter = searchParams.get("filter") || "";
    setSelected(queryFilter || seoFilter);
    if (roomTypeSlugPrefix[queryFilter]) {
      const path = seoDirectoryPath(area, queryFilter, initialCity);
      if (window.location.pathname !== path) router.replace(path, { scroll: false });
    }
  }, [searchParams, seoFilter, area, initialCity, router]);

  useEffect(() => {
    const nextArea = areaFromSlug(initialLocation);
    setArea(nextArea || initialCity || "London");
  }, [initialLocation, initialCity]);

  useEffect(() => {
    setActiveRegion(regionForArea(area, areaGroups));
  }, [area, areaGroups]);

  useEffect(() => {
    setPostcodeAreas((current) => ({ ...current, ...initialAreaNames }));
  }, [initialAreaNames]);

  useEffect(() => {
    let active = true;
    async function loadRooms() {
      if (roomDirectoryCache) {
        setRooms(roomDirectoryCache);
        setLoading(false);
        if (Date.now() - roomDirectoryCacheTime < 60_000) return;
      } else {
        setLoading(true);
      }
      try {
        const endpoint = process.env.NEXT_PUBLIC_API_URL;
        if (!endpoint) throw new Error("Room search service is not configured");
        if (!roomDirectoryRequest) {
          roomDirectoryRequest = fetch(`${endpoint}/listings/directory`)
            .then((response) => {
              if (!response.ok) throw new Error("Could not load rooms");
              return response.json();
            })
            .then((data) => Array.isArray(data.listings) ? data.listings : [])
            .then((listings) => {
              roomDirectoryCache = listings;
              roomDirectoryCacheTime = Date.now();
              return listings;
            })
            .finally(() => { roomDirectoryRequest = null; });
        }
        const listings = await roomDirectoryRequest;
        if (active) {
          setRooms(listings);
          setError(false);
        }
      } catch {
        if (active && !roomDirectoryCache) { setRooms([]); setError(true); }
      } finally { if (active) setLoading(false); }
    }
    loadRooms();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!rooms.length) return undefined;
    const outcodes = [...new Set(rooms
      .map((room) => postcodeDistrict(room))
      .filter((postcode) => postcode && areaNameForPostcode(postcode) === postcode && !postcodeAreas[postcode]))];
    if (!outcodes.length) return undefined;

    const endpoint = process.env.NEXT_PUBLIC_API_URL;
    if (!endpoint) {
      console.error("Room location service is not configured; postcode area names cannot be loaded.");
      return undefined;
    }

    const controller = new AbortController();
    fetch(`${endpoint}/listings/locations?postcodes=${encodeURIComponent(outcodes.join(","))}`, { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.message || "Could not resolve postcode areas");
        return payload;
      })
      .then((payload) => {
        const unresolvedAreas = Object.fromEntries((payload.unresolved || []).map((postcode) => [
          postcode,
          { area: "", outcode: postcode },
        ]));
        setPostcodeAreas((current) => ({ ...current, ...payload.locations, ...unresolvedAreas }));
        if (payload.unresolved?.length) {
          console.error("Some postcode area names could not be resolved:", payload.unresolved);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error("Postcode area lookup failed:", error);
      });
    return () => controller.abort();
  }, [rooms, postcodeAreas]);

  useEffect(() => {
    if (loading || !rooms.length || (area === "London" && !selected)) return undefined;
    const endpoint = process.env.NEXT_PUBLIC_API_URL;
    if (!endpoint) return undefined;
    const controller = new AbortController();
    fetch(directoryFilterUrl(endpoint, area, selected, initialCity, postcodeAreas), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Could not filter rooms");
        return response.json();
      })
      .then((data) => {
        setApiRooms(Array.isArray(data.listings) ? data.listings : []);
        setApiQueryKey(queryKey);
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error("Room filter request failed:", error);
      });
    return () => controller.abort();
  }, [area, selected, loading, rooms.length, queryKey, initialCity, postcodeAreas]);

  const areaRooms = useMemo(() => cityRooms.filter((room) => roomIsInArea(room, area, areaGroups, initialCity, postcodeAreas)), [cityRooms, area, areaGroups, initialCity, postcodeAreas]);
  const filteredRooms = useMemo(() => {
    let result = areaRooms.filter((room) => !selected || roomMatchesFilter(room, selected));
    if (sort === "price-low") result = [...result].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "price-high") result = [...result].sort((a, b) => priceOf(b) - priceOf(a));
    return result;
  }, [areaRooms, selected, sort]);
  const matchingRooms = apiQueryKey === queryKey && Array.isArray(apiRooms)
    ? apiRooms.filter((room) => !selected || roomMatchesFilter(room, selected))
    : filteredRooms;
  const displayedRooms = useMemo(() => {
    if (sort === "price-low") return [...matchingRooms].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "price-high") return [...matchingRooms].sort((a, b) => priceOf(b) - priceOf(a));
    return matchingRooms;
  }, [matchingRooms, sort]);

  const chooseArea = (value) => {
    setArea(value);
    setSelected("");
    setActiveRegion(regionForArea(value, areaGroups));
    updateUrl(value, "");
  };
  const chooseRegion = (group) => {
    setActiveRegion(group.title);
    chooseArea(group.title === "All London" ? "London" : group.title);
  };
  const chooseAreaLink = (event, value) => {
    event.preventDefault();
    setArea(value);
    setSelected("");
    setActiveRegion(regionForArea(value, areaGroups));
    const path = locationDirectoryPath(value, postcodeAreas);
    router.push(path, { scroll: false });
  };
  const displayArea = postcodeDistrictFromValue(area)
    ? postcodeAreas[area]?.area || (areaNameForPostcode(area) === area ? "London" : areaNameForPostcode(area))
    : area;
  const isRegion = initialCity.toLowerCase() === "london" && areaGroups.some((group) => group.title === displayArea);
  const areaLabel = displayArea === "All UK" ? "the UK" : displayArea === initialCity || displayArea === "London" || isRegion ? displayArea : `${displayArea}, ${initialCity || "London"}`;
  const filterHeading = { Single: `Single Rooms to Rent in ${areaLabel}`, Double: `Double Rooms to Rent in ${areaLabel}`, Ensuite: `Ensuite Rooms to Rent in ${areaLabel}`, "Ensuite Double": `Ensuite Double Rooms to Rent in ${areaLabel}`, Studio: `Studio Rooms to Rent in ${areaLabel}` };
  const roomTitleCase = seoPage?.title || (displayArea === "All UK" && !selected
    ? "Rooms to Rent Across the UK"
    : selected ? (filterHeading[selected] || `Rooms to Rent in ${areaLabel}`) : `Rooms to Rent in ${areaLabel}`);
  const description = seoPage?.description || areaDescriptions[displayArea] || `Browse rooms to rent in ${areaLabel}, with nearby areas and transport connections. Compare availability, rent and room details.`;
  const metaTitle = `${roomTitleCase} | Rent a Room London`;
  const metaDescription = seoPage?.description || `${description} ${selected ? `Explore ${selected.toLowerCase()} rooms and current availability.` : `Compare monthly rent, availability and room details.`}`;
  const rentPrices = areaRooms.map(priceOf).filter((price) => price > 0);
  const averageRent = rentPrices.length ? Math.round(rentPrices.reduce((sum, price) => sum + price, 0) / rentPrices.length) : 0;
  const lowestRent = rentPrices.length ? Math.min(...rentPrices) : 0;
  useEffect(() => {
    document.title = metaTitle;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = metaDescription;
  }, [metaTitle, metaDescription]);
  const currentAreaGroup = areaGroups.find((group) => group.title !== "All London" && group.areas.includes(displayArea));
  const relatedAreas = displayArea === "London"
    ? areaGroups[0]?.areas || []
    : currentAreaGroup?.areas.filter((place) => place !== displayArea) || [];
  const areaGroup = areaGroups.find((group) => group.title === displayArea) || areaGroups.find((group) => group.title !== "All London" && group.areas.includes(displayArea));
  return <main className="room-directory">
    <div className="rd-breadcrumb"><Link href="/">Home</Link><span>›</span><a href="#areas">Rooms to rent in {initialCity || "the UK"}</a>{displayArea !== "London" && displayArea !== "All UK" && displayArea !== initialCity && <><span>›</span><span>{displayArea}</span></>}</div>
    <div className="rd-layout">
      <aside className="rd-sidebar" id="areas">
        <div className="rd-side-head"><span>EXPLORE AREAS</span><MapPin size={16}/></div>
        <button className={`rd-all-london ${area === "London" ? "active" : ""}`} onClick={() => chooseRegion(areaGroups[0])}>All London</button>
        <div className="rd-sidebar-regions">{areaGroups.slice(1).map((group) => <section className="rd-area-group" key={group.title}><a className={`rd-region-heading ${area === group.title ? "active" : ""}`} href={locationDirectoryPath(group.title, postcodeAreas)} onClick={(event) => chooseAreaLink(event, group.title)}>{group.title}</a>{group.areas.map((place) => <a key={place} href={locationDirectoryPath(place, postcodeAreas)} onClick={(event) => chooseAreaLink(event, place)} className={displayArea === place ? "active" : ""}>{place}</a>)}</section>)}</div>
      </aside>

      <section className="rd-content">
        <div className="rd-hero"><div className="rd-eyebrow"><span/> {initialCity ? `${initialCity.toUpperCase()} ROOM DIRECTORY` : "UK ROOM DIRECTORY"}</div><h1>{roomTitleCase}</h1><p className="rd-intro">{description}</p>
          <div className="rd-stats"><div><strong>{loading ? "—" : areaRooms.length}</strong><span>rooms listed</span></div><div><strong>{loading ? "—" : areaRooms.filter((r) => r.availableImmediately || r.status === "available").length}</strong><span>available now</span></div><div><strong>{averageRent ? `£${averageRent.toLocaleString()}` : "—"}</strong><span>average monthly rent</span></div><div><strong>{lowestRent ? `£${lowestRent.toLocaleString()}` : "—"}</strong><span>lowest monthly rent</span></div></div>
          <div className="rd-seo-line"><span>AREA GUIDE</span><p>{displayArea} room rentals <b>·</b> Nearby: {(areaGroup?.areas.filter((place) => place !== displayArea && place !== "London").slice(0, 3) || ["East London", "Central London"]).join(", ")}</p></div>
          <div className="rd-meta-preview"><span>SEARCH ENGINE PREVIEW</span><strong>{metaTitle}</strong><p>{metaDescription}</p></div>
        </div>

        <div className="rd-section-head" id="filters"><div><span className="rd-kicker">ROOMS IN THIS LOCATION</span><h2>Filter by room type</h2></div><span className="rd-result-count"><SlidersHorizontal size={15}/>{displayedRooms.length} matching rooms</span></div>
        <div className="rd-filter-row rd-room-type-row"><div className="rd-chips">{roomFilters.map((option) => <a key={option} href={seoDirectoryPath(area, option, initialCity)} target="_blank" rel="noopener noreferrer" aria-current={selected === option ? "page" : undefined} className={`rd-room-type-chip${selected === option ? " selected" : ""}`}>{option}</a>)}</div></div>

        <div className="rd-listing-head"><div><span className="rd-kicker">HANDPICKED FOR YOU</span><h2>{displayedRooms.length} rooms in {displayArea}</h2></div><label className="rd-sort">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={14}/></label></div>
        {loading ? <div className="rd-room-grid">{[0,1,2].map((n) => <PropertyCardSkeleton key={n}/>)}</div> : error ? <div className="rd-empty"><div className="rd-empty-icon"><BedDouble/></div><h3>Room listings are temporarily unavailable</h3><p>Please try again shortly, or browse all rooms using the live search.</p><Link href="/find-a-room">Open room search <ArrowRight size={15}/></Link></div> : displayedRooms.length ? <div className="rd-existing-cards">{displayedRooms.map((room, index) => <PropertyCard key={room._id || room.slug || index} id={room._id} slug={room.slug} listingId={room.listingId} title={room.title || "Room to rent in London"} location={locationOf(room)} price={`£${priceOf(room).toLocaleString()}`} availability={room.status === "rented" ? "Rented" : room.status === "reserved" ? "Reserved" : room.availableImmediately ? "Available Now" : "Check Availability"} description={room.description || "A welcoming room in a shared London home, close to local amenities and transport."} imageUrl={room.images?.[0] || "/rent-room-london.webp"} imageLoading="lazy" imagePriority="low" />)}</div> : <div className="rd-empty"><div className="rd-empty-icon"><BedDouble/></div><h3>No rooms match these filters yet</h3><p>Try another area or clear a filter to see more available rooms.</p><button onClick={() => {setSelected("");updateUrl(area,"");}}>Clear filters <X size={14}/></button></div>}

        <section className="rd-seo-footer"><span className="rd-kicker">MORE IN {activeRegion.toUpperCase()}</span><h2>Rooms to rent in nearby areas</h2><p>Browse more local room listings in {displayArea === "London" ? "London" : displayArea}. Choose an area to see its available rooms, current rents and room types.</p><div>{relatedAreas.map((item) => <Link key={item} href={locationDirectoryPath(item, postcodeAreas)}>Rooms in {item}</Link>)}</div></section>
      </section>
    </div>
  </main>;
}
