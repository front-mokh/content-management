import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  unstable_runtimeJS: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb", // Increase the body size limit for server actions
    },
  },
};

export default nextConfig;
