import { clsx } from "@/lib/utils";

// Large, tappable answer card. Same visual for single and multi-select;
// the selected/checked state is driven by the parent.

export function OptionCard({
  label,
  hint,
  selected,
  onClick,
  multiSelect,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  onClick: () => void;
  multiSelect?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "group relative flex w-full items-center justify-between gap-5 rounded-2xl border bg-cream-50 px-5 py-5 text-left transition-all duration-300 sm:px-6 sm:py-6",
        selected
          ? "border-cocoa-300 bg-blush-50/40 shadow-[0_4px_24px_-12px_rgba(21,17,15,0.18)]"
          : "border-sand-100 hover:border-cocoa-300/60 hover:-translate-y-0.5",
      )}
    >
      <span className="flex-1">
        <span
          className={clsx(
            "block font-serif text-xl leading-snug sm:text-2xl",
            selected ? "text-cocoa-300" : "text-cocoa-300",
          )}
        >
          {label}
        </span>
        {hint ? (
          <span className="mt-1 block text-xs leading-relaxed text-cocoa-50">{hint}</span>
        ) : null}
      </span>

      {/* Selection indicator */}
      <span
        aria-hidden
        className={clsx(
          "shrink-0 transition-all duration-300",
          multiSelect ? "h-6 w-6 rounded-md border" : "h-6 w-6 rounded-full border",
          selected
            ? "border-cocoa-300 bg-cocoa-300"
            : "border-sand-200 bg-cream-50",
        )}
      >
        <span
          className={clsx(
            "block transition-transform duration-300",
            multiSelect
              ? "ml-1 mt-0.5 h-3 w-2 rotate-45 border-b-2 border-r-2 border-cream-50"
              : "mx-auto mt-1 h-3 w-3 rounded-full bg-cream-50",
            selected ? "scale-100" : "scale-0",
          )}
        />
      </span>
    </button>
  );
}
