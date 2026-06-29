// Routes that should hide the marketing chrome (header / footer / sticky book button)
// because they own their own focused layout.

const FOCUSED_PREFIXES = ["/consultation", "/dashboard"];

export function isFocusedRoute(pathname?: string | null): boolean {
  if (!pathname) return false;
  return FOCUSED_PREFIXES.some((p) => pathname.startsWith(p));
}
