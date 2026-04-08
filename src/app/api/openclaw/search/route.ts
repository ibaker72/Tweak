import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/service";
import { searchGooglePlaces, parseCityState } from "@/lib/openclaw/search";
import type { ProspectIndustry } from "@/lib/openclaw/types";

const schema = z.object({
  query: z.string().optional().default(""),
  location: z.string().min(2, "Location is required"),
  industry: z.enum(["dealerships", "insurance", "service-businesses"]),
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

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Places API key is not configured" },
        { status: 500 }
      );
    }

    const { query, location, industry } = parsed.data;

    // Build the full search query
    const searchQuery = query || location;
    const searchParams = { query, location, industry: industry as ProspectIndustry };

    let places;
    try {
      places = await searchGooglePlaces(searchParams, apiKey);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    if (!places.length) {
      return NextResponse.json({ inserted: 0, skipped: 0, prospects: [] });
    }

    const supabase = createServiceClient();

    // Upsert by google_place_id to avoid dupes
    let inserted = 0;
    let skipped = 0;
    const inserted_prospects = [];

    for (const place of places) {
      const { city, state } = parseCityState(place.formatted_address);

      const { data, error } = await supabase
        .from("prospects")
        .upsert(
          {
            business_name: place.name,
            industry,
            address: place.formatted_address,
            city,
            state,
            phone: place.formatted_phone_number || null,
            website_url: place.website || null,
            google_place_id: place.place_id,
            google_rating: place.rating || null,
            google_review_count: place.user_ratings_total || null,
            search_query: `${searchQuery} — ${location}`,
            status: "new",
          },
          { onConflict: "google_place_id", ignoreDuplicates: false }
        )
        .select()
        .single();

      if (error) {
        skipped++;
      } else if (data) {
        inserted++;
        inserted_prospects.push(data);
      }
    }

    return NextResponse.json({
      inserted,
      skipped,
      prospects: inserted_prospects,
    });
  } catch (err) {
    console.error("OpenClaw search error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
