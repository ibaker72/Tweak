import { track } from "@vercel/analytics/react";

type EventName =
  | "solution_cta_clicked"
  | "website_calculator_started"
  | "website_calculator_completed"
  | "website_calculator_cta_clicked"
  | "contact_form_submit"
  | "book_call_click"
  | "phone_click"
  | "email_click"
  | "work_case_study_cta_click";

type EventProps = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: EventName, properties?: EventProps) {
  try {
    track(name, properties);
  } catch {
    // Analytics is best-effort. Never let a failed track call break a user action.
  }
}
