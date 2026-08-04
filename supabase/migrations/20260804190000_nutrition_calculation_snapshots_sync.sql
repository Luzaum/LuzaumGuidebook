-- NutriçãoVET: snapshots imutáveis versionados para sync offline-first (v3)
-- Migration aditiva — NÃO aplicar no remoto nesta fase.

create table if not exists public.nutrition_calculation_snapshots (
  id uuid primary key,
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete restrict,
  patient_external_id text null,
  species text not null check (species in ('dog', 'cat')),
  patient_name text null,
  calculation_type text not null default 'outpatient',
  status text not null default 'finalized' check (status in ('draft', 'finalized', 'superseded')),
  prescribed_kcal_day numeric null,
  current_weight_kg numeric null,
  target_weight_kg numeric null,
  bcs_9 integer null check (bcs_9 is null or (bcs_9 >= 1 and bcs_9 <= 9)),
  muscle_condition text null,
  snapshot_json jsonb not null,
  snapshot_checksum text not null,
  parent_calculation_id uuid null references public.nutrition_calculation_snapshots(id) on delete set null,
  revision_number integer not null default 1,
  revision_reason text null,
  report_id uuid null,
  created_at timestamptz not null default now(),
  finalized_at timestamptz null,
  deleted_at timestamptz null
);

create unique index if not exists nutrition_calculation_snapshots_checksum_clinic_uidx
  on public.nutrition_calculation_snapshots (clinic_id, snapshot_checksum)
  where deleted_at is null;

create index if not exists idx_nutrition_calculation_snapshots_clinic_created
  on public.nutrition_calculation_snapshots (clinic_id, created_at desc);

create index if not exists idx_nutrition_calculation_snapshots_report
  on public.nutrition_calculation_snapshots (report_id)
  where report_id is not null;

create table if not exists public.nutrition_calculation_inputs (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null references public.nutrition_calculation_snapshots(id) on delete cascade,
  inputs_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.nutrition_calculation_outputs (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null references public.nutrition_calculation_snapshots(id) on delete cascade,
  outputs_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.nutrition_clinician_overrides (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null references public.nutrition_calculation_snapshots(id) on delete cascade,
  override_json jsonb not null default '{}'::jsonb,
  reason text null,
  created_at timestamptz not null default now()
);

create table if not exists public.nutrition_data_quality_issues (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null references public.nutrition_calculation_snapshots(id) on delete cascade,
  issue_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.nutrition_calculation_snapshots enable row level security;
alter table public.nutrition_calculation_inputs enable row level security;
alter table public.nutrition_calculation_outputs enable row level security;
alter table public.nutrition_clinician_overrides enable row level security;
alter table public.nutrition_data_quality_issues enable row level security;

drop policy if exists nutrition_calculation_snapshots_select on public.nutrition_calculation_snapshots;
create policy nutrition_calculation_snapshots_select
on public.nutrition_calculation_snapshots for select to authenticated
using (public.is_member_of_clinic(clinic_id) and deleted_at is null);

drop policy if exists nutrition_calculation_snapshots_insert on public.nutrition_calculation_snapshots;
create policy nutrition_calculation_snapshots_insert
on public.nutrition_calculation_snapshots for insert to authenticated
with check (public.is_member_of_clinic(clinic_id) and created_by = auth.uid());

drop policy if exists nutrition_calculation_snapshots_update_draft on public.nutrition_calculation_snapshots;
create policy nutrition_calculation_snapshots_update_draft
on public.nutrition_calculation_snapshots for update to authenticated
using (public.is_member_of_clinic(clinic_id) and status = 'draft')
with check (public.is_member_of_clinic(clinic_id));

drop policy if exists nutrition_calculation_snapshots_soft_delete on public.nutrition_calculation_snapshots;
create policy nutrition_calculation_snapshots_soft_delete
on public.nutrition_calculation_snapshots for update to authenticated
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));

drop policy if exists nutrition_calculation_inputs_select on public.nutrition_calculation_inputs;
create policy nutrition_calculation_inputs_select
on public.nutrition_calculation_inputs for select to authenticated
using (
  exists (
    select 1 from public.nutrition_calculation_snapshots s
    where s.id = snapshot_id and public.is_member_of_clinic(s.clinic_id) and s.deleted_at is null
  )
);

drop policy if exists nutrition_calculation_inputs_insert on public.nutrition_calculation_inputs;
create policy nutrition_calculation_inputs_insert
on public.nutrition_calculation_inputs for insert to authenticated
with check (
  exists (
    select 1 from public.nutrition_calculation_snapshots s
    where s.id = snapshot_id and public.is_member_of_clinic(s.clinic_id) and s.created_by = auth.uid()
  )
);

drop policy if exists nutrition_calculation_outputs_select on public.nutrition_calculation_outputs;
create policy nutrition_calculation_outputs_select
on public.nutrition_calculation_outputs for select to authenticated
using (
  exists (
    select 1 from public.nutrition_calculation_snapshots s
    where s.id = snapshot_id and public.is_member_of_clinic(s.clinic_id) and s.deleted_at is null
  )
);

drop policy if exists nutrition_calculation_outputs_insert on public.nutrition_calculation_outputs;
create policy nutrition_calculation_outputs_insert
on public.nutrition_calculation_outputs for insert to authenticated
with check (
  exists (
    select 1 from public.nutrition_calculation_snapshots s
    where s.id = snapshot_id and public.is_member_of_clinic(s.clinic_id) and s.created_by = auth.uid()
  )
);

comment on table public.nutrition_calculation_snapshots is 'Snapshots imutáveis NutriçãoVET v3 — sync offline-first';
