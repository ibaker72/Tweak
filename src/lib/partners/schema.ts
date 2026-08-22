import { z } from "zod";
import { ESTIMATED_REFERRAL_OPTIONS } from "@/lib/partners/types";

/**
 * Server-side validation for the public Partner Application form.
 *
 * Every bound here is deliberate: this is an unauthenticated public
 * endpoint, so the schema is also the payload-size guard. Without the
 * `.max()` calls a single request could push megabytes of text into the
 * database and into a notification email.
 */

/** Longest address permitted by RFC 5321. */
const MAX_EMAIL_LENGTH = 254;

/**
 * Normalise a user-typed website/LinkedIn value into something storable.
 *
 * People type `linkedin.com/in/jane` far more often than they type the
 * scheme, and rejecting that would fail real applicants for no good
 * reason. So we prepend https:// when a scheme is absent and then check
 * the result parses as a URL with a plausible hostname. We intentionally
 * do NOT check that the host resolves or that the page exists.
 */
function normaliseWebsite(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withScheme);
    // A bare word like "portfolio" becomes https://portfolio — a valid URL
    // object but not a real address. Require a dot in the hostname.
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const partnerApplicationSchema = z.object({
  name: z
    .string({ error: "Please enter your full name" })
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),

  email: z
    .string({ error: "Please enter your email address" })
    .trim()
    .max(MAX_EMAIL_LENGTH, "Email address is too long")
    .toLowerCase()
    .pipe(z.email("Please enter a valid email address")),

  company: z
    .string()
    .trim()
    .max(160, "Company name is too long")
    .optional()
    .transform((v) => (v ? v : null)),

  website: z
    .string()
    .trim()
    .max(500, "Website URL is too long")
    .optional()
    .transform((v) => (v ? normaliseWebsite(v) : null)),

  description: z
    .string({ error: "Please tell us what you do" })
    .trim()
    .min(10, "Please tell us a little more about what you do")
    .max(2000, "Please keep this under 2000 characters"),

  howYouMeet: z
    .string({ error: "Please tell us how you meet potential clients" })
    .trim()
    .min(10, "Please tell us a little more about how you meet clients")
    .max(2000, "Please keep this under 2000 characters"),

  estimatedReferrals: z.enum(
    ESTIMATED_REFERRAL_OPTIONS,
    "Please select an estimated number of referrals",
  ),
});

export type PartnerApplicationInput = z.infer<typeof partnerApplicationSchema>;

/**
 * Split a full name into Loops' firstName / lastName fields.
 *
 *   "Mary Grace Joy Taduran" → { firstName: "Mary", lastName: "Grace Joy Taduran" }
 *   "Cher"                   → { firstName: "Cher", lastName: "" }
 *
 * Collapses runs of whitespace so a double space can't produce an empty
 * firstName. Deliberately dumb and predictable — we are not trying to
 * parse honorifics or compound surnames.
 */
export function splitName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}
