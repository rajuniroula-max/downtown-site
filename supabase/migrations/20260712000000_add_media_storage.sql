-- 20260712000000_add_media_storage.sql
-- Creates a public Supabase Storage bucket for image uploads
-- and sets RLS policies for public read + admin/editor write.

-- 1. Create the public media bucket
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- 2. Allow anyone to view/download files from the media bucket
create policy "Public read access to media"
  on storage.objects for select
  using (bucket_id = 'media');

-- 3. Allow authenticated admin/editor users to upload files
create policy "Admin/Editor can upload media"
  on storage.objects for insert
  with check (
    bucket_id = 'media'
    and public.is_admin_or_editor(auth.uid())
  );

-- 4. Allow authenticated admin/editor users to update files
create policy "Admin/Editor can update media"
  on storage.objects for update
  using (
    bucket_id = 'media'
    and public.is_admin_or_editor(auth.uid())
  );

-- 5. Allow authenticated admin/editor users to delete files
create policy "Admin/Editor can delete media"
  on storage.objects for delete
  using (
    bucket_id = 'media'
    and public.is_admin_or_editor(auth.uid())
  );
