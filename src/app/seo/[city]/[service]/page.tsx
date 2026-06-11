import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import {
  GEO_CITIES,
  GEO_SERVICES,
  SITE_URL,
  STATE_CODE,
  ORG_NAME,
  REGION_NAME,
  getCity,
  getService,
  geoPagePath,
  geoPageSlug,
  buildH1,
  buildPageTitle,
  buildPageDescription,
  buildIntro,
  buildWhyLocal,
  buildLocalContext,
  buildFaqs,
  buildCtaHeadline,
  buildCtaSubtext,
  nearbyCities,
  relatedServices,
  type CachedGeoContent,
  type GeoCity,
  type GeoService,
} from "@/lib/geo-pages";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const revalidate = 86400;
export const dynamicParams = false;

interface PageParams {
  params: Promise<{ city: string; service: string }>;
}

export function generateStaticParams() {
  const params: Array<{ city: string; service: string }> = [];
  for (const city of GEO_CITIES) {
    for (const service of GEO_SERVICES) {
      params.push({ city: city.slug, service: service.slug });
    }
  }
  return params;
}

async function loadCachedContent(
  city: GeoCity,
  service: GeoService,
): Promise<CachedGeoContent | null> {
  try {
    const supabase = createServiceClient();
    const slug = geoPageSlug(city.slug, service.slug);
    const { data } = await supabase
      .from("geo_pages")
      .select("content")
      .eq("slug", slug)
      .maybeSingle();
    if (data?.content) return data.content as CachedGeoContent;
  } catch {
    // Supabase env may be missing during build — fall back to deterministic content.
  }
  return null;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return {};

  const title = buildPageTitle(city, service);
  const description = buildPageDescription(city, service);
  const url = `${SITE_URL}${geoPagePath(city.slug, service.slug)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: ORG_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function GeoPage({ params }: PageParams) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  const cached = await loadCachedContent(city, service);

  const intro = cached?.intro || buildIntro(city, service);
  const whyLocal = cached?.whyLocal || buildWhyLocal(city, service);
  const localContext = cached?.localContext || buildLocalContext(city);
  const ctaHeadline = cached?.ctaHeadline || buildCtaHeadline(city, service);
  const faqs = buildFaqs(city, service);
  const neighbors = nearbyCities(city, 5);
  const related = relatedServices(service, 4);

  const canonicalUrl = `${SITE_URL}${geoPagePath(city.slug, service.slug)}`;

  // ── Structured data ────────────────────────────────────────────────────────
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: ORG_NAME,
    url: canonicalUrl,
    description: buildPageDescription(city, service),
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.county} County, ${STATE_CODE}`,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: STATE_CODE,
        addressCountry: "US",
      },
    },
    serviceType: service.name,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonicalUrl}#localbusiness`,
    name: ORG_NAME,
    url: canonicalUrl,
    email: "hello@tweakandbuild.com",
    description: `${service.name} services for ${city.name}, ${STATE_CODE} businesses.`,
    priceRange: "$$",
    areaServed: nearbyCities(city, 8)
      .concat([city])
      .map((c) => ({
        "@type": "City",
        name: c.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: c.name,
          addressRegion: STATE_CODE,
          addressCountry: "US",
        },
      })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}`,
    description: service.intro,
    provider: {
      "@type": "ProfessionalService",
      name: ORG_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: STATE_CODE,
        addressCountry: "US",
      },
    },
    serviceType: service.name,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} deliverables`,
      itemListElement: service.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };

  return (
    <>
      {/* Structured data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "SEO", url: "/seo" },
          { name: city.name, url: `/seo/${city.slug}/${service.slug}` },
          { name: service.name, url: `/seo/${city.slug}/${service.slug}` },
        ]}
      />
      <FAQJsonLd faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Breadcrumbs (visible) */}
      <section className="mx-auto max-w-page px-5 pt-24 pb-2 sm:px-8 sm:pt-32">
        <nav aria-label="Breadcrumb" className="text-[12px] text-body">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-1.5 text-white/30">/</span>
            </li>
            <li>
              <Link href="/seo" className="hover:text-white">SEO</Link>
              <span className="mx-1.5 text-white/30">/</span>
            </li>
            <li>
              <Link href={`/seo?city=${city.slug}`} className="hover:text-white">{city.name}</Link>
              <span className="mx-1.5 text-white/30">/</span>
            </li>
            <li className="text-white">{service.name}</li>
          </ol>
        </nav>
      </section>

      {/* H1 + intro */}
      <section className="mx-auto max-w-page px-5 pt-4 pb-12 sm:px-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
          {city.name}, {STATE_CODE} · {service.name}
        </div>
        <h1 className="mt-3 max-w-3xl font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[56px]">
          {buildH1(city, service)}
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.55] text-body">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/contact?city=${encodeURIComponent(city.name)}&service=${service.slug}`}
            className="btn-v inline-flex items-center gap-2 !text-[14px]"
          >
            Book a free 20-min call <ArrowRight size={14} />
          </Link>
          <Link
            href="/work"
            className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] text-body transition-colors hover:border-white/[0.16] hover:text-white"
          >
            See recent work
          </Link>
        </div>
      </section>

      {/* Why local businesses need this */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          Why {city.name} businesses need {service.shortName.toLowerCase()}
        </h2>
        <p className="mt-4 max-w-3xl text-[16px] leading-[1.65] text-body">{whyLocal}</p>
      </section>

      {/* Local context */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <div className="rounded-2xl border border-accent/15 bg-accent/[0.04] p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
            <MapPin size={12} /> Local context · {city.name}, {STATE_CODE}
          </div>
          <p className="mt-3 max-w-3xl text-[16px] leading-[1.55] text-white">{localContext}</p>
        </div>
      </section>

      {/* Problems solved */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          Problems we solve
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {service.problemsSolved.map((p) => (
            <div key={p} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[14px] leading-[1.55] text-body">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          What you get
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <Check size={16} className="mt-0.5 shrink-0 text-accent" />
              <span className="text-[14px] leading-[1.55] text-body">{d}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          What changes for your business
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {service.benefits.map((b, i) => (
            <div
              key={b}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="mt-2 text-[14px] leading-[1.55] text-white">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          Our process
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.process.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                Step {i + 1}
              </div>
              <h3 className="mt-2 font-display text-[16px] font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.6] text-body">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="grid gap-3 py-6 sm:grid-cols-[280px_1fr] sm:gap-12"
            >
              <h3 className="font-display text-[15px] font-bold text-white">{faq.q}</h3>
              <p className="text-[14px] leading-[1.6] text-body">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby service areas */}
      {neighbors.length > 0 && (
        <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
          <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
            Service areas near {city.name}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-body">
            We serve {service.shortName.toLowerCase()} clients across {REGION_NAME} as a service-area studio.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {neighbors.map((n) => (
              <Link
                key={n.slug}
                href={geoPagePath(n.slug, service.slug)}
                className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-accent/30 hover:bg-accent/[0.04]"
              >
                <div>
                  <div className="text-[14px] font-medium text-white">
                    {service.shortName} in {n.name}, {STATE_CODE}
                  </div>
                  <div className="mt-0.5 text-[12px] text-body">{n.county} County</div>
                </div>
                <ArrowRight size={14} className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">
          Related services in {city.name}
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={geoPagePath(city.slug, s.slug)}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-accent/30 hover:bg-accent/[0.04]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                {city.name}, {STATE_CODE}
              </div>
              <div className="mt-2 text-[14px] font-medium text-white">{s.name}</div>
              <div className="mt-1 text-[12px] text-body">{s.metaTagline}</div>
              <div className="mt-3 flex items-center gap-1 text-[12px] text-accent">
                Learn more <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-page px-5 py-16 sm:px-8">
        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 sm:p-12">
          <h2 className="max-w-2xl font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[36px]">
            {ctaHeadline}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] text-body">
            {buildCtaSubtext(city, service)}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/contact?city=${encodeURIComponent(city.name)}&service=${service.slug}`}
              className="btn-v inline-flex items-center gap-2 !text-[14px]"
            >
              Book the call <ArrowRight size={14} />
            </Link>
            <Link
              href="/audit"
              className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] text-body transition-colors hover:border-white/[0.16] hover:text-white"
            >
              Run a free audit instead
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
