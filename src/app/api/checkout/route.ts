import { NextResponse } from "next/server";

// Public checkout price IDs — charged at checkout.
// Single Page: full amount ($1,497). Multi Page & Full Site: 50% deposit only.
const tierPriceIds: Record<string, string> = {
  "Single Page": process.env.STRIPE_PRICE_SINGLE_PAGE || "price_1T9BVYPzPB6fxeLqyzhgqHGf",
  "Multi Page": process.env.STRIPE_PRICE_MULTI_PAGE || "price_1T9BX1PzPB6fxeLqpugGa8S5",
  "Full Site": process.env.STRIPE_PRICE_FULL_SITE || "price_1T9BXWPzPB6fxeLq8GeqcE9f",
};

// Fallback amounts (cents) for dev mode — match the public checkout prices.
// Single Page: $1,497 full. Multi Page: $1,498.50 deposit. Full Site: $2,998.50 deposit.
const tierFallbackAmounts: Record<string, number> = {
  "Single Page": 149700,
  "Multi Page": 149850,
  "Full Site": 299850,
};

export async function POST(request: Request) {
  try {
    const { tier, email } = await request.json();

    if (!tier || !tierPriceIds[tier]) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // ── Production: real Stripe Checkout ──
    if (stripeKey && !stripeKey.startsWith("sk_test_xxxx")) {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${siteUrl}/success?tier=${encodeURIComponent(tier)}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/#pricing`,
        customer_email: email || undefined,
        metadata: { tier },
        payment_intent_data: {
          metadata: { tier, source: "tweakandbuild-quickbuild" },
        },
        line_items: [{ price: tierPriceIds[tier], quantity: 1 }],
      });

      return NextResponse.json({ url: session.url });
    }

    // ── Dev fallback: simulate checkout ──
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`💳 CHECKOUT (dev mode) — ${tier}`);
    console.log(`   Amount: $${(tierFallbackAmounts[tier] / 100).toFixed(2)}`);
    console.log(`   Price ID: ${tierPriceIds[tier]}`);
    console.log(`   Email: ${email || "not provided"}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    return NextResponse.json({
      url: `${siteUrl}/success?tier=${encodeURIComponent(tier)}&dev=true`,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
