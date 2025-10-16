import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // TODO: API 연동시 이미지URL 와일드 카드 변경
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
