import React from 'react'
import Hero from '../Shared/Hero'
import Testimonial from '../Shared/Testimonial'
import LegalFooter from '../Shared/LegalFooter'
import DynamicFaq, { faqContent } from './components/faqContent'
import FaqSchema from './components/FaqSchema'

export const metadata = {
  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  title: "Tenant FAQs - Rent a Room London Help Centre",

  description:
    "Find answers to common tenant questions about renting rooms in London. Learn about pricing, deposits, contracts and more.",

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/faqs",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Tenant FAQs - Rent a Room London",
    description:
      "Explore frequently asked questions about renting rooms in London.",
    url: "https://rentaroomlondon.co.uk/faqs",
    siteName: "RENTAROOMLONDON",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Tenant FAQs",
    description:
      "Answers to common questions about renting rooms in London.",
  },
};

const page = () => {
  return (
    <div>

       {/* ✅ VERY IMPORTANT (SEO STRUCTURE DATA) */}
      <FaqSchema data={faqContent.All} />

      <Hero
        badge="Help Centre"
        title="Tenant"
        highlight="FAQs"
        description="We've compiled answers to the most common questions. If you have further questions, please"
        linkText="contact us"
        linkHref="/contact-us"
      />
      <DynamicFaq />
      <Testimonial
        text="Incredible experience, very easy to work with and no doubt would I work with them again."
        name="Max Lochrie"
        source="Google"
        rating={5}
      />
      <LegalFooter
        items={[
          "© {year} Oliver Walton Ltd T/A Rentaroomlondon",
        ]}
      /> 
    </div>
  )
}

export default page
