import React from 'react'
import AffordableDoubleRooms from './component/AffordableDoubleRooms'

export const metadata = {
  title: "Double Rooms For Rental in London & Birmingham",
  description:
    "Searching for a budget-friendly double rooms in London & Birmingham? Rent Bills included room from direct landlord.",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/affordable-double-rooms-rental-uk",
  },
};

const page = () => {
  return (
    <div>
      <AffordableDoubleRooms />
    </div>
  )
}

export default page
