import React from 'react';
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';
import HendonFAQ from './components/HendonFAQ';

export const metadata = {
  title: "Student Accommodation in NW4, London | Rent a Room in Hendon",
  description: "Looking for affordable rooms for rent in Hendon, NW4? We offer rental rooms for students & professionals near universities, workplaces, & travel hubs.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/cheap-rental-rooms-hendon-nw4-london",
  },
};

const page = () => {
  // ========== JSON-LD Schemas ==========
  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rentaroomlondon.co.uk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hendon",
        item: "https://rentaroomlondon.co.uk/cheap-rental-rooms-hendon-nw4-london",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "RentaRoomLondon",
    url: "https://rentaroomlondon.co.uk/cheap-rental-rooms-hendon-nw4-london",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rentaroomlondon.co.uk/find-a-room?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Room For Rent, London",
    description:
      "Rental Rooms Available at Hendon, NW4, London at affordable prices with bills included.",
    "@id": "https://rentaroomlondon.co.uk/cheap-rental-rooms-hendon-nw4-london",
    serviceType: "Room Rental",
    additionalType: "https://rentaroomlondon.co.uk/",
    url: "https://rentaroomlondon.co.uk/cheap-rental-rooms-hendon-nw4-london",
    image:
      "https://res.cloudinary.com/dyfiv680c/image/upload/v1784380437/RENTAROOMLONDON/images/WhatsApp_Image_2026-01-08_at_3.37.42_PM_melsgp.jpg",
    provider: {
      "@type": "Organization",
      name: "RentaRoomLondon",
      "@id": "https://rentaroomlondon.co.uk/",
      url: "https://rentaroomlondon.co.uk/",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Room For Rent, London Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rooms Rental",
            description:
              "Rooms available for Rental with bills included near Middlesex University in Hendon, NW4",
          },
        },
      ],
    },
    offers: {
      "@type": "Offer",
      price: 720,
      priceCurrency: "GBP",
      url: "https://rentaroomlondon.co.uk/contact-london-rental-room-uk",
      category: "Rooms Rental",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://rentaroomlondon.co.uk/find-a-room",
      },
      result: {
        "@type": "Reservation",
        name: "Search for Room",
      },
    },
    brand: {
      "@type": "Brand",
      name: "RentaRoomLondon",
    },
    logo: "https://rentaroomlondon.co.uk/_next/image?url=%2Frental-room-uk.avif&w=96&q=75",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a credit check?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As part of our standard referencing process, you will be referred to an external agency to verify your identity, confirm your legal Right to Rent in the UK, and assess your financial ability to meet monthly rental payments under the agreement.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if I fail the credit check?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you do not pass the credit check, you can provide a UK-based guarantor who agrees to cover rent if necessary. If a personal guarantor is not available, you may use an approved UK Rent Guarantor Scheme.",
        },
      },
      {
        "@type": "Question",
        name: "What documents do I need to rent a room in Hendon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You will typically need: Proof of ID (Valid Passport or Driving Licence), Proof of Right to Rent in the UK (Visa, Share Code, or Passport), Proof of Income or Student Status (recent payslips, employment contract, or university admission letter), and Bank statements from the last 3 months.",
        },
      },
      {
        "@type": "Question",
        name: "Are the rooms fully furnished?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All of our Hendon rooms are fully furnished and equipped with high-standard interior finishes. Amenities include modern shared or en-suite kitchens, brand-name appliances, double-glazed windows, gas central heating, energy-efficient LED lighting, bespoke wardrobes, and fully tiled bathrooms.",
        },
      },
      {
        "@type": "Question",
        name: "Are utility bills included in the rent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most of our rental rooms in Hendon NW4 include key bills such as High-Speed Wi-Fi, Water, Gas, Electricity, and Council Tax in the monthly price. Check the individual room listing for specific inclusions.",
        },
      },
      {
        "@type": "Question",
        name: "What is the deposit amount and how is it protected?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Deposits typically range from 2 to 5 weeks' rent depending on the room type. Your deposit is safely held in a government-approved Tenancy Deposit Scheme (TDS) for the duration of your tenancy.",
        },
      },
      {
        "@type": "Question",
        name: "Is Hendon (NW4) a good neighbourhood to live in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Hendon in North-West London (NW4) is popular among students, young professionals, and families. Residents value Hendon for its safety, tree-lined green spaces, convenient local shopping, peaceful residential feel, and fast public transport links into Central London.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Hendon located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hendon is a North-West London neighbourhood in the London Borough of Barnet. It sits south-east of Colindale (NW9), north-east of Dollis Hill (NW2), and north of Golders Green (NW11).",
        },
      },
      {
        "@type": "Question",
        name: "What transport links serve Hendon NW4?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Northern Line (Tube): Hendon Central Station (Zone 3) connects directly to Kings Cross St. Pancras, Euston, and London Bridge. Thameslink (National Rail): Hendon Railway Station offers fast connections to St Pancras International, Blackfriars, and Luton Airport. Buses & Road: Excellent bus routes (including 24-hour routes to Central London) and direct access to the A41, A406 (North Circular), and M1 motorway.",
        },
      },
      {
        "@type": "Question",
        name: "What local amenities and attractions are close to Hendon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hendon offers access to Brent Cross Shopping Centre, London's famous indoor shopping destination; Middlesex University, whose Hendon Campus is located right in NW4; Parks & Nature including Sunny Hill Park, Hendon Park, and the Brent Reservoir (Welsh Harp); and Dining & Groceries along Brent Street and West Hendon Broadway, featuring international supermarkets, local cafés, and restaurants.",
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
 
      <div>
        <HeroSection />
        <CricklewoodSpotlight />
        <PropertiesSection />
        <StudentAccommodation />
        <ConnectivitySection />
        <AreaGuide />
        <HendonFAQ />
      </div>
    </>
  );
};

export default page;