import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = await req.json();

  const notion = new Client({ auth: response.notionToken });

  try {
    await notion.databases.query({
      database_id: response.notionId,
    });

    return NextResponse.json({
      isValid: true,
      message: "このNotion IDは有効です。",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      isValid: false,
      message: "このNotion IDが有効ではありません。再度ご確認ください。",
    });
  }
}
