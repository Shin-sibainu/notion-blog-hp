export const EmailTemplate = ({
  blogName,
  domain,
  email,
  template,
  price,
  notionToken,
  notionId,
}: {
  blogName: string;
  domain: string;
  email: string;
  template: string;
  price: string;
  notionToken: string;
  notionId: string;
}) => (
  <div>
    <h1>Notionブログ申込み確認</h1>

    {/* ユーザー向けセクション */}
    <div
      style={{
        marginBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>申込み受付完了のお知らせ</h2>
      <p>{email} 様</p>
      <p>「{blogName}」のNotionブログ申込みを受け付けました。</p>
      <p>
        2~3営業日以内に、完成済みのNotionブログを本メールにてお渡ししますので、ご確認ください。
      </p>
      <p>ご質問がある場合は、このメールにご返信ください。</p>
    </div>

    {/* 管理者向けセクション */}
    <div
      style={{
        marginBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>新規申込み詳細</h2>
      <ul>
        <li>ブログ名: {blogName}</li>
        <li>ドメイン: {domain}</li>
        <li>メールアドレス: {email}</li>
        <li>テンプレート: {template}</li>
        <li>プラン: {price}</li>
        <li>NotionToken: {notionToken}</li>
        <li>NotionId: {notionId}</li>
      </ul>
    </div>
  </div>
);
