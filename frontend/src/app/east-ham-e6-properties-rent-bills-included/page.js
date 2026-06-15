import React from 'react'
import HeroSection from './components/Hero';
import CricklewoodSpotlight from './components/CricklewoodSpotlight';
import PropertiesSection from './components/PropertiesSection';
import StudentAccommodation from './components/StudentAccommodation';
import ConnectivitySection from './components/ConnectivitySection';
import AreaGuide from './components/AreaGuide';


export const metadata = {
  title: "Properties to Rent in East Ham, E6 – Bills Included",
  description: "Find Properties to Rent in East Ham E6 Station, from Private Landlords with no hidden fee. Rental Room London is the best way to find your next home.",
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
