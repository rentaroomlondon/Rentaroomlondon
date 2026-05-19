import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Student Accommodation & Rooms to Rent in West Hampstead, London NW6",
  description: "Find affordable accommodation in West Hampstead, London. Ideal for UCL and Royal Central School of Speech and Drama students with excellent transport links and bills-included options.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/rooms-rental-nw6-west-hampstead-london", // Adjust to your actual URL
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
