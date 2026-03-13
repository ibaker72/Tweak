"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, ArrowLeft, Mail, Lock, Check, Loader2, KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

type Tab = "magic" | "password";

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("magic");

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-[420px]">
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
          <div className="mb-6 text-center">
            <h1 className="font-display text-[22px] font-bold tracking-[-0.02em] text-white">
              Sign In
            </h1>
            <p className="mt-1.5 text-[13px] leading-relaxed text-body">
              Access your portal to track progress, review deliverables, and manage approvals.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
            <TabButton active={tab === "magic"} onClick={() => setTab("magic")}>
              <Mail size={12} />
              Magic Link
            </TabButton>
            <TabButton active={tab === "password"} onClick={() => setTab("password")}>
              <Lock size={12} />
              Password
            </TabButton>
          </div>

          {tab === "magic" ? <MagicLinkForm /> : <PasswordForm />}
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

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-medium transition-all ${
        active
          ? "bg-white/[0.06] text-white shadow-sm"
          : "text-dim hover:text-body"
      }`}
    >
      {children}
    </button>
  );
}

function MagicLinkForm() {
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

  if (sent) {
    return (
      <div className="py-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <Check size={20} className="text-accent" />
        </div>
        <h2 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white">
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
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="magic-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
            Email address
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
            <input
              id="magic-email"
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

        {error && <p className="text-[12px] text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="btn-v w-full justify-center !py-3 !text-[13px] disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <>Send magic link</>}
        </button>
      </form>

      <p className="mt-5 text-center text-[11px] text-dim">
        We&apos;ll send a secure sign-in link to your email.
        <br />No password required.
      </p>
    </>
  );
}

function PasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (authError) {
      if (authError.message.includes("Invalid login")) {
        setError("Invalid email or password.");
      } else {
        setError(authError.message);
      }
      return;
    }

    // Fetch profile to determine redirect
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin" || profile?.role === "team") {
        router.push("/admin");
      } else {
        router.push("/client-portal");
      }
    } else {
      router.push("/client-portal");
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      }
    );

    setLoading(false);

    if (resetError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setResetSent(true);
  }

  if (resetSent) {
    return (
      <div className="py-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-v-dim">
          <KeyRound size={20} className="text-v-light" />
        </div>
        <h2 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white">
          Check your email
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-body">
          We sent a password reset link to{" "}
          <span className="font-medium text-white">{email}</span>.
        </p>
        <button
          onClick={() => { setResetSent(false); setShowReset(false); }}
          className="btn-o mx-auto mt-5 !px-5 !py-2 !text-[12px]"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  if (showReset) {
    return (
      <>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
              Email address
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
              <input
                id="reset-email"
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

          {error && <p className="text-[12px] text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="btn-v w-full justify-center !py-3 !text-[13px] disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <>Send reset link</>}
          </button>
        </form>

        <button
          onClick={() => { setShowReset(false); setError(null); }}
          className="mt-4 w-full text-center text-[12px] text-dim transition-colors hover:text-body"
        >
          Back to password sign in
        </button>
      </>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pw-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
            Email address
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
            <input
              id="pw-email"
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

        <div>
          <label htmlFor="pw-password" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
            Password
          </label>
          <div className="relative">
            <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
            <input
              id="pw-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="field !pl-9"
              disabled={loading}
            />
          </div>
        </div>

        {error && <p className="text-[12px] text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !email.trim() || !password}
          className="btn-v w-full justify-center !py-3 !text-[13px] disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <>Sign in</>}
        </button>
      </form>

      <button
        onClick={() => setShowReset(true)}
        className="mt-4 w-full text-center text-[12px] text-dim transition-colors hover:text-body"
      >
        Forgot password?
      </button>

      <p className="mt-3 text-center text-[11px] text-dim">
        For admin &amp; team accounts with a password set.
        <br />Clients can use the Magic Link tab.
      </p>
    </>
  );
}
