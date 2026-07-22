import React from "react";
import BlogListClient from "./component/BlogListClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ================= SEO METADATA =================
export const metadata = {
  title: "Latest Real Estate Insights & Guides | Blog",
  description:
    "Explore expert tips, neighborhood guides, and latest trends in property rentals and real estate.",
  openGraph: {
    title: "Latest Real Estate Insights & Guides | Blog",
    description:
      "Explore expert tips, neighborhood guides, and latest trends in property rentals and real estate.",
    type: "website",
  },
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
    <main className="min-h-screen bg-[#F8F9FB] py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Our Blog & News
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Latest Insights & Property Guides
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Stay informed with expert advice, rental market updates, and comprehensive area guides tailored for you.
          </p>
        </div>

        {/* CLIENT COMPONENT (Hero 4 + All List) */}
        <BlogListClient blogs={blogs} />
      </div>
    </main>
  );
}