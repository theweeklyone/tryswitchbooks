import Link from "next/link";
import { ProgressBar } from "./ProgressBar";
import { Logo } from "@/components/Logo";

// Focused shell for the consultation flow. Slimmer than the global header,
// no nav, no sticky book button. The progress bar sits front and centre.

export function ConsultationLayout({
  step,
  total,
  showProgress = true,
  children,
}: {
  step: number;
  total: number;
  showProgress?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-cream-50">
      <header className="sticky top-0 z-30 border-b border-sand-100/70 bg-cream-50/95 backdrop-blur">
        <div className="container-luxe flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label="Switch Books home" className="block">
            <Logo size="sm" />
          </Link>
          <Link
            href="/services"
            className="text-[11px] uppercase tracking-widest text-cocoa-50 hover:text-cocoa-300"
          >
            Skip the quiz
          </Link>
        </div>
        {showProgress ? (
          <div className="container-luxe pb-2.5">
            <ProgressBar current={step} total={total} />
            <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-cocoa-50/60">
              Free · No sign-up · Your answers stay private until you submit
            </p>
          </div>
        ) : null}
      </header>

      {/* flex-1 + items-center vertically centres each question in the space
          between the header and the fixed bottom bar, so short questions look
          balanced rather than top-heavy. Long questions grow and the page
          scrolls as normal. */}
      <main className="flex flex-1 items-center px-5 pb-28 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
