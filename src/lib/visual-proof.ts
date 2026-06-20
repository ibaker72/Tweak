export type VisualProofAccent = "lime" | "cyan" | "violet" | "amber";

export type VisualProofMediaKind = "image" | "video";

export interface VisualProofMedia {
  src: string;
  type: VisualProofMediaKind;
  label?: string;
}

export interface VisualProofProject {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  outcomes: string[];
  media: VisualProofMedia[];
  accent: VisualProofAccent;
  liveUrl?: string;
  caseStudyHref?: string;
}

const PP_BASE = "/visual-proof/ppmechanical";
const SPEEDWAY_BASE = "/visual-proof/speedwaymotors";
const TWEAK_BASE = "/visual-proof/tweak-os";
const JERSEYPANTRY_BASE = "/visual-proof/jerseypantry";
const AUTOFIVESTAR_BASE = "/work/autofivestar";

export const visualProofProjects: VisualProofProject[] = [
  {
    slug: "pp-mechanical",
    title: "PP Mechanical",
    category: "HVAC Lead Generation Website",
    description:
      "Built a conversion-focused HVAC website designed for emergency service calls, local SEO visibility, lead capture, and mobile-first customer acquisition.",
    tags: ["HVAC Website", "Lead Capture", "Local SEO", "Mobile Optimized"],
    outcomes: [
      "Emergency call conversion",
      "Lead magnet capture",
      "Local SEO page structure",
      "Service area visibility",
      "Mobile click-to-call and text flows",
    ],
    accent: "lime",
    liveUrl: "https://ppmechanicalllc.com",
    caseStudyHref: "/work/pp-mechanical",
    media: [
      { src: `${PP_BASE}/hero.webp`, type: "image", label: "Hero" },
      { src: `${PP_BASE}/service.webp`, type: "image", label: "Service" },
      { src: `${PP_BASE}/lead-magnet.webp`, type: "image", label: "Lead magnet" },
      { src: `${PP_BASE}/emergency.webp`, type: "image", label: "Emergency service" },
      { src: `${PP_BASE}/service-area.webp`, type: "image", label: "Service area" },
      { src: `${PP_BASE}/pagespeed.webp`, type: "image", label: "PageSpeed" },
      { src: `${PP_BASE}/call-us-demo.mp4`, type: "video", label: "Call demo" },
      { src: `${PP_BASE}/text-us-demo.mp4`, type: "video", label: "Text demo" },
    ],
  },
  {
    slug: "speedway-motors",
    title: "Speedway Motors",
    category: "Automotive Dealership Website",
    description:
      "Built a dealership website featuring inventory presentation, trade-in workflows, local SEO pages, trust-building sections, and mobile-first browsing.",
    tags: ["Dealership Website", "Inventory", "Local SEO", "Lead Capture"],
    outcomes: [
      "Inventory presentation",
      "Trade-in flow",
      "Local SEO pages",
      "Trust-building content",
      "Mobile dealership experience",
    ],
    accent: "cyan",
    liveUrl: "https://speedwaymotorsllc.com",
    caseStudyHref: "/work/speedway-motors",
    media: [
      { src: `${SPEEDWAY_BASE}/pagespeed.webp`, type: "image", label: "PageSpeed" },
      { src: `${SPEEDWAY_BASE}/inventory.jpg`, type: "image", label: "Inventory" },
      { src: `${SPEEDWAY_BASE}/financing.jpg`, type: "image", label: "Financing" },
      {
        src: `${SPEEDWAY_BASE}/financing-02.jpg`,
        type: "image",
        label: "Financing options",
      },
      { src: `${SPEEDWAY_BASE}/maps.jpg`, type: "image", label: "Map" },
      { src: `${SPEEDWAY_BASE}/reviews.jpg`, type: "image", label: "Reviews" },
      {
        src: `${SPEEDWAY_BASE}/lead-magnet.jpg`,
        type: "image",
        label: "Lead magnet",
      },
      {
        src: `${SPEEDWAY_BASE}/message-us.jpg`,
        type: "image",
        label: "Client message",
      },
      {
        src: `${SPEEDWAY_BASE}/seo-newark.jpg`,
        type: "image",
        label: "SEO — Newark, NJ",
      },
      {
        src: `${SPEEDWAY_BASE}/seo-clifton.jpg`,
        type: "image",
        label: "SEO — Clifton, NJ",
      },
      { src: `${SPEEDWAY_BASE}/footer.jpg`, type: "image", label: "Footer" },
      { src: `${SPEEDWAY_BASE}/call-us.mp4`, type: "video", label: "Call demo" },
    ],
  },
  {
    slug: "tweak-os",
    title: "Tweak OS",
    category: "AI Sales Platform",
    description:
      "Built an internal business system for finding leads, reviewing prospects, generating proposals, organizing pipelines, and managing sales activity.",
    tags: [
      "AI Lead Gen",
      "Proposal Automation",
      "CRM Workflow",
      "Sales System",
    ],
    outcomes: [
      "Lead generation workflow",
      "CRM pipeline tracking",
      "Proposal automation",
      "Sales workflow organization",
      "Internal AI business system",
    ],
    accent: "violet",
    liveUrl: "https://app.tweakandbuild.com",
    caseStudyHref: "/work/tweak-build-os",
    media: [
      { src: `${TWEAK_BASE}/dashboard.webp`, type: "image", label: "Dashboard" },
      { src: `${TWEAK_BASE}/discover.webp`, type: "image", label: "Lead search" },
      { src: `${TWEAK_BASE}/leads.webp`, type: "image", label: "Leads" },
      { src: `${TWEAK_BASE}/pipeline.webp`, type: "image", label: "CRM pipeline" },
      {
        src: `${TWEAK_BASE}/proposals.webp`,
        type: "image",
        label: "Proposal generator",
      },
      {
        src: `${TWEAK_BASE}/proposals-02.webp`,
        type: "image",
        label: "Proposal result",
      },
      {
        src: `${TWEAK_BASE}/recent-proposals.webp`,
        type: "image",
        label: "Recent proposals",
      },
      {
        src: `${TWEAK_BASE}/log-in.webp`,
        type: "image",
        label: "Login screen",
      },
    ],
  },
  {
    slug: "autofivestar",
    title: "AutoFiveStar",
    category: "Reputation Management SaaS",
    description:
      "Built a SaaS product that helps businesses request reviews, route unhappy feedback privately, manage follow-ups, and strengthen their online reputation.",
    tags: [
      "SaaS Product",
      "Review Requests",
      "Reputation Workflow",
      "Google Review Capture",
    ],
    outcomes: [
      "Automated customer review requests",
      "Private feedback routing before public reviews",
      "Dashboard-ready reputation workflow",
      "Subscription SaaS foundation",
    ],
    accent: "cyan",
    liveUrl: "https://www.autofivestar.com",
    caseStudyHref: "/work/autofivestar",
    media: [
      { src: `${AUTOFIVESTAR_BASE}/autofivestar-01.jpg`, type: "image", label: "Landing page" },
      { src: `${AUTOFIVESTAR_BASE}/autofivestar-02.jpg`, type: "image", label: "Review request" },
      { src: `${AUTOFIVESTAR_BASE}/autofivestar-03.jpg`, type: "image", label: "Feedback routing" },
      { src: `${AUTOFIVESTAR_BASE}/autofivestar-04.jpg`, type: "image", label: "Dashboard" },
      { src: `${AUTOFIVESTAR_BASE}/autofivestar-05.jpg`, type: "image", label: "Workflow" },
      { src: `${AUTOFIVESTAR_BASE}/autofivestar-06.jpg`, type: "image", label: "Reputation overview" },
    ],
  },
  {
    slug: "jerseypantry",
    title: "JerseyPantry",
    category: "Local Same-Day Delivery Storefront",
    description:
      "Built a mobile-first local commerce experience for North Jersey — same-day delivery, ZIP-gated checkout, category browsing, and a clean path from add-to-cart to checkout.",
    tags: [
      "Local Commerce",
      "Same-Day Delivery",
      "Mobile-First",
      "ZIP-Gated Checkout",
    ],
    outcomes: [
      "Mobile-first storefront",
      "Same-day delivery flow",
      "ZIP-gated checkout",
      "Coupon code workflow",
      "Category-first product browsing",
    ],
    accent: "amber",
    liveUrl: "https://jerseypantry.com",
    caseStudyHref: "/work/jerseypantry",
    media: [
      { src: `${JERSEYPANTRY_BASE}/hero.jpg`, type: "image", label: "Hero" },
      {
        src: `${JERSEYPANTRY_BASE}/inventory.jpg`,
        type: "image",
        label: "Menu",
      },
      {
        src: `${JERSEYPANTRY_BASE}/cart.jpg`,
        type: "image",
        label: "Cart",
      },
      {
        src: `${JERSEYPANTRY_BASE}/refill.jpg`,
        type: "image",
        label: "Refill",
      },
      {
        src: `${JERSEYPANTRY_BASE}/wholesale.jpg`,
        type: "image",
        label: "Wholesale",
      },
      {
        src: `${JERSEYPANTRY_BASE}/footer.jpg`,
        type: "image",
        label: "Footer",
      },
    ],
  },
];
