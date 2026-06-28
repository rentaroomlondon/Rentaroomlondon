import React from 'react';
import Testimonials from './components/Testimonial';
import HeroSection from './components/HeroSection';
import RoomTypeSection from './components/RoomTypeSection';
import RoomRentalServices from './components/RoomRentalServices';
import LocationDirectory from './components/LocationDirectory';
import RentalProcess from './components/RentalProcess';
import RentalFAQ from './components/RentalFAQ';

import dynamic from "next/dynamic";

const GallerySection = dynamic(() => import("./components/GallerySection"));

export const metadata = {
  title: "Best Rental Rooms For Students And Professionals In London",
  description:
    "Find affordable accommodation in London, perfect for students and professionals with easy access to universities and city transport with bills included.",

  keywords: [
    "rent a room london",
    "rooms for rent london",
    "flatshare london",
    "cheap rooms london",
    "apartments london rent",
  ],

  alternates: {
    canonical: "https://rentaroomlondon.co.uk",
  },

  openGraph: {
    title: "Rooms for Rent in London | Rent a Room London",
    description:
      "Browse verified rooms, flatshares, and apartments across London.",
    url: "https://rentaroomlondon.co.uk",
    siteName: "Rent a Room London",
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Rooms for Rent in London",
    description:
      "Find affordable rooms and shared properties in London.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const structuredData = [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Rent a Room London",
      url: "https://rentaroomlondon.co.uk",
      logo: "https://rentaroomlondon.co.uk/rental-room-uk.jpeg",
    },

    // Website Schema (Search box in Google)
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Rent a Room London",
      url: "https://rentaroomlondon.co.uk",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://rentaroomlondon.co.uk/find-a-room?location={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <HeroSection />
      <RoomTypeSection />
      <RoomRentalServices />
      <LocationDirectory />
      <RentalProcess />
      <Testimonials />
      <GallerySection />
      <RentalFAQ />
      
    </div>
  );
}