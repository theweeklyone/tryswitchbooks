-- Editable site content (wording + show/hide toggles).
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query → paste → Run).
-- Depends on current_user_is_admin() from auth-setup.sql.
--
-- Simple key/value store: each editable field on the site has a stable key
-- (e.g. "home.hero.subtitle" or "home.section.reviews"). The website reads
-- these as overrides on top of the built-in defaults; a missing/blank value
-- means "use the site default".

create table if not exists public.content_block (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.content_block enable row level security;

-- Public visitors read it (the website renders from it).
drop policy if exists "content_block public read" on public.content_block;
create policy "content_block public read"
  on public.content_block for select
  to anon, authenticated
  using (true);

-- Writes go through admin-only RPCs (direct table writes stay blocked).
create or replace function public.set_content_block(p_key text, p_value text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not current_user_is_admin() then
    raise exception 'not authorised';
  end if;
  insert into content_block (key, value, updated_at)
  values (p_key, p_value, now())
  on conflict (key) do update
    set value = excluded.value,
        updated_at = now();
end;
$$;

grant execute on function public.set_content_block(text, text) to authenticated;

-- Clear an override (revert to the site's built-in default).
create or replace function public.delete_content_block(p_key text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not current_user_is_admin() then
    raise exception 'not authorised';
  end if;
  delete from content_block where key = p_key;
end;
$$;

grant execute on function public.delete_content_block(text) to authenticated;
