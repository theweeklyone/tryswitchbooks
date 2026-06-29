import type { Metadata } from "next";
import { LeadsDashboard } from "./LeadsDashboard";
import { fetchLeads } from "@/lib/leads/queries";
import { mockLeads } from "@/data/mock-leads";

export const metadata: Metadata = {
  title: "Leads",
  description: "Internal Switch Books dashboard for managing business-review enquiries.",
};

// Always read fresh on every visit until we wire Supabase realtime.
export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  // Read from Supabase when configured; fall back to demo data otherwise so the
  // dashboard is always previewable.
  let leads = mockLeads;
  try {
    const fetched = await fetchLeads();
    if (fetched.length) leads = fetched;
  } catch {
    // Supabase not configured yet — use the demo leads.
  }
  return <LeadsDashboard initialLeads={leads} />;
}
