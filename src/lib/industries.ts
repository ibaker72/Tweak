export interface IndustryService {
  title: string;
  description: string;
  icon: string;
}

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryFaq {
  q: string;
  a: string;
}

export interface IndustryPainPoint {
  title: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  heroKeyword: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  problemStatement: string;
  solutionStatement: string;
  painPoints: IndustryPainPoint[];
  services: IndustryService[];
  stats: IndustryStat[];
  faqs: IndustryFaq[];
  ctaHeadline: string;
  ctaSubtext: string;
}

export const industries: Industry[] = [
  {
    slug: "dealerships",
    name: "Auto Dealerships",
    shortName: "Dealerships",
    heroKeyword: "car dealership web design",
    headline: "Websites that move inventory — not just look good",
    subheadline:
      "We build high-converting digital experiences for auto dealerships: live inventory pages, lead capture systems, and appointment booking that drives real floor traffic.",
    metaTitle: "Web Design for Car Dealerships | Tweak & Build",
    metaDescription:
      "Premium web design and development for auto dealerships. Inventory pages, lead capture, VDP templates, and appointment booking built to convert. Get a free site audit.",
    problemStatement:
      "Most dealership websites are slow, hard to navigate on mobile, and leak leads. Shoppers land on your inventory, can't find what they want, and bounce before talking to anyone.",
    solutionStatement:
      "We engineer dealership websites that load fast, display inventory clearly, and push every visitor toward a conversion — whether that's a quote request, test drive booking, or a call to the floor.",
    painPoints: [
      {
        title: "Inventory that's impossible to search",
        description:
          "Generic templates with clunky filters frustrate buyers. They leave before your sales team ever gets a chance.",
      },
      {
        title: "Zero mobile optimization",
        description:
          "Over 70% of auto shoppers browse on mobile. If your VDPs don't load fast and display clearly on a phone, you're losing deals.",
      },
      {
        title: "No online lead capture",
        description:
          "If your only CTA is a phone number, you're missing every after-hours shopper and every buyer who prefers digital-first communication.",
      },
      {
        title: "Outdated branding that erodes trust",
        description:
          "A dated site signals a dated dealership. Premium buyers make judgments in seconds — your website is your first impression.",
      },
    ],
    services: [
      {
        title: "Inventory display & search",
        description:
          "Fast, filterable inventory pages with photo carousels, spec sheets, and VDP templates built for conversion — not just display.",
        icon: "Car",
      },
      {
        title: "Lead capture & CRM integration",
        description:
          "Quote request forms, trade-in tools, and financing applications that sync directly to your CRM (VinSolutions, DealerSocket, HubSpot).",
        icon: "Target",
      },
      {
        title: "Online appointment booking",
        description:
          "Real-time test drive and service scheduling that reduces phone volume and captures leads 24/7 — even when your team is off the floor.",
        icon: "CalendarCheck",
      },
      {
        title: "Performance & local SEO",
        description:
          "Core Web Vitals optimization, schema markup for vehicles, and Google Business Profile integration to rank for local inventory searches.",
        icon: "TrendingUp",
      },
    ],
    stats: [
      { value: "3.2×", label: "more leads vs. template sites" },
      { value: "< 1.5s", label: "page load on mobile" },
      { value: "58%", label: "reduction in cost per lead" },
      { value: "24/7", label: "automated lead capture" },
    ],
    faqs: [
      {
        q: "Do you integrate with our existing DMS or CRM?",
        a: "Yes. We integrate with the major dealership CRMs and DMSes — VinSolutions, DealerSocket, HubSpot, and more. Lead data flows directly into your existing workflows without manual entry.",
      },
      {
        q: "Can you work with our inventory feed?",
        a: "We can pull from your inventory management system and display it with fast, filterable VDP pages. If you use a custom feed or CSV export, we'll build a parser that keeps your listings up to date automatically.",
      },
      {
        q: "How long does a dealership site build take?",
        a: "A full dealership site — inventory pages, lead capture, appointment booking, and CRM integration — typically takes 3–5 weeks. Simpler builds with fewer integrations can be done in 2 weeks.",
      },
      {
        q: "Will it work well on mobile?",
        a: "Mobile-first is non-negotiable. We design for the phone experience first and ensure every VDP, search filter, and lead form performs at full speed on mobile devices.",
      },
      {
        q: "What about SEO for local inventory searches?",
        a: "We implement vehicle schema markup, optimized title tags for make/model/year searches, and structured data that helps your inventory pages appear in Google Shopping and local search results.",
      },
      {
        q: "How much does a dealership website cost?",
        a: "Our builds start at $2,997 for a focused inventory + lead capture site and go up to $5,997+ for full multi-rooftop builds with advanced CRM integration and booking systems. Every project gets a fixed quote upfront.",
      },
    ],
    ctaHeadline: "See what your current site is leaving on the table",
    ctaSubtext:
      "Run a free audit on your dealership website. We'll show you exactly what's costing you leads — no sales call required.",
  },
  {
    slug: "insurance",
    name: "Insurance Agencies",
    shortName: "Insurance",
    heroKeyword: "insurance agency website developer",
    headline: "Modern websites for insurance agencies that want more clients",
    subheadline:
      "We build insurance agency websites with online quote tools, client portals, and document management — so your team spends time closing, not answering basic questions.",
    metaTitle: "Web Design for Insurance Agencies | Tweak & Build",
    metaDescription:
      "Professional website design and development for insurance agencies. Online quote calculators, client portals, and renewal systems built to grow your book of business.",
    problemStatement:
      "Most insurance agency websites are static brochures with a contact form. They don't answer questions, don't capture leads after hours, and don't help clients self-serve — which means your staff is fielding the same calls on repeat.",
    solutionStatement:
      "We build agency websites that do the heavy lifting: interactive quote tools that pre-qualify leads, client portals for policy access and document uploads, and renewal reminders that keep clients from shopping around.",
    painPoints: [
      {
        title: "No online quoting",
        description:
          "Prospects want a number before they'll talk to anyone. Without an online quote tool, you're invisible to the biggest segment of modern insurance buyers.",
      },
      {
        title: "Clients who can't self-serve",
        description:
          "Every call asking 'can you resend my policy docs?' or 'when does my renewal come up?' is time your producers aren't spending on revenue.",
      },
      {
        title: "Zero trust signals online",
        description:
          "Carrier logos, reviews, certifications, and client testimonials — if they're not prominently displayed, you're losing to agencies that show them.",
      },
      {
        title: "Leads that disappear overnight",
        description:
          "If your site doesn't capture and follow up with after-hours inquiries automatically, those leads are going to a competitor who does.",
      },
    ],
    services: [
      {
        title: "Online quote calculator",
        description:
          "Multi-step quote forms for auto, home, commercial, or specialty lines. Captures lead data upfront and routes to the right producer — all before a single phone call.",
        icon: "Calculator",
      },
      {
        title: "Client self-service portal",
        description:
          "Authenticated portal where clients access policy docs, submit claims, upload documents, and request changes — dramatically reducing inbound support volume.",
        icon: "ShieldCheck",
      },
      {
        title: "Renewal & follow-up automation",
        description:
          "Automated renewal reminders and cross-sell sequences that keep clients engaged and reduce attrition — built on top of your existing CRM or email platform.",
        icon: "RefreshCw",
      },
      {
        title: "Trust-forward design",
        description:
          "Carrier badge integration, Google review feeds, producer bios, and compliance-safe layouts that convert visitors who landed cold into warm prospects.",
        icon: "Star",
      },
    ],
    stats: [
      { value: "40%", label: "reduction in inbound support calls" },
      { value: "2.7×", label: "more qualified quote requests" },
      { value: "< 2 weeks", label: "average launch time" },
      { value: "100%", label: "branded + compliance-ready" },
    ],
    faqs: [
      {
        q: "Can you build a quote tool for our specific lines of insurance?",
        a: "Yes. We build multi-step quote forms tailored to your lines — auto, home, commercial, life, or specialty. The form collects the right data upfront to pre-qualify leads and route them to the correct producer.",
      },
      {
        q: "Does the client portal work with our agency management system?",
        a: "We integrate with major AMS platforms. Even if you use a proprietary system, we can build a lightweight portal that syncs policy data via API or secure data exports.",
      },
      {
        q: "How do you handle compliance and regulatory requirements?",
        a: "We work with your compliance requirements from day one — required disclosures, state licensing display, carrier branding rules, and privacy policy standards are all built into the design and copy.",
      },
      {
        q: "Can clients upload documents through the site?",
        a: "Yes. The client portal includes secure document upload and storage, so clients can submit claims, renewal paperwork, and ID documents without emailing or faxing.",
      },
      {
        q: "Will you write the content or do we provide it?",
        a: "We handle the UX copy and page structure. For highly specific product descriptions or coverage explanations, we'll work from your existing materials or a brief you provide.",
      },
      {
        q: "What does an insurance agency website cost?",
        a: "A standard agency site with quote forms and trust-forward design starts at $2,997. A full build with client portal and automation integration is typically $5,997. All pricing is fixed — no hourly billing.",
      },
    ],
    ctaHeadline: "Find out what your website is costing you in leads",
    ctaSubtext:
      "Run a free audit on your insurance agency site. We'll identify every conversion leak — quote tool gaps, trust signal failures, and mobile issues — in under a minute.",
  },
  {
    slug: "service-businesses",
    name: "Service Businesses",
    shortName: "Service Businesses",
    heroKeyword: "HVAC plumbing service business website developer",
    headline: "Built-to-book websites for service businesses",
    subheadline:
      "We build websites for HVAC, plumbing, electrical, cleaning, and other service businesses that turn local search traffic into booked jobs — with online scheduling, estimate tools, and local SEO baked in.",
    metaTitle: "Web Design for Service Businesses | HVAC, Plumbing & More | Tweak & Build",
    metaDescription:
      "Professional website design for HVAC, plumbing, cleaning, and service businesses. Online booking, estimate calculators, and local SEO to turn search traffic into jobs.",
    problemStatement:
      "Most service business websites are either nonexistent, a Facebook page, or a 5-year-old site that doesn't rank locally and has no way to book online. Every one of those is costing you jobs to competitors with better digital presence.",
    solutionStatement:
      "We build service business websites that rank locally, load fast, and push visitors straight to booking or requesting an estimate — capturing demand you're already paying Google to send you.",
    painPoints: [
      {
        title: "Invisible in local search",
        description:
          "If you're not in the Local Pack and your site isn't optimized for '[service] in [city]', you're losing jobs to companies with worse reputations but better SEO.",
      },
      {
        title: "No way to book online",
        description:
          "When a pipe bursts at 9pm, customers want to book someone — not leave a voicemail. Without online scheduling, those emergency calls go to whoever shows up in search.",
      },
      {
        title: "Weak or missing social proof",
        description:
          "Google reviews, before/after photos, and project galleries build instant trust. If your site doesn't show them prominently, you're losing the trust battle before the phone rings.",
      },
      {
        title: "Terrible mobile experience",
        description:
          "Over 80% of local service searches happen on mobile. A slow, hard-to-navigate mobile site means your ad spend and organic traffic are wasted.",
      },
    ],
    services: [
      {
        title: "Online booking system",
        description:
          "Real-time availability calendar with service type selection, location capture, and automated confirmation emails — so you capture jobs even while you're on a call.",
        icon: "CalendarCheck",
      },
      {
        title: "Estimate request & quote tools",
        description:
          "Interactive estimate calculators for common jobs that pre-qualify the lead and set pricing expectations before your team picks up the phone.",
        icon: "ClipboardList",
      },
      {
        title: "Local SEO foundation",
        description:
          "Optimized service area pages, LocalBusiness schema markup, Google Business Profile integration, and technical SEO to rank for high-intent local searches.",
        icon: "MapPin",
      },
      {
        title: "Reviews & trust integration",
        description:
          "Live Google review feeds, project photo galleries, certifications display, and service guarantee callouts that build credibility at a glance.",
        icon: "Star",
      },
    ],
    stats: [
      { value: "80%+", label: "of service searches happen on mobile" },
      { value: "35%", label: "more booked jobs with online scheduling" },
      { value: "< 2s", label: "page load time on mobile" },
      { value: "Top 3", label: "local pack ranking potential" },
    ],
    faqs: [
      {
        q: "Do you build sites for specific trades (HVAC, plumbing, electrical, cleaning)?",
        a: "Yes — we build for all home and commercial service trades. HVAC, plumbing, electrical, cleaning, landscaping, pest control, roofing, and more. Each site is built with trade-specific service pages, local SEO, and appropriate trust signals for that industry.",
      },
      {
        q: "Can customers book appointments through the site?",
        a: "Yes. We integrate online booking with real-time availability — either through a third-party scheduler you already use (like Jobber, ServiceTitan, or Calendly) or a custom booking form that emails and texts your team instantly.",
      },
      {
        q: "How does local SEO work and will it actually help us rank?",
        a: "We implement technical local SEO: LocalBusiness and Service schema markup, service area pages optimized for '[service] in [city]' searches, and proper title/meta structure. Combined with your Google Business Profile, this significantly improves your chances of appearing in the Local Pack.",
      },
      {
        q: "We have 50+ Google reviews. Can those show on the site?",
        a: "Absolutely. We integrate a live Google reviews feed so your most recent and highest-rated reviews display automatically — no manual updating required.",
      },
      {
        q: "Do you do ongoing maintenance and updates?",
        a: "We deliver full code ownership — the site is yours. For ongoing updates, content changes, and monthly SEO work, we offer a separate retainer. Most service businesses benefit from seasonal promotions and regular review updates.",
      },
      {
        q: "What does a service business website cost?",
        a: "A focused single-location site with booking and local SEO starts at $1,497. A multi-service, multi-location site with estimate tools and review integration is typically $2,997–$5,997. Fixed pricing, always.",
      },
    ],
    ctaHeadline: "See how many jobs your website is losing",
    ctaSubtext:
      "Run a free audit on your service business site. We'll show you exactly where you're leaking local search traffic and how to fix it.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export const industrySlugs = industries.map((i) => i.slug);
