import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Context/AuthContext";
import { ToastContainer } from "./Shared/Nexttoast";
import LayoutWrapper from "./Shared/LayoutWrapper";
import { AdminAuthProvider } from "./Context/AdminAuthContext";
import "leaflet/dist/leaflet.css";
import CrispChat from "./Shared/CrispChat";

// DM Sans - body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Playfair Display - headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://rentaroomlondon.co.uk"),

  title: {
    default: "RENTAROOMLONDON | Rooms, Flatshares & Apartments",
    template: "%s | RENTAROOMLONDON",
  },

  description:
    "Find rooms for rent in London. Browse affordable rooms, flatshares, and apartments with verified listings across all London areas.",

  keywords: [
    "rent a room london",
    "rooms for rent london",
    "flatshare london",
    "cheap rooms london",
    "apartments london rent",
  ],

  alternates: {
    canonical: "https://rentaroomlondon.co.uk",
  },

  openGraph: {
    title: "RENTAROOMLONDON",
    description:
      "Browse rooms, flatshares, and rental properties across London.",
    url: "https://rentaroomlondon.co.uk",
    siteName: "Rent a Room London",
    locale: "en_GB",
    type: "website",
    // optional fallback image
    // images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },

  twitter: {
    card: "summary",
    title: "RENTAROOMLONDON",
    description:
      "Find affordable rooms and flatshares in London.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <AdminAuthProvider>
          <LayoutWrapper>
          {children}
          <ToastContainer 
            theme="dark"
            position="top-right"
            autoClose={5000}
            closeOnClick
            pauseOnHover={false} 
          />
          </LayoutWrapper>
          </AdminAuthProvider>
        </AuthProvider>
        <CrispChat />
      </body>
    </html>
  );
}