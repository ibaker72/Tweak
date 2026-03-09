import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        {/* Header */}
        <div className="mx-auto max-w-[720px]">
          <span className="section-label">Legal</span>
          <h1 className="mt-5 font-display text-[clamp(30px,4.5vw,48px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-[12px] text-dim">Last updated: March 2026</p>
        </div>

        {/* Divider */}
        <div className="divider mx-auto mt-8 max-w-[720px]" />

        {/* Content */}
        <div className="mx-auto mt-10 max-w-[720px]">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-7 py-8 sm:px-10 sm:py-10" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
            <div className="legal-prose">
              <p>Bedrock Alliance LLC, operating as Tweak &amp; Build, is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>

              <h2>1. Information We Collect</h2>
              <p>We collect information you provide through our contact and project inquiry forms: name, email, company name, and project details. We do not use cookies or tracking scripts unless explicitly stated.</p>

              <h2>2. How We Use Your Information</h2>
              <p>We use your information solely to respond to inquiries, prepare proposals, communicate about engagements, and send relevant follow-ups. We do not sell, rent, or share your information with third parties for marketing.</p>

              <h2>3. Data Storage</h2>
              <p>Form submissions are transmitted via email. We do not store form data in databases. Project files are stored in secure, access-controlled cloud services for the engagement duration.</p>

              <h2>4. Third-Party Services</h2>
              <p>We use <strong>Vercel</strong> for hosting, <strong>Resend</strong> for email, and <strong>Calendly</strong> for scheduling. Each has its own privacy policy. We do not use advertising networks.</p>

              <h2>5. Your Rights</h2>
              <p>You may request access to, correction of, or deletion of personal information. Contact us at the email below. We respond within 30 days.</p>

              <h2>6. Security</h2>
              <p>We implement reasonable security measures including HTTPS, access controls, and secure email delivery.</p>

              <h2>7. Changes</h2>
              <p>We may update this policy. Changes will be posted here with an updated date.</p>

              <h2>8. Contact</h2>
              <p>Questions? Email <a href="mailto:iyadbaker.dev@gmail.com">iyadbaker.dev@gmail.com</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
