import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      { error: "RESEND_AUDIENCE_ID is not set in the environment variables." },
      { status: 500 }
    );
  }

  try {
    const { email: rawEmail } = await request.json();
    const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.contacts.remove({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    if (error) {
      return NextResponse.json({ error: error.message || "Failed to remove contact." }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted: data?.deleted ?? true });
  } catch (error) {
    console.error("Remove subscriber error:", error);
    return NextResponse.json({ error: "Failed to remove subscriber." }, { status: 500 });
  }
}
