-- 20260711000000_init.sql: Initial database schema migration with Row Level Security (RLS)

-- 1. Profiles Table (Auth Users Extensions)
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  full_name text,
  created_at timestamp with time zone default now()
);

-- 2. Helper function to check if auth.uid() belongs to an admin or editor profile
create or replace function public.is_admin_or_editor(user_id uuid)
returns boolean
security definer
set search_path = public
language plpgsql
as $$
begin
  return exists (
    select 1 from public.profiles
    where id = user_id and role in ('admin', 'editor')
  );
end;
$$;

-- 3. Site Settings Singleton Configuration Table
create table public.site_settings (
  key text primary key,
  value jsonb not null
);

-- 4. Study Destinations
create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  country text not null,
  flag_icon text not null,
  universities_count text not null,
  badge text not null,
  tagline text not null,
  hero_image text not null,
  why_study_text text not null,
  why_study_points text[] not null default '{}',
  cost_of_living jsonb not null,
  visa_requirements jsonb not null,
  popular_courses text[] not null default '{}',
  published boolean not null default true,
  order_index integer not null default 0
);

-- 5. Partner Universities
create table public.universities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country text not null,
  city text not null,
  logo text not null,
  about_text text not null,
  courses_offered text[] not null default '{}',
  admission_requirements text[] not null default '{}',
  gallery_images text[] not null default '{}',
  is_featured boolean not null default false,
  published boolean not null default true
);

-- 6. Core Services
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_desc text not null,
  detailed_content text not null,
  icon_name text not null,
  process_steps text[] not null default '{}',
  published boolean not null default true,
  order_index integer not null default 0
);

-- 7. Test Preparation Programs
create table public.test_prep_programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text not null,
  overview text not null,
  syllabus_points text[] not null default '{}',
  duration text not null,
  pricing text not null,
  class_schedule jsonb not null,
  faq jsonb not null,
  published boolean not null default true
);

-- 8. Team Members
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  image text not null,
  order_index integer not null default 0,
  published boolean not null default true
);

-- 9. Branch Offices
create table public.branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  phone text not null,
  email text not null,
  map_iframe text not null,
  order_index integer not null default 0
);

-- 10. Student Testimonials
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  destination text not null,
  initials text not null,
  quote text not null,
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  published boolean not null default true,
  featured boolean not null default false
);

-- 11. Blog Posts
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  date text not null,
  author text not null,
  read_time text not null,
  published boolean not null default true,
  published_at timestamp with time zone not null default now()
);

-- 12. Lead Capture Inquiries
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  source_page text not null,
  destination_interest text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'resolved')),
  created_at timestamp with time zone not null default now()
);

-- ==========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.destinations enable row level security;
alter table public.universities enable row level security;
alter table public.services enable row level security;
alter table public.test_prep_programs enable row level security;
alter table public.team_members enable row level security;
alter table public.branches enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.inquiries enable row level security;

-- A. Profiles Policies
create policy "Allow user select own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Allow user update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Allow admin full profile control" on public.profiles
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- B. Site Settings Policies
create policy "Allow public select settings" on public.site_settings
  for select using (true);
create policy "Allow admin/editor edit settings" on public.site_settings
  for all using (public.is_admin_or_editor(auth.uid()));

-- C. Destinations Policies
create policy "Allow public select published destinations" on public.destinations
  for select using (published = true or public.is_admin_or_editor(auth.uid()));
create policy "Allow admin/editor edit destinations" on public.destinations
  for all using (public.is_admin_or_editor(auth.uid()));

-- D. Universities Policies
create policy "Allow public select published universities" on public.universities
  for select using (published = true or public.is_admin_or_editor(auth.uid()));
create policy "Allow admin/editor edit universities" on public.universities
  for all using (public.is_admin_or_editor(auth.uid()));

-- E. Services Policies
create policy "Allow public select published services" on public.services
  for select using (published = true or public.is_admin_or_editor(auth.uid()));
create policy "Allow admin/editor edit services" on public.services
  for all using (public.is_admin_or_editor(auth.uid()));

-- F. Test Prep Programs Policies
create policy "Allow public select published programs" on public.test_prep_programs
  for select using (published = true or public.is_admin_or_editor(auth.uid()));
create policy "Allow admin/editor edit programs" on public.test_prep_programs
  for all using (public.is_admin_or_editor(auth.uid()));

-- G. Team Members Policies
create policy "Allow public select published team members" on public.team_members
  for select using (published = true or public.is_admin_or_editor(auth.uid()));
create policy "Allow admin/editor edit team members" on public.team_members
  for all using (public.is_admin_or_editor(auth.uid()));

-- H. Branches Policies (Always Public)
create policy "Allow public select branches" on public.branches
  for select using (true);
create policy "Allow admin/editor edit branches" on public.branches
  for all using (public.is_admin_or_editor(auth.uid()));

-- I. Testimonials Policies
create policy "Allow public select published testimonials" on public.testimonials
  for select using (published = true or public.is_admin_or_editor(auth.uid()));
create policy "Allow admin/editor edit testimonials" on public.testimonials
  for all using (public.is_admin_or_editor(auth.uid()));

-- J. Blog Posts Policies
create policy "Allow public select published blog posts" on public.blog_posts
  for select using (published = true or public.is_admin_or_editor(auth.uid()));
create policy "Allow admin/editor edit blog posts" on public.blog_posts
  for all using (public.is_admin_or_editor(auth.uid()));

-- K. Inquiries Policies (Public Insert, Admin/Editor Read & Update)
create policy "Allow public insert inquiries" on public.inquiries
  for insert with check (true);
create policy "Allow admin/editor view inquiries" on public.inquiries
  for all using (public.is_admin_or_editor(auth.uid()));
