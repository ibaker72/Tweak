import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <div className="mx-auto max-w-3xl px-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-v-light">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-white">Terms of Service</h1>
        <p className="mt-3 text-sm text-dim">Last updated: March 2026</p>
        <div className="mt-10 space-y-8 text-sm leading-[1.8] text-body [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_strong]:text-white">
          <p>These Terms govern your use of services provided by Bedrock Alliance LLC, operating as Tweak &amp; Build. By engaging our services, you agree to these Terms.</p>
          <h2>1. Services</h2><p>We provide web development, design, and consulting services as described in individual project proposals. Each engagement is governed by a separate Statement of Work specifying scope, timeline, deliverables, and pricing.</p>
          <h2>2. Pricing and Payment</h2><p>All pricing is fixed and agreed upon before work begins. Quick Build services are prepaid in full. Custom projects are billed on a milestone basis. Late payments may incur a 1.5% monthly fee.</p>
          <h2>3. Intellectual Property</h2><p>Upon full payment, all custom code, design assets, and documentation transfer to you. We retain the right to showcase completed work in our portfolio unless otherwise agreed. Third-party libraries remain under their respective licenses.</p>
          <h2>4. Revisions and Scope</h2><p>Each engagement includes defined revision rounds. Requests beyond included revisions may incur additional charges. Scope changes after kickoff will be documented and quoted separately.</p>
          <h2>5. Refund Policy</h2><p>Custom projects: if we fail to deliver agreed scope for a milestone, you receive a full refund for that milestone. Quick Builds include revision rounds; if we cannot meet requirements, we will work to find a resolution.</p>
          <h2>6. Limitation of Liability</h2><p>Total liability shall not exceed fees paid for the specific engagement. We are not liable for indirect, incidental, or consequential damages.</p>
          <h2>7. Termination</h2><p>Either party may terminate with 14 days written notice. You are responsible for payment of completed work. We deliver all completed code upon final payment.</p>
          <h2>8. Governing Law</h2><p>Governed by the laws of the State of New Jersey. Disputes resolved through binding arbitration in New Jersey.</p>
          <h2>9. Contact</h2><p>Questions? Email <a href="mailto:iyadbaker.dev@gmail.com" className="text-v-light hover:text-v">iyadbaker.dev@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
