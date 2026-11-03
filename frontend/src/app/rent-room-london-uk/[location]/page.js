import { Suspense } from "react";
import RoomDirectory from "../room-directory";

export async function generateMetadata({ params }) {
  const { location } = await params;
  const area = decodeURIComponent(location).split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  return {
    title: `Rooms to Rent in ${area} | Rent a Room London`,
    description: `Browse rooms to rent in ${area}, London. Compare live room availability, monthly rent and room types, then enquire or view a room.`,
    alternates: { canonical: `https://rentaroomlondon.co.uk/rooms/${location}` },
  };
}

export default async function LocationRoomsPage({ params }) {
  const { location } = await params;
  return <Suspense fallback={<main style={{ minHeight: "70vh" }} />}><RoomDirectory initialLocation={location} /></Suspense>;
}
