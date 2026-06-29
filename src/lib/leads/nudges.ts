import type { ConsultationLead } from "@/lib/types/lead";

// Visual nudges shown on rows and inside the drawer to flag leads
// that need attention. Pure functions, easy to unit test later.

export type NudgeKind =
  | "aged-new"
  | "hot-no-follow-up"
  | "ready-to-move"
  | "high-value-unassigned";

export type Nudge = { kind: NudgeKind; label: string };

const HOURS = (h: number) => h * 60 * 60 * 1000;

export function nudgesFor(lead: ConsultationLead, now = new Date()): Nudge[] {
  const out: Nudge[] = [];
  const ageMs = now.getTime() - new Date(lead.createdAt).getTime();

  // 1. New lead older than 24 hours.
  if (lead.status === "new" && ageMs > HOURS(24)) {
    out.push({ kind: "aged-new", label: "New for over 24 hours" });
  }

  // 2. Hot lead with no scheduled follow-up.
  if (
    lead.priority === "hot" &&
    !lead.nextFollowUpAt &&
    !["won", "lost"].includes(lead.status)
  ) {
    out.push({ kind: "hot-no-follow-up", label: "Hot lead, no follow-up scheduled" });
  }

  // 3. Ready to move soon but still in "new".
  if (lead.timeline === "asap" && lead.status === "new") {
    out.push({
      kind: "ready-to-move",
      label: "Wants to move ASAP, still New",
    });
  }

  // 4. High-value (£3k+/yr) lead not yet assigned to anyone.
  if (
    lead.estimatedLeadValue >= 3000 &&
    !lead.assignedTo &&
    !["won", "lost"].includes(lead.status)
  ) {
    out.push({
      kind: "high-value-unassigned",
      label: "High-value lead, unassigned",
    });
  }

  return out;
}
