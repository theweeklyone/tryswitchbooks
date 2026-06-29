"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// Forced password change. Middleware sends anyone with a temporary password
// (user_metadata.must_change_password = true) here until they set a new one.
// Saving the new password also clears the flag.

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Please use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }
    if (password === "Password123") {
      setError("Please choose a new password, not the temporary one.");
      return;
    }
    setSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: err } = await supabase.auth.updateUser({
        password,
        data: { must_change_password: false },
      });
      if (err) throw err;
      // Full navigation so middleware re-checks with the flag now cleared.
      window.location.href = "/dashboard/leads";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update your password. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-md py-6">
      <div className="rounded-2xl border border-sand-100 bg-cream-50 p-7 sm:p-8">
        <p className="eyebrow">Welcome</p>
        <h1 className="mt-2 font-serif text-3xl text-cocoa-300">Set your password</h1>
        <p className="mt-3 text-sm leading-relaxed text-cocoa-50">
          You are signed in with a temporary password. Please choose a new one to
          finish setting up your account.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-champagne-dark">
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="mt-1.5 w-full rounded-xl border border-sand-100 bg-cream-50 px-3 py-2.5 text-sm text-cocoa-300 outline-none focus:border-cocoa-300"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-champagne-dark">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              placeholder="Type it again"
              className="mt-1.5 w-full rounded-xl border border-sand-100 bg-cream-50 px-3 py-2.5 text-sm text-cocoa-300 outline-none focus:border-cocoa-300"
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-blush-100 px-4 py-3 text-sm text-cocoa-300">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-cocoa-300 px-6 py-3 text-xs uppercase tracking-widest text-cream-50 transition hover:bg-cocoa-200 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save new password"}
          </button>
        </form>
      </div>
    </div>
  );
}
