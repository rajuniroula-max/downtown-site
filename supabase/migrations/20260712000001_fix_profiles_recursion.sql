-- 20260712000001_fix_profiles_recursion.sql
-- Fixes infinite recursion on the profiles policy by using the
-- security definer helper function public.is_admin_or_editor(auth.uid())

drop policy if exists "Allow admin full profile control" on public.profiles;

create policy "Allow admin full profile control" on public.profiles
  for all using (public.is_admin_or_editor(auth.uid()));
