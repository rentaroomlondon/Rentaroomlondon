import React from 'react'
import Hero from './components/Hero'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonial'
import Stats from '../components/Stats'
import MobileHowItWorks from './components/MobileHowItWorks'
import Testimonial from '../Shared/Testimonial'

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
