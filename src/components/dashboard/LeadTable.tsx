"use client";

import type { ConsultationLead } from "@/lib/types/lead";
import { nudgesFor } from "@/lib/leads/nudges";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadPriorityBadge } from "./LeadPriorityBadge";
import { FollowUpNudge } from "./FollowUpNudge";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

const fmtMoney = (v: number) =>
  v >= 1000 ? `£${(v / 1000).toFixed(1)}k` : `£${v}`;

function nextAction(lead: ConsultationLead): string {
  if (lead.status === "won" || lead.status === "lost") return "—";
  if (lead.nextFollowUpAt) {
    return `Follow up ${fmtDate(lead.nextFollowUpAt)}`;
  }
  if (lead.status === "new") return "Reply within 24h";
  if (lead.status === "contacted") return "Book a call";
  if (lead.status === "call-booked") return "Confirm needs";
  if (lead.status === "introduced") return "Check it's working";
  return "Set follow-up date";
}

export function LeadTable({
  leads,
  selectedId,
  onSelect,
}: {
  leads: ConsultationLead[];
  selectedId?: string | null;
  onSelect: (lead: ConsultationLead) => void;
}) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-sand-200 bg-cream-50 p-14 text-center">
        <p className="font-serif text-2xl text-cocoa-300">No leads match these filters</p>
        <p className="mt-2 text-sm text-cocoa-50">Try clearing the filters above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-100 bg-cream-50">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sand-100 text-[10px] uppercase tracking-widest text-cocoa-50/80">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Needs</th>
              <th className="px-5 py-3 font-medium">Recommended</th>
              <th className="px-5 py-3 font-medium">Budget</th>
              <th className="px-5 py-3 font-medium">Priority</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Timeline</th>
              <th className="px-5 py-3 font-medium">Assigned</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium">Next action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => {
              const nudges = nudgesFor(l);
              const fullName = [l.firstName, l.lastName].filter(Boolean).join(" ");
              const isSelected = l.id === selectedId;

              return (
                <tr
                  key={l.id}
                  onClick={() => onSelect(l)}
                  className={
                    "cursor-pointer border-b border-sand-100/70 transition-colors last:border-0 " +
                    (isSelected
                      ? "bg-blush-50/60"
                      : "hover:bg-cream-100/70")
                  }
                >
                  <td className="px-5 py-4 align-top">
                    <div className="font-serif text-base text-cocoa-300">{fullName}</div>
                    {l.businessName ? (
                      <div className="text-xs text-champagne-dark">{l.businessName}</div>
                    ) : null}
                    <div className="text-xs text-cocoa-50">{l.email}</div>
                    <div className="text-xs text-cocoa-50/80">{l.mobile}</div>
                    {nudges.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {nudges.map((n) => (
                          <FollowUpNudge key={n.kind} nudge={n} size="sm" />
                        ))}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 align-top text-cocoa-300">
                    {capitalize(l.primaryNeed)}
                  </td>
                  <td className="px-5 py-4 align-top text-cocoa-300">
                    {l.recommendedService}
                  </td>
                  <td className="px-5 py-4 align-top text-cocoa-300">
                    <div>{budgetLabel(l.budgetRange)}</div>
                    <div className="text-xs text-cocoa-50/70">
                      Est. {fmtMoney(l.estimatedLeadValue)}
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <LeadPriorityBadge priority={l.priority} />
                  </td>
                  <td className="px-5 py-4 align-top">
                    <LeadStatusBadge status={l.status} />
                  </td>
                  <td className="px-5 py-4 align-top text-cocoa-300">
                    {timelineLabel(l.timeline)}
                  </td>
                  <td className="px-5 py-4 align-top text-cocoa-300">
                    {l.assignedTo ? (
                      l.assignedTo
                    ) : (
                      <span className="text-cocoa-50/60">Unassigned</span>
                    )}
                  </td>
                  <td className="px-5 py-4 align-top text-cocoa-50">
                    {fmtDate(l.createdAt)}
                  </td>
                  <td className="px-5 py-4 align-top text-cocoa-300">
                    {nextAction(l)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function capitalize(s: string) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).replaceAll("-", " ");
}

function budgetLabel(b: string) {
  const map: Record<string, string> = {
    "under-100": "Under £100/mo",
    "100-250": "£100–250/mo",
    "250-500": "£250–500/mo",
    "500-1000": "£500–1k/mo",
    "1000-2000": "£1k–2k/mo",
    "2000-plus": "£2k+/mo",
    guidance: "Wants guidance",
  };
  return map[b] ?? b;
}

function timelineLabel(t: string) {
  const map: Record<string, string> = {
    asap: "ASAP",
    "1-3-months": "1–3 months",
    "year-end": "At year-end",
    exploring: "Exploring",
  };
  return map[t] ?? "—";
}
