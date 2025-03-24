import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb", // Increase the body size limit for server actions
    },
  },
};

export default nextConfig;
