-- Restrict shared consensus editorial writes to owner profiles.

drop policy if exists consensus_document_details_manage_authenticated on public.consensus_document_details;
drop policy if exists consensus_document_details_manage_owner on public.consensus_document_details;

create policy consensus_document_details_manage_owner
on public.consensus_document_details
for all
to authenticated
using (
  exists (
    select 1
    from public.memberships m
    where m.user_id = auth.uid()
      and m.role = 'owner'
  )
)
with check (
  exists (
    select 1
    from public.memberships m
    where m.user_id = auth.uid()
      and m.role = 'owner'
  )
);
