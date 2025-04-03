import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["openweathermap.org"], // Add this line to allow external images
  },
};

export default nextConfig;
