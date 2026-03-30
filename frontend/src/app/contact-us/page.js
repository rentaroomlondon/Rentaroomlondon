import React from 'react'
import Hero from '../Shared/Hero'
import Testimonial from '../Shared/Testimonial'
import Contact from './components/Contact'

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
