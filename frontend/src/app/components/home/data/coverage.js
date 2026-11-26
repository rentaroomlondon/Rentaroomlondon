// Coverage map regions (6 areas each). Areas with a landing page link straight to it;
// the rest fall back to a /find-a-room search for their postcode.
export const REGIONS = [
  {
    name: "North West",
    areas: [
      { code: "NW2", area: "Cricklewood, Dollis Hill, Neasden", note: "Well-connected, with shopping at Brent Cross.", href: "/rental-rooms-students-cricklewood-uk" },
      { code: "NW4", area: "Hendon, Brent Cross", note: "Close to Middlesex University, ideal for students.", href: "/cheap-rental-rooms-hendon-nw4-london" },
      { code: "NW6", area: "Kilburn, West Hampstead", note: "Popular with young professionals, Jubilee line access.", href: "/rooms-rental-nw6-west-hampstead-london" },
      { code: "NW9", area: "Colindale, Kingsbury", note: "Residential area with easy access to universities.", href: "/shared-rental-rooms-kingsbury-london-nw9" },
      { code: "NW10", area: "Harlesden, Willesden", note: "Affordable housing with strong central London links.", href: "/rooms-rent-harlesden-nw10-bills-included" },
      { code: "HA1", area: "Harrow, Harrow on the Hill", note: "Student-friendly rooms near the University of Westminster Harrow campus.", href: "/rental-rooms-students-harrow-ha1-bills-included" },
    ],
  },
  {
    name: "North & East",
    areas: [
      { code: "N15", area: "South Tottenham, Seven Sisters", note: "Victoria line and Overground links into central London.", href: "/Spare-rooms-rent-south-tottenham-n15-london" },
      { code: "E8", area: "Hackney, Dalston", note: "Lively East London area with markets, cafés and green space.", href: "/double-room-to-rent-hackney-london" },
      { code: "E10", area: "Leyton, Lea Bridge", note: "Central Line access and close to Queen Elizabeth Olympic Park.", href: "/rent-single-double-rooms-leyton-e10-london" },
      { code: "E6", area: "East Ham, Beckton", note: "Affordable rooms with District and Hammersmith & City lines.", href: "/east-ham-e6-properties-rent-bills-included" },
      { code: "E17", area: "Walthamstow", note: "Village feel with Victoria line and Overground links.", href: "/rooms-to-rent-east-london" },
      { code: "E15", area: "Stratford, West Ham", note: "Major transport hub next to Westfield and the Olympic Park.", href: "/rooms-to-rent-east-london" },
    ],
  },
  {
    name: "South East",
    areas: [
      { code: "SE9", area: "Eltham, Mottingham", note: "Quiet, green suburb with fast rail links to London Bridge.", href: "/rental-rooms-eltham-london-se9-bills-included" },
      { code: "SE10", area: "Greenwich, Maze Hill", note: "Near the University of Greenwich and the riverside.", href: "/best-rental-rooms-greenwich-university-se10-london" },
      { code: "SE18", area: "Plumstead, Woolwich", note: "Great value rooms with Elizabeth line access at Woolwich.", href: "/affordable-rental-rooms-se18-plumstead-bills-included" },
      { code: "SE7", area: "Charlton", note: "Riverside area with quick trains to London Bridge.", href: "/rooms-to-rent-south-east-london" },
      { code: "SE13", area: "Lewisham, Hither Green", note: "DLR and National Rail links with a busy town centre.", href: "/rooms-to-rent-south-east-london" },
      { code: "SE28", area: "Thamesmead", note: "Affordable rooms close to Abbey Wood and the Elizabeth line.", href: "/rooms-to-rent-south-east-london" },
    ],
  },
  {
    name: "South West & Birmingham",
    areas: [
      { code: "SW9", area: "Stockwell", note: "Victoria and Northern lines, popular with students.", href: "/stockwell-sw9-student-housing-bills-included" },
      { code: "SW2", area: "Brixton, Brixton Hill", note: "Vibrant area with the Victoria line and Brixton Market." },
      { code: "SW16", area: "Streatham, Norbury", note: "Good-value rooms with fast rail links into central London." },
      { code: "B5", area: "Birmingham City Centre", note: "Student housing close to the city's universities and New Street.", href: "/birmingham-city-centre-student-housing-bills-included" },
      { code: "B15", area: "Edgbaston", note: "Leafy area close to the University of Birmingham.", href: "/birmingham-city-centre-student-housing-bills-included" },
      { code: "B29", area: "Selly Oak", note: "Popular student area right by the university campus.", href: "/birmingham-city-centre-student-housing-bills-included" },
    ],
  },
];

// Pin positions on the illustrated city plane (px within the 1100×880 plane).
// The map is illustrative, so every region reuses the same six slots.
const SLOTS = [[370, 182], [726, 182], [548, 350], [192, 518], [904, 518], [192, 182]];
export const PIN_POSITIONS = Object.fromEntries(
  REGIONS.flatMap((region) => region.areas.map((area, i) => [area.code, SLOTS[i % SLOTS.length]]))
);
export const MAP_ORIGIN = [904, 686]; // "Central London" marker
