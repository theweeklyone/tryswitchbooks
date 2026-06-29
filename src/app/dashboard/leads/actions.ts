"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  LeadNote,
  LeadPriority,
  LeadStatus,
} from "@/lib/types/lead";

export type ActionResult = { ok: true } | { ok: false; error: string };

type Patch = {
  status?: LeadStatus;
  priority?: LeadPriority;
  assigned_to?: string | null;
  last_contacted_at?: string | null;
  next_follow_up_at?: string | null;
  booked_value?: number | null;
  internal_notes?: LeadNote[];
};

async function getActorEmail() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Middleware enforces auth; if we somehow got here without a user, fail loudly.
  if (!user) throw new Error("Not authenticated");
  return user.email ?? "unknown";
}

async function applyLeadUpdate(
  leadId: string,
  patch: Patch,
  note?: LeadNote,
): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    const update: Patch = { ...patch };

    // Append a note to the jsonb array via read-modify-write.
    if (note) {
      const { data: existing } = await supabase
        .from("leads")
        .select("internal_notes")
        .eq("id", leadId)
        .single();
      const notes = (existing?.internal_notes as LeadNote[] | null) ?? [];
      update.internal_notes = [...notes, note];
    }

    const { error } = await supabase.from("leads").update(update).eq("id", leadId);
    if (error) {
      console.error("[applyLeadUpdate]", error);
      return { ok: false, error: error.message };
    }
    revalidatePath("/dashboard/leads");
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[applyLeadUpdate] threw", err);
    return { ok: false, error: message };
  }
}

function makeNoteId() {
  return `n_${crypto.randomUUID()}`;
}

export async function updateLeadStatus(
  leadId: string,
  fromStatus: LeadStatus,
  toStatus: LeadStatus,
): Promise<ActionResult> {
  if (fromStatus === toStatus) return { ok: true };
  const actor = await getActorEmail();
  const note: LeadNote = {
    id: makeNoteId(),
    createdAt: new Date().toISOString(),
    createdBy: actor,
    content: `Status changed to ${toStatus}.`,
    statusChange: { from: fromStatus, to: toStatus },
  };
  return applyLeadUpdate(
    leadId,
    { status: toStatus, last_contacted_at: new Date().toISOString() },
    note,
  );
}

export async function updateLeadPriority(
  leadId: string,
  priority: LeadPriority,
): Promise<ActionResult> {
  return applyLeadUpdate(leadId, { priority });
}

export async function assignLead(
  leadId: string,
  assignee: string | null,
): Promise<ActionResult> {
  return applyLeadUpdate(leadId, { assigned_to: assignee });
}

export async function updateLeadFollowUp(
  leadId: string,
  dateIso: string | null,
): Promise<ActionResult> {
  return applyLeadUpdate(leadId, { next_follow_up_at: dateIso });
}

export async function updateLeadBookedValue(
  leadId: string,
  value: number | null,
): Promise<ActionResult> {
  return applyLeadUpdate(leadId, { booked_value: value });
}

export async function addLeadNote(
  leadId: string,
  content: string,
): Promise<ActionResult> {
  const actor = await getActorEmail();
  const note: LeadNote = {
    id: makeNoteId(),
    createdAt: new Date().toISOString(),
    createdBy: actor,
    content,
  };
  return applyLeadUpdate(leadId, {}, note);
}
