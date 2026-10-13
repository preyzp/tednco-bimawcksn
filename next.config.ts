import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      { source: "/portfolio", destination: "/en/portfolio", permanent: false },
      { source: "/portfolio/:slug", destination: "/en/portfolio/:slug", permanent: false },
      { source: "/about", destination: "/en/about", permanent: false },
      { source: "/contact", destination: "/en/contact", permanent: false },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
