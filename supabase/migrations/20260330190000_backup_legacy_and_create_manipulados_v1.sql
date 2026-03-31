-- Preserve legado sem destruir tabelas atuais.
-- Esta migration cria cópias de backup e a estrutura nova do runtime V1.0.

create table if not exists public.compounded_medications_legacy_backup as
select * from public.compounded_medications with data;

create table if not exists public.compounded_medication_ingredients_legacy_backup as
select * from public.compounded_medication_ingredients with data;

create table if not exists public.compounded_medication_regimens_legacy_backup as
select * from public.compounded_medication_regimens with data;

create index if not exists compounded_medications_legacy_backup_id_idx
  on public.compounded_medications_legacy_backup (id);

create index if not exists compounded_medication_ingredients_legacy_backup_medication_idx
  on public.compounded_medication_ingredients_legacy_backup (compounded_medication_id, sort_order);

create index if not exists compounded_medication_regimens_legacy_backup_medication_idx
  on public.compounded_medication_regimens_legacy_backup (compounded_medication_id, sort_order);

create table if not exists public.manipulados_v1_formulas (
    id uuid not null default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,
    slug text,
    name text not null,
    species_scope text not null default 'ambos',
    pharmaceutical_form text not null,
    primary_route text not null,
    sale_classification text not null default 'free',
    is_active boolean not null default true,
    indication_summary text,
    description text,
    payload jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    created_by uuid references auth.users(id) on delete set null,
    constraint manipulados_v1_formulas_pkey primary key (id),
    constraint manipulados_v1_formulas_sale_classification_check
      check (sale_classification in ('free', 'controlled')),
    constraint manipulados_v1_formulas_species_scope_check
      check (species_scope in ('cao', 'gato', 'ambos'))
);

create unique index if not exists manipulados_v1_formulas_clinic_slug_key
  on public.manipulados_v1_formulas (clinic_id, slug)
  where slug is not null;

create index if not exists manipulados_v1_formulas_clinic_name_idx
  on public.manipulados_v1_formulas (clinic_id, is_active, name);

create index if not exists manipulados_v1_formulas_name_trgm_idx
  on public.manipulados_v1_formulas using gin (name public.gin_trgm_ops);

create index if not exists manipulados_v1_formulas_payload_gin_idx
  on public.manipulados_v1_formulas using gin (payload);

alter table public.manipulados_v1_formulas enable row level security;

drop policy if exists manipulados_v1_formulas_select on public.manipulados_v1_formulas;
create policy manipulados_v1_formulas_select
  on public.manipulados_v1_formulas
  for select
  to authenticated
  using (public.is_member_of_clinic(clinic_id));

drop policy if exists manipulados_v1_formulas_insert on public.manipulados_v1_formulas;
create policy manipulados_v1_formulas_insert
  on public.manipulados_v1_formulas
  for insert
  to authenticated
  with check (
    public.is_member_of_clinic(clinic_id)
    and (created_by is null or created_by = auth.uid())
  );

drop policy if exists manipulados_v1_formulas_update on public.manipulados_v1_formulas;
create policy manipulados_v1_formulas_update
  on public.manipulados_v1_formulas
  for update
  to authenticated
  using (public.is_member_of_clinic(clinic_id))
  with check (public.is_member_of_clinic(clinic_id));

drop policy if exists manipulados_v1_formulas_delete on public.manipulados_v1_formulas;
create policy manipulados_v1_formulas_delete
  on public.manipulados_v1_formulas
  for delete
  to authenticated
  using (public.is_member_of_clinic(clinic_id));
