import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const TO_EMAIL = "nahom.estifanos@drivetoyotaofkaty.com";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, year, make, model, mileage, condition } = await request.json();

    if (!name || !phone || !year || !make || !model) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Toyota Site <onboarding@resend.dev>",
      to: TO_EMAIL,
      subject: `Trade-In Request – ${year} ${make} ${model}`,
      html: `
        <h2 style="color:#EB0A1E">Trade-In Appraisal Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Vehicle</td><td style="padding:8px">${year} ${make} ${model}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Mileage</td><td style="padding:8px">${mileage || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Condition</td><td style="padding:8px">${condition || "Not specified"}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Trade-in form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
