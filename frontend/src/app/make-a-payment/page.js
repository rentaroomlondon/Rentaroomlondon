import React from 'react'
import Hero from '../Shared/Hero'
import LegalFooter from '../Shared/LegalFooter'
import PaymentForm from './components/PaymentForm'

const page = () => {
  return (
    <div>
      <Hero
        badge="Secure Payment"
        title="Make a "
        highlight="Payment"
        description="Pay your rent securely online using a debit or credit card."
      />
      <PaymentForm />
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
