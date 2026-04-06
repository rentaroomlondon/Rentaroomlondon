import React from 'react'
import Register from './components/Register'

export const metadata = {
  title: "Register - RENTAROOMLONDON",

  description:
    "Create your Rent a Room London account to save properties, contact landlords, and manage your bookings.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/register",
  },
};

const page = () => {
  return (
    <div>
      <Register />
    </div>
  )
}

export default page
