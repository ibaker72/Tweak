import type { Metadata } from "next";
import { AuditReport } from "./audit-report";

export const metadata: Metadata = {
  title: "Audit Report",
  description: "Your website audit results — scores, strengths, weaknesses, and prioritized recommendations.",
};

export default async function AuditResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AuditReport id={id} />;
}
