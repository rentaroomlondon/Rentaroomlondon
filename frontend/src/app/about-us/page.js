import React from "react";
import Hero from "../Shared/Hero";
import CredentialStrip from "./components/CredentialStrip";
import About from "./components/About";
import Testimonial from "../Shared/Testimonial";

// 🔥 SEO METADATA
export const metadata = {
  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  title: "About RENTAROOMLONDON - Trusted Room Rental Agency",

  description:
    "Learn about RENTAROOMLONDON – a trusted room rental agency helping people find affordable, verified accommodation across London.",

  // ✅ CORRECT CANONICAL
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/about-us",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "About RENTAROOMLONDON",
    description:
      "Discover our story, values, and why we are one of London's most trusted room rental agencies.",
    url: "https://rentaroomlondon.co.uk/about-us",
    siteName: "RENTAROOMLONDON",
    type: "website",
    images: [
      {
        url: "https://rentaroomlondon.co.uk/About.jpg", // ✅ use jpg/png
        width: 1200,
        height: 630,
        alt: "About Rent a Room London",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Rent a Room London",
    description:
      "Trusted room rental agency in London. Learn more about our story and services.",
    images: ["https://rentaroomlondon.co.uk/About.jpg"],
  },

  keywords: [
    "about rent a room london",
    "london room rental agency",
    "rooms for rent london",
    "property rental london",
  ],
};

// 🔥 PAGE
const page = () => {
  return (
    <div>
      <Hero
        badge="Our Story"
        title="About "
        highlight="Us"
        description="London's leading room rental agency since 2002 — built on trust, quality, and genuinely caring."
      />

      <CredentialStrip />

      <About />

      <Testimonial
        text="Incredible experience, very easy to work with and no doubt would I work with them again."
        name="Max Lochrie"
        source="Google"
        rating={5}
      />
    </div>
  );
};

export default page;