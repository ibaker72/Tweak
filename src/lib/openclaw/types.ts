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

export type DealStage = "lead" | "engaged" | "meeting" | "proposal" | "won" | "lost";

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
  email: string | null;
  contact_name: string | null;
  deal_stage: DealStage;
  deal_value_cents: number | null;
  last_outreach_at: string | null;
  outreach_count: number;
  auto_enrolled: boolean;
}

export const DEAL_STAGES: DealStage[] = [
  "lead",
  "engaged",
  "meeting",
  "proposal",
  "won",
  "lost",
];

export const DEAL_STAGE_LABELS: Record<DealStage, string> = {
  lead: "Lead",
  engaged: "Engaged",
  meeting: "Meeting",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

export interface OutreachRecord {
  id: string;
  prospect_id: string;
  sequence_step: number;
  kind: string;
  to_email: string | null;
  subject: string | null;
  body_text: string | null;
  status: string;
  sent_at: string | null;
  opened_at: string | null;
  replied_at: string | null;
  error: string | null;
  created_at: string;
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
