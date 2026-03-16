"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useInView } from "@/components/shared";

interface AuditRecommendationProps {
  recommendations: string[];
  biggestOpportunity: string;
}

export function AuditRecommendation({ recommendations, biggestOpportunity }: AuditRecommendationProps) {
  const [ref, inView] = useInView(0.15);

  return (
    <div ref={ref}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border-l-4 border-accent/40 bg-accent/[0.03] p-8 sm:p-10"
        style={{
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: "rgba(200,255,0,0.08)",
          borderRightColor: "rgba(200,255,0,0.08)",
          borderBottomColor: "rgba(200,255,0,0.08)",
          borderTopStyle: "solid",
          borderRightStyle: "solid",
          borderBottomStyle: "solid",
          borderRadius: "16px",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Sparkles size={18} className="text-accent" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-white sm:text-xl">
              If This Were Our Client Site, Here&apos;s What We&apos;d Do First
            </h2>
          </div>
        </div>

        <ol className="space-y-4">
          {recommendations.map((rec, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="flex gap-4"
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent/15 font-mono text-[12px] font-bold text-accent">
                {i + 1}
              </span>
              <p className="text-[14px] leading-[1.7] text-white/80 pt-0.5">{rec}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-8 rounded-xl bg-accent/[0.06] px-5 py-4">
          <p className="text-[13px] leading-[1.7] text-body">
            These are the first changes we&apos;d prioritize to improve trust, search visibility, and conversion readiness.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
