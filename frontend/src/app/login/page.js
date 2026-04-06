import React from 'react'
import Login from './components/Login'

export const metadata = {
  title: "Login - RENTAROOMLONDON",

  description:
    "Login to your Rent a Room London account to manage bookings, saved properties, and enquiries.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  alternates: {
    canonical: "https://rentaroomlondon.co.uk/login",
  },
};

const page = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default page
