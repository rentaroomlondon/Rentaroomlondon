import { Suspense } from "react";
import RoomDirectory from "../room-directory";
import { directoryMetadata, getDirectoryLocation } from "../directory-route";

export async function generateMetadata({ params, searchParams }) {
  const [{ segments }, query = {}] = await Promise.all([params, searchParams]);
  return {
    ...directoryMetadata(getDirectoryLocation(segments, true), query),
    robots: { index: false, follow: false },
  };
}

export default async function LocationRoomsPage({ params }) {
  const { segments } = await params;
  const route = getDirectoryLocation(segments, true);
  return (
    <Suspense fallback={<main style={{ minHeight: "70vh" }} />}>
      <RoomDirectory
        initialLocation={route.location}
        initialCity={route.city}
        seoPage={route.seoPage}
      />
    </Suspense>
  );
}
