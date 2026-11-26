"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Paths where Header and Footer should NOT render
  const isAdminPage = pathname.startsWith("/admin");
  const isLandingPage = pathname.startsWith(
    "/rent-a-rooms-in-london-with-bills-included"
  );
  const isHendonPage =
    pathname === "/room-rent-hendon-nw4-london-middlesex-university";

  // The home page design has its own header (in the hero) and footer
  const isHomePage = pathname === "/";

  const hideHeader = isAdminPage || isLandingPage || isHendonPage || isHomePage;
  const hideFooter = isAdminPage || isLandingPage || isHomePage;

  return (
    <>
      {!hideHeader && <Header />}

      {children}

      {!hideFooter && <Footer minimal={isHendonPage} />}
    </>
  );
}