import React, { Suspense } from "react";
import PropertySearch from "./components/PropertySearch";
import LeadPopup from "./components/LeadPopup";

export const metadata = {
  title: "Find a Room in London - Search Rooms & Flatshares",
  description:
    "Search rooms for rent in London with live map view. Explore shared apartments, studios, and affordable rooms across all London areas.",

  keywords: [
    "find a room london",
    "room search london",
    "flatshare london search",
    "rent rooms london map",
    "property search london",
  ],

  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/find-a-room",
  },

  openGraph: {
    title: "Find a Room in London",
    description:
      "Search and explore available rooms in London using map-based results.",
    url: "https://rentaroomlondon.co.uk/find-a-room",
    siteName: "Rent a Room London",
    locale: "en_GB",
    type: "website",
    // No image → it's okay, Google will still index
  },

  twitter: {
    card: "summary",
    title: "Find a Room in London",
    description:
      "Browse rooms and flatshares in London with an interactive map.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PropertySearch />
      </Suspense>

      <LeadPopup />
    </div>
  );
};

export default page;