import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Rooms to Rent in Eltham, London SE9 — Furnished & Bills Included",
  description: "Affordable furnished rooms to rent in Eltham SE9 with bills included. Southeastern rail links to London Bridge and Cannon Street, with green spaces and a welcoming community on your doorstep.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rental-rooms-eltham-london-se9-bills-included", // Adjust to your actual URL
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
