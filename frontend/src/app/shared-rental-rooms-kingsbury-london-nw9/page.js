import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Cheap Accommodation & Rental Rooms in Kingsbury, London NW9",
  description: "Find secure and affordable shared rental rooms in Kingsbury, London designed for students, and professionals seeking comfortable stays with bills included.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/shared-rental-rooms-kingsbury-london-nw9", // Adjust to your actual URL
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
