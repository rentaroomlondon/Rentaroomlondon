import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Affordable Rental Rooms for Student Se18 Plumstead |Bills Included",
  description: "Find affordable student accommodation in Plumstead SE18 with all bills included. Close to Woolwich Elizabeth line, University of Greenwich & London South Bank.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/affordable-rental-rooms-se18-plumstead-bills-included", // Adjust to your actual URL
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
