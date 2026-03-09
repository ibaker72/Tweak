import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        {/* Header */}
        <div className="mx-auto max-w-[720px]">
          <span className="section-label">Legal</span>
          <h1 className="mt-5 font-display text-[clamp(30px,4.5vw,48px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
            Terms of Service
          </h1>
          <p className="mt-3 font-mono text-[12px] text-dim">Last updated: March 2026</p>
        </div>

        {/* Divider */}
        <div className="divider mx-auto mt-8 max-w-[720px]" />

        {/* Content */}
        <div className="mx-auto mt-10 max-w-[720px]">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-7 py-8 sm:px-10 sm:py-10" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
            <div className="legal-prose">
              <p>These Terms govern your use of services provided by Bedrock Alliance LLC, operating as Tweak &amp; Build. By engaging our services, you agree to these Terms.</p>

              <h2>1. Services</h2>
              <p>We provide web development, design, and consulting services as described in individual project proposals. Each engagement is governed by a separate Statement of Work specifying scope, timeline, deliverables, and pricing.</p>

              <h2>2. Pricing and Payment</h2>
              <p>All pricing is fixed and agreed upon before work begins. Quick Build services are prepaid in full. Custom projects are billed on a milestone basis. Late payments may incur a 1.5% monthly fee.</p>

              <h2>3. Intellectual Property</h2>
              <p>Upon full payment, all custom code, design assets, and documentation transfer to you. We retain the right to showcase completed work in our portfolio unless otherwise agreed. Third-party libraries remain under their respective licenses.</p>

              <h2>4. Revisions and Scope</h2>
              <p>Each engagement includes defined revision rounds. Requests beyond included revisions may incur additional charges. Scope changes after kickoff will be documented and quoted separately.</p>

              <h2>5. Refund Policy</h2>
              <p>Custom projects: if we fail to deliver agreed scope for a milestone, you receive a full refund for that milestone. Quick Builds include revision rounds; if we cannot meet requirements, we will work to find a resolution.</p>

              <h2>6. Limitation of Liability</h2>
              <p>Total liability shall not exceed fees paid for the specific engagement. We are not liable for indirect, incidental, or consequential damages.</p>

              <h2>7. Termination</h2>
              <p>Either party may terminate with 14 days written notice. You are responsible for payment of completed work. We deliver all completed code upon final payment.</p>

              <h2>8. Governing Law</h2>
              <p>Governed by the laws of the State of New Jersey. Disputes resolved through binding arbitration in New Jersey.</p>

              <h2>9. Contact</h2>
              <p>Questions? Email <a href="mailto:billing@tweakandbuild.com">billing@tweakandbuild.com</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
