import { Suspense } from "react";
import RoomDirectory from "./room-directory";

export const metadata = {
  title: "Rooms to Rent in London | Browse by Area and Room Type"
  robots: { index: false, follow: false },
};

export default function RoomsToRentPage() {
  return <Suspense fallback={<main style={{ minHeight: "70vh" }} />}><RoomDirectory /></Suspense>;
}
