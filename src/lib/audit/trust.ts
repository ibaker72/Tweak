import * as cheerio from "cheerio";
import type { AuditInput, CategoryResult, FindingItem } from "./types";

export function analyzeTrust(input: AuditInput): CategoryResult {
  const $ = cheerio.load(input.html);
  const strengths: FindingItem[] = [];
  const issues: FindingItem[] = [];
  const quickWins: FindingItem[] = [];
  let score = 100;
  const cat = "trust";

  const bodyText = $("body").text().toLowerCase();
  const bodyHtml = input.html.toLowerCase();

  // HTTPS
  const isHttps = input.url.startsWith("https://");
  if (!isHttps) {
    score -= 20;
    issues.push({
      title: "Site is not using HTTPS",
      description: "Your website doesn't use a secure connection (HTTPS). Browsers show 'Not Secure' warnings to visitors, which immediately damages trust and can drive people away. Google also penalizes non-HTTPS sites in search rankings.",
      severity: "critical",
      effort: "moderate",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Secure HTTPS connection",
      description: "Your site uses HTTPS, showing visitors the secure padlock icon and protecting their data.",
      severity: "positive",
      category: cat,
    });
  }

  // Testimonials
  const testimonialTerms = ["testimonial", "review", "what our", "what clients say", "client says", "hear from", "feedback", '"', "\u201C"];
  const hasTestimonials = testimonialTerms.some((t) => bodyText.includes(t));
  if (!hasTestimonials) {
    score -= 15;
    issues.push({
      title: "No testimonials or reviews detected",
      description: "We didn't detect customer testimonials or reviews on the page we scanned. Real feedback from past clients is one of the strongest trust signals — visitors want to know others have had a good experience before reaching out.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
    quickWins.push({
      title: "Add 2-3 client testimonials",
      description: "Even a few short, genuine testimonials with names (and photos if possible) can dramatically increase visitor confidence.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Customer testimonials present",
      description: "Your page features client feedback, helping visitors trust your business before reaching out.",
      severity: "positive",
      category: cat,
    });
  }

  // Physical address
  const addressPatterns = [
    /\d{1,5}\s+[a-z]+\s+(st|street|ave|avenue|blvd|boulevard|rd|road|dr|drive|ln|lane|way|ct|court|pl|place)/i,
    /suite\s+\d/i,
    /\b[A-Z]{2}\s+\d{5}\b/,
  ];
  const hasAddress = addressPatterns.some((p) => p.test(bodyText));
  if (!hasAddress) {
    score -= 10;
    issues.push({
      title: "No visible business address detected",
      description: "We couldn't detect a visible business address on the page we scanned. Adding your city/state or business location can strengthen trust and local SEO.",
      severity: "important",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Display your business address",
      description: "Adding a physical address (even just city and state) signals legitimacy and helps with local search rankings.",
      severity: "important",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Physical address displayed",
      description: "Your page shows a physical location, reinforcing that you're a legitimate, established business.",
      severity: "positive",
      category: cat,
    });
  }

  // Phone number
  const hasPhone = /(\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\d{3}[-.\s]\d{3}[-.\s]\d{4}|\+\d[\d\s-]{8,})/.test(bodyText);
  if (!hasPhone) {
    score -= 5;
    issues.push({
      title: "No phone number visible",
      description: "There's no phone number on your page. Some visitors — especially those ready to buy — prefer to call. A visible phone number also signals that there's a real person behind the business.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Phone number displayed",
      description: "Your page shows a phone number, giving visitors a direct way to reach you and reinforcing credibility.",
      severity: "positive",
      category: cat,
    });
  }

  // Privacy policy / terms
  const hasPrivacy = $('a[href*="privacy"], a[href*="Privacy"]').length > 0 || bodyText.includes("privacy policy");
  if (!hasPrivacy) {
    score -= 5;
    issues.push({
      title: "No privacy policy link found",
      description: "Your page doesn't link to a privacy policy. This is a legal requirement in many regions and a basic trust signal visitors expect to see, especially before sharing their contact information.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Privacy policy linked",
      description: "Your page includes a link to your privacy policy, meeting visitor expectations and legal requirements.",
      severity: "positive",
      category: cat,
    });
  }

  // Social media links
  const socialDomains = ["facebook.com", "twitter.com", "x.com", "linkedin.com", "instagram.com", "youtube.com", "tiktok.com"];
  const socialLinks = $("a").filter(function (_i, el) {
    const href = $(el).attr("href") || "";
    return socialDomains.some((d) => href.includes(d));
  });
  if (socialLinks.length === 0) {
    score -= 5;
    issues.push({
      title: "No social media links detected",
      description: "We didn't find links to social media profiles on this page. Social presence helps visitors verify your business is active and gives them another way to engage with your brand.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Social media profiles linked",
      description: `Your page links to ${socialLinks.length} social platform${socialLinks.length > 1 ? "s" : ""}, helping visitors connect with your brand across channels.`,
      severity: "positive",
      category: cat,
    });
  }

  // About page link
  const hasAbout = $('a[href*="about"], a[href*="About"]').length > 0;
  if (!hasAbout) {
    score -= 5;
    issues.push({
      title: "No about page link",
      description: "Visitors often look for an 'About' page to learn who's behind the business. Not having one can make your site feel impersonal or less trustworthy.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  }

  // Generic email check
  const emailMatch = bodyText.match(/[a-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|aol)\.[a-z]{2,}/i);
  if (emailMatch) {
    score -= 5;
    issues.push({
      title: "Using a generic email provider",
      description: `Your contact email uses ${emailMatch[1]}.com. A professional email like hello@yourdomain.com looks more credible and reinforces your brand with every interaction.`,
      severity: "minor",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Set up a branded email address",
      description: "Use an email address on your own domain (e.g., hello@yourdomain.com) for a more professional impression.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  }

  // Trust badges
  const badgeTerms = ["certified", "accredited", "bbb", "award", "featured in", "as seen", "partner", "verified", "guarantee", "warranty", "money back"];
  const hasBadges = badgeTerms.some((t) => bodyText.includes(t));
  if (!hasBadges) {
    score -= 5;
    issues.push({
      title: "No trust badges or certifications detected",
      description: "We didn't detect certifications, awards, or trust badges on this page. These visual cues can significantly boost visitor confidence — even simple ones like industry certifications or guarantees help.",
      severity: "minor",
      effort: "moderate",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Trust indicators present",
      description: "Your page displays certifications, awards, or trust badges that help reassure visitors.",
      severity: "positive",
      category: cat,
    });
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    label: "Trust",
    summary: "",
    strengths,
    issues,
    quickWins,
  };
}
