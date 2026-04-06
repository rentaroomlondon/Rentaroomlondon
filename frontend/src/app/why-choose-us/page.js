import React from 'react'
import Hero from './components/Hero'
import WhyUs from './components/WhyUs'
import Testimonial from '../Shared/Testimonial'
import LegalFooter from '../Shared/LegalFooter'

export const metadata = {
  title: "Why Choose Rent a Room London - Trusted Room Rentals",

  description:
    "Discover why Rent a Room London is trusted by tenants. We offer verified listings, secure bookings, and a hassle-free rental experience across London.",

  keywords: [
    "why choose rent a room london",
    "trusted room rentals london",
    "verified property listings london",
    "safe room rent london",
    "best room rental website london",
  ],

  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/why-choose-us",
  },

  openGraph: {
    title: "Why Choose Rent a Room London",
    description:
      "Trusted by tenants across London. Discover safe and reliable room rentals.",
    url: "https://rentaroomlondon.co.uk/why-choose-us",
    siteName: "Rent a Room London",
    locale: "en_GB",
    type: "article",
  },

  twitter: {
    card: "summary",
    title: "Why Choose Us - RENTAROOMLONDON",
    description:
      "Find out why tenants trust Rent a Room London.",
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
      <WhyUs />
      <Testimonial
        text="My experience has been very positive. The staff working at The Rentaroomlondon have proved to be honest, reliable and the team ensured a stress-free rent."
        name="Maria Ibañez"
        source="Madrid via Trustpilot"
        rating={5}
      />
      <LegalFooter
        items={[
          "© {year} Oliver Walton Ltd T/A Rentaroomlondon",
          "Property Redress Scheme",
          "My Deposits Protection Scheme",
          "Client Money Protect",
        ]}
      />
    </div>
  )
}

export default page
