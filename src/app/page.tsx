import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { ServicesNew } from "@/components/services-new";
import { WhyUs } from "@/components/founder";
import { TrustStrip } from "@/components/trust-strip";
import { TechShowcase } from "@/components/tech-showcase";
import { ProcessNew } from "@/components/process-new";
import { PricingTiers } from "@/components/pricing-tiers";
import { FinalCTA } from "@/components/final-cta";
import { HomepageNewsletter } from "@/components/marketing/homepage-newsletter";
import { HomepageAuditCTA } from "@/components/marketing/homepage-audit-cta";
import { PartnerMention } from "@/components/partner-mention";
import { OrganizationJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/data";

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <FAQJsonLd faqs={faqs} />
      <Hero />
      <TrustStrip />
      <FeaturedWork />
      <ServicesNew />
      <WhyUs />
      <PricingTiers />
      <ProcessNew />
      <TechShowcase />
      <HomepageAuditCTA />
      <FinalCTA />
      <HomepageNewsletter />
      <PartnerMention />
    </>
  );
}
