import React from "react";
import Image from "next/image";
import SectionContainer from "./layouts/SectionContainer";
import { ArrowRight, Check, Clock } from "lucide-react";
import Link from "next/link";

// テンプレートの状態を型として定義
type TemplateStatus = "ready" | "coming-soon";

export interface TemplateOption {
  id: number;
  name: string;
  description: string;
  image: string;
  features: string[];
  href: string;
  status: TemplateStatus; // 必須プロパティとして定義
  releaseDate?: string;
}

export const templateData: TemplateOption[] = [
  {
    id: 1,
    name: "Sleek Slate",
    description:
      "シンプルで洗練されたデザイン。あなたのコンテンツを引き立てます。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "サムネイル画像",
    ],
    href: "https://three-insights-blog.vercel.app",
    status: "ready",
  },
  {
    id: 2,
    name: "Super Simple",
    description: "読みやすさを重視した、時代と人を選ばない魅力のあるデザイン。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "シンプルなレイアウト",
      "読みやすいタイポグラフィ",
      "余計な機能はなし",
    ],
    href: "https://three-insights-blog.vercel.app",
    status: "coming-soon",
    releaseDate: "2024年12月予定",
  },
  {
    id: 3,
    name: "Creative Portfolio",
    description:
      "あなたの作品を美しく展示。クリエイター向けの理想的なテンプレート。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "カスタマイズ性が高い",
    ],
    href: "https://three-insights-blog.vercel.app",
    status: "coming-soon",
    releaseDate: "2025年1月予定",
  },
  {
    id: 4,
    name: "Business Pro",
    description: "信頼感と専門性を演出。ビジネス向けの洗練されたデザイン。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "カスタマイズ性が高い",
    ],
    href: "https://three-insights-blog.vercel.app",
    status: "coming-soon",
    releaseDate: "2025年2月予定",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TemplateCard = ({
  name,
  description,
  image,
  features,
  href,
  status = "ready",
  releaseDate,
}: TemplateOption) => (
  <div
    className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 group
    ${status === "ready" ? "hover:shadow-xl" : "opacity-75"}`}
  >
    <div className="relative">
      {/* オーバーレイ付きの画像 */}
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className={`w-full h-48 object-cover transition-transform duration-300 
            ${
              status === "ready" ? "group-hover:scale-105" : "filter grayscale"
            }`}
        />
        {status === "coming-soon" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">準備中</span>
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        {status === "coming-soon" && releaseDate && (
          <span className="text-xs text-gray-500">{releaseDate}</span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-gray-700">
            <Check className="w-4 h-4 text-blue-500 mr-2" />
            {feature}
          </div>
        ))}
      </div>
    </div>

    <div
      className={`px-4 py-3 bg-gray-50 flex justify-between items-center 
      ${
        status === "ready" ? "group-hover:bg-blue-50" : ""
      } transition-colors duration-300`}
    >
      {status === "ready" ? (
        <>
          <Link
            href={`${href}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-blue-600"
          >
            テンプレートを見る
          </Link>
          <Link
            href={`/templates/${href}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-blue-600"
          >
            <ArrowRight className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </>
      ) : (
        <div className="w-full text-center text-sm text-gray-500">
          もうしばらくお待ちください
        </div>
      )}
    </div>
  </div>
);

const Templates = () => {
  return (
    <SectionContainer
      id="templates"
      title="あなたにぴったりのテンプレートを選ぼう"
      description="テンプレートは全て無料。お好きなブログスタイルを選んで今すぐNotionでブログを始めよう。"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:my-20">
        {templateData.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default Templates;
