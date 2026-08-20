"use client";

import { clsx } from "@/lib/utils";

// Fast date-of-birth entry: a single field the visitor just types into. Digits
// only, slashes inserted automatically (15061985 -> 15/06/1985), numeric keypad
// on mobile. Far quicker than paging a native calendar back decades. The value
// is held as the DD/MM/YYYY display string; the flow converts it to ISO on
// submit.

function format(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 8);
  const parts = [d.slice(0, 2), d.slice(2, 4), d.slice(4, 8)].filter(Boolean);
  return parts.join("/");
}

export function DobStep({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
}) {
  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(format(e.target.value))}
        placeholder="DD / MM / YYYY"
        autoComplete="bday"
        className={clsx(
          "w-full rounded-2xl border bg-cream-50 px-5 py-5 font-serif text-2xl text-cocoa-300 outline-none transition-colors duration-200 placeholder:font-serif placeholder:text-cocoa-50/40 sm:py-6 sm:text-3xl",
          error ? "border-champagne-dark" : "border-sand-100 focus:border-cocoa-300",
        )}
      />
      {error ? (
        <p className="mt-3 text-xs uppercase tracking-widest text-champagne-dark">{error}</p>
      ) : null}
    </div>
  );
}
