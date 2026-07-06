import React from 'react'
import AffordableSingleRooms from './components/AffordableSingleRooms'

export const metadata = {
  title: "Affordable Single Room to Rent, London | Great Transport Links",
  description:
    "Searching for a budget-friendly single rooms in a London? Rent Bills included room from direct landlord.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/cheap-single-room-rent-london-uk",
  },
};

const page = () => {
  return (
    <div>
      <AffordableSingleRooms />
    </div>
  )
}

export default page
