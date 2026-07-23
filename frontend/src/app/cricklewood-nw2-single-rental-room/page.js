import React from 'react'
import CricklewoodRentalRoom from './component/CricklewoodRentalRoom'

export const metadata = {
  title: 'Affordable Single Room to Rent in Cricklewood, NW2 | London',
  description: 'Looking for a comfortable, well-connected, & hassle-free Rooms in North West London? We have a fantastic single room available in Cricklewood (NW2), with bills included.',
  alternates: {
    canonical: 'https://rentaroomlondon.co.uk/cricklewood-nw2-single-rental-room',
  },
}

const Page = () => {
  return (
    <div>
      <CricklewoodRentalRoom />
    </div>
  )
}

export default Page