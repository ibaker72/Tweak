import * as cheerio from "cheerio";
import type { AuditInput, CategoryResult, FindingItem } from "./types";

const CTA_WORDS = ["get", "start", "book", "call", "free", "schedule", "contact", "try", "sign up", "request", "claim", "download", "join", "subscribe", "buy", "order", "hire", "quote"];

/**
 * Optional cross-category context passed from the aggregate layer
 * to ground conversion scores against broader site quality.
 */
export interface ConversionContext {
  trustScore?: number;
  seoScore?: number;
  totalPriorityIssues?: number; // critical + important issues across all categories
}

export function analyzeConversion(input: AuditInput, ctx?: ConversionContext): CategoryResult {
  const $ = cheerio.load(input.html);
  const strengths: FindingItem[] = [];
  const issues: FindingItem[] = [];
  const quickWins: FindingItem[] = [];
  let score = 100;
  const cat = "conversion";

  const allElements = $("body *");
  const totalElements = allElements.length;
  const topThirdIndex = Math.floor(totalElements * 0.3);

  // CTA in first 30% of DOM
  const topThirdButtons = $("body").find("a, button").filter(function (i, el) {
    const elIndex = allElements.index($(el));
    return elIndex < topThirdIndex;
  });

  let hasCtaAboveFold = false;
  topThirdButtons.each(function (_i, el) {
    const text = $(el).text().toLowerCase();
    if (CTA_WORDS.some((w) => text.includes(w))) {
      hasCtaAboveFold = true;
    }
  });

  if (!hasCtaAboveFold) {
    score -= 20;
    issues.push({
      title: "No clear call-to-action above the fold",
      description: "Visitors who land on your page don't see a clear next step right away. Without a prominent button like 'Book a Call' or 'Get Started' near the top, many will leave without taking action.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Add a strong call-to-action above the fold",
      description: "Place a clear, action-oriented button near the top of your page so visitors immediately know what to do next.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Call-to-action visible immediately",
      description: "Visitors see a clear next step as soon as they land on your page, which is key to converting traffic into leads.",
      severity: "positive",
      category: cat,
    });
  }

  // CTA text quality
  const allCtas = $("a, button");
  let genericCtaCount = 0;
  let specificCtaCount = 0;
  allCtas.each(function (_i, el) {
    const text = $(el).text().trim().toLowerCase();
    if (text === "click here" || text === "learn more" || text === "read more" || text === "submit") {
      genericCtaCount++;
    }
    if (CTA_WORDS.some((w) => text.includes(w)) && text.length > 3) {
      specificCtaCount++;
    }
  });

  if (genericCtaCount > specificCtaCount && specificCtaCount < 2) {
    score -= 10;
    issues.push({
      title: "Call-to-action text could be stronger",
      description: 'Your buttons use generic text like "Click Here" or "Learn More." Specific, action-oriented text like "Get Your Free Quote" or "Book a Strategy Call" tells visitors exactly what they\'ll get and drives more clicks.',
      severity: "important",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Rewrite button text to be specific",
      description: 'Replace generic "Learn More" buttons with specific action words that tell visitors what they\'ll get.',
      severity: "important",
      effort: "quick",
      category: cat,
    });
  }

  // Contact visibility
  const bodyText = $("body").text().toLowerCase();
  const bodyHtml = input.html.toLowerCase();
  const hasPhone = /(\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\d{3}[-.\s]\d{3}[-.\s]\d{4}|\+\d[\d\s-]{8,})/.test(bodyText);
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(bodyText);
  const hasContactForm = $('form').length > 0;

  if (!hasPhone && !hasEmail && !hasContactForm) {
    score -= 15;
    issues.push({
      title: "No visible contact method",
      description: "Visitors can't find a phone number, email, or contact form on your page. If someone is ready to reach out, they have no way to do it — which likely means you're losing potential customers.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Add visible contact information",
      description: "Display a phone number, email address, or contact form prominently on the page so interested visitors can easily reach you.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
  } else {
    const methods: string[] = [];
    if (hasPhone) methods.push("phone number");
    if (hasEmail) methods.push("email");
    if (hasContactForm) methods.push("contact form");
    strengths.push({
      title: "Contact methods visible",
      description: `Your page displays ${methods.join(", ")}, making it easy for interested visitors to reach you.`,
      severity: "positive",
      category: cat,
    });
  }

  // Value proposition in hero
  const h1 = $("h1").first().text().trim();
  const heroSubtext = $("h1").first().parent().find("p").first().text().trim();
  if (!h1 || h1.length < 10) {
    score -= 10;
    issues.push({
      title: "Weak or missing value proposition",
      description: "Your page doesn't clearly communicate what you offer and why visitors should care within the first few seconds. A strong headline and supporting text above the fold are essential for keeping people on the page.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  } else if (h1.length >= 10 && heroSubtext) {
    strengths.push({
      title: "Clear value proposition",
      description: "Your page leads with a headline and supporting text that helps visitors quickly understand your offer.",
      severity: "positive",
      category: cat,
    });
  }

  // Form field count
  const forms = $("form");
  if (forms.length > 0) {
    const maxFields = Math.max(
      ...forms
        .map(function (_i, el) {
          return $(el).find("input, select, textarea").length;
        })
        .get()
    );
    if (maxFields > 8) {
      score -= 5;
      issues.push({
        title: "Forms may be too long",
        description: `One of your forms has ${maxFields} fields. Long forms discourage submissions — every extra field reduces completion rates. Consider what's truly essential and remove the rest.`,
        severity: "minor",
        effort: "quick",
        category: cat,
      });
    }
  }

  // Social proof
  const proofTerms = ["testimonial", "review", "rating", "stars", "client", "customer", "trusted by", "worked with", "case study"];
  const hasProof = proofTerms.some((term) => bodyText.includes(term) || bodyHtml.includes(term));
  if (!hasProof) {
    score -= 10;
    issues.push({
      title: "No visible social proof detected",
      description: "We didn't detect testimonials, reviews, or client mentions on the page we scanned. Social proof is one of the most powerful conversion tools — visitors are far more likely to take action when they see others have had a positive experience.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
    quickWins.push({
      title: "Add testimonials or client logos",
      description: "Even 2-3 short testimonials or a row of client logos can significantly boost visitor trust and conversion rates.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Social proof present",
      description: "Your page includes testimonials, reviews, or client mentions that help build visitor confidence.",
      severity: "positive",
      category: cat,
    });
  }

  // Navigation complexity
  const navLinks = $("nav a, header a");
  if (navLinks.length > 10) {
    score -= 5;
    issues.push({
      title: "Navigation may be overwhelming",
      description: `Your navigation has ${navLinks.length} links. Too many options can create decision paralysis. Streamlining to your most important pages helps guide visitors to the action you want them to take.`,
      severity: "minor",
      effort: "moderate",
      category: cat,
    });
  }

  score = Math.max(0, Math.min(100, score));

  // ── Cross-category guardrails ──
  // Conversion shouldn't feel elite when the broader site clearly isn't.
  if (ctx) {
    const hasOwnCriticalOrImportant = issues.some(
      (i) => i.severity === "critical" || i.severity === "important"
    );

    // If conversion itself has critical/important issues, cap at 88
    if (hasOwnCriticalOrImportant && score > 88) {
      score = 88;
    }

    // If trust or SEO is materially weak (<60), cap conversion at 85
    if (
      ((ctx.trustScore !== undefined && ctx.trustScore < 60) ||
        (ctx.seoScore !== undefined && ctx.seoScore < 60)) &&
      score > 85
    ) {
      score = 85;
    }

    // If 3+ priority issues site-wide, cap conversion at 88
    if ((ctx.totalPriorityIssues ?? 0) >= 3 && score > 88) {
      score = 88;
    }

    // 95+ should be very rare — require zero conversion issues AND strong trust+SEO
    if (score >= 95) {
      const trustOk = (ctx.trustScore ?? 100) >= 75;
      const seoOk = (ctx.seoScore ?? 100) >= 75;
      const fewSiteIssues = (ctx.totalPriorityIssues ?? 0) < 2;
      if (!(trustOk && seoOk && fewSiteIssues && issues.length === 0)) {
        score = Math.min(score, 92);
      }
    }
  }

  return {
    score,
    label: "Conversion",
    summary: "",
    strengths,
    issues,
    quickWins,
  };
}
