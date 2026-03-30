import React from 'react'
import Hero from '../Shared/Hero'
import CredentialStrip from './components/CredentialStrip'
import About from './components/About'
import Testimonial from '../Shared/Testimonial'

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
  )
}

export default page
