import React from 'react'
import Hero from './components/Hero'
import Complaint from './components/Complaint'
import Testimonial from '../Shared/Testimonial'

export const metadata = {
  title: "Customer Complaints - RENTAROOMLONDON",

  description:
    "Raise a complaint with Rent a Room London. We are committed to resolving issues professionally and efficiently.",

  robots: {
    index: false,
    follow: true, // allow SEO value to pass through links
    nocache: true,
  },

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/raise-a-complain",
  },
};

const page = () => {
  return (
    <div>
      <Hero
        badge="Customer Care"
        title="Raise a "
        highlight="Complain"
        description="We value the opinions of our customers and are committed to providing a professional service at all times."
      />

      <Complaint />

        <div className="hidden md:block">
        <Testimonial
            text="I would like to say, once again, how impressed I am with Rentaroomlondon. I would remark on the professionalism and responsibility of the agency."
            name="Anna Hudson"
            source="London Trustpilot"
            rating={5}
        />
        </div>
    </div>
  )
}

export default page
