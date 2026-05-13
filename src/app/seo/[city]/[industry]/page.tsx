import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import { SEED_METROS, SEED_INDUSTRIES } from "@/lib/openclaw/seeds";
import {
  allGeoSlugs,
  fallbackGeoContent,
  geoSlug,
  type GeoPageContent,
} from "@/lib/openclaw/geo-content";
import { INDUSTRY_LABELS, type ProspectIndustry } from "@/lib/openclaw/types";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { MarketingShell } from "@/components/marketing-shell";

const SITE_URL = "https://www.tweakandbuild.com";

export const revalidate = 86400;
export const dynamicParams = false;

interface PageParams {
  params: Promise<{ city: string; industry: string }>;
}

export async function generateStaticParams() {
  return allGeoSlugs().map(({ city, state, industry }) => ({
    city: `${city.toLowerCase().replace(/\s+/g, "-")}-${state.toLowerCase()}`,
    industry,
  }));
}

function resolveMetro(citySlug: string): { city: string; state: string } | null {
  const match = SEED_METROS.find(
    (m) => `${m.city.toLowerCase().replace(/\s+/g, "-")}-${m.state.toLowerCase()}` === citySlug
  );
  return match || null;
}

function isIndustry(value: string): value is ProspectIndustry {
  return (SEED_INDUSTRIES as readonly string[]).includes(value);
}

async function loadContent(
  city: string,
  state: string,
  industry: ProspectIndustry
): Promise<GeoPageContent> {
  try {
    const supabase = createServiceClient();
    const slug = geoSlug(city, state, industry);
    const { data } = await supabase
      .from("geo_pages")
      .select("content")
      .eq("slug", slug)
      .maybeSingle();
    if (data?.content) return data.content as GeoPageContent;
  } catch {
    // Supabase env may be missing during build — fall back.
  }
  return fallbackGeoContent(city, state, industry);
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { city: citySlug, industry } = await params;
  const metro = resolveMetro(citySlug);
  if (!metro || !isIndustry(industry)) return {};
  const label = INDUSTRY_LABELS[industry];
  const title = `${label} Web Design in ${metro.city}, ${metro.state} | Tweak & Build`;
  const description = `Conversion-focused websites for ${label.toLowerCase()} in ${metro.city}, ${metro.state}. Fast, SEO + GEO ready, launched in weeks.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/seo/${citySlug}/${industry}` },
    openGraph: { title, description, url: `${SITE_URL}/seo/${citySlug}/${industry}` },
  };
}

export default async function GeoPage({ params }: PageParams) {
  const { city: citySlug, industry } = await params;
  const metro = resolveMetro(citySlug);
  if (!metro || !isIndustry(industry)) notFound();

  const content = await loadContent(metro.city, metro.state, industry);
  const label = INDUSTRY_LABELS[industry];

  return (
    <MarketingShell>
      <FAQJsonLd faqs={content.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: `${label} in ${metro.city}`, url: `/seo/${citySlug}/${industry}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Tweak & Build",
            url: `${SITE_URL}/seo/${citySlug}/${industry}`,
            areaServed: { "@type": "City", name: metro.city, address: { "@type": "PostalAddress", addressRegion: metro.state, addressCountry: "US" } },
            serviceType: `Web design for ${label}`,
          }),
        }}
      />

      <section className="mx-auto max-w-page px-5 pt-24 pb-12 sm:px-8 sm:pt-32">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
          {metro.city}, {metro.state} · {label}
        </div>
        <h1 className="mt-3 max-w-3xl font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[56px]">
          {content.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.55] text-body">{content.lede}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/contact?city=${encodeURIComponent(metro.city)}&industry=${industry}`} className="btn-v inline-flex items-center gap-2 !text-[14px]">
            Get a free 10-min teardown <ArrowRight size={14} />
          </Link>
          <Link href="/work" className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] text-body transition-colors hover:border-white/[0.16] hover:text-white">
            See recent work
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.valueProps.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <h3 className="font-display text-[15px] font-bold text-white">{v.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <div className="rounded-2xl border border-accent/15 bg-accent/[0.04] p-6 sm:p-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">Local context</div>
          <p className="mt-3 max-w-3xl text-[16px] leading-[1.55] text-white">{content.localProof}</p>
        </div>
      </section>

      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          Frequently asked
        </h2>
        <div className="mt-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {content.faqs.map((faq) => (
            <div key={faq.q} className="grid gap-3 py-6 sm:grid-cols-[280px_1fr] sm:gap-12">
              <h3 className="font-display text-[15px] font-bold text-white">{faq.q}</h3>
              <p className="text-[14px] leading-[1.6] text-body">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-page px-5 py-16 sm:px-8">
        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 sm:p-12">
          <h2 className="max-w-2xl font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[36px]">
            {content.ctaHeadline}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] text-body">
            No pitch deck. No commitment. Just specific feedback on what's costing you leads in {metro.city}.
          </p>
          <div className="mt-6">
            <Link href={`/contact?city=${encodeURIComponent(metro.city)}&industry=${industry}`} className="btn-v inline-flex items-center gap-2 !text-[14px]">
              Book the teardown <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
