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
    const { emails: rawEmails } = await request.json();
    const emails: string[] = Array.isArray(rawEmails)
      ? [...new Set(rawEmails.map((e: string) => e.trim().toLowerCase()).filter(Boolean))]
      : [];

    if (emails.length === 0) {
      return NextResponse.json({ error: "No emails provided." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    let added = 0;
    let failed = 0;
    const errors: string[] = [];

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    for (const email of emails) {
      try {
        const { error } = await resend.contacts.create({
          email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID!,
        });
        if (error) throw new Error(error.message || "Resend error");
        added++;
      } catch (err) {
        failed++;
        errors.push(`${email}: ${err instanceof Error ? err.message : "unknown error"}`);
      }
      await sleep(300); // stay well under Resend's rate limit
    }

    return NextResponse.json({ success: true, total: emails.length, added, failed, errors });
  } catch (error) {
    console.error("Backfill subscribers error:", error);
    return NextResponse.json({ error: "Failed to add subscribers." }, { status: 500 });
  }
}
