import * as React from "react";

interface EmailTemplateProps {
  blogName: string;
  email: string;
  template: string;
  notionToken: string;
  notionId: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  blogName,
  email,
  template,
  notionToken,
  notionId,
}) => (
  <div>
    <h2>{email}からの申し込みです。</h2>

    <div>
      <li>ブログ名：{blogName}</li>
      <li>テンプレート：{template}</li>
      <li>NotionToken：{notionToken}</li>
      <li>NotionId：{notionId}</li>
    </div>
  </div>
);
