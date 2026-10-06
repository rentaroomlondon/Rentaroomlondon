import React from "react";
import HeroSection from './components/Hero';
import HarrowSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';
import HarrowFAQ from './components/CricklewoodFAQ';

const pageUrl = "https://rentaroomlondon.co.uk/rental-rooms-students-harrow-ha1-bills-included";

export const metadata = {
  title: "Student Accommodation & Rooms to Rent in Harrow HA1 | Bills Included",
  description: "Find student rooms and rooms to rent in West Harrow, HA1 4ED. Single and double rooms with bills included, near the Metropolitan line and University of Westminster Harrow campus.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Student Accommodation & Rooms to Rent in Harrow HA1",
    description: "Furnished student and professional rooms in West Harrow, with bills included and convenient Metropolitan line connections.",
    url: pageUrl,
    type: "website",
  },
};

const page = () => (
  <div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rentaroomlondon.co.uk/" },
        { "@type": "ListItem", position: 2, name: "Rooms to Rent in Harrow HA1", item: pageUrl },
      ],
    }) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Rooms to rent in Harrow HA1",
      description: "Furnished single and double rooms for students and professionals in West Harrow, with bills included.",
      url: pageUrl,
      serviceType: "Room rental",
      provider: { "@type": "Organization", name: "RentaRoomLondon", url: "https://rentaroomlondon.co.uk/" },
      areaServed: { "@type": "Place", name: "West Harrow, HA1 4ED, London" },
    }) }} />
    <HeroSection />
    <HarrowSpotlight />
    <PropertiesSection />
    <StudentAccommodation />
    <ConnectivitySection />
    <AreaGuide />
    <HarrowFAQ />
  </div>
);

export default page;
