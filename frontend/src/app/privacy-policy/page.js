import React from 'react'
import Hero from '../Shared/Hero'
import RegisterCTA from './components/RegisterCTA'
import PrivacyPolicy from './components/PrivacyPolicy'

export const metadata = {
  title: "Privacy Policy - RENTAROOMLONDON",

  description:
    "Read the Privacy Policy of Rent a Room London. Learn how we collect, use, and protect your personal data in compliance with UK GDPR laws.",

  keywords: [
    "privacy policy rent a room london",
    "gdpr policy uk property website",
    "data protection london rentals",
    "user privacy rentaroomlondon",
  ],

  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/privacy-policy",
  },

  openGraph: {
    title: "Privacy Policy - RENTAROOMLONDON",
    description:
      "Learn how Rent a Room London handles and protects your personal data.",
    url: "https://rentaroomlondon.co.uk/privacy-policy",
    siteName: "Rent a Room London",
    locale: "en_GB",
    type: "article",
  },

  twitter: {
    card: "summary",
    title: "Privacy Policy - RENTAROOMLONDON",
    description:
      "Understand how your data is handled and protected.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
    <div>
      <Hero
        badge="Legal"
        title="Privacy"
        highlight="Policy"
        description="How we handle your personal data in compliance with UK data protection laws and the General Data Protection Regulation (GDPR)."
      />

      <RegisterCTA />
      <PrivacyPolicy />
    </div>
  )
}

export default page
