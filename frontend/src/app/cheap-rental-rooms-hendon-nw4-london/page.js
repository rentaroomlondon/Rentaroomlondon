import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Student Accommodation in NW4, London | Rent a Room in Hendon",
  description: "Looking for affordable rooms for rent in Hendon, NW4? We offer rental rooms for students & professionals near universities, workplaces, & travel hubs.",
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
