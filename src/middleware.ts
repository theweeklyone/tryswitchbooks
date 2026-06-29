import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { features } from "@/data/site";

const PROTECTED_PREFIXES = ["/dashboard", "/client"];
const ADMIN_PREFIXES = ["/dashboard"];

// "Coming soon" holding mode. LAUNCHED: holding mode is now off, the full site
// is public. To put the holding page back, change this line back to
// `process.env.COMING_SOON === "true"` (the COMING_SOON env var in Vercel still
// exists and would take over again).
const COMING_SOON = false;

// Preview bypass. While in holding mode, visiting any URL with
// ?preview=<token> sets a cookie that lets you browse the full live site (the
// public still sees /coming-soon). Use ?preview=off to clear it.
const PREVIEW_TOKEN = "switchbooks-preview-2026";
const PREVIEW_COOKIE = "sv-preview";

function needsAuth(pathname: string) {
  return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
}

function needsAdmin(pathname: string) {
  return ADMIN_PREFIXES.some((p) => pathname.startsWith(p));
}

// While in holding mode, everything public goes to /coming-soon. The holding
// page itself, the owner's auth/dashboard area, and the metadata/asset routes
// stay reachable so booking links, sign-in and the lead dashboard keep working.
function comingSoonAllowed(pathname: string) {
  return (
    pathname === "/coming-soon" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/client") ||
    // Staff portal (separate Multi-Zone app under /staff) has its own login and
    // must stay reachable for staff while the public site is still in holding.
    pathname.startsWith("/staff") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/opengraph-image") ||
    pathname === "/icon.svg" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Client portal is hidden until the the booking system integration is ready. Send any
  // /client route home; flip features.clientPortal in site.ts to restore it.
  if (!features.clientPortal && pathname.startsWith("/client")) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Temporary (307) redirect so it stops cleanly the moment the flag is off.
  if (COMING_SOON && !comingSoonAllowed(pathname)) {
    const previewParam = req.nextUrl.searchParams.get("preview");
    const hasPreviewCookie = req.cookies.get(PREVIEW_COOKIE)?.value === PREVIEW_TOKEN;

    // ?preview=off clears the cookie and returns to the holding page.
    if (previewParam === "off") {
      const url = req.nextUrl.clone();
      url.pathname = "/coming-soon";
      url.search = "";
      const res = NextResponse.redirect(url);
      res.cookies.delete(PREVIEW_COOKIE);
      return res;
    }

    // Valid token (via link or stored cookie) → let the real site through.
    if (previewParam === PREVIEW_TOKEN || hasPreviewCookie) {
      const res = NextResponse.next();
      if (previewParam === PREVIEW_TOKEN) {
        res.cookies.set(PREVIEW_COOKIE, PREVIEW_TOKEN, {
          httpOnly: false, // readable by the PreviewBanner so it can flag preview mode
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
      }
      return res;
    }

    const url = req.nextUrl.clone();
    url.pathname = "/coming-soon";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (!needsAuth(pathname)) return NextResponse.next();

  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (needsAdmin(pathname)) {
    const { data: isAdmin } = await supabase.rpc("current_user_is_admin");
    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      url.searchParams.set("error", "not-admin");
      return NextResponse.redirect(url);
    }

    // First login with a temporary password: force a change before anything else.
    const mustChange =
      (user.user_metadata as { must_change_password?: boolean } | undefined)
        ?.must_change_password === true;
    if (mustChange && pathname !== "/dashboard/change-password") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/change-password";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  // Run on all routes (so the holding-page gate can cover the whole site),
  // excluding Next internals and static files. The auth logic still only acts
  // on /dashboard and /client via needsAuth().
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
