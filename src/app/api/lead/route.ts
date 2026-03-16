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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
