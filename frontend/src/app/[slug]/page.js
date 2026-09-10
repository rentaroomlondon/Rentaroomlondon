import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ContactForm from "@/app/Shared/ContactForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SITE_URL = "https://rentaroomlondon.co.uk";

// ================= FETCH SINGLE BLOG =================
async function getBlogDetail(slug) {
  try {
    const res = await fetch(`${API_URL}/blogs/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.blog || data?.data || data || null;
  } catch (err) {
    console.error("Fetch blog detail error:", err);
    return null;
  }
}

// Strip HTML for a safe meta-description fallback
const toPlainText = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// ================= PER-POST SEO METADATA =================
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogDetail(slug);

  if (!blog) {
    return { title: "Page not found" };
  }

  const title = blog.metaTitle?.trim() || blog.title;
  const description =
    blog.metaDescription?.trim() ||
    blog.excerpt?.trim() ||
    toPlainText(blog.content).slice(0, 160);
  const url = `${SITE_URL}/${blog.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Rent a Room London",
      locale: "en_GB",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      images: blog.image ? [{ url: blog.image }] : undefined,
    },
    twitter: {
      card: blog.image ? "summary_large_image" : "summary",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recent";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogDetail(slug);

  if (!blog) {
    notFound();
  }

  // Article structured data for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.metaTitle?.trim() || blog.title,
    description: blog.metaDescription?.trim() || blog.excerpt || "",
    image: blog.image ? [blog.image] : undefined,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: { "@type": "Organization", name: "Rent a Room London" },
    publisher: {
      "@type": "Organization",
      name: "Rent a Room London",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${blog.slug}`,
    },
  };

  return (
    <main className="bg-[#F8F9FB]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO BAND ================= */}
      <section
        className="relative w-full overflow-hidden px-5 py-[44px] text-center
        md:px-[60px] md:py-[72px]
        bg-[#0F253B] md:bg-[linear-gradient(105.01deg,#1A2332_0%,#243044_100%)]"
      >
        <div className="hidden md:block absolute inset-0 z-0">
          <div className="absolute right-[-5%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#FF6B3514]" />
          <div className="absolute left-[-8%] top-[-30%] h-[360px] w-[360px] rounded-full bg-[#FF6B350D]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <h1 className="font-playfair text-[26px] font-bold leading-[1.2] text-white md:text-[46px]">
            {blog.title}
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-5 text-[11px] font-bold uppercase tracking-[1px] text-[#FFFFFF80] md:text-[12px]"
          >
            <Link href="/" className="transition-colors hover:text-[#f47c3c]">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <Link
              href="/blog-rooms-to-rent-london"
              className="transition-colors hover:text-[#f47c3c]"
            >
              Blog
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-white/90">{blog.title}</span>
          </nav>
        </div>
      </section>

      {/* ================= BODY + SIDEBAR ================= */}
      <section className="mx-auto max-w-7xl px-5 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- ARTICLE ---------- */}
          <article className="min-w-0 lg:col-span-8">
            {/* Meta row */}
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[1px] text-[#f47c3c]">
                {formatDate(blog.createdAt)}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-medium text-slate-400">
                Rentaroomlondon Team
              </span>
            </div>

            {blog.excerpt && (
              <p className="mb-6 text-[16px] leading-relaxed text-slate-600 sm:text-[18px]">
                {blog.excerpt}
              </p>
            )}

            {/* Featured image */}
            {blog.image && (
              <div className="relative mb-9 h-[220px] w-full overflow-hidden rounded-[1.5rem] bg-slate-100 sm:h-[420px]">
                <Image
                  src={blog.image}
                  alt={blog.title || "Blog banner"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            )}

            {/* Body */}
            <div
              className="blog-content min-w-0 max-w-full"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />
          </article>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
              <div className="rounded-[28px] bg-[#0F253B] p-5 shadow-xl sm:p-6 md:bg-[linear-gradient(160deg,#1A2332_0%,#243044_100%)]">
                <ContactForm
                  title="Talk to a Room Expert"
                  subtitle="Tell us what you're looking for and we'll match you with available rooms."
                  className="!rounded-none !border-0 !bg-transparent !p-0 !shadow-none"
                />
              </div>

              <Link
                href="/find-a-room"
                className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-[12px] font-bold uppercase tracking-wider text-[#0F253B] transition hover:border-[#f47c3c]/40 hover:text-[#f47c3c]"
              >
                Browse Available Rooms
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </aside>
        </div>

      </section>
    </main>
  );
}
