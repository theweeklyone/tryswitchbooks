import { clsx } from "@/lib/utils";

// Single KPI card. Compact, scannable, premium.
// Optional `tone` switches the accent for the most important metric.

export function LeadKpiCard({
  label,
  value,
  hint,
  tone = "default",
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "primary";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border bg-cream-50 p-5",
        tone === "primary"
          ? "border-cocoa-300/20 shadow-[0_2px_24px_-12px_rgba(21,17,15,0.18)]"
          : "border-sand-100",
        className,
      )}
    >
      <p className="text-[11px] uppercase tracking-widest text-champagne-dark">
        {label}
      </p>
      <p
        className={clsx(
          "mt-2 font-serif leading-tight",
          tone === "primary" ? "text-3xl text-cocoa-300" : "text-2xl text-cocoa-300",
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-xs leading-relaxed text-cocoa-50">{hint}</p>
      ) : null}
    </div>
  );
}
