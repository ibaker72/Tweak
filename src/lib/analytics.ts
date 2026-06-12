import { track } from "@vercel/analytics/react";

type EventName =
  | "pricing_button_click"
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

const STRIPE_PAYMENT_LINK_PREFIX = "https://buy.stripe.com/";

export function isValidStripePaymentLink(url: string | undefined | null): url is string {
  if (!url || typeof url !== "string") return false;
  return url.trim().startsWith(STRIPE_PAYMENT_LINK_PREFIX);
}
