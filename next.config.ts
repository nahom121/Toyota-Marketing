import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.toyota.com" },
      { protocol: "https", hostname: "pressroom.toyota.com" },
      { protocol: "https", hostname: "media.ed.edmunds-media.com" },
    ],
  },
};

export default nextConfig;
