import type { Metadata } from "next";
import { CostCalculator } from "@/components/tools/cost-calculator";

export const metadata: Metadata = {
  title: "Website Cost Calculator",
  description:
    "Get an instant estimate for your web project. Answer 4 quick questions and see a price range based on similar projects we've delivered.",
  openGraph: {
    title: "Website Cost Calculator | Tweak & Build",
    description:
      "Get an instant estimate for your web project. Answer 4 quick questions and see your price range.",
  },
};

export default function CalculatorPage() {
  return <CostCalculator />;
}
