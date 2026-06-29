"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll reveal driver. Watches elements with the `.reveal` class and reveals
// each once as it enters the viewport, staggering siblings by ~80ms. Does
// nothing for users who prefer reduced motion (CSS keeps those elements fully
// visible). Re-scans on route change so client-navigated pages animate too.

export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    ).filter((el) => !el.classList.contains("is-revealed"));
    if (els.length === 0) return;

    // Stagger siblings by their order within the same parent.
    for (const el of els) {
      const parent = el.parentElement;
      if (!parent) continue;
      const sibs = Array.from(parent.children).filter((c) =>
        c.classList.contains("reveal"),
      );
      const idx = sibs.indexOf(el);
      if (idx > 0) {
        el.style.setProperty("--reveal-delay", `${Math.min(idx, 8) * 80}ms`);
      }
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
