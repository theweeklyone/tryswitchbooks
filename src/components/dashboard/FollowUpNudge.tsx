import { clsx } from "@/lib/utils";
import type { Nudge } from "@/lib/leads/nudges";

const tone: Record<Nudge["kind"], string> = {
  "aged-new": "bg-blush-50 text-champagne-dark border-champagne/30",
  "hot-no-follow-up": "bg-blush-100 text-cocoa-300 border-blush-200",
  "ready-to-move":
    "bg-champagne-light/30 text-cocoa-300 border-champagne/40",
  "high-value-unassigned": "bg-cocoa-300 text-cream-50 border-cocoa-300",
};

export function FollowUpNudge({
  nudge,
  size = "md",
  className,
}: {
  nudge: Nudge;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      title={nudge.label}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium tracking-wide",
        size === "sm" ? "text-[10px]" : "text-[11px]",
        tone[nudge.kind],
        className,
      )}
    >
      <span aria-hidden>!</span>
      {nudge.label}
    </span>
  );
}
