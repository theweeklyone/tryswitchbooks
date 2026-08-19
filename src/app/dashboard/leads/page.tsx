import type { Metadata } from "next";
import type { ConsultationLead } from "@/lib/types/lead";
import { LeadsDashboard } from "./LeadsDashboard";
import { fetchLeads } from "@/lib/leads/queries";

export const metadata: Metadata = {
  title: "Leads",
  description: "Internal Switch Books dashboard for managing business-review enquiries.",
};

// Always read fresh on every visit until we wire Supabase realtime.
export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  // Live data only, no demo fallback. The dashboard reflects reality, and a new
  // lead appears the instant it comes in.
  let leads: ConsultationLead[] = [];
  try {
    leads = await fetchLeads();
  } catch (err) {
    console.error("[LeadsPage] Failed to load leads:", err);
  }
  return <LeadsDashboard initialLeads={leads} />;
}
