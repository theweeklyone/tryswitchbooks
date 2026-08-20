// Switch Books: free Business Review quiz.
// Shared types between the question data, the React flow and the rules engine.

export type QuestionType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "currency"
  | "name"
  | "single"
  | "multi"
  | "textarea"
  | "industry"
  | "companies"
  | "upload";

export type QuestionId =
  | "name"
  | "firstName"
  | "lastName"
  | "businessName"
  | "email"
  | "phone"
  | "dateOfBirth"
  | "town"
  | "county"
  | "industry"
  | "companies"
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
  /** Extra search terms (synonyms, example trades) for the searchable picker. */
  keywords?: string[];
};

/** A single company directorship: name + Companies House number. */
export type CompanyEntry = {
  name: string;
  number: string;
};

/** First + last name captured together in one step. */
export type NameValue = {
  first: string;
  last: string;
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
 * - text/email/tel/date/textarea/single → string
 * - multi → string[]
 * - companies → CompanyEntry[]
 */
export type QuizAnswer = string | string[] | CompanyEntry[] | NameValue | undefined;
export type QuizAnswers = Partial<Record<QuestionId, QuizAnswer>>;

export type ConsultationSubmission = {
  // Contact
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  dateOfBirth: string; // ISO yyyy-mm-dd, optional (may be empty)
  town: string;
  county: string;
  industry: string; // resolved label (or the free-text "other" value)
  companies: CompanyEntry[]; // directorships, when a limited company

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
  // "review-quiz", optionally suffixed with entry context so leads can be
  // attributed to where they came from, e.g. "review-quiz:service-bookkeeping".
  source: string;
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
