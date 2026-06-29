// Compare auth users to allowed_admins so we can see if there's an email mismatch.
// Run: node --env-file=.env.local scripts/check-admins.mjs

import { createClient } from "@supabase/supabase-js";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data: { users }, error: usersErr } = await admin.auth.admin.listUsers();
if (usersErr) {
  console.error("listUsers failed:", usersErr.message);
  process.exit(1);
}

const { data: admins, error: adminsErr } = await admin.from("allowed_admins").select("*");
if (adminsErr) {
  console.error("allowed_admins query failed:", adminsErr.message);
  process.exit(1);
}

console.log("Auth users (signed in or signed up):");
for (const u of users) {
  console.log(`  ${u.email}  (id ${u.id.slice(0, 8)}…  last sign-in ${u.last_sign_in_at ?? "never"})`);
}

console.log("\nAllowed admins:");
for (const a of admins) {
  console.log(`  ${a.email}`);
}

const adminEmails = new Set(admins.map((a) => a.email.toLowerCase()));
console.log("\nMismatch check:");
for (const u of users) {
  const ok = u.email && adminEmails.has(u.email.toLowerCase());
  console.log(`  ${u.email} — ${ok ? "ON allow-list" : "NOT on allow-list"}`);
}
