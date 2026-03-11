import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { ServicesNew } from "@/components/services-new";
import { TrustStrip } from "@/components/trust-strip";
import { TechShowcase } from "@/components/tech-showcase";
import { ProcessNew } from "@/components/process-new";
import { TestimonialsNew } from "@/components/testimonials-new";
import { Pricing } from "@/components/pricing";
import { FinalCTA } from "@/components/final-cta";
import { FAQ } from "@/components/footer";
import { HomepageNewsletter } from "@/components/marketing/homepage-newsletter";
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
      <TechShowcase />
      <ProcessNew />
      <TestimonialsNew />
      <HomepageNewsletter />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
