-- 1) Garantir bucket
insert into storage.buckets (id, name, public)
values ('receituario-media', 'receituario-media', false)
on conflict (id) do update
set public = excluded.public;

-- 3) Recriar policies do bucket receituario-media
drop policy if exists rxv_media_read on storage.objects;
drop policy if exists rxv_media_insert on storage.objects;
drop policy if exists rxv_media_update on storage.objects;
drop policy if exists rxv_media_delete on storage.objects;

create policy rxv_media_read
on storage.objects
for select
to authenticated
using (bucket_id = 'receituario-media');

create policy rxv_media_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'receituario-media');

create policy rxv_media_update
on storage.objects
for update
to authenticated
using (bucket_id = 'receituario-media')
with check (bucket_id = 'receituario-media');

create policy rxv_media_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'receituario-media');