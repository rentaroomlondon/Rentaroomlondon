// Coverage map regions. Areas with a landing page link straight to it.
const PLACEHOLDER_AREAS = [{ code: "[Code]", area: "[Areas covered]", note: "[Short note about the area]" }];

export const REGIONS = [
  {
    name: "North West",
    areas: [
      { code: "NW2", area: "Cricklewood, Dollis Hill, Neasden", note: "Well-connected, with shopping at Brent Cross.", href: "/rental-rooms-students-cricklewood-uk" },
      { code: "NW4", area: "Hendon, Brent Cross", note: "Close to Middlesex University, ideal for students.", href: "/cheap-rental-rooms-hendon-nw4-london" },
      { code: "NW6", area: "Kilburn, West Hampstead", note: "Popular with young professionals, Jubilee line access.", href: "/rooms-rental-nw6-west-hampstead-london" },
      { code: "NW9", area: "Colindale, Kingsbury", note: "Residential area with easy access to universities.", href: "/shared-rental-rooms-kingsbury-london-nw9" },
      { code: "NW10", area: "Harlesden, Willesden", note: "Affordable housing with strong central London links.", href: "/rooms-rent-harlesden-nw10-bills-included" },
    ],
  },
  { name: "North & East", areas: PLACEHOLDER_AREAS },
  { name: "South East", areas: PLACEHOLDER_AREAS },
  { name: "South West & Birmingham", areas: PLACEHOLDER_AREAS },
];

// Pin positions on the illustrated city plane (px within the 1100×880 plane).
export const PIN_POSITIONS = { NW9: [370, 182], NW4: [726, 182], NW2: [548, 350], NW10: [192, 518], NW6: [904, 518] };
export const MAP_ORIGIN = [904, 686]; // "Central London" marker
