import { SectorPage, sectorMetadata } from "@/components/SectorPage";

export const metadata = sectorMetadata("restaurant-accountants");

export default function Page() {
  return <SectorPage slug="restaurant-accountants" />;
}
