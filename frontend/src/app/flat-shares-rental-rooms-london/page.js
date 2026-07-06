import React from 'react'
import FlatSharesRentalRooms from './components/FlatSharesRentalRooms';

export const metadata = {
  title: "Flat Share in UK| Rooms to Rent & House Shares, London",
  description:
    "Looking for a room in a London flat share? Explore fully furnished shared accommodation with bills included options, protected deposits, and no agency fees.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/flat-shares-rental-rooms-london",
  },
};

const page = () => {
  return (
    <div>
      <FlatSharesRentalRooms />
    </div>
  )
}

export default page
