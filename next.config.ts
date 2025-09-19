import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "pub-29f0c6dac0fa4d17ae4e5e901801bb0a.r2.dev",
        port: "",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
