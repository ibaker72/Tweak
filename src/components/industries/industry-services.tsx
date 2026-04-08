import {
  Car,
  Target,
  CalendarCheck,
  TrendingUp,
  Calculator,
  ShieldCheck,
  RefreshCw,
  Star,
  ClipboardList,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/components/shared";
import type { Industry } from "@/lib/industries";

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Car,
  Target,
  CalendarCheck,
  TrendingUp,
  Calculator,
  ShieldCheck,
  RefreshCw,
  Star,
  ClipboardList,
  MapPin,
};

export function IndustryServices({ industry }: { industry: Industry }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="wrap">
        <Reveal>
          <div className="mb-12 max-w-[560px]">
            <span className="section-label">What we build</span>
            <h2 className="mt-4 font-display text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              {industry.solutionStatement}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {industry.services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Target;
            return (
              <Reveal key={service.title} delay={i * 0.07}>
                <div className="card-premium group flex h-full gap-4 p-6">
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                      <Icon size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-[14px] font-bold text-white">
                      {service.title}
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.7] text-body">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
