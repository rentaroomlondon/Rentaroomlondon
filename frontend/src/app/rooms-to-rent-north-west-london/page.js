import React from 'react';
import HeroSection from './components/Hero';
import NorthWestLondonSpotlight from './components/NorthWestLondonSpotlight';
import PropertiesSection from './components/PropertiesSection';
import GettingAroundNorthWestLondon from './components/GettingAroundNorthWestLondon';
import NorthWestLondonFAQ from './components/NorthWestLondonFAQ';

export const metadata = {
  title: "Rooms to Rent in North West London at Affordable Cost",
  description: "Browse verified rooms to rent across North West London for students and professional with easy transportation access. Bills included, furnished rooms, flexible move-in.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rooms-to-rent-north-west-london",
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
            "url": "https://rentaroomlondon.co.uk/rooms-to-rent-north-west-london",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://rentaroomlondon.co.uk/find-a-room?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* FAQ Schema (Updated for North West London) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which areas do you cover in North West London?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We currently list verified rooms in Cricklewood, Harlesden, Kingsbury, West Hampstead, and Hendon."
                }
              },
              {
                "@type": "Question",
                "name": "Which North West London area is closest to Middlesex University?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hendon is home to Middlesex University's main campus, with Cricklewood also offering direct bus routes (245/266) to campus in around 20–25 minutes."
                }
              },
              {
                "@type": "Question",
                "name": "What's the best-connected area in North West London?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "West Hampstead stands out with Overground, Jubilee line, and Thameslink all serving the same station, giving multiple fast routes into Central London."
                }
              },
              {
                "@type": "Question",
                "name": "Are these areas good value compared to Kilburn or Camden?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Cricklewood, Harlesden, Kingsbury, West Hampstead, and Hendon all typically offer lower rents than Kilburn or Camden while keeping similar transport access."
                }
              }
            ]
          })
        }}
      />

      <HeroSection />
      <NorthWestLondonSpotlight />
      <PropertiesSection />
      <GettingAroundNorthWestLondon />
      <NorthWestLondonFAQ />
    </div>
  );
};

export default page;