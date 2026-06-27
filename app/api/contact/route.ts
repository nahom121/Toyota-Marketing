import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const TO_EMAIL = "nahom.estifanos@drivetoyotaofkaty.com";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, interest, timeline, message } = await request.json();

    if (!name || !phone || !interest) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Toyota Site <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email || undefined,
      subject: `New Appointment Request – ${name}`,
      html: `
        <h2 style="color:#EB0A1E">New Appointment Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Interested In</td><td style="padding:8px">${interest}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Timeline</td><td style="padding:8px">${timeline || "Not specified"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${message || "None"}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
