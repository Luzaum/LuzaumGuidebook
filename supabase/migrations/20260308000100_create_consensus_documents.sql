-- Consensos reais do módulo Consulta VET
-- Sprint: Supabase + Storage + PDF Reader

create extension if not exists pgcrypto;

create table if not exists public.consensus_documents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text null,
  organization text null,
  year integer null,
  category text null,
  species text null,
  file_path text not null,
  file_url text null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists consensus_documents_slug_idx
  on public.consensus_documents (slug);

create index if not exists consensus_documents_title_idx
  on public.consensus_documents (title);

alter table public.consensus_documents enable row level security;

-- Reaproveita helper padrão do projeto para updated_at.
do $$
begin
  if not exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'set_updated_at'
  ) then
    create function public.set_updated_at()
    returns trigger
    language plpgsql
    as $func$
    begin
      new.updated_at = now();
      return new;
    end;
    $func$;
  end if;
end
$$;

drop trigger if exists trg_consensus_documents_updated_at on public.consensus_documents;
create trigger trg_consensus_documents_updated_at
before update on public.consensus_documents
for each row
execute function public.set_updated_at();

drop policy if exists consensus_documents_select_published on public.consensus_documents;
create policy consensus_documents_select_published
on public.consensus_documents
for select
to anon, authenticated
using (is_published = true);

drop policy if exists consensus_documents_manage_authenticated on public.consensus_documents;
create policy consensus_documents_manage_authenticated
on public.consensus_documents
for all
to authenticated
using (true)
with check (true);

-- Bucket público exclusivo para consensos (separado de dados clínicos sensíveis).
insert into storage.buckets (id, name, public)
values ('consulta-consensos', 'consulta-consensos', true)
on conflict (id) do update
set public = true;

drop policy if exists consulta_consensos_read_public on storage.objects;
create policy consulta_consensos_read_public
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'consulta-consensos');

drop policy if exists consulta_consensos_insert_authenticated on storage.objects;
create policy consulta_consensos_insert_authenticated
on storage.objects
for insert
to authenticated
with check (bucket_id = 'consulta-consensos');

drop policy if exists consulta_consensos_update_authenticated on storage.objects;
create policy consulta_consensos_update_authenticated
on storage.objects
for update
to authenticated
using (bucket_id = 'consulta-consensos')
with check (bucket_id = 'consulta-consensos');

drop policy if exists consulta_consensos_delete_authenticated on storage.objects;
create policy consulta_consensos_delete_authenticated
on storage.objects
for delete
to authenticated
using (bucket_id = 'consulta-consensos');
