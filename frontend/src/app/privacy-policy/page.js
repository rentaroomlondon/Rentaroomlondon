import React from 'react'
import Hero from '../Shared/Hero'
import RegisterCTA from './components/RegisterCTA'
import PrivacyPolicy from './components/PrivacyPolicy'

const page = () => {
  return (
    <div>
      <Hero
        badge="Legal"
        title="Privacy"
        highlight="Policy"
        description="How we handle your personal data in compliance with UK data protection laws and the General Data Protection Regulation (GDPR)."
      />

      <RegisterCTA />
      <PrivacyPolicy />
    </div>
  )
}

export default page
