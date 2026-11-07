import { redirect } from "next/navigation";
import { Suspense } from "react";
import RoomDirectory from "../room-directory";
import { areaSlug } from "../directory-areas";
import { directoryMetadata, getDirectoryLocation, resolvePostcodeAreaNames } from "../directory-route";

export async function generateMetadata({ params, searchParams }) {
  const [{ segments }, query = {}] = await Promise.all([params, searchParams]);
  const route = getDirectoryLocation(segments, true);
  const postcode = route.areaPostcodePage ? route.location : "";
  const fallbackAreaName = route.label.endsWith(", London")
    ? route.label.slice(0, -", London".length)
    : "";
  const areaNames = postcode && (!fallbackAreaName || fallbackAreaName === "London")
    ? await resolvePostcodeAreaNames([postcode])
    : {};
  const areaName = areaNames[postcode]?.area;
  const displayAreaName = areaName && areaName.toUpperCase() !== postcode ? areaName : fallbackAreaName;
  const resolvedAreaName = displayAreaName && displayAreaName !== "London";
  const resolvedRoute = resolvedAreaName
    ? {
        ...route,
        label: `${displayAreaName}, London`,
        path: `/rent-room-london-uk/${areaSlug(displayAreaName)}-${postcode.toLowerCase()}`,
      }
    : route;
  return {
    ...directoryMetadata(resolvedRoute, query),
    robots: route.areaPostcodePage
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export default async function LocationRoomsPage({ params }) {
  const { segments } = await params;
  const route = getDirectoryLocation(segments, true);
  const postcode = route.areaPostcodePage ? route.location : "";
  const fallbackAreaName = route.label.endsWith(", London")
    ? route.label.slice(0, -", London".length)
    : "";
  const resolvedAreaNames = postcode && (!fallbackAreaName || fallbackAreaName === "London")
    ? await resolvePostcodeAreaNames([postcode])
    : {};
  const areaName = resolvedAreaNames[postcode]?.area;
  const displayAreaName = areaName && areaName.toUpperCase() !== postcode ? areaName : fallbackAreaName;
  const initialAreaNames = postcode && displayAreaName && displayAreaName !== "London"
    ? { ...resolvedAreaNames, [postcode]: { area: displayAreaName, outcode: postcode } }
    : resolvedAreaNames;
  const canonicalPath = displayAreaName && displayAreaName !== "London"
    ? `/rent-room-london-uk/${areaSlug(displayAreaName)}-${postcode.toLowerCase()}`
    : route.path;
  if (route.areaPostcodePage && `/${segments.join("/")}` !== canonicalPath.replace("/rent-room-london-uk", "")) {
    redirect(canonicalPath);
  }
  return (
    <Suspense fallback={<main style={{ minHeight: "70vh" }} />}>
      <RoomDirectory
        initialLocation={route.location}
        initialCity={route.city}
        seoPage={route.seoPage}
        initialAreaNames={initialAreaNames}
      />
    </Suspense>
  );
}
