import React from 'react'
import Hero from '../Shared/Hero'
import Testimonial from '../Shared/Testimonial'
import Contact from './components/Contact'

// 🔥 SEO METADATA
export const metadata = {
  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  // 🔥 SEO TITLE (intent-based)
  title: "Contact Us for Affordable Room Rentals in London",

  // 🔥 DESCRIPTION (conversion-focused)
  description:
    "Speak with our team about available room rentals across London. Direct bookings, transparent pricing, and no hidden fees or broker commissions.",

  // ✅ CANONICAL
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/contact-us",
  },

  // ✅ ROBOTS
  robots: {
    index: true,
    follow: true,
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
        title="Find Your Perfect Room in London — Direct & Hassle-Free "
        highlight="Find Us"
        description="No brokers. No hidden fees. Just affordable rooms rented directly from trusted landlords."
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
