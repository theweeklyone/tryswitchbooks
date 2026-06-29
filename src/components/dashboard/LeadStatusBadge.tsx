import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/types/lead";
import { clsx } from "@/lib/utils";

const styles: Record<LeadStatus, string> = {
  new: "bg-blush-100 text-cocoa-300 ring-1 ring-blush-200",
  contacted: "bg-cream-200 text-cocoa-300 ring-1 ring-sand-200",
  "call-booked":
    "bg-champagne-light/40 text-cocoa-300 ring-1 ring-champagne",
  introduced: "bg-champagne text-cream-50",
  won: "bg-cocoa-300 text-cream-50",
  lost: "bg-cream-100 text-cocoa-50 ring-1 ring-sand-100",
  nurture: "bg-blush-50 text-cocoa-50 ring-1 ring-blush-100",
};

export function LeadStatusBadge({
  status,
  className,
}: {
  status: LeadStatus;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider",
        styles[status],
        className,
      )}
    >
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
