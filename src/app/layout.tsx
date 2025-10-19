import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";

export const metadata: Metadata = {
  title: {
    default: "THE JULGE",
    template: "%s | THE JULGE",
  },
  description: "지역 기반 맞춤 공고 플랫폼 — 내 근처 공고를 빠르게 확인하세요.",
  applicationName: "THE JULGE",
  keywords: ["알바", "공고", "지역 기반", "맞춤 공고", "The Julge"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
