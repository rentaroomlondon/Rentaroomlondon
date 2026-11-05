import { Suspense } from "react";
import RoomDirectory from "@/app/rent-room-london-uk/room-directory";
import { directoryMetadata, getDirectoryLocation } from "@/app/rent-room-london-uk/directory-route";

export async function generateMetadata({ params, searchParams }) {
  const [{ segments = [] }, query = {}] = await Promise.all([params, searchParams]);
  return directoryMetadata(getDirectoryLocation(segments, true), query);
}

export default async function LegacyRoomsDirectoryPage({ params }) {
  const { segments = [] } = await params;
  const route = getDirectoryLocation(segments, true);
  return (
    <Suspense fallback={<main style={{ minHeight: "70vh" }} />}>
      <RoomDirectory initialLocation={route.location} initialCity={route.city} />
    </Suspense>
  );
}
