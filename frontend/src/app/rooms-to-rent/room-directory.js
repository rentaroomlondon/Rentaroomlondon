"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BedDouble, ChevronDown, MapPin, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/app/Shared/PropertyCard";
import "./room-directory.css";

const areaGroups = [
  { title: "All London", areas: ["London", "Hackney", "Stratford", "Canary Wharf", "East Ham", "Leyton", "Walthamstow", "Greenwich", "Ealing", "Hammersmith", "Shepherd's Bush", "Acton", "Camden", "Islington", "Hendon", "Tottenham", "Finsbury Park", "Brixton", "Bermondsey", "Stockwell", "Clapham", "Peckham", "King's Cross", "London Bridge", "Old Street", "Liverpool Street", "Holborn"] },
  { title: "East London", areas: ["Hackney", "Stratford", "Canary Wharf", "East Ham", "Leyton", "Walthamstow", "Greenwich"] },
  { title: "West London", areas: ["Ealing", "Hammersmith", "Shepherd's Bush", "Acton"] },
  { title: "North London", areas: ["Camden", "Islington", "Hendon", "Tottenham", "Finsbury Park"] },
  { title: "South London", areas: ["Brixton", "Bermondsey", "Stockwell", "Clapham", "Peckham"] },
  { title: "Central London", areas: ["King's Cross", "London Bridge", "Old Street", "Liverpool Street", "Holborn"] },
];
const roomFilters = ["Single", "Double", "Ensuite", "Ensuite Double", "Studio"];
const postcodeByArea = { Hackney: ["E8", "E9"], Stratford: ["E15", "E20"], "Canary Wharf": ["E14"], "East Ham": ["E6"], Leyton: ["E10"], Walthamstow: ["E17"], Greenwich: ["SE10"], Ealing: ["W5", "W13"], Hammersmith: ["W6"], "Shepherd's Bush": ["W12"], Acton: ["W3"], Camden: ["NW1"], Islington: ["N1"], Hendon: ["NW4"], Tottenham: ["N15", "N17"], "Finsbury Park": ["N4"], Brixton: ["SW2"], Bermondsey: ["SE1"], Stockwell: ["SW9"], Clapham: ["SW4"], Peckham: ["SE15"], "King's Cross": ["N1C", "WC1"], "London Bridge": ["SE1"], "Old Street": ["EC1"], "Liverpool Street": ["EC2"], Holborn: ["WC1", "WC2"] };
const areaDescriptions = { Hackney: "Find rooms in Hackney, close to Dalston, London Fields and the East London transport network.", Stratford: "Explore rooms in Stratford near the Elizabeth Line, Queen Elizabeth Olympic Park and Leyton.", "Canary Wharf": "Browse rooms around Canary Wharf, with easy access to the Isle of Dogs and the Elizabeth Line.", Camden: "Find a room in Camden near King's Cross, Regent's Park and central London connections.", London: "Browse rooms across London, from East London neighbourhoods to central and south London." };
const first = (...values) => values.find((value) => value !== undefined && value !== null && value !== "");
const priceOf = (room) => Number(first(room.monthlyPrice, room.price, room.rent, 0));
const locationOf = (room) => [room.location?.address, room.location?.postcode, room.location?.city].filter(Boolean).join(", ");
const roomText = (room) => `${room.title || ""} ${room.description || ""} ${room.roomType || ""} ${room.propertyType || ""} ${room.location?.address || ""} ${room.location?.city || ""} ${room.location?.postcode || ""} ${room.occupancy || ""}`.toLowerCase();
const roomIsInArea = (room, area) => {
  if (!area || area === "London" || area === "All London") return true;
  const normalized = roomText(room);
  const postcode = String(room.location?.postcode || "").toUpperCase().replace(/\s/g, "");
  if (areaGroups.some((group) => group.title === area)) {
    const group = areaGroups.find((item) => item.title === area);
    return group?.areas.some((name) => name !== "London" && roomIsInArea(room, name)) || false;
  }
  return normalized.includes(area.toLowerCase()) || (postcodeByArea[area] || []).some((prefix) => postcode.startsWith(prefix));
};
const roomMatchesFilter = (room, filter) => {
  const types = { Single: "single", Double: "double", Ensuite: "ensuite", "Ensuite Double": "ensuite_double", Studio: "studio" };
  return room.roomType === types[filter];
};
const regionForArea = (area) => areaGroups.find((group) => group.title === area)?.title || areaGroups.find((group) => group.title !== "All London" && group.areas.includes(area))?.title || "All London";

export default function RoomDirectory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [area, setArea] = useState("London");
  const [activeRegion, setActiveRegion] = useState("All London");
  const [selected, setSelected] = useState(searchParams.get("filter") || "");
  const [sort, setSort] = useState("recommended");

  const updateUrl = useCallback((nextArea, nextFilter) => {
    const params = new URLSearchParams();
    if (nextFilter) params.set("filter", nextFilter);
    const suffix = params.toString() ? `?${params}` : "";
    const hash = nextArea && nextArea !== "London" ? `#${encodeURIComponent(nextArea)}` : "";
    window.history.replaceState(null, "", `/rooms-to-rent${suffix}${hash}`);
    router.replace(`/rooms-to-rent${suffix}${hash}`, { scroll: false });
  }, [router]);

  useEffect(() => {
    setSelected(searchParams.get("filter") || "");
  }, [searchParams]);

  useEffect(() => {
    const syncHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const nextArea = !hash || hash === "All London" ? "London" : hash;
      setArea(nextArea);
      setActiveRegion(regionForArea(nextArea));
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    let active = true;
    async function loadRooms() {
      setLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams({ search: "London" });
        const endpoint = process.env.NEXT_PUBLIC_API_URL;
        if (!endpoint) throw new Error("Room search service is not configured");
        const response = await fetch(`${endpoint}/listings/search?${params.toString()}`);
        if (!response.ok) throw new Error("Could not load rooms");
        const data = await response.json();
        if (active) setRooms(Array.isArray(data.listings) ? data.listings : []);
      } catch {
        if (active) { setRooms([]); setError(true); }
      } finally { if (active) setLoading(false); }
    }
    loadRooms();
    return () => { active = false; };
  }, []);

  const areaRooms = useMemo(() => rooms.filter((room) => roomIsInArea(room, area)), [rooms, area]);
  const filteredRooms = useMemo(() => {
    let result = areaRooms.filter((room) => !selected || roomMatchesFilter(room, selected));
    if (sort === "price-low") result = [...result].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "price-high") result = [...result].sort((a, b) => priceOf(b) - priceOf(a));
    return result;
  }, [areaRooms, selected, sort]);

  const chooseArea = (value) => {
    setArea(value);
    setSelected("");
    setActiveRegion(regionForArea(value));
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
    setActiveRegion(regionForArea(value));
    window.history.pushState(null, "", `/rooms-to-rent${value === "London" ? "" : `#${encodeURIComponent(value)}`}`);
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
  const roomCountForArea = (place) => rooms.filter((room) => roomIsInArea(room, place)).length;
  const filterCount = (filter) => areaRooms.filter((room) => roomMatchesFilter(room, filter)).length;
  const relatedAreas = area === "London"
    ? areaGroups.filter((group) => group.title !== "All London").map((group) => group.title)
    : areaGroups.find((group) => group.title === area)?.areas || areaGroups.find((group) => group.areas.includes(area) && group.title !== "All London")?.areas.filter((place) => place !== area) || [];
  const areaGroup = areaGroups.find((group) => group.title === area) || areaGroups.find((group) => group.title !== "All London" && group.areas.includes(area));
  const mobileRegion = activeRegion === "All London" ? "East London" : activeRegion;

  return <main className="room-directory">
    <div className="rd-breadcrumb"><Link href="/">Home</Link><span>›</span><a href="#areas">Rooms to rent in London</a>{area !== "London" && <><span>›</span><span>{area}</span></>}</div>
    <div className="rd-layout">
      <aside className="rd-sidebar" id="areas">
        <div className="rd-side-head"><span>EXPLORE AREAS</span><MapPin size={16}/></div>
        <button className={`rd-all-london ${area === "London" ? "active" : ""}`} onClick={() => chooseRegion(areaGroups[0])}>All London</button>
        <div className="rd-mobile-region-tabs" role="group" aria-label="London regions">{areaGroups.slice(1).map((group) => <button key={group.title} onClick={() => chooseRegion(group)} className={mobileRegion === group.title ? "active" : ""}>{group.title}<ChevronDown size={12}/></button>)}</div>
        <div className="rd-sidebar-regions">{areaGroups.slice(1).map((group) => <section className={`rd-area-group ${mobileRegion === group.title ? "mobile-active" : ""}`} key={group.title}><a className={`rd-region-heading ${area === group.title ? "active" : ""}`} href={`#${encodeURIComponent(group.title)}`} onClick={(event) => chooseAreaLink(event, group.title)}>{group.title}</a>{group.areas.map((place) => <a key={place} href={`#${encodeURIComponent(place)}`} onClick={(event) => chooseAreaLink(event, place)} className={area === place ? "active" : ""}>{place}<span>{loading ? "—" : roomCountForArea(place)}</span></a>)}</section>)}</div>
      </aside>

      <section className="rd-content">
        <div className="rd-hero"><div className="rd-eyebrow"><span/> LONDON ROOM DIRECTORY</div><h1>{roomTitleCase}</h1><p className="rd-intro">{description}</p>
          <div className="rd-stats"><div><strong>{loading ? "—" : areaRooms.length}</strong><span>rooms listed</span></div><div><strong>{loading ? "—" : areaRooms.filter((r) => r.availableImmediately || r.status === "available").length}</strong><span>available now</span></div><div><strong>{averageRent ? `£${averageRent.toLocaleString()}` : "—"}</strong><span>average monthly rent</span></div><div><strong>{lowestRent ? `£${lowestRent.toLocaleString()}` : "—"}</strong><span>lowest monthly rent</span></div></div>
          <div className="rd-seo-line"><span>AREA GUIDE</span><p>{area} room rentals <b>·</b> Nearby: {(areaGroup?.areas.filter((place) => place !== area && place !== "London").slice(0, 3) || ["East London", "Central London"]).join(", ")}</p></div>
          <div className="rd-meta-preview"><span>SEARCH ENGINE PREVIEW</span><strong>{metaTitle}</strong><p>{metaDescription}</p></div>
        </div>

        <div className="rd-section-head" id="filters"><div><span className="rd-kicker">ROOMS IN THIS LOCATION</span><h2>Filter by room type</h2></div><span className="rd-result-count"><SlidersHorizontal size={15}/>{filteredRooms.length} matching rooms</span></div>
        <div className="rd-filter-row rd-room-type-row"><div className="rd-chips">{roomFilters.map((option) => <button key={option} onClick={() => chooseFilter(option)} className={selected === option ? "selected" : ""}>{option}<span>{loading ? "—" : filterCount(option)}</span>{selected === option && <X size={12}/>}</button>)}</div></div>

        <div className="rd-listing-head"><div><span className="rd-kicker">HANDPICKED FOR YOU</span><h2>{filteredRooms.length} rooms in {area}</h2></div><label className="rd-sort">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={14}/></label></div>
        {loading ? <div className="rd-room-grid">{[0,1,2].map((n) => <div className="rd-card-skeleton" key={n}><div/><span/><span/></div>)}</div> : error ? <div className="rd-empty"><div className="rd-empty-icon"><BedDouble/></div><h3>Room listings are temporarily unavailable</h3><p>Please try again shortly, or browse all rooms using the live search.</p><Link href="/find-a-room">Open room search <ArrowRight size={15}/></Link></div> : filteredRooms.length ? <div className="rd-existing-cards">{filteredRooms.map((room, index) => <PropertyCard key={room._id || room.slug || index} id={room._id} slug={room.slug} listingId={room.listingId} title={room.title || `${room.roomType || "Room"} to rent in ${room.location?.address || area}`} location={locationOf(room) || `${area}, London`} price={`£${priceOf(room).toLocaleString()}`} availability={room.availableImmediately ? "Available Now" : "Check Availability"} description={room.description || "A welcoming room in a shared London home, close to local amenities and transport."} imageUrl={room.images?.[0] || "/rent-room-london.webp"} />)}</div> : <div className="rd-empty"><div className="rd-empty-icon"><BedDouble/></div><h3>No rooms match these filters yet</h3><p>Try another area or clear a filter to see more available rooms.</p><button onClick={() => {setSelected("");updateUrl(area,"");}}>Clear filters <X size={14}/></button></div>}

        <section className="rd-seo-footer"><span className="rd-kicker">MORE IN {activeRegion.toUpperCase()}</span><h2>Rooms to rent in nearby areas</h2><p>Browse more local room listings in {area === "London" ? "London" : area}. Choose an area to see its available rooms, current rents and room types.</p><div>{relatedAreas.map((item) => <a key={item} href={`#${encodeURIComponent(item)}`} onClick={(event) => chooseAreaLink(event, item)}>Rooms in {item} <span>{loading ? "—" : roomCountForArea(item)}</span></a>)}</div></section>
      </section>
    </div>
  </main>;
}
