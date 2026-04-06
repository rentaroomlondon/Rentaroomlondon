import React from 'react'
import Saved from './component/Saved'

export const metadata = {
  title: "Saved Properties - RENTAROOMLONDON",

  description:
    "View and manage your saved properties on Rent a Room London.",

  robots: {
    index: false,
    follow: false, // private page → better to block completely
    nocache: true,
  },

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/saved",
  },
};

const page = () => {
  return (
    <div>
      <Saved />
    </div>
  )
}

export default page
