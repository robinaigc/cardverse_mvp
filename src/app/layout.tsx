import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "卡片宇宙 - Cardverse",
  description: "用极致精美的卡片，支撑世界的创作。AI视觉生成、审美策展与版权积累的数字内容平台。",
  keywords: "卡片,设计,AI,视觉,版权,创作,美学",
  authors: [{ name: "Cardverse Team" }],
  openGraph: {
    title: "卡片宇宙 - Cardverse",
    description: "用极致精美的卡片，支撑世界的创作",
    type: "website",
    locale: "zh_CN",
    siteName: "Cardverse",
  },
  twitter: {
    card: "summary_large_image",
    title: "卡片宇宙 - Cardverse",
    description: "用极致精美的卡片，支撑世界的创作",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
