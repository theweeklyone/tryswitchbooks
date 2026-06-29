"use client";

import { useState } from "react";
import { clsx } from "@/lib/utils";

export type FAQItem = { q: string; a: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sand-100/80 border-y border-sand-100/80">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-cocoa-300"
            >
              <span className="font-serif text-xl text-cocoa-300 sm:text-2xl">{item.q}</span>
              <span
                aria-hidden
                className={clsx(
                  "relative h-5 w-5 shrink-0 transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
              >
                <span className="absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 bg-cocoa-300" />
                <span className="absolute left-1/2 top-0 block h-5 w-px -translate-x-1/2 bg-cocoa-300" />
              </span>
            </button>
            <div
              className={clsx(
                "grid overflow-hidden transition-all duration-500 ease-out",
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl text-pretty text-base leading-relaxed text-cocoa-50">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
