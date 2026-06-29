import { clsx } from "@/lib/utils";

// Switch Books wordmark.
// Stacked treatment: "Switch" in display serif, "BOOKS" beneath, flanked by hairlines.

type Tone = "ink" | "cream";

export function Logo({
  tone = "ink",
  size = "md",
  className,
  gloss = false,
}: {
  tone?: Tone;
  size?: "sm" | "md" | "lg" | "xl" | "fluid";
  className?: string;
  /** Enable the champagne gloss-sweep treatment (driven by LogoGloss). */
  gloss?: boolean;
}) {
  const sizes = {
    sm: { word: "text-2xl", studio: "text-[9px]", line: "w-3" },
    md: { word: "text-3xl", studio: "text-[10px]", line: "w-4" },
    lg: { word: "text-5xl", studio: "text-xs", line: "w-6" },
    xl: { word: "text-6xl sm:text-7xl", studio: "text-[13px]", line: "w-8" },
    // Scales continuously with the viewport (used on the coming-soon page).
    fluid: {
      word: "text-[clamp(2rem,5.5vw,4.25rem)]",
      studio: "text-[clamp(0.55rem,1vw,0.85rem)]",
      line: "w-[clamp(0.875rem,2.2vw,1.75rem)]",
    },
  } as const;

  const colour = tone === "cream" ? "text-cream-50" : "text-ink";

  return (
    <span
      aria-label="Switch Books"
      className={clsx("inline-flex flex-col items-center leading-none", colour, className)}
      style={
        gloss
          ? ({ "--gloss-base": tone === "cream" ? "#FAF8F3" : "#14213D" } as React.CSSProperties)
          : undefined
      }
    >
      <span
        className={clsx(
          "font-wordmark italic-0 tracking-tight",
          gloss && "logo-gloss",
          sizes[size].word,
        )}
        style={{ letterSpacing: "-0.005em" }}
      >
        Switch
      </span>
      <span className="mt-1.5 flex items-center gap-2">
        <span
          aria-hidden
          className={clsx("h-px bg-current opacity-60", sizes[size].line)}
        />
        <span
          className={clsx(
            "uppercase tracking-[0.42em]",
            gloss && "logo-gloss",
            sizes[size].studio,
          )}
        >
          Books
        </span>
        <span
          aria-hidden
          className={clsx("h-px bg-current opacity-60", sizes[size].line)}
        />
      </span>
    </span>
  );
}
