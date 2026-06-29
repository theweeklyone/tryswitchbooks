import type { ConsultationLead } from "@/lib/types/lead";
import { LEAD_STATUS_LABELS, LEAD_PRIORITY_LABELS } from "@/lib/types/lead";

// CSV export.
// Generates a basic Excel-friendly CSV from the currently visible leads.
// FUTURE: replace with server-side export so the team can schedule
// nightly emails or pipe directly into a Google Sheet.

const ESCAPE_RE = /[",\n\r]/;
function csvCell(v: unknown): string {
  if (v === undefined || v === null) return "";
  const s = String(v);
  if (ESCAPE_RE.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

const COLUMNS: { header: string; pick: (l: ConsultationLead) => unknown }[] = [
  { header: "ID", pick: (l) => l.id },
  { header: "Created", pick: (l) => l.createdAt },
  { header: "First name", pick: (l) => l.firstName },
  { header: "Last name", pick: (l) => l.lastName ?? "" },
  { header: "Business", pick: (l) => l.businessName },
  { header: "Email", pick: (l) => l.email },
  { header: "Mobile", pick: (l) => l.mobile },
  { header: "Business type", pick: (l) => l.businessType },
  { header: "Current situation", pick: (l) => l.currentSituation },
  { header: "Satisfaction", pick: (l) => l.satisfaction },
  { header: "Current provider", pick: (l) => l.currentProvider },
  { header: "Current spend", pick: (l) => l.currentSpend },
  { header: "Frustrations", pick: (l) => l.frustrations.join(" | ") },
  { header: "Services wanted", pick: (l) => l.servicesWanted.join(" | ") },
  { header: "Primary need", pick: (l) => l.primaryNeed },
  { header: "Turnover", pick: (l) => l.turnover },
  { header: "Budget", pick: (l) => l.budgetRange },
  { header: "Timeline", pick: (l) => l.timeline },
  { header: "Recommended", pick: (l) => l.recommendedService },
  { header: "Indicative value (£/yr)", pick: (l) => l.estimatedLeadValue },
  { header: "Priority", pick: (l) => LEAD_PRIORITY_LABELS[l.priority] },
  { header: "Status", pick: (l) => LEAD_STATUS_LABELS[l.status] },
  { header: "Assigned to", pick: (l) => l.assignedTo ?? "" },
  { header: "Last contacted", pick: (l) => l.lastContactedAt ?? "" },
  { header: "Next follow-up", pick: (l) => l.nextFollowUpAt ?? "" },
  { header: "Notes", pick: (l) => l.extraNotes },
];

export function leadsToCsv(leads: ConsultationLead[]): string {
  const lines = [COLUMNS.map((c) => csvCell(c.header)).join(",")];
  for (const l of leads) {
    lines.push(COLUMNS.map((c) => csvCell(c.pick(l))).join(","));
  }
  // Excel-friendly: include UTF-8 BOM so accents render correctly.
  return "﻿" + lines.join("\r\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
