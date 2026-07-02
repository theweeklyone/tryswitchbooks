"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, ArrowRight } from "lucide-react";
import { site } from "@/data/site";

export type LocationFinderItem = {
  name: string;
  slug: string;
  county: string;
  nearbyAreas: string[];
};

const MAX_RESULTS = 6;

// On-model "find your area" typeahead. Not a generic content search — it matches
// the searcher's town (or a nearby area) and routes them to that local page, or
// to the free review if nothing matches. Data is passed in slim from the server
// so the heavy location copy never ships to the client.
export function LocationFinder({ items }: { items: LocationFinderItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matches = items.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.county.toLowerCase().includes(q) ||
        l.nearbyAreas.some((a) => a.toLowerCase().includes(q)),
    );
    // Name matches first, then rank by how early the match falls.
    return matches
      .sort((a, b) => {
        const ai = a.name.toLowerCase().indexOf(q);
        const bi = b.name.toLowerCase().indexOf(q);
        const aName = ai === -1 ? Infinity : ai;
        const bName = bi === -1 ? Infinity : bi;
        return aName - bName || a.name.localeCompare(b.name);
      })
      .slice(0, MAX_RESULTS);
  }, [items, query]);

  const go = (slug: string) => router.push(`/accountants/${slug}`);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) go(results[active].slug);
      else if (query.trim()) router.push(site.consultationUrl);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const showPanel = open && query.trim().length > 0;

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="flex items-center gap-3 rounded-full border border-sand-100 bg-cream-50 px-5 py-3 shadow-sm focus-within:border-champagne">
        <Search className="h-5 w-5 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="Find an accountant in your town"
          placeholder="Enter your town or area…"
          className="w-full bg-transparent text-base text-cocoa-300 placeholder:text-cocoa-50/60 focus:outline-none"
        />
      </div>

      {showPanel ? (
        <div
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-sand-100 bg-cream-50 shadow-lg"
        >
          {results.length > 0 ? (
            results.map((l, i) => (
              <button
                key={l.slug}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(l.slug)}
                className={`flex w-full items-center justify-between gap-3 px-5 py-3 text-left transition-colors ${
                  i === active ? "bg-blush-50" : "hover:bg-blush-50"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
                  <span>
                    <span className="block text-sm font-medium text-cocoa-300">
                      Accountants in {l.name}
                    </span>
                    <span className="block text-xs text-cocoa-50">{l.county}</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={2} aria-hidden />
              </button>
            ))
          ) : (
            <div className="px-5 py-4 text-sm text-cocoa-50">
              We don&apos;t have a page for &ldquo;{query.trim()}&rdquo; yet, but we still cover it.{" "}
              <a href={site.consultationUrl} className="font-medium text-champagne-dark hover:underline">
                Take the free review
              </a>{" "}
              and we&apos;ll match you anyway.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
