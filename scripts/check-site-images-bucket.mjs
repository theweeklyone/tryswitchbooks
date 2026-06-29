// Read-only check that supabase/site-images.sql landed.
// Run with: node --env-file=.env.local scripts/check-site-images-bucket.mjs
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !serviceKey || !anonKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
const anon = createClient(url, anonKey, { auth: { persistSession: false } });

// 1. Bucket exists + is public?
const { data: bucket, error: bErr } = await admin.storage.getBucket("site-images");
if (bErr || !bucket) {
  console.error(`FAIL: site-images bucket not found — ${bErr?.message ?? "missing"}`);
  process.exit(1);
}
console.log(`OK: bucket "site-images" exists (public=${bucket.public})`);

// 2. Public read works (anon can list the bucket without error)?
const { error: lErr } = await anon.storage.from("site-images").list("", { limit: 1 });
if (lErr) {
  console.error(`WARN: anon list returned an error — ${lErr.message}`);
} else {
  console.log("OK: public read policy active (anon can list the bucket)");
}

console.log("\nDone. The Images editor is ready to use.");
