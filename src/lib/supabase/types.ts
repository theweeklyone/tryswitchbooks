import type { LeadStatus, LeadPriority, LeadSource, LeadNote } from "@/lib/types/lead";

// Mirrors the public.leads table (supabase/leads-accounting.sql).
export type LeadRow = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string;
  mobile: string;
  business_name: string | null;
  business_type: string | null;
  current_situation: string | null;
  satisfaction: string | null;
  frustrations: string[] | null;
  current_provider: string | null;
  current_spend: string | null;
  services_wanted: string[] | null;
  primary_need: string | null;
  turnover: string | null;
  budget_range: string | null;
  timeline: string | null;
  extra_notes: string | null;
  recommended_service: string | null;
  recommended_service_slug: string | null;
  secondary_recommendation: string | null;
  source: LeadSource;
  status: LeadStatus;
  assigned_to: string | null;
  internal_notes: LeadNote[] | null;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
  estimated_lead_value: number;
  priority: LeadPriority;
  booked_value: number | null;
};
