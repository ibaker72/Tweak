"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Check, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/login"), 2000);
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

        <div className="card-premium">
          {done ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                <Check size={20} className="text-emerald-400" />
              </div>
              <h2 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white">
                Password updated
              </h2>
              <p className="mt-2 text-[13px] text-body">
                Redirecting to sign in...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h1 className="font-display text-[22px] font-bold tracking-[-0.02em] text-white">
                  Set New Password
                </h1>
                <p className="mt-1.5 text-[13px] leading-relaxed text-body">
                  Choose a secure password for your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="new-pw" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                    <input
                      id="new-pw"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="field !pl-9"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-pw" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                    <input
                      id="confirm-pw"
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="field !pl-9"
                      disabled={loading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-400/[0.04] px-3 py-2.5">
                    <AlertCircle size={13} className="mt-0.5 flex-shrink-0 text-red-400" />
                    <p className="text-[12px] text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !password || !confirm}
                  className="btn-v w-full justify-center !py-3 !text-[13px] disabled:opacity-50"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <>Update password</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
