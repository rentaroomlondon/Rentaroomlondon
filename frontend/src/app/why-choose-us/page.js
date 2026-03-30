import React from 'react'
import Hero from './components/Hero'
import WhyUs from './components/WhyUs'
import Testimonial from '../Shared/Testimonial'
import LegalFooter from '../Shared/LegalFooter'

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
