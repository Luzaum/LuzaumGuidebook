create table if not exists public.nutrition_reports (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  created_by_user_id uuid not null references auth.users(id) on delete restrict,
  patient_id uuid null references public.patients(id) on delete set null,
  patient_key text not null,
  source_report_id text null,
  patient_snapshot_json jsonb not null default '{}'::jsonb,
  report_payload_json jsonb not null,
  energy_payload_json jsonb not null default '{}'::jsonb,
  formulation_payload_json jsonb not null default '{}'::jsonb,
  programmed_feeding_payload_json jsonb null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists nutrition_reports_source_report_id_key
  on public.nutrition_reports (source_report_id)
  where source_report_id is not null;

create index if not exists idx_nutrition_reports_clinic_created_at
  on public.nutrition_reports (clinic_id, created_at desc);

create index if not exists idx_nutrition_reports_patient_key
  on public.nutrition_reports (clinic_id, patient_key);

alter table public.nutrition_reports enable row level security;

drop policy if exists nutrition_reports_select on public.nutrition_reports;
create policy nutrition_reports_select
on public.nutrition_reports
for select
to authenticated
using (public.is_member_of_clinic(clinic_id));

drop policy if exists nutrition_reports_insert on public.nutrition_reports;
create policy nutrition_reports_insert
on public.nutrition_reports
for insert
to authenticated
with check (
  public.is_member_of_clinic(clinic_id)
  and created_by_user_id = auth.uid()
);

drop policy if exists nutrition_reports_update on public.nutrition_reports;
create policy nutrition_reports_update
on public.nutrition_reports
for update
to authenticated
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));

drop policy if exists nutrition_reports_delete on public.nutrition_reports;
create policy nutrition_reports_delete
on public.nutrition_reports
for delete
to authenticated
using (public.is_member_of_clinic(clinic_id));

create or replace function public.set_nutrition_reports_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists tr_nutrition_reports_updated_at on public.nutrition_reports;
create trigger tr_nutrition_reports_updated_at
before update on public.nutrition_reports
for each row
execute function public.set_nutrition_reports_updated_at();
