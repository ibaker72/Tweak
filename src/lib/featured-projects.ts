export type FeaturedMediaType = "video" | "image";

export interface FeaturedProject {
  slug: string;
  index: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  outcome: string;
  liveUrl: string;
  caseStudyHref: string;
  mediaType: FeaturedMediaType;
  media: string;
  poster?: string;
  accent?: "lime" | "cyan" | "violet" | "amber";
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "tweak-build-os",
    index: "01",
    category: "AI OPERATIONS PLATFORM",
    title: "Tweak & Build OS",
    description:
      "Built an internal AI-powered operating system for lead generation, sales workflows, client tracking, automations, and business process management.",
    tags: ["AI Workflows", "Lead Generation", "CRM Logic"],
    outcome: "Sales process centralized",
    liveUrl: "https://app.tweakandbuild.com",
    caseStudyHref: "/work/tweak-build-os",
    mediaType: "video",
    media: "/work/tweakbuild-os/demo.mp4",
    poster: "/work/tweakbuild-os/poster.jpg",
    accent: "violet",
  },
  {
    slug: "speedway-motors",
    index: "02",
    category: "AUTO DEALER INVENTORY AUTOMATION",
    title: "Speedway Motors",
    description:
      "Built an inventory-driven dealership website with automated vehicle syncing, live listings, image handling, filtering, and database-backed inventory management.",
    tags: ["105+ Vehicles Synced", "Automated Inventory", "Supabase + Cron"],
    outcome: "Manual inventory updates reduced",
    liveUrl: "https://speedwaymotorsllc.com",
    caseStudyHref: "/work/speedway-motors",
    mediaType: "video",
    media: "/work/speedway/demo.mp4",
    poster: "/work/speedway/poster.jpg",
    accent: "cyan",
  },
  {
    slug: "autofivestar",
    index: "03",
    category: "REPUTATION MANAGEMENT SAAS",
    title: "AutoFiveStar",
    description:
      "Built a review automation platform for dealerships and local businesses — with customer follow-up flows, Google review capture, feedback routing, and subscription-ready SaaS infrastructure.",
    tags: ["Review Automation", "SaaS Platform", "Google Reviews"],
    outcome: "Reputation follow-up system built",
    liveUrl: "https://www.autofivestar.com",
    caseStudyHref: "/work/autofivestar",
    mediaType: "image",
    media: "/work/autofivestar/autofivestar-01.png",
    accent: "cyan",
  },
  {
    slug: "pp-mechanical",
    index: "04",
    category: "HVAC WEBSITE + LEAD SYSTEM",
    title: "PP Mechanical",
    description:
      "Built a modern service website for an HVAC company with lead capture, service pages, trust-focused layout, and conversion-focused calls to action.",
    tags: ["Local HVAC Website", "Lead Capture Ready", "Mobile Optimized"],
    outcome: "Website credibility upgraded",
    liveUrl: "https://ppmechanicalllc.com",
    caseStudyHref: "/work/pp-mechanical",
    mediaType: "image",
    media: "/work/ppmechanical/screenshot.jpg",
    accent: "lime",
  },
  {
    slug: "jerseypantry",
    index: "05",
    category: "LOCAL E-COMMERCE / FOOD BRAND",
    title: "JerseyPantry.com",
    description:
      "Built a local commerce experience focused on product discovery, brand trust, mobile shopping, and a cleaner path from visitor to customer.",
    tags: ["Local Brand", "E-Commerce Ready", "Mobile First"],
    outcome: "Customer journey improved",
    liveUrl: "https://jerseypantry.com",
    caseStudyHref: "/work/jerseypantry",
    mediaType: "image",
    media: "/work/jerseypantry/screenshot.jpg",
    accent: "amber",
  },
];
