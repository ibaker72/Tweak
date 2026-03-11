"use client";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { Reveal } from "@/components/shared";

export function BlogCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="card flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/[0.15] hover:shadow-[0_8px_32px_rgba(200,255,0,0.04)]">
          {/* Featured image area */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-surface-2 to-surface-3 sm:h-52">
            {post.featuredImage ? (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-lg text-white/[0.04]">{post.title}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-0/60 to-transparent" />
            {post.tags[0] && (
              <span className="absolute left-4 top-4 rounded-full border border-accent/[0.2] bg-surface-0/80 px-3 py-1 font-mono text-[10px] text-accent/80 backdrop-blur-sm">
                {post.tags[0]}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-white transition-colors group-hover:text-accent/90">
              {post.title}
            </h3>
            <p className="mt-2.5 line-clamp-2 flex-1 text-[13px] leading-[1.7] text-body">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-4 border-t border-white/[0.05] pt-4">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-dim">
                <Calendar size={10} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-dim">
                <Clock size={10} />
                {post.readTime}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
