import * as cheerio from "cheerio";
import type { AuditInput, CategoryResult, FindingItem } from "./types";

export function analyzeMobile(input: AuditInput): CategoryResult {
  const $ = cheerio.load(input.html);
  const strengths: FindingItem[] = [];
  const issues: FindingItem[] = [];
  const quickWins: FindingItem[] = [];
  let score = 100;
  const cat = "mobile";

  const html = input.html;

  // Viewport meta tag
  const viewport = $('meta[name="viewport"]').attr("content") || "";
  if (!viewport) {
    score -= 25;
    issues.push({
      title: "No mobile viewport configuration",
      description: "Your page doesn't include a viewport meta tag, which means mobile devices will try to display it as a desktop page — usually resulting in tiny, unreadable text and a frustrating pinch-to-zoom experience.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Add viewport meta tag",
      description: 'Adding a single line of code (viewport meta tag) tells mobile browsers to scale your page properly for the screen size.',
      severity: "critical",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Mobile viewport configured",
      description: "Your page includes a viewport meta tag, ensuring it scales properly on mobile devices.",
      severity: "positive",
      category: cat,
    });
  }

  // Responsive CSS indicators
  const hasMediaQueries = /@media\s*\(/.test(html) || /@media\s*screen/.test(html);
  const hasResponsiveClasses = /class="[^"]*\b(col-|sm:|md:|lg:|xl:|flex|grid|container|row)\b/.test(html)
    || /class="[^"]*\b(responsive|mobile|tablet)\b/i.test(html);
  const hasTailwind = /class="[^"]*\b(sm:|md:|lg:|xl:|2xl:)/.test(html);
  const hasBootstrap = /class="[^"]*\b(col-sm|col-md|col-lg|col-xl|d-sm|d-md|d-lg)/.test(html);

  const isResponsive = hasMediaQueries || hasResponsiveClasses || hasTailwind || hasBootstrap;

  if (!isResponsive) {
    score -= 20;
    issues.push({
      title: "No responsive design indicators detected",
      description: "We didn't detect responsive design techniques in the page source we scanned. This may mean the page has layout issues on phones and tablets — worth verifying since over half of all web traffic comes from mobile devices.",
      severity: "critical",
      effort: "strategic",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Responsive design detected",
      description: "Your page uses responsive design techniques to adapt its layout across different screen sizes.",
      severity: "positive",
      category: cat,
    });
  }

  // Fixed-width elements
  const fixedWidthPattern = /style="[^"]*width\s*:\s*(\d{4,})px/g;
  const fixedWidthMatches = html.match(fixedWidthPattern);
  if (fixedWidthMatches && fixedWidthMatches.length > 0) {
    score -= 15;
    issues.push({
      title: "Fixed-width elements detected",
      description: "Some elements on your page have fixed pixel widths that are wider than a mobile screen. These will cause horizontal scrolling on phones, which is one of the most frustrating mobile browsing experiences.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  }

  // Small font sizes
  const smallFontPattern = /font-size\s*:\s*(\d+)px/g;
  let smallFontCount = 0;
  let match;
  while ((match = smallFontPattern.exec(html)) !== null) {
    if (parseInt(match[1]) < 14) smallFontCount++;
  }
  if (smallFontCount > 3) {
    score -= 10;
    issues.push({
      title: "Small text detected",
      description: "Several elements on your page use font sizes below 14px. On mobile devices, this text will be very hard to read without zooming in, potentially driving visitors away.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
    quickWins.push({
      title: "Increase minimum font sizes",
      description: "Ensure body text is at least 16px and supporting text is at least 14px for comfortable mobile reading.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  }

  // Responsive images
  const images = $("img");
  if (images.length > 0) {
    const hasResponsiveImages = html.includes("max-width: 100%") || html.includes("max-width:100%")
      || /class="[^"]*\b(w-full|max-w-full|img-fluid|img-responsive)\b/.test(html);
    if (!hasResponsiveImages) {
      score -= 10;
      issues.push({
        title: "Images may not scale on mobile",
        description: "Your images don't appear to have responsive sizing applied. On smaller screens, they could overflow their containers, causing layout issues and horizontal scrolling.",
        severity: "important",
        effort: "quick",
        category: cat,
      });
      quickWins.push({
        title: "Make images responsive",
        description: 'Adding "max-width: 100%" to images ensures they scale down gracefully on smaller screens.',
        severity: "important",
        effort: "quick",
        category: cat,
      });
    } else {
      strengths.push({
        title: "Responsive images",
        description: "Your images are set to scale properly across different screen sizes.",
        severity: "positive",
        category: cat,
      });
    }
  }

  // Dense text blocks
  const paragraphs = $("p");
  let denseBlocks = 0;
  paragraphs.each(function (_i, el) {
    const text = $(el).text().trim();
    if (text.length > 500) denseBlocks++;
  });
  if (denseBlocks > 2) {
    score -= 5;
    issues.push({
      title: "Dense text blocks detected",
      description: "Your page has several long paragraphs that will be difficult to read on mobile screens. Breaking up text into shorter paragraphs, bullet points, or sections makes content much more scannable on phones.",
      severity: "minor",
      effort: "moderate",
      category: cat,
    });
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    label: "Mobile",
    summary: "",
    strengths,
    issues,
    quickWins,
  };
}
