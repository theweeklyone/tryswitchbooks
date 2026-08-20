"use client";

import { useEffect, useMemo, useState } from "react";
import { questions } from "@/data/consultation-questions";
import type {
  CompanyEntry,
  ConsultationRecommendation,
  ConsultationSubmission,
  NameValue,
  QuizAnswer,
  QuizAnswers,
  QuizQuestion,
} from "@/lib/types/consultation";
import { recommend } from "@/lib/recommend";
import {
  trackConsultationStarted,
  trackConsultationStepCompleted,
  trackConsultationCompleted,
  trackLeadSubmitted,
  trackAdsConversion,
  estimateLeadValueGBP,
} from "@/lib/tracking";

import { ConsultationLayout } from "@/components/consultation/ConsultationLayout";
import { QuestionStep } from "@/components/consultation/QuestionStep";
import { QuizNavigation } from "@/components/consultation/QuizNavigation";
import { RecommendationView } from "./RecommendationView";
import { submitConsultation } from "./actions";

const STORAGE_KEY = "switchbooks-review-draft-v1";

const isValidEmail = (s: string) => /.+@.+\..+/.test(s);
const isValidPhone = (s: string) => s.replace(/\D/g, "").length >= 10;

function isVisible(q: QuizQuestion, answers: QuizAnswers): boolean {
  if (!q.showIf) return true;
  const ans = answers[q.showIf.id];
  if (ans === undefined) return false;
  const { equals } = q.showIf;
  if (Array.isArray(equals)) return equals.includes(String(ans));
  return String(ans) === equals;
}

// Capitalise the first letter of each word, leaving the rest as typed, so
// "john smith" / "east grinstead" come through tidy without mangling names
// that already carry internal capitals (e.g. "McDonald").
function titleCase(s: string): string {
  return s.replace(/(^|\s)(\S)/g, (_, lead, ch) => lead + ch.toUpperCase());
}

const asCompanies = (v: QuizAnswer): CompanyEntry[] =>
  Array.isArray(v)
    ? (v as unknown[]).filter(
        (c): c is CompanyEntry =>
          typeof c === "object" && c !== null && "name" in c,
      )
    : [];

const asName = (v: QuizAnswer): NameValue =>
  v && typeof v === "object" && !Array.isArray(v) && "first" in v
    ? (v as NameValue)
    : { first: "", last: "" };

function validate(q: QuizQuestion | undefined, answers: QuizAnswers): string | null {
  if (!q) return null;
  const value = answers[q.id];

  if (q.type === "name") {
    const n = asName(value);
    if (q.required !== false && (!n.first.trim() || !n.last.trim())) {
      return "Please add your first and last name";
    }
    return null;
  }

  if (q.type === "companies") {
    const list = asCompanies(value);
    const hasNamed = list.some((c) => c.name.trim() !== "");
    if (q.required !== false && !hasNamed) return "Add at least your company name";
    return null;
  }

  const isEmpty =
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);

  if (q.required !== false && isEmpty) {
    if (q.type === "single" || q.type === "multi") return "Pick an option to continue";
    if (q.type === "industry") return "Search and pick your industry to continue";
    if (q.type === "text") return "Please add an answer";
    if (q.type === "email") return "Please add your email";
    if (q.type === "tel") return "Please add a phone number";
    return "This field is required";
  }
  if (q.type === "email" && !isEmpty && !isValidEmail(String(value))) {
    return "That does not look like a valid email";
  }
  if (q.type === "tel" && !isEmpty && !isValidPhone(String(value))) {
    return "Please use a number with at least 10 digits";
  }
  return null;
}

function newId() {
  return `rev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const asArray = (v: QuizAnswer): string[] =>
  Array.isArray(v)
    ? v.filter((x): x is string => typeof x === "string")
    : v
      ? [String(v)]
      : [];

export function ConsultationFlow({
  preselectService,
  preselectServiceLabel,
}: {
  /** A `servicesWanted` value to pre-select (from a service-page deep link). */
  preselectService?: string;
  preselectServiceLabel?: string;
} = {}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{
    submission: ConsultationSubmission;
    recommendation: ConsultationRecommendation;
  } | null>(null);

  const visibleQuestions = useMemo(
    () => questions.filter((q) => isVisible(q, answers)),
    [answers],
  );
  const total = visibleQuestions.length;
  const current = visibleQuestions[Math.min(step, total - 1)];

  // Restore draft on mount, pre-seed the service from a deep link, emit started.
  useEffect(() => {
    let restored: QuizAnswers = {};
    let restoredStep = 0;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.answers) restored = parsed.answers;
        if (typeof parsed?.step === "number") restoredStep = parsed.step;
      }
    } catch {
      // ignore
    }

    // If they arrived from a service page, make sure that need is ticked.
    if (preselectService) {
      const existing = asArray(restored.servicesWanted);
      if (!existing.includes(preselectService)) {
        restored = { ...restored, servicesWanted: [...existing, preselectService] };
      }
    }

    if (Object.keys(restored).length) setAnswers(restored);
    if (restoredStep) setStep(restoredStep);

    trackConsultationStarted({ sourcePage: window.location.pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
    } catch {
      // ignore
    }
  }, [step, answers]);

  useEffect(() => {
    if (step > total - 1) setStep(Math.max(0, total - 1));
  }, [total, step]);

  const setAnswer = (id: string, value: QuizAnswer) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    if (error) setError(null);
  };

  const goNext = () => {
    const v = validate(current, answers);
    if (v) {
      setError(v);
      return;
    }
    trackConsultationStepCompleted({
      stepName: current.id,
      stepNumber: step + 1,
      selectedAnswer:
        current.type === "single" || current.type === "multi"
          ? String(answers[current.id] ?? "")
          : undefined,
    });
    if (step < total - 1) {
      setStep((s) => s + 1);
      setError(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setError(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const servicesWanted = asArray(answers.servicesWanted);
    const primaryNeed = servicesWanted.find((s) => s !== "unsure") ?? "unsure";

    // The industry picker stores the final value directly (a chosen sector label
    // or the free text the visitor typed), so no lookup is needed.
    const industry = String(answers.industry ?? "").trim();

    // Only keep director companies with an actual name; trim the rest.
    const companies = asCompanies(answers.companies)
      .map((c) => ({ name: c.name.trim(), number: (c.number ?? "").trim() }))
      .filter((c) => c.name !== "");

    const name = asName(answers.name);

    const submission: ConsultationSubmission = {
      firstName: titleCase(name.first.trim()),
      lastName: titleCase(name.last.trim()),
      businessName: String(answers.businessName ?? "").trim(),
      email: String(answers.email ?? "").trim(),
      phone: String(answers.phone ?? "").trim(),
      dateOfBirth: String(answers.dateOfBirth ?? "").trim(),
      town: titleCase(String(answers.town ?? "").trim()),
      county: titleCase(String(answers.county ?? "").trim()),
      industry,
      companies,
      businessType: String(answers.businessType ?? ""),
      currentSituation: String(answers.currentSituation ?? ""),
      satisfaction: String(answers.satisfaction ?? ""),
      frustrations: asArray(answers.frustrations),
      currentProvider: String(answers.currentProvider ?? "").trim(),
      currentSpend: String(answers.currentSpend ?? ""),
      annualFeeValue: String(answers.annualFeeValue ?? "").trim(),
      servicesWanted,
      primaryNeed,
      turnover: String(answers.turnover ?? ""),
      budget: String(answers.budget ?? ""),
      timeline: String(answers.timeline ?? ""),
      notes: String(answers.notes ?? "").trim(),
      submissionId: newId(),
      submittedAt: new Date().toISOString(),
      source: preselectService ? `review-quiz:service-${preselectService}` : "review-quiz",
    };

    const recommendation = recommend(submission);

    const result = await submitConsultation({ submission, recommendation });
    if (!result.ok) {
      console.error("[Switch Books] Lead persistence failed:", result.error);
    } else {
      console.info("[Switch Books] Lead saved:", result.leadId);
    }

    trackConsultationCompleted({
      recommendedService: recommendation.primary.serviceName,
      consultationRequired: recommendation.callStatus === "required",
      estimatedPriceRange: submission.budget,
      sourcePage: window.location.pathname,
    });
    const leadValue = estimateLeadValueGBP(submission.budget);
    trackLeadSubmitted({
      conversionType: "lead-submitted",
      serviceInterest: submission.primaryNeed,
      recommendedService: recommendation.primary.serviceName,
      budgetRange: submission.budget,
      sourcePage: window.location.pathname,
      value: leadValue,
      currency: "GBP",
    });
    // Direct Google Ads conversion signal (no-op until the Ads env vars exist).
    trackAdsConversion(leadValue);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }

    setSubmitted({ submission, recommendation });
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startOver = () => {
    setSubmitted(null);
    setStep(0);
    setAnswers({});
    setError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const canGoNext = useMemo(() => validate(current, answers) === null, [current, answers]);

  if (submitted) {
    return (
      <RecommendationView
        submission={submitted.submission}
        recommendation={submitted.recommendation}
        onStartOver={startOver}
      />
    );
  }

  if (!current) return null;

  return (
    <ConsultationLayout step={step + 1} total={total}>
      {step === 0 && preselectServiceLabel ? (
        <div className="mb-8 rounded-2xl border border-sand-100 bg-blush-50/60 p-5 text-center sm:p-6">
          <p className="text-sm leading-relaxed text-cocoa-100 sm:text-base">
            Great, you&apos;re after help with{" "}
            <span className="font-medium text-cocoa-300">{preselectServiceLabel}</span>. We&apos;ve
            noted that. A few quick questions and we&apos;ll match you with a local firm that&apos;s
            strong on it.
          </p>
        </div>
      ) : null}
      <div key={current.id}>
        <QuestionStep
          question={current}
          value={answers[current.id]}
          error={error}
          onChange={(v) => setAnswer(current.id, v)}
        />
      </div>

      {/* Fixed bottom bar: the nav stays put in the same place on every step,
          so the Back/Next buttons never jump around as questions change length. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-100/70 bg-cream-50/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-5 py-4 sm:px-8 lg:px-12">
          <QuizNavigation
            onBack={goBack}
            onNext={goNext}
            canGoBack={step > 0}
            canGoNext={canGoNext}
            isLast={step === total - 1}
            submitting={submitting}
          />
        </div>
      </div>
    </ConsultationLayout>
  );
}
