import type { Metadata } from "next";
import { localServices } from "@/data/local-services";
import { LocalServicePage, localServiceMetadata } from "@/components/LocalServicePage";

// Only the defined combos render; anything else 404s (no thin auto-generated
// service×town pages).
export const dynamicParams = false;

export function generateStaticParams() {
  return localServices.map((l) => ({ town: l.town, service: l.service }));
}

export function generateMetadata({
  params,
}: {
  params: { town: string; service: string };
}): Metadata {
  return localServiceMetadata(params.town, params.service);
}

export default function Page({ params }: { params: { town: string; service: string } }) {
  return <LocalServicePage town={params.town} service={params.service} />;
}
