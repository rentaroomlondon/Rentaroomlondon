import { Suspense } from "react";
import RoomDirectory from "./room-directory";

export const metadata = {
  title: "Rooms to Rent in London | Browse by Area and Room Type",
  description: "Browse rooms to rent in London by area and room type. Compare current listings, monthly rent and availability.",
  alternates: { canonical: "https://rentaroomlondon.co.uk/rent-room-london-uk" },
  robots: { index: true, follow: true },
};

export default function RoomsToRentPage() {
  return <Suspense fallback={<main style={{ minHeight: "70vh" }} />}><RoomDirectory initialCity="London" /></Suspense>;
}
