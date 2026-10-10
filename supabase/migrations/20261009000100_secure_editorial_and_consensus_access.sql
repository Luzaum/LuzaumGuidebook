-- Preserve catalog data and public reads; restrict mutations to their owners
-- or administrators whose permissions are maintained by the server.
begin;

create or replace function public.can_manage_consulta_vet_editorial()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from auth.users u
    where u.id = auth.uid()
      and (
        lower(coalesce(u.raw_app_meta_data->>'role', '')) = 'admin'
        or lower(coalesce(u.raw_app_meta_data->>'is_admin', '')) in ('true', '1', 'yes')
        or lower(coalesce(u.raw_app_meta_data->>'global_content_admin', '')) in ('true', '1', 'yes')
        or (u.email_confirmed_at is not null and lower(coalesce(u.email, '')) in ('luishvet25@gmail.com', 'luishvet25@vetius.link'))
      )
  );
$$;
revoke all on function public.can_manage_consulta_vet_editorial() from public, anon;
grant execute on function public.can_manage_consulta_vet_editorial() to authenticated, service_role;

-- Profile names can be edited by the user and must never grant privileges.
create or replace function public.is_luishvet25_user(target_user_id uuid)
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (select 1 from auth.users u where u.id = target_user_id
    and u.email_confirmed_at is not null
    and lower(coalesce(u.email, '')) in ('luishvet25@gmail.com', 'luishvet25@vetius.link'));
$$;

-- Remove both generations of legacy policies: permissive policies combine by OR.
drop policy if exists consensus_documents_public_read on public.consensus_documents;
drop policy if exists consensus_documents_select_published on public.consensus_documents;
drop policy if exists consensus_documents_authenticated_insert on public.consensus_documents;
drop policy if exists consensus_documents_authenticated_update on public.consensus_documents;
drop policy if exists consensus_documents_authenticated_delete on public.consensus_documents;
drop policy if exists consensus_documents_manage_authenticated on public.consensus_documents;

create policy consensus_documents_public_read on public.consensus_documents
for select to anon using (is_published = true);
create policy consensus_documents_authenticated_read on public.consensus_documents
for select to authenticated using (is_published = true or created_by = auth.uid() or (select public.can_manage_consulta_vet_editorial()));
create policy consensus_documents_owned_insert on public.consensus_documents
for insert to authenticated with check (created_by = auth.uid() or (select public.can_manage_consulta_vet_editorial()));
create policy consensus_documents_owned_update on public.consensus_documents
for update to authenticated
using (created_by = auth.uid() or (select public.can_manage_consulta_vet_editorial()))
with check (created_by = auth.uid() or (select public.can_manage_consulta_vet_editorial()));
create policy consensus_documents_owned_delete on public.consensus_documents
for delete to authenticated using (created_by = auth.uid() or (select public.can_manage_consulta_vet_editorial()));

drop policy if exists consensus_document_details_manage_authenticated on public.consensus_document_details;
drop policy if exists consensus_document_details_manage_owner on public.consensus_document_details;
create policy consensus_document_details_manage_document_owner on public.consensus_document_details
for all to authenticated
using ((select public.can_manage_consulta_vet_editorial()) or exists (
  select 1 from public.consensus_documents d where d.id = consensus_document_id and d.created_by = auth.uid()))
with check ((select public.can_manage_consulta_vet_editorial()) or exists (
  select 1 from public.consensus_documents d where d.id = consensus_document_id and d.created_by = auth.uid()));

drop policy if exists consulta_consensos_insert on storage.objects;
drop policy if exists consulta_consensos_update on storage.objects;
drop policy if exists consulta_consensos_delete on storage.objects;
drop policy if exists consulta_consensos_insert_authenticated on storage.objects;
drop policy if exists consulta_consensos_update_authenticated on storage.objects;
drop policy if exists consulta_consensos_delete_authenticated on storage.objects;
create policy consulta_consensos_owned_insert on storage.objects
for insert to authenticated with check (bucket_id = 'consulta-consensos' and (owner_id = auth.uid()::text or (select public.can_manage_consulta_vet_editorial())));
create policy consulta_consensos_owned_update on storage.objects
for update to authenticated
using (bucket_id = 'consulta-consensos' and (owner_id = auth.uid()::text or (select public.can_manage_consulta_vet_editorial())))
with check (bucket_id = 'consulta-consensos' and (owner_id = auth.uid()::text or (select public.can_manage_consulta_vet_editorial())));
create policy consulta_consensos_owned_delete on storage.objects
for delete to authenticated using (bucket_id = 'consulta-consensos' and (owner_id = auth.uid()::text or (select public.can_manage_consulta_vet_editorial())));

-- Shared disease/medication catalogs are editorial, not tenant-owned records.
do $$
declare target_table text;
begin
  foreach target_table in array array['consulta_vet_categories', 'consulta_vet_diseases', 'consulta_vet_medications', 'consulta_vet_disease_medications', 'consulta_vet_disease_consensos'] loop
    execute format('drop policy if exists %I on public.%I', target_table || '_manage_owner', target_table);
    execute format('create policy %I on public.%I for all to authenticated using ((select public.can_manage_consulta_vet_editorial())) with check ((select public.can_manage_consulta_vet_editorial()))', target_table || '_manage_editor', target_table);
  end loop;
end $$;

commit;
