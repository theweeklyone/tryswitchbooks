import { clsx } from "@/lib/utils";

// Multi-line textarea step with optional character counter.

export function TextAreaStep({
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  const remaining = maxLength ? maxLength - value.length : null;

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={6}
        className={clsx(
          "w-full rounded-2xl border border-sand-100 bg-cream-50 p-5 text-base leading-relaxed text-cocoa-300 placeholder:text-cocoa-50/40 outline-none transition-colors duration-300 focus:border-cocoa-300 sm:p-6 sm:text-lg",
        )}
      />
      {maxLength ? (
        <p className="mt-2 text-right text-[11px] uppercase tracking-widest text-cocoa-50/60">
          {remaining} characters left
        </p>
      ) : null}
    </div>
  );
}
