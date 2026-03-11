import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { comparisons, getComparison } from "@/lib/comparisons";
import { Reveal } from "@/components/shared";
import { ArrowRight, Check, X as XIcon } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparison(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: `${page.title} | Tweak & Build`,
      description: page.description,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getComparison(slug);

  if (!page) notFound();

  const otherComparisons = comparisons.filter((c) => c.slug !== slug);

  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        {/* Header */}
        <Reveal>
          <div className="mx-auto mb-14 max-w-[680px] text-center">
            <span className="section-label">Compare</span>
            <h1 className="section-title mt-4">{page.title}</h1>
            <p className="mx-auto mt-4 max-w-[500px] text-[15px] leading-[1.7] text-body">
              {page.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Comparison Table - Desktop */}
        <Reveal delay={0.08}>
          <div className="mx-auto max-w-[900px]">
            <div className="hidden overflow-hidden rounded-2xl border border-white/[0.06] md:block">
              {/* Table header */}
              <div className="grid grid-cols-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                  Category
                </div>
                <div className="border-l border-white/[0.04] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                  {page.themLabel}
                </div>
                <div className="border-l border-accent/[0.1] bg-accent/[0.02] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.1em] text-accent/70">
                  Tweak & Build
                </div>
              </div>
              {/* Table rows */}
              {page.rows.map((row, i) => (
                <div
                  key={row.category}
                  className={`grid grid-cols-3 ${i < page.rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                >
                  <div className="px-6 py-4 font-display text-[13px] font-semibold text-white">
                    {row.category}
                  </div>
                  <div className="border-l border-white/[0.04] px-6 py-4 text-[13px] leading-[1.6] text-body">
                    {row.them}
                  </div>
                  <div className="border-l border-accent/[0.06] bg-accent/[0.01] px-6 py-4 text-[13px] font-medium leading-[1.6] text-white">
                    {row.us}
                  </div>
                </div>
              ))}
            </div>

            {/* Table - Mobile (stacked cards) */}
            <div className="space-y-3 md:hidden">
              {page.rows.map((row) => (
                <div
                  key={row.category}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"
                >
                  <h3 className="mb-3 font-display text-[14px] font-bold text-white">
                    {row.category}
                  </h3>
                  <div className="space-y-2.5">
                    <div>
                      <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-dim">
                        {page.themLabel}
                      </span>
                      <p className="text-[12px] leading-[1.6] text-body">{row.them}</p>
                    </div>
                    <div className="rounded-lg border border-accent/[0.08] bg-accent/[0.02] p-2.5">
                      <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-accent/60">
                        Tweak & Build
                      </span>
                      <p className="text-[12px] font-medium leading-[1.6] text-white">{row.us}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Pros/Cons */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-14 grid max-w-[900px] gap-6 md:grid-cols-2">
            {/* Other option */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7">
              <h3 className="mb-1 font-display text-[17px] font-bold text-white">
                {page.themLabel}
              </h3>
              <p className="mb-5 text-[12px] text-dim">Honest assessment</p>

              <div className="mb-5 space-y-2">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent/60">
                  Where they win
                </p>
                {page.prosOther.map((pro) => (
                  <div key={pro} className="flex items-start gap-2.5 text-[13px] text-gray-300">
                    <Check size={13} className="mt-0.5 flex-shrink-0 text-accent/50" />
                    {pro}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-red-400/60">
                  Common challenges
                </p>
                {page.consOther.map((con) => (
                  <div key={con} className="flex items-start gap-2.5 text-[13px] text-body">
                    <XIcon size={13} className="mt-0.5 flex-shrink-0 text-red-400/40" />
                    {con}
                  </div>
                ))}
              </div>
            </div>

            {/* Tweak & Build */}
            <div className="rounded-2xl border border-accent/[0.12] bg-accent/[0.02] p-7">
              <h3 className="mb-1 font-display text-[17px] font-bold text-white">
                Tweak & Build
              </h3>
              <p className="mb-5 text-[12px] text-accent/50">Our approach</p>

              <div className="space-y-2">
                {page.prosUs.map((pro) => (
                  <div key={pro} className="flex items-start gap-2.5 text-[13px] text-white/90">
                    <Check size={13} className="mt-0.5 flex-shrink-0 text-accent" />
                    {pro}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.16}>
          <div className="mx-auto mt-14 max-w-[500px] text-center">
            <h2 className="font-display text-[24px] font-bold text-white">
              See if we&apos;re the right fit
            </h2>
            <p className="mt-2 text-[14px] text-body">
              No pressure, no sales pitch. Let&apos;s talk about your project.
            </p>
            <Link href="/contact" className="btn-v mt-6 inline-flex">
              Start a conversation <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>

        {/* Other comparisons */}
        {otherComparisons.length > 0 && (
          <Reveal delay={0.18}>
            <div className="mx-auto mt-16 max-w-[900px]">
              <div className="divider" />
              <h3 className="mb-6 mt-10 text-center font-display text-[17px] font-bold text-white">
                More comparisons
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {otherComparisons.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="group rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 transition-all hover:border-accent/[0.15]"
                  >
                    <h4 className="font-display text-[14px] font-bold text-white group-hover:text-accent/90">
                      {c.title}
                    </h4>
                    <p className="mt-1 text-[12px] text-dim">{c.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
