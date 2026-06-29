"use client";

import { useEffect, useState } from "react";

// Safeguard: shows a small badge whenever you're viewing the live site via the
// preview bypass — so it's always obvious that the PUBLIC still sees the Coming
// Soon page, and you never mistake "I can see the full site" for "the holding
// page is down". Reads the (non-httpOnly) sv-preview cookie. Renders nothing
// for normal visitors.
export function PreviewBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(
      document.cookie.split("; ").some((c) => c.startsWith("sv-preview=")),
    );
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] flex items-center gap-2 rounded-full bg-cocoa-300 px-4 py-2 text-[11px] uppercase tracking-widest text-cream-50 shadow-xl shadow-cocoa-300/30">
      <span aria-hidden>●</span>
      <span>Preview · public sees Coming Soon</span>
      <a
        href="/?preview=off"
        className="rounded-full bg-cream-50/15 px-2.5 py-0.5 transition-colors hover:bg-cream-50/25"
      >
        Exit
      </a>
    </div>
  );
}
