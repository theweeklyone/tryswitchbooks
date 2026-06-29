"use client";

import { useEffect } from "react";
import {
  LEAD_PRIORITIES,
  LEAD_PRIORITY_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type ConsultationLead,
  type LeadNote,
  type LeadPriority,
  type LeadStatus,
} from "@/lib/types/lead";
import { nudgesFor } from "@/lib/leads/nudges";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadPriorityBadge } from "./LeadPriorityBadge";
import { LeadNotesTimeline } from "./LeadNotesTimeline";
import { LeadActionButtons } from "./LeadActionButtons";
import { FollowUpNudge } from "./FollowUpNudge";
import { clsx } from "@/lib/utils";

const fmt = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const fmtDateOnly = (iso?: string) =>
  iso ? new Date(iso).toISOString().slice(0, 10) : "";

export function LeadDetailDrawer({
  lead,
  open,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
  onAssign,
  onAddNote,
  onUpdateFollowUp,
  onUpdateBookedValue,
  onMarkWon,
  onMarkLost,
}: {
  lead: ConsultationLead | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onUpdatePriority: (id: string, priority: LeadPriority) => void;
  onAssign: (id: string, assignee: string | undefined) => void;
  onAddNote: (id: string, content: string) => void;
  onUpdateFollowUp: (id: string, dateIso: string | undefined) => void;
  onUpdateBookedValue: (id: string, value: number | null) => void;
  onMarkWon: (id: string) => void;
  onMarkLost: (id: string) => void;
}) {
  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 bg-cocoa-300/30 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-label="Lead detail"
        className={clsx(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-2xl flex-col bg-cream-50 shadow-2xl transition-transform duration-500 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {lead ? (
          <DrawerContent
            lead={lead}
            onClose={onClose}
            onUpdateStatus={onUpdateStatus}
            onUpdatePriority={onUpdatePriority}
            onAssign={onAssign}
            onAddNote={onAddNote}
            onUpdateFollowUp={onUpdateFollowUp}
            onUpdateBookedValue={onUpdateBookedValue}
            onMarkWon={onMarkWon}
            onMarkLost={onMarkLost}
          />
        ) : null}
      </aside>
    </>
  );
}

function DrawerContent({
  lead,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
  onAssign,
  onAddNote,
  onUpdateFollowUp,
  onUpdateBookedValue,
  onMarkWon,
  onMarkLost,
}: {
  lead: ConsultationLead;
  onClose: () => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onUpdatePriority: (id: string, priority: LeadPriority) => void;
  onAssign: (id: string, assignee: string | undefined) => void;
  onAddNote: (id: string, content: string) => void;
  onUpdateFollowUp: (id: string, dateIso: string | undefined) => void;
  onUpdateBookedValue: (id: string, value: number | null) => void;
  onMarkWon: (id: string) => void;
  onMarkLost: (id: string) => void;
}) {
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  const nudges = nudgesFor(lead);
  const nameInitial = (lead.firstName || "?").charAt(0).toUpperCase();

  const submitNote = (content: string) => {
    const note: LeadNote = {
      id: `n_${lead.id}_${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdBy: "You",
      content,
    };
    onAddNote(lead.id, note.content);
    // Note: parent reconstructs the LeadNote with the same id pattern.
    // We keep `note` here for clarity; only `content` is sent upward.
    void note;
  };

  return (
    <>
      {/* Sticky drawer header */}
      <header className="sticky top-0 z-10 border-b border-sand-100 bg-cream-50/95 px-6 py-5 backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cocoa-300 font-serif text-xl text-cream-50">
              {nameInitial}
            </div>
            <div>
              <h2 className="font-serif text-2xl text-cocoa-300">{fullName}</h2>
              <p className="text-xs text-cocoa-50">
                {lead.email} · {lead.mobile}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <LeadStatusBadge status={lead.status} />
                <LeadPriorityBadge priority={lead.priority} />
                {lead.businessName ? (
                  <span className="inline-flex items-center rounded-full bg-blush-50 px-3 py-1 text-[10px] uppercase tracking-widest text-champagne-dark">
                    {lead.businessName}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 rounded-full p-2 text-cocoa-50 hover:bg-cream-100 hover:text-cocoa-300"
          >
            <span aria-hidden className="text-2xl leading-none">×</span>
          </button>
        </div>

        {nudges.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {nudges.map((n) => (
              <FollowUpNudge key={n.kind} nudge={n} />
            ))}
          </div>
        ) : null}
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-8">
          {/* Section: Client details */}
          <Section title="Contact">
            <DefinitionGrid
              rows={[
                ["Name", fullName],
                ["Business", lead.businessName || "—"],
                ["Email", lead.email],
                ["Mobile", lead.mobile],
                ["Business type", capitalize(lead.businessType)],
                ["Source", labelSource(lead.source)],
                ["Submitted", fmt(lead.createdAt)],
              ]}
            />
          </Section>

          {/* Section: Their current situation */}
          <Section title="Their current situation">
            <DefinitionGrid
              rows={[
                ["Accounts handled by", capitalize(lead.currentSituation)],
                ["How they feel", capitalize(lead.satisfaction)],
                ["Current provider", lead.currentProvider || "—"],
                ["Currently paying", spendLabel(lead.currentSpend)],
                [
                  "Frustrations",
                  lead.frustrations.length
                    ? lead.frustrations.map(capitalize).join(", ")
                    : "—",
                ],
              ]}
            />
          </Section>

          {/* Section: What they want */}
          <Section title="What they want">
            <DefinitionGrid
              rows={[
                [
                  "Help wanted",
                  lead.servicesWanted.length
                    ? lead.servicesWanted.map(capitalize).join(", ")
                    : "—",
                ],
                ["Primary need", capitalize(lead.primaryNeed)],
                ["Turnover", capitalize(lead.turnover)],
                ["Budget", budgetLabel(lead.budgetRange)],
                ["Timeline", capitalize(lead.timeline)],
                ["Match on (primary)", lead.recommendedService],
                ["Also consider", lead.secondaryRecommendation ?? "—"],
              ]}
            />
            {lead.extraNotes ? (
              <div className="mt-5 rounded-2xl border border-sand-100 bg-cream-100 p-4">
                <p className="text-[11px] uppercase tracking-widest text-cocoa-50/80">
                  From the client
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-300">
                  {lead.extraNotes}
                </p>
              </div>
            ) : null}
          </Section>

          {/* Section: Lead management */}
          <Section title="Lead management">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Status">
                <select
                  value={lead.status}
                  onChange={(e) =>
                    onUpdateStatus(lead.id, e.target.value as LeadStatus)
                  }
                  className="w-full rounded-xl border border-sand-100 bg-cream-50 px-3 py-2 text-sm text-cocoa-300 outline-none focus:border-cocoa-300"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {LEAD_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Priority">
                <select
                  value={lead.priority}
                  onChange={(e) =>
                    onUpdatePriority(lead.id, e.target.value as LeadPriority)
                  }
                  className="w-full rounded-xl border border-sand-100 bg-cream-50 px-3 py-2 text-sm text-cocoa-300 outline-none focus:border-cocoa-300"
                >
                  {LEAD_PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {LEAD_PRIORITY_LABELS[p]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Assigned to">
                <input
                  type="text"
                  value={lead.assignedTo ?? ""}
                  placeholder="Unassigned"
                  onChange={(e) =>
                    onAssign(lead.id, e.target.value || undefined)
                  }
                  className="w-full rounded-xl border border-sand-100 bg-cream-50 px-3 py-2 text-sm text-cocoa-300 outline-none focus:border-cocoa-300"
                />
              </Field>
              <Field label="Last contacted">
                <p className="text-sm text-cocoa-300">{fmt(lead.lastContactedAt)}</p>
              </Field>
              <Field label="Next follow-up">
                {/* PLACEHOLDER: simple date input. Real CRM gets a date+time picker. */}
                <input
                  type="date"
                  value={fmtDateOnly(lead.nextFollowUpAt)}
                  onChange={(e) =>
                    onUpdateFollowUp(
                      lead.id,
                      e.target.value
                        ? new Date(e.target.value).toISOString()
                        : undefined,
                    )
                  }
                  className="w-full rounded-xl border border-sand-100 bg-cream-50 px-3 py-2 text-sm text-cocoa-300 outline-none focus:border-cocoa-300"
                />
              </Field>
              <Field label="Estimated value">
                <p className="text-sm text-cocoa-300">£{lead.estimatedLeadValue}</p>
              </Field>
              <Field label="Budget (from quiz)">
                <p className="text-sm text-cocoa-300">{budgetLabel(lead.budgetRange)}</p>
              </Field>
              <Field label="Booked value">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-cocoa-300">£</span>
                  <input
                    key={lead.id}
                    type="number"
                    min={0}
                    defaultValue={lead.bookedValue ?? ""}
                    onBlur={(e) => {
                      const raw = e.target.value.trim();
                      const n = Number(raw);
                      onUpdateBookedValue(
                        lead.id,
                        raw === "" || !Number.isFinite(n) ? null : Math.max(0, Math.round(n)),
                      );
                    }}
                    placeholder="Not booked yet"
                    className="w-full rounded-xl border border-sand-100 bg-cream-50 px-3 py-2 text-sm text-cocoa-300 outline-none focus:border-cocoa-300"
                  />
                </div>
              </Field>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onMarkWon(lead.id)}
                disabled={lead.status === "won"}
                className={clsx(
                  "rounded-full px-4 py-2 text-[11px] uppercase tracking-widest transition",
                  lead.status === "won"
                    ? "bg-cocoa-300 text-cream-50 opacity-60"
                    : "border border-cocoa-300 bg-cocoa-300 text-cream-50 hover:bg-cocoa-200",
                )}
              >
                {lead.status === "won" ? "Matched & signed ✓" : "Matched & signed"}
              </button>
              <button
                type="button"
                onClick={() => onMarkLost(lead.id)}
                disabled={lead.status === "lost"}
                className={clsx(
                  "rounded-full border px-4 py-2 text-[11px] uppercase tracking-widest transition",
                  lead.status === "lost"
                    ? "border-sand-200 bg-cream-100 text-cocoa-50 opacity-70"
                    : "border-sand-200 bg-cream-50 text-cocoa-50 hover:border-cocoa-300 hover:text-cocoa-300",
                )}
              >
                {lead.status === "lost" ? "Didn't proceed ✓" : "Didn't proceed"}
              </button>
            </div>
          </Section>

          {/* Section: Actions */}
          <Section title="Quick actions">
            <LeadActionButtons lead={lead} />
          </Section>

          {/* Section: Notes */}
          <Section title="Internal notes">
            <LeadNotesTimeline
              notes={lead.internalNotes}
              onAddNote={(content) => submitNote(content)}
            />
          </Section>
        </div>
      </div>
    </>
  );
}

// ── Tiny presentational helpers ────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-[11px] uppercase tracking-widest text-champagne-dark">
        {title}
      </h3>
      {children}
    </section>
  );
}

function DefinitionGrid({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-1 gap-3 rounded-2xl border border-sand-100 bg-cream-50 p-4">
      {rows.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
          <dt className="w-40 shrink-0 text-[11px] uppercase tracking-widest text-cocoa-50/80">
            {k}
          </dt>
          <dd className="min-w-0 break-words text-sm text-cocoa-300">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-widest text-cocoa-50/80">
        {label}
      </span>
      {children}
    </label>
  );
}

function capitalize(s: string) {
  if (!s) return "—";
  return s.charAt(0).toUpperCase() + s.slice(1).replaceAll("-", " ");
}

function budgetLabel(b: string) {
  const map: Record<string, string> = {
    "under-100": "Under £100/mo",
    "100-250": "£100–£250/mo",
    "250-500": "£250–£500/mo",
    "500-1000": "£500–£1,000/mo",
    "1000-2000": "£1,000–£2,000/mo",
    "2000-plus": "£2,000+/mo",
    guidance: "Wants guidance",
  };
  return map[b] ?? (b ? b : "—");
}

function spendLabel(s: string) {
  const map: Record<string, string> = {
    "under-100": "Under £100/mo",
    "100-250": "£100–£250/mo",
    "250-500": "£250–£500/mo",
    "500-plus": "£500+/mo",
    annual: "One-off annual fee",
    unknown: "Not sure / none",
  };
  return map[s] ?? (s ? s : "—");
}

function labelSource(s: string) {
  const map: Record<string, string> = {
    "review-quiz": "Business review",
    "contact-form": "Contact form",
    phone: "Phone",
    referral: "Referral",
  };
  return map[s] ?? s;
}
