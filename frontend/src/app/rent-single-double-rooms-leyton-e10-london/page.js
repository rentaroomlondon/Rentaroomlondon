import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Affordable Rooms for Rent in Leyton E10 | Single & Double Rooms",
  description: "Find comfortable single and double rooms in Leyton, East London. Ideal for professionals and students, with easy access to Central London.",
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
