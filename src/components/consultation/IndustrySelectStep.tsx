"use client";

import { useMemo, useState } from "react";
import { clsx } from "@/lib/utils";
import type { Option } from "@/lib/types/consultation";

// Searchable industry picker. Type to filter a curated list of sectors by name
// OR by keyword (so "plumber" finds "Construction & trades", "landlord" finds
// "Property & lettings"). If their industry isn't listed, they can use whatever
// they typed. The stored value is the chosen sector label, or the free text.

export function IndustrySelectStep({
  value,
  options,
  onChange,
  error,
}: {
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  error?: string | null;
}) {
  const [query, setQuery] = useState(value ?? "");

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        (o.keywords ?? []).some((k) => k.toLowerCase().includes(q)),
    );
  }, [q, options]);

  // Offer the typed text as a custom answer when nothing matches exactly.
  const exactMatch = options.some((o) => o.label.toLowerCase() === q);
  const showCustom = q.length > 0 && !exactMatch;

  const pick = (v: string, display: string) => {
    onChange(v);
    setQuery(display);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your industry, e.g. plumber, café, landlord…"
        autoComplete="off"
        className={clsx(
          "w-full rounded-2xl border bg-cream-50 px-5 py-4 font-serif text-xl text-cocoa-300 outline-none transition-colors placeholder:text-cocoa-50/40 sm:text-2xl",
          error ? "border-champagne-dark" : "border-sand-100 focus:border-cocoa-300",
        )}
      />

      <div className="mt-4 max-h-[19rem] overflow-y-auto rounded-2xl border border-sand-100 bg-cream-50 p-1.5">
        <ul className="grid gap-1.5">
          {filtered.map((o) => {
            const selected = value === o.value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => pick(o.value, o.label)}
                  className={clsx(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-base transition-colors sm:text-lg",
                    selected
                      ? "bg-cocoa-300 text-cream-50"
                      : "text-cocoa-300 hover:bg-blush-50",
                  )}
                >
                  <span>{o.label}</span>
                  {selected ? <span aria-hidden>✓</span> : null}
                </button>
              </li>
            );
          })}

          {showCustom ? (
            <li>
              <button
                type="button"
                onClick={() => pick(query.trim(), query.trim())}
                className={clsx(
                  "flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-base transition-colors sm:text-lg",
                  value === query.trim()
                    ? "bg-cocoa-300 text-cream-50"
                    : "text-cocoa-300 hover:bg-blush-50",
                )}
              >
                <span className="text-champagne-dark">Use</span>
                <span className="font-medium">&ldquo;{query.trim()}&rdquo;</span>
              </button>
            </li>
          ) : null}

          {filtered.length === 0 && !showCustom ? (
            <li className="px-4 py-3 text-sm text-cocoa-50/70">No matches. Keep typing.</li>
          ) : null}
        </ul>
      </div>

      {error ? (
        <p className="mt-3 text-xs uppercase tracking-widest text-champagne-dark">{error}</p>
      ) : null}
    </div>
  );
}
