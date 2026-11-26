"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import HomeFooter from "./HomeFooter";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Paths where the Header should NOT render
  const isAdminPage = pathname.startsWith("/admin");
  const isLandingPage = pathname.startsWith(
    "/rent-a-rooms-in-london-with-bills-included"
  );
  const isHendonPage =
    pathname === "/room-rent-hendon-nw4-london-middlesex-university";

  // The home page design has its own header (in the hero) and footer
  const isHomePage = pathname === "/";

  const hideHeader = isAdminPage || isLandingPage || isHendonPage || isHomePage;
  // Every page except the admin panel gets the home page footer (home renders its own)
  const hideFooter = isAdminPage || isHomePage;

  return (
    <>
      {!hideHeader && <Header />}

      {children}

      {!hideFooter && <HomeFooter />}
    </>
  );
}
