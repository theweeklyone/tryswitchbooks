"use client";

import { clsx } from "@/lib/utils";
import type { CompanyEntry } from "@/lib/types/consultation";

// Repeatable list of limited-company directorships (name + Companies House
// number). Shown only when the visitor said they run a limited company. They
// can add as many as they're a director of.

const empty = (): CompanyEntry => ({ name: "", number: "" });

export function CompaniesStep({
  value,
  onChange,
  error,
}: {
  value: CompanyEntry[];
  onChange: (v: CompanyEntry[]) => void;
  error?: string | null;
}) {
  const companies = value.length ? value : [empty()];

  const update = (i: number, patch: Partial<CompanyEntry>) => {
    const next = companies.map((c, idx) => (idx === i ? { ...c, ...patch } : c));
    onChange(next);
  };

  const add = () => onChange([...companies, empty()]);

  const remove = (i: number) => {
    const next = companies.filter((_, idx) => idx !== i);
    onChange(next.length ? next : [empty()]);
  };

  return (
    <div>
      <div className="grid gap-5">
        {companies.map((c, i) => (
          <div
            key={i}
            className="rounded-2xl border border-sand-100 bg-cream-50 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-cocoa-50/70">
                {companies.length > 1 ? `Company ${i + 1}` : "Company"}
              </p>
              {companies.length > 1 ? (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-xs uppercase tracking-widest text-cocoa-50/60 transition hover:text-champagne-dark"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]">
              <input
                type="text"
                value={c.name}
                onChange={(e) => update(i, { name: e.target.value })}
                placeholder="Company name"
                autoComplete="organization"
                className="w-full rounded-xl border border-sand-100 bg-white px-4 py-3.5 font-serif text-lg text-cocoa-300 outline-none transition-colors placeholder:text-cocoa-50/40 focus:border-cocoa-300 sm:text-xl"
              />
              <input
                type="text"
                value={c.number}
                onChange={(e) =>
                  update(i, {
                    // 8 chars, digits or a letter prefix (e.g. SC for Scotland).
                    number: e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 8),
                  })
                }
                placeholder="Company number"
                className="w-full rounded-xl border border-sand-100 bg-white px-4 py-3.5 font-serif text-lg text-cocoa-300 outline-none transition-colors placeholder:text-cocoa-50/40 focus:border-cocoa-300 sm:text-xl"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-cocoa-300/25 px-5 py-2.5 text-xs uppercase tracking-widest text-cocoa-300 transition hover:border-cocoa-300 hover:bg-cocoa-300 hover:text-cream-50"
      >
        + Add another company
      </button>

      {error ? (
        <p className={clsx("mt-4 text-xs uppercase tracking-widest text-champagne-dark")}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
