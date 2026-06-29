// Dev-only sign-in escape hatch. Uses your service_role key to generate a
// magic-link token directly via Supabase's admin API — no email sent, no
// rate limit, no waiting.
//
// Run:
//   node --env-file=.env.local scripts/generate-signin-link.mjs
//   node --env-file=.env.local scripts/generate-signin-link.mjs other@person.com
//   node --env-file=.env.local scripts/generate-signin-link.mjs me@me.com /dashboard/analytics 3000
//
// Then paste the printed URL into your browser. NEVER expose this script
// behind an HTTP endpoint — it can sign in as any email.

import { createClient } from "@supabase/supabase-js";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const email = process.argv[2] ?? "jservante@hotmail.co.uk";
const next = process.argv[3] ?? "/dashboard/leads";
const port = process.argv[4] ?? "3000";

const { data, error } = await admin.auth.admin.generateLink({
  type: "magiclink",
  email,
});

if (error) {
  console.error("FAIL:", error.message);
  process.exit(1);
}

const tokenHash = data.properties?.hashed_token;
if (!tokenHash) {
  console.error("FAIL: no hashed_token in response");
  console.error(data);
  process.exit(1);
}

const url = `http://localhost:${port}/auth/callback?token_hash=${tokenHash}&type=magiclink&next=${encodeURIComponent(next)}`;

console.log(`\nGenerated sign-in link for ${email}:\n`);
console.log(url);
console.log("\nPaste it into your browser. Single-use, expires in ~1 hour.\n");
