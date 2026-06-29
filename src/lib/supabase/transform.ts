import type { ConsultationLead } from "@/lib/types/lead";
import type { LeadRow } from "./types";

export function rowToLead(row: LeadRow): ConsultationLead {
  return {
    id: row.id,
    createdAt: row.created_at,
    firstName: row.first_name,
    lastName: row.last_name ?? undefined,
    email: row.email,
    mobile: row.mobile,
    businessName: row.business_name ?? "",
    businessType: row.business_type ?? "",
    currentSituation: row.current_situation ?? "",
    satisfaction: row.satisfaction ?? "",
    frustrations: row.frustrations ?? [],
    currentProvider: row.current_provider ?? "",
    currentSpend: row.current_spend ?? "",
    servicesWanted: row.services_wanted ?? [],
    primaryNeed: row.primary_need ?? "",
    turnover: row.turnover ?? "",
    budgetRange: row.budget_range ?? "",
    timeline: row.timeline ?? "",
    extraNotes: row.extra_notes ?? "",
    recommendedService: row.recommended_service ?? "",
    recommendedServiceSlug: row.recommended_service_slug ?? undefined,
    secondaryRecommendation: row.secondary_recommendation ?? undefined,
    source: row.source,
    status: row.status,
    assignedTo: row.assigned_to ?? undefined,
    internalNotes: row.internal_notes ?? [],
    lastContactedAt: row.last_contacted_at ?? undefined,
    nextFollowUpAt: row.next_follow_up_at ?? undefined,
    estimatedLeadValue: row.estimated_lead_value,
    priority: row.priority,
    bookedValue: row.booked_value ?? null,
  };
}

export type LeadInsert = Omit<LeadRow, "id" | "created_at">;

export function leadToInsertRow(
  lead: Omit<ConsultationLead, "id" | "createdAt">
): LeadInsert {
  return {
    first_name: lead.firstName,
    last_name: lead.lastName ?? null,
    email: lead.email,
    mobile: lead.mobile,
    business_name: lead.businessName || null,
    business_type: lead.businessType || null,
    current_situation: lead.currentSituation || null,
    satisfaction: lead.satisfaction || null,
    frustrations: lead.frustrations,
    current_provider: lead.currentProvider || null,
    current_spend: lead.currentSpend || null,
    services_wanted: lead.servicesWanted,
    primary_need: lead.primaryNeed || null,
    turnover: lead.turnover || null,
    budget_range: lead.budgetRange || null,
    timeline: lead.timeline || null,
    extra_notes: lead.extraNotes || null,
    recommended_service: lead.recommendedService || null,
    recommended_service_slug: lead.recommendedServiceSlug ?? null,
    secondary_recommendation: lead.secondaryRecommendation ?? null,
    source: lead.source,
    status: lead.status,
    assigned_to: lead.assignedTo ?? null,
    internal_notes: lead.internalNotes,
    last_contacted_at: lead.lastContactedAt ?? null,
    next_follow_up_at: lead.nextFollowUpAt ?? null,
    estimated_lead_value: lead.estimatedLeadValue,
    priority: lead.priority,
    booked_value: lead.bookedValue ?? null,
  };
}
