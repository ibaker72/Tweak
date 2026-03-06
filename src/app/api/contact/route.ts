import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const to = process.env.CONTACT_TO_EMAIL || "iyadbaker.dev@gmail.com";
    const key = process.env.RESEND_API_KEY;

    if (key && key !== "re_xxxxxxxxxxxx") {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      await resend.emails.send({
        from: "Tweak & Build <noreply@tweakandbuild.com>", to: [to], replyTo: body.email,
        subject: `${body.type === "quick" ? "Quick Build" : "Project"} inquiry from ${body.name}${body.company ? ` (${body.company})` : ""}`,
        html: `<div style="font-family:-apple-system,sans-serif;max-width:560px"><h2 style="color:#8B5CF6">${body.type === "quick" ? "Quick Build Request" : "New Project Inquiry"}</h2><table style="width:100%;border-collapse:collapse">${Object.entries(body).filter(([k,v]) => v && k !== "type").map(([k,v]) => `<tr><td style="padding:8px 0;color:#888;width:100px;text-transform:capitalize">${k}</td><td style="padding:8px 0;color:#222">${v}</td></tr>`).join("")}</table></div>`,
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
