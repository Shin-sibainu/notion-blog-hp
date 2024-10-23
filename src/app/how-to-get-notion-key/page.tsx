import NotionDuplicateButton from "@/components/NotionDuplicateButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HowToGetNotionKey = () => {
  return (
    <div className="prose lg:prose-xl px-2 mx-auto md:mb-10">
      <article>
        <div>
          <h2 className="text-xl lg:text-3xl lg:mt-2 underline underline-offset-4">
            NotionTokenとNotionIdの取得方法
          </h2>

          <p>
            まずは下のボタンを押して、NotionデータベースのテンプレートをあなたのNotionに作成してください(ワークスペースはご自身が使っているものを選択してください)。
          </p>
          <NotionDuplicateButton />
          <p>
            すると以下のようなデータベーステンプレートが作成されるはずです。
          </p>
          <Image
            src="/setup/notion-database-template-setup.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
          <p>
            作成した方から以下の操作を行って、NotionTokenとNotionIdの取得を始めます。
          </p>
        </div>

        <div>
          <h3 className="text-lg lg:text-2xl underline underline-offset-2">
            Notion Integration Tokenの取得
          </h3>
          <p>
            まずは
            <Link
              href="https://developers.notion.com/"
              className="text-blue-600"
              target="_blank"
              rel="noreferrer"
            >
              Notion の開発者用ページ
            </Link>
            にアクセスし、右上の View my integrations
            ボタンをクリックしてください。
          </p>
          <Image
            src="/setup/notion-press-step-3.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
          続いて、インテグレーションを作成していきましょう。下の画像のように「新しいインテグレーションの作成」を押しましょう。
          <Image
            src="/setup/notion-press-step-4.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
          続いて、基本情報を入力していきます。インテグレーション名は何でもOKです。
          <p>
            ワークスペースが見つからない方はNotionアプリから作成をお願いします。種類は「内部」でOKです。
          </p>
          <Image
            src="/setup/notion-press-step-5.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
          <p>保存を押すとNotion Tokenが取得できるようになります。</p>
          <Image
            src="/setup/notion-press-step-6.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
          <p>
            ※このTokenは外部に漏らさないように厳重に管理するようにしてください。
          </p>
        </div>

        <div>
          <h3 id="step4" className="underline underline-offset-2">
            NotionIDの取得
          </h3>
          <p>
            NotionIDを取得します。下記の画像のように「リンクをコピー」をクリックします。
          </p>
          <Image
            src="/setup/notionid-link-copy.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
          <p>すると、以下のようなURLが取得できるはずです。</p>
          <p>https://www.notion.so/XXXXXXXX?v=YYYYYYYY</p>
          <p>
            NotionIDは<b>「XXXXXXXX」</b>
            の部分になります。
          </p>
          <p>
            このNotion Integration
            TokenとNotionIDを申し込みの3ステップに貼り付けてください。読み込めたら成功です。
          </p>
        </div>

        <div>
          <h3 className="underline underline-offset-2">
            Notion DatabaseとIntegrationの連携
          </h3>
          <p>
            ブログを書き始める際は、作成したIntegration TokenとNotion
            Databaseを連携する必要があります。
          </p>
          <p>
            下の画像の「接続先」をクリックして先ほど作成したIntegrationを選択してください。連携が完了します。
          </p>
          <Image
            src="/setup/notion-integration-connect.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
          <p>
            以上でNotionブログ執筆の下準備が全て完了しました。お疲れ様でした。
          </p>
          <p>
            ブログ執筆の方法は、サンプルブログ投稿を見ながら執筆をお願いします。分からない方は
            <Link
              href="/how-to-write-notion-blog"
              className="text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              こちら
            </Link>
            から詳しい説明が確認できます。
          </p>
        </div>
      </article>
    </div>
  );
};

export default HowToGetNotionKey;
