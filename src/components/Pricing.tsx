"use client";

import { useState } from "react";
import SectionContainer from "./layouts/SectionContainer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      name: "ライトプラン",
      price: isAnnual ? 9800 : 980,
      features: [
        "Notionデータベースでブログ管理",
        "1つの基本デザインテンプレート",
        "月間5,000PVまでのトラフィック",
        "自動バックアップ（週1回）",
        "メールサポート",
        "広告表示あり",
      ],
      cta: "申し込む",
    },
    {
      name: "スタンダードプラン",
      price: isAnnual ? 19800 : 1980,
      features: [
        "ライトプランの全機能",
        "3つのデザインテンプレート",
        "月間50,000PVまでのトラフィック",
        "カスタムドメイン対応",
        "自動バックアップ（週3回）",
        "優先メールサポート",
        "広告表示なし",
      ],
      cta: "申し込む",
      recommended: true,
    },
    {
      name: "プロプラン",
      price: isAnnual ? 49800 : 4980,
      features: [
        "スタンダードプランの全機能",
        "5つの高度なデザインテンプレート",
        "月間250,000PVまでのトラフィック",
        "複数カスタムドメイン対応",
        "自動バックアップ（毎日）",
        "24時間チャット・電話サポート",
        "高度なアナリティクス機能",
        "SEO最適化ツール",
      ],
      cta: "申し込む",
    },
  ];

  return (
    <SectionContainer
      id="pricing"
      title="あなたのブログ成長に合わせた3つのプラン"
      description="初期費用0円ですぐに始められます。成長に応じて柔軟にアップグレード可能。"
    >
      <div className="flex justify-center items-center space-x-4 my-6">
        <span className={`${isAnnual ? "text-gray-500" : "font-semibold"}`}>
          月払い
        </span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={`${isAnnual ? "font-semibold" : "text-gray-500"}`}>
          年払い(2ヶ月分お得)
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            className={`flex flex-col ${
              plan.recommended ? "border-blue-500 border-2" : ""
            }`}
          >
            <CardHeader>
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              {plan.recommended && (
                <span className="text-blue-500 font-semibold">人気No.1</span>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-3xl font-bold mb-4">
                ¥{plan.price.toLocaleString()}
                <span className="text-lg font-normal text-gray-500">
                  /{isAnnual ? "年" : "月"}
                </span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.recommended ? "bg-blue-500 hover:bg-blue-600" : ""
                }`}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">\ 初期費用0円キャンペーン実施中！ /</p>
        <p className="mt-2 text-sm text-gray-500">
          ※ 表示価格は全て税込みです。
        </p>
      </div>
    </SectionContainer>
  );
};

export default PricingSection;
