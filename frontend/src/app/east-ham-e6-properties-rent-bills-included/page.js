import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Rooms to Rent in East Ham, London E6 — All Bills Included",
  description: "Rooms to rent in East Ham, London E6 with all bills included. Rent furnished rooms in a clean shared house near East Ham Station. Book a viewing today!",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/east-ham-e6-properties-rent-bills-included", // Adjust to your actual URL
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
