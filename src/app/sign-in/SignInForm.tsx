"use client";

import { useEffect, useState, useTransition } from "react";
import { sendMagicLink, signInWithPassword } from "./actions";

function readFragmentError(): string | null {
  if (typeof window === "undefined") return null;
  const fragment = window.location.hash.replace(/^#/, "");
  if (!fragment) return null;
  const params = new URLSearchParams(fragment);
  const code = params.get("error_code");
  const desc = params.get("error_description");
  if (!code && !desc) return null;
  if (code === "otp_expired") {
    return "That sign-in link is no longer valid. Magic links expire after one click or after about an hour. Request a fresh one.";
  }
  return desc?.replace(/\+/g, " ") ?? "Sign-in failed. Please try again.";
}

export function SignInForm({ next, error }: { next: string; error?: string }) {
  const [mode, setMode] = useState<"password" | "link">("password");
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(
    error === "not-admin"
      ? "That email isn't on the allow-list. Check it's the address registered in your Supabase project."
      : null,
  );

  useEffect(() => {
    const fragmentError = readFragmentError();
    if (fragmentError) {
      setFormError(fragmentError);
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  if (sent) {
    return (
      <div className="rounded-3xl border border-sand-100 bg-cream-50 p-8 text-center shadow-[0_2px_24px_-12px_rgba(21,17,15,0.10)]">
        <p className="eyebrow">Check your inbox</p>
        <h2 className="mt-3 font-serif text-2xl text-cocoa-300">
          We&rsquo;ve sent you a link.
        </h2>
        <p className="mt-3 text-sm text-cocoa-50">
          Open <strong>{email}</strong> and click the sign-in link. It&rsquo;ll bring
          you back here, signed in.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setEmail("");
            setFormError(null);
          }}
          className="mt-6 text-[11px] uppercase tracking-widest text-champagne-dark hover:text-cocoa-300"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form
      action={(fd) => {
        setFormError(null);
        startTransition(async () => {
          if (mode === "password") {
            const result = await signInWithPassword(fd);
            if (result.ok) {
              // Full navigation so the new session cookie is picked up.
              window.location.href = next;
            } else {
              setFormError(result.error);
            }
          } else {
            const result = await sendMagicLink(fd);
            if (result.ok) setSent(true);
            else setFormError(result.error);
          }
        });
      }}
      className="rounded-3xl border border-sand-100 bg-cream-50 p-8 shadow-[0_2px_24px_-12px_rgba(21,17,15,0.10)]"
    >
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="eyebrow">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@tryswitchbooks.co.uk"
          className="mt-3 w-full rounded-2xl border border-sand-200 bg-cream-100 px-4 py-3 text-base text-cocoa-300 placeholder:text-cocoa-50/50 focus:border-cocoa-300 focus:outline-none"
        />
      </label>

      {mode === "password" ? (
        <label className="mt-5 block">
          <span className="eyebrow">Password</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Your password"
            className="mt-3 w-full rounded-2xl border border-sand-200 bg-cream-100 px-4 py-3 text-base text-cocoa-300 placeholder:text-cocoa-50/50 focus:border-cocoa-300 focus:outline-none"
          />
        </label>
      ) : null}

      {formError ? (
        <p className="mt-3 text-sm text-red-600">{formError}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary mt-6 w-full justify-center disabled:opacity-60"
      >
        {pending
          ? mode === "password"
            ? "Signing in…"
            : "Sending…"
          : mode === "password"
            ? "Sign in"
            : "Send me a sign-in link"}
      </button>

      <button
        type="button"
        onClick={() => {
          setMode((m) => (m === "password" ? "link" : "password"));
          setFormError(null);
        }}
        className="mt-4 block w-full text-center text-[11px] uppercase tracking-widest text-champagne-dark hover:text-cocoa-300"
      >
        {mode === "password"
          ? "Or email me a one-time link instead"
          : "Or sign in with a password"}
      </button>
    </form>
  );
}
