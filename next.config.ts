import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography. Remove once the client's own photos live in /public.
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" }],
  },
};

export default nextConfig;
