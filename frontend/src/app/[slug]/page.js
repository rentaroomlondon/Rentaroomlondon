import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

// ================= FETCH ALL BLOGS (prev / next / related) =================
async function getAllBlogs() {
  try {
    const res = await fetch(`${API_URL}/blogs`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.blogs || data?.data || [];
  } catch (err) {
    console.error("Fetch blogs error:", err);
    return [];
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
  const [blog, allBlogs] = await Promise.all([
    getBlogDetail(slug),
    getAllBlogs(),
  ]);

  if (!blog) {
    notFound();
  }

  // Prev / Next (list is newest-first from the API)
  const currentIndex = allBlogs.findIndex(
    (b) => b.slug === blog.slug || b._id === blog._id
  );
  const newerPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const olderPost =
    currentIndex >= 0 && currentIndex < allBlogs.length - 1
      ? allBlogs[currentIndex + 1]
      : null;

  const relatedPosts = allBlogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

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
            <div>
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

        {/* ---------- PREV / NEXT ---------- */}
        {(newerPost || olderPost) && (
          <nav className="mt-14 grid grid-cols-1 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
            {olderPost ? (
              <Link
                href={`/${olderPost.slug}`}
                className="group flex flex-col gap-1 rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:border-[#f47c3c]/40 hover:shadow-md"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <ArrowLeft size={13} strokeWidth={2.5} /> Previous Article
                </span>
                <span className="font-playfair text-[15px] font-bold leading-snug text-[#1A1A1A] line-clamp-2 group-hover:text-[#f47c3c]">
                  {olderPost.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}

            {newerPost && (
              <Link
                href={`/${newerPost.slug}`}
                className="group flex flex-col items-end gap-1 rounded-2xl border border-slate-200/80 bg-white p-5 text-right transition hover:border-[#f47c3c]/40 hover:shadow-md"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Next Article <ArrowRight size={13} strokeWidth={2.5} />
                </span>
                <span className="font-playfair text-[15px] font-bold leading-snug text-[#1A1A1A] line-clamp-2 group-hover:text-[#f47c3c]">
                  {newerPost.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </section>

      {/* ================= RELATED ================= */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-200/70 bg-white">
          <div className="mx-auto max-w-6xl px-5 md:px-6 py-14 md:py-20">
            <h2 className="mb-8 font-playfair text-[24px] font-bold text-[#1A1A1A] md:text-[30px]">
              More Articles
            </h2>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <article
                  key={post._id || post.slug}
                  className="group flex flex-col overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    href={`/${post.slug}`}
                    className="relative block h-44 w-full overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={
                        post.image ||
                        "https://placehold.co/600x400?text=Rentaroomlondon"
                      }
                      alt={post.title || "Blog cover"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 380px"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#f47c3c]">
                      {formatDate(post.createdAt)}
                    </span>
                    <Link href={`/${post.slug}`}>
                      <h3 className="mt-2 font-playfair text-[16px] font-bold leading-snug text-[#1A1A1A] line-clamp-2 group-hover:text-[#f47c3c]">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
                      {post.excerpt || ""}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
