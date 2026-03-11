export interface ComparisonRow {
  category: string;
  them: string;
  us: string;
}

export interface ComparisonPage {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  themLabel: string;
  prosOther: string[];
  consOther: string[];
  prosUs: string[];
  rows: ComparisonRow[];
}

export const comparisons: ComparisonPage[] = [
  {
    slug: "tweak-and-build-vs-freelancer",
    title: "Hiring a Freelancer vs Working with Tweak & Build",
    subtitle: "Both can deliver — but the experience and guarantees differ.",
    description:
      "Compare freelance developers with Tweak & Build's studio model. Side-by-side comparison of cost, quality, communication, and what you own when it's done.",
    themLabel: "Freelancer",
    prosOther: [
      "Often the most affordable option",
      "Direct communication, no layers",
      "Flexible availability for small tasks",
    ],
    consOther: [
      "Quality varies dramatically — no brand reputation at stake",
      "Single point of failure — if they get sick or disappear, you're stuck",
      "Scope creep is common with hourly billing",
      "Rarely includes strategy, SEO, or post-launch support",
      "You manage the project end-to-end",
    ],
    prosUs: [
      "Senior engineers with a portfolio you can verify",
      "Fixed pricing — know the cost before any work starts",
      "Full-service: strategy, design, development, SEO, deployment",
      "Structured milestones with weekly progress demos",
      "Post-launch support included in every engagement",
      "100% code ownership and documented handoff",
    ],
    rows: [
      { category: "Cost", them: "$1K–$8K (hourly, varies widely)", us: "$1,497–$5,997 (fixed, published)" },
      { category: "Timeline", them: "Unpredictable — depends on availability", us: "1–5 weeks, scoped upfront" },
      { category: "Quality", them: "Depends entirely on the individual", us: "Consistent — same team, same standards" },
      { category: "Communication", them: "Direct but unstructured", us: "Direct + weekly demos and milestones" },
      { category: "Code Ownership", them: "Usually yes, but verify the contract", us: "100% yours — always" },
      { category: "Scalability", them: "Limited by one person's capacity", us: "Studio capacity with structured workflows" },
      { category: "Accountability", them: "No brand reputation at stake", us: "Public portfolio and testimonials" },
    ],
  },
  {
    slug: "tweak-and-build-vs-agency",
    title: "Traditional Agency vs Tweak & Build",
    subtitle: "Big agencies have their place — but most small businesses don't need them.",
    description:
      "Compare traditional agencies with Tweak & Build. See how cost, timeline, communication, and deliverables stack up side by side.",
    themLabel: "Traditional Agency",
    prosOther: [
      "Large teams can handle complex enterprise projects",
      "Established processes for large organizations",
      "Full creative services (branding, video, print)",
      "Can scale to very large scopes",
    ],
    consOther: [
      "Expensive — $15K–$50K+ for a standard website",
      "Slow — 2–6 month timelines are typical",
      "Communication goes through account managers, not builders",
      "Often use junior developers on your project",
      "High overhead means you're paying for office space and layers",
    ],
    prosUs: [
      "The person quoting the project builds the project",
      "Fixed pricing at a fraction of agency rates",
      "2–5 week turnaround, not 2–5 months",
      "Senior engineers only — no juniors learning on your dime",
      "Direct Slack/email access to your developer",
      "Same quality, dramatically less overhead",
    ],
    rows: [
      { category: "Cost", them: "$15K–$50K+ (often hourly or retainer)", us: "$1,497–$5,997 (fixed, published)" },
      { category: "Timeline", them: "2–6 months typical", us: "1–5 weeks" },
      { category: "Quality", them: "Varies — senior leads, junior builds", us: "Senior engineers build your project" },
      { category: "Communication", them: "Through project/account managers", us: "Direct to the person building" },
      { category: "Code Ownership", them: "Often restricted or licensed", us: "100% yours — always" },
      { category: "Scalability", them: "Can scale to enterprise", us: "Optimized for startups and SMBs" },
      { category: "Accountability", them: "Diffused across teams", us: "Single point of accountability" },
    ],
  },
  {
    slug: "tweak-and-build-vs-in-house",
    title: "Hiring In-House vs Tweak & Build",
    subtitle: "Building a team is the right long-term play — but timing matters.",
    description:
      "Compare hiring an in-house developer with working with Tweak & Build. Cost, speed to delivery, and when each option makes sense.",
    themLabel: "In-House Hire",
    prosOther: [
      "Deep integration with your team and culture",
      "Available full-time for ongoing iteration",
      "Builds institutional knowledge over time",
      "Ideal for products needing continuous development",
    ],
    consOther: [
      "Expensive — $80K–$150K+ salary plus benefits, equipment, management",
      "Slow to hire — 2–4 months to find and onboard the right person",
      "Single point of failure until you build a team",
      "You manage the person, not just the project",
      "Risk of a bad hire is high and costly",
    ],
    prosUs: [
      "Start building immediately — no recruiting or onboarding",
      "Pay for the project, not a salary",
      "Senior-level work from day one",
      "No management overhead — we handle the process",
      "Ideal for defined projects with clear deliverables",
      "Transition to in-house later with full code ownership",
    ],
    rows: [
      { category: "Cost", them: "$80K–$150K+/year (salary + overhead)", us: "$1,497–$25K per project" },
      { category: "Timeline", them: "2–4 months to hire, then build starts", us: "Build starts in 48 hours" },
      { category: "Quality", them: "Depends on who you hire", us: "Proven track record with live projects" },
      { category: "Communication", them: "Daily standups, full integration", us: "Weekly demos, async updates" },
      { category: "Code Ownership", them: "Yours (work for hire)", us: "100% yours — always" },
      { category: "Scalability", them: "Hire more people (expensive)", us: "Engage per-project as needed" },
      { category: "Accountability", them: "Performance reviews, management", us: "Deliverable-based milestones" },
    ],
  },
];

export function getComparison(slug: string): ComparisonPage | null {
  return comparisons.find((c) => c.slug === slug) || null;
}
