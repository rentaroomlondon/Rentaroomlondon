import React from 'react'
import StudioRooms from './components/StudioRooms'

export const metadata = {
  title: "Studio Room With Bills Included in E10, London, UK",
  description:
    "Modern E10 studio room. All bills included (Gas/Elec/Water/Council Tax/Wi-Fi). Great transport links near Leyton station. Perfect for professionals. View now!",
  alternates: {
    canonical: "https://rentaroomlondon.co.uk/studio-room-bills-included-e10-london-uk",
  },
};

const page = () => {
  return (
    <div>
      <StudioRooms />
    </div>
  )
}

export default page
