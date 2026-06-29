import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";

// Reusable page-level FAQ section. Pairs the accordion with an FAQPage JSON-LD
// block for SEO (rich results). Use on any page with services so new clients
// get their questions answered before booking.

export function PageFAQ({
  items,
  eyebrow = "FAQ",
  title = "Good to know before you book.",
  intro = "Tap any question to read the answer. Still wondering something? Send us a message and we will reply within one working day.",
  background = "default",
}: {
  items: FAQItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** "default" = plain, "blush" = soft blush wash to set it apart. */
  background?: "default" | "blush";
}) {
  if (items.length === 0) return null;

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className={background === "blush" ? "bg-blush-50 py-20 sm:py-24" : "py-20 sm:py-24"}>
      <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-cocoa-300 sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-cocoa-50 sm:text-lg">
            {intro}
          </p>
        </div>
        <FAQAccordion items={items} />
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </section>
  );
}
