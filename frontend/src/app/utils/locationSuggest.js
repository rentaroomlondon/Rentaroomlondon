// Location suggestions for the room search boxes.
//  - getLocalSuggestions(query): instant, from the built-in index (London districts, areas, UK cities).
//  - getRemoteSuggestions(query, signal): full postcodes + any other UK place, from postcodes.io (free, no key).
//
// Each suggestion: { id, type, title, subtitle, value, lat?, lng? }
// `value` is what goes into the search box / the `search` query param. The backend reads a postcode
// district anywhere in it (e.g. "Hendon, NW4" -> NW4), so area suggestions always carry their district.

import { LONDON_DISTRICTS, UK_CITIES, POPULAR_DISTRICTS } from "./locationData";

const POSTCODES_API = "https://api.postcodes.io";
const MAX_RESULTS = 8;
const DISTRICT_RE = /^[A-Z]{1,2}\d[A-Z\d]?$/;
const FULL_POSTCODE_RE = /^([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})$/;

const compact = (text = "") => text.toUpperCase().replace(/[^A-Z0-9]/g, "");
const looksLikePostcode = (text) => /^[A-Z]{1,2}\d/.test(compact(text));

/** "NW43AB" / "nw4 3ab" -> "NW4 3AB"; returns null when it is not a full postcode. */
export function formatFullPostcode(text) {
  const match = compact(text).match(FULL_POSTCODE_RE);
  return match ? `${match[1]} ${match[2]}` : null;
}

// ---------- built-in index ----------
const INDEX = [];

LONDON_DISTRICTS.forEach(([code, areaList]) => {
  const areas = areaList.split(",").map((a) => a.trim());
  INDEX.push({
    id: `district:${code}`,
    type: "district",
    code,
    title: code,
    subtitle: `${areas.join(", ")} · London`,
    value: code,
  });
  areas.forEach((area) => {
    INDEX.push({
      id: `area:${area}:${code}`,
      type: "area",
      code,
      name: area.toLowerCase(),
      title: area,
      subtitle: `${code} · London`,
      value: `${area}, ${code}`,
    });
  });
});

UK_CITIES.forEach((city) => {
  INDEX.push({
    id: `city:${city}`,
    type: "city",
    name: city.toLowerCase(),
    title: city,
    subtitle: city === "London" ? "All areas of London" : "City · United Kingdom",
    value: city,
  });
});

function nameScore(name, query) {
  if (name === query) return 70;
  if (name.startsWith(query)) return 60;
  if (name.split(/[\s'-]+/).some((word) => word.startsWith(query))) return 45;
  if (query.length >= 3 && name.includes(query)) return 25;
  return 0;
}

function districtScore(code, queryCompact) {
  if (!queryCompact || !/^[A-Z]/.test(queryCompact)) return 0;
  if (code === queryCompact) return 100;
  if (code.startsWith(queryCompact)) return 80 - (code.length - queryCompact.length);
  // A full or partly typed postcode, e.g. "NW43A" -> NW4
  const rest = queryCompact.slice(code.length);
  if (queryCompact.startsWith(code) && rest.length >= 2 && /^\d[A-Z]{1,2}$/.test(rest)) return 90;
  return 0;
}

/** Instant suggestions — no network. An empty query returns popular areas. */
export function getLocalSuggestions(rawQuery = "") {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    const london = INDEX.find((item) => item.id === "city:London");
    const popular = POPULAR_DISTRICTS.map((code) => INDEX.find((item) => item.id === `district:${code}`)).filter(Boolean);
    return [london, ...popular].slice(0, MAX_RESULTS);
  }

  const queryCompact = compact(query);
  const postcodeLike = looksLikePostcode(query);

  const scored = [];
  INDEX.forEach((item) => {
    let score = 0;
    if (item.type === "district") {
      score = districtScore(item.code, queryCompact);
      // Typing letters only ("nw") lists districts; prefer them over area names when it looks like a postcode.
      if (score && postcodeLike) score += 20;
    } else {
      score = nameScore(item.name, query);
      if (score && item.type === "city") score += item.title === "London" ? 8 : 2;
    }
    if (score > 0) scored.push({ item, score });
  });

  scored.sort((a, b) => b.score - a.score || a.item.title.length - b.item.title.length);

  const seen = new Set();
  const results = [];
  for (const { item } of scored) {
    if (seen.has(item.value)) continue;
    seen.add(item.value);
    results.push(item);
    if (results.length === MAX_RESULTS) break;
  }
  return results;
}

// ---------- postcodes.io ----------
const remoteCache = new Map();
const PLACE_TYPES = new Set(["City", "Town", "Suburban Area", "Village"]);
const MAX_REMOTE_PLACES = 3;

async function getJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.result ?? null;
}

async function fetchRemote(query, signal) {
  const queryCompact = compact(query);

  if (looksLikePostcode(query)) {
    const results = [];

    // Full / partial postcodes, e.g. "NW4 3" -> NW4 3AB, NW4 3AD, ...
    if (queryCompact.length >= 3) {
      const postcodes = await getJson(
        `${POSTCODES_API}/postcodes/${encodeURIComponent(query.trim())}/autocomplete?limit=5`,
        signal
      );
      (postcodes || []).forEach((postcode) => {
        const district = postcode.split(" ")[0];
        results.push({
          id: `postcode:${postcode}`,
          type: "postcode",
          title: postcode,
          subtitle: `Postcode · rooms in and around ${district}`,
          value: postcode,
        });
      });
    }

    // Districts outside the built-in London list, e.g. "M1", "B15", "LS6"
    if (DISTRICT_RE.test(queryCompact)) {
      const outcode = await getJson(`${POSTCODES_API}/outcodes/${queryCompact}`, signal);
      if (outcode) {
        const areas = (outcode.admin_district || []).slice(0, 2).join(", ");
        results.unshift({
          id: `district:${outcode.outcode}`,
          type: "district",
          title: outcode.outcode,
          subtitle: areas ? `${areas} · postcode district` : "Postcode district",
          value: outcode.outcode,
          lat: outcode.latitude,
          lng: outcode.longitude,
        });
      }
    }
    return results;
  }

  if (query.trim().length < 2) return [];

  // Towns, cities and neighbourhoods anywhere in the UK
  const places = await getJson(`${POSTCODES_API}/places?q=${encodeURIComponent(query.trim())}&limit=15`, signal);
  return (places || [])
    .filter((place) => PLACE_TYPES.has(place.local_type))
    .map((place) => {
      const isTownOrCity = place.local_type === "City" || place.local_type === "Town";
      // Welsh names come as "Sir y Fflint - Flintshire" — keep the English part.
      const where = (place.district_borough || place.county_unitary || place.region || place.country || "").split(" - ").pop();
      const outcode = place.outcode || "";
      return {
        id: `place:${place.code || `${place.name_1}:${outcode}`}`,
        type: isTownOrCity ? "city" : "area",
        title: place.name_1,
        subtitle: [outcode, where].filter(Boolean).join(" · "),
        // Neighbourhoods search by district (reliable); towns and cities by name.
        value: isTownOrCity || !outcode ? place.name_1 : `${place.name_1}, ${outcode}`,
        lat: place.latitude,
        lng: place.longitude,
      };
    });
}

/** Network suggestions (cached). Throws AbortError when `signal` is aborted. */
export async function getRemoteSuggestions(rawQuery, signal) {
  const key = rawQuery.trim().toLowerCase();
  if (!key) return [];
  if (remoteCache.has(key)) return remoteCache.get(key);
  const results = await fetchRemote(rawQuery, signal);
  remoteCache.set(key, results);
  return results;
}

/** Local results first, then remote ones that add something new. */
export function mergeSuggestions(local, remote, query = "") {
  const seen = new Set(local.map((item) => item.value.toLowerCase()));
  const titles = new Set(local.map((item) => item.title.toLowerCase()));
  const merged = [...local];
  let places = 0;
  for (const item of remote) {
    const value = item.value.toLowerCase();
    if (seen.has(value) || (item.type !== "postcode" && titles.has(item.title.toLowerCase()))) continue;
    if (item.id.startsWith("place:") && ++places > MAX_REMOTE_PLACES) continue;
    seen.add(value);
    titles.add(item.title.toLowerCase());
    merged.push(item);
  }
  // The exact district typed comes first, then full postcodes, then everything else (stable sort).
  const queryCompact = compact(query);
  const rank = (item) =>
    item.type === "district" && compact(item.title) === queryCompact ? 2 : item.type === "postcode" ? 1 : 0;
  merged.sort((a, b) => rank(b) - rank(a));
  return merged.slice(0, MAX_RESULTS);
}
