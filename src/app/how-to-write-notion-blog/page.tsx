import Image from "next/image";
import Link from "next/link";

const HowToWriteNotionBlogPage = () => {
  return (
    <div className="prose lg:prose-xl px-2 mx-auto md:mb-10">
      <article>
        <div>
          <h2 className="text-xl lg:text-3xl lg:mt-2">Notionブログの書き方</h2>
          <p>
            まずは
            <Link
              href={"/create-notion-blog"}
              className="text-blue-600"
              target="_blank"
              rel="noreferrer"
            >
              こちら
            </Link>
            からNotionブログの申し込みを済ませましょう。
          </p>
          <p>
            Notionブログが届いた方はすでに以下のようなNotionデータベースが既に用意できているはずです(用意できていない方は{" "}
            <Link href={"/how-to-get-notion-key"} className="text-blue-600">
              こちら
            </Link>
            設定をお願いします。)。
          </p>
          <Image
            src="/setup/notion-database-template-setup.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />

          <p>書きはじめるには下記画像にある「新規」ボタンをクリックします。</p>

          <Image
            src="/setup/notion-database-template-setup.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />

          <p>
            新規で作成したレコード(行)にそれぞれ情報を入力してください。下記が例です。
          </p>

          <Image
            src="/setup/notion-database-template-setup.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
        </div>

        <div>
          <h3>記事執筆の方法</h3>

          <p>
            タイトルを決定した場所をホバーすると「開く」というボタンが出てくるのでクリックしてください。すると下画像が出てきます。
          </p>

          <Image
            src="/setup/notion-database-template-setup.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />

          <p>
            あとは普段あなたがNotionを利用するように記事を執筆しましょう。これで簡単に記事作成ができました！
          </p>
        </div>

        <div>
          <h3>記事の公開</h3>
          <p>
            記事の執筆が完了したら「Published」トグルにチェックを入れてください。
          </p>
          <Image
            src="/setup/notion-database-template-setup.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
          そうすれば自動でブログのビルド(公開作業)が開始されます。<b>1~2分</b>
          待っていただくとNotionブログに反映されますので、しばらく待ってからご確認ください。
          <p>
            どうしても分からない操作方法・ご質問があれば shincodeinc@gmail.com
            までご連絡ください。メールサポートいたします。
          </p>
        </div>
      </article>
    </div>
  );
};

export default HowToWriteNotionBlogPage;
