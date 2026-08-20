import React from 'react';
import HeroSection from './components/Hero';
import SouthEastLondonSpotlight from './components/SouthEastLondonSpotlight';
import PropertiesSection from './components/PropertiesSection';
import GettingAroundSouthEastLondon from './components/GettingAroundSouthEastLondon';
import SouthEastLondonFAQ from './components/SouthEastLondonFAQ';

export const metadata = {
  title: "Rooms to Rent in South East London | Accommodation in London",
  description: "Rent a room across South East London with bills included and furnished rooms. Accommodation for students and professionals.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rooms-to-rent-south-east-london",
  },
};

const page = () => {
  return (
    <div>
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            "name": "RentaRoomLondon",
            "url": "https://rentaroomlondon.co.uk/rooms-to-rent-south-east-london",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://rentaroomlondon.co.uk/find-a-room?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* FAQ Schema (Updated for South East London) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which areas do you cover here?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We currently list verified rooms in Plumstead, Eltham, Greenwich, and Stockwell."
                }
              },
              {
                "@type": "Question",
                "name": "Which area has the fastest commute into Central London?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Stockwell offers the fastest route, with direct Victoria and Northern line journeys of around 10–15 minutes into the West End."
                }
              },
              {
                "@type": "Question",
                "name": "Is Greenwich good for university students?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes — Greenwich is home to the University of Greenwich campus, with DLR and National Rail links into Central London and Canary Wharf."
                }
              },
              {
                "@type": "Question",
                "name": "Are Plumstead and Eltham cheaper than Greenwich or Stockwell?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Generally yes — Plumstead and Eltham tend to offer lower rents, reflecting their Zone 4 location and longer commute times compared to Greenwich and Stockwell."
                }
              }
            ]
          })
        }}
      />

      <HeroSection />
      <SouthEastLondonSpotlight />
      <PropertiesSection />
      <GettingAroundSouthEastLondon />
      <SouthEastLondonFAQ />
    </div>
  );
};

export default page;