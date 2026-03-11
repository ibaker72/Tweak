"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { Reveal } from "@/components/shared";
import { MarkdownRenderer } from "./markdown-renderer";
import { ShareButtons } from "./share-buttons";
import { BlogCard } from "./blog-card";
import { NewsletterInline } from "@/components/marketing/newsletter-inline";

export function BlogPostView({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  return (
    <article className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        {/* Back link */}
        <Reveal>
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-[13px] text-dim transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={13} /> Studio Journal
          </Link>
        </Reveal>

        {/* Post header */}
        <Reveal delay={0.05}>
          <header className="mx-auto max-w-[720px]">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/[0.2] bg-accent/[0.06] px-3 py-1 font-mono text-[10px] text-accent/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-[clamp(28px,5vw,44px)] font-black leading-[1.1] tracking-[-0.035em] text-white">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-white/[0.06] pb-6">
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-dim">
                <User size={11} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-dim">
                <Calendar size={11} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-dim">
                <Clock size={11} />
                {post.readTime}
              </span>
              <div className="ml-auto">
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </div>
          </header>
        </Reveal>

        {/* Post content */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-[720px]">
            <MarkdownRenderer content={post.content} />
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-16 max-w-[720px]">
            <NewsletterInline source="blog-post" />
          </div>
        </Reveal>

        {/* Project CTA */}
        <Reveal delay={0.14}>
          <div className="mx-auto mt-10 max-w-[720px]">
            <div className="rounded-2xl border border-accent/[0.12] bg-accent/[0.03] p-8 text-center">
              <h3 className="font-display text-[20px] font-bold text-white">
                Have a project in mind?
              </h3>
              <p className="mt-2 text-[14px] text-body">
                Let&apos;s talk about building something for your business.
              </p>
              <Link href="/contact" className="btn-v mt-5 inline-flex">
                Start a project <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-[720px]">
            <Reveal delay={0.16}>
              <div className="divider" />
              <h3 className="mb-8 mt-10 font-display text-[20px] font-bold text-white">
                Related posts
              </h3>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p.slug} post={p} delay={0.18 + i * 0.06} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
