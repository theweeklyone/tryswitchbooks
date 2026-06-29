import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// Contact-form messages live in the `contact_messages` table (separate from the
// consultation `leads`). The dashboard reads them here via the service-role
// client, which bypasses RLS, the same pattern as fetchLeads().

export type ContactMessage = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
};

type ContactMessageRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
};

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fetchContactMessages]", error);
    return [];
  }

  return (data as ContactMessageRow[]).map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    name: r.name,
    email: r.email,
    phone: r.phone,
    service: r.service,
    message: r.message,
    status: r.status,
  }));
}
