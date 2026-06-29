import type { Metadata } from "next";
import { ConsultationFlow } from "./ConsultationFlow";

export const metadata: Metadata = {
  title: "Free Business Review",
  description:
    "Tell us what's frustrating you about your current accountant and what you need. We'll match you with the right local firm. Under 2 minutes, free, no obligation.",
  alternates: { canonical: "/consultation" },
  // Lead-capture page: discourage indexing of the variant pages, but keep the canonical visible.
  robots: { index: true, follow: true },
};

export default function ConsultationPage() {
  return <ConsultationFlow />;
}
