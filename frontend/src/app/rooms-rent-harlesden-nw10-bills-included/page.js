import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Rent a Room in Harlesden | Student Rooms in NW10 at Best Cost",
  description: "Affordable rooms to rent in Harlesden, North West London. Perfect for University of Westminster students and NHS staff at Central Middlesex Hospital.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rooms-rent-harlesden-nw10-bills-included", // Adjust to your actual URL
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
