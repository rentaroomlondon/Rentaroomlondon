import React from 'react'
import Hero from '../Shared/Hero'
import MaintenanceForm from './components/MaintenanceForm'

const page = () => {
  return (
    <div>
        <Hero
            badge="Maintenance"
            title="Report a "
            highlight="Repair"
            description="Log your repair quickly and we'll respond within 30 minutes during office hours."
        />
        <MaintenanceForm />
    </div>
  )
}

export default page
