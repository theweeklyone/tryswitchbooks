import type {
  ConsultationLead,
  LeadPriority,
  LeadStatus,
} from "@/lib/types/lead";

export type LeadFiltersState = {
  search: string;
  status: LeadStatus | "all";
  service: string | "all"; // matches primaryNeed
  priority: LeadPriority | "all";
  timeline: "all" | "asap" | "1-3-months" | "year-end" | "exploring";
  assignedTo: string | "all";
  dateFrom: string | ""; // YYYY-MM-DD
};

export const initialFilters: LeadFiltersState = {
  search: "",
  status: "all",
  service: "all",
  priority: "all",
  timeline: "all",
  assignedTo: "all",
  dateFrom: "",
};

export function applyFilters(
  leads: ConsultationLead[],
  f: LeadFiltersState,
): ConsultationLead[] {
  const q = f.search.trim().toLowerCase();
  const dateFromMs = f.dateFrom ? new Date(f.dateFrom).getTime() : null;

  return leads.filter((l) => {
    if (q) {
      const haystack = [
        l.firstName,
        l.lastName ?? "",
        l.businessName ?? "",
        l.email,
        l.mobile,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.status !== "all" && l.status !== f.status) return false;
    if (f.service !== "all" && l.primaryNeed !== f.service) return false;
    if (f.priority !== "all" && l.priority !== f.priority) return false;
    if (f.timeline !== "all" && l.timeline !== f.timeline) return false;
    if (f.assignedTo !== "all") {
      if (f.assignedTo === "unassigned") {
        if (l.assignedTo) return false;
      } else if (l.assignedTo !== f.assignedTo) {
        return false;
      }
    }
    if (dateFromMs && new Date(l.createdAt).getTime() < dateFromMs) return false;
    return true;
  });
}
