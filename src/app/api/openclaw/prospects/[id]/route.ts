import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/service";

const patchSchema = z.object({
  status: z
    .enum(["new", "crawled", "qualified", "contacted", "converted", "rejected"])
    .optional(),
  notes: z.string().max(2000).optional(),
  contacted_at: z.string().datetime().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const updates: Record<string, unknown> = {
      ...parsed.data,
      updated_at: new Date().toISOString(),
    };

    // Auto-set contacted_at when status changes to contacted
    if (parsed.data.status === "contacted" && !parsed.data.contacted_at) {
      updates.contacted_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("prospects")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to update prospect" }, { status: 500 });
    }

    return NextResponse.json({ prospect: data });
  } catch (err) {
    console.error("Prospect patch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = createServiceClient();

    const { error } = await supabase.from("prospects").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: "Failed to delete prospect" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Prospect delete error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
