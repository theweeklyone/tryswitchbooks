-- Dashboard-managed site images (Images editor).
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query → paste → Run).
-- Depends on current_user_is_admin() from auth-setup.sql.
--
-- The uploaded image URLs are stored in the existing content_block table
-- (see content.sql), keyed by "image.*". This file only creates the public
-- Storage bucket the images live in, with admin-only write access.

-- Public storage bucket for swappable site images.
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "site-images public read" on storage.objects;
create policy "site-images public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-images');

drop policy if exists "site-images admin insert" on storage.objects;
create policy "site-images admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images' and current_user_is_admin());

drop policy if exists "site-images admin update" on storage.objects;
create policy "site-images admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images' and current_user_is_admin());

drop policy if exists "site-images admin delete" on storage.objects;
create policy "site-images admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images' and current_user_is_admin());
