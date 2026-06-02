import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Stockwell SW9 Student Rooms Near Brixton | Bills Included",
  description: "Find budget student housing in Stockwell SW9 with bills included. Zone 2 — Victoria line to Oxford Circus in 12 minutes. Great for central London unis.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/stockwell-sw9-student-housing-bills-included", // Adjust to your actual URL
  },
};

const page = () => {
    
  return (
    <div>
      <HeroSection />
      <CricklewoodSpotlight />
      <PropertiesSection />
      <StudentAccommodation />
      <ConnectivitySection />
      <AreaGuide />
    </div>
  )
}

export default page
