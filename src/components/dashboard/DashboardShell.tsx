"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  MessageSquare,
  BarChart3,
  Pencil,
  ImageIcon,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { clsx } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon };
type NavGroup = { title: string; items: NavItem[] };

// Grouped so new tools can be slotted into the right section (or a new section)
// without redesigning the menu.
const navGroups: NavGroup[] = [
  {
    title: "Enquiries",
    items: [
      { href: "/dashboard/leads", label: "Leads", icon: Inbox },
      { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    title: "Insights",
    items: [{ href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 }],
  },
  {
    title: "Website",
    items: [
      { href: "/dashboard/content", label: "Content", icon: Pencil },
      { href: "/dashboard/images", label: "Images", icon: ImageIcon },
    ],
  },
];

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string | null;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-6">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="px-3 text-[10px] font-medium uppercase tracking-widest text-cocoa-50/60">
            {group.title}
          </p>
          <ul className="mt-2 space-y-1">
            {group.items.map((item) => {
              const active = pathname?.startsWith(item.href) ?? false;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                      active
                        ? "bg-cocoa-300 text-cream-50"
                        : "text-cocoa-300 hover:bg-cream-100",
                    )}
                  >
                    <item.icon
                      className={clsx(
                        "h-4 w-4 shrink-0",
                        active ? "text-cream-50" : "text-champagne-dark",
                      )}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DashboardShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "??";

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-sand-100/70 bg-cream-50/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sand-200 text-cocoa-300 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </button>
            <Link href="/" aria-label="Switch Books home" className="block">
              <Logo size="sm" />
            </Link>
            <span className="hidden rounded-full border border-sand-200 bg-cream-100 px-3 py-1 text-[10px] uppercase tracking-widest text-cocoa-50 sm:inline-flex">
              Internal
            </span>
          </div>
          {userEmail ? (
            <div className="flex items-center gap-3">
              <span
                title={userEmail}
                className="hidden h-8 w-8 items-center justify-center rounded-full bg-cocoa-300 text-[11px] font-medium uppercase tracking-wider text-cream-50 sm:inline-flex"
              >
                {initials}
              </span>
              <form action="/auth/sign-out" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-cream-50 px-3 py-1.5 text-[11px] uppercase tracking-widest text-cocoa-300 hover:border-cocoa-300"
                >
                  <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-sand-100/70 bg-cream-50/60 px-4 py-6 lg:block">
          <NavLinks pathname={pathname} />
        </aside>

        {/* Mobile drawer */}
        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-cocoa-300/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="absolute left-0 top-0 flex h-full w-72 max-w-[80%] flex-col bg-cream-50 shadow-2xl">
              <div className="flex items-center justify-between border-b border-sand-100 px-4 py-4">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sand-200 text-cocoa-300"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>
        ) : null}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto w-full max-w-[1200px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
