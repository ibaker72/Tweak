export interface Project {
  slug: string; title: string; category: string; tagline: string;
  description: string; challenge: string; solution: string;
  problem: string; solutionShort: string; impactShort: string;
  impact: string; results: string[]; stack: string[]; year: string;
  live?: boolean; url?: string;
}

export const projects: Project[] = [
  {
    slug: "create3dparts", title: "Create3DParts.com", category: "E-Commerce Platform",
    tagline: "Instant 3D printing quotes with integrated checkout",
    description: "A full-stack platform that lets customers upload CAD files, get real-time pricing based on material and complexity, and check out in under 60 seconds.",
    challenge: "The client was losing leads because their quote process took 24 to 48 hours. Customers would leave and never return.",
    solution: "We built a real-time quoting engine that parses STL/STEP files, calculates volume and print time, and returns a price instantly. Integrated Stripe checkout with order tracking and automated email confirmations.",
    problem: "Manual quoting took 48 hours. Customers left and never came back.",
    solutionShort: "Built a real-time quoting engine with instant CAD file pricing and Stripe checkout.",
    impactShort: "Quote time: 48hrs → 60sec. Orders up 35% in month one.",
    impact: "Quote time: 48hrs → 60sec",
    results: ["Quote-to-checkout reduced from 48 hours to under 60 seconds", "35% increase in completed orders in month one", "Eliminated 20+ hours/week of manual quoting"],
    stack: ["Next.js", "TypeScript", "Stripe", "Node.js", "AWS S3", "Vercel"],
    year: "2025", live: true, url: "https://create3dparts.com",
  },
  {
    slug: "leadsandsaas", title: "LeadsAndSaaS", category: "SaaS Platform",
    tagline: "Agent hub, asset vault, and lead distribution engine",
    description: "A multi-tenant SaaS platform for managing AI agent workflows, storing digital assets, and distributing leads across teams with configurable routing rules.",
    challenge: "The founding team was juggling four different tools for lead management, asset storage, and agent coordination. Data was siloed and leads were being dropped.",
    solution: "We consolidated everything into one platform: a drag-and-drop agent builder, a centralized asset vault with tagging and permissions, and a lead router with round-robin and rules-based distribution.",
    problem: "Four disconnected tools. Data siloed, leads dropped, onboarding took days.",
    solutionShort: "One platform: agent builder, asset vault, and rules-based lead distribution.",
    impactShort: "Lead response dropped from 4 hours to 15 minutes.",
    impact: "Lead response: 4hrs → 15min",
    results: ["Lead response time: 4 hours to under 15 minutes", "100% of assets in one searchable vault", "Onboarding reduced from 3 days to 4 hours"],
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI API", "Tailwind CSS", "Vercel"],
    year: "2025", live: true,
  },
  {
    slug: "meridian-health", title: "Meridian Health", category: "Web Application",
    tagline: "Patient portal and scheduling for a multi-location clinic",
    description: "A full-stack patient portal and scheduling platform serving three clinic locations, replacing phone-based booking with a seamless digital experience.",
    challenge: "The clinic was losing 20+ staff hours per week on phone scheduling with a 25% no-show rate.",
    solution: "We built a patient-facing portal with real-time calendar availability, automated SMS/email reminders, and a staff dashboard for full schedule management.",
    problem: "25% no-show rate and 20+ hours/week wasted on phone scheduling.",
    solutionShort: "Patient portal with real-time availability and automated SMS reminders.",
    impactShort: "No-shows reduced 40%. Phone volume cut in half.",
    impact: "No-shows reduced 40%",
    results: ["No-show rate dropped from 25% to 15% in 60 days", "Phone volume reduced by 40%", "Patient satisfaction up 22%"],
    stack: ["Next.js", "TypeScript", "Supabase", "Twilio", "Vercel"],
    year: "2025",
  },
  {
    slug: "atlas-freight", title: "Atlas Freight", category: "Landing Page + CRM",
    tagline: "Lead generation engine with instant-quote calculator for logistics",
    description: "A conversion-optimized landing page with a step-by-step freight quote calculator feeding directly into a HubSpot sales pipeline.",
    challenge: "Atlas was running Google Ads to a generic WordPress page with just a phone number. No online lead capture, no CRM.",
    solution: "We designed a high-converting landing page with an interactive quote builder. Leads flow into HubSpot with automated sequences and real-time sales notifications.",
    problem: "Google Ads to a generic page. No lead capture, no CRM, burning budget.",
    solutionShort: "Conversion-optimized page with interactive quote builder feeding HubSpot.",
    impactShort: "3.2x more qualified leads. Cost per lead down 58%.",
    impact: "3.2x more qualified leads",
    results: ["Qualified leads increased 3.2x in month one", "Cost per lead decreased 58%", "Sales response: 6 hours to 12 minutes"],
    stack: ["React", "TypeScript", "HubSpot API", "Vercel", "Analytics"],
    year: "2024",
  },
  {
    slug: "vow-studios", title: "Vow Studios", category: "Headless E-Commerce",
    tagline: "Headless Shopify storefront with 3D product configurator",
    description: "A headless Shopify storefront for fine jewelry with a WebGL ring configurator, real-time pricing, and Apple Pay checkout.",
    challenge: "The existing Shopify theme was slow and generic. The client needed a custom product builder for ring configuration.",
    solution: "We built a headless Next.js storefront powered by Shopify's Storefront API with a Three.js configurator and streamlined three-step checkout.",
    problem: "Slow Shopify theme. 5s load. 72% mobile bounce. No product customization.",
    solutionShort: "Headless Next.js storefront with 3D configurator and Apple Pay.",
    impactShort: "Revenue up 180% in 90 days. Load time: 5.2s → 1.1s.",
    impact: "Revenue up 180% in 90 days",
    results: ["Revenue increased 180% in 90 days", "AOV up 35% via configurator upsells", "Load time: 5.2s to 1.1s"],
    stack: ["Next.js", "Shopify Storefront API", "Three.js", "TypeScript", "Vercel Edge"],
    year: "2024",
  },
];

export const services = [
  { icon: "Rocket" as const, title: "MVPs & Web Apps", desc: "From concept to launched product. Full-stack engineering with auth, payments, dashboards, and the features that drive your business.", tags: ["Next.js","React","Supabase","Stripe"], gradient: "from-v/[0.08] to-cyan/[0.03]" },
  { icon: "Zap" as const, title: "Landing Pages & Funnels", desc: "Every element is conversion-engineered. Fast load, sharp copy, clear CTAs. Pages that turn ad spend into revenue.", tags: ["SEO","A/B Testing","Analytics","Speed First"], gradient: "from-cyan/[0.06] to-v/[0.03]" },
  { icon: "Globe" as const, title: "WordPress & E-Commerce", desc: "Custom themes, WooCommerce builds, and headless architectures. Sites your team can update without filing a support ticket.", tags: ["Custom Themes","WooCommerce","ACF","Headless WP"], gradient: "from-gold/[0.04] to-v/[0.03]" },
  { icon: "Bot" as const, title: "Automation & AI", desc: "We connect your tools, eliminate repetitive tasks, and build AI workflows that save your team real hours every week.", tags: ["OpenAI","n8n","Custom APIs","Integrations"], gradient: "from-v/[0.06] to-cyan/[0.04]" },
];

export const tiers = [
  { name: "Single Page", price: "$497", time: "3 day delivery", features: ["1 responsive page","Contact form","SEO fundamentals","Mobile optimized","1 revision round"], excluded: ["CMS","Multi-page","E-commerce"], popular: false },
  { name: "Multi Page", price: "$1,497", time: "7 day delivery", features: ["Up to 5 pages","CMS integration","Lead capture forms","Analytics setup","2 revision rounds","Basic SEO"], excluded: ["E-commerce","Custom backend"], popular: true },
  { name: "Full Site", price: "$2,997", time: "14 day delivery", features: ["Up to 12 pages","CMS + blog","Advanced forms + SEO","E-commerce ready","3 revision rounds","30 day support"], excluded: ["Custom SaaS logic","AI integrations"], popular: false },
];

export const testimonials = [
  { quote: "They shipped our platform in 5 weeks and it looked like it had months of development behind it. Our investors were genuinely impressed at the demo.", name: "David Morales", title: "CTO, LeadsAndSaaS", rating: 5 },
  { quote: "We went from a 48 hour manual quoting process to instant online quotes. The impact on our conversion rate was immediate and dramatic.", name: "Ryan Torres", title: "Founder, Create3DParts", rating: 5 },
  { quote: "Third agency we hired. First one that actually shipped on time, on budget, and without us having to chase for updates every week.", name: "Priya Patel", title: "Founder, GreenThread", rating: 5 },
];

export const techStack = [
  { name: "Next.js", color: "#fff" }, { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" }, { name: "Supabase", color: "#3ECF8E" },
  { name: "Stripe", color: "#635BFF" }, { name: "OpenAI", color: "#10A37F" },
  { name: "WordPress", color: "#21759B" }, { name: "Node.js", color: "#68A063" },
  { name: "Vercel", color: "#fff" },
];

export const liveActivity = [
  { text: "Deployed Create3DParts v2.3 to production", time: "2 hours ago", type: "deploy" },
  { text: "New lead captured for Atlas Freight", time: "5 hours ago", type: "lead" },
  { text: "LeadsAndSaaS sprint 14 review completed", time: "Yesterday", type: "review" },
  { text: "Meridian Health onboarded 200th patient", time: "2 days ago", type: "milestone" },
  { text: "Vow Studios: AOV increased to $847", time: "This week", type: "metric" },
];

export const faqs = [
  { q: "What's the difference between Quick Build and Custom Project?", a: "Quick Build is our flat-rate service for when you already have a design, wireframe, or clear description. We implement what you provide. Custom Project is for when you need strategy, UX, and engineering from scratch. Different starting points, same quality." },
  { q: "What if I'm not sure which path fits?", a: "Use the \"Not sure?\" form under Quick Build pricing or reach out through Custom Project. We'll route you to the right track." },
  { q: "How fast can you start?", a: "Quick Builds start within 48 hours. Custom projects kick off within 1 to 2 weeks of signing the proposal." },
  { q: "Do we own the code?", a: "Yes. 100% of source code, design assets, and documentation transfer to you on final payment." },
  { q: "What does a custom project cost?", a: "Custom engagements range from $5,000 to $25,000+ depending on scope. Fixed-price proposals always. No hourly billing." },
  { q: "What happens after launch?", a: "Every engagement includes 30 days of post-launch support. Monthly retainers available for ongoing development." },
  { q: "What's your guarantee?", a: "Milestone-based billing on custom projects. If we don't deliver the agreed scope, full refund for that milestone. Quick Builds include revision rounds and a satisfaction guarantee." },
];

export const budgetOptions = ["Under $5k","$5k to $10k","$10k to $25k","$25k+","Not sure"];
export const timelineOptions = ["ASAP","1 to 2 months","2 to 4 months","Flexible"];
