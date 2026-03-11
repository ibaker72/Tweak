export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  problem: string;
  solutionShort: string;
  impactShort: string;
  impact: string;
  results: string[];
  stack: string[];
  year: string;
  live?: boolean;
  url?: string;
  image?: string;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    slug: "create3dparts",
    title: "Create3DParts.com",
    category: "E-Commerce Platform",
    tagline: "Instant 3D printing quotes with integrated checkout",
    description:
      "A full-stack platform that lets customers upload CAD files, get real-time pricing based on material and complexity, and check out in under 60 seconds.",
    challenge:
      "The client was losing leads because their quote process took 24 to 48 hours. Customers would leave and never return.",
    solution:
      "We built a real-time quoting engine that parses STL/STEP files, calculates volume and print time, and returns a price instantly. Integrated Stripe checkout with order tracking and automated email confirmations.",
    problem:
      "Manual quoting took 48 hours. Customers left and never came back.",
    solutionShort:
      "Built a real-time quoting engine with instant CAD file pricing and Stripe checkout.",
    impactShort:
      "Quote time: 48hrs → 60sec. Orders up 35% in month one.",
    impact: "Quote time: 48hrs → 60sec",
    results: [
      "Quote-to-checkout reduced from 48 hours to under 60 seconds",
      "35% increase in completed orders in month one",
      "Eliminated 20+ hours/week of manual quoting",
    ],
    stack: ["Next.js", "TypeScript", "Stripe", "Node.js", "AWS S3", "Vercel"],
    year: "2025",
    live: true,
    url: "https://create3dparts.com",
    image: "/proof/create3dparts/home.png",
    gallery: [
  "/proof/create3dparts/home.png",
  "/proof/create3dparts/quote.png",
  "/proof/create3dparts/dashboard.png",
  "/proof/create3dparts/account-dashboard.png",
  "/proof/create3dparts/material.png",
  "/proof/create3dparts/sign-in.png",
],
  },
  {
    slug: "leadsandsaas",
    title: "LeadsAndSaaS",
    category: "SaaS Platform",
    tagline: "Agent hub, asset vault, and lead distribution engine",
    description:
      "A multi-tenant SaaS platform for managing AI agent workflows, storing digital assets, and distributing leads across teams with configurable routing rules.",
    challenge:
      "The founding team was juggling four different tools for lead management, asset storage, and agent coordination. Data was siloed and leads were being dropped.",
    solution:
      "We consolidated everything into one platform: a drag-and-drop agent builder, a centralized asset vault with tagging and permissions, and a lead router with round-robin and rules-based distribution.",
    problem:
      "Four disconnected tools. Data siloed, leads dropped, onboarding took days.",
    solutionShort:
      "One platform: agent builder, asset vault, and rules-based lead distribution.",
    impactShort:
      "Lead response dropped from 4 hours to 15 minutes.",
    impact: "Lead response: 4hrs → 15min",
    results: [
      "Lead response time: 4 hours to under 15 minutes",
      "100% of assets in one searchable vault",
      "Onboarding reduced from 3 days to 4 hours",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "OpenAI API",
      "Tailwind CSS",
      "Vercel",
    ],
    year: "2025",
    live: true,
    image: "/proof/leadsandsaas/overview.png",
    gallery: [
      "/proof/leadsandsaas/overview.png",
      "/proof/leadsandsaas/billing.png",
      "/proof/leadsandsaas/agents.png",
      "/proof/leadsandsaas/chat-widget.png",
      "/proof/leadsandsaas/conversations.png",
      "/proof/leadsandsaas/integrations.png",
      "/proof/leadsandsaas/login.png",
      "/proof/leadsandsaas/settings.png",
    ],
  },
  {
    slug: "meridian-health",
    title: "Meridian Health",
    category: "Web Application",
    tagline: "Patient portal and scheduling for a multi-location clinic",
    description:
      "A full-stack patient portal and scheduling platform serving three clinic locations, replacing phone-based booking with a seamless digital experience.",
    challenge:
      "The clinic was losing 20+ staff hours per week on phone scheduling with a 25% no-show rate.",
    solution:
      "We built a patient-facing portal with real-time calendar availability, automated SMS/email reminders, and a staff dashboard for full schedule management.",
    problem:
      "25% no-show rate and 20+ hours/week wasted on phone scheduling.",
    solutionShort:
      "Patient portal with real-time availability and automated SMS reminders.",
    impactShort:
      "No-shows reduced 40%. Phone volume cut in half.",
    impact: "No-shows reduced 40%",
    results: [
      "No-show rate dropped from 25% to 15% in 60 days",
      "Phone volume reduced by 40%",
      "Patient satisfaction up 22%",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Twilio", "Vercel"],
    year: "2025",
  },
  {
    slug: "atlas-freight",
    title: "Atlas Freight",
    category: "Landing Page + CRM",
    tagline: "Lead generation engine with instant-quote calculator for logistics",
    description:
      "A conversion-optimized landing page with a step-by-step freight quote calculator feeding directly into a HubSpot sales pipeline.",
    challenge:
      "Atlas was running Google Ads to a generic WordPress page with just a phone number. No online lead capture, no CRM.",
    solution:
      "We designed a high-converting landing page with an interactive quote builder. Leads flow into HubSpot with automated sequences and real-time sales notifications.",
    problem:
      "Google Ads to a generic page. No lead capture, no CRM, burning budget.",
    solutionShort:
      "Conversion-optimized page with interactive quote builder feeding HubSpot.",
    impactShort:
      "3.2x more qualified leads. Cost per lead down 58%.",
    impact: "3.2x more qualified leads",
    results: [
      "Qualified leads increased 3.2x in month one",
      "Cost per lead decreased 58%",
      "Sales response: 6 hours to 12 minutes",
    ],
    stack: ["React", "TypeScript", "HubSpot API", "Vercel", "Analytics"],
    year: "2024",
  },
  {
    slug: "vow-studios",
    title: "Vow Studios",
    category: "Headless E-Commerce",
    tagline: "Headless Shopify storefront with 3D product configurator",
    description:
      "A headless Shopify storefront for fine jewelry with a WebGL ring configurator, real-time pricing, and Apple Pay checkout.",
    challenge:
      "The existing Shopify theme was slow and generic. The client needed a custom product builder for ring configuration.",
    solution:
      "We built a headless Next.js storefront powered by Shopify's Storefront API with a Three.js configurator and streamlined three-step checkout.",
    problem:
      "Slow Shopify theme. 5s load. 72% mobile bounce. No product customization.",
    solutionShort:
      "Headless Next.js storefront with 3D configurator and Apple Pay.",
    impactShort:
      "Revenue up 180% in 90 days. Load time: 5.2s → 1.1s.",
    impact: "Revenue up 180% in 90 days",
    results: [
      "Revenue increased 180% in 90 days",
      "AOV up 35% via configurator upsells",
      "Load time: 5.2s to 1.1s",
    ],
    stack: [
      "Next.js",
      "Shopify Storefront API",
      "Three.js",
      "TypeScript",
      "Vercel Edge",
    ],
    year: "2024",
  },
];

export const services = [
  {
    icon: "Rocket" as const,
    title: "Web Applications",
    tagline: "Full-stack products that run your business",
    desc: "From SaaS dashboards to internal tools. Auth, payments, real-time data, and the custom logic that makes your product actually work.",
    tags: ["Next.js", "React", "Supabase", "Stripe"],
    gradient: "from-v/[0.08] to-cyan/[0.03]",
  },
  {
    icon: "Zap" as const,
    title: "Landing Pages & Funnels",
    tagline: "Pages that turn traffic into revenue",
    desc: "Conversion-engineered from the first pixel. Fast load, sharp messaging, strategic CTAs. Built to make your ad spend work harder.",
    tags: ["SEO", "A/B Testing", "Analytics", "Speed First"],
    gradient: "from-cyan/[0.06] to-v/[0.03]",
  },
  {
    icon: "Globe" as const,
    title: "E-Commerce & Storefronts",
    tagline: "Custom shopping experiences that sell",
    desc: "Headless builds, custom Shopify themes, and WooCommerce platforms. Sites your team can manage without filing a support ticket.",
    tags: ["Shopify", "WooCommerce", "Headless", "Custom Themes"],
    gradient: "from-gold/[0.04] to-v/[0.03]",
  },
  {
    icon: "Bot" as const,
    title: "Automation & AI Systems",
    tagline: "Eliminate the work that slows you down",
    desc: "We connect your tools, automate repetitive workflows, and build AI-powered systems that save your team real hours every week.",
    tags: ["OpenAI", "n8n", "Custom APIs", "Integrations"],
    gradient: "from-v/[0.06] to-cyan/[0.04]",
  },
];

export const tiers = [
  {
    name: "Single Page",
    price: "$1,497",
    time: "Typical turnaround: 1 week",
    payment: "Paid in full upfront",
    buttonLabel: "Get started",
    stripePriceId: "price_1T9BVYPzPB6fxeLqyzhgqHGf",
    features: ["1 responsive page", "Contact form", "SEO fundamentals", "Mobile optimized", "1 revision round"],
    excluded: ["CMS", "Multi-page", "E-commerce"],
    popular: false,
  },
  {
    name: "Multi Page",
    price: "$2,997",
    time: "Typical turnaround: 2–3 weeks",
    payment: "50% upfront · 50% before launch",
    buttonLabel: "Pay deposit",
    stripePriceId: "price_1T9BX1PzPB6fxeLqpugGa8S5",
    features: ["Up to 5 pages", "CMS integration", "Lead capture forms", "Analytics setup", "2 revision rounds", "Basic SEO"],
    excluded: ["E-commerce", "Custom backend"],
    popular: true,
  },
  {
    name: "Full Site",
    price: "$5,997",
    time: "Typical turnaround: 3–5 weeks",
    payment: "50% upfront · 50% before launch",
    buttonLabel: "Pay deposit",
    stripePriceId: "price_1T9BXWPzPB6fxeLq8GeqcE9f",
    features: ["Up to 12 pages", "CMS + blog", "Advanced forms + SEO", "E-commerce ready", "3 revision rounds", "30 day support"],
    excluded: ["Custom SaaS logic", "AI integrations"],
    popular: false,
  },
];

// ── Internal-only: remainder price IDs for manual invoicing after launch ──
// These are NOT used in the public checkout flow.
// Multi Page remainder (50%): price_1T9Bh8PzPB6fxeLq6BLPxA20
// Full Site remainder (50%):   price_1T9BhuPzPB6fxeLq2OYoZ5PD

export const testimonials = [
  {
    quote: "We needed a working platform for an investor demo and they delivered in under a week. It looked and felt like something that had been in development for months.",
    name: "David Morales",
    title: "CTO, LeadsAndSaaS",
    project: "SaaS Platform",
    engagement: "Sub-1-week build",
    result: "Demo-ready for investor meeting",
  },
  {
    quote: "Our old quoting process was 48 hours of back-and-forth emails. Now customers get pricing in 60 seconds and check out on the spot. Orders jumped 35% the first month.",
    name: "Ryan Torres",
    title: "Founder, Create3DParts",
    project: "E-Commerce Platform",
    engagement: "Fixed-price engagement",
    result: "Quote time: 48hrs → 60sec",
  },
  {
    quote: "We'd already burned through two agencies before finding Tweak & Build. They scoped it cleanly, hit every milestone, and we never had to chase for an update.",
    name: "Priya Patel",
    title: "Founder, GreenThread",
    project: "Landing Page + CRM",
    engagement: "3-week build",
    result: "Delivered on scope and budget",
  },
];

export const techStack = [
  { name: "Next.js", color: "#fff" },
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "Stripe", color: "#635BFF" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "WordPress", color: "#21759B" },
  { name: "Node.js", color: "#68A063" },
  { name: "Vercel", color: "#fff" },
];

export const metrics = [
  { value: "48hrs → 60sec", label: "Quote-to-checkout" },
  { value: "<1 week", label: "Fastest product shipped" },
  { value: "<4hr", label: "Avg. response time" },
  { value: "100%", label: "Code ownership" },
];

export const recentLaunches = [
  { name: "Create3DParts.com", type: "E-Commerce", status: "live", result: "Orders up 35%" },
  { name: "LeadsAndSaaS", type: "SaaS Platform", status: "live", result: "Shipped in under a week" },
  { name: "Meridian Health", type: "Web App", status: "shipped", result: "No-shows down 40%" },
];

export const differentiators = [
  {
    title: "Senior-led execution",
    desc: "No revolving door of junior devs. Your project is led by experienced engineers who've shipped real products — not managed from a distance.",
  },
  {
    title: "Fixed pricing, always",
    desc: "You get a locked price before we write a single line of code. No hourly billing, no scope creep surprises, no invoices that don't match the quote.",
  },
  {
    title: "Product thinking built in",
    desc: "We don't just build what you describe. We challenge assumptions, optimize for conversion, and make sure every feature serves a business goal.",
  },
  {
    title: "You own everything",
    desc: "100% of the source code, design assets, and documentation transfer to you on final payment. No lock-in, no licensing fees, no hostage situations.",
  },
];

export const deliveryTraits = [
  "Mobile-first",
  "SEO-ready",
  "Performance optimized",
  "Accessible",
  "Clean handoff",
  "Fully documented",
];

export const bestFitClients = [
  { label: "Founders & CEOs", desc: "Building your first product or rebuilding for scale" },
  { label: "Local businesses", desc: "Need a premium web presence that converts" },
  { label: "Service companies", desc: "Want lead capture and automation that works" },
  { label: "Early-stage startups", desc: "Ship fast without hiring a full team" },
  { label: "E-commerce brands", desc: "Custom storefronts that outperform templates" },
];

export const faqs = [
  {
    q: "What's the difference between Rapid Build and Custom Engineering?",
    a: "Rapid Build is our flat-rate service for when you have a design, wireframes, or a clear spec — we implement what you provide, typically in 1–3 weeks. Custom Engineering is for projects that need strategy, architecture, and full-cycle development from scratch. Different starting points, same quality and the same team.",
  },
  {
    q: "How do payments work?",
    a: "Rapid Builds under $5,000 are typically paid upfront. Larger Rapid Builds split 50/50. Custom Engineering projects follow milestone billing: 40% to begin, 30% at the midpoint, and 30% before final launch and handoff. Growth Retainers are billed monthly with no long-term contract. You always know exactly what you owe and when.",
  },
  {
    q: "When do I get the source code and files?",
    a: "Full source code, repository access, credentials, and all documentation transfer to you after final payment. This is standard for every engagement — you own 100% of what we build.",
  },
  {
    q: "What if I'm not sure which path fits?",
    a: "Reach out through the contact page and tell us what you're building. We'll recommend the right track and send you a fixed quote within 72 hours.",
  },
  {
    q: "How fast can you start?",
    a: "Rapid Builds start within 48 hours. Custom Engineering projects kick off within 1 to 2 weeks of signing the proposal.",
  },
  {
    q: "What happens after I submit an inquiry?",
    a: "We respond within one business day — usually within a few hours. For Rapid Builds, we confirm scope and send an invoice. For Custom Engineering projects, we schedule a 30-minute strategy call to understand your goals before writing a proposal.",
  },
  {
    q: "How many revision rounds do I get?",
    a: "Rapid Builds include 1–3 revision rounds depending on scope. Custom Engineering projects include revisions at each milestone checkpoint — we work iteratively with weekly demos so there are no surprises at the end. Growth Retainer clients get continuous iteration as part of the monthly engagement.",
  },
  {
    q: "What does a Custom Engineering project typically cost?",
    a: "Custom Engineering projects range from $8,000 to $30,000+ depending on scope and complexity. You'll receive a fixed-price proposal with every feature, milestone, and dollar defined before we write a single line of code. No hourly billing, no estimates that balloon later.",
  },
  {
    q: "What's included in a Growth Retainer?",
    a: "A dedicated monthly budget for ongoing development — feature builds, bug fixes, performance improvements, and priority support. We work in weekly iterations so you see continuous progress. No long-term contracts. Cancel anytime with 30 days notice.",
  },
  {
    q: "What happens after launch?",
    a: "Every engagement includes post-launch support (14 to 30 days depending on scope). Growth Retainers are available for ongoing development and iteration.",
  },
  {
    q: "Who is this best for?",
    a: "Founders, small business owners, and early-stage startups who need a professional web presence or custom product built by senior engineers. If you value quality, clear communication, and getting it right the first time — we're a good fit.",
  },
];

export const budgetOptions = ["Under $5k", "$5k to $10k", "$10k to $25k", "$25k+", "Not sure"];
export const timelineOptions = ["ASAP", "1 to 2 months", "2 to 4 months", "Flexible"];