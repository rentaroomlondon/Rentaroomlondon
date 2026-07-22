"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlogListClient({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-24 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <div className="text-4xl mb-3">🚀</div>
        <p className="text-slate-800 text-lg font-bold">No articles available right now</p>
        <p className="text-slate-400 text-sm mt-1">Check back later for exciting new content!</p>
      </div>
    );
  }

  // Section 1: Exactly latest 4 blogs for the top layout
  const latestFour = blogs.slice(0, 4);
  const bigHeroBlog = latestFour[0];
  const sideStackedBlogs = latestFour.slice(1, 4);

  // Section 2: All blogs in card grid form
  const allBlogsList = blogs;

  return (
    <div className="space-y-24">
      {/* ================= SECTION 1: HERO SHOWCASE ================= */}
      {latestFour.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* BIG HERO CARD (Left Column - Span 7) */}
          {bigHeroBlog && (
            <article className="lg:col-span-7 flex flex-col space-y-6 group">
              <Link href={`/blog-detail/${bigHeroBlog.slug}`} className="block relative w-full h-[380px] sm:h-[420px] rounded-[2rem] overflow-hidden bg-slate-100 shadow-md">
                <Image
                  src={bigHeroBlog.image || "https://placehold.co/800x600?text=No+Image"}
                  alt={bigHeroBlog.title || "Featured blog cover"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </Link>

              <div className="space-y-3">
                <Link href={`/blog-detail/${bigHeroBlog.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                    {bigHeroBlog.title}
                  </h2>
                </Link>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {bigHeroBlog.excerpt ||
                    "Explore essential insights, tips, and expert perspectives regarding this property guide."}
                </p>

                {/* Clean Date Badge (No Admin Image) */}
                <div className="pt-2 flex items-center gap-3">
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {bigHeroBlog.category || "Real Estate"}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {bigHeroBlog.createdAt
                      ? new Date(bigHeroBlog.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Recent"}
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* 3 STACKED CARDS (Right Column - Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {sideStackedBlogs.map((item) => (
              <article key={item._id || item.id} className="flex flex-col sm:flex-row gap-5 items-start group">
                <Link
                  href={`/blog/${item.slug}`}
                  className="relative w-full sm:w-44 h-48 sm:h-32 shrink-0 rounded-[1.5rem] overflow-hidden bg-slate-100 shadow-sm"
                >
                  <Image
                    src={item.image || "https://placehold.co/400x400?text=No+Image"}
                    alt={item.title || "Blog thumbnail"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 176px"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1.5">
                    <Link href={`/blog/${item.slug}`}>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {item.excerpt || "Explore essential insights and property guide perspectives."}
                    </p>
                  </div>

                  {/* Clean Date Badge (No Admin Image) */}
                  <div className="pt-1 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-orange-500 bg-orange-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category || "General"}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Recent"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ================= SECTION 2: ALL ARTICLES IN GRID CARDS ================= */}
      <section className="space-y-8 pt-12 border-t border-slate-200/80">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Latest Articles
          </h2>
          <span className="text-xl">🎈</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogsList.map((item) => (
            <article
              key={item._id || item.id}
              className="bg-white border border-slate-200/80 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                <Image
                  src={item.image || "https://placehold.co/600x400?text=No+Image"}
                  alt={item.title || "Blog cover"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {item.category || "Real Estate"}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recent"}
                  </span>

                  <Link href={`/blog/${item.slug}`}>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt ||
                      "Read more about this article to discover essential insights, tips, and expert perspectives."}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition group-hover:translate-x-1 transform duration-200"
                  >
                    Read Article <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}