import React from "react";
import AccommodationLondon from "./component/AccommodationLondon";

export const metadata = {
  title: "Rent a Rooms in London With Bills Included| Student Accommodation",
  description:
    "Find your room in London, close to transport, universities & city life. Rooms to rent in Cricklewood, Colindale, Greenwich & Eltham with Bills included.",
  alternates: {
    canonical:
      "https://rentaroomlondon.co.uk/rent-a-rooms-in-london-with-bills-included",
  },
};

export default function Page() {
  return <AccommodationLondon />;
}