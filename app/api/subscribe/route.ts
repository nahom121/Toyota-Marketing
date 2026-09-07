import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    if (!process.env.RESEND_AUDIENCE_ID) {
      console.error("Subscribe error: RESEND_AUDIENCE_ID is not set");
      return NextResponse.json({ error: "Email list is not configured. Contact the site admin." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Save to audience list
    const { error: contactError } = await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    if (contactError) {
      console.error("Subscribe error (contacts.create):", contactError);
      return NextResponse.json({ error: `Failed to add to email list: ${contactError.message}` }, { status: 500 });
    }

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houstonskateproject.org";

    const greeting = firstName ? `Hey ${firstName}!` : "Hey!";
    await resend.emails.send({
      from: "Houston Skate Project <info@houstonskateproject.org>",
      to: email,
      subject: "You're on the list! 🛼",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#F5EDD9;padding:32px;border-radius:16px">

          <div style="text-align:center;margin-bottom:24px">
            <img src="${SITE_URL}/logo.png" alt="Houston Skate Project" width="180" style="display:block;margin:0 auto 16px;border-radius:12px" />
            <h1 style="font-size:26px;color:#1C1C1C;margin:0">You're officially in the loop!</h1>
            <p style="color:#4A4A4A;margin-top:8px">Houston Skate Project</p>
          </div>

          <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1)">
            <p style="font-size:14px;color:#1C1C1C;margin:0 0 10px">${greeting}</p>
            <p style="font-size:14px;color:#4A4A4A;line-height:1.7;margin:0 0 10px">
              You're now on the Houston Skate Project email list. We'll reach out the moment new workshop dates drop, so keep an eye on your inbox!
            </p>
            <p style="font-size:14px;color:#4A4A4A;line-height:1.7;margin:0">
              In the meantime, follow us on Instagram to stay connected with the community.
            </p>
          </div>

          <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1);text-align:center">
            <p style="font-size:13px;color:#8A8A8A;margin:0 0 14px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600">Follow Along</p>
            <a href="https://www.instagram.com/HoustonSkateProject" style="display:inline-block;text-decoration:none;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);color:white;padding:12px 28px;border-radius:50px;font-size:14px;font-weight:700;letter-spacing:0.03em">
              @HoustonSkateProject
            </a>
          </div>

          <div style="text-align:center;padding:16px;background:#8B5E3C;border-radius:12px;color:white;margin-bottom:20px">
            <p style="margin:0;font-size:16px;font-weight:bold">See you on the floor! 🎶</p>
            <p style="margin:6px 0 0;font-size:13px;opacity:0.85">Roll how you want. Express who you are.</p>
          </div>

          <p style="text-align:center;font-size:12px;color:#8A8A8A;margin:0">
            Questions? info@houstonskateproject.org
            <br/><br/>
            <a href="${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color:#8A8A8A">Unsubscribe</a>
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
