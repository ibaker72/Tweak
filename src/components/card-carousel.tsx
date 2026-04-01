"use client";

import { useRef, useState, useEffect, ReactNode, Children } from "react";

interface CardCarouselProps {
  children: ReactNode;
}

export function CardCarousel({ children }: CardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Only observe on mobile (below lg breakpoint)
    const mql = window.matchMedia("(min-width: 1024px)");
    if (mql.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [count]);

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pl-5 pr-5 hide-scrollbar sm:pl-8 sm:pr-8 lg:block lg:space-y-5 lg:overflow-visible lg:snap-none lg:pb-0 lg:pl-0 lg:pr-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {Children.map(children, (child, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="min-w-[85vw] sm:min-w-[75vw] snap-start flex-shrink-0 lg:min-w-0 lg:flex-shrink"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Scroll indicator dots — mobile only */}
      <div className="mt-4 flex justify-center gap-2 lg:hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
              i === activeIndex ? "bg-accent" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </>
  );
}
