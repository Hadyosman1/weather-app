import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "cdn.weatherapi.com",
      },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 60,
    },
  },
};

export default nextConfig;
