"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mb-4 mt-12 font-display text-[24px] font-bold tracking-[-0.02em] text-white first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-3 mt-8 font-display text-[18px] font-bold tracking-[-0.01em] text-white">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-5 text-[15px] leading-[1.85] text-body last:mb-0">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-accent/80 underline decoration-accent/20 underline-offset-2 transition-colors duration-200 hover:text-accent hover:decoration-accent/40"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="mb-5 ml-5 list-disc space-y-2 marker:text-accent/40">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-5 ml-5 list-decimal space-y-2 marker:text-accent/40">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="pl-1 text-[15px] leading-[1.8] text-body">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-2 border-accent/30 bg-accent/[0.02] py-4 pl-6 pr-4">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes("language-");
          if (isBlock) {
            return (
              <code className={`block text-[13px] leading-[1.7] text-gray-300 ${className || ""}`}>
                {children}
              </code>
            );
          }
          return (
            <code className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[13px] text-accent/80">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-6 overflow-x-auto rounded-xl border border-white/[0.08] bg-surface-1 p-5 font-mono text-[13px]">
            {children}
          </pre>
        ),
        img: ({ src, alt }) => (
          <figure className="my-8">
            <img
              src={src}
              alt={alt || ""}
              className="w-full rounded-xl border border-white/[0.06]"
            />
            {alt && (
              <figcaption className="mt-3 text-center text-[12px] text-dim">{alt}</figcaption>
            )}
          </figure>
        ),
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        hr: () => <div className="divider my-10" />,
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-[13px]">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.08em] text-dim">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-white/[0.04] px-4 py-3 text-body">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
