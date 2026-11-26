import React from 'react';
import HomePage from './components/home/HomePage';
import { getHomeRooms } from './components/home/lib/listings';

export const metadata = {
  title: "Rent a Room in London | Student Accommodation With Bills Included",
  description:
    "Looking to rent a room in London at low cost? Find affordable student accommodation & flatshares with bills included, near top universities and transport.",

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

export default async function Home() {
  // Live rooms for the "Rooms ready to move into" carousel (cached 5 min)
  const rooms = await getHomeRooms();

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

      <HomePage rooms={rooms} />
      
    </div>
  );
}