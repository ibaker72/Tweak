import type { Metadata } from "next";
import { CostCalculator } from "@/components/tools/cost-calculator";

export const metadata: Metadata = {
  title: "Website Cost Calculator | Estimate Your Project Scope",
  description:
    "Estimate the scope and likely investment level for your business website based on your goals, functionality, local SEO needs, content, and growth strategy.",
  openGraph: {
    title: "Website Cost Calculator | Tweak & Build",
    description:
      "Answer a few questions about your business and goals — see the level of build your project likely requires and the best next step.",
  },
};

export default function CalculatorPage() {
  return <CostCalculator />;
}
