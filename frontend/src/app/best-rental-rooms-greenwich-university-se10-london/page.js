import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Affordable Rooms for Rent in Greenwich, London SE10 — Bills Included",
  description: "Furnished rooms to rent in Greenwich SE10 with all bills included. DLR, Elizabeth line and Southeastern rail on your doorstep — ideal for students and professionals in south-east London.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/best-rental-rooms-greenwich-university-se10-london", // Adjust to your actual URL
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
