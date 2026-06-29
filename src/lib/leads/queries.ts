import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { rowToLead } from "@/lib/supabase/transform";
import type { LeadRow } from "@/lib/supabase/types";
import type { ConsultationLead } from "@/lib/types/lead";

export async function fetchLeads(): Promise<ConsultationLead[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fetchLeads]", error);
    return [];
  }

  return (data as LeadRow[]).map(rowToLead);
}
