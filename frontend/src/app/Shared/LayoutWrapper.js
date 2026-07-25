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

  const hideHeaderFooter = isAdminPage || isLandingPage;

  return (
    <>
      {!hideHeaderFooter && <Header />}

      {children}

      {!hideHeaderFooter && <Footer />}
    </>
  );
}