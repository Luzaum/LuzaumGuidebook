-- Consensus library (public PDFs + metadata)

insert into storage.buckets (id, name, public)
values ('consulta-consensos', 'consulta-consensos', true)
on conflict (id) do update
set public = excluded.public;
drop policy if exists consulta_consensos_read on storage.objects;
drop policy if exists consulta_consensos_insert on storage.objects;
drop policy if exists consulta_consensos_update on storage.objects;
drop policy if exists consulta_consensos_delete on storage.objects;
create policy consulta_consensos_read
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'consulta-consensos');
create policy consulta_consensos_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'consulta-consensos');
create policy consulta_consensos_update
on storage.objects
for update
to authenticated
using (bucket_id = 'consulta-consensos')
with check (bucket_id = 'consulta-consensos');
create policy consulta_consensos_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'consulta-consensos');
create table if not exists public.consensus_documents (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  description text,
  organization text,
  year integer,
  category text,
  species text,
  file_path text not null,
  file_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists uq_consensus_documents_slug
  on public.consensus_documents (slug);
create index if not exists idx_consensus_documents_title
  on public.consensus_documents using btree (title);
alter table public.consensus_documents enable row level security;
drop policy if exists consensus_documents_public_read on public.consensus_documents;
drop policy if exists consensus_documents_authenticated_insert on public.consensus_documents;
drop policy if exists consensus_documents_authenticated_update on public.consensus_documents;
drop policy if exists consensus_documents_authenticated_delete on public.consensus_documents;
create policy consensus_documents_public_read
on public.consensus_documents
for select
to anon, authenticated
using (is_published = true or auth.role() = 'authenticated');
create policy consensus_documents_authenticated_insert
on public.consensus_documents
for insert
to authenticated
with check (true);
create policy consensus_documents_authenticated_update
on public.consensus_documents
for update
to authenticated
using (true)
with check (true);
create policy consensus_documents_authenticated_delete
on public.consensus_documents
for delete
to authenticated
using (true);
do $$
begin
  if to_regproc('public.set_updated_at') is not null then
    execute 'drop trigger if exists trg_consensus_documents_updated_at on public.consensus_documents';
    execute 'create trigger trg_consensus_documents_updated_at before update on public.consensus_documents for each row execute function public.set_updated_at()';
  end if;
end $$;
