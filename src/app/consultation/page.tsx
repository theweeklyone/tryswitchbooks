import type { Metadata } from "next";
import { og } from "@/lib/og";
import { ConsultationFlow } from "./ConsultationFlow";
import { getService } from "@/data/services";

export const metadata: Metadata = {
  title: "Free Business Review",
  description:
    "Tell us what you need and what's not working. We'll match you with the right local firm. Under 2 minutes, free, no obligation.",
  // All ?service= variants canonicalise to /consultation, so no duplicate content.
  alternates: { canonical: "/consultation" },
  openGraph: og("/consultation"),
  robots: { index: true, follow: true },
};

// Service pillar slugs that also exist as a `servicesWanted` quiz value, so a
// deep link from a service page can pre-select the visitor's need.
const PRESEED_SERVICES = new Set([
  "bookkeeping",
  "year-end-accounts",
  "tax-and-vat",
  "payroll",
  "advisory",
]);

export default function ConsultationPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  const slug = typeof searchParams.service === "string" ? searchParams.service : "";
  const service = PRESEED_SERVICES.has(slug) ? getService(slug) : undefined;

  return (
    <ConsultationFlow
      preselectService={service ? slug : undefined}
      preselectServiceLabel={service?.name}
    />
  );
}
