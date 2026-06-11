import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Wrench } from "lucide-react";
import {
  GEO_CITIES,
  GEO_SERVICES,
  SITE_URL,
  STATE_CODE,
  REGION_NAME,
  ORG_NAME,
  geoPagePath,
} from "@/lib/geo-pages";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const TITLE = `North Jersey SEO, Web Design & Local Marketing | ${ORG_NAME}`;
const DESCRIPTION =
  "Tweak & Build builds high-converting websites, local SEO, and lead-generation systems for businesses across North Jersey. Find your city + service.";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/seo` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/seo`,
    siteName: ORG_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

// Featured = first 6 of each, ordered for the cover grid.
const FEATURED_CITIES = ["paterson", "jersey-city", "newark", "morristown", "hackensack", "montclair"];
const FEATURED_SERVICES = ["web-design", "local-seo", "google-business-profile-optimization", "lead-generation"];

export default function GeoHub() {
  const countiesByCity = new Map<string, typeof GEO_CITIES>();
  for (const city of GEO_CITIES) {
    const arr = countiesByCity.get(city.county) || [];
    arr.push(city);
    countiesByCity.set(city.county, arr);
  }
  const counties = Array.from(countiesByCity.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  const featuredCityList = FEATURED_CITIES
    .map((slug) => GEO_CITIES.find((c) => c.slug === slug))
    .filter((c): c is (typeof GEO_CITIES)[number] => Boolean(c));

  const featuredServiceList = FEATURED_SERVICES
    .map((slug) => GEO_SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof GEO_SERVICES)[number] => Boolean(s));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/seo`,
    isPartOf: { "@type": "WebSite", name: ORG_NAME, url: SITE_URL },
    about: {
      "@type": "ProfessionalService",
      name: ORG_NAME,
      url: SITE_URL,
      areaServed: GEO_CITIES.map((c) => ({
        "@type": "City",
        name: c.name,
        address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: STATE_CODE, addressCountry: "US" },
      })),
      serviceType: GEO_SERVICES.map((s) => s.name),
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "SEO", url: "/seo" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-page px-5 pt-24 pb-12 sm:px-8 sm:pt-32">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
          {REGION_NAME} · {GEO_CITIES.length} cities · {GEO_SERVICES.length} services
        </div>
        <h1 className="mt-3 max-w-3xl font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[56px]">
          North Jersey SEO, web design, and lead generation
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.55] text-body">
          Find the right combination of city and service. {ORG_NAME} builds modern websites, local SEO, Google Business Profile systems, and automation for businesses across North Jersey.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-v inline-flex items-center gap-2 !text-[14px]">
            Book a free 20-min call <ArrowRight size={14} />
          </Link>
          <Link
            href="/audit"
            className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] text-body transition-colors hover:border-white/[0.16] hover:text-white"
          >
            Run a free site audit
          </Link>
        </div>
      </section>

      {/* Featured cities */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
            Featured cities
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-body">
            Most requested
          </span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCityList.map((city) => (
            <Link
              key={city.slug}
              href={geoPagePath(city.slug, "web-design")}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-accent/30 hover:bg-accent/[0.04]"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                <MapPin size={12} /> {city.county} County
              </div>
              <h3 className="mt-2 font-display text-[18px] font-bold text-white">
                {city.name}, {STATE_CODE}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-body">{city.blurb}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-[12px] text-accent">
                See {city.name} services <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
            Featured services
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-body">
            Most popular
          </span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServiceList.map((service) => (
            <Link
              key={service.slug}
              href={geoPagePath("paterson", service.slug)}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-accent/30 hover:bg-accent/[0.04]"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                <Wrench size={12} /> Service
              </div>
              <h3 className="mt-2 font-display text-[16px] font-bold text-white">{service.name}</h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-body">{service.metaTagline}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-[12px] text-accent">
                Explore <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All cities by county */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          All cities we serve
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-body">
          {ORG_NAME} is a service-area studio. We work remote-first with businesses across {REGION_NAME}.
        </p>
        <div className="mt-8 space-y-8">
          {counties.map(([county, cities]) => (
            <div key={county}>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                {county} County
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={geoPagePath(city.slug, "web-design")}
                    className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors hover:border-accent/30 hover:bg-accent/[0.04]"
                  >
                    <span className="text-[14px] font-medium text-white">{city.name}</span>
                    <ArrowRight size={12} className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All services */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          All services
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GEO_SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={geoPagePath("paterson", service.slug)}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-accent/30 hover:bg-accent/[0.04]"
            >
              <h3 className="text-[14px] font-medium text-white">{service.name}</h3>
              <p className="mt-1 text-[12px] text-body">{service.metaTagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Full matrix - SEO-strong internal links */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          Browse every city + service combination
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-body">
          {GEO_CITIES.length * GEO_SERVICES.length} landing pages covering every service in every {REGION_NAME} city we serve.
        </p>
        <div className="mt-8 space-y-10">
          {GEO_CITIES.map((city) => (
            <div key={city.slug}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[18px] font-bold text-white">
                  {city.name}, {STATE_CODE}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-body">
                  {city.county} County
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {GEO_SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={geoPagePath(city.slug, service.slug)}
                    className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[12px] text-body transition-colors hover:border-accent/30 hover:bg-accent/[0.04] hover:text-white"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-page px-5 py-16 sm:px-8">
        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 sm:p-12">
          <h2 className="max-w-2xl font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[36px]">
            Not sure where to start?
          </h2>
          <p className="mt-3 max-w-xl text-[15px] text-body">
            Send us your website. We'll send back a 10-minute video teardown — specific feedback on what's costing you leads, no pitch.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-v inline-flex items-center gap-2 !text-[14px]">
              Get the teardown <ArrowRight size={14} />
            </Link>
            <Link
              href="/audit"
              className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] text-body transition-colors hover:border-white/[0.16] hover:text-white"
            >
              Run a free audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
