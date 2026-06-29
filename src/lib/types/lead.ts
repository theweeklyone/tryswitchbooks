// Internal lead dashboard types for the accountant-matching service.
// Field names line up with the quiz submission and the Supabase `leads` table
// (see supabase/leads-accounting.sql).

export type LeadStatus =
  | "new"
  | "contacted"
  | "call-booked"
  | "introduced"
  | "won"
  | "lost"
  | "nurture";

export type LeadPriority = "hot" | "warm" | "cool";

export type LeadSource =
  | "review-quiz"
  | "contact-form"
  | "phone"
  | "referral";

/** Single entry in the internal notes timeline. */
export type LeadNote = {
  id: string;
  createdAt: string; // ISO
  createdBy: string;
  content: string;
  /** Set when the note was created alongside a status change. */
  statusChange?: { from: LeadStatus; to: LeadStatus };
};

export type ConsultationLead = {
  id: string;
  createdAt: string; // ISO

  // Contact
  firstName: string;
  lastName?: string;
  email: string;
  mobile: string;
  businessName: string;

  // Their situation (mirrors the review quiz)
  businessType: string;
  currentSituation: string; // accountant | diy | in-house | none
  satisfaction: string; // happy-exploring | frustrated | leaving | unsure
  frustrations: string[];
  currentProvider: string; // who they're with now
  currentSpend: string; // band

  // What they want
  servicesWanted: string[];
  primaryNeed: string; // primary service interest, drives the recommendation
  turnover: string;
  budgetRange: string;
  timeline: string;
  extraNotes: string;

  // Recommendation snapshot
  recommendedService: string;
  recommendedServiceSlug?: string;
  secondaryRecommendation?: string;

  // Lead-management fields (editable in the dashboard)
  source: LeadSource;
  status: LeadStatus;
  /** Who on your side is handling this lead (free text). */
  assignedTo?: string;
  internalNotes: LeadNote[];
  lastContactedAt?: string;
  nextFollowUpAt?: string;

  // Computed at submission for sortability
  estimatedLeadValue: number; // indicative annual GBP
  priority: LeadPriority;
  /** What the matched firm is actually worth (entered manually). */
  bookedValue?: number | null;
};

/** Display labels for statuses, used in badges and filters. */
export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "call-booked": "Call booked",
  introduced: "Introduced to firm",
  won: "Matched & signed",
  lost: "Didn't proceed",
  nurture: "Nurture",
};

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "call-booked",
  "introduced",
  "won",
  "lost",
  "nurture",
];

export const LEAD_PRIORITIES: LeadPriority[] = ["hot", "warm", "cool"];

export const LEAD_PRIORITY_LABELS: Record<LeadPriority, string> = {
  hot: "Hot",
  warm: "Warm",
  cool: "Cool",
};
