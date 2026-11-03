"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BedDouble, ChevronDown, MapPin, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/app/Shared/PropertyCard";
import PropertyCardSkeleton from "@/app/Shared/PropertyCardSkeleton";
import "./room-directory.css";

const roomFilters = ["Single", "Double", "Ensuite", "Ensuite Double", "Studio"];
let roomDirectoryCache = null;
let roomDirectoryCacheTime = 0;
let roomDirectoryRequest = null;
const regionOrder = ["East London", "North London", "South London", "West London", "Central London", "Other locations"];
const postcodeByArea = { Hackney: ["E8", "E9"], Stratford: ["E15", "E20"], "Canary Wharf": ["E14"], "East Ham": ["E6"], Leyton: ["E10"], Walthamstow: ["E17"], Greenwich: ["SE10"], Ealing: ["W5", "W13"], Hammersmith: ["W6"], "Shepherd's Bush": ["W12"], Acton: ["W3"], Camden: ["NW1"], Islington: ["N1"], Hendon: ["NW4"], Tottenham: ["N15", "N17"], "Finsbury Park": ["N4"], Brixton: ["SW2"], Bermondsey: ["SE1"], Stockwell: ["SW9"], Clapham: ["SW4"], Peckham: ["SE15"], "King's Cross": ["N1C", "WC1"], "London Bridge": ["SE1"], "Old Street": ["EC1"], "Liverpool Street": ["EC2"], Holborn: ["WC1", "WC2"], Cricklewood: ["NW2"], Harlesden: ["NW10"], Kingsbury: ["NW9"], "West Hampstead": ["NW6"], Eltham: ["SE9"], Plumstead: ["SE18"], Harrow: ["HA1", "HA2"], "South Tottenham": ["N15"] };
const knownAreas = Object.entries(postcodeByArea).flatMap(([area, postcodes]) => postcodes.map((postcode) => [postcode, area]));
const areaDescriptions = { Hackney: "Find rooms in Hackney, close to Dalston, London Fields and the East London transport network.", Stratford: "Explore rooms in Stratford near the Elizabeth Line, Queen Elizabeth Olympic Park and Leyton.", "Canary Wharf": "Browse rooms around Canary Wharf, with easy access to the Isle of Dogs and the Elizabeth Line.", Camden: "Find a room in Camden near King's Cross, Regent's Park and central London connections.", London: "Browse rooms across London, from East London neighbourhoods to central and south London." };
const first = (...values) => values.find((value) => value !== undefined && value !== null && value !== "");
const priceOf = (room) => Number(first(room.monthlyPrice, room.price, room.rent, 0));
const locationOf = (room) => [room.location?.address, room.location?.postcode, room.location?.city].filter(Boolean).join(", ");
const normalizePostcode = (room) => String(room.location?.postcode || "").toUpperCase().replace(/\s/g, "");
const postcodeDistrict = (room) => normalizePostcode(room).match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)/)?.[1] || "";
const areaDetails = (room) => {
  const postcode = normalizePostcode(room);
  const district = postcodeDistrict(room);
  const address = `${room.location?.address || ""} ${room.title || ""}`;
  const known = Object.keys(postcodeByArea).find((name) => new RegExp(`\\b${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\b`, "i").test(address))
    || knownAreas.find(([prefix]) => postcode.startsWith(prefix))?.[1];
  const city = String(room.location?.city || "").trim();
  const area = known || (city && !/^(greater )?london$/i.test(city) ? city : district || city || "London");
  const prefix = district.match(/^[A-Z]+/)?.[0] || "";
  const region = ({ E: "East London", SE: "South London", SW: "South London", NW: "North London", N: "North London", EC: "Central London", WC: "Central London", W: "West London", HA: "North London" })[prefix]
    || (/^(greater )?london$/i.test(city) ? "Central London" : city ? "Other locations" : "Central London");
  return { area, region };
};
const buildAreaGroups = (rooms) => {
  const areasByRegion = new Map();
  for (const room of rooms) {
    const { area, region } = areaDetails(room);
    if (!areasByRegion.has(region)) areasByRegion.set(region, new Set());
    areasByRegion.get(region).add(area);
  }
  const groups = regionOrder.map((title) => ({ title, areas: [...(areasByRegion.get(title) || [])].sort((a, b) => a.localeCompare(b)) }));
  return [{ title: "All London", areas: [...new Set(groups.flatMap((group) => group.areas))].sort((a, b) => a.localeCompare(b)) }, ...groups];
};
const roomIsInArea = (room, area, areaGroups) => {
  if (!area || area === "London" || area === "All London") return true;
  const group = areaGroups.find((item) => item.title === area);
  if (group && area !== "All London") {
    return group.areas.includes(areaDetails(room).area);
  }
  return areaDetails(room).area === area;
};
const roomMatchesFilter = (room, filter) => {
  const types = { Single: "single", Double: "double", Ensuite: "ensuite", "Ensuite Double": "ensuite_double", Studio: "studio" };
  return room.roomType === types[filter];
};
const regionForArea = (area, areaGroups) => areaGroups.find((group) => group.title === area)?.title || areaGroups.find((group) => group.title !== "All London" && group.areas.includes(area))?.title || "All London";

const areaSlug = (area) => area.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const areaFromSlug = (slug) => {
  const normalized = decodeURIComponent(slug || "").toLowerCase();
  return Object.keys(postcodeByArea).find((name) => areaSlug(name) === normalized) || (normalized ? normalized.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") : "");
};
const roomTypeApiValue = { Single: "single", Double: "double", Ensuite: "ensuite", "Ensuite Double": "ensuite_double", Studio: "studio" };

const directoryFilterUrl = (endpoint, area, selected) => {
  const params = new URLSearchParams();
  if (roomTypeApiValue[selected]) params.set("roomType", roomTypeApiValue[selected]);
  if (regionOrder.includes(area)) params.set("region", area);
  else if (area !== "London" && postcodeByArea[area]) params.set("postcodes", postcodeByArea[area].join(","));
  else if (area !== "London" && /^[A-Z]{1,2}\d{1,2}[A-Z]?$/i.test(area)) params.set("postcodes", area);
  else if (area !== "London") params.set("area", area);
  return `${endpoint}/listings/directory${params.size ? `?${params}` : ""}`;
};

export default function RoomDirectory({ initialLocation = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState(() => roomDirectoryCache || []);
  const [apiRooms, setApiRooms] = useState(null);
  const [apiQueryKey, setApiQueryKey] = useState("");
  const [loading, setLoading] = useState(() => !roomDirectoryCache);
  const [error, setError] = useState(false);
  const [area, setArea] = useState(() => areaFromSlug(initialLocation) || "London");
  const [activeRegion, setActiveRegion] = useState("All London");
  const [selected, setSelected] = useState(searchParams.get("filter") || "");
  const [sort, setSort] = useState("recommended");
  const areaGroups = useMemo(() => buildAreaGroups(rooms), [rooms]);
  const queryKey = `${area}|${selected}`;

  const updateUrl = useCallback((nextArea, nextFilter) => {
    const params = new URLSearchParams();
    if (nextFilter) params.set("filter", nextFilter);
    const suffix = params.toString() ? `?${params}` : "";
    const path = nextArea && nextArea !== "London" ? `/rooms/${areaSlug(nextArea)}` : "/rooms";
    router.replace(`${path}${suffix}`, { scroll: false });
  }, [router]);

  useEffect(() => {
    setSelected(searchParams.get("filter") || "");
  }, [searchParams]);

  useEffect(() => {
    const nextArea = areaFromSlug(initialLocation);
    if (nextArea) setArea(nextArea);
  }, [initialLocation]);

  useEffect(() => {
    setActiveRegion(regionForArea(area, areaGroups));
  }, [area, areaGroups]);

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
    if (loading || !rooms.length || (area === "London" && !selected)) return undefined;
    const endpoint = process.env.NEXT_PUBLIC_API_URL;
    if (!endpoint) return undefined;
    const controller = new AbortController();
    fetch(directoryFilterUrl(endpoint, area, selected), { signal: controller.signal })
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
  }, [area, selected, loading, rooms.length, queryKey]);

  const areaRooms = useMemo(() => rooms.filter((room) => roomIsInArea(room, area, areaGroups)), [rooms, area, areaGroups]);
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
  const chooseFilter = (value) => { const next = selected === value ? "" : value; setSelected(next); updateUrl(area, next); };
  const chooseAreaLink = (event, value) => {
    event.preventDefault();
    setArea(value);
    setSelected("");
    setActiveRegion(regionForArea(value, areaGroups));
    const path = value === "London" ? "/rooms" : `/rooms/${areaSlug(value)}`;
    router.push(path, { scroll: false });
  };
  const areaLabel = area === "London" ? "London" : areaGroups.some((group) => group.title === area) ? area : `${area}, London`;
  const filterHeading = { Single: `Single Rooms to Rent in ${areaLabel}`, Double: `Double Rooms to Rent in ${areaLabel}`, Ensuite: `Ensuite Rooms to Rent in ${areaLabel}`, "Ensuite Double": `Ensuite Double Rooms to Rent in ${areaLabel}`, Studio: `Studio Rooms to Rent in ${areaLabel}` };
  const roomTitleCase = selected ? (filterHeading[selected] || `Rooms to Rent in ${areaLabel}`) : `Rooms to Rent in ${areaLabel}`;
  const description = areaDescriptions[area] || `Browse rooms to rent in ${areaLabel}, with nearby areas and transport connections. Compare availability, rent and room details.`;
  const metaTitle = `${roomTitleCase} | Rent a Room London`;
  const metaDescription = `${description} ${selected ? `Explore ${selected.toLowerCase()} rooms and current availability.` : `Compare monthly rent, availability and room details.`}`;
  const rentPrices = areaRooms.map(priceOf).filter((price) => price > 0);
  const averageRent = rentPrices.length ? Math.round(rentPrices.reduce((sum, price) => sum + price, 0) / rentPrices.length) : 0;
  const lowestRent = rentPrices.length ? Math.min(...rentPrices) : 0;
  useEffect(() => {
    document.title = metaTitle;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = metaDescription;
  }, [metaTitle, metaDescription]);
  const roomCountForArea = (place) => rooms.filter((room) => roomIsInArea(room, place, areaGroups)).length;
  const filterCount = (filter) => areaRooms.filter((room) => roomMatchesFilter(room, filter)).length;
  const currentAreaGroup = areaGroups.find((group) => group.title !== "All London" && group.areas.includes(area));
  const relatedAreas = area === "London"
    ? areaGroups[0]?.areas || []
    : currentAreaGroup?.areas.filter((place) => place !== area) || [];
  const areaGroup = areaGroups.find((group) => group.title === area) || areaGroups.find((group) => group.title !== "All London" && group.areas.includes(area));
  return <main className="room-directory">
    <div className="rd-breadcrumb"><Link href="/">Home</Link><span>›</span><a href="#areas">Rooms to rent in London</a>{area !== "London" && <><span>›</span><span>{area}</span></>}</div>
    <div className="rd-layout">
      <aside className="rd-sidebar" id="areas">
        <div className="rd-side-head"><span>EXPLORE AREAS</span><MapPin size={16}/></div>
        <button className={`rd-all-london ${area === "London" ? "active" : ""}`} onClick={() => chooseRegion(areaGroups[0])}>All London</button>
        <div className="rd-sidebar-regions">{areaGroups.slice(1).map((group) => <section className="rd-area-group" key={group.title}><a className={`rd-region-heading ${area === group.title ? "active" : ""}`} href={`/rooms/${areaSlug(group.title)}`} onClick={(event) => chooseAreaLink(event, group.title)}>{group.title}</a>{group.areas.map((place) => <a key={place} href={`/rooms/${areaSlug(place)}`} onClick={(event) => chooseAreaLink(event, place)} className={area === place ? "active" : ""}>{place}<span>{loading ? "—" : roomCountForArea(place)}</span></a>)}</section>)}</div>
      </aside>

      <section className="rd-content">
        <div className="rd-hero"><div className="rd-eyebrow"><span/> LONDON ROOM DIRECTORY</div><h1>{roomTitleCase}</h1><p className="rd-intro">{description}</p>
          <div className="rd-stats"><div><strong>{loading ? "—" : areaRooms.length}</strong><span>rooms listed</span></div><div><strong>{loading ? "—" : areaRooms.filter((r) => r.availableImmediately || r.status === "available").length}</strong><span>available now</span></div><div><strong>{averageRent ? `£${averageRent.toLocaleString()}` : "—"}</strong><span>average monthly rent</span></div><div><strong>{lowestRent ? `£${lowestRent.toLocaleString()}` : "—"}</strong><span>lowest monthly rent</span></div></div>
          <div className="rd-seo-line"><span>AREA GUIDE</span><p>{area} room rentals <b>·</b> Nearby: {(areaGroup?.areas.filter((place) => place !== area && place !== "London").slice(0, 3) || ["East London", "Central London"]).join(", ")}</p></div>
          <div className="rd-meta-preview"><span>SEARCH ENGINE PREVIEW</span><strong>{metaTitle}</strong><p>{metaDescription}</p></div>
        </div>

        <div className="rd-section-head" id="filters"><div><span className="rd-kicker">ROOMS IN THIS LOCATION</span><h2>Filter by room type</h2></div><span className="rd-result-count"><SlidersHorizontal size={15}/>{displayedRooms.length} matching rooms</span></div>
        <div className="rd-filter-row rd-room-type-row"><div className="rd-chips">{roomFilters.map((option) => <button key={option} onClick={() => chooseFilter(option)} className={selected === option ? "selected" : ""}>{option}<span>{loading ? "—" : filterCount(option)}</span>{selected === option && <X size={12}/>}</button>)}</div></div>

        <div className="rd-listing-head"><div><span className="rd-kicker">HANDPICKED FOR YOU</span><h2>{displayedRooms.length} rooms in {area}</h2></div><label className="rd-sort">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={14}/></label></div>
        {loading ? <div className="rd-room-grid">{[0,1,2].map((n) => <PropertyCardSkeleton key={n}/>)}</div> : error ? <div className="rd-empty"><div className="rd-empty-icon"><BedDouble/></div><h3>Room listings are temporarily unavailable</h3><p>Please try again shortly, or browse all rooms using the live search.</p><Link href="/find-a-room">Open room search <ArrowRight size={15}/></Link></div> : displayedRooms.length ? <div className="rd-existing-cards">{displayedRooms.map((room, index) => <PropertyCard key={room._id || room.slug || index} id={room._id} slug={room.slug} listingId={room.listingId} title={room.title || "Room to rent in London"} location={locationOf(room)} price={`£${priceOf(room).toLocaleString()}`} availability={room.status === "rented" ? "Rented" : room.status === "reserved" ? "Reserved" : room.availableImmediately ? "Available Now" : "Check Availability"} description={room.description || "A welcoming room in a shared London home, close to local amenities and transport."} imageUrl={room.images?.[0] || "/rent-room-london.webp"} imageLoading="lazy" imagePriority="low" />)}</div> : <div className="rd-empty"><div className="rd-empty-icon"><BedDouble/></div><h3>No rooms match these filters yet</h3><p>Try another area or clear a filter to see more available rooms.</p><button onClick={() => {setSelected("");updateUrl(area,"");}}>Clear filters <X size={14}/></button></div>}

        <section className="rd-seo-footer"><span className="rd-kicker">MORE IN {activeRegion.toUpperCase()}</span><h2>Rooms to rent in nearby areas</h2><p>Browse more local room listings in {area === "London" ? "London" : area}. Choose an area to see its available rooms, current rents and room types.</p><div>{relatedAreas.map((item) => <Link key={item} href={`/rooms/${areaSlug(item)}`}>Rooms in {item} <span>{loading ? "—" : roomCountForArea(item)}</span></Link>)}</div></section>
      </section>
    </div>
  </main>;
}
