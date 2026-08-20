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
        "group relative flex h-full min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-xl border bg-cream-50 px-4 py-3 text-left transition-all duration-200",
        selected
          ? "border-cocoa-300 bg-blush-50/40 shadow-[0_4px_20px_-14px_rgba(21,17,15,0.2)]"
          : "border-sand-100 hover:border-cocoa-300/60",
      )}
    >
      <span className="flex-1">
        <span className="block font-serif text-base leading-snug text-cocoa-300 sm:text-lg">
          {label}
        </span>
        {hint ? (
          <span className="mt-0.5 block text-xs leading-relaxed text-cocoa-50">{hint}</span>
        ) : null}
      </span>

      {/* Selection indicator */}
      <span
        aria-hidden
        className={clsx(
          "shrink-0 transition-all duration-200",
          multiSelect ? "h-5 w-5 rounded-md border" : "h-5 w-5 rounded-full border",
          selected ? "border-cocoa-300 bg-cocoa-300" : "border-sand-200 bg-cream-50",
        )}
      >
        <span
          className={clsx(
            "block transition-transform duration-200",
            multiSelect
              ? "ml-[6px] mt-[2px] h-2.5 w-1.5 rotate-45 border-b-2 border-r-2 border-cream-50"
              : "mx-auto mt-[5px] h-2 w-2 rounded-full bg-cream-50",
            selected ? "scale-100" : "scale-0",
          )}
        />
      </span>
    </button>
  );
}
