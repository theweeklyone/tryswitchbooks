"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { Logo } from "./Logo";
import { MapPin, Clock, Phone, Mail, Compass, ClipboardCheck } from "lucide-react";

const quickLinks = [
  { href: "/services", label: "All Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/consultation", label: "Free Business Review" },
  { href: "/advice", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  // Hide on focused experiences (review/quiz flow, internal dashboard).
  if (
    pathname?.startsWith("/consultation") ||
    pathname?.startsWith("/dashboard") ||
    pathname === "/coming-soon"
  ) {
    return null;
  }

  return (
    <footer className="mt-32 border-t border-sand-100/60 bg-cocoa-300 text-cream-100">
      <div className="container-luxe py-20">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo tone="cream" size="md" className="!items-start" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream-100/75">
              {site.description}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-widest text-champagne-light/80">
              {site.brandPromise}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow flex items-center gap-2 text-champagne-light">
              <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Areas we cover
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {locations.slice(0, 12).map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/accountants/${l.slug}`}
                    className="text-cream-100/85 hover:text-cream-50"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/accountants"
              className="mt-4 inline-block text-xs uppercase tracking-widest text-champagne-light/90 hover:text-cream-50"
            >
              All areas →
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-cream-100/60">
              Sussex-based, supporting business owners across the UK, in person or remotely.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow flex items-center gap-2 text-champagne-light">
              <Compass className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((q) => (
                <li key={q.href}>
                  <Link href={q.href} className="text-cream-100/85 hover:text-cream-50">
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow flex items-center gap-2 text-champagne-light">
              <ClipboardCheck className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Services
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-cream-100/85 hover:text-cream-50">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-cream-100/15 pt-8 md:grid-cols-2 md:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-cream-100/70">
            <a href={site.contact.phoneHref} className="flex items-center gap-2 hover:text-cream-50">
              <Phone className="h-4 w-4 text-champagne-light" strokeWidth={1.5} aria-hidden />
              {site.contact.phoneDisplay}
            </a>
            <a href={site.contact.emailHref} className="flex items-center gap-2 hover:text-cream-50">
              <Mail className="h-4 w-4 text-champagne-light" strokeWidth={1.5} aria-hidden />
              {site.contact.emailDisplay}
            </a>
          </div>
          <div className="md:text-right">
            <Link
              href={site.consultationUrl}
              className="inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3 text-xs uppercase tracking-widest text-cocoa-300 transition hover:bg-champagne-light"
            >
              Free Business Review
            </Link>
          </div>
        </div>
        <p className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-cream-100/40">
          <span>
            © {new Date().getFullYear()} {site.name}. {site.location.short}. All rights reserved.
          </span>
          <span className="flex items-center gap-4">
            <Link href="/privacy" className="text-cream-100/55 transition hover:text-cream-50">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-cream-100/55 transition hover:text-cream-50">
              Terms
            </Link>
            <Link href="/cookies" className="text-cream-100/55 transition hover:text-cream-50">
              Cookies
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}
