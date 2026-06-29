"use client";

import { useState } from "react";
import {
  LEAD_STATUS_LABELS,
  type LeadNote,
  type LeadStatus,
} from "@/lib/types/lead";
import { clsx } from "@/lib/utils";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

// Internal notes timeline + "Add note" form.
// Notes are kept in the parent's lead record. Status changes are tagged.

export function LeadNotesTimeline({
  notes,
  onAddNote,
}: {
  notes: LeadNote[];
  onAddNote: (content: string) => void;
}) {
  const [draft, setDraft] = useState("");

  const submit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAddNote(trimmed);
    setDraft("");
  };

  return (
    <div>
      <div className="rounded-2xl border border-sand-100 bg-cream-50 p-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a note for the team…"
          rows={3}
          className="w-full resize-y rounded-xl border border-sand-100 bg-cream-50 p-3 text-sm text-cocoa-300 outline-none transition focus:border-cocoa-300 placeholder:text-cocoa-50/50"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={submit}
            disabled={!draft.trim()}
            className={clsx(
              "rounded-full bg-cocoa-300 px-4 py-2 text-[11px] uppercase tracking-widest text-cream-50 transition",
              !draft.trim() && "opacity-40",
            )}
          >
            Add note
          </button>
        </div>
      </div>

      {notes.length === 0 ? (
        <p className="mt-6 text-center text-sm text-cocoa-50/70">
          No internal notes yet. Add the first one above.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {[...notes]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((n) => (
              <li
                key={n.id}
                className="rounded-2xl border border-sand-100 bg-cream-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-widest text-cocoa-50/80">
                    <span className="text-cocoa-300">{n.createdBy}</span>
                    <span className="mx-2 opacity-60">·</span>
                    <span>{fmt(n.createdAt)}</span>
                  </div>
                  {n.statusChange ? (
                    <span className="rounded-full bg-blush-50 px-2.5 py-1 text-[10px] uppercase tracking-widest text-champagne-dark">
                      {LEAD_STATUS_LABELS[n.statusChange.from as LeadStatus]} →{" "}
                      {LEAD_STATUS_LABELS[n.statusChange.to as LeadStatus]}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-300">
                  {n.content}
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
