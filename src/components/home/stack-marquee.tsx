"use client";

const stackItems = [
  { name: "Next.js", src: "/stack-logos/nextdotjs.svg" },
  { name: "React", src: "/stack-logos/react.svg" },
  { name: "TypeScript", src: "/stack-logos/typescript.svg" },
  { name: "Supabase", src: "/stack-logos/supabase.svg" },
  { name: "Stripe", src: "/stack-logos/stripe.svg" },
  { name: "Node.js", src: "/stack-logos/nodedotjs.svg" },
  { name: "Vercel", src: "/stack-logos/vercel.svg" },
  { name: "Tailwind UI", src: "/stack-logos/tailwindcss.svg" },
  { name: "OpenAI", src: "/stack-logos/openai.svg" },
  { name: "Shopify", src: "/stack-logos/shopify.svg" },
] as const;

const marqueeItems = [...stackItems, ...stackItems];

export function StackMarquee() {
  return (
    <section className="relative border-y border-white/[0.04] bg-surface-1/35 py-7 sm:py-8">
      <div className="wrap">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/36 sm:text-[11px]">
          OUR STACK
        </p>

        <div className="relative mt-4 sm:mt-5">
          <div className="motion-reduce:hidden">
            <div className="stack-marquee">
              <ul className="stack-marquee-track">
                {marqueeItems.map((item, index) => (
                  <li
                    key={`${item.name}-${index}`}
                    className="stack-logo-item"
                    aria-label={item.name}
                    title={item.name}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="stack-logo-mark"
                      draggable="false"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="stack-marquee hidden motion-reduce:block">
            <ul className="stack-marquee-track">
              {stackItems.map((item) => (
                <li
                  key={item.name}
                  className="stack-logo-item"
                  aria-label={item.name}
                  title={item.name}
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="stack-logo-mark"
                    draggable="false"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}