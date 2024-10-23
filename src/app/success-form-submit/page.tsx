"use client";

import { Button } from "../../components/ui/button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const SuccessFormSubmit = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // ローカルストレージをチェックして、初回訪問かどうかを確認
    const hasVisited = localStorage.getItem("hasVisitedSuccessPage");

    if (!hasVisited) {
      setShowConfetti(true);
      localStorage.setItem("hasVisitedSuccessPage", "true");

      // 5秒後に紙吹雪を非表示にする
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {showConfetti && <Confetti />}
      <h1 className="text-4xl font-bold mb-4">
        お申し込みありがとうございます🚀
      </h1>
      <p className="text-xl mb-8 text-center text-gray-600">
        2~3営業日以内に、完成したNotionブログをメールにてお受け取りいただけます。
      </p>
      <div className="bg-white text-gray-800 py-10 px-14 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-4">次のステップ</h2>
        <ul className="space-y-3">
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔</span>
            メール申し込みが完了したか確認しましょう。
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔</span>
            Notionでブログ執筆の方法をこちらから確認しましょう。
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔</span>
            2~3日後にNotionブログがメールに届いたか確認しましょう。
          </li>
          <li className="flex items-center">
            <span className="text-blue-600 mr-2">✔</span>
            Notionでブログ運用を始めましょう。
          </li>
        </ul>
      </div>

      <div className="mt-6 flex flex-col justify-center items-center gap-6">
        <Link href={"how-to-write-notion-blog"}>
          <Button>Notionブログの書き方はこちら</Button>
        </Link>

        <span className="text-gray-600">
          ご質問・ご相談はshincodeinc@gmail.comまでお問い合わせください。
        </span>
      </div>
    </div>
  );
};

export default SuccessFormSubmit;
