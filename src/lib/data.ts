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
  status?: "live" | "coming-soon" | "concept";
  url?: string;
  image?: string;
  video?: string;
  poster?: string;
  gallery?: string[];
  proofBadges?: string[];
  metricBadge?: string;
  accent?: "lime" | "cyan" | "violet" | "amber";
}

export const projects: Project[] = [
  {
    slug: "pp-mechanical",
    title: "PP Mechanical",
    category: "HVAC Website + Lead System",
    tagline:
      "Modern HVAC service site engineered for trust and lead capture.",
    description:
      "Built a modern service website for an HVAC company with lead capture, service pages, trust-focused layout, and conversion-focused calls to action.",
    challenge:
      "PP Mechanical was running a dated site that did not match the quality of their service work and was not capturing leads from the homeowners landing on it.",
    solution:
      "We rebuilt the site with a service-led structure, trust-focused layout, and conversion-focused CTAs. Every page funnels visitors toward a clear lead capture path so calls and inquiries are tracked rather than lost.",
    problem:
      "Outdated HVAC site that hurt credibility and dropped leads on the floor.",
    solutionShort:
      "Rebuilt HVAC site with trust-led design, service pages, and conversion-focused lead capture.",
    impactShort: "Website credibility upgraded. Lead capture wired into every page.",
    impact: "Website credibility upgraded",
    results: [
      "Modern trust-led design replaces dated layout",
      "Lead capture wired into every service page",
      "Mobile-optimized for homeowners searching on phones",
    ],
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Resend"],
    year: "2025",
    live: true,
    url: "https://ppmechanicalllc.com",
    image: "/visual-proof/ppmechanical/hero.webp",
    gallery: [
      "/visual-proof/ppmechanical/hero.webp",
      "/visual-proof/ppmechanical/service.webp",
      "/visual-proof/ppmechanical/emergency.webp",
      "/visual-proof/ppmechanical/why-us.webp",
      "/visual-proof/ppmechanical/lead-magnet.webp",
      "/visual-proof/ppmechanical/service-area.webp",
      "/visual-proof/ppmechanical/pagespeed.webp",
      "/visual-proof/ppmechanical/footer.webp",
      "/visual-proof/ppmechanical/call-us-demo.mp4",
      "/visual-proof/ppmechanical/text-us-demo.mp4",
    ],
    proofBadges: ["Local HVAC Website", "Lead Capture Ready", "Mobile Optimized"],
    metricBadge: "Website credibility upgraded",
    accent: "lime",
  },
  {
    slug: "speedway-motors",
    title: "Speedway Motors",
    category: "Auto Dealer Inventory Automation",
    tagline:
      "Inventory-driven dealership site with automated vehicle syncing.",
    description:
      "Built an inventory-driven dealership website with automated vehicle syncing, live listings, image handling, filtering, and database-backed inventory management.",
    challenge:
      "Speedway needed live inventory online without anyone manually updating vehicles, photos, or listings every day.",
    solution:
      "We built a Supabase-backed inventory engine with scheduled cron syncs, live listings, image handling, and category and price filtering. Vehicles move from source to live site automatically.",
    problem:
      "Manual inventory entry. Stale listings. No filtering. Photos out of sync.",
    solutionShort:
      "Supabase-backed inventory engine with cron sync, live listings, filtering, and image handling.",
    impactShort:
      "105+ vehicles synced automatically. Manual inventory updates removed.",
    impact: "105+ vehicles synced automatically",
    results: [
      "105+ vehicles syncing automatically from source to site",
      "Manual inventory updates eliminated via scheduled cron jobs",
      "Filterable live listings with proper image handling",
    ],
    stack: ["Next.js", "Supabase", "TypeScript", "Cron", "Vercel"],
    year: "2025",
    live: true,
    url: "https://speedwaymotorsllc.com",
    image: "/visual-proof/speedwaymotors/hero.jpg",
    gallery: [
      "/visual-proof/speedwaymotors/hero.jpg",
      "/visual-proof/speedwaymotors/inventory.jpg",
      "/visual-proof/speedwaymotors/financing.jpg",
      "/visual-proof/speedwaymotors/financing-02.jpg",
      "/visual-proof/speedwaymotors/reviews.jpg",
      "/visual-proof/speedwaymotors/maps.jpg",
      "/visual-proof/speedwaymotors/message-us.jpg",
      "/visual-proof/speedwaymotors/lead-magnet.jpg",
      "/visual-proof/speedwaymotors/seo-newark.jpg",
      "/visual-proof/speedwaymotors/seo-clifton.jpg",
      "/visual-proof/speedwaymotors/footer.jpg",
      "/visual-proof/speedwaymotors/call-us.mp4",
    ],
    proofBadges: ["105+ Vehicles Synced", "Automated Inventory", "Supabase + Cron"],
    metricBadge: "Manual inventory updates reduced",
    accent: "cyan",
  },
  {
    slug: "tweak-build-os",
    title: "Tweak & Build OS",
    category: "AI Operations Platform",
    tagline:
      "Internal AI operating system for sales, leads, and client workflows.",
    description:
      "Built an internal AI-powered operating system for lead generation, sales workflows, client tracking, automations, and business process management.",
    challenge:
      "Running a studio across lead gen, sales, projects, and client work meant juggling tools and losing context. We needed one place that ran the business.",
    solution:
      "Built an internal AI-driven OS with lead pipelines, sales workflows, client tracking, project status, and automations. AI handles the repetitive lifts so the team stays in execution mode.",
    problem:
      "Sales, leads, and client work spread across too many disconnected tools.",
    solutionShort:
      "Internal AI-powered OS with lead gen, sales workflows, CRM logic, and automations.",
    impactShort: "Sales process centralized. AI handling repetitive workflows.",
    impact: "Sales process centralized",
    results: [
      "Lead gen, sales, and client tracking unified into one OS",
      "AI workflows running across pipeline, outreach, and updates",
      "Custom CRM logic shaped around how the studio actually operates",
    ],
    stack: ["Next.js", "Supabase", "OpenAI API", "TypeScript", "Vercel"],
    year: "2025",
    live: true,
    url: "https://app.tweakandbuild.com",
    image: "/visual-proof/tweak-os/dashboard.webp",
    gallery: [
      "/visual-proof/tweak-os/dashboard.webp",
      "/visual-proof/tweak-os/discover.webp",
      "/visual-proof/tweak-os/leads.webp",
      "/visual-proof/tweak-os/pipeline.webp",
      "/visual-proof/tweak-os/proposals.webp",
      "/visual-proof/tweak-os/proposals-02.webp",
      "/visual-proof/tweak-os/recent-proposals.webp",
      "/visual-proof/tweak-os/log-in.webp",
    ],
    proofBadges: ["AI Workflows", "Lead Generation", "CRM Logic"],
    metricBadge: "Sales process centralized",
    accent: "violet",
  },
  {
    slug: "autofivestar",
    title: "AutoFiveStar",
    category: "Reputation Management SaaS",
    tagline:
      "Reputation management SaaS for dealerships and local service businesses.",
    description:
      "AutoFiveStar was built as a focused SaaS platform for businesses that need a simple way to turn completed jobs, vehicle sales, and service visits into consistent review opportunities. The system is designed to request reviews, route unhappy feedback privately, and give teams a repeatable workflow for improving online reputation.",
    challenge:
      "Local businesses often rely on random review requests, manual follow-up, or staff remembering to ask customers at the right time. That creates missed reviews, inconsistent reputation growth, and no clean system for handling unhappy customers before they post publicly.",
    solution:
      "Tweak & Build built AutoFiveStar as a focused review-management SaaS platform — with review request workflows, customer feedback capture, private negative-feedback routing, a Google review CTA flow, a business-facing dashboard foundation, a subscription-ready product structure, and a clean landing page and conversion path.",
    problem:
      "Random review requests and manual follow-up. Missed reviews and no system for handling unhappy customers before they post publicly.",
    solutionShort:
      "Built a review-automation SaaS with feedback routing, Google review capture, and a dashboard-ready reputation workflow.",
    impactShort:
      "Reputation follow-up turned into a repeatable system instead of memory and one-off texts.",
    impact: "Reputation follow-up system built",
    results: [
      "Automated customer review request workflow",
      "Private negative-feedback routing before public reviews",
      "Google review capture CTA flow",
      "Business-facing dashboard foundation",
      "Subscription-ready SaaS product structure",
    ],
    stack: ["Next.js", "Supabase", "TypeScript", "Stripe", "Vercel"],
    year: "2025",
    live: true,
    url: "https://www.autofivestar.com",
    image: "/work/autofivestar/autofivestar-01.jpg",
    gallery: [
      "/work/autofivestar/autofivestar-01.jpg",
      "/work/autofivestar/autofivestar-02.jpg",
      "/work/autofivestar/autofivestar-03.jpg",
      "/work/autofivestar/autofivestar-04.jpg",
      "/work/autofivestar/autofivestar-05.jpg",
      "/work/autofivestar/autofivestar-06.jpg",
    ],
    proofBadges: ["Review Automation", "SaaS Platform", "Google Reviews"],
    metricBadge: "Reputation follow-up system built",
    accent: "cyan",
  },
  {
    slug: "jerseypantry",
    title: "JerseyPantry.com",
    category: "Local E-Commerce / Food Brand",
    tagline:
      "Local commerce experience built for product discovery and trust.",
    description:
      "Built a local commerce experience focused on product discovery, brand trust, mobile shopping, and a cleaner path from visitor to customer.",
    challenge:
      "JerseyPantry needed a brand-first commerce site that felt local and trustworthy while still being easy to shop on a phone.",
    solution:
      "We built a mobile-first commerce experience with product discovery, brand trust signals, and a cleaner visitor-to-customer path. The result feels like a real local brand, not a template.",
    problem:
      "Local food brand needed a real commerce site, not a generic template.",
    solutionShort:
      "Mobile-first local commerce build with product discovery and a cleaner buying path.",
    impactShort:
      "Customer journey improved end to end. Brand trust visible from the first scroll.",
    impact: "Customer journey improved",
    results: [
      "Mobile-first storefront optimized for phone shopping",
      "Product discovery and trust signals woven into every page",
      "Cleaner path from first visit to checkout",
    ],
    stack: ["Next.js", "Tailwind CSS", "Stripe", "Vercel"],
    year: "2025",
    live: true,
    url: "https://jerseypantry.com",
    image: "/visual-proof/jerseypantry/hero.jpg",
    gallery: [
      "/visual-proof/jerseypantry/hero.jpg",
      "/visual-proof/jerseypantry/inventory.jpg",
      "/visual-proof/jerseypantry/cart.jpg",
      "/visual-proof/jerseypantry/refill.jpg",
      "/visual-proof/jerseypantry/wholesale.jpg",
      "/visual-proof/jerseypantry/footer.jpg",
    ],
    proofBadges: ["Local Brand", "E-Commerce Ready", "Mobile First"],
    metricBadge: "Customer journey improved",
    accent: "amber",
  },
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
    impactShort: "Quote time: 48hrs → 60sec. Orders up 35% in month one.",
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
    impactShort: "Lead response dropped from 4 hours to 15 minutes.",
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
    image: "/proof/leadsandsaas/home.png",
    gallery: [
      "/proof/leadsandsaas/home.png",
      "/proof/leadsandsaas/overview.png",
      "/proof/leadsandsaas/agents.png",
      "/proof/leadsandsaas/billing.png",
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
    tagline:
      "Planned patient portal concept for multi-location clinics.",
    description:
      "An upcoming healthcare portal concept focused on patient scheduling, intake flows, and a smoother digital experience for multi-location clinics.",
    challenge:
      "Multi-location clinics still lean on phone-based scheduling and paper intake. The concept explores what a modern patient portal could look like end to end.",
    solution:
      "A planned patient-facing portal with calendar-driven scheduling, digital intake, and a staff dashboard for managing appointments across locations.",
    problem:
      "Phone-based scheduling and paper intake slow down both patients and front-desk staff.",
    solutionShort:
      "Concept portal with calendar scheduling, digital intake, and a multi-location staff dashboard.",
    impactShort: "Concept build — showcase in progress.",
    impact: "Concept build in progress",
    results: [
      "Patient-facing scheduling and intake flow",
      "Staff dashboard for multi-location appointment management",
      "Reminder and notification flows designed in",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Twilio", "Vercel"],
    year: "2025",
    status: "coming-soon",
  },
  {
    slug: "atlas-freight",
    title: "Atlas Freight",
    category: "Landing Page + CRM",
    tagline:
      "Concept logistics landing page with a quote-to-CRM flow.",
    description:
      "A logistics landing page and quote-flow concept designed to show how freight companies can capture leads, qualify requests, and route them into a CRM.",
    challenge:
      "Most freight operators send paid traffic to a phone number and a generic page. The concept explores a real lead-capture and qualification path instead.",
    solution:
      "A planned high-converting landing page paired with a step-by-step quote builder. Submissions are designed to flow into a CRM with qualification fields and routing in mind.",
    problem:
      "Logistics sites typically have no online lead capture and no CRM connection for paid traffic.",
    solutionShort:
      "Concept landing page with a quote builder designed to feed a CRM.",
    impactShort: "Concept build — showcase in progress.",
    impact: "Concept build in progress",
    results: [
      "Interactive quote builder for freight requests",
      "Lead capture and qualification fields designed in",
      "CRM-ready submission flow planned",
    ],
    stack: ["React", "TypeScript", "HubSpot API", "Vercel", "Analytics"],
    year: "2025",
    status: "concept",
  },
  {
    slug: "voltgrid",
    title: "VoltGrid",
    category: "Mobile Game",
    tagline:
      "Arcade-style grid runner built for responsive full-screen mobile gameplay.",
    description:
      "VoltGrid is a fast-paced arcade-style web game built to feel sharp, responsive, and visually alive across mobile and desktop. The focus was on full-screen gameplay, tight controls, energetic feedback, and a polished presentation that makes the experience feel intentional from the first tap.",
    challenge:
      "Most browser-based game concepts feel rough on mobile because they waste screen space, scale badly, or lose responsiveness once gameplay gets intense. The challenge was to make VoltGrid feel clean, fast, and immersive across different screen sizes.",
    solution:
      "We designed VoltGrid as a mobile-friendly, full-screen game experience with responsive controls, cleaner layout behavior, stronger visual feedback, and a tighter gameplay presentation. The result is a more polished and engaging arcade experience that feels better to play on both phones and desktops.",
    problem:
      "Typical browser game prototypes feel clunky on mobile, waste space, and break immersion with weak responsiveness and rough presentation.",
    solutionShort:
      "Built a responsive full-screen arcade game with polished controls and stronger mobile gameplay.",
    impactShort:
      "Full-screen mobile gameplay with stronger visual polish and responsiveness.",
    impact: "Full-screen mobile gameplay",
    results: [
      "Responsive gameplay across mobile and desktop",
      "Cleaner full-screen presentation and game feel",
      "Improved visual feedback and interaction polish",
    ],
    stack: ["Next.js", "TypeScript", "Canvas", "Tailwind CSS"],
    year: "2025",
    live: false,
    image: "/proof/voltgrid/gameplay-5.png",
    video: "/proof/voltgrid/gameplay-demo.mp4",
    poster: "/proof/voltgrid/gameplay-5.png",
    gallery: [
      "/proof/voltgrid/gameplay-1.jpg",
      "/proof/voltgrid/gameplay-2.jpg",
      "/proof/voltgrid/gameplay-3.jpg",
      "/proof/voltgrid/gameplay-4.png",
      "/proof/voltgrid/gameplay-5.png",
      "/proof/voltgrid/gameplay-6.png",
    ],
  },
];

export const services = [
  {
    icon: "Rocket" as const,
    title: "Web Applications",
    tagline: "Full-stack products that run your business",
    desc: "From SaaS dashboards to internal tools. Auth, payments, real-time data, and the custom logic that makes your product actually work.",
    tags: ["Next.js", "React", "Tailwind UI", "Supabase", "Stripe"],
    gradient: "from-v/[0.08] to-cyan/[0.03]",
  },
  {
    icon: "Zap" as const,
    title: "Landing Pages & Funnels",
    tagline: "Pages that turn traffic into revenue",
    desc: "Conversion-engineered from the first pixel. Fast load, sharp messaging, strategic CTAs. Built to make your ad spend work harder.",
    tags: ["Tailwind UI", "SEO", "A/B Testing", "Analytics"],
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
    features: [
      "1 responsive page",
      "Contact form",
      "SEO fundamentals",
      "Mobile optimized",
      "1 revision round",
    ],
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
    features: [
      "Up to 5 pages",
      "CMS integration",
      "Lead capture forms",
      "Analytics setup",
      "2 revision rounds",
      "Basic SEO",
    ],
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
    features: [
      "Up to 12 pages",
      "CMS + blog",
      "Advanced forms + SEO",
      "E-commerce ready",
      "3 revision rounds",
      "30 day support",
    ],
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
    quote:
      "We needed a working platform for an investor demo and they delivered in under a week. It looked and felt like something that had been in development for months.",
    name: "David Morales",
    title: "CTO, LeadsAndSaaS",
    project: "SaaS Platform",
    engagement: "Sub-1-week build",
    result: "Demo-ready for investor meeting",
  },
  {
    quote:
      "Our old quoting process was 48 hours of back-and-forth emails. Now customers get pricing in 60 seconds and check out on the spot. Orders jumped 35% the first month.",
    name: "Ryan Torres",
    title: "Founder, Create3DParts",
    project: "E-Commerce Platform",
    engagement: "Fixed-price engagement",
    result: "Quote time: 48hrs → 60sec",
  },
  {
    quote:
      "We'd already burned through two agencies before finding Tweak & Build. They scoped it cleanly, hit every milestone, and we never had to chase for an update.",
    name: "Priya Patel",
    title: "Founder, voltgrid",
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
  { name: "Node.js", color: "#68A063" },
  { name: "Vercel", color: "#fff" },
  { name: "Tailwind UI", color: "#38BDF8" },
];

export const metrics = [
  { value: "48hrs → 60sec", label: "Quote-to-checkout" },
  { value: "<1 week", label: "Fastest product shipped" },
  { value: "<4hr", label: "Avg. response time" },
  { value: "100%", label: "Code ownership" },
];

export const recentLaunches = [
  {
    name: "Create3DParts.com",
    type: "E-Commerce",
    status: "live",
    result: "Orders up 35%",
  },
  {
    name: "LeadsAndSaaS",
    type: "SaaS Platform",
    status: "live",
    result: "Shipped in under a week",
  },
  {
    name: "Meridian Health",
    type: "Web App",
    status: "shipped",
    result: "No-shows down 40%",
  },
];

export const differentiators = [
  {
    title: "Senior-led execution",
    desc: "No revolving door of junior devs. Your project is led by experienced engineers who've shipped real products - not managed from a distance.",
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
  {
    label: "Founders & CEOs",
    desc: "Building your first product or rebuilding for scale",
  },
  {
    label: "Local businesses",
    desc: "Need a premium web presence that converts",
  },
  {
    label: "Service companies",
    desc: "Want lead capture and automation that works",
  },
  {
    label: "Early-stage startups",
    desc: "Ship fast without hiring a full team",
  },
  {
    label: "E-commerce brands",
    desc: "Custom storefronts that outperform templates",
  },
];

export const faqs = [
  {
    q: "What's the difference between Rapid Build and Custom Engineering?",
    a: "Rapid Build is our flat-rate service for when you have a design, wireframes, or a clear spec - we implement what you provide, typically in 1–3 weeks. Custom Engineering is for projects that need strategy, architecture, and full-cycle development from scratch. Different starting points, same quality and the same team.",
  },
  {
    q: "How do payments work?",
    a: "Rapid Builds under $5,000 are typically paid upfront. Larger Rapid Builds split 50/50. Custom Engineering projects follow milestone billing: 40% to begin, 30% at the midpoint, and 30% before final launch and handoff. Growth Retainers are billed monthly with no long-term contract. You always know exactly what you owe and when.",
  },
  {
    q: "When do I get the source code and files?",
    a: "Full source code, repository access, credentials, and all documentation transfer to you after final payment. This is standard for every engagement - you own 100% of what we build.",
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
    a: "We respond within one business day - usually within a few hours. For Rapid Builds, we confirm scope and send an invoice. For Custom Engineering projects, we schedule a 30-minute strategy call to understand your goals before writing a proposal.",
  },
  {
    q: "How many revision rounds do I get?",
    a: "Rapid Builds include 1–3 revision rounds depending on scope. Custom Engineering projects include revisions at each milestone checkpoint - we work iteratively with weekly demos so there are no surprises at the end. Growth Retainer clients get continuous iteration as part of the monthly engagement.",
  },
  {
    q: "What does a Custom Engineering project typically cost?",
    a: "Custom Engineering projects range from $8,000 to $30,000+ depending on scope and complexity. You'll receive a fixed-price proposal with every feature, milestone, and dollar defined before we write a single line of code. No hourly billing, no estimates that balloon later.",
  },
  {
    q: "What's included in a Growth Retainer?",
    a: "A dedicated monthly budget for ongoing development - feature builds, bug fixes, performance improvements, and priority support. We work in weekly iterations so you see continuous progress. No long-term contracts. Cancel anytime with 30 days notice.",
  },
  {
    q: "What happens after launch?",
    a: "Every engagement includes post-launch support (14 to 30 days depending on scope). Growth Retainers are available for ongoing development and iteration. For businesses that want more traffic and conversions, our Growth Engine provides ongoing SEO, landing page expansion, and conversion optimization on a monthly basis.",
  },
  {
    q: "What's included in the Growth Engine?",
    a: "The Growth Engine is a monthly engagement focused on driving qualified traffic and improving conversion. It includes SEO foundation and technical fixes, landing page expansion, content and keyword strategy, conversion rate optimization, analytics and reporting, local search visibility, and ongoing growth experiments. It's strategy-led and measured monthly - not a set-it-and-forget-it SEO package.",
  },
  {
    q: "Who is this best for?",
    a: "Founders, small business owners, and early-stage startups who need a professional web presence or custom product built by senior engineers. If you value quality, clear communication, and getting it right the first time - we're a good fit.",
  },
];

export const budgetOptions = [
  "Under $5k",
  "$5k to $10k",
  "$10k to $25k",
  "$25k+",
  "Not sure",
];
export const timelineOptions = [
  "ASAP",
  "1 to 2 months",
  "2 to 4 months",
  "Flexible",
];
