// Hero copy — from index_page_content.docx ("banner" + H1 + intro).
export const HERO = {
  badge: "London’s #1 Agency for Rooms to Rent",
  titleLines: ["Rent a Room in Share House", "With Bills included"],
  intro:
    "Find rooms for rent near to the tube and top universities in London. One simple monthly rent covers your bills, Wi-Fi and more. Rentaroomlondon for house share, flat share & rooms from shared accommodation.",
  image: {
    src: "/home/hero.webp",
    alt: "Looking up at a courtyard of red London apartment blocks against a blue sky",
  },
};

export const OFFER = {
  label: "LIMITED OFFER",
  headline: "Special price for your first 2 months",
  detail: " on selected rooms — from [£OFFER PRICE]/month",
  cta: { label: "See offer rooms", href: "/find-a-room" },
};

// `roomType` matches the values /find-a-room and the listings API understand.
export const SEARCH_ROOM_TYPES = [
  { label: "Any", roomType: "" },
  { label: "Single room", roomType: "single" },
  { label: "Double room", roomType: "double" },
  { label: "Studio", roomType: "studio" },
  { label: "Shared flat", roomType: "" },
  { label: "Student", roomType: "" },
];

export const HERO_STATS = [
  { value: "All bills", label: "INCLUDED IN RENT" },
  { value: "Zones 1–3", label: "NEAR TUBE & UNIVERSITIES" },
  { value: "Flexible", label: "SHORT & LONG STAYS" },
];
