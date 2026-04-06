import React from 'react'
import Hero from '../Shared/Hero'
import Testimonial from '../Shared/Testimonial'
import CareersIntro from './components/CareersIntro'

export const metadata = {
  title: "Careers at Rent a Room London - Work With Us",

  description:
    "Explore career opportunities at Rent a Room London. Join our team and grow your career in the property rental industry.",

  robots: {
    index: false,
    follow: true,
    nocache: true,
  },

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/work-for-us",
  },
};


const page = () => {
  return (
    <div>
      <Hero
        badge="Join Our Team"
        title="Come and Work For Us"
        highlight="For Us"
        description="Are you a self-confident, passionate, and enthusiastic person? Find career and employment opportunities at Rentaroomlondon."
      />

     <CareersIntro />
      
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
