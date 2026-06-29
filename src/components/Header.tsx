"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Calculator,
  Receipt,
  FileText,
  Users,
  TrendingUp,
  BookOpen,
  Mail,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import { site } from "@/data/site";
import { clsx } from "@/lib/utils";
import { LogoGloss } from "./LogoGloss";

// Accounting & advisory services live under one tidy "Services" dropdown.
const servicesMenu = [
  { href: "/services", label: "All Services", desc: "What we'll match you with", icon: ClipboardCheck },
  { href: "/services/year-end-accounts", label: "Year-End Accounts", desc: "Filed early, no surprises", icon: FileText },
  { href: "/services/tax-and-vat", label: "Tax & VAT", desc: "Planned, not just reported", icon: Calculator },
  { href: "/services/bookkeeping", label: "Bookkeeping", desc: "Clean, real-time books", icon: Receipt },
  { href: "/services/payroll", label: "Payroll & Auto-Enrolment", desc: "Paid right, on time", icon: Users },
  { href: "/services/advisory", label: "Advisory & Planning", desc: "Numbers that drive decisions", icon: TrendingUp },
];

// The remaining top-level links.
const primaryLinks = [
  { href: "/how-it-works", label: "How it works", icon: ClipboardCheck },
  { href: "/advice", label: "Insights", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Routes that own their own chrome: the review/quiz flow and the internal
  // dashboard, plus the coming-soon holding page.
  if (
    pathname?.startsWith("/consultation") ||
    pathname?.startsWith("/dashboard") ||
    pathname === "/coming-soon"
  ) {
    return null;
  }

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const servicesActive = servicesMenu.some((s) => isActive(s.href));
  const barColor = "bg-cocoa-300";

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-cream-50/95 backdrop-blur-md border-b border-sand-100/60"
          : "bg-transparent",
      )}
    >
      <div className="container-luxe flex h-20 items-center justify-between gap-6 lg:h-24">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="group flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
        >
          <LogoGloss size="md" tone="ink" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((o) => !o)}
              className={clsx(
                "flex items-center gap-1.5 text-sm tracking-wide transition-colors",
                servicesActive ? "text-cocoa-300" : "text-cocoa-50 hover:text-cocoa-300",
              )}
            >
              <ClipboardCheck className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
              Services
              <ChevronDown
                className={clsx("h-3.5 w-3.5 transition-transform duration-200", servicesOpen && "rotate-180")}
                strokeWidth={1.5}
                aria-hidden
              />
            </button>

            {servicesOpen ? (
              // pt-4 bridges the gap so the panel stays open on hover.
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                <div className="w-[24rem] rounded-2xl border border-sand-100 bg-cream-50 p-2 shadow-xl shadow-cocoa-300/10">
                  {servicesMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={clsx(
                        "flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-blush-50",
                        isActive(item.href) && "bg-blush-50/70",
                      )}
                    >
                      <item.icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-champagne-dark"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span>
                        <span className="block text-sm text-cocoa-300">{item.label}</span>
                        <span className="block text-xs text-cocoa-50">{item.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-1.5 text-sm tracking-wide transition-colors",
                isActive(link.href) ? "text-cocoa-300" : "text-cocoa-50 hover:text-cocoa-300",
              )}
            >
              <link.icon className="h-4 w-4 text-champagne-dark" strokeWidth={1.5} aria-hidden />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster: primary CTA (wide) + menu (compact) */}
        <div className="flex shrink-0 items-center gap-2">
          <Link href={site.consultationUrl} className="btn-primary hidden xl:inline-flex">
            Free Business Review
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative h-10 w-10 xl:hidden"
          >
            <span
              className={clsx(
                "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 transition-transform duration-300",
                barColor,
                open ? "rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={clsx(
                "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 transition-opacity duration-300",
                barColor,
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={clsx(
                "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 transition-transform duration-300",
                barColor,
                open ? "-rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "overflow-hidden bg-cream-50 transition-[max-height] duration-500 ease-out xl:hidden",
          open ? "max-h-[100vh] border-t border-sand-100/60" : "max-h-0",
        )}
      >
        <nav
          className="container-luxe flex max-h-[calc(100vh-5rem)] flex-col overflow-auto py-6"
          aria-label="Mobile"
        >
          <p className="eyebrow mb-1">Services</p>
          {servicesMenu.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-4 border-b border-sand-100/50 py-3.5 font-serif text-xl",
                isActive(link.href) ? "text-cocoa-300" : "text-cocoa-50",
              )}
            >
              <link.icon className="h-5 w-5 shrink-0 text-champagne-dark" strokeWidth={1.5} aria-hidden />
              {link.label}
            </Link>
          ))}

          <p className="eyebrow mb-1 mt-6">Explore</p>
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-4 border-b border-sand-100/50 py-3.5 font-serif text-xl",
                isActive(link.href) ? "text-cocoa-300" : "text-cocoa-50",
              )}
            >
              <link.icon className="h-5 w-5 shrink-0 text-champagne-dark" strokeWidth={1.5} aria-hidden />
              {link.label}
            </Link>
          ))}

          <div className="mt-6 flex flex-col gap-3">
            <Link href={site.consultationUrl} className="btn-primary w-full">
              Free Business Review
            </Link>
            <a href={site.contact.phoneHref} className="btn-secondary w-full">
              Call {site.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
