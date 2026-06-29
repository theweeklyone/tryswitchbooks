import { clsx } from "@/lib/utils";

// Sticky-feeling bottom nav for the consultation flow.
// Back is always available except on step 1; Next is enabled when valid;
// the final step's Next becomes "See my recommendation".

export function QuizNavigation({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isLast,
  submitting,
}: {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLast: boolean;
  submitting?: boolean;
}) {
  return (
    <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className={clsx(
          "btn-secondary w-full sm:w-auto",
          !canGoBack && "pointer-events-none opacity-30",
        )}
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext || submitting}
        className={clsx(
          "btn-primary w-full sm:w-auto",
          (!canGoNext || submitting) && "pointer-events-none opacity-40",
        )}
      >
        {submitting
          ? "Designing your recommendation…"
          : isLast
            ? "See my recommendation →"
            : "Next →"}
      </button>
    </div>
  );
}
