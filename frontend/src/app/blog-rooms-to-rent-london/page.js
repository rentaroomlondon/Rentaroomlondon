import React from "react";
import Link from "next/link";
import BlogListClient from "./component/BlogListClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PAGE_URL = "https://rentaroomlondon.co.uk/blog-rooms-to-rent-london";

// ================= SEO METADATA =================
export const metadata = {
  title: "Rooms to Rent in London — Tips, Area Guides & Advice | Blog",
  description:
    "Expert advice on renting a room in London — neighbourhood guides, moving tips, bills-included living and the latest rental market updates.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Rooms to Rent in London — Tips, Area Guides & Advice",
    description:
      "Expert advice on renting a room in London — neighbourhood guides, moving tips and rental market updates.",
    url: PAGE_URL,
    siteName: "Rent a Room London",
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// ================= FETCH ALL BLOGS (SERVER SIDE) =================
async function getBlogs() {
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      cache: "no-store", // Ensures fresh data on every request
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const data = await res.json();
    return data?.blogs || data?.data || [];
  } catch (err) {
    console.error("Server fetch error:", err);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-[#F8F9FB]">
      {/* ================= HERO / HEADER BAND ================= */}
      <section
        className="relative w-full overflow-hidden
        px-5 py-[44px] md:px-[60px] md:py-[72px]
        bg-[#0F253B] md:bg-[linear-gradient(105.01deg,#1A2332_0%,#243044_100%)]"
      >
        {/* Decorative circle */}
        <div className="hidden md:block absolute inset-0 z-0">
          <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FF6B3514] rounded-full" />
        </div>
        <div className="md:hidden absolute right-[-50px] top-[-60px] w-[250px] h-[250px] bg-[#FF6B3514] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-[12px] font-sans font-medium tracking-wide text-[#FFFFFF80]"
          >
            <Link href="/" className="hover:text-[#f47c3c] transition-colors">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-white">Blog</span>
          </nav>

          {/* Badge */}
          <div className="inline-block mb-5 bg-[#FF6B3533] rounded-[50px] px-[13px] py-[5px]">
            <span className="uppercase text-[#f47c3c] font-sans font-bold text-[10px] md:text-[11px] tracking-[1.2px]">
              Our Blog &amp; News
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white mb-4 font-playfair font-bold text-[30px] leading-[36px] md:text-[52px] md:leading-[60px]">
            Rooms to Rent in London{" "}
            <span className="text-[#f47c3c] italic">Insights</span>
          </h1>

          {/* Description */}
          <p className="text-[#FFFFFF99] md:text-white/90 font-light font-sans text-[13px] leading-[21px] md:text-[16px] md:leading-[26px] max-w-2xl mx-auto">
            Neighbourhood guides, moving advice and the latest on bills-included
            room rentals across London — written by the Rentaroomlondon team.
          </p>
        </div>
      </section>

      {/* ================= BLOG LIST ================= */}
      <section className="px-5 md:px-6 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <BlogListClient blogs={blogs} />
        </div>
      </section>
    </main>
  );
}
