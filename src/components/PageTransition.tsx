"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fades the incoming page content in on each route change, so navigation does
// not flash white. Just opacity, no slide or scale. Scroll resets to the top
// on change. Motion is gated in CSS behind prefers-reduced-motion, so
// reduced-motion users navigate instantly.

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
