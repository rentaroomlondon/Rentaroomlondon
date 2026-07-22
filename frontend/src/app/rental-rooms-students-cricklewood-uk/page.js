import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Affordable Rental Rooms in Cricklewood (NW2), London",
  description: "Explore affordable rental rooms in Cricklewood, London with bills included. Ideal for students and professionals near transport and universities. Book your room today!",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rental-rooms-students-cricklewood-uk", // Adjust to your actual URL
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
