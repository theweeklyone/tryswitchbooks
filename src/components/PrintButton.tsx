"use client";

// Small client button that opens the browser print dialog, from which the user
// can "Save as PDF". Used on the branded switching checklist so the one-page
// sheet doubles as a downloadable asset without a server-side PDF toolchain.
export function PrintButton({
  label = "Download / print as PDF",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3 text-xs uppercase tracking-widest text-cocoa-300 transition hover:bg-champagne-light"
      }
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <path d="M6 9V3h12v6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="9" width="16" height="8" rx="2" />
        <path d="M8 17h8v4H8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  );
}
