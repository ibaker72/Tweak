export type PricingCategoryId = "launch" | "product-engineering" | "growth";

export type PricingMetaItem = {
  label: string;
  value: string;
};

export type PricingTier = {
  id: string;
  categoryId: PricingCategoryId;
  kicker: string;
  name: string;
  price: string;
  priceSuffix?: string;
  summary: string;
  highlights: string[];
  meta: PricingMetaItem[];
  ctaLabel: string;
  ctaHref: string;
  popular?: boolean;
};

export type PricingCategory = {
  id: PricingCategoryId;
  label: string;
  description: string;
};

export const pricingCategories: PricingCategory[] = [
  {
    id: "launch",
    label: "Launch",
    description: "High-converting websites and launch assets for teams that need speed without sacrificing quality.",
  },
  {
    id: "product-engineering",
    label: "Product & Engineering",
    description: "Senior product engineering for SaaS, internal tools, and complex technical delivery.",
  },
  {
    id: "growth",
    label: "Growth",
    description: "Search and growth systems that compound visibility, pipeline, and qualified demand.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "landing-pages",
    categoryId: "launch",
    kicker: "Launch",
    name: "Landing Pages",
    price: "$2,500",
    summary: "A conversion-ready page engineered to launch fast and support paid or outbound campaigns.",
    highlights: [
      "Message architecture and conversion-first layout",
      "Next.js implementation with responsive QA",
      "Technical SEO setup and structured metadata",
      "One focused revision cycle before handoff",
      "Production launch support",
    ],
    meta: [
      { label: "Engagement", value: "Fixed price" },
      { label: "Timeline", value: "1–2 weeks" },
      { label: "Best for", value: "Campaigns & validation" },
    ],
    ctaLabel: "Get a quote",
    ctaHref: "/contact?service=landing-pages",
  },
  {
    id: "waas",
    categoryId: "launch",
    kicker: "Launch",
    name: "Website as a Service",
    price: "$1,500",
    priceSuffix: "/mo",
    summary: "An ongoing website partnership for teams that ship updates, experiments, and improvements every month.",
    highlights: [
      "Continuous design and development sprints",
      "Priority bug fixes and technical support",
      "Content and CMS implementation updates",
      "Performance and conversion optimization cycles",
      "Monthly reporting and roadmap recommendations",
    ],
    meta: [
      { label: "Engagement", value: "Retainer" },
      { label: "Timeline", value: "Monthly sprint cycle" },
      { label: "Best for", value: "Teams with active websites" },
    ],
    ctaLabel: "Start a retainer",
    ctaHref: "/contact?service=waas",
  },
  {
    id: "saas",
    categoryId: "product-engineering",
    kicker: "Product & Engineering",
    name: "SaaS Development",
    price: "$8,000",
    summary: "From validated concept to production SaaS, built with senior execution and delivery discipline.",
    highlights: [
      "Full-stack delivery across product surfaces",
      "Auth, billing, admin, and workflow automation",
      "Milestone-based execution with weekly visibility",
      "CI/CD, staging, and production hardening",
      "Post-launch stabilization and handoff",
    ],
    meta: [
      { label: "Engagement", value: "Milestone-based" },
      { label: "Timeline", value: "4–12 weeks" },
      { label: "Best for", value: "SaaS MVP to scale-up" },
    ],
    ctaLabel: "Scope your product",
    ctaHref: "/contact?service=saas",
    popular: true,
  },
  {
    id: "custom-engineering",
    categoryId: "product-engineering",
    kicker: "Product & Engineering",
    name: "Custom Engineering",
    price: "$12,000",
    summary: "Targeted engineering engagements for infrastructure, migration, and high-risk technical work.",
    highlights: [
      "Architecture reviews and implementation plans",
      "Complex integrations and platform extensions",
      "Performance, reliability, and observability upgrades",
      "Data migration and workflow automation",
      "Dedicated engineering lead and stakeholder sync",
    ],
    meta: [
      { label: "Engagement", value: "Scoped engagement" },
      { label: "Timeline", value: "Defined in SOW" },
      { label: "Best for", value: "Complex technical initiatives" },
    ],
    ctaLabel: "Talk to engineering",
    ctaHref: "/contact?service=custom-engineering",
  },
  {
    id: "growth-seo",
    categoryId: "growth",
    kicker: "Growth",
    name: "Growth / SEO",
    price: "$2,000",
    priceSuffix: "/mo",
    summary: "A technical SEO and growth engagement focused on sustainable rankings, traffic, and pipeline.",
    highlights: [
      "Technical SEO implementation across the stack",
      "Programmatic page strategy for scalable coverage",
      "Content briefs and keyword opportunity mapping",
      "Core Web Vitals and crawl-efficiency improvements",
      "Executive reporting with clear monthly priorities",
    ],
    meta: [
      { label: "Engagement", value: "Retainer" },
      { label: "Timeline", value: "90-day minimum" },
      { label: "Best for", value: "Compounding organic growth" },
    ],
    ctaLabel: "Start growing",
    ctaHref: "/contact?service=growth-seo",
  },
];
