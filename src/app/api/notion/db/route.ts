import { NextRequest, NextResponse } from "next/server";
import NotionDB from "notion-db-js";

let notionDB: NotionDB | null = null;

async function initializeNotionDB() {
  if (!notionDB) {
    notionDB = new NotionDB(process.env.NOTION_INTEGRATION_TOKEN as string);
    await notionDB.initialize();
  }
  return notionDB;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const db = await initializeNotionDB();

    const { blogName, domain, email, template } = body;
    await db.from("notion-press-db").insert({
      blogName,
      domain,
      email,
      template,
    });

    return NextResponse.json(
      { success: true, message: "Databases initialized successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "NotionDBへの保存に失敗しました。",
    });
  }
}
