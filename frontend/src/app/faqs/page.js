import React from 'react'
import Hero from '../Shared/Hero'
import Testimonial from '../Shared/Testimonial'
import LegalFooter from '../Shared/LegalFooter'
import DynamicFaq from './components/faqContent'

const page = () => {
  return (
    <div>
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
