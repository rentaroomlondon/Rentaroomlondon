import React from 'react';
import TrustBadges from './components/TrustBadges';
import Office from './components/Office';
import Stats from './components/Stats';
import Testimonials from './components/Testimonial';
import AreaGuides from './components/AreaGuides';
import FeaturedRooms from './components/FeaturedRooms';
import HowItWorks from './components/HowItWorks';
import HeroSection from './components/HeroSection';

export const metadata = {
  title: "Rooms for Rent in London | Rent a Room London",
  description:
    "Find rooms for rent in London. Browse affordable rooms, flatshares, and apartments with verified listings across all London areas.",

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
      logo: "https://rentaroomlondon.co.uk/logo.png",
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
      <HowItWorks />
      <FeaturedRooms />
      <AreaGuides />
      <Testimonials />
      <Stats />
      <Office />
      <div className="hidden lg:block">
        <TrustBadges />
      </div>
    </div>
  );
}