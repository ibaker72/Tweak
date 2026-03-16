import * as cheerio from "cheerio";
import type { AuditInput, CategoryResult, FindingItem } from "./types";

export function analyzeAccessibility(input: AuditInput): CategoryResult {
  const $ = cheerio.load(input.html);
  const strengths: FindingItem[] = [];
  const issues: FindingItem[] = [];
  const quickWins: FindingItem[] = [];
  let score = 100;
  const cat = "accessibility";

  // Image alt coverage
  const images = $("img");
  const imgCount = images.length;
  if (imgCount > 0) {
    const withAlt = images.filter(function (_i, el) {
      const alt = $(el).attr("alt");
      return alt !== undefined && alt.trim().length > 0;
    });
    const altPercent = Math.round((withAlt.length / imgCount) * 100);
    if (altPercent < 50) {
      score -= 15;
      issues.push({
        title: "Most images missing alternative text",
        description: `Only ${altPercent}% of your images have descriptive alt text. Screen reader users can't perceive images without alt text, and it's also a missed opportunity for search engine indexing.`,
        severity: "critical",
        effort: "moderate",
        category: cat,
      });
      quickWins.push({
        title: "Add alt text to all meaningful images",
        description: "Write brief, descriptive alt text for every image that conveys information. Decorative images can use empty alt attributes.",
        severity: "critical",
        effort: "moderate",
        category: cat,
      });
    } else if (altPercent >= 80) {
      strengths.push({
        title: "Good image alt text coverage",
        description: `${altPercent}% of your images have descriptive alt text, making your visual content accessible to screen reader users.`,
        severity: "positive",
        category: cat,
      });
    } else {
      issues.push({
        title: "Some images lack alt text",
        description: `${altPercent}% of your images have alt text, but there's room to improve. Every image that conveys meaning should have descriptive text for visitors who can't see it.`,
        severity: "important",
        effort: "moderate",
        category: cat,
      });
    }
  }

  // Form labels
  const inputs = $("input:not([type=hidden]):not([type=submit]):not([type=button]), textarea, select");
  if (inputs.length > 0) {
    let unlabeled = 0;
    inputs.each(function (_i, el) {
      const id = $(el).attr("id");
      const ariaLabel = $(el).attr("aria-label");
      const ariaLabelledBy = $(el).attr("aria-labelledby");
      const placeholder = $(el).attr("placeholder");
      const hasLabel = (id && $(`label[for="${id}"]`).length > 0) || ariaLabel || ariaLabelledBy;
      if (!hasLabel && !placeholder) unlabeled++;
    });
    if (unlabeled > 0) {
      score -= 15;
      issues.push({
        title: "Form fields without labels",
        description: `${unlabeled} form field${unlabeled > 1 ? "s" : ""} lack proper labels. Screen reader users won't know what information to enter, and even sighted users benefit from clear labels that persist above form fields.`,
        severity: "important",
        effort: "quick",
        category: cat,
      });
      quickWins.push({
        title: "Add labels to all form fields",
        description: "Every form field should have a visible label or at minimum an aria-label attribute so all users know what to enter.",
        severity: "important",
        effort: "quick",
        category: cat,
      });
    } else {
      strengths.push({
        title: "Form fields properly labeled",
        description: "All your form inputs have associated labels, making them accessible to assistive technology users.",
        severity: "positive",
        category: cat,
      });
    }
  }

  // Semantic HTML / ARIA landmarks
  const hasMain = $("main").length > 0;
  const hasNav = $("nav").length > 0;
  const hasHeader = $("header").length > 0;
  const hasFooter = $("footer").length > 0;
  const hasAria = $("[role]").length > 0;
  const landmarkCount = [hasMain, hasNav, hasHeader, hasFooter, hasAria].filter(Boolean).length;

  if (landmarkCount < 2) {
    score -= 10;
    issues.push({
      title: "Limited use of semantic HTML",
      description: "Your page makes little use of semantic HTML elements like <main>, <nav>, <header>, and <footer>. These help screen reader users navigate efficiently and understand the page structure.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  } else if (landmarkCount >= 3) {
    strengths.push({
      title: "Good semantic HTML structure",
      description: "Your page uses semantic elements like header, nav, main, and footer, giving it a clear structure that assistive technologies can navigate.",
      severity: "positive",
      category: cat,
    });
  }

  // Lang attribute
  const lang = $("html").attr("lang") || "";
  if (!lang) {
    score -= 5;
    issues.push({
      title: "Missing language declaration",
      description: "Your page doesn't declare its language. Screen readers need this to use the correct pronunciation, and it's a basic accessibility requirement that takes seconds to add.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Add language attribute to HTML tag",
      description: 'Add lang="en" (or your language) to the <html> tag — a one-second fix that helps screen readers pronounce content correctly.',
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Language properly declared",
      description: `Your page declares its language as "${lang}", helping screen readers use correct pronunciation.`,
      severity: "positive",
      category: cat,
    });
  }

  // Empty links / buttons
  const emptyLinks = $("a").filter(function (_i, el) {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr("aria-label") || "";
    const img = $(el).find("img[alt]");
    return !text && !ariaLabel && img.length === 0;
  });
  const emptyButtons = $("button").filter(function (_i, el) {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr("aria-label") || "";
    return !text && !ariaLabel;
  });
  const emptyInteractive = emptyLinks.length + emptyButtons.length;
  if (emptyInteractive > 0) {
    score -= 10;
    issues.push({
      title: "Interactive elements without accessible text",
      description: `${emptyInteractive} link${emptyInteractive > 1 ? "s" : ""} or button${emptyInteractive > 1 ? "s" : ""} on your page have no text content or aria-label. Screen reader users won't know what these elements do.`,
      severity: "important",
      effort: "quick",
      category: cat,
    });
  }

  // Skip nav
  const skipNav = $('a[href="#main"], a[href="#content"], a.skip-nav, a.skip-to-content, [class*="skip"]').filter(function (_i, el) {
    const text = $(el).text().toLowerCase();
    return text.includes("skip") || text.includes("jump to");
  });
  if (skipNav.length === 0) {
    score -= 5;
    issues.push({
      title: "No skip navigation link",
      description: "Keyboard and screen reader users must tab through your entire navigation on every page load. A 'Skip to content' link lets them jump straight to the main content.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  }

  // Outline removed
  const outlineNone = input.html.includes("outline: none") || input.html.includes("outline:none") || input.html.includes("outline: 0");
  if (outlineNone) {
    score -= 5;
    issues.push({
      title: "Focus outlines may be removed",
      description: "Your CSS appears to remove focus outlines. Keyboard users rely on focus indicators to know which element is selected. If you remove them, provide a custom visible focus style instead.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  }

  // Heading structure
  const headings = $("h1, h2, h3, h4, h5, h6");
  if (headings.length === 0) {
    score -= 5;
    issues.push({
      title: "No heading structure",
      description: "Your page doesn't use any heading elements. Headings create an outline that screen reader users rely on to navigate and understand content structure.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    label: "Accessibility",
    summary: "",
    strengths,
    issues,
    quickWins,
  };
}
