export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = "https://rentaroomlondon.co.uk";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/meta`, {
    cache: "no-store",
  });

  const data = await res.json();

  // ✅ FIX HERE
  const properties = data.listings || [];

  const propertyUrls = properties.map((property) => ({
    url: `${baseUrl}/property/${property.slug}`,
    lastModified: new Date(property.updatedAt || Date.now()),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/find-a-room`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/why-choose-us`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      priority: 0.5,
    },
    ...propertyUrls,
  ];
}