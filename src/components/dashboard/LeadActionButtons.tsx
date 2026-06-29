"use client";

import { useState } from "react";
import Link from "next/link";
import type { ConsultationLead } from "@/lib/types/lead";
import { clsx } from "@/lib/utils";

// Quick action row for the drawer: contact the lead, or copy their email so you
// can forward their details to the accounting firm you're matching them with.

export function LeadActionButtons({ lead }: { lead: ConsultationLead }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(lead.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // older browsers, ignore
    }
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Action
        label={`Call ${lead.firstName}`}
        href={`tel:${lead.mobile.replace(/\s/g, "")}`}
      />
      <Action label="Email lead" href={`mailto:${lead.email}`} />
      <ActionButton
        label={copied ? "Email copied" : "Copy email address"}
        onClick={copyEmail}
        muted={copied}
      />
      {lead.recommendedServiceSlug ? (
        <Link
          href={`/services/${lead.recommendedServiceSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-sand-100 bg-cream-50 px-4 py-3 text-center text-sm text-cocoa-300 transition hover:border-cocoa-300"
        >
          Open relevant service page →
        </Link>
      ) : null}
    </div>
  );
}

function Action({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-sand-100 bg-cream-50 px-4 py-3 text-center text-sm text-cocoa-300 transition hover:border-cocoa-300"
    >
      {label}
    </a>
  );
}

function ActionButton({
  label,
  onClick,
  muted,
}: {
  label: string;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-2xl border px-4 py-3 text-center text-sm transition",
        muted
          ? "border-cocoa-300 bg-cocoa-300 text-cream-50"
          : "border-sand-100 bg-cream-50 text-cocoa-300 hover:border-cocoa-300",
      )}
    >
      {label}
    </button>
  );
}
