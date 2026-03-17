import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/service";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  auditRequestId: z.string().uuid().optional(),
  businessName: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default("audit_gate"),
});

/**
 * Add lead to Loops mailing list for follow-up sequences.
 * Best-effort — DB save is the source of truth; Loops failure doesn't block unlock.
 */
async function addToLoops(email: string, source: string, businessName?: string) {
  const loopsApiKey = process.env.LOOPS_API_KEY;
  if (!loopsApiKey) return;

  try {
    await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loopsApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source,
        ...(businessName ? { company: businessName } : {}),
        mailingLists: {
          cmmlscebg1ri40izh2lqg7fxj: true,
        },
      }),
    });
  } catch (err) {
    console.error("Loops sync failed (non-blocking):", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Primary: save lead to DB — this is the source of truth
    const { error: insertError } = await supabase.from("audit_leads").insert({
      email: parsed.data.email,
      audit_request_id: parsed.data.auditRequestId || null,
      business_name: parsed.data.businessName || null,
      phone: parsed.data.phone || null,
      message: parsed.data.message || null,
      source: parsed.data.source,
    });

    if (insertError) {
      console.error("Failed to save lead:", insertError);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    // Update audit request if provided
    if (parsed.data.auditRequestId) {
      await supabase
        .from("audit_requests")
        .update({ email_captured: true, email: parsed.data.email })
        .eq("id", parsed.data.auditRequestId);
    }

    // Secondary: sync to Loops mailing list for follow-up (non-blocking)
    addToLoops(
      parsed.data.email,
      parsed.data.source,
      parsed.data.businessName || undefined
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
