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
    <div className="min-h-screen bg-cream-50">
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
          <div className="container-luxe pb-3">
            <ProgressBar current={step} total={total} />
          </div>
        ) : null}
      </header>

      <main className="px-5 pb-32 pt-10 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="mx-auto w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
