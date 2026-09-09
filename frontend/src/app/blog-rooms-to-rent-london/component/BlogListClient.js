"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin } from "lucide-react";

const splitDate = (value) => {
  const d = value ? new Date(value) : new Date();
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    rest: d
      .toLocaleDateString("en-GB", { month: "short", year: "2-digit" })
      .replace(",", ""),
  };
};

export default function BlogListClient({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-[20px]">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-slate-800 text-lg font-bold font-playfair">
          No articles published yet
        </p>
        <p className="text-slate-400 text-sm mt-1 font-sans">
          Check back soon for new rental guides and area insights.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {blogs.map((item, index) => {
        const href = `/${item.slug}`;
        const { day, rest } = splitDate(item.createdAt);

        return (
          <article
            key={item._id || item.id || item.slug}
            className="group relative flex flex-col bg-white rounded-[18px] border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* ===== IMAGE + SLIDING DATE BADGE ===== */}
            <Link href={href} className="relative block h-52 w-full overflow-hidden bg-slate-100">
              <Image
                src={item.image || "https://placehold.co/600x400?text=Rentaroomlondon"}
                alt={item.title || "Blog cover"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                priority={index < 3}
              />

              {/* Date badge — sits near the bottom, slides to the top on hover */}
              <div
                className="absolute right-4 top-4 z-10 flex flex-col items-center rounded-xl bg-white px-3 py-2 text-center shadow-lg
                translate-y-[8.75rem] transition-transform duration-500 ease-out
                group-hover:translate-y-0"
              >
                <span className="font-playfair text-[18px] font-extrabold leading-none text-[#f47c3c]">
                  {day}
                </span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  {rest}
                </span>
              </div>
            </Link>

            {/* ===== CONTENT ===== */}
            <div className="flex flex-1 flex-col p-6">
              {/* Author row */}
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[#0F253B] text-white">
                  <Linkedin size={13} strokeWidth={2.5} />
                </span>
                <span className="text-[13px] font-semibold text-slate-500">
                  Rentaroomlondon Team
                </span>
              </div>

              {/* Title */}
              <Link href={href}>
                <h2 className="font-playfair text-[19px] font-bold leading-snug text-[#1A1A1A] transition-colors line-clamp-2 group-hover:text-[#f47c3c]">
                  {item.title}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#6B7280] line-clamp-2">
                {item.excerpt ||
                  "Read the full article for practical tips on renting a room in London."}
              </p>

              {/* View Blog */}
              <div className="mt-5 flex items-center gap-3 pt-4">
                <span className="h-px flex-1 bg-slate-200" />
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-[#0F253B] transition-colors group-hover:text-[#f47c3c]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current">
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </span>
                  View Blog
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
