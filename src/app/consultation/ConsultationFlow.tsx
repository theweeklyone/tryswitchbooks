"use client";

import { useEffect, useMemo, useState } from "react";
import { questions } from "@/data/consultation-questions";
import type {
  ConsultationRecommendation,
  ConsultationSubmission,
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

function validate(q: QuizQuestion | undefined, answers: QuizAnswers): string | null {
  if (!q) return null;
  const value = answers[q.id];
  const isEmpty =
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);

  if (q.required !== false && isEmpty) {
    if (q.type === "single" || q.type === "multi") return "Pick an option to continue";
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
  Array.isArray(v) ? v : v ? [String(v)] : [];

export function ConsultationFlow() {
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

  // Restore draft on mount + emit review_started.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.answers) setAnswers(parsed.answers);
        if (typeof parsed?.step === "number") setStep(parsed.step);
      }
    } catch {
      // ignore
    }
    trackConsultationStarted({ sourcePage: window.location.pathname });
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

    const submission: ConsultationSubmission = {
      firstName: String(answers.firstName ?? "").trim(),
      businessName: String(answers.businessName ?? "").trim(),
      email: String(answers.email ?? "").trim(),
      phone: String(answers.phone ?? "").trim(),
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
      source: "review-quiz",
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
    trackLeadSubmitted({
      conversionType: "lead-submitted",
      serviceInterest: submission.primaryNeed,
      recommendedService: recommendation.primary.serviceName,
      budgetRange: submission.budget,
      sourcePage: window.location.pathname,
    });

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
      <div key={current.id}>
        <QuestionStep
          question={current}
          value={answers[current.id]}
          error={error}
          onChange={(v) => setAnswer(current.id, v)}
        />
        <QuizNavigation
          onBack={goBack}
          onNext={goNext}
          canGoBack={step > 0}
          canGoNext={canGoNext}
          isLast={step === total - 1}
          submitting={submitting}
        />
        <p className="mt-8 text-center text-[11px] uppercase tracking-widest text-cocoa-50/60">
          No sign-up needed. Just the details you'd like us to contact you on. Your answers
          stay private until you submit.
        </p>
      </div>
    </ConsultationLayout>
  );
}
