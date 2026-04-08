export type ProspectStatus =
  | "new"
  | "crawled"
  | "qualified"
  | "contacted"
  | "converted"
  | "rejected";

export type ProspectIndustry =
  | "dealerships"
  | "insurance"
  | "service-businesses";

export interface Prospect {
  id: string;
  business_name: string;
  industry: ProspectIndustry;
  address: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  website_url: string | null;
  google_place_id: string | null;
  google_rating: number | null;
  google_review_count: number | null;
  status: ProspectStatus;
  audit_score: number | null;
  audit_result_json: Record<string, unknown> | null;
  notes: string | null;
  search_query: string | null;
  crawled_at: string | null;
  contacted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  geometry?: {
    location: { lat: number; lng: number };
  };
}

export interface SearchParams {
  query: string;
  location: string;
  industry: ProspectIndustry;
}

export interface OpenClawSearchResult {
  inserted: number;
  skipped: number;
  prospects: Prospect[];
}

export const INDUSTRY_LABELS: Record<ProspectIndustry, string> = {
  dealerships: "Car Dealerships",
  insurance: "Insurance Agencies",
  "service-businesses": "Service Businesses",
};

export const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: "New",
  crawled: "Crawled",
  qualified: "Qualified",
  contacted: "Contacted",
  converted: "Converted",
  rejected: "Rejected",
};

export const STATUS_COLORS: Record<ProspectStatus, string> = {
  new: "bg-white/[0.06] text-dim",
  crawled: "bg-blue-400/10 text-blue-400",
  qualified: "bg-accent/10 text-accent",
  contacted: "bg-purple-400/10 text-purple-400",
  converted: "bg-emerald-400/10 text-emerald-400",
  rejected: "bg-red-400/10 text-red-400",
};
