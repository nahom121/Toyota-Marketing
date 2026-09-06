import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Save to audience list
    await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    // Send welcome email
    const greeting = firstName ? `Hey ${firstName}!` : "Hey!";
    await resend.emails.send({
      from: "Houston Skate Project <info@houstonskateproject.org>",
      to: email,
      subject: "You're on the list! 🛼",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#F5EDD9;padding:32px;border-radius:16px">

          <div style="text-align:center;margin-bottom:28px">
            <div style="display:inline-block;background:#8B5E3C;color:white;font-size:28px;width:56px;height:56px;border-radius:50%;line-height:56px;text-align:center;margin-bottom:14px">🛼</div>
            <h1 style="font-size:26px;color:#1C1C1C;margin:0 0 6px">You're officially in the loop!</h1>
            <p style="color:#4A4A4A;margin:0;font-size:15px">Houston Skate Project</p>
          </div>

          <div style="background:white;border-radius:12px;padding:24px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1)">
            <p style="font-size:15px;color:#1C1C1C;margin:0 0 14px">${greeting} 👋</p>
            <p style="font-size:15px;color:#4A4A4A;line-height:1.7;margin:0 0 14px">
              You're now on the Houston Skate Project email list. We'll reach out the moment new workshop dates drop — so keep an eye on your inbox!
            </p>
            <p style="font-size:15px;color:#4A4A4A;line-height:1.7;margin:0">
              In the meantime, follow us on Instagram to stay connected with the community.
            </p>
          </div>

          <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1);text-align:center">
            <p style="font-size:13px;color:#8A8A8A;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600">Follow Along</p>
            <a href="https://www.instagram.com/HoustonSkateProject" style="display:inline-block;background:#1C1C1C;color:white;text-decoration:none;padding:10px 24px;border-radius:50px;font-size:14px;font-weight:600">
              @HoustonSkateProject
            </a>
          </div>

          <div style="text-align:center;padding:18px;background:#8B5E3C;border-radius:12px;color:white;margin-bottom:20px">
            <p style="margin:0;font-size:16px;font-weight:bold">Roll how you want. Express who you are. 🎶</p>
          </div>

          <p style="text-align:center;font-size:12px;color:#8A8A8A;margin:0">
            Questions? <a href="mailto:info@houstonskateproject.org" style="color:#8B5E3C">info@houstonskateproject.org</a>
            <br/><br/>
            <a href="https://www.houstonskateproject.org/unsubscribe?email=${encodeURIComponent(email)}" style="color:#8A8A8A">Unsubscribe</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
  }
}
