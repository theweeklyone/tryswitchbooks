import { clsx } from "@/lib/utils";

// Slim progress strip across the top of the consultation flow.
// "Question X of Y" sits inline so the bar stays visually quiet.

export function ProgressBar({
  current,
  total,
  className,
}: {
  current: number; // 1-indexed
  total: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className={clsx("w-full", className)}>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-cocoa-50/70">
        <span>
          Question {current} of {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="mt-2 h-px w-full overflow-hidden bg-sand-100">
        <div
          className="h-full bg-champagne transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
