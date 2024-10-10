import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import SectionContainer from "./layouts/SectionContainer";
import { Button } from "./ui/button";

const CallToAction = () => {
  return (
    <SectionContainer
      id="call-to-action"
      title="あなたのアイデアを世界へ"
      description="今すぐNotionでブログを始めましょう。思いを形にする第一歩を踏み出そう。"
    >
      <div className="mx-auto max-w-7xl md:py-8 py-4">
        <div className="relative isolate overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            あなたの言葉が、誰かの人生を変える
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            ブログは単なる日記ではありません。あなたの経験、知識、アイデアを世界に発信するツールです。
          </p>

          <div className="flex justify-center items-center mt-6">
            <ul className="text-gray-300 mx-auto space-y-3">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <span>あなたのブランドを確立し、業界での認知を広める</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <span>新しい仕事やビジネスチャンスを引き寄せる</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <span>あなたの専門知識を共有し、人々の人生に貢献する</span>
              </li>
            </ul>
          </div>

          <p className="mt-8 text-lg font-semibold text-indigo-300">
            今すぐ始めれば、初期費用は0円でスタートできます。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Link href="/create-notion-blog">無料でブログを開設する</Link>
            </Button>
            <p className="text-sm text-gray-400">初期設定はたった3分で完了</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CallToAction;
