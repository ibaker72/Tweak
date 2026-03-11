"use client";
import { useState } from "react";
import { Reveal } from "@/components/shared";
import { BlogCard } from "./blog-card";
import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

const FILTER_LABELS = ["All", "Engineering", "Case Studies", "Business", "Launches"];
const POSTS_PER_PAGE = 6;

export function BlogIndex({ posts, tags: _tags }: { posts: BlogPost[]; tags: string[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filtered =
    activeFilter === "All"
      ? posts
      : posts.filter((p) =>
          p.tags.map((t) => t.toLowerCase()).includes(activeFilter.toLowerCase()),
        );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        {/* Hero */}
        <Reveal>
          <div className="mx-auto mb-14 max-w-[600px] text-center">
            <span className="section-label">Studio Journal</span>
            <h1 className="section-title mt-4">Insights from the studio</h1>
            <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.7] text-body">
              Engineering breakdowns, pricing transparency, and lessons from building products that
              ship.
            </p>
          </div>
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={0.08}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTER_LABELS.map((label) => (
              <button
                key={label}
                onClick={() => {
                  setActiveFilter(label);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-[11px] transition-all duration-200",
                  activeFilter === label
                    ? "border-accent/30 bg-accent/[0.08] text-accent"
                    : "border-white/[0.06] bg-white/[0.02] text-dim hover:border-white/[0.12] hover:text-white/60",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Posts grid */}
        {visible.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((post, i) => (
              <BlogCard key={post.slug} post={post} delay={0.06 * i} />
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="py-20 text-center">
              <p className="text-[15px] text-dim">No posts found for this category yet.</p>
            </div>
          </Reveal>
        )}

        {/* Load more */}
        {hasMore && (
          <Reveal delay={0.1}>
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
                className="btn-o"
              >
                Load more posts
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
