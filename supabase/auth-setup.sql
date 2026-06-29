-- Phase 4: staff auth gate.
-- Run once in Supabase SQL editor.

create table if not exists allowed_admins (
  email text primary key,
  added_at timestamptz not null default now(),
  added_by text
);

-- Seed the first admin. Add more later via SQL editor:
--   insert into allowed_admins (email) values ('newperson@example.com');
insert into allowed_admins (email)
values ('jservante@hotmail.co.uk')
on conflict (email) do nothing;

-- Function used by middleware to gate /dashboard/* routes.
-- Reads the JWT email claim, checks membership. Bypasses RLS via SECURITY DEFINER.
create or replace function current_user_is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists(
    select 1 from allowed_admins
    where email = (
      coalesce(
        nullif(current_setting('request.jwt.claim.email', true), ''),
        current_setting('request.jwt.claims', true)::jsonb ->> 'email'
      )
    )
  );
$$;

grant execute on function current_user_is_admin() to anon, authenticated;
