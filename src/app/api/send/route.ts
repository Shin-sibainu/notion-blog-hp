import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const { blogName, email, template, notionToken, notionId } = body;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["shincodeinc@gmail.com"],
      subject: "Notionブログ申込み確認",
      react: EmailTemplate({
        blogName,
        email,
        template,
        notionToken,
        notionId,
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
