import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subject, message } = await request.json();
    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Subject and message are required." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#F5EDD9;padding:32px;border-radius:16px">
        <div style="text-align:center;margin-bottom:24px">
          <div style="display:inline-block;background:#8B5E3C;color:white;font-size:32px;width:56px;height:56px;border-radius:50%;line-height:56px;text-align:center;margin-bottom:12px">🛼</div>
          <h1 style="font-size:24px;color:#1C1C1C;margin:0">Houston Skate Project</h1>
        </div>

        <div style="background:white;border-radius:12px;padding:24px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1)">
          <div style="font-size:15px;color:#1C1C1C;line-height:1.7;white-space:pre-line">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        </div>

        <div style="text-align:center;padding:16px;background:#8B5E3C;border-radius:12px;color:white;margin-bottom:20px">
          <a href="https://www.houstonskateproject.org/#tickets" style="color:white;font-size:16px;font-weight:bold;text-decoration:none">Register Now →</a>
        </div>

        <p style="text-align:center;font-size:11px;color:#8A8A8A;margin-top:16px">
          You're receiving this because you signed up for Houston Skate Project updates.<br/>
          <a href="https://www.houstonskateproject.org/unsubscribe?email={{email}}" style="color:#8A8A8A">Unsubscribe</a>
        </p>
      </div>
    `;

    const { data, error } = await resend.broadcasts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      from: "Houston Skate Project <info@houstonskateproject.org>",
      subject,
      html,
      name: `Announcement: ${subject}`,
    });

    if (error) throw new Error(JSON.stringify(error));

    // Send the broadcast immediately
    await resend.broadcasts.send(data!.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Announce error:", error);
    return NextResponse.json({ error: "Failed to send announcement." }, { status: 500 });
  }
}
