-- Switch Books — leads table for the free Business Review.
-- Run this in the Supabase SQL editor once your project exists. The quiz
-- (app/consultation/actions.ts) inserts into this table with the service-role
-- key, and the dashboard (lib/leads/queries.ts, lib/supabase/transform.ts)
-- reads from it.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Contact
  first_name text not null,
  business_name text,
  email text not null,
  mobile text,

  -- Their situation
  business_type text,
  current_situation text,         -- accountant | diy | in-house | none
  satisfaction text,              -- happy-exploring | frustrated | leaving | unsure
  frustrations text[] default '{}',
  current_provider text,          -- who they're with now (sensitive)
  current_spend text,             -- band

  -- What they want
  services_wanted text[] default '{}',
  primary_need text,
  turnover text,
  budget_range text,
  timeline text,
  extra_notes text,

  -- Recommendation snapshot
  recommended_service text,
  recommended_service_slug text,
  secondary_recommendation text,

  -- Lead management
  source text not null default 'review-quiz',
  status text not null default 'new',  -- new | contacted | call-booked | proposal-sent | won | lost | nurture
  assigned_to text,
  estimated_lead_value integer default 0,
  priority text default 'warm',        -- hot | warm | cool
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz
);

-- Row Level Security: lock the table down. The quiz uses the service-role key
-- (which bypasses RLS), and the dashboard reads via an authenticated session.
alter table public.leads enable row level security;

-- Allow authenticated dashboard users to read/update leads.
drop policy if exists "authenticated can read leads" on public.leads;
create policy "authenticated can read leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "authenticated can update leads" on public.leads;
create policy "authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true);

-- Inserts come from the server using the service-role key, which bypasses RLS,
-- so no public insert policy is needed (and none should exist).

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- Contact-form messages (separate from review leads).
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text,
  email text not null,
  phone text,
  service text,
  message text not null
);

alter table public.contact_messages enable row level security;

drop policy if exists "authenticated can read contact messages" on public.contact_messages;
create policy "authenticated can read contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);
-- Inserts come from the server (service-role key), which bypasses RLS.
