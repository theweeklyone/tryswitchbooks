// Set a password for an admin user directly via the Supabase admin API, so you
// can sign in with email + password and skip the email-link flow entirely
// (useful when an email scanner like Microsoft SafeLinks keeps consuming the
// single-use magic links before you can click them).
//
// Setup (one time):
//   Create a .env.local file in the project root containing:
//     NEXT_PUBLIC_SUPABASE_URL=...        (Supabase -> Project Settings -> API -> Project URL)
//     SUPABASE_SERVICE_ROLE_KEY=...       (Supabase -> Project Settings -> API -> service_role key)
//   .env.local is gitignored, so these secrets are never committed.
//
// Run (pick your own password, min 8 chars):
//   node --env-file=.env.local scripts/set-admin-password.mjs "YourNewPassword123!"
//   node --env-file=.env.local scripts/set-admin-password.mjs "pw" other@person.com

import { createClient } from "@supabase/supabase-js";

const password = process.argv[2];
const email = process.argv[3] ?? "jservante@hotmail.co.uk";

if (!password || password.length < 8) {
  console.error(
    'Usage: node --env-file=.env.local scripts/set-admin-password.mjs "<password, min 8 chars>" [email]',
  );
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing env. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then run with --env-file=.env.local",
  );
  process.exit(1);
}

const admin = createClient(url, key, { auth: { persistSession: false } });

const {
  data: { users },
  error: listErr,
} = await admin.auth.admin.listUsers();
if (listErr) {
  console.error("listUsers failed:", listErr.message);
  process.exit(1);
}

const user = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
if (!user) {
  console.error(`No user found for ${email}. Existing users:`, users.map((u) => u.email));
  process.exit(1);
}

// Set the password AND flag must_change_password so the middleware forces a
// change on first login. Merge with existing metadata so nothing is lost.
const { error } = await admin.auth.admin.updateUserById(user.id, {
  password,
  user_metadata: { ...(user.user_metadata ?? {}), must_change_password: true },
});
if (error) {
  console.error("Failed to set password:", error.message);
  process.exit(1);
}

console.log(
  `\n✅ Password set for ${email}, and they'll be forced to change it on first login.\n   Sign in at https://www.tryswitchbooks.co.uk/sign-in using the password option.\n`,
);
