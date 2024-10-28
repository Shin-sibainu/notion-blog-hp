import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      blogName,
      domain,
      email,
      template,
      price,
      notionToken,
      notionId,
      createdAt,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "NotionPress | Notionで簡単ブログ開発 <onboarding@resend.dev>",
      to: ["shincodeinc@gmail.com"],
      replyTo: email,
      subject: "Notionブログ申込み確認",
      react: EmailTemplate({
        blogName,
        domain,
        email,
        template,
        price,
        notionToken,
        notionId,
        createdAt,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
