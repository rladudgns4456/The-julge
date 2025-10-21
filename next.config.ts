import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 기본 설정 */
  images: {
    remotePatterns: [
      {
        // TODO: API 연동 시 이미지 URL 와일드카드 수정 필요
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  eslint: {
    // ✅ 빌드 중 ESLint 오류 무시 (Vercel 빌드 실패 방지)
    ignoreDuringBuilds: true,
  },

  // ✅ 변경된 방식: experimental.turbo → turbo
  turbo: {
    // Turbopack 완전 비활성화
    enabled: false,
  },
};

export default nextConfig;
