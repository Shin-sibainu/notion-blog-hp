import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Noto_Sans_JP } from "next/font/google";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NotionPress",
  description: "Notionブログ代行開発サービス",
};

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
    </html>
  );
}
