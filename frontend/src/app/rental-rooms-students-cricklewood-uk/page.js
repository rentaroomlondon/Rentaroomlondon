import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';
import CricklewoodFAQ from './components/CricklewoodFAQ';


export const metadata = {
  title: "Affordable Rental Rooms in Cricklewood (NW2), London",
  description: "Explore affordable rental rooms in Cricklewood, London with bills included. Ideal for students and professionals near transport and universities. Book your room today!",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rental-rooms-students-cricklewood-uk", // Adjust to your actual URL
  },
};

const page = () => {
    
  return (
    <div>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://rentaroomlondon.co.uk/"  
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Cricklewood",
              "item": "https://rentaroomlondon.co.uk/rental-rooms-students-cricklewood-uk#"  
            }]
          })
        }}
      />

      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            "name": "RentaRoomLondon",
            "url": "https://rentaroomlondon.co.uk/rental-rooms-students-cricklewood-uk#",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "{search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Room For Rent, London",
            "description": "Rental Rooms Available at Cricklewood, uk at affordable prices with bills included.",
            "@id": "https://rentaroomlondon.co.uk/rental-rooms-students-cricklewood-uk#",
            "serviceType": "Room Rental",
            "additionalType": "https://rentaroomlondon.co.uk/",
            "url": "https://rentaroomlondon.co.uk/rental-rooms-students-cricklewood-uk#",
            "image": "https://res.cloudinary.com/dyfiv680c/image/upload/v1784380437/RENTAROOMLONDON/images/WhatsApp_Image_2026-01-08_at_3.37.42_PM_melsgp.jpg",
            "provider": {
              "@type": "Organization",
              "name": "RentaRoomLondon",
              "@id": "https://rentaroomlondon.co.uk/",
              "url": "https://rentaroomlondon.co.uk/"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Room For Rent, London Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Rooms Rental",
                    "description": "Rooms available for Rental with bills included near university in London"
                  }
                }
              ]
            },
            "offers": {
              "@type": "Offer",
              "price": 720,
              "priceCurrency": "GBP",
              "url": "https://rentaroomlondon.co.uk/contact-london-rental-room-uk",
              "category": "Rooms Rental"
            },
            "potentialAction": {
              "@type": "ReserveAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://rentaroomlondon.co.uk/find-a-room"
              },
              "result": {
                "@type": "Reservation",
                "name": "Search for Room"
              }
            },
            "brand": {
              "@type": "Brand",
              "name": "RentaRoomLondon"
            },
            "logo": "https://rentaroomlondon.co.uk/_next/image?url=%2Frental-room-uk.avif&w=96&q=75"
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "How far are these rental rooms from Middlesex University?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cricklewood is approximately 1.5–1.8 miles from Middlesex University (The Burroughs campus, Hendon). You can take direct 245 or 266 bus routes from Cricklewood Broadway, which arrive right at campus in 20 to 25 minutes."
              }
            },{
              "@type": "Question",
              "name": "Do international students need a UK guarantor to rent a room?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If you are an international student without a UK-based guarantor, you can either pay rent upfront (typically 3 to 6 months) or use an approved UK guarantor service (such as Housing Hand or Guarantid)."
              }
            },{
              "@type": "Question",
              "name": "Are single and double rooms available for individual students?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer single occupancy double rooms, single rooms, studios, and flat shares depending on your budget and preference."
              }
            },{
              "@type": "Question",
              "name": "Can I book a room online before moving to London?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We offer virtual video walkthroughs and online booking so international and out-of-town students can secure a room before arriving in London."
              }
            },{
              "@type": "Question",
              "name": "Is Cricklewood a safe area for international and university students?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Cricklewood is a popular, family-friendly residential area. Our properties feature secure entry systems, keycard locks, and CCTV in communal spaces. Well-lit main streets like Cricklewood Broadway provide safe, frequent bus routes operating 24/7."
              }
            },{
              "@type": "Question",
              "name": "How far is Brent Cross Shopping Centre from Cricklewood?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Brent Cross, one of North London's premier shopping destinations, is only 1.5 miles away (about a 10-minute bus ride), featuring over 120 retail stores, department stores, and dining spots."
              }
            },{
              "@type": "Question",
              "name": "How quick is the train commute from Cricklewood Station to Central London universities? +",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cricklewood Station operates on the Thameslink line (Zone 3), providing exceptionally fast, direct connection times: King’s Cross St Pancras / UCL: ~14 minutes, Farringdon (City / Bayes): ~17 minutes, Blackfriars / LSE / KCL: ~20 minutes"
              }
            },{
              "@type": "Question",
              "name": "What major universities are closest to Cricklewood?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cricklewood is strategically located for several major London institutions: Middlesex University (Hendon): 1.5–1.8 miles (20 mins via direct 245/266 buses), ESCP Business School (West Hampstead): 1.1 miles (~15 mins), University College London (UCL): Direct 14-min train to St Pancras, University of Westminster (Harrow Campus): ~30 mins via bus/train"
              }
            },{
              "@type": "Question",
              "name": "Where do students go for gym and fitness near Cricklewood Lane?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Residents have access to David Lloyd Cricklewood directly on Cricklewood Lane, as well as multiple budget-friendly gyms nearby including The Gym Group (Kilburn) and PureGym (Hendon)."
              }
            },{
              "@type": "Question",
              "name": "Where is the best place to study outdoors or relax near Cricklewood?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Gladstone Park is a 35-hectare green space featuring rose gardens, outdoor sports facilities, and panoramic views of the London skyline. For a quiet, closer green space, Cricklewood Millennium Green offers a serene spot for reading or relaxation."
              }
            }]
          })
        }}
      />

      <HeroSection />
      <CricklewoodSpotlight />
      <PropertiesSection />
      <StudentAccommodation />
      <ConnectivitySection />
      <AreaGuide />
      <CricklewoodFAQ />
    </div>
  )
}

export default page