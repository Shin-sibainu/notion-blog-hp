"use client";

import { Button } from "../components/ui/button";

const NotionDuplicateButton = () => {
  const duplicateTemplate = () => {
    const baseUrl =
      "https://skinny-talos-8be.notion.site/1201dcf229c280b3a399e4865bdd996b";
    const params = new URLSearchParams({
      v: "1201dcf229c281c39660000c5f7c5817",
      duplicate: "true",
      pvs: "25",
      utm_source: "public_page",
      utm_content: "duplicate_button",
      from: "public_page",
      deepLinkOpenNewTab: "true",
    });
    const templateUrl = `${baseUrl}?${params.toString()}`;
    window.open(templateUrl, "_blank");
  };

  return <Button onClick={duplicateTemplate}>Notionデータベースの作成</Button>;
};

export default NotionDuplicateButton;
