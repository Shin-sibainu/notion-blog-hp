import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Noto_Sans_JP } from "next/font/google";
import Footer from "@/components/Footer";

import { GoogleAnalytics } from "@next/third-parties/google";

// サイトのデフォルト設定
const siteName = "NotionPress";
const description =
  "NotionをブログにするためのWebサービス。専門知識不要で、あなたのNotionページを美しいブログに変換します。";
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`, // 個別ページのタイトルテンプレート
  },
  description,
  metadataBase: new URL(siteUrl),
  // 基本設定
  applicationName: siteName,
  authors: [{ name: "ShinCode" }],
  generator: "Next.js",
  keywords: [
    "Notion",
    "ブログ",
    "CMS",
    "ホームページ",
    "ウェブサイト",
    "ブログ作成",
  ],
  // ロボット設定
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // OGP設定
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName,
    title: siteName,
    description,
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`, // OGP画像のパスを指定
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  // Twitter Card設定
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: [`${siteUrl}/opengraph-image.png`], // Twitter用OGP画像
    creator: "@Shin_Engineer", // Twitterアカウントがあれば指定
  },
};

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="overflow-y-scroll">
      <body className={`${notoSansJP.className} antialiased bg-gradient`}>
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-center">
            <Header />
          </div>
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
      <GoogleAnalytics gaId="G-VWHG8ZY83M" />
    </html>
  );
}
