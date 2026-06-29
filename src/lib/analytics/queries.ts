import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/types/lead";

// Real enquiry analytics, aggregated from the live leads + contact_messages
// tables (read-only). Website traffic (visits, sources, page views) lives in
// Google Analytics and is not included here.

export type Segment = { label: string; value: number };

export type EnquiryStats = {
  total: number;
  last7: number;
  newCount: number;
  appointmentsBooked: number;
  notBooked: number;
  bookedValueTotal: number;
  messagesCount: number;
  conversionRate: number | null;
  bySource: Segment[];
  byStatus: Segment[];
  byPriority: Segment[];
  byService: Segment[];
  trend: { month: string; value: number }[];
};

type Row = {
  created_at: string;
  status: LeadStatus;
  source: string | null;
  priority: string | null;
  recommended_service: string | null;
  booked_value: number | null;
};

const SOURCE_LABELS: Record<string, string> = {
  "consultation-quiz": "Consultation quiz",
  "contact-form": "Contact form",
  phone: "Phone",
  "walk-in": "Walk-in",
};

const PRIORITY_LABELS: Record<string, string> = {
  hot: "Hot",
  warm: "Warm",
  cool: "Cool",
};

function tally(values: (string | null | undefined)[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    m.set(v, (m.get(v) ?? 0) + 1);
  }
  return m;
}

export async function fetchEnquiryStats(): Promise<EnquiryStats> {
  const supabase = createSupabaseAdminClient();

  const [{ data: leadData }, { count: messagesCount }] = await Promise.all([
    supabase
      .from("leads")
      .select("created_at,status,source,priority,recommended_service,booked_value"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
  ]);

  const rows = (leadData ?? []) as Row[];
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const total = rows.length;
  const last7 = rows.filter((r) => now - new Date(r.created_at).getTime() <= 7 * DAY).length;
  const newCount = rows.filter((r) => r.status === "new").length;
  const appointmentsBooked = rows.filter((r) => r.status === "won").length;
  const notBooked = rows.filter((r) => r.status === "lost").length;
  const bookedValueTotal = rows.reduce((sum, r) => sum + (r.booked_value ?? 0), 0);
  const decided = appointmentsBooked + notBooked;
  const conversionRate = decided > 0 ? Math.round((appointmentsBooked / decided) * 100) : null;

  const toSegments = (m: Map<string, number>, labels?: Record<string, string>) =>
    [...m.entries()]
      .map(([k, value]) => ({ label: labels?.[k] ?? k, value }))
      .sort((a, b) => b.value - a.value);

  const bySource = toSegments(tally(rows.map((r) => r.source)), SOURCE_LABELS);
  const byStatus = toSegments(
    tally(rows.map((r) => r.status)),
    LEAD_STATUS_LABELS as Record<string, string>,
  );
  const byPriority = toSegments(tally(rows.map((r) => r.priority)), PRIORITY_LABELS);
  const byService = toSegments(tally(rows.map((r) => r.recommended_service))).slice(0, 6);

  // Last 14 days, one bucket per day.
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const trend: { month: string; value: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const dayStart = new Date(startOfToday.getTime() - i * DAY);
    const dayEnd = new Date(dayStart.getTime() + DAY);
    const value = rows.filter((r) => {
      const c = new Date(r.created_at).getTime();
      return c >= dayStart.getTime() && c < dayEnd.getTime();
    }).length;
    trend.push({
      month: dayStart.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      value,
    });
  }

  return {
    total,
    last7,
    newCount,
    appointmentsBooked,
    notBooked,
    bookedValueTotal,
    messagesCount: messagesCount ?? 0,
    conversionRate,
    bySource,
    byStatus,
    byPriority,
    byService,
    trend,
  };
}
