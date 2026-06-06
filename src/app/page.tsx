import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { ProofVault } from "@/components/proof-vault";
import { WhatThisProves } from "@/components/what-this-proves";
import { ProofCTA } from "@/components/proof-cta";
import { ServicesNew } from "@/components/services-new";
import { WhyUs } from "@/components/founder";
import { StackMarquee } from "@/components/home/stack-marquee";
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
      <StackMarquee />
      <FeaturedWork />
      <ProofVault />
      <WhatThisProves />
      <ProofCTA />
      <ServicesNew />
      <WhyUs />
      <PricingTiers />
      <ProcessNew />
      <HomepageAuditCTA />
      <FinalCTA />
      <HomepageNewsletter />
      <PartnerMention />
    </>
  );
}
