import type { Metadata } from "next";
import Link from "next/link";
import { AdviceHub } from "./AdviceHub";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Insights for Business Owners",
  description:
    "Straight-talking guides for UK business owners: choosing an accountant, switching, tax planning, bookkeeping and getting real value from your numbers.",
  alternates: { canonical: "/advice" },
};

export default function AdvicePage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Plain-English guidance for business owners."
        description="No jargon, no sales pitch. Just honest reading on choosing the right accountant, switching without the hassle, and getting real value from your numbers."
        imageStyle="default"
        image="/images/reviewing-reports.jpg"
        imageAlt="A business owner reading through clear, well-organised reports"
      >
        <Link href={site.consultationUrl} className="btn-primary">
          Take the free review
        </Link>
      </PageHero>

      <section className="pb-24 pt-12">
        <div className="container-luxe">
          <AdviceHub />
        </div>
      </section>

      <CTASection
        eyebrow="Got a specific question?"
        title="Let's point you in the right direction."
        description="Take the free review or send us a message. We'll match you with a local firm that can answer it properly."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
