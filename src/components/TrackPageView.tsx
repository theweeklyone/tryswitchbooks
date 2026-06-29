"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

// Drop-in client component for firing a "page viewed" event on mount.
// Lets server components add tracking without converting to client.

export function TrackPageView({
  event,
  data,
}: {
  event: string;
  data?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackEvent(event, data ?? {});
    // We intentionally re-fire if the event name changes (route param changes),
    // but not on render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return null;
}
