import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Context/AuthContext";
import { ToastContainer } from "./Shared/Nexttoast";
import LayoutWrapper from "./Shared/LayoutWrapper";
import "leaflet/dist/leaflet.css";
import Script from "next/script";
import FloatingWhatsApp from "./Shared/FloatingWhatsApp";

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
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QF01VPYY9L"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QF01VPYY9L');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TJ42Q4JG');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '3465136250318607');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJ42Q4JG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Facebook Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3465136250318607&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <AuthProvider>
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
        </AuthProvider>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}