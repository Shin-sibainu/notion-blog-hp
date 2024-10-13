import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function POST(req: NextRequest) {
  const response = await req.json();

  const notion = new Client({ auth: response.notionToken });

  try {
    await notion.users.me({});

    return NextResponse.json({
      isValid: true,
      message: "このNotion Integration Tokenは有効です。",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      isValid: false,
      message:
        "このNotion Integration Tokenが有効ではありません。再度ご確認ください。",
    });
  }
}
