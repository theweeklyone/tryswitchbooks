import { LEAD_PRIORITY_LABELS, type LeadPriority } from "@/lib/types/lead";
import { clsx } from "@/lib/utils";

const styles: Record<LeadPriority, string> = {
  hot: "bg-cocoa-300 text-cream-50",
  warm: "bg-champagne text-cream-50",
  cool: "bg-cream-100 text-cocoa-50 ring-1 ring-sand-100",
};

const dotStyles: Record<LeadPriority, string> = {
  hot: "bg-cream-50",
  warm: "bg-cream-50/80",
  cool: "bg-cocoa-50/40",
};

export function LeadPriorityBadge({
  priority,
  className,
}: {
  priority: LeadPriority;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider",
        styles[priority],
        className,
      )}
    >
      <span
        aria-hidden
        className={clsx("inline-block h-1.5 w-1.5 rounded-full", dotStyles[priority])}
      />
      {LEAD_PRIORITY_LABELS[priority]}
    </span>
  );
}
