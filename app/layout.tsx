import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "心愿回答平台",
  description: "一个轻量、低成本、可部署到 Vercel 的心愿发布与回答平台。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
