import type { Metadata } from "next";
import Link from "next/link";

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
              <h2>1. Agreement to Terms</h2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website, services, and
                communications provided by <strong>Bedrock Alliance Holdings LLC</strong>, operating as{" "}
                <strong>Tweak &amp; Build </strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;). By using our website, submitting a form, booking a call, requesting a
                quote, or engaging us for services, you agree to these Terms and to our{" "}
                <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the
                site or services.
              </p>

              <h2>2. Services</h2>
              <p>
                Tweak &amp; Build provides web development, design, automation, marketing, consulting,
                proposals, lead follow-up, and project communication services. Specific deliverables,
                timelines, and pricing for each engagement are documented in an individual proposal,
                Statement of Work, or order confirmation.
              </p>

              <h2>3. Proposals, Scope, and Pricing</h2>
              <p>
                Proposals describe the agreed scope, deliverables, milestones, and pricing for an
                engagement. Pricing is fixed and confirmed in writing before work begins. Unless otherwise
                stated, prices are in U.S. dollars and exclude applicable taxes. Quotes and proposals are
                valid for 30 days unless otherwise noted.
              </p>

              <h2>4. Payment Terms</h2>
              <p>
                Quick Build services are prepaid in full. Custom projects are billed on a milestone basis
                with payment due within the timeframe stated on the invoice (typically net 7). Late
                payments may incur a fee of 1.5% per month on the outstanding balance, or the maximum
                allowed by law, whichever is lower. We may pause work on overdue accounts until the
                balance is resolved.
              </p>

              <h2>5. Revisions and Scope Changes</h2>
              <p>
                Each engagement includes a defined number of revision rounds described in the proposal.
                Requests beyond the included revisions, or work outside the agreed scope, are handled as a
                change request and quoted separately before being added to the engagement.
              </p>

              <h2>6. Client Responsibilities</h2>
              <p>To keep projects on schedule, you agree to:</p>
              <ul>
                <li>
                  Provide accurate information, content, brand assets, and credentials needed to deliver
                  the work.
                </li>
                <li>Respond to questions, drafts, and approval requests in a timely manner.</li>
                <li>
                  Ensure you have rights to any content, logos, copy, or assets you provide and that they
                  do not infringe third-party rights.
                </li>
                <li>Designate a single primary point of contact authorized to make decisions.</li>
              </ul>

              <h2>7. SMS Communications</h2>
              <p>
                By providing your phone number through our website, booking flow, quote request, or during
                a business conversation, you agree that Bedrock Alliance Holdings LLC, operating as Tweak
                &amp; Build, may contact you by phone, email, or SMS regarding your inquiry, proposal,
                appointment, project, or active business relationship.
              </p>
              <p>
                <strong>Message frequency varies.</strong> Messages are tied to your active inquiry,
                proposal, appointment, or project. <strong>Message and data rates may apply</strong>{" "}
                depending on your mobile carrier and plan. Reply <strong>STOP</strong> to opt out of SMS
                messages or <strong>HELP</strong> for help.{" "}
                <strong>
                  Consent to receive SMS messages is not required as a condition of purchasing services
                </strong>
                , and your consent to SMS is not shared or sold. See our{" "}
                <Link href="/privacy">Privacy Policy</Link> for details on how we handle mobile
                information.
              </p>

              <h2>8. Opt-Out Instructions</h2>
              <p>
                You can stop receiving SMS messages from us at any time by replying{" "}
                <strong>STOP</strong> to any message. After we receive your STOP request, we will send a
                single confirmation message and will not send additional SMS messages unless you opt back
                in. For assistance, reply <strong>HELP</strong> or email{" "}
                <a href="mailto:hello@tweakandbuild.com">hello@tweakandbuild.com</a>. You may also ask us
                in writing to remove your number from all SMS communications.
              </p>

              <h2>9. Intellectual Property</h2>
              <p>
                Upon receipt of full payment for an engagement, ownership of the custom code, design
                assets, and final deliverables created specifically for you transfers to you. Third-party
                libraries, frameworks, fonts, and stock assets remain under their respective licenses. We
                retain ownership of pre-existing tools, internal libraries, and know-how used to deliver
                the work and grant you a perpetual, non-exclusive license to use them as embedded in your
                deliverables.
              </p>

              <h2>10. Third-Party Services</h2>
              <p>
                Our services may rely on third-party providers (for example, hosting, email delivery,
                scheduling, payments, analytics, or SMS delivery). We are not responsible for the
                availability, performance, pricing changes, or terms of those providers. Your use of any
                third-party service is governed by that provider&rsquo;s own terms and privacy policy.
              </p>

              <h2>11. Portfolio Use</h2>
              <p>
                Unless you ask us in writing not to, we may showcase completed work&mdash;screenshots,
                short descriptions, metrics, and a link to the live project&mdash;in our portfolio, case
                studies, and marketing materials. We will not disclose confidential business information
                or credentials without permission.
              </p>

              <h2>12. Refunds and Cancellations</h2>
              <p>
                <strong>Custom projects:</strong> if we fail to deliver the agreed scope for a milestone,
                you are entitled to a full refund for that milestone. Completed and accepted milestones
                are non-refundable.
              </p>
              <p>
                <strong>Quick Builds:</strong> include the revision rounds described in the proposal. If
                we are unable to meet the documented requirements after the included revisions, we will
                work with you in good faith to find a resolution.
              </p>
              <p>
                Either party may cancel an in-progress engagement in writing. You remain responsible for
                payment for work completed up to the cancellation date.
              </p>

              <h2>13. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, our total aggregate liability arising out of or
                related to an engagement will not exceed the fees actually paid by you for that
                engagement. We are not liable for indirect, incidental, special, consequential, or
                punitive damages, including lost profits, lost revenue, or loss of data. Services are
                provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any
                kind beyond those expressly stated in a written agreement.
              </p>

              <h2>14. Termination</h2>
              <p>
                Either party may terminate an engagement with 14 days&rsquo; written notice, or
                immediately for material breach that is not cured within a reasonable time after notice.
                Upon termination, you remain responsible for payment for all work completed through the
                effective date, and we will deliver completed work product following receipt of final
                payment.
              </p>

              <h2>15. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of New Jersey, without regard to its
                conflict of laws principles. The parties agree that any disputes will be resolved through
                binding arbitration seated in New Jersey, or in the state or federal courts located in New
                Jersey where arbitration is not available.
              </p>

              <h2>16. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. When we do, we will revise the &ldquo;Last
                updated&rdquo; date at the top of this page. Material changes will be highlighted here or
                communicated directly when appropriate. Continued use of our website or services after
                changes take effect constitutes acceptance of the updated Terms.
              </p>

              <h2>17. Contact</h2>
              <p>
                Questions about these Terms? Reach us at{" "}
                <a href="mailto:hello@tweakandbuild.com">hello@tweakandbuild.com</a>. For information on
                how we handle your data, see our <Link href="/privacy">Privacy Policy</Link>.
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
