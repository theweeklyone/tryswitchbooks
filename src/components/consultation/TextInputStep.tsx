import { clsx } from "@/lib/utils";

type Type = "text" | "email" | "tel";

// Single-line input step. Tall, generous, mobile-friendly.

export function TextInputStep({
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
  error,
}: {
  type: Type;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  error?: string | null;
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={clsx(
          "w-full rounded-2xl border bg-cream-50 px-5 py-5 font-serif text-2xl text-cocoa-300 placeholder:font-serif placeholder:text-cocoa-50/40 outline-none transition-colors duration-300 sm:py-6 sm:text-3xl",
          error
            ? "border-champagne-dark"
            : "border-sand-100 focus:border-cocoa-300",
        )}
      />
      {error ? (
        <p className="mt-3 text-xs uppercase tracking-widest text-champagne-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}
