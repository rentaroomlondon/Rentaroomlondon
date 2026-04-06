import React from 'react'
import Hero from './components/Hero'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonial'
import Stats from '../components/Stats'
import MobileHowItWorks from './components/MobileHowItWorks'
import Testimonial from '../Shared/Testimonial'

export const metadata = {
  title: "How It Works - RENTAROOMLONDON",
  description:
    "Learn how Rent a Room London works. Discover how to find, book, and move into rooms across London بسهولة and securely.",

  keywords: [
    "how rent a room london works",
    "how to rent a room london",
    "room booking process london",
    "flatshare process london",
    "rent room guide london",
  ],

  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/how-it-works",
  },

  openGraph: {
    title: "How Rent a Room London Works",
    description:
      "Step-by-step guide to finding and booking rooms in London.",
    url: "https://rentaroomlondon.co.uk/how-it-works",
    siteName: "Rent a Room London",
    locale: "en_GB",
    type: "article",
  },

  twitter: {
    card: "summary",
    title: "How It Works - RENTAROOMLONDON",
    description:
      "Learn how to easily find and rent rooms in London.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
    <div>
      <Hero />
      <div className="hidden md:block">
        <HowItWorks />
        <Testimonials />
        <Stats />
      </div>
      <div className="block md:hidden">
        <MobileHowItWorks />
        <Testimonial
          text="My experience has been very positive. The staff working at The Rentaroomlondon have proved to be honest, reliable and the team ensured a stress-free rent."
          name="Maria Ibañez"
          source="Madrid via Trustpilot"
          rating={5}
        />
      </div>
    </div>
  )
}

export default page
