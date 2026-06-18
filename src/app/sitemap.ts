import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { comparisons } from "@/lib/comparisons";
import { industrySlugs } from "@/lib/industries";
import { allGeoPages, geoPagePath, SITE_URL } from "@/lib/geo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/resources`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/tools/website-cost-calculator`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/services/digital-marketing`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${SITE_URL}/seo`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE_URL}/partners`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Case study pages
  const caseStudies = ["autofivestar", "create3dparts", "leadsandsaas", "speedway", "atlas-freight", "voltgrid"].map(
    (slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  // Blog posts
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Comparison pages
  const comparePages = comparisons.map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Industry pages
  const industryPages = [
    { url: `${SITE_URL}/industries`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    ...industrySlugs.map((slug) => ({
      url: `${SITE_URL}/industries/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  // GEO programmatic pages — /seo/{city}/{service}
  const geoPages = allGeoPages().map(({ citySlug, serviceSlug }) => ({
    url: `${SITE_URL}${geoPagePath(citySlug, serviceSlug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // De-duplicate by URL just in case (no localhost or preview URLs because SITE_URL is hard-coded).
  const all = [...staticPages, ...caseStudies, ...posts, ...comparePages, ...industryPages, ...geoPages];
  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
