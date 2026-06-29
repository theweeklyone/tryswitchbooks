"use client";

import {
  LEAD_PRIORITIES,
  LEAD_PRIORITY_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
} from "@/lib/types/lead";
import type { LeadFiltersState } from "@/lib/leads/filters";
import { initialFilters } from "@/lib/leads/filters";
import { services } from "@/data/services";

// Filter + search bar above the lead table.
// Single source of truth lives in the parent; we receive value + onChange.

export function LeadFilters({
  value,
  onChange,
  totalLeads,
  visibleLeads,
}: {
  value: LeadFiltersState;
  onChange: (next: LeadFiltersState) => void;
  totalLeads: number;
  visibleLeads: number;
}) {
  const set = <K extends keyof LeadFiltersState>(
    key: K,
    v: LeadFiltersState[K],
  ) => onChange({ ...value, [key]: v });

  const clear = () => onChange(initialFilters);

  const isFiltered =
    JSON.stringify(value) !== JSON.stringify(initialFilters);

  return (
    <div className="mb-6 rounded-2xl border border-sand-100 bg-cream-50 p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        <label className="lg:col-span-2">
          <span className="sr-only">Search leads</span>
          <input
            type="search"
            value={value.search}
            onChange={(e) => set("search", e.target.value)}
            placeholder="Search name, email or mobile…"
            className="w-full rounded-full border border-sand-100 bg-cream-50 px-4 py-2.5 text-sm text-cocoa-300 outline-none transition focus:border-cocoa-300 placeholder:text-cocoa-50/50"
          />
        </label>

        <Select
          value={value.status}
          onChange={(v) => set("status", v as LeadFiltersState["status"])}
          options={[
            { value: "all", label: "All statuses" },
            ...LEAD_STATUSES.map((s) => ({
              value: s,
              label: LEAD_STATUS_LABELS[s],
            })),
          ]}
        />

        <Select
          value={value.service}
          onChange={(v) => set("service", v)}
          options={[
            { value: "all", label: "All needs" },
            ...services.map((s) => ({ value: s.slug, label: s.name })),
            { value: "personal-tax", label: "Personal tax & self-assessment" },
            { value: "unsure", label: "Not sure / guidance" },
          ]}
        />

        <Select
          value={value.priority}
          onChange={(v) => set("priority", v as LeadFiltersState["priority"])}
          options={[
            { value: "all", label: "All priorities" },
            ...LEAD_PRIORITIES.map((p) => ({
              value: p,
              label: LEAD_PRIORITY_LABELS[p],
            })),
          ]}
        />

        <Select
          value={value.timeline}
          onChange={(v) => set("timeline", v as LeadFiltersState["timeline"])}
          options={[
            { value: "all", label: "Any timeline" },
            { value: "asap", label: "ASAP" },
            { value: "1-3-months", label: "1–3 months" },
            { value: "year-end", label: "At year-end" },
            { value: "exploring", label: "Just exploring" },
          ]}
        />

        <Select
          value={value.assignedTo}
          onChange={(v) => set("assignedTo", v)}
          options={[
            { value: "all", label: "Assignment: any" },
            { value: "unassigned", label: "Unassigned" },
          ]}
        />
      </div>

      <div className="mt-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          {/* PLACEHOLDER: real date range picker. For now: simple "from" date. */}
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-cocoa-50">
            From
            <input
              type="date"
              value={value.dateFrom}
              onChange={(e) => set("dateFrom", e.target.value)}
              className="rounded-full border border-sand-100 bg-cream-50 px-3 py-1.5 text-xs text-cocoa-300 outline-none focus:border-cocoa-300"
            />
          </label>
          <span className="text-[11px] uppercase tracking-widest text-cocoa-50/70">
            Showing {visibleLeads} of {totalLeads}
          </span>
        </div>

        {isFiltered ? (
          <button
            type="button"
            onClick={clear}
            className="text-[11px] uppercase tracking-widest text-cocoa-300 hover:text-champagne-dark"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-full border border-sand-100 bg-cream-50 px-3 py-2.5 text-sm text-cocoa-300 outline-none transition focus:border-cocoa-300"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
