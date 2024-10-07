import React from "react";
import Image from "next/image";
import SectionContainer from "./layouts/SectionContainer";
import { ArrowRight, Check, Eye } from "lucide-react";

const templateData = [
  {
    id: 1,
    name: "ミニマルモダン",
    description:
      "シンプルで洗練されたデザイン。あなたのコンテンツを引き立てます。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "カスタマイズ性が高い",
    ],
  },
  {
    id: 2,
    name: "クラシックエレガント",
    description: "読みやすさを重視した、時代を超えた魅力のあるデザイン。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "カスタマイズ性が高い",
    ],
  },
  {
    id: 3,
    name: "クリエイティブポートフォリオ",
    description:
      "あなたの作品を美しく展示。クリエイター向けの理想的なテンプレート。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "カスタマイズ性が高い",
    ],
  },
  {
    id: 4,
    name: "ビジネスプロフェッショナル",
    description: "信頼感と専門性を演出。ビジネス向けの洗練されたデザイン。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "カスタマイズ性が高い",
    ],
  },
  {
    id: 5,
    name: "テックモダン",
    description: "最新のトレンドを取り入れた、先進的な印象のテンプレート。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "カスタマイズ性が高い",
    ],
  },
  {
    id: 6,
    name: "ライフスタイルブログ",
    description: "日常の美しさを表現。写真映えするレイアウトが特徴。",
    image: "/notion-press-template-sleek-slate.png",
    features: [
      "クリーンなレイアウト",
      "読みやすいタイポグラフィ",
      "カスタマイズ性が高い",
    ],
  },
];

const TemplateCard = ({ name, description, image, features }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
    <div className="relative">
      <Image
        src={image}
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
        <Eye className="w-4 h-4 text-gray-600" />
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
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
    <div className="px-4 py-3 bg-gray-50 flex justify-between items-center group-hover:bg-blue-50 transition-colors duration-300">
      <span className="text-sm font-medium text-blue-600">
        テンプレートを見る
      </span>
      <ArrowRight className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  </div>
);

const Templates = () => {
  return (
    <SectionContainer
      title="あなたにぴったりのテンプレートを選ぼう"
      description="個性的で使いやすいテンプレートで、あなたのブログを始めましょう。"
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
