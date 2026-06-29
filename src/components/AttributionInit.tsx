"use client";

import { useEffect } from "react";
import { storeAttributionFromUrl } from "@/lib/attribution";

// Mounts once at the top of the tree. On first paint of any page, captures
// any UTM / click-id parameters off the URL into localStorage so the
// we can later attribute leads to the campaign that brought them in.

export function AttributionInit() {
  useEffect(() => {
    storeAttributionFromUrl();
  }, []);
  return null;
}
