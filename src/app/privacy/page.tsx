import type { Metadata } from "next";
import Link from "next/link";

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
          <p className="mt-3 font-mono text-[12px] text-dim">Last updated: June 2026</p>
        </div>

        {/* Divider */}
        <div className="divider mx-auto mt-8 max-w-[720px]" />

        {/* Content */}
        <div className="mx-auto mt-10 max-w-[720px]">
          <div
            className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-7 py-8 sm:px-10 sm:py-10"
            style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}
          >
            <div className="legal-prose">
              <h2>1. Introduction</h2>
              <p>
                Bedrock Alliance Holdings LLC, operating as <strong>Tweak &amp; Build</strong>
                {" "}(&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), respects your privacy and is committed to
                protecting the personal information you share with us. This Privacy Policy explains what we
                collect, how we use it, and the choices you have. It applies to{" "}
                <a href="https://tweakandbuild.com">tweakandbuild.com</a> and any related services, forms,
                booking flows, and business communications. By using our website or services, you agree to
                the practices described here and in our <Link href="/terms">Terms of Service</Link>.
              </p>

              <h2>2. Information We Collect</h2>
              <p>We only collect information needed to respond to inquiries and deliver services:</p>
              <ul>
                <li>
                  <strong>Contact details</strong> you submit through forms, quote requests, booking flows,
                  or active business conversations: name, email address, mobile or business phone number,
                  company name, and message content.
                </li>
                <li>
                  <strong>Project information</strong> you share during proposals, scoping calls, or active
                  engagements (goals, requirements, references, files).
                </li>
                <li>
                  <strong>Basic technical data</strong> such as IP address, browser type, device, and pages
                  visited, captured by our hosting and analytics providers to keep the site secure and
                  improve performance.
                </li>
                <li>
                  <strong>Communications</strong> you exchange with us by email, SMS, phone, or scheduling
                  tools.
                </li>
              </ul>
              <p>We do not knowingly collect information from children under 13.</p>

              <h2>3. How We Use Information</h2>
              <p>We use the information you provide to:</p>
              <ul>
                <li>Respond to inquiries, quote requests, and booking submissions.</li>
                <li>Prepare proposals, statements of work, and project communications.</li>
                <li>
                  Send appointment reminders, proposal links, project updates, support replies, and
                  follow-ups related to your inquiry or active project.
                </li>
                <li>Operate, secure, and improve our website and services.</li>
                <li>Comply with legal and tax obligations.</li>
              </ul>

              <h2>4. SMS / Text Messaging</h2>
              <p>
                Tweak &amp; Build may collect your mobile phone number when you submit a form, request a
                quote, book a call, or communicate with us about a business inquiry or active project. We
                may use SMS to send appointment reminders, proposal links, project updates, support
                replies, and relevant follow-ups related to your inquiry or services.
              </p>
              <p>
                <strong>Message frequency varies.</strong> Messages are typically low volume and tied to
                active inquiries, proposals, and projects. <strong>Message and data rates may apply</strong>
                {" "}depending on your mobile carrier and plan. You may reply <strong>STOP</strong> to opt
                out at any time or <strong>HELP</strong> for assistance.
              </p>

              <h2>5. How Users Consent to SMS</h2>
              <p>You consent to receive SMS messages from Tweak &amp; Build when you:</p>
              <ul>
                <li>
                  Submit a contact form, quote request, project inquiry, or booking request on{" "}
                  <a href="https://tweakandbuild.com">tweakandbuild.com</a> that includes your mobile phone
                  number.
                </li>
                <li>
                  Provide your mobile number during a strategy call, sales conversation, or while we are
                  actively scoping or delivering a project.
                </li>
                <li>
                  Reply to a message we send, or otherwise confirm in writing that you would like to
                  receive SMS updates from us.
                </li>
              </ul>
              <p>
                SMS consent is never required to purchase services. You can request to be contacted only
                by email or phone at any time.
              </p>

              <h2>6. SMS Opt-Out and Help</h2>
              <p>
                You can opt out of SMS messages at any time by replying <strong>STOP</strong> to any
                message you receive from us. After you reply STOP, we will send a single confirmation
                message and will not send you further SMS messages unless you opt back in.
              </p>
              <p>
                For assistance, reply <strong>HELP</strong> to any of our messages or email{" "}
                <a href="mailto:hello@tweakandbuild.com">hello@tweakandbuild.com</a>. Standard message and
                data rates from your carrier may apply.
              </p>

              <h2>7. No Sale or Sharing of Mobile Information</h2>
              <p>
                <strong>
                  Mobile information, including phone numbers and SMS opt-in consent, will not be sold,
                  rented, shared, or disclosed to third parties or affiliates for marketing or promotional
                  purposes.
                </strong>{" "}
                We may use vendors only to deliver operational services, such as hosting, email,
                scheduling, CRM, analytics, or messaging delivery. These vendors are contractually
                restricted to use the information solely to provide their services to us.
              </p>

              <h2>8. Third-Party Services</h2>
              <p>
                We use a small set of trusted providers to operate our business. Each maintains its own
                privacy practices:
              </p>
              <ul>
                <li>
                  <strong>Vercel</strong> &mdash; website hosting and infrastructure.
                </li>
                <li>
                  <strong>Resend</strong> &mdash; transactional email delivery.
                </li>
                <li>
                  <strong>Calendly</strong> &mdash; meeting scheduling.
                </li>
                <li>
                  <strong>Stripe</strong> &mdash; payment processing for invoices and Quick Build orders.
                </li>
                <li>
                  <strong>Supabase</strong> &mdash; secure database for client portal and project records.
                </li>
                <li>
                  <strong>Twilio</strong> &mdash; SMS message delivery for appointment reminders, proposal
                  follow-ups, and active customer/project conversations.
                </li>
                <li>
                  <strong>Vercel Analytics</strong> &mdash; aggregated, privacy-friendly traffic
                  measurement.
                </li>
              </ul>
              <p>We do not use advertising networks or sell information to data brokers.</p>

              <h2>9. Data Storage and Security</h2>
              <p>
                We implement reasonable administrative, technical, and physical safeguards to protect your
                information, including HTTPS encryption in transit, access controls, principle of least
                privilege, and secure cloud storage with reputable providers. We retain information only
                as long as needed to provide services, comply with legal obligations, resolve disputes,
                and enforce our agreements. No method of transmission or storage is 100% secure, but we
                work to protect your data using industry-standard practices.
              </p>

              <h2>10. Your Rights</h2>
              <p>
                Depending on where you live, you may have the right to access, correct, delete, or export
                the personal information we hold about you, to object to or restrict certain processing,
                and to withdraw consent. To exercise these rights, email{" "}
                <a href="mailto:hello@tweakandbuild.com">hello@tweakandbuild.com</a> and we will respond
                within 30 days. You may also opt out of SMS by replying STOP to any message.
              </p>

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the
                &ldquo;Last updated&rdquo; date at the top of this page. Material changes will be
                highlighted on this page or communicated directly when appropriate. Continued use of our
                website or services after changes take effect constitutes acceptance of the updated
                policy.
              </p>

              <h2>12. Contact</h2>
              <p>
                Questions about this Privacy Policy or how we handle your information? Reach us at{" "}
                <a href="mailto:hello@tweakandbuild.com">hello@tweakandbuild.com</a>. For our service
                terms, see our <Link href="/terms">Terms of Service</Link>.
              </p>
              <p>
                <strong>Bedrock Alliance Holdings LLC</strong>
                <br />
                d/b/a Tweak &amp; Build
                <br />
                <a href="https://tweakandbuild.com">tweakandbuild.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
