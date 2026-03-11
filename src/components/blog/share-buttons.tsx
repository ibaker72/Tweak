"use client";
import { useState } from "react";
import { Link2, Check } from "lucide-react";

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.tweakandbuild.com/blog/${slug}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Share</span>
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-dim transition-all hover:border-white/[0.15] hover:text-white"
        aria-label="Share on X"
      >
        <XIcon size={12} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-dim transition-all hover:border-white/[0.15] hover:text-white"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon size={12} />
      </a>
      <button
        onClick={copyLink}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-dim transition-all hover:border-white/[0.15] hover:text-white"
        aria-label="Copy link"
      >
        {copied ? <Check size={12} className="text-accent" /> : <Link2 size={12} />}
      </button>
    </div>
  );
}
