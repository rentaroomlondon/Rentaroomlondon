import { Suspense } from "react";
import RoomDirectory from "./room-directory";

export const metadata = {
  title: "Rooms to Rent in London | Browse by Area and Room Type",
  description:
    "Find rooms to rent across London. Browse by neighbourhood and filter by single, double, ensuite, ensuite double and studio rooms.",
  alternates: { canonical: "https://rentaroomlondon.co.uk/rooms-to-rent" },
};

export default function RoomsToRentPage() {
  return <Suspense fallback={<main style={{ minHeight: "70vh" }} />}><RoomDirectory /></Suspense>;
}
