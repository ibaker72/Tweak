import { NextResponse } from "next/server";

const tierPriceMap: Record<string, string | undefined> = {
  "Single Page": process.env.STRIPE_PRICE_SINGLE_PAGE,
  "Multi Page": process.env.STRIPE_PRICE_MULTI_PAGE,
  "Full Site": process.env.STRIPE_PRICE_FULL_SITE,
};

const tierFallbackAmounts: Record<string, number> = {
  "Single Page": 49700,
  "Multi Page": 149700,
  "Full Site": 299700,
};

export async function POST(request: Request) {
  try {
    const { tier, email } = await request.json();

    if (!tier || !tierFallbackAmounts[tier]) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // ── Production: real Stripe Checkout ──
    if (stripeKey && !stripeKey.startsWith("sk_test_xxxx")) {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });

      const priceId = tierPriceMap[tier];

      // If you've created Products in Stripe Dashboard with Price IDs:
      const sessionConfig: Record<string, unknown> = {
        mode: "payment" as const,
        success_url: `${siteUrl}/success?tier=${encodeURIComponent(tier)}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/#pricing`,
        customer_email: email || undefined,
        metadata: { tier },
        payment_intent_data: {
          metadata: { tier, source: "tweakandbuild-quickbuild" },
        },
      };

      if (priceId && !priceId.startsWith("price_xxxx")) {
        // Use pre-configured price from Stripe Dashboard
        Object.assign(sessionConfig, {
          line_items: [{ price: priceId, quantity: 1 }],
        });
      } else {
        // Dynamic price (no Dashboard product needed)
        Object.assign(sessionConfig, {
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `Quick Build: ${tier}`,
                  description: `Tweak & Build — ${tier} package`,
                },
                unit_amount: tierFallbackAmounts[tier],
              },
              quantity: 1,
            },
          ],
        });
      }

      const session = await stripe.checkout.sessions.create(
        sessionConfig as Parameters<typeof stripe.checkout.sessions.create>[0]
      );

      return NextResponse.json({ url: session.url });
    }

    // ── Dev fallback: simulate checkout ──
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`💳 CHECKOUT (dev mode) — ${tier}`);
    console.log(`   Amount: $${(tierFallbackAmounts[tier] / 100).toFixed(2)}`);
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
