-- NutriçãoVET Catalog V2 — schema aditivo
-- Rollback documentado: dropar tabelas na ordem inversa de dependência (ver final).
-- NÃO altera nutrition_reports nem dados GENUTRI legados no bundle.

-- Fabricantes
create table if not exists public.nutrition_manufacturers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  official_url text,
  license_status text not null default 'unknown',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Releases do catálogo
create table if not exists public.nutrition_catalog_releases (
  id uuid primary key default gen_random_uuid(),
  release_key text not null unique,
  source_type text not null,
  source_version text,
  imported_at timestamptz not null default now(),
  published_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

-- Alimentos principais
create table if not exists public.nutrition_foods (
  id uuid primary key default gen_random_uuid(),
  legacy_food_id text,
  scope text not null default 'global' check (scope in ('global', 'clinic')),
  clinic_id uuid references public.clinics(id) on delete cascade,
  food_kind text not null default 'legacy_genutri',
  canonical_name_pt text not null,
  canonical_name_en text,
  species_compatibility text[] not null default '{}',
  manufacturer_id uuid references public.nutrition_manufacturers(id) on delete set null,
  brand text,
  product_line text,
  commercial_name text,
  food_category text,
  form text,
  preparation_method text,
  completeness_class text not null default 'unknown',
  country text,
  market_status text not null default 'unknown',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint nutrition_foods_clinic_scope check (
    (scope = 'global' and clinic_id is null) or (scope = 'clinic' and clinic_id is not null)
  )
);

create index if not exists idx_nutrition_foods_scope_clinic on public.nutrition_foods (scope, clinic_id);
create index if not exists idx_nutrition_foods_legacy_id on public.nutrition_foods (legacy_food_id) where legacy_food_id is not null;

-- Versões de composição
create table if not exists public.nutrition_food_versions (
  id uuid primary key default gen_random_uuid(),
  food_id uuid not null references public.nutrition_foods(id) on delete cascade,
  version integer not null,
  valid_from timestamptz not null default now(),
  valid_to timestamptz,
  source_type text not null,
  source_name text,
  source_reference text,
  source_version text,
  source_document_date date,
  imported_at timestamptz not null default now(),
  verified_at timestamptz,
  verified_by uuid references auth.users(id) on delete set null,
  license_status text not null default 'unknown',
  quality_grade text not null default 'E' check (quality_grade in ('A', 'B', 'C', 'D', 'E')),
  raw_data_hash text,
  notes text,
  created_at timestamptz not null default now(),
  unique (food_id, version)
);

-- Definições canônicas de nutrientes
create table if not exists public.nutrition_nutrient_definitions (
  id text primary key,
  label_pt text not null,
  label_en text,
  default_unit text,
  created_at timestamptz not null default now()
);

-- Observações nutricionais por versão
create table if not exists public.nutrition_food_nutrients (
  id uuid primary key default gen_random_uuid(),
  food_version_id uuid not null references public.nutrition_food_versions(id) on delete cascade,
  nutrient_definition_id text not null references public.nutrition_nutrient_definitions(id) on delete restrict,
  original_value numeric,
  original_unit text,
  normalized_value numeric,
  normalized_unit text not null,
  basis text not null,
  value_kind text not null default 'unknown',
  method text,
  derivation text,
  source_reference text,
  missing_reason text,
  confidence numeric,
  created_at timestamptz not null default now()
);

create index if not exists idx_nutrition_food_nutrients_version on public.nutrition_food_nutrients (food_version_id);

-- Porções / medidas
create table if not exists public.nutrition_food_portions (
  id uuid primary key default gen_random_uuid(),
  food_version_id uuid not null references public.nutrition_food_versions(id) on delete cascade,
  portion_label text not null,
  grams numeric,
  ml numeric,
  household_measure text,
  household_measure_grams numeric,
  edible_portion_fraction numeric,
  cooking_yield numeric,
  density_g_ml numeric,
  created_at timestamptz not null default now()
);

-- Variantes comerciais (apresentações)
create table if not exists public.nutrition_product_variants (
  id uuid primary key default gen_random_uuid(),
  food_id uuid not null references public.nutrition_foods(id) on delete cascade,
  variant_name text not null,
  package_size numeric,
  package_unit text,
  form text,
  flavor text,
  ean text,
  sku text,
  country text,
  market_status text not null default 'unknown',
  mapa_status text not null default 'unknown',
  mapa_reference text,
  mapa_checked_at timestamptz,
  market_checked_at timestamptz,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Mídia de produto
create table if not exists public.nutrition_product_media (
  id uuid primary key default gen_random_uuid(),
  product_variant_id uuid not null references public.nutrition_product_variants(id) on delete cascade,
  asset_path text,
  original_source text,
  source_type text,
  rights_status text not null default 'pending_review' check (
    rights_status in ('authorized', 'manufacturer_provided', 'licensed', 'external_reference_only', 'pending_review', 'blocked')
  ),
  permission_reference text,
  captured_at timestamptz,
  verified_at timestamptz,
  alt_text text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

-- Fontes de evidência
create table if not exists public.nutrition_evidence_sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text,
  year integer,
  edition text,
  chapter text,
  pages text,
  table_ref text,
  doi text,
  official_url text,
  source_type text not null,
  license_status text not null default 'unknown',
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Perfis terapêuticos
create table if not exists public.nutrition_therapeutic_profiles (
  id text primary key,
  name_pt text not null,
  species text not null,
  clinical_context text not null,
  inclusion_criteria text,
  nutritional_goals jsonb not null default '{}'::jsonb,
  desired_characteristics jsonb not null default '{}'::jsonb,
  hard_contraindications jsonb not null default '[]'::jsonb,
  relative_cautions jsonb not null default '[]'::jsonb,
  monitoring text,
  follow_up_interval text,
  evidence_level text,
  rule_set_version text not null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nutrition_food_therapeutic_links (
  id uuid primary key default gen_random_uuid(),
  food_id uuid not null references public.nutrition_foods(id) on delete cascade,
  therapeutic_profile_id text not null references public.nutrition_therapeutic_profiles(id) on delete cascade,
  link_type text not null check (link_type in ('manufacturer_claim', 'independent_assessment')),
  notes text,
  created_at timestamptz not null default now(),
  unique (food_id, therapeutic_profile_id, link_type)
);

-- Regras clínicas
create table if not exists public.nutrition_clinical_rules (
  id uuid primary key default gen_random_uuid(),
  rule_key text not null unique,
  therapeutic_profile_id text references public.nutrition_therapeutic_profiles(id) on delete set null,
  species text,
  rule_expression jsonb not null default '{}'::jsonb,
  outcome text not null,
  rule_set_version text not null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.nutrition_clinical_rule_evidence (
  id uuid primary key default gen_random_uuid(),
  clinical_rule_id uuid not null references public.nutrition_clinical_rules(id) on delete cascade,
  evidence_source_id uuid not null references public.nutrition_evidence_sources(id) on delete cascade,
  unique (clinical_rule_id, evidence_source_id)
);

-- Segurança de ingredientes
create table if not exists public.nutrition_food_safety_rules (
  id uuid primary key default gen_random_uuid(),
  species text not null,
  food_id uuid references public.nutrition_foods(id) on delete cascade,
  hazard_type text not null,
  severity text not null,
  minimum_risk_context text,
  clinical_effect text,
  recommendation text,
  source_id uuid references public.nutrition_evidence_sources(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Importações e qualidade
create table if not exists public.nutrition_import_jobs (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_version text,
  file_name text,
  status text not null default 'pending',
  accepted_count integer not null default 0,
  rejected_count integer not null default 0,
  warnings jsonb not null default '[]'::jsonb,
  raw_hash text,
  initiated_by uuid references auth.users(id) on delete set null,
  catalog_release_id uuid references public.nutrition_catalog_releases(id) on delete set null,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.nutrition_data_quality_issues (
  id uuid primary key default gen_random_uuid(),
  food_id uuid references public.nutrition_foods(id) on delete cascade,
  food_version_id uuid references public.nutrition_food_versions(id) on delete cascade,
  issue_type text not null,
  severity text not null default 'warning',
  message text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.nutrition_foods enable row level security;
alter table public.nutrition_food_versions enable row level security;
alter table public.nutrition_food_nutrients enable row level security;
alter table public.nutrition_product_variants enable row level security;
alter table public.nutrition_manufacturers enable row level security;
alter table public.nutrition_nutrient_definitions enable row level security;
alter table public.nutrition_therapeutic_profiles enable row level security;
alter table public.nutrition_evidence_sources enable row level security;

-- Leitura: alimentos globais para autenticados; clínica somente membros
drop policy if exists nutrition_foods_select on public.nutrition_foods;
create policy nutrition_foods_select on public.nutrition_foods
for select to authenticated
using (
  scope = 'global'
  or (scope = 'clinic' and public.is_member_of_clinic(clinic_id))
);

-- Escrita clínica: membros da clínica em alimentos clinic
drop policy if exists nutrition_foods_insert_clinic on public.nutrition_foods;
create policy nutrition_foods_insert_clinic on public.nutrition_foods
for insert to authenticated
with check (
  scope = 'clinic'
  and clinic_id is not null
  and public.is_member_of_clinic(clinic_id)
);

drop policy if exists nutrition_foods_update_clinic on public.nutrition_foods;
create policy nutrition_foods_update_clinic on public.nutrition_foods
for update to authenticated
using (scope = 'clinic' and public.is_member_of_clinic(clinic_id))
with check (scope = 'clinic' and public.is_member_of_clinic(clinic_id));

-- Definições de nutrientes e perfis terapêuticos: leitura autenticada
drop policy if exists nutrition_nutrient_definitions_select on public.nutrition_nutrient_definitions;
create policy nutrition_nutrient_definitions_select on public.nutrition_nutrient_definitions
for select to authenticated using (true);

drop policy if exists nutrition_therapeutic_profiles_select on public.nutrition_therapeutic_profiles;
create policy nutrition_therapeutic_profiles_select on public.nutrition_therapeutic_profiles
for select to authenticated using (true);

drop policy if exists nutrition_evidence_sources_select on public.nutrition_evidence_sources;
create policy nutrition_evidence_sources_select on public.nutrition_evidence_sources
for select to authenticated using (true);

-- Versões/nutrientes: seguem visibilidade do alimento pai
drop policy if exists nutrition_food_versions_select on public.nutrition_food_versions;
create policy nutrition_food_versions_select on public.nutrition_food_versions
for select to authenticated
using (
  exists (
    select 1 from public.nutrition_foods f
    where f.id = food_id
      and (f.scope = 'global' or public.is_member_of_clinic(f.clinic_id))
  )
);

drop policy if exists nutrition_food_nutrients_select on public.nutrition_food_nutrients;
create policy nutrition_food_nutrients_select on public.nutrition_food_nutrients
for select to authenticated
using (
  exists (
    select 1
    from public.nutrition_food_versions v
    join public.nutrition_foods f on f.id = v.food_id
    where v.id = food_version_id
      and (f.scope = 'global' or public.is_member_of_clinic(f.clinic_id))
  )
);

-- Seed mínimo de nutrientes canônicos (69 mapeados incrementalmente)
insert into public.nutrition_nutrient_definitions (id, label_pt, default_unit)
values
  ('energy_kcal', 'Energia metabolizável', 'kcal/100g'),
  ('moisture', 'Umidade', '%'),
  ('dry_matter', 'Matéria seca', '%'),
  ('crude_protein', 'Proteína bruta', '%'),
  ('crude_fat', 'Extrato etéreo', '%'),
  ('crude_fiber', 'Fibra bruta', '%'),
  ('ash', 'Matéria mineral', '%'),
  ('calcium', 'Cálcio', '%'),
  ('phosphorus', 'Fósforo', '%'),
  ('sodium', 'Sódio', '%'),
  ('potassium', 'Potássio', '%'),
  ('taurine', 'Taurina', '%')
on conflict (id) do nothing;

-- ROLLBACK (executar manualmente se necessário):
-- drop table if exists public.nutrition_data_quality_issues cascade;
-- drop table if exists public.nutrition_import_jobs cascade;
-- drop table if exists public.nutrition_clinical_rule_evidence cascade;
-- drop table if exists public.nutrition_clinical_rules cascade;
-- drop table if exists public.nutrition_food_therapeutic_links cascade;
-- drop table if exists public.nutrition_food_safety_rules cascade;
-- drop table if exists public.nutrition_product_media cascade;
-- drop table if exists public.nutrition_product_variants cascade;
-- drop table if exists public.nutrition_food_portions cascade;
-- drop table if exists public.nutrition_food_nutrients cascade;
-- drop table if exists public.nutrition_food_versions cascade;
-- drop table if exists public.nutrition_foods cascade;
-- drop table if exists public.nutrition_therapeutic_profiles cascade;
-- drop table if exists public.nutrition_evidence_sources cascade;
-- drop table if exists public.nutrition_catalog_releases cascade;
-- drop table if exists public.nutrition_manufacturers cascade;
-- drop table if exists public.nutrition_nutrient_definitions cascade;
