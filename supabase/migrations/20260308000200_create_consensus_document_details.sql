-- Shared editorial content for consensus detail page

create table if not exists public.consensus_document_details (
  id uuid primary key default gen_random_uuid(),
  consensus_document_id uuid not null,
  summary_text text null,
  key_points_text text null,
  practical_application_text text null,
  app_notes_text text null,
  created_by uuid null references auth.users(id),
  updated_by uuid null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint consensus_document_details_document_id_key unique (consensus_document_id),
  constraint consensus_document_details_document_fk
    foreign key (consensus_document_id)
    references public.consensus_documents(id)
    on delete cascade
);

create index if not exists idx_consensus_document_details_document_id
  on public.consensus_document_details(consensus_document_id);

alter table public.consensus_document_details enable row level security;

-- Reuse project updated_at trigger helper when available.
do $$
begin
  if to_regproc('public.set_updated_at') is not null then
    execute 'drop trigger if exists trg_consensus_document_details_updated_at on public.consensus_document_details';
    execute 'create trigger trg_consensus_document_details_updated_at before update on public.consensus_document_details for each row execute function public.set_updated_at()';
  end if;
end $$;

drop policy if exists consensus_document_details_select_visible_consensus on public.consensus_document_details;
create policy consensus_document_details_select_visible_consensus
on public.consensus_document_details
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.consensus_documents cd
    where cd.id = consensus_document_details.consensus_document_id
      and (cd.is_published = true or auth.role() = 'authenticated')
  )
);

drop policy if exists consensus_document_details_manage_authenticated on public.consensus_document_details;
create policy consensus_document_details_manage_authenticated
on public.consensus_document_details
for all
to authenticated
using (true)
with check (true);