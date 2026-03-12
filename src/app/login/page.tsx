"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, Mail, Check, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (authError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <Link href="/" className="mb-10 flex items-center justify-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--brand-radius-sm)] bg-accent shadow-[0_1px_4px_rgba(200,255,0,0.12)]">
            <Terminal size={14} className="text-surface-0" />
          </div>
          <span className="font-display text-[17px] font-extrabold tracking-[-0.03em] text-white">
            Tweak<span className="text-accent">&amp;</span>Build
          </span>
        </Link>

        {/* Card */}
        <div className="card-premium">
          {!sent ? (
            <>
              <div className="mb-6 text-center">
                <h1 className="font-display text-[22px] font-bold tracking-[-0.02em] text-white">
                  Client Portal
                </h1>
                <p className="mt-1.5 text-[13px] leading-relaxed text-body">
                  Sign in to track your project progress, review deliverables, and manage approvals.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="field !pl-9"
                      disabled={loading}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[12px] text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="btn-v w-full justify-center !py-3 !text-[13px] disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>Send magic link</>
                  )}
                </button>
              </form>

              <p className="mt-5 text-center text-[11px] text-dim">
                We&apos;ll send a secure sign-in link to your email.
                <br />No password required.
              </p>
            </>
          ) : (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Check size={20} className="text-accent" />
              </div>
              <h2 className="font-display text-[20px] font-bold tracking-[-0.02em] text-white">
                Check your email
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-body">
                We sent a sign-in link to{" "}
                <span className="font-medium text-white">{email}</span>.
                <br />Click the link to access your portal.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="btn-o mx-auto mt-5 !px-5 !py-2 !text-[12px]"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-dim transition-colors hover:text-body"
          >
            <ArrowLeft size={12} />
            Back to tweakandbuild.com
          </Link>
        </div>
      </div>
    </div>
  );
}
