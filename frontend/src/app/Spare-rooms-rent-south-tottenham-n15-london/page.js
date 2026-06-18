import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Affordable Spare Rooms in South Tottenham N15, London",
  description: "Browse affordable spare rooms to rent in South Tottenham N15. Fully furnished rooms, excellent transport links, and flexible tenancy options in a vibrant North London location.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/Spare-rooms-rent-south-tottenham-n15-london", // Adjust to your actual URL
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
