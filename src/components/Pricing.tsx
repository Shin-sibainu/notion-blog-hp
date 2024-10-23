"use client";

import React, { useState } from "react";
import SectionContainer from "./layouts/SectionContainer";

import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);

  const handlePlanSelect = (planName: string) => {
    router.push(
      `/create-notion-blog?selectedPlan=${encodeURIComponent(planName)}`
    );
  };

  const pricingPlans = [
    {
      name: "ライトプラン",
      price: isAnnual ? 9800 : 980,
      features: [
        "Notionデータベースでブログ管理",
        "基本的なテンプレート",
        "メールサポート",
      ],
      cta: "無料で始める",
    },
    {
      name: "スタンダードプラン",
      price: isAnnual ? 19800 : 1980,
      features: [
        "ライトプランの全機能",
        "全てのテンプレート選択可能",
        "カスタムドメイン対応",
        "優先メールサポート",
      ],
      cta: "無料で始める",
      recommended: true,
    },
    {
      name: "プロプラン",
      price: isAnnual ? 49800 : 4980,
      features: [
        "スタンダードプランの全機能",
        "Google Analytics 対応可能",
        "パフォーマンス分析(月1回)",
        "個別カスタマイズ対応可能",
      ],
      cta: "無料で始める",
    },
  ];

  return (
    <SectionContainer
      id="pricing"
      title="あなたのブログ成長に合わせた3つのプラン"
      description="初期費用0円ですぐに始められます。成長に応じて柔軟にアップグレード可能。"
    >
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 mt-4">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          1週間無料体験実施中！
        </h3>
        <p className="text-sm text-blue-600">
          どのプランでも1週間無料でお試しいただけます。期間中はいつでもキャンセル可能で、最初の支払いは発生しません。
        </p>
      </div>

      <div className="flex justify-center items-center space-x-4 mb-8">
        <span className={`${isAnnual ? "text-gray-500" : "font-semibold"}`}>
          月払い
        </span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={`${isAnnual ? "font-semibold" : "text-gray-500"}`}>
          年払い(2ヶ月分お得)
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="relative">
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full z-10 shadow-sm">
                一番人気！
              </div>
            )}
            <Card
              className={`flex flex-col h-full transition-all duration-300 ${
                plan.recommended ? "ring-2 ring-blue-100" : "hover:shadow-md"
              }`}
            >
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-center">{plan.name}</h3>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    ¥{plan.price.toLocaleString()}
                    <span className="text-base font-normal text-gray-500">
                      /{isAnnual ? "年" : "月"}
                    </span>
                  </div>
                  <div className="text-sm text-blue-600 font-semibold mt-2">
                    まずは1週間無料でお試し
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-sm gap-2"
                      >
                        <span className="text-green-500 flex-shrink-0 mt-1">
                          ✔
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full ${
                    plan.recommended ? "bg-blue-500 hover:bg-blue-600" : ""
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="mt-2 text-sm text-gray-500">
          ※
          表示価格は全て税込みです。1週間の無料体験後、選択したプランでのご利用となります。
        </p>
      </div>
    </SectionContainer>
  );
};

export default PricingSection;
