/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  // ✅ Remove console in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ✅ IMAGES (ONLY Cloudinary)
  images: {
    domains: ["res.cloudinary.com"],
    domains: ['images.unsplash.com'],
    minimumCacheTTL: 31536000,
  },

  // ✅ 301 REDIRECTS (VERY IMPORTANT)
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/affordable-rental-room-uk", // 👈 change if your new slug is different
        permanent: true, // ✅ 301
      },
    ];
  },

  // ✅ SECURITY HEADERS
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(self), camera=(self), clipboard-read=(self), clipboard-write=(self), web-share=(self), fullscreen=(self), autoplay=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;