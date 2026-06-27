import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const TO_EMAIL = "nahom.estifanos@drivetoyotaofkaty.com";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, interest, message } = await request.json();

    if (!name || !phone || !interest) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Toyota Site <onboarding@resend.dev>",
      to: TO_EMAIL,
      subject: `New Lead – ${name} (${interest})`,
      html: `
        <h2 style="color:#EB0A1E">New Contact Request</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:10px;font-weight:bold;width:140px">Name</td><td style="padding:10px">${name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:10px;font-weight:bold">Phone</td><td style="padding:10px"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:10px;font-weight:bold">Interested In</td><td style="padding:10px">${interest}</td></tr>
          ${message ? `<tr><td style="padding:10px;font-weight:bold">Message</td><td style="padding:10px">${message}</td></tr>` : ""}
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
