/**
 * Partner Program application types.
 *
 * These mirror the CHECK constraints on public.partner_applications
 * (supabase/migrations/00011_partner_applications.sql). If you change a
 * value here you MUST ship a migration that changes the constraint too,
 * otherwise the insert will fail at runtime.
 */

export const PARTNER_APPLICATION_STATUSES = [
  "new",
  "reviewing",
  "contacted",
  "approved",
  "rejected",
] as const;

export type PartnerApplicationStatus =
  (typeof PARTNER_APPLICATION_STATUSES)[number];

/**
 * The referral-volume buckets offered by the form's <select>.
 * Imported by both the public form and the server schema so the two
 * can never drift apart.
 */
export const ESTIMATED_REFERRAL_OPTIONS = [
  "1-2",
  "3-5",
  "5-10",
  "10+",
] as const;

export type EstimatedReferrals = (typeof ESTIMATED_REFERRAL_OPTIONS)[number];

export interface PartnerApplication {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  website: string | null;
  description: string;
  how_you_meet: string;
  estimated_referrals: EstimatedReferrals;
  status: PartnerApplicationStatus;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Name of the honeypot field rendered (visually hidden) in the public form.
 *
 * Real people never fill it; naive bots fill every input they find. The
 * route checks this on the raw body BEFORE Zod runs, so a filled value
 * never produces a validation error that would advertise the trap's
 * existence.
 *
 * Lives here rather than in schema.ts so the client form can import it
 * without pulling Zod into the browser bundle.
 */
export const HONEYPOT_FIELD = "website_url";

/** Human-facing labels for the admin UI. */
export const PARTNER_STATUS_LABELS: Record<PartnerApplicationStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  contacted: "Contacted",
  approved: "Approved",
  rejected: "Rejected",
};
