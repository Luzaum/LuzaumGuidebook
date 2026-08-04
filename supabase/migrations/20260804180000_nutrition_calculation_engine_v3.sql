-- NutriçãoVET: persistência aditiva para cálculos versionados (v3)
-- NÃO aplicar no remoto nesta fase — apenas migration local para revisão.

create table if not exists public.nutrition_calculation_runs (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid,
  user_id uuid,
  patient_label text,
  calculation_engine_version text not null,
  formula_key text not null,
  source_versions jsonb not null default '[]'::jsonb,
  inputs jsonb not null default '{}'::jsonb,
  raw_result jsonb not null default '{}'::jsonb,
  rounded_result jsonb not null default '{}'::jsonb,
  clinician_override jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.nutrition_patient_assessments (
  id uuid primary key default gen_random_uuid(),
  calculation_run_id uuid references public.nutrition_calculation_runs(id) on delete cascade,
  assessment jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.nutrition_monitoring_events (
  id uuid primary key default gen_random_uuid(),
  calculation_run_id uuid references public.nutrition_calculation_runs(id) on delete set null,
  event jsonb not null,
  measured_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.nutrition_formula_versions (
  id text primary key,
  label text not null,
  source_reference text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.nutrition_calculation_runs enable row level security;
alter table public.nutrition_patient_assessments enable row level security;
alter table public.nutrition_monitoring_events enable row level security;
alter table public.nutrition_formula_versions enable row level security;

comment on table public.nutrition_calculation_runs is 'Auditoria imutável de execuções do motor de cálculo NutriçãoVET v3';
