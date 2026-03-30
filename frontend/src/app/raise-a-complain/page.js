import React from 'react'
import Hero from './components/Hero'
import Complaint from './components/Complaint'
import Testimonial from '../Shared/Testimonial'

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
