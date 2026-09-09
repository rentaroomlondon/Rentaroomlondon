export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap() {
  const baseUrl = "https://rentaroomlondon.co.uk";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
      cache: "no-store",
    });

    const data = await res.json();
    const properties = data.listings || [];

    const propertyUrls = properties
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${baseUrl}/property/${p.slug}`,
        lastModified: new Date(p.updatedAt || Date.now()),
        changeFrequency: "daily",
        priority: 0.9,
      }));

    // 📝 BLOG POSTS
    let blogUrls = [];
    try {
      const blogRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        cache: "no-store",
      });
      const blogData = await blogRes.json();
      const blogs = blogData.blogs || blogData.data || [];
      blogUrls = blogs
        .filter((b) => b.slug)
        .map((b) => ({
          url: `${baseUrl}/${b.slug}`,
          lastModified: new Date(b.updatedAt || b.createdAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.7,
        }));
    } catch (blogErr) {
      console.error("Sitemap blog fetch error:", blogErr);
    }

    return [
      // 🏠 HOME
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },

      // 📄 STATIC PAGES (your missing URLs)
      {
        url: `${baseUrl}/find-a-room`,
        lastModified: new Date(),
        priority: 0.9,
      },
      {
        url: `${baseUrl}/how-it-works`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/why-choose-us`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/faqs`,
        lastModified: new Date(),
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact-us`,
        lastModified: new Date(),
        priority: 0.7,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        priority: 0.5,
      },
      {
        url: `${baseUrl}/blog-rooms-to-rent-london`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      },

      // 🏠 YOUR LISTED STATIC PROPERTY PAGES
      {
        url: `${baseUrl}/rental-rooms-students-cricklewood-uk`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/rooms-rent-harlesden-nw10-bills-included`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/shared-rental-rooms-kingsbury-london-nw9`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/rooms-rental-nw6-west-hampstead-london`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/cheap-rental-rooms-hendon-nw4-london`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/affordable-rental-rooms-se18-plumstead-bills-included`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/rental-rooms-eltham-london-se9-bills-included`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/best-rental-rooms-greenwich-university-se10-london`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/stockwell-sw9-student-housing-bills-included`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/birmingham-city-centre-student-housing-bills-included`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/affordable-double-rooms-rental-uk`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/affordable-rental-room-uk`,
        lastModified: new Date(),
        priority: 0.8,
      },

      // 🔥 DYNAMIC PROPERTY PAGES
      ...propertyUrls,

      // 📝 DYNAMIC BLOG POSTS
      ...blogUrls,
    ];
  } catch (error) {
    console.error("Sitemap Error:", error);

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ];
  }
}