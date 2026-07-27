-- Make Consulta Vet consensus documents from luishvet25 visible to every account.
-- In this schema, a consensus is global when consensus_documents.is_published = true.

create or replace function public.is_luishvet25_user(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from auth.users u
    where u.id = target_user_id
      and (
        lower(coalesce(u.email, '')) in ('luishvet25@gmail.com', 'luishvet25@vetius.link')
        or lower(coalesce(u.raw_user_meta_data->>'login', '')) = 'luishvet25'
        or lower(coalesce(u.raw_user_meta_data->>'username', '')) = 'luishvet25'
      )
  );
$$;

revoke all on function public.is_luishvet25_user(uuid) from public;
grant execute on function public.is_luishvet25_user(uuid) to authenticated, service_role;

update public.consensus_documents
set is_published = true
where
  (created_by is not null and public.is_luishvet25_user(created_by))
  or (updated_by is not null and public.is_luishvet25_user(updated_by));

create or replace function public.force_luishvet25_consensus_global()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if
    public.is_luishvet25_user(auth.uid())
    or (new.created_by is not null and public.is_luishvet25_user(new.created_by))
    or (new.updated_by is not null and public.is_luishvet25_user(new.updated_by))
  then
    new.is_published := true;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_force_luishvet25_consensus_global on public.consensus_documents;
create trigger trg_force_luishvet25_consensus_global
before insert or update on public.consensus_documents
for each row
execute function public.force_luishvet25_consensus_global();
