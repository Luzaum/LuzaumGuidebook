-- Receituário ConsultaVet v2
-- Esta migration ainda não existia no projeto remoto em 2026-08-01.
-- Se uma instalação local já possuir a versão anterior, as tabelas exclusivas são
-- copiadas integralmente para receituario_backup_20260801 antes da reconstrução.

create schema if not exists receituario_backup_20260801;

create table if not exists public.receituario_migration_audit (
  id bigint generated always as identity primary key,
  migration_key text not null,
  object_name text not null,
  rows_backed_up bigint not null default 0,
  action text not null,
  created_at timestamptz not null default now()
);

do $$
declare
  target text;
  copied bigint;
begin
  foreach target in array array['document_templates', 'generated_documents', 'template_favorites'] loop
    if to_regclass('public.' || target) is not null then
      execute format('drop table if exists receituario_backup_20260801.%I', target);
      execute format('create table receituario_backup_20260801.%I as table public.%I', target, target);
      execute format('select count(*) from receituario_backup_20260801.%I', target) into copied;
      insert into public.receituario_migration_audit(migration_key, object_name, rows_backed_up, action)
      values ('20260801120000', target, copied, 'backup_before_exclusive_table_rebuild');
    else
      insert into public.receituario_migration_audit(migration_key, object_name, rows_backed_up, action)
      values ('20260801120000', target, 0, 'legacy_object_not_present');
    end if;
  end loop;
end $$;

drop table if exists public.template_favorites cascade;
drop table if exists public.generated_documents cascade;
drop table if exists public.document_templates cascade;

create table public.document_templates (
  id text primary key default gen_random_uuid()::text,
  clinic_id uuid references public.clinics(id) on delete cascade,
  owner_user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  category text not null,
  document_type text not null check (document_type in ('recipe', 'term')),
  species text not null default 'ambos' check (species in ('cão', 'gato', 'ambos')),
  body_plain_text text not null default '',
  structured_defaults jsonb not null default '{}'::jsonb,
  medication_ids text[] not null default '{}',
  is_global boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint document_templates_owner_check check (is_global or owner_user_id is not null)
);

create table public.generated_documents (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references public.clinics(id) on delete cascade,
  template_id text,
  title text not null,
  document_type text not null check (document_type in ('recipe', 'term')),
  body_plain_text text not null,
  structured_data jsonb not null default '{}'::jsonb,
  status text not null default 'issued' check (status in ('draft', 'issued')),
  issued_at timestamptz not null default now(),
  pdf_storage_path text,
  signed_copy_storage_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) on delete cascade
);

create table public.generated_document_medications (
  id uuid primary key default gen_random_uuid(),
  generated_document_id uuid not null references public.generated_documents(id) on delete cascade,
  sort_order integer not null default 0,
  medication_id text not null,
  presentation_id text,
  dose_id text,
  medication_snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create table public.template_favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, template_id)
);

create table public.receituario_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  clinic_id uuid references public.clinics(id) on delete cascade,
  template_id text not null default '__new__',
  draft_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, template_id)
);

create index document_templates_owner_idx on public.document_templates(owner_user_id);
create index document_templates_owner_clinic_idx on public.document_templates(owner_user_id, clinic_id);
create index document_templates_category_idx on public.document_templates(category);
create index generated_documents_owner_idx on public.generated_documents(created_by, issued_at desc);
create index generated_documents_owner_clinic_idx on public.generated_documents(created_by, clinic_id, issued_at desc);
create index generated_document_medications_document_idx on public.generated_document_medications(generated_document_id, sort_order);
create index receituario_drafts_owner_idx on public.receituario_drafts(user_id, updated_at desc);

-- Fonte clínica estruturada. Plumb's e bula nunca são combinados silenciosamente.
alter table if exists public.medication_recommended_doses
  add column if not exists source_type text,
  add column if not exists source_label text,
  add column if not exists source_edition text,
  add column if not exists source_url text,
  add column if not exists source_locator text;

alter table if exists public.global_medication_recommended_doses
  add column if not exists source_type text,
  add column if not exists source_label text,
  add column if not exists source_edition text,
  add column if not exists source_url text,
  add column if not exists source_locator text;

alter table if exists public.medication_presentations
  add column if not exists tablet_split_increment numeric;

alter table if exists public.global_medication_presentations
  add column if not exists tablet_split_increment numeric;

do $$
begin
  if to_regclass('public.medication_presentations') is not null then
    alter table public.medication_presentations drop constraint if exists medication_presentations_split_increment_check;
    alter table public.medication_presentations add constraint medication_presentations_split_increment_check
      check (tablet_split_increment is null or tablet_split_increment in (1, 0.5, 0.25));
  end if;
  if to_regclass('public.global_medication_presentations') is not null then
    alter table public.global_medication_presentations drop constraint if exists global_medication_presentations_split_increment_check;
    alter table public.global_medication_presentations add constraint global_medication_presentations_split_increment_check
      check (tablet_split_increment is null or tablet_split_increment in (1, 0.5, 0.25));
  end if;
end $$;

create table if not exists public.medication_precautions (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  medication_id uuid not null references public.medications(id) on delete cascade,
  text_for_prescription text not null,
  source_type text not null default 'clinic',
  source_label text,
  source_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (clinic_id, medication_id, text_for_prescription)
);

create table if not exists public.global_medication_precautions (
  id uuid primary key default gen_random_uuid(),
  global_medication_id uuid not null references public.global_medications(id) on delete cascade,
  text_for_prescription text not null,
  source_type text not null default 'other',
  source_label text,
  source_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (global_medication_id, text_for_prescription)
);

alter table public.document_templates enable row level security;
alter table public.generated_documents enable row level security;
alter table public.generated_document_medications enable row level security;
alter table public.template_favorites enable row level security;
alter table public.receituario_drafts enable row level security;
alter table public.receituario_migration_audit enable row level security;
alter table public.medication_precautions enable row level security;
alter table public.global_medication_precautions enable row level security;

create policy document_templates_select on public.document_templates for select to authenticated
  using (is_global or owner_user_id = auth.uid());
create policy document_templates_insert on public.document_templates for insert to authenticated
  with check (not is_global and owner_user_id = auth.uid());
create policy document_templates_update on public.document_templates for update to authenticated
  using (not is_global and owner_user_id = auth.uid()) with check (not is_global and owner_user_id = auth.uid());
create policy document_templates_delete on public.document_templates for delete to authenticated
  using (not is_global and owner_user_id = auth.uid());

create policy generated_documents_owner_all on public.generated_documents for all to authenticated
  using (created_by = auth.uid()) with check (created_by = auth.uid());
create policy generated_document_medications_owner_all on public.generated_document_medications for all to authenticated
  using (exists (select 1 from public.generated_documents d where d.id = generated_document_id and d.created_by = auth.uid()))
  with check (exists (select 1 from public.generated_documents d where d.id = generated_document_id and d.created_by = auth.uid()));
create policy template_favorites_owner_all on public.template_favorites for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy receituario_drafts_owner_all on public.receituario_drafts for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy medication_precautions_select on public.medication_precautions for select to authenticated
  using (public.is_member_of_clinic(clinic_id));
create policy medication_precautions_manage on public.medication_precautions for all to authenticated
  using (public.is_member_of_clinic(clinic_id))
  with check (public.is_member_of_clinic(clinic_id));
create policy global_medication_precautions_select on public.global_medication_precautions for select to authenticated using (true);

-- Privilégios explícitos: RLS decide as linhas; usuários anônimos não recebem acesso
-- aos dados do Receituário. O log e o schema de backup permanecem administrativos.
revoke all on table public.document_templates from anon, authenticated;
revoke all on table public.generated_documents from anon, authenticated;
revoke all on table public.generated_document_medications from anon, authenticated;
revoke all on table public.template_favorites from anon, authenticated;
revoke all on table public.receituario_drafts from anon, authenticated;
revoke all on table public.receituario_migration_audit from anon, authenticated;
revoke all on table public.medication_precautions from anon, authenticated;
revoke all on table public.global_medication_precautions from anon, authenticated;
revoke all on sequence public.receituario_migration_audit_id_seq from anon, authenticated;

grant select, insert, update, delete on table public.document_templates to authenticated;
grant select, insert, update, delete on table public.generated_documents to authenticated;
grant select, insert, update, delete on table public.generated_document_medications to authenticated;
grant select, insert, update, delete on table public.template_favorites to authenticated;
grant select, insert, update, delete on table public.receituario_drafts to authenticated;
grant select, insert, update, delete on table public.medication_precautions to authenticated;
grant select on table public.global_medication_precautions to authenticated;

grant all on table public.document_templates to service_role;
grant all on table public.generated_documents to service_role;
grant all on table public.generated_document_medications to service_role;
grant all on table public.template_favorites to service_role;
grant all on table public.receituario_drafts to service_role;
grant select on table public.receituario_migration_audit to service_role;
grant all on table public.medication_precautions to service_role;
grant all on table public.global_medication_precautions to service_role;

revoke all on schema receituario_backup_20260801 from public, anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('receituario-signed-copies', 'receituario-signed-copies', false, 10485760, array['application/pdf','image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists receituario_signed_select on storage.objects;
drop policy if exists receituario_signed_insert on storage.objects;
drop policy if exists receituario_signed_delete on storage.objects;
create policy receituario_signed_select on storage.objects for select to authenticated
  using (bucket_id = 'receituario-signed-copies' and (storage.foldername(name))[2] = auth.uid()::text);
create policy receituario_signed_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'receituario-signed-copies' and (storage.foldername(name))[2] = auth.uid()::text);
create policy receituario_signed_delete on storage.objects for delete to authenticated
  using (bucket_id = 'receituario-signed-copies' and (storage.foldername(name))[2] = auth.uid()::text);

comment on schema receituario_backup_20260801 is 'Backup pré-refatoração do Receituário; não exposto pela API.';
comment on table public.generated_document_medications is 'Relações canônicas usadas na emissão; medication_snapshot preserva a decisão clínica histórica.';
