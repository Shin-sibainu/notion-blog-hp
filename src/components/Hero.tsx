import React from "react";
import Button from "./ui/Button";

const Hero = () => {
  return (
    <div className="pt-12">
      <div className="text-center max-w-5xl mx-auto">
        <h2 className="lg:text-6xl md:text-5xl font-bold leading-[1.1]">
          Notionで
          <span className="text-blue-600">ブログ</span>
          をスタートしよう
        </h2>
        <span className="mt-4 inline-block text-gray-600 font-bold md:text-xl">
          テンプレートを選択するだけで簡単にブログ運用をスタートできます。
        </span>

        <div className="flex items-center justify-center gap-2 mt-4">
          <Button>申し込む</Button>
          <Button>テンプレート</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
