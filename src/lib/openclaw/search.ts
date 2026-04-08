import type { PlaceResult, SearchParams, ProspectIndustry } from "./types";

const PLACES_API_BASE = "https://maps.googleapis.com/maps/api/place";

interface TextSearchResponse {
  results: Array<{
    place_id: string;
    name: string;
    formatted_address: string;
    rating?: number;
    user_ratings_total?: number;
    geometry?: { location: { lat: number; lng: number } };
  }>;
  status: string;
  next_page_token?: string;
  error_message?: string;
}

interface PlaceDetailsResponse {
  result: {
    formatted_phone_number?: string;
    website?: string;
  };
  status: string;
}

const INDUSTRY_SEARCH_TERMS: Record<ProspectIndustry, string> = {
  dealerships: "car dealership auto dealer",
  insurance: "insurance agency",
  "service-businesses": "HVAC plumbing electrical cleaning service",
};

export function buildSearchQuery(params: SearchParams): string {
  const baseTerms = INDUSTRY_SEARCH_TERMS[params.industry] || params.query;
  const term = params.query || baseTerms;
  return `${term} in ${params.location}`;
}

export async function searchGooglePlaces(
  params: SearchParams,
  apiKey: string
): Promise<PlaceResult[]> {
  const query = buildSearchQuery(params);
  const url = new URL(`${PLACES_API_BASE}/textsearch/json`);
  url.searchParams.set("query", query);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.status}`);
  }

  const data: TextSearchResponse = await response.json();

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(
      `Google Places API returned status: ${data.status}${data.error_message ? ` — ${data.error_message}` : ""}`
    );
  }

  if (!data.results?.length) return [];

  // Fetch place details (phone + website) for each result in parallel — cap at 10
  const limited = data.results.slice(0, 10);
  const details = await Promise.allSettled(
    limited.map((r) => fetchPlaceDetails(r.place_id, apiKey))
  );

  return limited.map((r, i) => {
    const detail = details[i].status === "fulfilled" ? details[i].value : {};
    return {
      place_id: r.place_id,
      name: r.name,
      formatted_address: r.formatted_address,
      formatted_phone_number: detail.formatted_phone_number,
      website: detail.website,
      rating: r.rating,
      user_ratings_total: r.user_ratings_total,
      geometry: r.geometry,
    };
  });
}

async function fetchPlaceDetails(
  placeId: string,
  apiKey: string
): Promise<{ formatted_phone_number?: string; website?: string }> {
  const url = new URL(`${PLACES_API_BASE}/details/json`);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "formatted_phone_number,website");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) return {};

  const data: PlaceDetailsResponse = await response.json();
  if (data.status !== "OK") return {};

  return {
    formatted_phone_number: data.result.formatted_phone_number,
    website: data.result.website,
  };
}

export function parseCityState(address: string): { city: string | null; state: string | null } {
  // Google formatted_address is typically: "Name, City, State ZIP, Country"
  const parts = address.split(",").map((p) => p.trim());
  if (parts.length >= 3) {
    const city = parts[parts.length - 3] || null;
    const stateZip = parts[parts.length - 2] || "";
    const state = stateZip.split(" ")[0] || null;
    return { city, state };
  }
  return { city: null, state: null };
}
