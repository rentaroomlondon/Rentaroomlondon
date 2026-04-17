import React from "react";
import Hero from "./components/Hero";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";

// 🔥 SEO METADATA
export const metadata = {
  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  // ✅ STRONG SEO TITLE (keyword first + CTR optimized)
  title: "UK Rooms to Rent at Affordable Prices – Bills Included",

  // ✅ HIGH-CONVERTING DESCRIPTION
  description:
    "Search hundreds of affordable rooms to rent across the UK with bills included. Whether you're a student, professional, or key worker — find a great-value room that covers all your utility costs in one easy payment.",

  // ✅ CORRECT URL
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/affordable-rental-room-uk",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "UK Rooms to Rent at Affordable Prices – Bills Included",
    description:
      "Search hundreds of affordable rooms to rent across the UK with bills included. Whether you're a student, professional, or key worker — find a great-value room that covers all your utility costs in one easy payment.",
    url: "https://rentaroomlondon.co.uk/affordable-rental-room-uk",
    siteName: "RENTAROOMLONDON",
    type: "website",
    images: [
      {
        url: "https://rentaroomlondon.co.uk/About.jpg",
        width: 1200,
        height: 630,
        alt: "Affordable Rooms to Rent in UK",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UK Rooms to Rent at Affordable Prices – Bills Included",
    description:
      "Search hundreds of affordable rooms to rent across the UK with bills included. Whether you're a student, professional, or key worker — find a great-value room that covers all your utility costs in one easy payment.",
    images: ["https://rentaroomlondon.co.uk/About.jpg"],
  },

  keywords: [
    "affordable rooms UK",
    "rooms to rent UK bills included",
    "cheap rooms UK",
    "student accommodation UK",
    "professional rental rooms UK",
  ],
};

// 🔥 PAGE
const page = () => {
  return (
    <div>
      <Hero
        title="Top Rated Rental Room "
        highlight="Service Provider in UK"
        description="Contact RentaRoomLondon, to find the best accommodation near you."
      />

      <Section1 />

      <Section2 />

      <Section3 />

      <Section4 />

      <Section5 />

      <Section6 />

      <Section7 />
      
    </div>
  );
};

export default page;