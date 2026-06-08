export type VisualProofAccent = "lime" | "cyan" | "violet";

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
      { src: `${PP_BASE}/seo-page.webp`, type: "image", label: "Local SEO" },
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
      { src: `${SPEEDWAY_BASE}/hero.webp`, type: "image", label: "Hero" },
      { src: `${SPEEDWAY_BASE}/inventory.webp`, type: "image", label: "Inventory" },
      { src: `${SPEEDWAY_BASE}/trade-in.webp`, type: "image", label: "Trade-in" },
      { src: `${SPEEDWAY_BASE}/stats.webp`, type: "image", label: "Stats" },
      { src: `${SPEEDWAY_BASE}/map.webp`, type: "image", label: "Map" },
      {
        src: `${SPEEDWAY_BASE}/dealership-story.webp`,
        type: "image",
        label: "Dealership story",
      },
      {
        src: `${SPEEDWAY_BASE}/trust-section.webp`,
        type: "image",
        label: "Trust section",
      },
      {
        src: `${SPEEDWAY_BASE}/seo-newark-nj.webp`,
        type: "image",
        label: "SEO — Newark, NJ",
      },
      {
        src: `${SPEEDWAY_BASE}/seo-clifton-nj.webp`,
        type: "image",
        label: "SEO — Clifton, NJ",
      },
      { src: `${SPEEDWAY_BASE}/pagespeed.webp`, type: "image", label: "PageSpeed" },
      {
        src: `${SPEEDWAY_BASE}/client-message.webp`,
        type: "image",
        label: "Client message",
      },
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
      { src: `${TWEAK_BASE}/cover.webp`, type: "image", label: "Cover" },
      { src: `${TWEAK_BASE}/dashboard.webp`, type: "image", label: "Dashboard" },
      { src: `${TWEAK_BASE}/lead-search.webp`, type: "image", label: "Lead search" },
      { src: `${TWEAK_BASE}/crm-pipeline.webp`, type: "image", label: "CRM pipeline" },
      {
        src: `${TWEAK_BASE}/automation-setting.webp`,
        type: "image",
        label: "Automation settings",
      },
      {
        src: `${TWEAK_BASE}/login-screen.webp`,
        type: "image",
        label: "Login screen",
      },
      {
        src: `${TWEAK_BASE}/proposal-generator.webp`,
        type: "image",
        label: "Proposal generator",
      },
      {
        src: `${TWEAK_BASE}/proposal-result.webp`,
        type: "image",
        label: "Proposal result",
      },
    ],
  },
];
