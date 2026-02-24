-- Add created_at and updated_at to tutors and patients (safe)
-- Enable automatic updated_at timestamping
-- This migration must be replay-safe in shadow DBs where tables may be created later.

do $$
begin
  -- tutors
  if to_regclass('public.tutors') is not null then
    alter table public.tutors
      add column if not exists created_at timestamptz not null default now(),
      add column if not exists updated_at timestamptz not null default now();
  end if;

  -- patients
  if to_regclass('public.patients') is not null then
    alter table public.patients
      add column if not exists created_at timestamptz not null default now(),
      add column if not exists updated_at timestamptz not null default now();
  end if;
end
$$;