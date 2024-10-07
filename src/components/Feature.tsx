import Image from "next/image";
import SectionContainer from "./layouts/SectionContainer";

const Feature = () => {
  return (
    <SectionContainer
      title="慣れ親しんだNotionで、魅力的なブログを"
      description="Notionユーザーなら、すぐに始められる。多彩なデザインテンプレートで、あなたの個性を表現。日々の気づきを、価値ある発信へと変えていきましょう。"
    >
      <div className="my-10 sm:my-20">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* left */}
          <div className="shadow-lg shadow-slate-300 border rounded-lg lg:w-3/5">
            <Image
              src={"/notion-press-template-sleek-slate.png"}
              alt="sample image"
              width={920}
              height={630}
              className="rounded-lg"
            />
          </div>
          {/* right */}
          <div className="space-y-4 lg:w-2/5">
            <h4 className="text-2xl font-bold">シンプルで魅力的なデザイン</h4>
            <div>
              <span className="text-gray-600">
                美しさと機能性を兼ね備えたテンプレートで、あなたの個性を輝かせます。
              </span>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-slate-600 mr-2">✔</span>
                シンプルな印象を与えるベーシックデザイン
              </li>
              <li className="flex items-center">
                <span className="text-slate-600 mr-2">✔</span>
                読みやすさを重視したクラシックデザイン
              </li>
              <li className="flex items-center">
                <span className="text-slate-600 mr-2">✔</span>
                洗練された雰囲気のモノリシックデザイン
              </li>
              <li className="flex items-center">
                <span className="text-slate-600 mr-2">✔</span>
                信頼感を醸成するビジネスデザイン
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="my-10 sm:my-32">
        <div className="flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-12">
          {/* left */}
          <div className="space-y-4 lg:w-2/5">
            <h4 className="text-2xl font-bold">
              Notionがそのままブログエディタに
            </h4>
            <div>
              <span className="text-gray-600">
                普段利用しているNotionをそのままブログエディタとしてご利用いただけます。
              </span>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✔</span>
                Notionデータベース機能を利用
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✔</span>
                ブログの管理は全てNotionで完結
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✔</span>
                NotionのAI機能でラクラク執筆可能
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✔</span>
                画像サムネイル追加も簡単
              </li>
            </ul>
          </div>
          {/* right */}
          <div className="shadow-lg shadow-slate-300 border rounded-lg lg:w-3/5">
            <Image
              src={"/notion-press-template-sleek-slate.png"}
              alt="sample image"
              width={920}
              height={630}
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="my-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* left */}
          <div className="shadow-lg shadow-slate-300 border rounded-lg lg:w-3/5">
            <Image
              src={"/notion-press-template-sleek-slate.png"}
              alt="SEO最適化とパフォーマンス向上のイメージ"
              width={920}
              height={630}
              className="rounded-lg"
            />
          </div>
          {/* right */}
          <div className="space-y-4 lg:w-2/5">
            <h4 className="text-2xl font-bold">高速に動くブログ体験</h4>
            <div>
              <span className="text-gray-600">
                ページ表示速度に考慮したブログで読者体験を最大化しています。
              </span>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✔</span>
                SEOに最適化されたHTMLストラクチャ
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✔</span>
                高速表示を実現する最適化されたレンダリング
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✔</span>
                キャッシュ付きページ読み込み
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✔</span>
                モバイルフレンドリーなレスポンシブデザイン
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Feature;
