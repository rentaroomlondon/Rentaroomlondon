import React from 'react'
import HeroSection from './component/HeroSection';
import Tab from './component/Tab';
import Banner from './component/Banner';
import AboutRooms from './component/AboutRooms';
import FAQ from './component/Faq';
import Form from './component/Form';

export const metadata = {
  title: "Rent a Rooms in London With Bills Included| Student Accommodation",
  description:
    "Find your room in London, close to transport, universities & city life. Rooms to rent in Cricklewood, Colindale, Greenwich & Eltham with Bills included.",
  alternates: {
    canonical:
      "https://rentaroomlondon.co.uk/rent-a-rooms-in-london-with-bills-included",
  },
};

const page = () => {
  return (
    <div>
      <HeroSection />
      <Tab />
      <Banner />
      <AboutRooms />
      <FAQ />
      <Form />
    </div>
  )
}

export default page
