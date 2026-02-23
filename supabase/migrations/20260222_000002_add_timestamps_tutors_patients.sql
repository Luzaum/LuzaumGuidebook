-- Add created_at and updated_at to tutors and patients
-- Enable automatic updated_at timestamping

alter table public.tutors
add column if not exists created_at timestamptz not null default now(),
add column if not exists updated_at timestamptz not null default now();

alter table public.patients
add column if not exists created_at timestamptz not null default now(),
add column if not exists updated_at timestamptz not null default now();

-- Trigger function for updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for tutors
drop trigger if exists trg_tutors_set_updated_at on public.tutors;
create trigger trg_tutors_set_updated_at
before update on public.tutors
for each row execute function public.set_updated_at();

-- Trigger for patients
drop trigger if exists trg_patients_set_updated_at on public.patients;
create trigger trg_patients_set_updated_at
before update on public.patients
for each row execute function public.set_updated_at();
