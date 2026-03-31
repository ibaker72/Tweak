export type PricingTier = {
  id: string;
  tag: string;
  name: string;
  price: string;
  priceSuffix?: string;
  scope: string;
  turnaround: string;
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
  popular?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "landing-pages",
    tag: "Launch Fast",
    name: "Landing Pages",
    price: "$2,500",
    scope: "Fixed",
    turnaround: "1–2 weeks",
    includes: [
      "Conversion-focused design & copy structure",
      "Responsive frontend build (Next.js)",
      "Basic SEO setup & metadata",
      "1 round of revisions",
      "Launch support",
    ],
    ctaLabel: "Get a Quote",
    ctaHref: "/contact?service=landing-pages",
  },
  {
    id: "waas",
    tag: "Ongoing Partnership",
    name: "Website as a Service",
    price: "$1,500",
    priceSuffix: "/mo",
    scope: "Retainer",
    turnaround: "Rolling sprints",
    includes: [
      "Continuous design & development iterations",
      "Priority support & bug fixes",
      "Monthly performance audits",
      "CMS content updates",
      "Analytics & conversion tracking",
    ],
    ctaLabel: "Start a Retainer",
    ctaHref: "/contact?service=waas",
  },
  {
    id: "saas",
    tag: "Build to Scale",
    name: "SaaS Development",
    price: "$8,000",
    scope: "Milestone-based",
    turnaround: "4–12 weeks",
    includes: [
      "Full-stack product build (Next.js + your backend)",
      "Auth, billing, dashboards, admin panels",
      "CI/CD pipeline & staging environments",
      "3 milestone checkpoints with feedback loops",
      "30-day post-launch support",
    ],
    ctaLabel: "Scope Your Product",
    ctaHref: "/contact?service=saas",
    popular: true,
  },
  {
    id: "custom-engineering",
    tag: "Complex Problems",
    name: "Custom Engineering",
    price: "$12,000",
    scope: "SOW-based",
    turnaround: "Scoped per engagement",
    includes: [
      "Architecture design & technical planning",
      "API integrations & third-party systems",
      "Performance optimization & infrastructure",
      "Data pipelines, migrations, or automation",
      "Dedicated engineering lead",
    ],
    ctaLabel: "Talk to Engineering",
    ctaHref: "/contact?service=custom-engineering",
  },
  {
    id: "growth-seo",
    tag: "Compound Returns",
    name: "Growth / SEO",
    price: "$2,000",
    priceSuffix: "/mo",
    scope: "Retainer",
    turnaround: "Ongoing (90-day min)",
    includes: [
      "Technical SEO audit & implementation",
      "Programmatic page generation",
      "Content strategy & keyword mapping",
      "Core Web Vitals optimization",
      "Monthly ranking & traffic reports",
    ],
    ctaLabel: "Start Growing",
    ctaHref: "/contact?service=growth-seo",
  },
];
