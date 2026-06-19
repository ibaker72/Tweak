import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const to = process.env.CONTACT_TO_EMAIL || "hello@tweakandbuild.com";
    const key = process.env.RESEND_API_KEY;

    if (key && key !== "re_xxxxxxxxxxxx") {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      await resend.emails.send({
        from: "Tweak & Build <noreply@tweakandbuild.com>", to: [to], replyTo: body.email,
        subject: `${body.type === "quick" ? "Quick Build" : "Project"} inquiry from ${body.name}${body.company ? ` (${body.company})` : ""}${body.referral ? ` [Ref: ${body.referral}]` : ""}`,
        html: `<div style="font-family:-apple-system,sans-serif;max-width:560px"><h2 style="color:#8B5CF6">${body.type === "quick" ? "Quick Build Request" : "New Project Inquiry"}</h2>${body.referral ? `<p style="background:#f0fdf4;border:1px solid #bbf7d0;padding:8px 12px;border-radius:6px;font-size:14px"><strong>Referred by:</strong> ${body.referral}</p>` : ""}<table style="width:100%;border-collapse:collapse">${Object.entries(body).filter(([k, v]) => v && k !== "type" && k !== "referral" && k !== "smsConsent").map(([k, v]) => `<tr><td style="padding:8px 0;color:#888;width:100px;text-transform:capitalize">${k}</td><td style="padding:8px 0;color:#222">${v}</td></tr>`).join("")}<tr><td style="padding:8px 0;color:#888;width:100px">SMS Consent</td><td style="padding:8px 0;color:#222">${body.smsConsent ? "Yes" : "No"}</td></tr></table><p style="padding:8px 0;color:#888;font-size:13px">Referred by: ${body.referral || "Direct (no referral)"}</p></div>`,
      });
      return NextResponse.json({ success: true });
    }

    console.log("\n📧 NEW INQUIRY (dev mode)\n", JSON.stringify(body, null, 2), "\n");
    return NextResponse.json({ success: true, dev: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
