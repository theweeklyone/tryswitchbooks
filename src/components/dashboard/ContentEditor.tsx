"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ContentMap } from "@/lib/content";
import type { EditablePage } from "@/data/editable";

// Dashboard → Content editor. Left-hand menu of pages; the selected page's
// fields show on the right, pre-filled with the current wording. Saving only
// writes changed fields; clearing a box (or matching the default) reverts to
// the built-in default.

export function ContentEditor({
  pages,
  values,
}: {
  pages: EditablePage[];
  values: ContentMap;
}) {
  // Effective starting value for every field: saved override, else default.
  const initial = useMemo(() => {
    const m: Record<string, string> = {};
    for (const p of pages) {
      for (const g of p.groups) {
        for (const f of g.fields) {
          const def = f.type === "toggle" ? (f.default ? "true" : "false") : f.default;
          const saved = values[f.key];
          m[f.key] = saved != null && saved !== "" ? saved : def;
        }
      }
    }
    return m;
  }, [pages, values]);

  const defaults = useMemo(() => {
    const m: Record<string, string> = {};
    for (const p of pages) {
      for (const g of p.groups) {
        for (const f of g.fields) {
          m[f.key] = f.type === "toggle" ? (f.default ? "true" : "false") : f.default;
        }
      }
    }
    return m;
  }, [pages]);

  const [active, setActive] = useState(pages[0]?.id ?? "");
  const [draft, setDraft] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const page = pages.find((p) => p.id === active) ?? pages[0];
  const dirty = Object.keys(draft).some((k) => draft[k] !== initial[k]);

  const set = (key: string, v: string) => {
    setDraft((p) => ({ ...p, [key]: v }));
    setStatus(null);
  };

  async function save() {
    setSaving(true);
    setError(null);
    setStatus(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const changed = Object.keys(draft).filter((k) => draft[k] !== initial[k]);
      for (const key of changed) {
        const v = draft[key] ?? "";
        // Blank, or equal to the built-in default → clear the override.
        if (v.trim() === "" || v === defaults[key]) {
          const { error } = await supabase.rpc("delete_content_block", { p_key: key });
          if (error) throw error;
        } else {
          const { error } = await supabase.rpc("set_content_block", { p_key: key, p_value: v });
          if (error) throw error;
        }
      }
      // Reflect saved state as the new baseline.
      for (const key of changed) initial[key] = draft[key];
      setStatus(`Saved ${changed.length} change${changed.length === 1 ? "" : "s"}. Live within a minute.`);
    } catch (err) {
      setError(
        (err instanceof Error ? err.message : "Something went wrong.") +
          " If this is the first time, make sure the Supabase setup (content.sql) has been run.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
      {/* Left page menu */}
      <nav className="lg:sticky lg:top-24 lg:self-start">
        <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {pages.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActive(p.id)}
                className={
                  "w-full whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm transition " +
                  (p.id === active
                    ? "bg-cocoa-300 text-cream-50"
                    : "text-cocoa-300 hover:bg-cream-100")
                }
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Selected page's fields */}
      <div className="space-y-6">
        {page?.groups.map((g) => (
          <section
            key={g.title}
            className="rounded-2xl border border-sand-100 bg-cream-50 p-6 sm:p-7"
          >
            <h2 className="font-serif text-xl text-cocoa-300">{g.title}</h2>
            {g.description ? <p className="mt-1 text-sm text-cocoa-50">{g.description}</p> : null}
            <div className="mt-5 space-y-5">
              {g.fields.map((f) =>
                f.type === "toggle" ? (
                  <label key={f.key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={draft[f.key] === "true"}
                      onChange={(e) => set(f.key, e.target.checked ? "true" : "false")}
                      className="h-5 w-5 accent-cocoa-300"
                    />
                    <span className="text-sm text-cocoa-300">{f.label}</span>
                  </label>
                ) : (
                  <label key={f.key} className="block">
                    <span className="text-xs uppercase tracking-widest text-champagne-dark">
                      {f.label}
                    </span>
                    {f.type === "textarea" ? (
                      <textarea
                        value={draft[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        rows={3}
                        className="mt-2 w-full rounded-xl border border-sand-100 bg-cream-50 px-4 py-3 text-sm text-cocoa-300 outline-none transition focus:border-cocoa-300"
                      />
                    ) : (
                      <input
                        type="text"
                        value={draft[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        className="mt-2 w-full rounded-xl border border-sand-100 bg-cream-50 px-4 py-3 text-sm text-cocoa-300 outline-none transition focus:border-cocoa-300"
                      />
                    )}
                    {f.help ? (
                      <span className="mt-1 block text-xs text-cocoa-50/70">{f.help}</span>
                    ) : null}
                  </label>
                ),
              )}
            </div>
          </section>
        ))}

        {error ? (
          <p className="rounded-lg bg-blush-100 px-4 py-3 text-sm text-cocoa-300">{error}</p>
        ) : null}

        <div className="sticky bottom-4 flex items-center gap-4">
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="rounded-full bg-cocoa-300 px-6 py-3 text-xs uppercase tracking-widest text-cream-50 transition hover:bg-cocoa-200 disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {status ? <span className="text-sm text-champagne-dark">{status}</span> : null}
        </div>
      </div>
    </div>
  );
}
