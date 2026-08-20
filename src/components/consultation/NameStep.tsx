"use client";

import { clsx } from "@/lib/utils";
import type { NameValue } from "@/lib/types/consultation";

// First and last name in one step, as two separate boxes (side by side on
// larger screens, stacked on mobile).

const inputClass = (error?: string | null) =>
  clsx(
    "w-full rounded-2xl border bg-cream-50 px-5 py-4 font-serif text-xl text-cocoa-300 outline-none transition-colors duration-200 placeholder:font-serif placeholder:text-cocoa-50/40 sm:text-2xl",
    error ? "border-champagne-dark" : "border-sand-100 focus:border-cocoa-300",
  );

export function NameStep({
  value,
  onChange,
  error,
}: {
  value: NameValue;
  onChange: (v: NameValue) => void;
  error?: string | null;
}) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={value.first}
          onChange={(e) => onChange({ ...value, first: e.target.value })}
          placeholder="First name"
          autoComplete="given-name"
          className={inputClass(error)}
        />
        <input
          type="text"
          value={value.last}
          onChange={(e) => onChange({ ...value, last: e.target.value })}
          placeholder="Last name"
          autoComplete="family-name"
          className={inputClass(error)}
        />
      </div>
      {error ? (
        <p className="mt-3 text-xs uppercase tracking-widest text-champagne-dark">{error}</p>
      ) : null}
    </div>
  );
}
