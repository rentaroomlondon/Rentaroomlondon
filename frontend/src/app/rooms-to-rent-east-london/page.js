import React from 'react';
import HeroSection from './components/Hero';
import EastLondonSpotlight from './components/EastLondonSpotlight';
import PropertiesSection from './components/PropertiesSection';
import GettingAroundEastLondon from './components/GettingAroundEastLondon';
import EastLondonFAQ from './components/EastLondonFAQ';

export const metadata = {
  title: "Rooms to Rent in East London with Bills Included",
  description: "Browse verified rooms to rent across East London. South Tottenham, Leyton & East Ham. Bills included, furnished rooms.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rooms-to-rent-east-london",
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
            "url": "https://rentaroomlondon.co.uk/rooms-to-rent-east-london",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://rentaroomlondon.co.uk/find-a-room?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* FAQ Schema (Updated for East London) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which East London areas do you have rooms in?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We currently list verified rooms in South Tottenham, Leyton, and East Ham, with bills-included options across all three."
                }
              },
              {
                "@type": "Question",
                "name": "Which East London area has the fastest commute into Central London?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "South Tottenham typically offers the fastest route into Central London, with a direct Victoria line journey of around 18–20 minutes from Seven Sisters."
                }
              },
              {
                "@type": "Question",
                "name": "Is East London cheaper than Hackney or Islington?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, South Tottenham, Leyton, and East Ham all sit outside Zone 2's higher price bracket, offering meaningfully lower rents than Hackney or Islington while retaining strong transport links."
                }
              },
              {
                "@type": "Question",
                "name": "Are bills included in East London room rentals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bills-included options are available across our East London listings — check individual room listings for confirmed details."
                }
              }
            ]
          })
        }}
      />

      <HeroSection />
      <EastLondonSpotlight />
      <PropertiesSection />
      <GettingAroundEastLondon />
      <EastLondonFAQ />
    </div>
  );
};

export default page;