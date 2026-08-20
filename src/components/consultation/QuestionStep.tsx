"use client";

import type { ReactNode } from "react";
import type {
  CompanyEntry,
  LocationValue,
  NameValue,
  QuizAnswer,
  QuizQuestion,
} from "@/lib/types/consultation";
import { OptionCard } from "./OptionCard";
import { TextInputStep } from "./TextInputStep";
import { TextAreaStep } from "./TextAreaStep";
import { CompaniesStep } from "./CompaniesStep";
import { NameStep } from "./NameStep";
import { LocationStep } from "./LocationStep";
import { IndustrySelectStep } from "./IndustrySelectStep";
import { UploadPlaceholderStep } from "./UploadPlaceholderStep";

function asName(v: QuizAnswer): NameValue {
  return v && typeof v === "object" && !Array.isArray(v) && "first" in v
    ? (v as NameValue)
    : { first: "", last: "" };
}

function asLocation(v: QuizAnswer): LocationValue {
  return v && typeof v === "object" && !Array.isArray(v) && "town" in v
    ? (v as LocationValue)
    : { town: "", county: "" };
}

// Microcopy may contain inline markdown links, e.g. [label](https://…), which
// open in a new tab. Used for the "Companies House register" link.
const MICRO_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
function renderMicrocopy(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(MICRO_LINK)) {
    const index = m.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [full, label, href] = m;
    nodes.push(
      <a
        key={key++}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium not-italic underline decoration-champagne/60 underline-offset-2 hover:text-cocoa-300"
      >
        {label}
      </a>,
    );
    last = index + full.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? nodes : text;
}

// Generic step renderer. Picks the right input control for the question type.
// The wrapping <div key={question.id}> in the parent re-mounts on step change
// so the animate-fadeUp class plays on every question.

// Format a raw entry as pounds with thousands separators, e.g. "2000" -> "£2,000".
// Strips everything but digits so pasting "£1,200.50" still tidies to "£1,200".
function formatCurrency(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return "£" + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
      <h1 className="mt-2 text-balance font-serif text-2xl leading-[1.12] text-cocoa-300 sm:text-3xl md:text-4xl">
        {question.title}
      </h1>
      {question.subtitle ? (
        <p className="mt-2.5 text-pretty text-sm leading-relaxed text-cocoa-50 sm:text-base">
          {question.subtitle}
        </p>
      ) : null}

      <div className="mt-6">
        {(question.type === "text" ||
          question.type === "email" ||
          question.type === "tel" ||
          question.type === "date") && (
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
                  : question.id === "lastName"
                    ? "family-name"
                    : question.id === "firstName"
                      ? "given-name"
                      : "off"
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

        {question.type === "name" && (
          <NameStep value={asName(value)} onChange={(v) => onChange(v)} error={error} />
        )}

        {question.type === "location" && (
          <LocationStep value={asLocation(value)} onChange={(v) => onChange(v)} error={error} />
        )}

        {question.type === "currency" && (
          <TextInputStep
            type="text"
            value={(value as string) || ""}
            onChange={(v) => onChange(formatCurrency(v))}
            placeholder={question.placeholder}
            inputMode="numeric"
            error={error}
          />
        )}

        {question.type === "industry" && question.options && (
          <IndustrySelectStep
            value={typeof value === "string" ? value : ""}
            options={question.options}
            onChange={(v) => onChange(v)}
            error={error}
          />
        )}

        {question.type === "companies" && (
          <CompaniesStep
            value={(Array.isArray(value) ? (value as CompanyEntry[]) : []).filter(
              (c): c is CompanyEntry => typeof c === "object" && c !== null,
            )}
            onChange={(v) => onChange(v)}
            error={error}
          />
        )}

        {question.type === "single" && question.options && (
          <ul className="grid gap-2 auto-rows-fr sm:grid-cols-2">
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
          <ul className="grid gap-2 auto-rows-fr sm:grid-cols-2">
            {question.options.map((opt) => {
              const selectedArr = (Array.isArray(value) ? value : []).filter(
                (v): v is string => typeof v === "string",
              );
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
            paths={(Array.isArray(value) ? value : []).filter(
              (v): v is string => typeof v === "string",
            )}
            onChange={(next) => onChange(next)}
          />
        )}
      </div>

      {question.microcopy ? (
        <p className="mt-4 text-xs italic leading-relaxed text-cocoa-50/70">
          {renderMicrocopy(question.microcopy)}
        </p>
      ) : null}
    </div>
  );
}
