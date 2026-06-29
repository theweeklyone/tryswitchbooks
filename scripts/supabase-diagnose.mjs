// Pull full leads-table state via the _debug_leads_state RPC.

import { createClient } from "@supabase/supabase-js";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data, error } = await admin.rpc("_debug_leads_state");
if (error) {
  console.error("RPC error:", error);
  process.exit(1);
}

console.log(JSON.stringify(data, null, 2));
