import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { locations } from "@/data/locations";
import { site } from "@/data/site";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: { absolute: "Find a Local Accountant in Sussex | Switch Books" },
  description:
    "Switch Books matches business owners across Sussex with the right local accounting firm, for free. Choose your town and take the free 2-minute review.",
  alternates: { canonical: "/accountants" },
};

export default function AccountantsIndexPage() {
  const byCounty = locations.reduce<Record<string, typeof locations>>((acc, l) => {
    (acc[l.county] ||= []).push(l);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Areas we cover"
        title="Find the right local accountant, wherever you are in Sussex."
        description="We match business owners across Sussex and the South East with a trusted local firm that fits their needs and budget. Pick your town, or just take the free review and we'll do the rest."
        imageStyle="default"
        image="/images/sussex-hills.jpg"
        imageAlt="The Sussex Downs above the towns Switch Books covers"
      >
        <Link href={site.consultationUrl} className="btn-primary">
          Take the free review
        </Link>
        <Link href="/how-it-works" className="btn-secondary">
          How it works
        </Link>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="container-luxe space-y-14">
          {Object.entries(byCounty).map(([county, towns]) => (
            <div key={county}>
              <div className="mb-7 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-champagne-dark" strokeWidth={2} aria-hidden />
                <h2 className="font-serif text-2xl text-cocoa-300 sm:text-3xl">{county}</h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {towns.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/accountants/${t.slug}`}
                      className="card-luxe group flex items-center justify-between gap-3 p-6 transition-colors hover:border-champagne"
                    >
                      <span>
                        <span className="block font-serif text-xl text-cocoa-300">
                          Accountants in {t.name}
                        </span>
                        <span className="mt-1 block text-sm text-cocoa-50">
                          {t.nearbyAreas.slice(0, 3).join(", ")} and nearby
                        </span>
                      </span>
                      <ArrowRight
                        className="h-5 w-5 shrink-0 text-champagne-dark transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blush-50 py-16">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Not listed?"
            title="We cover the whole of Sussex and beyond."
            description="If your town isn't here yet, it doesn't matter. Take the free review and we'll match you with the right local firm wherever you are."
          />
        </div>
      </section>

      <CTASection
        eyebrow="One small step"
        title="See where you stand. Free, no obligation."
        description="The 2-minute review tells us what's not working and what you're hoping for. We'll come back with the right local match."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
