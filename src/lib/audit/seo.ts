import * as cheerio from "cheerio";
import type { AuditInput, CategoryResult, FindingItem } from "./types";

export function analyzeSEO(input: AuditInput): CategoryResult {
  const $ = cheerio.load(input.html);
  const strengths: FindingItem[] = [];
  const issues: FindingItem[] = [];
  const quickWins: FindingItem[] = [];
  let score = 100;
  const cat = "seo";

  // Title tag
  const title = $("title").first().text().trim();
  if (!title) {
    score -= 15;
    issues.push({
      title: "Missing page title",
      description: "Your page doesn't have a title tag. This is the first thing people see in search results — without it, Google has to guess what your page is about, and it rarely guesses well.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Add a compelling page title",
      description: "Write a clear, keyword-rich title (30-65 characters) that tells both search engines and visitors exactly what your page offers.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
  } else if (title.length < 30 || title.length > 65) {
    score -= 5;
    issues.push({
      title: "Page title length could be improved",
      description: `Your title is ${title.length} characters. Search engines display 30-65 characters most effectively — too short and you miss keyword opportunities, too long and it gets cut off in results.`,
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Well-crafted page title",
      description: `Your page title is ${title.length} characters — right in the sweet spot for search engine display.`,
      severity: "positive",
      category: cat,
    });
  }

  // Meta description
  const metaDesc = $('meta[name="description"]').attr("content")?.trim() || "";
  if (!metaDesc) {
    score -= 15;
    issues.push({
      title: "Missing meta description",
      description: "There's no meta description on your page. This is the preview text shown in search results — without it, Google pulls random text from your page, which rarely sells your business well.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Write a compelling meta description",
      description: "Craft a 120-160 character description that summarizes your offer and encourages clicks from search results.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
  } else if (metaDesc.length < 120 || metaDesc.length > 160) {
    score -= 5;
    issues.push({
      title: "Meta description length could be optimized",
      description: `Your meta description is ${metaDesc.length} characters. The ideal range is 120-160 characters to maximize visibility in search results without getting cut off.`,
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Good meta description",
      description: "Your meta description is the right length and gives search engines a solid preview of your page.",
      severity: "positive",
      category: cat,
    });
  }

  // Viewport
  const viewport = $('meta[name="viewport"]').attr("content") || "";
  if (!viewport) {
    score -= 10;
    issues.push({
      title: "Missing viewport configuration",
      description: "Your page doesn't tell mobile browsers how to scale content. Without this, your site may appear zoomed out or broken on phones, and Google penalizes sites that aren't mobile-friendly.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
  }

  // Canonical
  const canonical = $('link[rel="canonical"]').attr("href") || "";
  if (!canonical) {
    score -= 5;
    issues.push({
      title: "No canonical URL set",
      description: "Without a canonical tag, search engines might index duplicate versions of your page (www vs non-www, with tracking parameters, etc.), potentially diluting your search rankings.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Add a canonical URL tag",
      description: "A canonical tag tells search engines which version of your page is the 'official' one, consolidating ranking signals.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Canonical URL defined",
      description: "Your page properly identifies its canonical URL, helping search engines avoid indexing duplicates.",
      severity: "positive",
      category: cat,
    });
  }

  // H1
  const h1s = $("h1");
  if (h1s.length === 0) {
    score -= 10;
    issues.push({
      title: "Missing primary headline",
      description: "Your homepage is missing a primary headline (H1). This makes it harder for search engines and visitors to instantly understand your main offer or value proposition.",
      severity: "critical",
      effort: "quick",
      category: cat,
    });
  } else if (h1s.length > 1) {
    score -= 10;
    issues.push({
      title: "Multiple primary headlines",
      description: `Your page has ${h1s.length} H1 headings. Best practice is to have exactly one, clearly stating your main message. Multiple H1s dilute your focus and confuse search engines about your primary topic.`,
      severity: "important",
      effort: "quick",
      category: cat,
    });
  } else {
    const h1Text = h1s.first().text().trim();
    if (h1Text) {
      strengths.push({
        title: "Clear primary headline",
        description: "Your page has a single, clear H1 headline that helps search engines and visitors understand your main message.",
        severity: "positive",
        category: cat,
      });
    }
  }

  // Heading hierarchy
  const h2Count = $("h2").length;
  const h3Count = $("h3").length;
  if (h1s.length > 0 && h2Count === 0 && h3Count === 0) {
    score -= 5;
    issues.push({
      title: "Flat heading structure",
      description: "Your page only uses H1 headings without H2 or H3 subheadings. A logical heading hierarchy helps search engines understand your content structure and can improve rankings.",
      severity: "minor",
      effort: "moderate",
      category: cat,
    });
  }

  // Image alt text
  const images = $("img");
  const imgCount = images.length;
  if (imgCount > 0) {
    const withAlt = images.filter(function (_i, el) {
      const alt = $(el).attr("alt");
      return !!alt && alt.trim().length > 0;
    });
    const altPercent = Math.round((withAlt.length / imgCount) * 100);
    if (altPercent < 50) {
      score -= 10;
      issues.push({
        title: "Most images appear to lack descriptive text",
        description: `Only ${altPercent}% of your images have alt text based on our scan. Search engines rely on alt text to understand images — missing it means missed keyword opportunities and reduced accessibility.`,
        severity: "important",
        effort: "moderate",
        category: cat,
      });
    } else if (altPercent >= 80) {
      strengths.push({
        title: "Strong image alt text coverage",
        description: `${altPercent}% of your images have descriptive alt text, helping search engines understand your visual content.`,
        severity: "positive",
        category: cat,
      });
    }
  }

  // Schema / structured data
  const schema = $('script[type="application/ld+json"]');
  if (schema.length === 0) {
    score -= 10;
    issues.push({
      title: "No structured data detected",
      description: "We didn't detect Schema.org markup on this page. Adding basic structured data can help search engines understand your business and improve search visibility with rich snippets.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
    quickWins.push({
      title: "Add structured data markup",
      description: "Implementing basic Schema.org markup (LocalBusiness, Organization, or Service) can help you stand out in search results with rich snippets.",
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Structured data present",
      description: "Your page includes Schema.org structured data, giving search engines rich context about your business.",
      severity: "positive",
      category: cat,
    });
  }

  // Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr("content") || "";
  const ogDesc = $('meta[property="og:description"]').attr("content") || "";
  if (!ogTitle && !ogDesc) {
    score -= 5;
    issues.push({
      title: "Missing social media preview tags",
      description: "Your page doesn't have Open Graph tags. When someone shares your link on Facebook, LinkedIn, or Slack, it won't display an optimized preview — likely just a plain URL or random text.",
      severity: "minor",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Social sharing optimized",
      description: "Your page includes Open Graph tags, so it displays well when shared on social media platforms.",
      severity: "positive",
      category: cat,
    });
  }

  // Internal links
  const internalLinks = $('a[href^="/"], a[href^="' + input.url + '"]');
  if (internalLinks.length < 3) {
    issues.push({
      title: "Few internal links",
      description: "Your page has very few internal links. Linking to other pages on your site helps search engines discover and rank more of your content, and keeps visitors engaged longer.",
      severity: "minor",
      effort: "moderate",
      category: cat,
    });
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    label: "SEO",
    summary: "",
    strengths,
    issues,
    quickWins,
  };
}
