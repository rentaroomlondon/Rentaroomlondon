import React from 'react'
import Hero from '../Shared/Hero'
import Testimonial from '../Shared/Testimonial'
import Contact from './components/Contact'

// 🔥 SEO METADATA
export const metadata = {
  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  // 🔥 SEO TITLE (intent-based)
  title: "Contact Rent a Room London - Get in Touch",

  // 🔥 DESCRIPTION (conversion-focused)
  description:
    "Contact Rent a Room London today. Visit our Stepney Green office or get in touch online to find affordable rooms and properties across London.",

  // ✅ CANONICAL
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/contact-us",
  },

  // ✅ ROBOTS
  robots: {
    index: true,
    follow: true,
  },

  // ✅ OPEN GRAPH (SOCIAL SHARING)
  openGraph: {
    title: "Contact Rent a Room London",
    description:
      "Get in touch with our team. Visit our London office or contact us online for room rentals and property enquiries.",
    url: "https://rentaroomlondon.co.uk/contact-us",
    siteName: "RENTAROOMLONDON",
    type: "website",
    images: [
      {
        width: 1200,
        height: 630,
        alt: "Contact Rent a Room London",
      },
    ],
  },

  // ✅ TWITTER
  twitter: {
    card: "summary_large_image",
    title: "Contact Rent a Room London",
    description:
      "Reach out to Rent a Room London. Visit our office or contact us online.",
  },

  // ⚠️ OPTIONAL
  keywords: [
    "contact rent a room london",
    "london property contact",
    "room rental london contact",
    "estate agent london contact",
  ],
};

const page = () => {
  return (
    <div>
      <Hero
        badge="Contact us"
        title="Where to "
        highlight="Find Us"
        description="We'd love to hear from you. Visit us at our Stepney Green office or reach out online."
      />

      <Contact />
      
      <Testimonial
        text="I would like to say, once again, how impressed I am with Rentaroomlondon. I would remark on the professionalism and responsibility of the agency and how pleasant everyone was. This has been a complete change for my past experience with estate agents."
        name="Anna Hudson"
        source="London Trustpilot"
        rating={5}
      />
    </div>
  )
}

export default page
