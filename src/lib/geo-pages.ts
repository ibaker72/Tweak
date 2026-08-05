/**
 * Geo Pages — North Jersey city × service landing-page system.
 *
 * Generates 20 cities × 8 services = 160 unique landing pages under
 * /seo/{city}/{service}. Designed to:
 *   - Avoid doorway-page spam (every page has unique local + service content)
 *   - Build strong internal linking (related cities + related services per page)
 *   - Stay production-safe (no fabricated addresses, reviews, or rankings)
 *   - Optimize for both classic search and generative engines (ChatGPT, Claude,
 *     Perplexity, Gemini, Google AI Overviews)
 *
 * Tweak & Build is a service-area business — we do NOT advertise a physical
 * storefront. Local context uses real, verifiable landmarks only.
 */

export const SITE_URL = "https://tweakandbuild.com";
export const STATE_CODE = "NJ";
export const STATE_NAME = "New Jersey";
export const REGION_NAME = "North Jersey";
export const ORG_NAME = "Tweak & Build";

// ─────────────────────────────────────────────────────────────────────────────
// City data
// ─────────────────────────────────────────────────────────────────────────────

export interface GeoCity {
  /** URL slug, e.g. "paterson" */
  slug: string;
  /** Display name, e.g. "Paterson" */
  name: string;
  /** County the city belongs to */
  county: string;
  /** Approximate population (rounded; for context only) */
  population?: string;
  /** One-sentence positioning describing the local business landscape */
  blurb: string;
  /** Real, verifiable landmarks used for GEO local color (no fabrication) */
  landmarks: string[];
  /** Industries that have a meaningful presence locally */
  businessContext: string[];
  /** Common ZIP code prefixes — used only to anchor regional context */
  zips: string[];
  /** Slugs of geographically nearby cities for internal linking */
  neighbors: string[];
}

export const GEO_CITIES: GeoCity[] = [
  {
    slug: "paterson",
    name: "Paterson",
    county: "Passaic",
    population: "~160,000",
    blurb:
      "Paterson is the third-largest city in New Jersey and the Passaic County seat, with a dense small-business economy spanning retail, healthcare, professional services, and trades.",
    landmarks: [
      "Great Falls National Historical Park",
      "Lambert Castle",
      "Eastside Park",
      "Paterson Museum",
    ],
    businessContext: ["retail", "healthcare", "auto", "restaurants", "trades", "professional services"],
    zips: ["07501", "07502", "07503", "07504", "07505", "07513", "07514", "07522"],
    neighbors: ["clifton", "haledon", "totowa", "fair-lawn", "passaic"],
  },
  {
    slug: "clifton",
    name: "Clifton",
    county: "Passaic",
    population: "~90,000",
    blurb:
      "Clifton is a major Passaic County commercial corridor with strong retail, light manufacturing, and a diverse local services economy along Route 3 and Route 46.",
    landmarks: [
      "Main Memorial Park",
      "Clifton Commons",
      "Botany Village",
      "Allwood Circle",
    ],
    businessContext: ["retail", "light manufacturing", "auto dealerships", "medical practices", "restaurants"],
    zips: ["07011", "07012", "07013", "07014"],
    neighbors: ["paterson", "passaic", "nutley", "little-falls", "wayne"],
  },
  {
    slug: "wayne",
    name: "Wayne",
    county: "Passaic",
    population: "~55,000",
    blurb:
      "Wayne is a Passaic County suburb anchored by Willowbrook Mall and William Paterson University, with strong retail, professional services, and home-services demand.",
    landmarks: [
      "Willowbrook Mall",
      "William Paterson University",
      "Wayne Towne Center",
      "Dey Mansion",
    ],
    businessContext: ["retail", "education", "professional services", "home services", "restaurants"],
    zips: ["07470", "07474"],
    neighbors: ["totowa", "fair-lawn", "haledon", "north-haledon", "little-falls"],
  },
  {
    slug: "fair-lawn",
    name: "Fair Lawn",
    county: "Bergen",
    population: "~35,000",
    blurb:
      "Fair Lawn is a family-focused Bergen County borough with a stable mix of small retail, dental and medical offices, and trades along the Broadway corridor.",
    landmarks: [
      "Memorial Pool",
      "Fair Lawn Avenue commercial district",
      "Borg's Woods",
    ],
    businessContext: ["dental", "medical", "retail", "professional services", "home services"],
    zips: ["07410"],
    neighbors: ["paterson", "elmwood-park", "paramus", "garfield", "haledon"],
  },
  {
    slug: "totowa",
    name: "Totowa",
    county: "Passaic",
    population: "~11,000",
    blurb:
      "Totowa is a Passaic County borough with a heavy industrial-park footprint, distribution and B2B services, plus retail along Route 46.",
    landmarks: [
      "Totowa Industrial Park",
      "Riverview Drive corridor",
      "Wells Fargo office park",
    ],
    businessContext: ["B2B services", "distribution", "light industrial", "auto", "professional services"],
    zips: ["07512"],
    neighbors: ["wayne", "paterson", "little-falls", "woodland-park", "haledon"],
  },
  {
    slug: "haledon",
    name: "Haledon",
    county: "Passaic",
    population: "~8,500",
    blurb:
      "Haledon is a compact Passaic County borough with a tight-knit small-business community of family restaurants, salons, and trades serving Paterson's northern edge.",
    landmarks: [
      "American Labor Museum (Botto House)",
      "Belmont Avenue corridor",
    ],
    businessContext: ["family restaurants", "salons", "trades", "retail"],
    zips: ["07508"],
    neighbors: ["paterson", "north-haledon", "totowa", "wayne", "fair-lawn"],
  },
  {
    slug: "north-haledon",
    name: "North Haledon",
    county: "Passaic",
    population: "~8,500",
    blurb:
      "North Haledon is a quiet Passaic County suburb adjacent to High Mountain Park Preserve, with strong demand for home-improvement, dental, and professional services.",
    landmarks: [
      "High Mountain Park Preserve",
      "Manchester Regional High School",
    ],
    businessContext: ["home services", "dental", "professional services", "real estate"],
    zips: ["07508"],
    neighbors: ["haledon", "wayne", "paterson", "totowa", "fair-lawn"],
  },
  {
    slug: "paramus",
    name: "Paramus",
    county: "Bergen",
    population: "~26,000",
    blurb:
      "Paramus is the retail capital of New Jersey, home to four major malls along the Route 17 corridor and one of the densest commercial markets in the Northeast.",
    landmarks: [
      "Westfield Garden State Plaza",
      "Bergen Town Center",
      "Paramus Park",
      "The Outlets at Bergen Town Center",
    ],
    businessContext: ["retail", "auto dealerships", "restaurants", "medical practices", "professional services"],
    zips: ["07652"],
    neighbors: ["hackensack", "fair-lawn", "elmwood-park", "garfield"],
  },
  {
    slug: "hackensack",
    name: "Hackensack",
    county: "Bergen",
    population: "~46,000",
    blurb:
      "Hackensack is the Bergen County seat with a major healthcare anchor (Hackensack University Medical Center), legal, government, and downtown professional services.",
    landmarks: [
      "Hackensack University Medical Center",
      "Bergen County Courthouse",
      "USS Ling Submarine (New Jersey Naval Museum site)",
      "Main Street downtown",
    ],
    businessContext: ["healthcare", "legal", "professional services", "restaurants", "retail"],
    zips: ["07601", "07602"],
    neighbors: ["paramus", "garfield", "fair-lawn", "elmwood-park"],
  },
  {
    slug: "garfield",
    name: "Garfield",
    county: "Bergen",
    population: "~32,000",
    blurb:
      "Garfield is a dense Bergen County city along the Passaic River with a mixed industrial, retail, and tradespeople economy.",
    landmarks: [
      "Passaic River waterfront",
      "Outwater Lane corridor",
    ],
    businessContext: ["trades", "auto", "retail", "restaurants", "light industrial"],
    zips: ["07026"],
    neighbors: ["passaic", "elmwood-park", "fair-lawn", "hackensack", "clifton"],
  },
  {
    slug: "elmwood-park",
    name: "Elmwood Park",
    county: "Bergen",
    population: "~21,000",
    blurb:
      "Elmwood Park is a Bergen County borough with a stable small-business mix of auto repair, restaurants, professional services, and home-services trades.",
    landmarks: [
      "Saddle River County Park",
      "Market Street commercial corridor",
    ],
    businessContext: ["auto", "restaurants", "home services", "professional services"],
    zips: ["07407"],
    neighbors: ["garfield", "fair-lawn", "paramus", "hackensack", "paterson"],
  },
  {
    slug: "little-falls",
    name: "Little Falls",
    county: "Passaic",
    population: "~14,500",
    blurb:
      "Little Falls is a residential Passaic County township anchored by Montclair State University's main campus footprint and Great Notch business activity.",
    landmarks: [
      "Montclair State University (Great Notch campus area)",
      "Great Notch Park",
    ],
    businessContext: ["education-adjacent", "professional services", "home services", "restaurants"],
    zips: ["07424"],
    neighbors: ["totowa", "woodland-park", "clifton", "wayne", "montclair"],
  },
  {
    slug: "woodland-park",
    name: "Woodland Park",
    county: "Passaic",
    population: "~13,000",
    blurb:
      "Woodland Park is a Passaic County borough at the foot of Garret Mountain, with strong demand for trades, restaurants, and home-improvement services.",
    landmarks: [
      "Garret Mountain Reservation",
      "Rifle Camp Park",
    ],
    businessContext: ["home services", "trades", "restaurants", "auto"],
    zips: ["07424"],
    neighbors: ["totowa", "little-falls", "clifton", "wayne", "paterson"],
  },
  {
    slug: "passaic",
    name: "Passaic",
    county: "Passaic",
    population: "~70,000",
    blurb:
      "Passaic is a dense, diverse city along the Passaic River with a high concentration of independent retailers, family restaurants, and tradespeople serving local immigrant business owners.",
    landmarks: [
      "Main Avenue commercial district",
      "Third Ward Park",
      "Passaic River waterfront",
    ],
    businessContext: ["independent retail", "family restaurants", "trades", "auto", "professional services"],
    zips: ["07055"],
    neighbors: ["clifton", "garfield", "paterson", "nutley", "fair-lawn"],
  },
  {
    slug: "bloomfield",
    name: "Bloomfield",
    county: "Essex",
    population: "~53,000",
    blurb:
      "Bloomfield is an Essex County township with a walkable downtown (Bloomfield Center), strong retail, professional services, and an active independent restaurant scene.",
    landmarks: [
      "Bloomfield Center / Bloomfield Green",
      "Watsessing Park",
      "Brookdale Park (shared with Montclair)",
    ],
    businessContext: ["retail", "restaurants", "professional services", "dental", "real estate"],
    zips: ["07003"],
    neighbors: ["nutley", "montclair", "newark", "clifton"],
  },
  {
    slug: "nutley",
    name: "Nutley",
    county: "Essex",
    population: "~30,000",
    blurb:
      "Nutley is an Essex County township with a tight downtown business district along Franklin and Centre, strong in trades, dental, family medicine, and restaurants.",
    landmarks: [
      "Franklin Avenue downtown",
      "Memorial Park",
      "Yantacaw Park",
    ],
    businessContext: ["dental", "medical", "trades", "restaurants", "professional services"],
    zips: ["07110"],
    neighbors: ["bloomfield", "clifton", "passaic", "montclair", "newark"],
  },
  {
    slug: "montclair",
    name: "Montclair",
    county: "Essex",
    population: "~41,000",
    blurb:
      "Montclair is an Essex County township known for an arts and dining scene, indie retail along Bloomfield Avenue and Upper Montclair, and design-aware service businesses.",
    landmarks: [
      "Montclair Art Museum",
      "Wellmont Theater",
      "Bloomfield Avenue corridor",
      "Upper Montclair business district",
    ],
    businessContext: ["arts", "restaurants", "indie retail", "professional services", "real estate", "wellness"],
    zips: ["07042", "07043"],
    neighbors: ["bloomfield", "nutley", "little-falls", "clifton"],
  },
  {
    slug: "morristown",
    name: "Morristown",
    county: "Morris",
    population: "~20,000",
    blurb:
      "Morristown is the Morris County seat and a regional finance, legal, and healthcare hub anchored by Morristown Medical Center and the Morristown Green.",
    landmarks: [
      "Morristown National Historical Park",
      "The Morristown Green",
      "Morristown Medical Center",
      "South Street commercial district",
    ],
    businessContext: ["finance", "legal", "healthcare", "restaurants", "professional services"],
    zips: ["07960", "07963"],
    neighbors: [],
  },
  {
    slug: "jersey-city",
    name: "Jersey City",
    county: "Hudson",
    population: "~290,000",
    blurb:
      "Jersey City is the second-largest city in New Jersey and a major finance, tech, and waterfront real-estate market with dense small-business density across Downtown, Journal Square, and the Heights.",
    landmarks: [
      "Liberty State Park",
      "Exchange Place waterfront",
      "Journal Square",
      "Newport",
      "The Heights",
    ],
    businessContext: ["finance", "tech startups", "restaurants", "real estate", "professional services", "retail"],
    zips: ["07302", "07304", "07305", "07306", "07307", "07310"],
    neighbors: ["newark"],
  },
  {
    slug: "newark",
    name: "Newark",
    county: "Essex",
    population: "~310,000",
    blurb:
      "Newark is the largest city in New Jersey, anchored by Newark Liberty International Airport, the Prudential Center, and major higher-education and healthcare institutions.",
    landmarks: [
      "Newark Liberty International Airport",
      "Prudential Center",
      "Newark Museum of Art",
      "Branch Brook Park",
      "Ironbound district",
    ],
    businessContext: ["restaurants (Ironbound)", "logistics", "healthcare", "professional services", "retail", "trades"],
    zips: ["07101", "07102", "07103", "07104", "07105", "07106", "07107", "07108", "07112"],
    neighbors: ["jersey-city", "bloomfield", "nutley"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Service data
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceCategory =
  | "design"
  | "seo"
  | "gbp"
  | "leads"
  | "crm"
  | "ai"
  | "dev";

export interface GeoService {
  /** URL slug, e.g. "web-design" */
  slug: string;
  /** Display name */
  name: string;
  /** Short name (used in lists) */
  shortName: string;
  /** Category — used for grouping in the GEO hub */
  category: ServiceCategory;
  /** Used in meta description templates */
  metaTagline: string;
  /** 2-3 sentence overview */
  intro: string;
  /** Why local businesses in NJ need this service */
  whyLocal: string;
  /** Problems this service solves */
  problemsSolved: string[];
  /** What we deliver in this engagement */
  deliverables: string[];
  /** Business benefits */
  benefits: string[];
  /** The Tweak & Build process for this service */
  process: { title: string; description: string }[];
  /** FAQ — use {city} placeholders that get replaced at render */
  faqs: { q: string; a: string }[];
  /** Slugs of related services for internal linking */
  related: string[];
}

export const GEO_SERVICES: GeoService[] = [
  {
    slug: "web-design",
    name: "Web Design",
    shortName: "Web Design",
    category: "design",
    metaTagline: "Fast, conversion-focused websites for local businesses",
    intro:
      "We design and build modern, conversion-focused websites that turn local search traffic into booked calls, signed quotes, and walk-ins. Every site is built on Next.js, hits 90+ Lighthouse scores, and is structured for both Google search and AI-engine citations.",
    whyLocal:
      "Most local businesses still run on outdated WordPress themes, page builders, or one-page sites that are slow on mobile, hard to update, and invisible in local search. A well-designed local website is the cheapest, longest-lasting marketing asset a business can own.",
    problemsSolved: [
      "Slow load times on mobile killing conversion",
      "No clear lead-capture path — visitors leave without converting",
      "Outdated branding signaling an outdated business",
      "Generic stock photography that erodes trust",
      "Pages buried 3-4 clicks deep from the home page",
      "No structured data, so Google can't surface your services in local results",
    ],
    deliverables: [
      "Custom-designed home, services, about, and contact pages",
      "Mobile-first responsive layout (designed for the phone first)",
      "Sub-2-second load times on 4G mobile",
      "Lead-capture forms wired to email and CRM",
      "Google Business Profile alignment (NAP consistency)",
      "Schema markup (LocalBusiness, Service, FAQ)",
      "Editable content blocks or CMS for non-technical updates",
      "Analytics + conversion tracking",
    ],
    benefits: [
      "More inbound leads from local search",
      "Higher conversion rate from existing traffic",
      "A website your team can actually update",
      "Faster page loads → better Google rankings",
      "AI-engine ready (ChatGPT, Perplexity, Gemini, Claude)",
    ],
    process: [
      { title: "Discovery", description: "We audit your current site, competitors, and local search landscape. 30-minute call." },
      { title: "Strategy", description: "Sitemap, key page goals, lead-capture plan, and content priorities." },
      { title: "Design", description: "Component-driven design system. You see real pages, not throwaway mockups." },
      { title: "Build", description: "Next.js + Tailwind on Vercel. Fast, accessible, SEO-ready by default." },
      { title: "Launch", description: "DNS cutover, redirects, Search Console submission, and analytics verification." },
      { title: "Iterate", description: "Optional retainer for A/B tests, SEO content, and conversion improvements." },
    ],
    faqs: [
      {
        q: "How much does a website cost in {city}, NJ?",
        a: "It depends on scope — page count, functionality, integrations, content, and how competitive your {city} market is. Every project is custom scoped, and we send a fixed quote within 24 hours — no hourly billing. Our website planning calculator can show you a rough investment level in about two minutes.",
      },
      {
        q: "How long does a {city} website take to build?",
        a: "Typical timeline is 3 to 6 weeks from kickoff to launch. Landing pages and focused redesigns can ship in under 2 weeks.",
      },
      {
        q: "Do you handle local SEO for {city} businesses?",
        a: "Yes. Local schema, Google Business Profile alignment, location-aware service pages, and AI-citation-ready content are built in by default.",
      },
      {
        q: "Will the site work on phones used by {city} customers?",
        a: "Mobile-first is non-negotiable. Over 70% of local searches in {city} happen on mobile, so every layout is designed for the phone first and scaled up.",
      },
      {
        q: "Can I update the website myself after launch?",
        a: "Yes. We hand off either a lightweight CMS or a clean component library so your team can update copy, images, and services without a developer.",
      },
      {
        q: "Do you work with businesses outside {city}?",
        a: "Yes. We're a service-area studio covering all of North Jersey — {neighborList} — and remote clients across the U.S.",
      },
    ],
    related: ["website-redesign", "local-seo", "lead-generation", "google-business-profile-optimization"],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    shortName: "Redesign",
    category: "design",
    metaTagline: "Modernize your existing site without throwing it away",
    intro:
      "Most local business sites don't need a full rebuild — they need a focused redesign that fixes the conversion leaks, modernizes the look, and ships in weeks instead of months. We rebuild your highest-impact pages first, keep what's working, and migrate cleanly.",
    whyLocal:
      "A 5-year-old site doesn't just look dated — it's measurably slower, less mobile-friendly, and ranks worse than a modern competitor's. For most {county} County businesses, the cost of staying on the old site is bigger than the cost of redesigning.",
    problemsSolved: [
      "Site looks dated next to competitors",
      "Conversion rate has plateaued or dropped",
      "Mobile speed score under 50 on PageSpeed Insights",
      "Page builders making content updates painful",
      "No clear visual hierarchy guiding users to convert",
      "Brand has evolved past what the site shows",
    ],
    deliverables: [
      "Conversion audit of every key page",
      "Modern design system aligned to your brand",
      "Rebuilt home, services, and contact pages",
      "Migrated and cleaned-up content",
      "301 redirects from every old URL to its new counterpart",
      "Performance + Core Web Vitals fixes",
      "Structured data and metadata audit",
    ],
    benefits: [
      "A site that feels current next to competitors",
      "Higher mobile conversion rate",
      "Faster page loads improving Google rankings",
      "Clean redirects preserve existing SEO equity",
    ],
    process: [
      { title: "Conversion audit", description: "We diagnose what's costing leads page-by-page. You get a written report." },
      { title: "Redesign scope", description: "We agree on which pages to redesign first based on traffic and impact." },
      { title: "Design + build", description: "New design system implemented in Next.js, tested against the old site." },
      { title: "Migration", description: "Content migrated, redirects mapped, Search Console updated." },
      { title: "Launch + measure", description: "We compare conversion and Core Web Vitals against the prior site." },
    ],
    faqs: [
      {
        q: "Can you redesign my site without losing my {city} Google rankings?",
        a: "Yes. We map every existing URL to its new counterpart with 301 redirects, preserve metadata, and submit the updated sitemap so rankings transfer cleanly.",
      },
      {
        q: "Do I have to redesign every page?",
        a: "No. Most {city} businesses get the biggest impact from redesigning the home, services, and contact pages first. We scope to budget and impact.",
      },
      {
        q: "How fast can a redesign launch?",
        a: "Focused redesigns ship in 2 to 4 weeks. Full multi-page redesigns typically take 3 to 6 weeks.",
      },
      {
        q: "Will my content survive the redesign?",
        a: "Yes. We migrate all existing copy, images, and reviews — and refresh anything that's stale during the process.",
      },
      {
        q: "What if I want to stay on WordPress?",
        a: "We can rebuild within WordPress (custom theme, no page builder) when an internal team needs to keep editing in WordPress. Otherwise we'll move to Next.js for speed and SEO.",
      },
    ],
    related: ["web-design", "local-seo", "lead-generation", "google-business-profile-optimization"],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    shortName: "Local SEO",
    category: "seo",
    metaTagline: "Rank for high-intent local searches in your service area",
    intro:
      "Local SEO is how your business shows up when someone in your service area searches '[your service] near me' or '[your service] in [your city]'. We audit, optimize, and continuously improve the technical and content signals that drive those rankings.",
    whyLocal:
      "Over 70% of local-intent searches happen on mobile, and the top three local pack results capture the majority of clicks. If your site, Google Business Profile, and citations aren't optimized for the searches your customers actually run, the leads go to competitors.",
    problemsSolved: [
      "Not appearing in the Google Local Pack",
      "Site pages not ranking for high-intent local queries",
      "Inconsistent NAP (name, address, phone) across directories",
      "Missing or weak LocalBusiness and Service schema markup",
      "Thin or duplicate service-area pages",
      "Slow Core Web Vitals dragging rankings down",
    ],
    deliverables: [
      "Full local-SEO audit (technical + on-page + GBP + citations)",
      "Optimized LocalBusiness, Service, and FAQ schema markup",
      "Location-aware service pages for each city served",
      "Citation cleanup across major directories",
      "Internal-linking plan to consolidate ranking signals",
      "Core Web Vitals fixes prioritized by impact",
      "Monthly reporting on rankings, traffic, and conversions",
    ],
    benefits: [
      "More inbound calls and form fills from local search",
      "Higher placement in the Google Local Pack",
      "Defensible long-term traffic that doesn't disappear when ads stop",
      "Better visibility in AI-driven search answers",
    ],
    process: [
      { title: "Audit", description: "Technical SEO, on-page content, Google Business Profile, and citations." },
      { title: "Priorities", description: "Ranked list of fixes by impact and difficulty." },
      { title: "Implement", description: "Schema, page rewrites, citation cleanup, Core Web Vitals." },
      { title: "Build content", description: "City + service pages, FAQ blocks, and internal links." },
      { title: "Measure", description: "Monthly rankings, traffic, and conversion reporting." },
    ],
    faqs: [
      {
        q: "How long does local SEO take to show results in {city}?",
        a: "Most {city} businesses see meaningful Local Pack movement in 60 to 120 days. Technical fixes and Google Business Profile optimization can shift rankings within the first 30 days.",
      },
      {
        q: "Will you fix my Google Business Profile too?",
        a: "Yes. We treat GBP, your website, and citations as a single ranking system. Optimizing one without the others leaves results on the table.",
      },
      {
        q: "Do I need a separate page for each city I serve?",
        a: "Yes — but only if those pages are genuinely useful and unique. We build city-level service pages with real local context, not duplicated doorway pages.",
      },
      {
        q: "Can you guarantee a #1 ranking in {city}?",
        a: "No reputable SEO can guarantee a specific Google ranking — and anyone who does is selling you something. We can guarantee a measurable, defensible improvement over time.",
      },
      {
        q: "What does ongoing local SEO cost?",
        a: "Local SEO engagements are scoped around your market competition, service-area coverage, and content cadence — then billed as a flat monthly rate you approve upfront. One-time audits and technical fixes are scoped per project.",
      },
    ],
    related: ["google-business-profile-optimization", "web-design", "lead-generation", "website-redesign"],
  },
  {
    slug: "google-business-profile-optimization",
    name: "Google Business Profile Optimization",
    shortName: "GBP Optimization",
    category: "gbp",
    metaTagline: "Make your Google Business Profile work as hard as your website",
    intro:
      "Your Google Business Profile is the most important free local-marketing asset you own. We optimize it the same way we optimize a high-converting website: category targeting, photos, services, posts, Q&A, reviews, and tracking.",
    whyLocal:
      "For most local searches in {county} County, the Google Local Pack drives more clicks and calls than the entire organic search results page. A profile that's filled out 60% leaves the majority of that traffic on the table.",
    problemsSolved: [
      "Underused primary and secondary GBP categories",
      "Missing or thin services list",
      "Stale or low-quality photo set",
      "No weekly GBP posts driving freshness signals",
      "Unanswered customer questions in the Q&A section",
      "No review-response cadence (or generic responses)",
      "Inconsistent NAP across web, GBP, and citations",
    ],
    deliverables: [
      "Primary + secondary category strategy",
      "Full services list with descriptions",
      "Optimized business description (within Google's 750-char limit)",
      "Curated photo + video upload plan",
      "Weekly GBP post drafts (we can generate these via cron)",
      "Q&A seeding for common customer questions",
      "Review-response templates by sentiment",
      "Call + click tracking via UTM parameters",
    ],
    benefits: [
      "More clicks and calls from the Local Pack",
      "Higher conversion rate on profile views",
      "Steady stream of weekly posts without manual effort",
      "Better signals to Google that the business is active",
    ],
    process: [
      { title: "Audit", description: "Profile completeness, category fit, photo quality, post cadence, review handling." },
      { title: "Optimize", description: "Categories, services, description, photos, and tracking." },
      { title: "Automate", description: "Weekly GBP post drafts and review-response templates." },
      { title: "Measure", description: "Profile views, calls, direction requests, and website clicks." },
    ],
    faqs: [
      {
        q: "Can you manage my Google Business Profile from end to end?",
        a: "Yes. We can run it as a managed service — weekly posts, review responses, Q&A monitoring, and monthly reporting — or hand off the playbook for your team to run.",
      },
      {
        q: "How often should I post on my GBP?",
        a: "Weekly is the sweet spot for most {city} businesses. We generate post drafts on a weekly schedule so the profile stays fresh without manual writing.",
      },
      {
        q: "Will more reviews actually help me rank in {city}?",
        a: "Yes — review quantity, recency, and response rate are all ranking signals. We help you build a sustainable review-request cadence (no fake reviews, ever).",
      },
      {
        q: "Do you respond to negative reviews?",
        a: "Yes. We use sentiment-appropriate templates that protect the brand, address the specific complaint, and signal future customers that you're attentive.",
      },
      {
        q: "What if I don't have a physical address in {city}?",
        a: "We can configure your profile as a service-area business — same as Tweak & Build — so you appear for the cities you actually serve.",
      },
    ],
    related: ["local-seo", "web-design", "lead-generation", "ai-automation"],
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    shortName: "Lead Gen",
    category: "leads",
    metaTagline: "Turn local search and ad traffic into qualified leads",
    intro:
      "Lead generation is more than running ads. It's the full system: landing pages that convert, forms that don't leak, follow-up that closes, and tracking that tells you what's working. We build the end-to-end system, not just one piece.",
    whyLocal:
      "Most local businesses spend money on Google Ads or SEO without a landing-page system to convert the clicks. The result is a steady ad bill and a steady leak of unconverted traffic. Fixing the system upstream of the ads is almost always the highest-leverage move.",
    problemsSolved: [
      "Paying for clicks but not converting them into leads",
      "Forms that ask too much and convert too little",
      "Slow landing-page load times killing ad ROI",
      "No follow-up cadence on form submissions",
      "Calls going unanswered or untracked",
      "Quote requests buried in inboxes with no routing",
    ],
    deliverables: [
      "Conversion-focused landing pages aligned to ads",
      "Multi-step forms tuned to your lead-qualification process",
      "Automated email + SMS follow-up sequences",
      "Call tracking with city + campaign attribution",
      "CRM routing rules so leads go to the right person fast",
      "Weekly conversion reporting",
    ],
    benefits: [
      "Higher conversion rate on existing traffic",
      "Lower cost per lead from Google Ads",
      "Lead-to-customer pipeline you can actually measure",
      "No leads slipping through the cracks",
    ],
    process: [
      { title: "Map the funnel", description: "From ad/search to first call. We diagnose every leak." },
      { title: "Build pages", description: "Landing pages tied to specific services and intents." },
      { title: "Wire automation", description: "Forms, email, SMS, CRM, and call tracking — connected." },
      { title: "Run + iterate", description: "Weekly A/B tests on headline, offer, and form length." },
    ],
    faqs: [
      {
        q: "Do you run the ads or just build the pages?",
        a: "We can do either. Many {city} clients pair our landing-page system with their existing ad agency. Others have us run Google Ads end-to-end.",
      },
      {
        q: "How fast can I see more leads after launch?",
        a: "Usually within the first 30 days. Conversion-rate improvements on existing traffic show up immediately; new SEO traffic builds over 60-90 days.",
      },
      {
        q: "Will leads route directly to my CRM?",
        a: "Yes. We integrate with HubSpot, Salesforce, Zoho, GoHighLevel, Pipedrive, and most major CRMs — or we'll route via webhook to a custom system.",
      },
      {
        q: "Can you track phone calls from {city} prospects?",
        a: "Yes. We use call-tracking numbers attributed to specific campaigns and cities so you know exactly which ads or pages are generating calls.",
      },
      {
        q: "What's a realistic conversion rate to expect?",
        a: "For local services, a well-built landing page typically converts 8% to 20% of paid traffic. We benchmark against your current rate and target improvements quarterly.",
      },
    ],
    related: ["crm-setup", "ai-automation", "web-design", "local-seo"],
  },
  {
    slug: "crm-setup",
    name: "CRM Setup",
    shortName: "CRM",
    category: "crm",
    metaTagline: "Set up the CRM that fits your business — without the bloat",
    intro:
      "A well-configured CRM turns a chaotic pipeline into a system. We set up HubSpot, GoHighLevel, Pipedrive, or Salesforce around your real sales process — not the other way around — and wire it to your forms, calls, and follow-up.",
    whyLocal:
      "Most local businesses either don't have a CRM or have one that's used as a glorified spreadsheet. Either way, leads slip, follow-up is inconsistent, and revenue stays bottlenecked at the owner.",
    problemsSolved: [
      "Leads scattered across email, paper notes, and phone logs",
      "No clear pipeline stages or follow-up triggers",
      "Sales-cycle bottlenecks invisible until they cost a deal",
      "No reliable way to measure conversion at each stage",
      "Existing CRM bloated and ignored by the team",
    ],
    deliverables: [
      "Pipeline + stage design aligned to your real sales process",
      "Custom fields, properties, and tags",
      "Forms wired directly into the CRM",
      "Automated lead routing and stage transitions",
      "Email + SMS sequences for each stage",
      "Reporting dashboards by source, owner, and stage",
      "Team training on the workflow",
    ],
    benefits: [
      "Predictable follow-up across the whole pipeline",
      "Visibility into where deals stall and why",
      "Less time on data entry, more time on closing",
      "A handoff-ready system if you scale the team",
    ],
    process: [
      { title: "Discover", description: "Map your existing sales process — calls, hand-offs, decision points." },
      { title: "Configure", description: "Build the pipeline, stages, properties, and automations." },
      { title: "Integrate", description: "Wire forms, calls, and email into the CRM." },
      { title: "Train", description: "Walk your team through the new workflow." },
      { title: "Iterate", description: "Refine based on first-month usage and feedback." },
    ],
    faqs: [
      {
        q: "Which CRM do you recommend for {city} small businesses?",
        a: "Depends on your size and stack. HubSpot Starter is excellent for under-10-person teams. GoHighLevel is strong for agencies and service businesses. Pipedrive is fast and lean. We pick the fit, not the trend.",
      },
      {
        q: "Can you migrate me from an existing CRM?",
        a: "Yes. We've migrated from Salesforce, Zoho, Insightly, and homegrown spreadsheets without losing data, history, or deal attribution.",
      },
      {
        q: "Will the CRM connect to my website forms?",
        a: "Yes. Every form on your site can push directly into the CRM with full UTM and source tracking, so you know exactly where each lead came from.",
      },
      {
        q: "Do you train my team?",
        a: "Yes. Setup includes live training and recorded walkthroughs your team can reference later.",
      },
      {
        q: "How long does CRM setup take?",
        a: "Standard setup ships in 2 to 3 weeks. Complex multi-team builds with custom automations can take 4 to 6 weeks.",
      },
    ],
    related: ["ai-automation", "lead-generation", "software-development", "google-business-profile-optimization"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    shortName: "AI Automation",
    category: "ai",
    metaTagline: "Automate the work that's slowing your business down",
    intro:
      "AI automation lets a small team do the work of a much larger one. We build workflow automations — lead qualification, intake, follow-up, scheduling, internal reporting — that run 24/7 and never miss a step.",
    whyLocal:
      "Most {county} County small-business owners spend 10-20 hours a week on work that should be automated: intake forms, scheduling, follow-up, simple replies. The cost isn't just the time — it's the leads dropped while the owner is on a job.",
    problemsSolved: [
      "Hours wasted on repetitive intake and follow-up",
      "Leads going cold while the owner is in the field",
      "Inconsistent response times eroding trust",
      "Manual data entry creating errors and bottlenecks",
      "Reporting that takes hours instead of minutes",
    ],
    deliverables: [
      "Custom AI workflow automations (Make, Zapier, or code)",
      "Lead-intake bots for website and SMS",
      "Auto-classification and routing of inbound leads",
      "Email triage with sentiment-aware responses",
      "Calendar and scheduling automation",
      "Automated weekly reporting",
      "Documented runbooks for every workflow",
    ],
    benefits: [
      "Hours of weekly time given back to the owner and team",
      "Faster response times = higher close rate",
      "Reliable, audit-able processes",
      "Easier to scale headcount without scaling chaos",
    ],
    process: [
      { title: "Map the workflows", description: "We shadow your process and identify the highest-impact automations." },
      { title: "Build + test", description: "Each automation built, tested, and dry-run against real data." },
      { title: "Launch + monitor", description: "Real-time monitoring and rollback if anything misbehaves." },
      { title: "Document", description: "Runbooks so your team can edit, pause, or extend each workflow." },
    ],
    faqs: [
      {
        q: "What's the difference between AI automation and just using Zapier?",
        a: "Zapier moves data between apps. AI automation adds judgment — classification, summarization, drafting — so workflows that needed a human now run themselves. We use both, wherever each fits.",
      },
      {
        q: "Can you automate my customer support replies?",
        a: "Yes — with guardrails. We typically build AI-drafted replies that a human reviews and sends, then graduate to full auto-send once the model performance is proven.",
      },
      {
        q: "How much does AI automation cost?",
        a: "Most projects fall in the $3,500 to $15,000 range depending on the number of workflows and integration complexity. Ongoing usage is typically under $200/mo.",
      },
      {
        q: "Will the automation break when an app changes its API?",
        a: "We build with monitoring and alerting so the moment something fails, you know. We also include a runbook for the most common failure modes.",
      },
      {
        q: "Do you handle the AI prompt engineering?",
        a: "Yes. Prompt engineering, model selection, evaluation, and ongoing tuning are part of the engagement.",
      },
    ],
    related: ["crm-setup", "software-development", "lead-generation", "google-business-profile-optimization"],
  },
  {
    slug: "software-development",
    name: "Software Development",
    shortName: "Software Dev",
    category: "dev",
    metaTagline: "Custom internal tools and web apps when off-the-shelf isn't enough",
    intro:
      "When a SaaS tool can't quite do what you need, we build the custom internal tool, dashboard, or web app that fits your business. Senior engineers, modern stack, fixed-quote engagements.",
    whyLocal:
      "A growing local business often hits a wall where its spreadsheet, generic SaaS, and email chain stops scaling. Custom software at that point pays for itself in months, not years — and unlocks the next stage of growth.",
    problemsSolved: [
      "Operations running on tangled spreadsheets",
      "SaaS tools that don't fit the workflow",
      "Manual data shuffling between disconnected systems",
      "Internal-team dashboards built ad-hoc and unreliable",
      "Client portals required for compliance or service delivery",
    ],
    deliverables: [
      "Discovery and scoping document",
      "Web app or internal tool built in Next.js + TypeScript + Supabase",
      "Role-based access and authentication",
      "Integrations with your existing systems (CRM, payments, accounting)",
      "Deployed on Vercel with monitoring",
      "Documentation and team training",
    ],
    benefits: [
      "Operations that scale past the spreadsheet ceiling",
      "Tools that fit your business — not the other way around",
      "Owned code and infrastructure",
      "Reliable, monitored, audit-able systems",
    ],
    process: [
      { title: "Discovery", description: "Workflow mapping, user interviews, and constraints." },
      { title: "Scope", description: "Fixed-quote scope document with milestones and timeline." },
      { title: "Build", description: "Iterative delivery in 2-week milestones with real demos." },
      { title: "Launch", description: "Production deploy, monitoring, and team handoff." },
      { title: "Maintain", description: "Optional retainer for updates, new features, and support." },
    ],
    faqs: [
      {
        q: "When does custom software actually make sense?",
        a: "When the workflow is core to your business, your team is wasting hours on workarounds, and the SaaS market doesn't have a clean fit. We tell you when off-the-shelf is the better answer.",
      },
      {
        q: "What's a realistic budget for a custom internal tool?",
        a: "Most useful internal tools land between $15,000 and $60,000 for a v1 launch. We scope and quote up front, fixed price.",
      },
      {
        q: "Do I own the code?",
        a: "Yes. You get the GitHub repo, full source code, and deployment access from day one.",
      },
      {
        q: "Can you work alongside our existing developers?",
        a: "Yes. Many engagements are a senior team accelerating an existing in-house dev team.",
      },
      {
        q: "What stack do you build on?",
        a: "Next.js + TypeScript + Tailwind + Supabase on Vercel by default. We adapt when a client team has an existing stack they want to stay on.",
      },
    ],
    related: ["ai-automation", "crm-setup", "web-design", "lead-generation"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Lookups + generators
// ─────────────────────────────────────────────────────────────────────────────

export const CITY_SLUGS = GEO_CITIES.map((c) => c.slug);
export const SERVICE_SLUGS = GEO_SERVICES.map((s) => s.slug);

export function getCity(slug: string): GeoCity | undefined {
  return GEO_CITIES.find((c) => c.slug === slug);
}

export function getService(slug: string): GeoService | undefined {
  return GEO_SERVICES.find((s) => s.slug === slug);
}

export function geoPageSlug(citySlug: string, serviceSlug: string): string {
  return `${citySlug}-${serviceSlug}`;
}

export function geoPagePath(citySlug: string, serviceSlug: string): string {
  return `/seo/${citySlug}/${serviceSlug}`;
}

export function geoPageUrl(citySlug: string, serviceSlug: string): string {
  return `${SITE_URL}${geoPagePath(citySlug, serviceSlug)}`;
}

export function allGeoPages(): Array<{
  citySlug: string;
  serviceSlug: string;
  slug: string;
}> {
  const out: Array<{ citySlug: string; serviceSlug: string; slug: string }> = [];
  for (const city of GEO_CITIES) {
    for (const service of GEO_SERVICES) {
      out.push({
        citySlug: city.slug,
        serviceSlug: service.slug,
        slug: geoPageSlug(city.slug, service.slug),
      });
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal linking
// ─────────────────────────────────────────────────────────────────────────────

export function nearbyCities(city: GeoCity, limit = 5): GeoCity[] {
  const seen = new Set<string>();
  const out: GeoCity[] = [];
  for (const slug of city.neighbors) {
    const match = getCity(slug);
    if (match && !seen.has(match.slug)) {
      out.push(match);
      seen.add(match.slug);
    }
    if (out.length >= limit) return out;
  }
  // Pad with same-county cities if neighbors don't fill the limit
  for (const c of GEO_CITIES) {
    if (c.slug === city.slug || seen.has(c.slug)) continue;
    if (c.county === city.county) {
      out.push(c);
      seen.add(c.slug);
    }
    if (out.length >= limit) return out;
  }
  return out;
}

export function relatedServices(service: GeoService, limit = 4): GeoService[] {
  const seen = new Set<string>();
  const out: GeoService[] = [];
  for (const slug of service.related) {
    const match = getService(slug);
    if (match && !seen.has(match.slug)) {
      out.push(match);
      seen.add(match.slug);
    }
    if (out.length >= limit) return out;
  }
  for (const s of GEO_SERVICES) {
    if (s.slug === service.slug || seen.has(s.slug)) continue;
    out.push(s);
    seen.add(s.slug);
    if (out.length >= limit) return out;
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Content builders — deterministic, city-aware, never fabricates facts
// ─────────────────────────────────────────────────────────────────────────────

function neighborList(city: GeoCity): string {
  const neighbors = nearbyCities(city, 4).map((c) => c.name);
  if (neighbors.length === 0) return `${city.county} County and the surrounding ${REGION_NAME} area`;
  if (neighbors.length === 1) return neighbors[0];
  if (neighbors.length === 2) return `${neighbors[0]} and ${neighbors[1]}`;
  return `${neighbors.slice(0, -1).join(", ")}, and ${neighbors[neighbors.length - 1]}`;
}

function interpolate(template: string, city: GeoCity): string {
  return template
    .replace(/\{city\}/g, city.name)
    .replace(/\{county\}/g, city.county)
    .replace(/\{state\}/g, STATE_CODE)
    .replace(/\{stateName\}/g, STATE_NAME)
    .replace(/\{neighborList\}/g, neighborList(city));
}

export function buildH1(city: GeoCity, service: GeoService): string {
  return `${service.name} in ${city.name}, ${STATE_CODE}`;
}

export function buildPageTitle(city: GeoCity, service: GeoService): string {
  return `${service.name} in ${city.name}, ${STATE_CODE} | ${ORG_NAME}`;
}

export function buildPageDescription(city: GeoCity, service: GeoService): string {
  // Must stay under 155 chars
  const base = `${service.metaTagline} for ${city.name}, ${STATE_CODE} businesses. ${ORG_NAME} — North Jersey service area.`;
  return base.length <= 155 ? base : base.slice(0, 152) + "...";
}

export function buildIntro(city: GeoCity, service: GeoService): string {
  return `${service.intro} For ${city.name}, ${STATE_CODE} businesses, that means a system tuned to ${city.county} County's specific search patterns, competition, and customer expectations.`;
}

export function buildWhyLocal(city: GeoCity, service: GeoService): string {
  return interpolate(service.whyLocal, city);
}

export function buildLocalContext(city: GeoCity): string {
  const landmarks = city.landmarks.slice(0, 3).join(", ");
  const sectors = city.businessContext.slice(0, 4).join(", ");
  return `${city.blurb} The local landscape around ${landmarks} supports a healthy mix of ${sectors}. We serve ${city.name} as a service-area studio covering all of ${REGION_NAME} — ${neighborList(city)}.`;
}

export function buildFaqs(
  city: GeoCity,
  service: GeoService,
): Array<{ q: string; a: string }> {
  return service.faqs.map((f) => ({
    q: interpolate(f.q, city),
    a: interpolate(f.a, city),
  }));
}

export function buildCtaHeadline(city: GeoCity, service: GeoService): string {
  return `Ready to upgrade ${service.shortName.toLowerCase()} for your ${city.name} business?`;
}

export function buildCtaSubtext(city: GeoCity, service: GeoService): string {
  return `Book a free 20-minute call. No pitch deck — just specific feedback on how ${service.shortName} would work for a ${city.name}, ${STATE_CODE} business like yours.`;
}

// Cached content (LLM-generated) can optionally override the defaults.
export interface CachedGeoContent {
  intro?: string;
  whyLocal?: string;
  localContext?: string;
  ctaHeadline?: string;
  generatedAt?: string;
}
