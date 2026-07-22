import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ================= FETCH SINGLE BLOG =================
async function getBlogDetail(slug) {
  try {
    const res = await fetch(`${API_URL}/blogs/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.blog || data?.data || data || null;
  } catch (err) {
    console.error("Fetch blog detail error:", err);
    return null;
  }
}

// ================= FETCH PROPERTIES (Sidebar) =================
async function getProperties() {
  try {
    const res = await fetch(`${API_URL}/listings`, {
      cache: "no-store",
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      console.log(await res.text());
      return [];
    }

    const data = await res.json();

    // console.log(data);

    return data?.properties || data?.data || data?.listings || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogDetail(slug);

  if (!blog) {
    notFound();
  }

  const properties = await getProperties();
  // Take only top 3 available properties for the sidebar
  const sidebarProperties = properties.slice(0, 3);

  // Room Type Filter Options mapping to your query string
  const roomFilters = [
    { label: "All Rooms", type: "" },
    { label: "Single Room", type: "single" },
    { label: "Double Room", type: "double" },
    { label: "Ensuite", type: "ensuite" },
    { label: "Studio", type: "studio" },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9FB] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT SIDE: BLOG CONTENT (Centered & Editorial) ================= */}
          <article className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[2.5pax] p-6 sm:p-10 shadow-sm space-y-8">
            {/* Metadata Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  {blog.category || "Real Estate"}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Recent"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {blog.title}
              </h1>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm">
              <Image
                src={blog.image || "https://placehold.co/800x600?text=No+Image"}
                alt={blog.title || "Blog banner"}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Blog Body Text / Content */}
            <div
                className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />
          </article>

          {/* ================= RIGHT SIDE: AVAILABLE PROPERTIES & FILTERS ================= */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
            
            {/* QUICK ROOM TYPE FILTERS CARD */}
            <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">
                🔍 Find Rooms By Type
              </h3>
              <p className="text-xs text-slate-500">
                Click a filter to instantly browse matching rooms:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {roomFilters.map((filter) => {
                  const targetHref = filter.type 
                    ? `/find-a-room?roomType=${filter.type}` 
                    : `/find-a-room`;

                  return (
                    <Link
                      key={filter.label}
                      href={targetHref}
                      className="px-4 py-2 bg-slate-50 hover:bg-orange-600 text-slate-700 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 border border-slate-100"
                    >
                      {filter.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* AVAILABLE PROPERTIES SIDEBAR WIDGET */}
            <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900">
                  🏠 Available Properties
                </h3>
                <Link
                  href="/find-a-room"
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                {sidebarProperties.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">
                    No properties listed right now.
                    </p>
                ) : (
                    sidebarProperties.map((prop) => (
                    <Link
                        key={prop._id || prop.id}
                        href={`/properties/${prop.slug || prop._id}`}
                        className="flex items-center gap-4 group p-2 rounded-2xl hover:bg-slate-50 transition"
                    >
                        {/* Property Image */}
                        <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                        <Image
                            src={
                            prop.image ||
                            prop.images?.[0]?.url ||
                            prop.images?.[0] ||
                            "https://placehold.co/300x300?text=Property"
                            }
                            alt={prop.title || "Property"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        </div>

                        {/* Property Details */}
                        <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {prop.title || "Room Available"}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-2">
                            {prop.location?.address}
                            {prop.location?.city && `, ${prop.location.city}`}
                            {prop.location?.postcode && ` ${prop.location.postcode}`}
                        </p>

                        <p className="text-xs font-extrabold text-orange-600">
                            £{prop.monthlyPrice ?? prop.rent ?? 0}
                            <span className="text-[10px] text-slate-400 font-normal">
                            {" "}
                            /month
                            </span>
                        </p>
                        </div>
                    </Link>
                    ))
                )}
                </div>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}