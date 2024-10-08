import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="py-6 sm:pt-12 pb-10 sm:pb-20">
      <div className="text-center max-w-5xl mx-auto">
        <h2 className="lg:text-6xl md:text-5xl text-4xl font-bold leading-[1.1]">
          Notionで
          <span className="text-blue-600">ブログ</span>
          をスタートしよう
        </h2>
        <span className="mt-4 inline-block text-gray-600 font-bold md:text-xl text-sm">
          テンプレートを選択するだけで無料で簡単にブログ運用をスタートできます。
        </span>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
          <Link href={"/create-notion-blog"}>
            <Button size={"lg"} className="w-full sm:w-auto">
              はじめる
            </Button>
          </Link>

          <Link href={"#templates"}>
            <Button
              size={"lg"}
              variant={"outline"}
              className="w-full sm:w-auto"
            >
              テンプレート
            </Button>
          </Link>
        </div>

        <div className="shadow-xl shadow-slate-300 mt-8">
          <Image
            src={"/notion-press-template-sleek-slate.png"}
            alt="sample image"
            width={1280}
            height={730}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
