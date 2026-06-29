"use client";

import { useEffect, useRef } from "react";
import { Logo } from "./Logo";

// The wordmark with a champagne gloss sweep. Plays once on load and again on
// hover (never loops). One reusable component so the header and the
// coming-soon page behave identically. Motion is gated in CSS behind
// prefers-reduced-motion: no-preference.

type Props = {
  tone?: "ink" | "cream";
  size?: "sm" | "md" | "lg" | "xl" | "fluid";
  className?: string;
};

export function LogoGloss(props: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const play = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-sweeping");
    void el.offsetWidth; // force reflow so the animation can restart
    el.classList.add("is-sweeping");
  };

  useEffect(() => {
    play();
  }, []);

  return (
    <span
      ref={ref}
      className="logo-gloss-root inline-flex"
      onMouseEnter={play}
    >
      <Logo gloss {...props} />
    </span>
  );
}
