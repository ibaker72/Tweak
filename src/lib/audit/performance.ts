import * as cheerio from "cheerio";
import type { AuditInput, CategoryResult, FindingItem } from "./types";

export function analyzePerformance(input: AuditInput): CategoryResult {
  const $ = cheerio.load(input.html);
  const strengths: FindingItem[] = [];
  const issues: FindingItem[] = [];
  const quickWins: FindingItem[] = [];
  let score = 100;
  const cat = "performance";

  // HTML size
  const htmlKB = input.pageSize / 1024;
  if (htmlKB > 200) {
    score -= 10;
    issues.push({
      title: "Large page size",
      description: `Your page weighs in at ${Math.round(htmlKB)}KB of HTML alone. Lighter pages load faster, especially on mobile connections, keeping visitors from bouncing before they see your content.`,
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Lean page size",
      description: `Your page HTML is a manageable ${Math.round(htmlKB)}KB, which helps it load quickly for visitors on any connection.`,
      severity: "positive",
      category: cat,
    });
  }

  // External scripts
  const scripts = $('script[src]');
  const scriptCount = scripts.length;
  if (scriptCount > 10) {
    score -= 10;
    issues.push({
      title: "Too many external scripts",
      description: `Your page loads ${scriptCount} external scripts. Each one adds a network request that slows things down. Consolidating or deferring scripts would help your page load noticeably faster.`,
      severity: "important",
      effort: "moderate",
      category: cat,
    });
  } else if (scriptCount <= 5) {
    strengths.push({
      title: "Minimal script overhead",
      description: `With only ${scriptCount} external scripts, your page avoids the bloat that slows many websites down.`,
      severity: "positive",
      category: cat,
    });
  }

  // Stylesheets
  const stylesheets = $('link[rel="stylesheet"]');
  const sheetCount = stylesheets.length;
  if (sheetCount > 5) {
    score -= 5;
    issues.push({
      title: "Multiple render-blocking stylesheets",
      description: `Your page loads ${sheetCount} separate stylesheets. Browsers wait for these before showing any content, so combining them would help your page appear faster.`,
      severity: "minor",
      effort: "moderate",
      category: cat,
    });
  }

  // Images + lazy loading
  const images = $("img");
  const imgCount = images.length;
  const lazyImages = images.filter('[loading="lazy"]');
  const lazyCount = lazyImages.length;

  if (imgCount > 0 && lazyCount === 0) {
    score -= 10;
    issues.push({
      title: "No lazy loading on images",
      description: "All your images load at once when someone visits the page, even images below the fold they can't see yet. Adding lazy loading means images load as visitors scroll, making the initial page appear much faster.",
      severity: "important",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Add lazy loading to below-fold images",
      description: 'A simple attribute (loading="lazy") on images below the first screen can cut initial load time significantly.',
      severity: "important",
      effort: "quick",
      category: cat,
    });
  } else if (imgCount > 0 && lazyCount > 0) {
    strengths.push({
      title: "Lazy loading enabled",
      description: "Your images load on demand as visitors scroll, keeping initial page load fast.",
      severity: "positive",
      category: cat,
    });
  }

  // Images with dimensions
  if (imgCount > 0) {
    const withDimensions = images.filter("[width][height]");
    if (withDimensions.length < imgCount / 2) {
      score -= 5;
      issues.push({
        title: "Images missing explicit dimensions",
        description: "Many images lack width and height attributes. Without them, the page layout jumps around as images load, creating a jarring experience for visitors.",
        severity: "minor",
        effort: "quick",
        category: cat,
      });
      quickWins.push({
        title: "Add width and height to images",
        description: "Setting explicit dimensions prevents layout shifts, making the page feel smoother and more professional as it loads.",
        severity: "minor",
        effort: "quick",
        category: cat,
      });
    }
  }

  // Load time
  const loadSec = input.loadTimeMs / 1000;
  if (loadSec > 5) {
    score -= 25;
    issues.push({
      title: "Very slow response time",
      description: `Your server took ${loadSec.toFixed(1)} seconds to respond. Most visitors will leave if a page takes more than 3 seconds, so this is likely costing you traffic and potential leads.`,
      severity: "critical",
      effort: "strategic",
      category: cat,
    });
  } else if (loadSec > 3) {
    score -= 15;
    issues.push({
      title: "Slow response time",
      description: `Your server took ${loadSec.toFixed(1)} seconds to respond. Visitors expect pages to load in under 3 seconds — any longer and many will leave before seeing your content.`,
      severity: "important",
      effort: "strategic",
      category: cat,
    });
  } else if (loadSec < 1.5) {
    strengths.push({
      title: "Fast server response",
      description: `Your server responded in ${loadSec.toFixed(1)} seconds, which means visitors see your content quickly.`,
      severity: "positive",
      category: cat,
    });
  }

  // Compression
  const encoding = input.headers["content-encoding"] || "";
  if (!encoding.includes("gzip") && !encoding.includes("br")) {
    score -= 10;
    issues.push({
      title: "No compression enabled",
      description: "Your server isn't compressing content before sending it. Enabling gzip or Brotli compression can reduce page size by 60-80%, making everything load significantly faster.",
      severity: "important",
      effort: "quick",
      category: cat,
    });
    quickWins.push({
      title: "Enable server compression",
      description: "Turning on gzip or Brotli compression is one of the fastest performance wins — it dramatically reduces the amount of data visitors need to download.",
      severity: "important",
      effort: "quick",
      category: cat,
    });
  } else {
    strengths.push({
      title: "Compression enabled",
      description: "Your server compresses content before sending it, helping pages load faster for all visitors.",
      severity: "positive",
      category: cat,
    });
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    label: "Performance",
    summary: "",
    strengths,
    issues,
    quickWins,
  };
}
