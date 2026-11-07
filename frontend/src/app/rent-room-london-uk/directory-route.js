import { areaNameForPostcode, areaSlug, postcodeAliases, postcodeByArea, postcodeDistrictFromValue } from "./directory-areas";

const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const titleCase = (value) => value.split(/[-_]/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
const londonAreaSlugs = new Set([
  "east-london", "north-london", "south-london", "west-london", "central-london",
  "hackney", "stratford", "canary-wharf", "east-ham", "leyton", "walthamstow",
  "greenwich", "ealing", "hammersmith", "shepherds-bush", "acton", "camden",
  "islington", "hendon", "tottenham", "finsbury-park", "brixton", "bermondsey",
  "stockwell", "clapham", "peckham", "kings-cross", "london-bridge", "old-street",
  "liverpool-street", "holborn", "cricklewood", "harlesden", "kingsbury",
  "west-hampstead", "eltham", "plumstead", "harrow", "south-tottenham",
]);

const seoSlug = (value) => value.toLowerCase().replace(/['’]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const isPostcodeDistrict = (value) => Boolean(postcodeDistrictFromValue(value));
const seoPage = (title, location = "London", filter = "") => {
  const slug = seoSlug(title);
  return {
    slug,
    path: `/rent-room-london-uk/${slug}`,
    title,
    description: `Browse ${title.toLowerCase()}. Compare current room listings, monthly rent and availability, and enquire directly about a suitable room.`,
    location,
    filter,
  };
};

const londonDirectorySeoPage = {
  ...seoPage("Rooms to Rent in London"),
};

const seoPages = [
  londonDirectorySeoPage,
  ...["East", "West", "North", "South", "Central"].map((direction) => {
    const location = `${direction} London`;
    return seoPage(`Rooms to Rent in ${location}`, location);
  }),
  ...[
    ["Double Rooms to Rent in London", "London", "Double"],
    ["Single Rooms to Rent in London", "London", "Single"],
    ["Ensuite Rooms to Rent in London", "London", "Ensuite"],
    ["Furnished Rooms to Rent in London", "London", ""],
    ["Unfurnished Rooms to Rent in London", "London", ""],
    ["Cheap Rooms to Rent in London", "London", ""],
    ["Luxury Rooms to Rent in London", "London", ""],
    ["Studio Rooms to Rent in London", "London", "Studio"],
    ["Rooms to Rent for Professionals in London", "London", ""],
    ["Rooms to Rent for Students in London", "London", ""],
    ["Rooms to Rent for Couples in London", "London", ""],
    ["Rooms to Rent for Female Tenants in London", "London", ""],
    ["Rooms to Rent for Male Tenants in London", "London", ""],
    ["Pet-Friendly Rooms to Rent in London", "London", ""],
    ["Rooms with Bills Included in London", "London", ""],
    ["Rooms with Parking in London", "London", ""],
    ["Rooms with Garden Access in London", "London", ""],
    ["Rooms with Balcony in London", "London", ""],
    ["Rooms with Wi-Fi Included in London", "London", ""],
    ["Rooms with Ensuite Bathrooms in London", "London", "Ensuite"],
    ["Rooms in Houses to Rent in London", "London", ""],
    ["Rooms in Flats to Rent in London", "London", ""],
    ["Rooms to Rent Near London Underground Stations", "London", ""],
    ["Rooms to Rent Near Overground Stations", "London", ""],
    ["Rooms to Rent Near Elizabeth Line Stations", "London", ""],
    ["Rooms to Rent Near Universities", "London", ""],
    ["Rooms to Rent Near Business Districts", "London", ""],
    ["Rooms to Rent Near Stratford Station", "Stratford", ""],
    ["Rooms to Rent Near King's Cross Station", "King's Cross", ""],
    ["Rooms to Rent Near Canary Wharf", "Canary Wharf", ""],
    ["Rooms to Rent Near London Bridge", "London Bridge", ""],
    ["Rooms to Rent Near Old Street", "Old Street", ""],
    ["Rooms to Rent Near Liverpool Street", "Liverpool Street", ""],
    ["Double Rooms to Rent in Hackney", "Hackney", "Double"],
    ["Ensuite Rooms to Rent in Hackney", "Hackney", "Ensuite"],
    ["Furnished Rooms to Rent in Hackney", "Hackney", ""],
    ["Cheap Rooms to Rent in Hackney", "Hackney", ""],
    ["Rooms for Professionals in Hackney", "Hackney", ""],
    ["Rooms with Bills Included in Hackney", "Hackney", ""],
  ].map(([title, location, filter]) => seoPage(title, location, filter)),
];

const seoPageBySlug = new Map(seoPages.map((page) => [page.slug, page]));
const roomTypeSeoPrefixes = {
  "double-rooms-to-rent-in-": ["Double Rooms to Rent in", "Double"],
  "single-rooms-to-rent-in-": ["Single Rooms to Rent in", "Single"],
  "ensuite-rooms-to-rent-in-": ["Ensuite Rooms to Rent in", "Ensuite"],
  "ensuite-double-rooms-to-rent-in-": ["Ensuite Double Rooms to Rent in", "Ensuite Double"],
  "studio-rooms-to-rent-in-": ["Studio Rooms to Rent in", "Studio"],
};

const locationLabel = (slug) => {
  const knownLocations = {
    "kings-cross": "King's Cross",
    "london-bridge": "London Bridge",
    "old-street": "Old Street",
    "liverpool-street": "Liverpool Street",
    "canary-wharf": "Canary Wharf",
    "east-london": "East London",
    "west-london": "West London",
    "north-london": "North London",
    "south-london": "South London",
    "central-london": "Central London",
  };
  return knownLocations[slug] || titleCase(slug);
};

export function getDirectorySeoPage(slug) {
  const normalizedSlug = slug.toLowerCase();
  const existingPage = seoPageBySlug.get(normalizedSlug);
  if (existingPage) return existingPage;

  const prefix = Object.keys(roomTypeSeoPrefixes).find((candidate) => normalizedSlug.startsWith(candidate));
  if (!prefix) return null;

  const locationSlug = normalizedSlug.slice(prefix.length);
  if (!locationSlug) return null;

  const [titlePrefix, filter] = roomTypeSeoPrefixes[prefix];
  const location = locationLabel(locationSlug);
  return {
    slug: normalizedSlug,
    path: `/rent-room-london-uk/${normalizedSlug}`,
    title: `${titlePrefix} ${location}`,
    description: `Browse ${filter.toLowerCase()} rooms to rent in ${location}. Compare current room listings, monthly rent and availability, and enquire directly about a suitable room.`,
    location,
    filter,
  };
}

export function getDirectorySeoPages() {
  return seoPages;
}

export function getDirectoryAreaPages() {
  return [...Object.entries(postcodeByArea), ...Object.entries(postcodeAliases)].map(([location, postcodes]) => {
    const slug = `${areaSlug(location)}-${areaSlug(postcodes[0])}`;
    return { location, slug, path: `/rent-room-london-uk/${slug}` };
  });
}

export function getDirectoryLocation(segments = [], legacy = false) {
  if (!segments.length) {
    return { city: "", location: "all-uk", label: "the UK", path: "/rent-room-london-uk" };
  }

  if (segments.length === 1) {
    const slug = segments[0].toLowerCase();
    const seoPage = getDirectorySeoPage(slug);
    if (seoPage) {
      return {
        city: "London",
        location: seoPage.location,
        label: seoPage.location === "London" ? "London" : `${seoPage.location}, London`,
        path: seoPage.path,
        seoPage,
      };
    }

    const postcode = postcodeDistrictFromValue(slug);
    if (postcode) {
      const areaName = areaNameForPostcode(postcode);
      return {
        city: "London",
        location: postcode,
        label: areaName === postcode ? "London" : `${areaName}, London`,
        path: `/rent-room-london-uk/${slug}`,
        areaPostcodePage: true,
      };
    }

    const areaPostcode = slug.match(/^(.+)-([a-z]{1,2}\d{1,2}[a-z]?)$/i);
    if (areaPostcode) {
      const [, areaSlugPart, rawPostcode] = areaPostcode;
      const postcode = postcodeDistrictFromValue(rawPostcode);
      if (!postcode) return { city: "London", location: "", label: "London", path: "/rent-room-london-uk" };
      const knownArea = [...Object.entries(postcodeByArea), ...Object.entries(postcodeAliases)]
        .find(([area, postcodes]) =>
          areaSlug(area) === areaSlugPart
          && postcodes.some((district) => district === postcode)
        )?.[0];
      return {
        city: "London",
        location: postcode,
        label: `${knownArea || titleCase(areaSlugPart)}, London`,
        path: `/rent-room-london-uk/${knownArea ? areaSlug(knownArea) : areaSlugPart}-${postcode}`,
        areaPostcodePage: true,
        areaNamedPostcodePage: true,
      };
    }

    const matchedArea = [...Object.entries(postcodeByArea), ...Object.entries(postcodeAliases)].find(([area, postcodes]) =>
      postcodes.some((postcode) => slug === `${areaSlug(area)}-${areaSlug(postcode)}`)
    );
    if (matchedArea) {
      const [location, postcodes] = matchedArea;
      const canonicalSlug = `${areaSlug(location)}-${areaSlug(postcodes[0])}`;
      return {
        city: "London",
        location,
        label: `${location}, London`,
        path: `/rent-room-london-uk/${canonicalSlug}`,
        areaPostcodePage: true,
      };
    }

  }

  const seoSlug = segments.length === 2 && segments[0].toLowerCase() === "london"
    ? segments[1]
    : segments.length === 1 ? segments[0] : "";
  const seoPage = seoSlug ? getDirectorySeoPage(seoSlug) : null;
  if (seoPage) {
    return {
      city: "London",
      location: seoPage.location,
      label: seoPage.location === "London" ? "London" : `${seoPage.location}, London`,
      path: seoPage.path,
      seoPage,
    };
  }

  if (segments.length === 2 && segments[0].toLowerCase() === "london") {
    const postcode = segments[1].toLowerCase().replace(/^london[_-]/, "");
    const normalizedPostcode = postcodeDistrictFromValue(postcode);
    if (normalizedPostcode) {
      const areaName = areaNameForPostcode(normalizedPostcode);
      return {
        city: "London",
        location: normalizedPostcode,
        label: areaName === normalizedPostcode ? "London" : `${areaName}, London`,
        path: `/rent-room-london-uk/${postcode}`,
        areaPostcodePage: true,
      };
    }
  }

  if (segments.length === 1 && legacy && londonAreaSlugs.has(segments[0].toLowerCase())) {
    const location = segments[0];
    return {
      city: "London",
      location,
      label: `${titleCase(location)}, London`,
      path: `/rent-room-london-uk/${areaSlug(location)}`,
    };
  }

  const citySlug = segments[0].toLowerCase();
  const city = titleCase(citySlug);
  const cityPath = `/rent-room-london-uk/${segments[0]}`;
  if (segments.length < 2) {
    return { city, location: "", label: city, path: cityPath };
  }

  const areaPart = segments[1].toLowerCase().replace(new RegExp(`^${slugify(city)}[_-]?`), "");
  const location = areaPart.replace(/_/g, "-");
  return {
    city,
    location,
    label: `${titleCase(location)}, ${city}`,
    path: `${cityPath}/${citySlug}-${location}`,
  };
}

export async function resolvePostcodeAreaNames(postcodes) {
  const uniquePostcodes = [...new Set(postcodes.map(postcodeDistrictFromValue))]
    .filter(isPostcodeDistrict);
  const localNames = Object.fromEntries(uniquePostcodes
    .map((postcode) => [postcode, areaNameForPostcode(postcode)])
    .filter(([postcode, area]) => area && area !== postcode)
    .map(([postcode, area]) => [postcode, { area, outcode: postcode }]));
  const unresolvedPostcodes = uniquePostcodes.filter((postcode) => !localNames[postcode]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl || !unresolvedPostcodes.length) {
    for (const postcode of unresolvedPostcodes) localNames[postcode] = { area: "", outcode: postcode };
    return localNames;
  }

  try {
    const response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/listings/locations?postcodes=${encodeURIComponent(unresolvedPostcodes.join(","))}`,
      { next: { revalidate: 86400 } }
    );
    if (!response.ok) {
      throw new Error(`Postcode area service returned HTTP ${response.status}`);
    }
    const payload = await response.json();
    const resolvedNames = { ...localNames };
    for (const [postcode, location] of Object.entries(payload.locations || {})) {
      if (unresolvedPostcodes.includes(postcode)) resolvedNames[postcode] = location;
    }
    for (const postcode of payload.unresolved || []) {
      resolvedNames[postcode] = { area: "", outcode: postcode };
    }
    return resolvedNames;
  } catch (error) {
    console.error("Could not resolve postcode area names:", error);
    for (const postcode of unresolvedPostcodes) localNames[postcode] = { area: "", outcode: postcode };
    return localNames;
  }
}

export function directoryMetadata(route, searchParams = {}) {
  if (route.seoPage) {
    const filter = typeof searchParams.filter === "string" ? searchParams.filter : "";
    return {
      title: `${route.seoPage.title} | Rent a Room London`,
      description: route.seoPage.description,
      alternates: {
        canonical: `https://rentaroomlondon.co.uk${route.path}${filter ? `?filter=${encodeURIComponent(filter)}` : ""}`,
      },
      robots: { index: true, follow: true },
    };
  }

  const filters = {
    Single: "Single Rooms",
    Double: "Double Rooms",
    Ensuite: "Ensuite Rooms",
    "Ensuite Double": "Ensuite Double Rooms",
    Studio: "Studio Rooms",
  };
  const filter = typeof searchParams.filter === "string" ? searchParams.filter : "";
  const filterTitle = filters[filter];
  const title = filterTitle
    ? `${filterTitle} to Rent in ${route.label}`
    : route.location && route.location !== "all-uk"
    ? `Rooms to Rent in ${route.label}`
    : route.city
      ? `Rooms to Rent in ${route.city}`
      : "Rooms to Rent Across the UK";
  const description = filterTitle
    ? `Browse ${filterTitle.toLowerCase()} to rent in ${route.label}. Compare current listings, monthly rent and availability, and enquire directly about a suitable room.`
    : route.location && route.location !== "all-uk"
    ? `Browse rooms to rent in ${route.label}. Compare room types, monthly rent and availability, and enquire directly about a suitable room.`
    : route.city
      ? `Browse rooms to rent in ${route.city}. Compare room types, monthly rent and availability, and enquire directly about a suitable room.`
      : "Browse rooms to rent across the UK. Compare locations, room types, monthly rent and availability, and enquire directly about a suitable room.";

  return {
    title,
    description,
    alternates: { canonical: `https://rentaroomlondon.co.uk${route.path}${filterTitle ? `?filter=${encodeURIComponent(filter)}` : ""}` },
    robots: { index: true, follow: true },
  };
}
