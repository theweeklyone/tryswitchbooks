"use client";

import type { QuizAnswer, QuizQuestion } from "@/lib/types/consultation";
import { OptionCard } from "./OptionCard";
import { TextInputStep } from "./TextInputStep";
import { TextAreaStep } from "./TextAreaStep";
import { UploadPlaceholderStep } from "./UploadPlaceholderStep";

// Generic step renderer. Picks the right input control for the question type.
// The wrapping <div key={question.id}> in the parent re-mounts on step change
// so the animate-fadeUp class plays on every question.

export function QuestionStep({
  question,
  value,
  error,
  onChange,
}: {
  question: QuizQuestion;
  value: QuizAnswer;
  error?: string | null;
  onChange: (v: QuizAnswer) => void;
}) {
  return (
    <div className="animate-fadeUp">
      <p className="eyebrow">{question.required === false ? "Optional" : "Tell us"}</p>
      <h1 className="mt-3 text-balance font-serif text-3xl leading-[1.08] text-cocoa-300 sm:text-4xl md:text-[2.75rem]">
        {question.title}
      </h1>
      {question.subtitle ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-cocoa-50 sm:text-lg">
          {question.subtitle}
        </p>
      ) : null}

      <div className="mt-10">
        {(question.type === "text" ||
          question.type === "email" ||
          question.type === "tel") && (
          <TextInputStep
            type={question.type}
            value={(value as string) || ""}
            onChange={(v) => onChange(v)}
            placeholder={question.placeholder}
            autoComplete={
              question.type === "email"
                ? "email"
                : question.type === "tel"
                  ? "tel"
                  : "given-name"
            }
            inputMode={
              question.type === "email"
                ? "email"
                : question.type === "tel"
                  ? "tel"
                  : "text"
            }
            error={error}
          />
        )}

        {question.type === "single" && question.options && (
          <ul className="grid gap-3">
            {question.options.map((opt) => (
              <li key={opt.value}>
                <OptionCard
                  label={opt.label}
                  hint={opt.hint}
                  selected={value === opt.value}
                  onClick={() => onChange(opt.value)}
                />
              </li>
            ))}
          </ul>
        )}

        {question.type === "multi" && question.options && (
          <ul className="grid gap-3">
            {question.options.map((opt) => {
              const selectedArr = Array.isArray(value) ? value : [];
              const isSelected = selectedArr.includes(opt.value);
              const toggle = () => {
                if (opt.value === "flexible") {
                  // "Flexible" replaces all other selections.
                  onChange(isSelected ? [] : ["flexible"]);
                  return;
                }
                const stripped = selectedArr.filter((v) => v !== "flexible");
                onChange(
                  isSelected
                    ? stripped.filter((v) => v !== opt.value)
                    : [...stripped, opt.value],
                );
              };
              return (
                <li key={opt.value}>
                  <OptionCard
                    multiSelect
                    label={opt.label}
                    hint={opt.hint}
                    selected={isSelected}
                    onClick={toggle}
                  />
                </li>
              );
            })}
          </ul>
        )}

        {question.type === "textarea" && (
          <TextAreaStep
            value={(value as string) || ""}
            onChange={(v) => onChange(v)}
            placeholder={question.placeholder}
            maxLength={question.maxLength}
          />
        )}

        {question.type === "upload" && (
          <UploadPlaceholderStep
            paths={Array.isArray(value) ? value : []}
            onChange={(next) => onChange(next)}
          />
        )}
      </div>

      {question.microcopy ? (
        <p className="mt-6 text-xs italic leading-relaxed text-cocoa-50/70">
          {question.microcopy}
        </p>
      ) : null}
    </div>
  );
}
