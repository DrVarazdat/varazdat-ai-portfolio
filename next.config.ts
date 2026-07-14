import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // This tells Next.js to allow all Supabase images!
      },
    ],
  },
};

export default nextConfig;