alter table public.consensus_documents
  add column if not exists related_disease_slugs jsonb default '[]'::jsonb,
  add column if not exists related_medication_slugs jsonb default '[]'::jsonb,
  add column if not exists created_by uuid,
  add column if not exists updated_by uuid;

update public.consensus_documents
set related_disease_slugs = '[]'::jsonb
where related_disease_slugs is null;

update public.consensus_documents
set related_medication_slugs = '[]'::jsonb
where related_medication_slugs is null;

alter table public.consensus_documents
  alter column related_disease_slugs set default '[]'::jsonb,
  alter column related_medication_slugs set default '[]'::jsonb,
  alter column related_disease_slugs set not null,
  alter column related_medication_slugs set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'consensus_documents_created_by_fkey'
  ) then
    alter table public.consensus_documents
      add constraint consensus_documents_created_by_fkey
      foreign key (created_by)
      references auth.users(id);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'consensus_documents_updated_by_fkey'
  ) then
    alter table public.consensus_documents
      add constraint consensus_documents_updated_by_fkey
      foreign key (updated_by)
      references auth.users(id);
  end if;
end $$;
