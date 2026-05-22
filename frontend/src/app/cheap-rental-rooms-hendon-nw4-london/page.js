import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Affordable Rental Rooms in Hendon, London NW4 With Bills Included",
  description: "Explore budget-friendly student accommodation and shared rental rooms with bills included in Hendon, London with trusted property listings and flexible stays.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/cheap-rental-rooms-hendon-nw4-london", // Adjust to your actual URL
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
