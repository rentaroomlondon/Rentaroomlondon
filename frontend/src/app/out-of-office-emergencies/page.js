import React from 'react'
import Hero from '../Shared/Hero'
import Testimonial from '../Shared/Testimonial'
import LegalFooter from '../Shared/LegalFooter'
import Emergency from './components/Emergency'

export const metadata = {
  title: "Emergency Contact - RENTAROOMLONDON",

  description:
    "Out of office emergency contact information for Rent a Room London tenants and customers.",

  robots: {
    index: false,
    follow: true, // allow link equity to flow
    nocache: true,
  },

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/out-of-office-emergencies",
  },
};

const page = () => {
  return (
    <div>
      <Hero
        badge="Urgent Help"
        title="Out of Office "
        highlight="Emergencies"
        description="Our normal office hours are Monday–Friday 10am–5pm and Saturdays 10am–3pm."
      />
      
      <Emergency />
      
      <div className="hidden md:block">
        <Testimonial
          text="I would like to say, once again, how impressed I am with Rentaroomlondon. I would remark on the professionalism and responsibility of the agency and how pleasant everyone was."
          name="Anna Hudson"
          source="London Trustpilot"
          rating={5}
        />
        <LegalFooter
            items={[
            "© {year} Rentaroomlondon",
            ]}
        /> 
      </div>
    </div>
  )
}

export default page
