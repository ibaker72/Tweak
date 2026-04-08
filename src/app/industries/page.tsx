import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, ShieldCheck, Wrench } from "lucide-react";
import { industries } from "@/lib/industries";
import { Reveal } from "@/components/shared";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Industries We Serve | Tweak & Build",
  description:
    "Tweak & Build builds premium websites and web applications for dealerships, insurance agencies, and service businesses. Industry-specific solutions that convert.",
  openGraph: {
    title: "Industries We Serve | Tweak & Build",
    description:
      "Premium web design and development for dealerships, insurance agencies, and service businesses. See how we build for your industry.",
  },
};

const industryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  dealerships: Car,
  insurance: ShieldCheck,
  "service-businesses": Wrench,
};

const industryColors: Record<string, string> = {
  dealerships: "text-blue-400 bg-blue-400/10",
  insurance: "text-emerald-400 bg-emerald-400/10",
  "service-businesses": "text-orange-400 bg-orange-400/10",
};

export default function IndustriesPage() {
  return (
    <div className="pb-24 pt-36 sm:pt-44">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
        ]}
      />

      <div className="wrap">
        {/* Header */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-[620px] text-center">
            <span className="section-label">Industries</span>
            <h1 className="mt-5 font-display text-[clamp(28px,5vw,52px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              Built for your industry,
              <br />
              not just your budget
            </h1>
            <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-[1.75] text-body">
              Generic templates don&apos;t convert for your specific business. We build
              for the workflows, trust signals, and conversion patterns that matter
              in your industry.
            </p>
          </div>
        </Reveal>

        {/* Industry cards */}
        <div className="mx-auto grid max-w-[960px] gap-5 sm:grid-cols-3">
          {industries.map((industry, i) => {
            const Icon = industryIcons[industry.slug] ?? Car;
            const colorClass = industryColors[industry.slug] ?? "text-accent bg-accent/10";

            return (
              <Reveal key={industry.slug} delay={i * 0.08}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="card-premium group flex h-full flex-col gap-5 p-7"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClass}`}>
                    <Icon size={20} />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-white">
                      {industry.name}
                    </h2>
                    <p className="mt-2 text-[13px] leading-[1.7] text-body">
                      {industry.subheadline}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-accent/70 transition-colors group-hover:text-accent">
                    See solutions
                    <ArrowRight size={12} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 max-w-[560px] rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
            <p className="text-[14px] leading-[1.7] text-body">
              Don&apos;t see your industry listed? We work across many verticals.{" "}
              <Link href="/contact" className="font-semibold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/60">
                Tell us what you&apos;re building
              </Link>{" "}
              and we&apos;ll tell you if we&apos;re the right fit.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
