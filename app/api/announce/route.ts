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

    if (!process.env.RESEND_AUDIENCE_ID) {
      return NextResponse.json(
        { error: "RESEND_AUDIENCE_ID is not set in the environment variables. Add it in your hosting platform's settings and try again." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houstonskateproject.org";

    const html = `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#F5EDD9;padding:32px;border-radius:16px">
        <div style="text-align:center;margin-bottom:24px">
          <img src="${SITE_URL}/logo.png" alt="Houston Skate Project" width="180" style="display:block;margin:0 auto;border-radius:12px" />
        </div>

        <div style="background:white;border-radius:12px;padding:24px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1)">
          <div style="font-size:15px;color:#1C1C1C;line-height:1.7;white-space:pre-line">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        </div>

        <div style="text-align:center;padding:16px;background:#8B5E3C;border-radius:12px;color:white;margin-bottom:20px">
          <a href="https://www.houstonskateproject.org/#tickets" style="color:white;font-size:16px;font-weight:bold;text-decoration:none">Register Now →</a>
        </div>

        <p style="text-align:center;font-size:11px;color:#8A8A8A;margin-top:16px">
          You're receiving this because you signed up for Houston Skate Project updates.<br/>
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8A8A8A">Unsubscribe</a>
        </p>
      </div>
    `;

    // Resend caps the internal broadcast `name` field at 70 characters —
    // this is just a label in the Resend dashboard, not shown to recipients.
    const rawName = `Announcement: ${subject}`;
    const name = rawName.length > 70 ? `${rawName.slice(0, 67)}...` : rawName;

    const { data, error } = await resend.broadcasts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      from: "Houston Skate Project <info@houstonskateproject.org>",
      subject,
      html,
      name,
    });

    if (error) {
      console.error("Announce broadcast create error:", error);
      return NextResponse.json({ error: `Resend error: ${error.message || "Failed to create broadcast."}` }, { status: 500 });
    }

    // Send the broadcast immediately
    const { error: sendError } = await resend.broadcasts.send(data!.id);
    if (sendError) {
      console.error("Announce broadcast send error:", sendError);
      return NextResponse.json({ error: `Resend error: ${sendError.message || "Failed to send broadcast."}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Announce error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to send announcement." }, { status: 500 });
  }
}
