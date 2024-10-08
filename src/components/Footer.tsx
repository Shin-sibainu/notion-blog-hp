import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link
              href={"/"}
              className="font-bold text-xl flex items-center gap-2 mb-4"
            >
              <Image
                src={"/notionpress-logo-mod.png"}
                width={30}
                height={30}
                alt="NotionPress_Logo"
              />
              <span>NotionPress</span>
            </Link>
            <p className="text-sm text-gray-600 text-center md:text-left">
              簡単・便利なNotionブログ作成サービス
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">サービス</h3>
            <nav className="flex flex-col space-y-2">
              <Link href={"#feature"} className="text-sm hover:text-blue-600">
                特徴
              </Link>
              <Link href={"#templates"} className="text-sm hover:text-blue-600">
                テンプレート
              </Link>
              <Link href={""} className="text-sm hover:text-blue-600">
                ブログの始め方
              </Link>
              <Link href={""} className="text-sm hover:text-blue-600">
                料金プラン
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">サポート</h3>
            <nav className="flex flex-col space-y-2">
              <Link href={""} className="text-sm hover:text-blue-600">
                よくある質問
              </Link>
              <Link href={""} className="text-sm hover:text-blue-600">
                お問い合わせ
              </Link>
              <Link href={""} className="text-sm hover:text-blue-600">
                利用規約
              </Link>
              <Link href={""} className="text-sm hover:text-blue-600">
                プライバシーポリシー
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">SNS</h3>
            <p className="text-sm text-gray-600 mb-4">
              最新情報やお得な情報をお届けします
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2024 NotionPress. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
