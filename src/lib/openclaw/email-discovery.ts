import * as cheerio from "cheerio";

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

const ROLE_LOCAL_PARTS = [
  "info",
  "contact",
  "hello",
  "sales",
  "office",
  "team",
  "support",
  "service",
  "admin",
  "inquiries",
  "owner",
];

const SKIP_DOMAINS = ["sentry.io", "example.com", "wixpress.com", "godaddy.com", "google.com"];

const CONTACT_PATHS = ["/contact", "/contact-us", "/about", "/about-us", "/staff", "/team"];

export interface EmailDiscoveryResult {
  email: string | null;
  source: "homepage" | "contact_page" | null;
}

export async function discoverEmail(websiteUrl: string): Promise<EmailDiscoveryResult> {
  let base: URL;
  try {
    base = new URL(/^https?:\/\//i.test(websiteUrl) ? websiteUrl : `https://${websiteUrl}`);
  } catch {
    return { email: null, source: null };
  }

  // 1. Try homepage
  const homepageEmail = await scanPage(base.toString());
  if (homepageEmail) return { email: homepageEmail, source: "homepage" };

  // 2. Try common contact paths
  for (const path of CONTACT_PATHS) {
    const url = new URL(path, base).toString();
    const email = await scanPage(url);
    if (email) return { email, source: "contact_page" };
  }

  return { email: null, source: null };
}

async function scanPage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "TweakAndBuild-OpenClaw/1.0" },
      redirect: "follow",
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const html = await res.text();
    return extractBestEmail(html);
  } catch {
    return null;
  }
}

export function extractBestEmail(html: string): string | null {
  const found = new Set<string>();

  // mailto: links via cheerio
  try {
    const $ = cheerio.load(html);
    $("a[href^='mailto:']").each((_, el) => {
      const href = $(el).attr("href") || "";
      const email = href.replace(/^mailto:/i, "").split("?")[0].trim().toLowerCase();
      if (email && email.includes("@")) found.add(email);
    });
  } catch {
    // ignore parse errors, fall through to regex
  }

  // Regex sweep
  const matches = html.match(EMAIL_RE);
  if (matches) {
    for (const m of matches) found.add(m.toLowerCase());
  }

  const candidates = [...found].filter((email) => {
    const domain = email.split("@")[1] || "";
    if (!domain) return false;
    if (SKIP_DOMAINS.some((d) => domain.endsWith(d))) return false;
    if (email.endsWith(".png") || email.endsWith(".jpg") || email.endsWith(".gif")) return false;
    if (email.includes("@sentry") || email.includes("@wix")) return false;
    return true;
  });

  if (!candidates.length) return null;

  // Prefer role-based mailboxes (info@, contact@, sales@)
  const roleHit = candidates.find((e) => {
    const local = e.split("@")[0];
    return ROLE_LOCAL_PARTS.includes(local);
  });

  return roleHit || candidates[0];
}
