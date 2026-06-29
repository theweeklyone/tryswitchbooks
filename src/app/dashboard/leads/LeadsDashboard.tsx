"use client";

import { useMemo, useState, useTransition } from "react";
import {
  type ConsultationLead,
  type LeadNote,
  type LeadPriority,
  type LeadStatus,
} from "@/lib/types/lead";
import {
  applyFilters,
  initialFilters,
  type LeadFiltersState,
} from "@/lib/leads/filters";
import { downloadCsv, leadsToCsv } from "@/lib/leads/csv";
import {
  addLeadNote,
  assignLead,
  updateLeadBookedValue,
  updateLeadFollowUp,
  updateLeadPriority,
  updateLeadStatus,
} from "./actions";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LeadKpiCard } from "@/components/dashboard/LeadKpiCard";
import { LeadFilters } from "@/components/dashboard/LeadFilters";
import { LeadTable } from "@/components/dashboard/LeadTable";
import { LeadDetailDrawer } from "@/components/dashboard/LeadDetailDrawer";

// Mutations are optimistic: local state updates immediately, then the
// Server Action persists. On failure we log; a simple page reload re-syncs
// from Supabase (page is force-dynamic).

const fmtMoney = (v: number) =>
  v >= 1000 ? `£${(v / 1000).toFixed(1)}k` : `£${v}`;

const localNoteId = () =>
  `n_local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

export function LeadsDashboard({
  initialLeads,
}: {
  initialLeads: ConsultationLead[];
}) {
  const [leads, setLeads] = useState<ConsultationLead[]>(initialLeads);
  const [filters, setFilters] = useState<LeadFiltersState>(initialFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const visible = useMemo(() => applyFilters(leads, filters), [leads, filters]);

  const patchLocal = (
    id: string,
    patch: Partial<ConsultationLead>,
    note?: LeadNote,
  ) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              ...patch,
              internalNotes: note ? [...l.internalNotes, note] : l.internalNotes,
            }
          : l,
      ),
    );
  };

  const onUpdateStatus = (id: string, status: LeadStatus) => {
    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.status === status) return;
    const optimisticNote: LeadNote = {
      id: localNoteId(),
      createdAt: new Date().toISOString(),
      createdBy: "You",
      content: `Status changed to ${status}.`,
      statusChange: { from: lead.status, to: status },
    };
    patchLocal(
      id,
      { status, lastContactedAt: new Date().toISOString() },
      optimisticNote,
    );
    startTransition(async () => {
      const result = await updateLeadStatus(id, lead.status, status);
      if (!result.ok) console.error("[updateLeadStatus]", result.error);
    });
  };

  const onUpdatePriority = (id: string, priority: LeadPriority) => {
    patchLocal(id, { priority });
    startTransition(async () => {
      const result = await updateLeadPriority(id, priority);
      if (!result.ok) console.error("[updateLeadPriority]", result.error);
    });
  };

  const onAssign = (id: string, assignee: string | undefined) => {
    patchLocal(id, { assignedTo: assignee });
    startTransition(async () => {
      const result = await assignLead(id, assignee ?? null);
      if (!result.ok) console.error("[assignLead]", result.error);
    });
  };

  const onAddNote = (id: string, content: string) => {
    const optimisticNote: LeadNote = {
      id: localNoteId(),
      createdAt: new Date().toISOString(),
      createdBy: "You",
      content,
    };
    patchLocal(id, {}, optimisticNote);
    startTransition(async () => {
      const result = await addLeadNote(id, content);
      if (!result.ok) console.error("[addLeadNote]", result.error);
    });
  };

  const onUpdateFollowUp = (id: string, dateIso: string | undefined) => {
    patchLocal(id, { nextFollowUpAt: dateIso });
    startTransition(async () => {
      const result = await updateLeadFollowUp(id, dateIso ?? null);
      if (!result.ok) console.error("[updateLeadFollowUp]", result.error);
    });
  };

  const onUpdateBookedValue = (id: string, value: number | null) => {
    patchLocal(id, { bookedValue: value });
    startTransition(async () => {
      const result = await updateLeadBookedValue(id, value);
      if (!result.ok) console.error("[updateLeadBookedValue]", result.error);
    });
  };

  const onMarkWon = (id: string) => onUpdateStatus(id, "won");
  const onMarkLost = (id: string) => onUpdateStatus(id, "lost");

  const kpis = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const readyToMove = leads.filter((l) => l.timeline === "asap").length;
    const pipelineValue = leads
      .filter((l) => !["won", "lost"].includes(l.status))
      .reduce((sum, l) => sum + l.estimatedLeadValue, 0);
    const hot = leads.filter((l) => l.priority === "hot").length;
    const won = leads.filter((l) => l.status === "won").length;
    return { total, newCount, readyToMove, pipelineValue, hot, won };
  }, [leads]);

  const exportCsv = () => {
    const csv = leadsToCsv(visible);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`switchbooks-leads-${stamp}.csv`, csv);
  };

  const addLeadPlaceholder = () => {
    alert("Add Lead is coming soon. Phone enquiries can be entered here.");
  };

  const selectedLead = selectedId
    ? leads.find((l) => l.id === selectedId) ?? null
    : null;

  return (
    <>
      <DashboardHeader
        title="Leads"
        subtitle="Where every business-review enquiry lands. Triage, follow up and match to a firm from one place."
        actions={
          <>
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-full border border-sand-200 bg-cream-50 px-4 py-2 text-[11px] uppercase tracking-widest text-cocoa-300 hover:border-cocoa-300"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={addLeadPlaceholder}
              className="rounded-full bg-cocoa-300 px-4 py-2 text-[11px] uppercase tracking-widest text-cream-50 hover:bg-cocoa-200"
            >
              Add Lead
            </button>
          </>
        }
      />

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <LeadKpiCard label="Total leads" value={kpis.total} tone="primary" />
        <LeadKpiCard label="New leads" value={kpis.newCount} hint="Awaiting first contact" />
        <LeadKpiCard
          label="Ready to move"
          value={kpis.readyToMove}
          hint="Wants to switch ASAP"
        />
        <LeadKpiCard
          label="Pipeline value"
          value={fmtMoney(kpis.pipelineValue)}
          hint="Sum of open lead estimates"
          tone="primary"
        />
        <LeadKpiCard label="Hot leads" value={kpis.hot} hint="Highest priority" />
        <LeadKpiCard label="Leads won" value={kpis.won} />
      </div>

      <LeadFilters
        value={filters}
        onChange={setFilters}
        totalLeads={leads.length}
        visibleLeads={visible.length}
      />

      <LeadTable
        leads={visible}
        selectedId={selectedId}
        onSelect={(l) => setSelectedId(l.id)}
      />

      <LeadDetailDrawer
        lead={selectedLead}
        open={Boolean(selectedLead)}
        onClose={() => setSelectedId(null)}
        onUpdateStatus={onUpdateStatus}
        onUpdatePriority={onUpdatePriority}
        onAssign={onAssign}
        onAddNote={onAddNote}
        onUpdateFollowUp={onUpdateFollowUp}
        onUpdateBookedValue={onUpdateBookedValue}
        onMarkWon={onMarkWon}
        onMarkLost={onMarkLost}
      />
    </>
  );
}
