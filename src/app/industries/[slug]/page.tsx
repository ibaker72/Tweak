import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, getIndustry, industrySlugs } from "@/lib/industries";
import { IndustryHero } from "@/components/industries/industry-hero";
import { IndustryPainPoints } from "@/components/industries/industry-pain-points";
import { IndustryServices } from "@/components/industries/industry-services";
import { IndustryResults } from "@/components/industries/industry-results";
import { IndustryFaqs } from "@/components/industries/industry-faqs";
import { IndustryCta } from "@/components/industries/industry-cta";
import { IndustryServiceJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  // TypeScript narrowing after notFound()
  const ind = industry!;

  return (
    <>
      <IndustryServiceJsonLd industry={ind} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: ind.name, url: `/industries/${ind.slug}` },
        ]}
      />

      <IndustryHero industry={ind} />
      <div className="divider" />
      <IndustryPainPoints industry={ind} />
      <div className="divider" />
      <IndustryServices industry={ind} />
      <IndustryResults industry={ind} />
      <div className="divider" />
      <IndustryFaqs industry={ind} />
      <div className="divider" />
      <IndustryCta industry={ind} />
    </>
  );
}
