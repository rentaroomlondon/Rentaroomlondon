import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Rooms to Rent Leyton E10 | Single & Double Rooms London",
  description: "Looking for rooms to rent in Leyton? Rent a single or double room in Leyton, London E10. Furnished shared house/flatshare with bills included near the Tube.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rent-single-double-rooms-leyton-e10-london", // Adjust to your actual URL
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
