import Link from "next/link";
import type { Metadata } from "next";
import { og } from "@/lib/og";
import { site } from "@/data/site";
import { Logo } from "@/components/Logo";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: { absolute: "The switching accountants checklist" },
  description:
    "A free, one-page checklist for switching accountants: every step from shortlisting a new firm to authorising them with HMRC. Print it or save it as a PDF.",
  alternates: { canonical: "/switching-checklist" },
  openGraph: og("/switching-checklist"),
};

// The ten steps, grouped so the sheet reads as a simple do-this-in-order list.
// Kept deliberately tight so the whole thing fits on a single A4 page in print.
const steps: { title: string; detail: string }[] = [
  {
    title: "Define what “better” looks like",
    detail: "Write down what isn’t working now — the gaps you want your next firm to close.",
  },
  {
    title: "Shortlist firms that fit",
    detail: "Match on sector, size and working style, not just headline price.",
  },
  {
    title: "Ask the right questions",
    detail: "Who’ll handle your account, response times, what’s included, proactivity. Compare scope.",
  },
  {
    title: "Choose your new firm first",
    detail: "Line up the new accountant before you resign from the old one.",
  },
  {
    title: "Complete ID checks & engagement",
    detail: "Pass the anti-money-laundering checks and sign the letter of engagement.",
  },
  {
    title: "Let them request clearance",
    detail: "Your new firm writes to your old one for professional clearance and your records.",
  },
  {
    title: "Confirm records are handed over",
    detail: "Accounts, tax returns, trial balance, payroll and VAT records — promptly and free.",
  },
  {
    title: "Authorise with HMRC",
    detail: "And with Companies House too, if you run a limited company.",
  },
  {
    title: "Diarise your filing dates",
    detail: "Agree the next deadlines with your new firm so nothing slips in the handover.",
  },
  {
    title: "Cancel old payments",
    detail: "Stop any direct debit or standing order to your previous accountant.",
  },
];

export default function SwitchingChecklistPage() {
  return (
    <main className="checklist-frame flex min-h-screen flex-col items-center bg-cream-100 px-4 py-10 sm:py-14">
      {/* Toolbar — hidden when printing */}
      <div className="print-hide mb-8 flex w-full max-w-[820px] flex-wrap items-center justify-between gap-4">
        <Link
          href="/advice/complete-guide-to-switching-accountants"
          className="text-xs uppercase tracking-widest text-cocoa-50 transition hover:text-cocoa-300"
        >
          &larr; Back to the full guide
        </Link>
        <PrintButton />
      </div>

      {/* The A4 sheet */}
      <section className="checklist-sheet w-full max-w-[820px] overflow-hidden rounded-2xl border border-sand-100 bg-cream-50 shadow-[0_30px_80px_-40px_rgba(20,33,61,0.4)]">
        {/* Header band */}
        <header className="border-b border-sand-100 px-8 py-8 sm:px-12">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-champagne-dark">
                Free checklist
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight text-cocoa-300 sm:text-4xl">
                Switching accountants
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-cocoa-50">
                Ten steps, in order. Tick them off and you can&rsquo;t go wrong &mdash; your new
                firm does most of the work.
              </p>
            </div>
            <Logo tone="ink" size="md" className="shrink-0" />
          </div>
        </header>

        {/* Steps */}
        <ol className="grid gap-x-10 gap-y-4 px-8 py-8 sm:grid-cols-2 sm:px-12">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3.5">
              <span
                aria-hidden
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 border-champagne text-[10px] font-semibold text-champagne-dark"
              >
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold leading-snug text-cocoa-300">{step.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-cocoa-50">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Footer band */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-sand-100 bg-blush-50/70 px-8 py-5 sm:px-12">
          <p className="text-[12px] leading-relaxed text-cocoa-50">
            <span className="font-semibold text-cocoa-300">Not sure who to switch to?</span>{" "}
            Switch Books matches you with the right local firm &mdash; free, no obligation.
          </p>
          <span className="text-[12px] font-semibold uppercase tracking-widest text-champagne-dark">
            tryswitchbooks.co.uk
          </span>
        </footer>
      </section>

      {/* CTA under the sheet — hidden when printing */}
      <div className="print-hide mt-10 text-center">
        <p className="text-sm text-cocoa-50">Ready to make the switch simple?</p>
        <Link
          href={site.consultationUrl}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-cocoa-300 px-7 py-3 text-xs uppercase tracking-widest text-cream-50 transition hover:bg-cocoa-200"
        >
          Get matched with a local firm
        </Link>
      </div>
    </main>
  );
}
