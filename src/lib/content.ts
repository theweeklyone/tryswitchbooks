import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { contentDefaults } from "@/data/editable";
import { imageDefaults } from "@/data/editable-images";

// Editable content overrides, keyed by a stable string (e.g. "home.hero.subtitle").
// The site reads these on top of its built-in defaults; a missing or blank value
// falls back to the default. Edited via the dashboard → Content page.
// Backed by the `content_block` table (supabase/content.sql).

export type ContentMap = Record<string, string>;

/** All content overrides as a key→value map. Empty on any error so the site
 *  always renders with its built-in defaults. */
export async function getContentMap(): Promise<ContentMap> {
  try {
    // Cookieless admin client (read-only): no cookies() call means pages that
    // use content can stay statically cached / ISR (revalidate), which keeps
    // response times fast. Bypasses RLS, fine for this public content table.
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("content_block").select("key, value");
    if (error || !data) return {};
    const map: ContentMap = {};
    for (const r of data) map[r.key as string] = (r.value as string) ?? "";
    return map;
  } catch {
    return {};
  }
}

/** Text override for `key`. Falls back to the explicit `fallback`, else the
 *  registry default (data/editable.ts), else "". */
export function cval(map: ContentMap, key: string, fallback?: string): string {
  const v = map[key];
  if (v != null && v.trim() !== "") return v;
  if (fallback !== undefined) return fallback;
  return contentDefaults[key] ?? "";
}

/** Image URL for `key`: the dashboard-uploaded override, else the bundled
 *  default from the editable-images registry. */
export function imageSrc(map: ContentMap, key: string): string {
  return cval(map, key, imageDefaults[key] ?? "");
}

/** Boolean toggle for `key` (stored as "true"/"false"). Falls back to the
 *  explicit `fallback`, else the registry default, else true. */
export function cflag(map: ContentMap, key: string, fallback?: boolean): boolean {
  const v = map[key];
  if (v != null && v !== "") return v === "true";
  if (fallback !== undefined) return fallback;
  return contentDefaults[key] !== "false";
}
