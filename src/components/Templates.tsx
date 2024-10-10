import React from "react";
import Image from "next/image";
import SectionContainer from "./layouts/SectionContainer";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export interface TemplateOption {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  href: string;
}

export const templateData = [
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
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TemplateCard = ({ name, description, image, features, href }: any) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
    <div className="relative">
      <Image
        src={image}
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {features.map((feature: React.ReactNode, index: number) => (
          <div key={index} className="flex items-center text-sm text-gray-700">
            <Check className="w-4 h-4 text-blue-500 mr-2" />
            {feature}
          </div>
        ))}
      </div>
    </div>
    <div className="px-4 py-3 bg-gray-50 flex justify-between items-center group-hover:bg-blue-50 transition-colors duration-300">
      <Link
        href={`/templates/${href}`}
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
