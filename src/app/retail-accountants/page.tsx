import { SectorPage, sectorMetadata } from "@/components/SectorPage";

export const metadata = sectorMetadata("retail-accountants");

export default function Page() {
  return <SectorPage slug="retail-accountants" />;
}
