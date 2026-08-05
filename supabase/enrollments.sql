-- Supabase table schema for Brainy Bunch enrollment submissions

-- Supabase schema: enrollments + admins table + safer RLS policies.
create extension if not exists "pgcrypto";

-- Admins table: store Supabase auth `user_id` (uuid) and optional email
-- Provision admin users by inserting rows into this table (see provisioning note below).
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  email text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  parent_email text not null,
  parent_phone text not null,
  child_name text not null,
  child_grade text not null,
  subject text not null,
  subjects text[] not null default '{}',
  format text not null,
  preferred_time text not null,
  notes text,
  assessment_date date,
  assessment_time text,
  status text not null default 'Pending',
  confirmation_code text not null,
  created_at timestamptz not null default now()
);

alter table public.enrollments enable row level security;

-- Allow anyone (including anon users) to INSERT a new enrollment record.
create policy "allow_public_insert" on public.enrollments
  for insert
  with check (true);

-- Helper expression: check whether current user is listed in `public.admins`.
-- Use this in SELECT/UPDATE/DELETE policies. Also keep a small JWT fallback
-- in case you manage custom JWT claims (optional).

create policy "admins_can_select" on public.enrollments
  for select
  using (
    exists (select 1 from public.admins a where a.user_id = auth.uid())
    or (auth.jwt() ->> 'role' = 'admin')
  );

create policy "admins_can_update" on public.enrollments
  for update
  using (
    exists (select 1 from public.admins a where a.user_id = auth.uid())
    or (auth.jwt() ->> 'role' = 'admin')
  )
  with check (
    exists (select 1 from public.admins a where a.user_id = auth.uid())
    or (auth.jwt() ->> 'role' = 'admin')
  );

create policy "admins_can_delete" on public.enrollments
  for delete
  using (
    exists (select 1 from public.admins a where a.user_id = auth.uid())
    or (auth.jwt() ->> 'role' = 'admin')
  );

-- Admin provisioning notes (run in Supabase SQL editor):
-- 1) Find the user's uid (auth.users) in the Supabase Auth dashboard.
-- 2) Add an admin row (example):
--    insert into public.admins (user_id, email) values ('<user-uuid-here>', 'admin@example.com');
-- Alternatively, store admin emails and match on auth.jwt() ->> 'email' if you prefer.

