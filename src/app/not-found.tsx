import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-6 pt-24">
      <div className="max-w-lg text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-cocoa-300 sm:text-6xl">
          We can’t seem to find that page.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-cocoa-50">
          It may have moved, or it may never have existed. Let’s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href={site.consultationUrl} className="btn-secondary">
            Take the free review
          </Link>
        </div>
      </div>
    </section>
  );
}
