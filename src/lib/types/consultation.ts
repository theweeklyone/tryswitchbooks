// Switch Books — free Business Review quiz.
// Shared types between the question data, the React flow and the rules engine.

export type QuestionType =
  | "text"
  | "email"
  | "tel"
  | "single"
  | "multi"
  | "textarea"
  | "upload";

export type QuestionId =
  | "firstName"
  | "businessName"
  | "email"
  | "phone"
  | "businessType"
  | "currentSituation"
  | "satisfaction"
  | "frustrations"
  | "currentProvider"
  | "currentSpend"
  | "annualFeeValue"
  | "servicesWanted"
  | "turnover"
  | "budget"
  | "timeline"
  | "notes";

export type Option = {
  value: string;
  label: string;
  hint?: string;
};

export type QuizQuestion = {
  id: QuestionId;
  type: QuestionType;
  title: string;
  subtitle?: string;
  microcopy?: string;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
  maxLength?: number;
  /** If set, only show when another answer matches (simple conditional). */
  showIf?: { id: QuestionId; equals: string | string[] };
};

/**
 * Answer values keyed by question id.
 * - text/email/tel/textarea/single → string
 * - multi → string[]
 */
export type QuizAnswer = string | string[] | undefined;
export type QuizAnswers = Partial<Record<QuestionId, QuizAnswer>>;

export type ConsultationSubmission = {
  // Contact
  firstName: string;
  businessName: string;
  email: string;
  phone: string;

  // Their situation
  businessType: string;
  currentSituation: string; // accountant | diy | in-house | none
  satisfaction: string; // happy-exploring | frustrated | leaving | na
  frustrations: string[];
  currentProvider: string; // who they're with now (optional, sensitive)
  currentSpend: string; // what they pay now (band)
  annualFeeValue: string; // approx £ value, only when currentSpend === "annual"

  // What they want
  servicesWanted: string[];
  primaryNeed: string; // first/primary service interest, drives recommendation
  turnover: string;
  budget: string;
  timeline: string;
  notes: string;

  // Metadata
  submissionId: string;
  submittedAt: string; // ISO
  source: "review-quiz";
};

export type ConsultationStatus = "required" | "recommended" | "not-required";

export type ConsultationRecommendation = {
  primary: {
    serviceSlug: string | null;
    serviceName: string;
    why: string;
  };
  secondary?: {
    serviceSlug: string | null;
    serviceName: string;
    reason: string;
  };
  /** "What good looks like" bullets shown on the result page. */
  whatGoodLooksLike: string[];
  /** Whether we suggest a call as the next step. */
  callStatus: ConsultationStatus;
  summary: string;
};
