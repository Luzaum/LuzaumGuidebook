-- Reconcilia o schema histórico do ReceituarioVET com o estado remoto confirmado
-- em 2026-08-01. Não toca em patients, tutors, patient_weights ou dados compartilhados.

create schema if not exists receituariovet_legacy_backup_20260801;
revoke all on schema receituariovet_legacy_backup_20260801 from public, anon, authenticated;

-- O único registro remoto atribuível inequivocamente ao app antigo declara no
-- próprio snapshot que foi criado para "validacao E2E do ReceituarioVET".
create table if not exists receituariovet_legacy_backup_20260801.protocols as
select * from public.protocols with no data;

create table if not exists receituariovet_legacy_backup_20260801.protocol_medications as
select * from public.protocol_medications with no data;

insert into receituariovet_legacy_backup_20260801.protocols
select p.*
from public.protocols p
where p.metadata::text ilike '%validacao E2E do ReceituarioVET%'
  and not exists (
    select 1 from receituariovet_legacy_backup_20260801.protocols b where b.id = p.id
  );

insert into receituariovet_legacy_backup_20260801.protocol_medications
select pm.*
from public.protocol_medications pm
join receituariovet_legacy_backup_20260801.protocols bp on bp.id = pm.protocol_id
where not exists (
  select 1 from receituariovet_legacy_backup_20260801.protocol_medications b where b.id = pm.id
);

create table if not exists receituariovet_legacy_backup_20260801.cleanup_audit (
  executed_at timestamptz not null default now(),
  object_name text not null,
  rows_before bigint not null,
  rows_removed bigint not null,
  rows_after bigint not null
);

do $$
declare
  protocols_before bigint;
  medications_before bigint;
  protocols_after bigint;
  medications_after bigint;
begin
  select count(*) into protocols_before
  from public.protocols
  where metadata::text ilike '%validacao E2E do ReceituarioVET%';

  select count(*) into medications_before
  from public.protocol_medications pm
  join receituariovet_legacy_backup_20260801.protocols bp on bp.id = pm.protocol_id;

  delete from public.protocols
  where metadata::text ilike '%validacao E2E do ReceituarioVET%';

  select count(*) into protocols_after
  from public.protocols
  where metadata::text ilike '%validacao E2E do ReceituarioVET%';

  select count(*) into medications_after
  from public.protocol_medications pm
  join receituariovet_legacy_backup_20260801.protocols bp on bp.id = pm.protocol_id;

  insert into receituariovet_legacy_backup_20260801.cleanup_audit
    (object_name, rows_before, rows_removed, rows_after)
  values
    ('public.protocols', protocols_before, protocols_before - protocols_after, protocols_after),
    ('public.protocol_medications', medications_before, medications_before - medications_after, medications_after);
end $$;

-- Tabelas exclusivas do runtime antigo. O remoto já não as possui. Em um
-- ambiente que ainda as tenha, os dados são copiados antes da remoção.
do $$
declare
  target text;
begin
  foreach target in array array['prescriptions', 'prescription_documents'] loop
    if to_regclass('public.' || target) is not null then
      execute format(
        'create table if not exists receituariovet_legacy_backup_20260801.%I as table public.%I',
        target,
        target
      );
    end if;
  end loop;
end $$;

drop table if exists public.prescription_documents;
drop table if exists public.prescriptions;

-- A migration histórica de manipulados já criou backups integrais destas três
-- tabelas. Objetos ativos remanescentes são removidos para refletir o runtime V1.
alter table if exists public.protocol_medications
  drop column if exists compounded_regimen_id,
  drop column if exists compounded_medication_id,
  drop column if exists item_type;

drop table if exists public.compounded_medication_ingredients;
drop table if exists public.compounded_medication_regimens;
drop table if exists public.compounded_medications;

drop policy if exists rxv_media_read on storage.objects;
drop policy if exists rxv_media_insert on storage.objects;
drop policy if exists rxv_media_update on storage.objects;
drop policy if exists rxv_media_delete on storage.objects;

-- A remoção física de buckets deve ocorrer pela Storage API, nunca por DELETE
-- direto nas tabelas internas. O remoto não possui este bucket; em replay local
-- ele pode permanecer vazio e sem policies como artefato histórico inofensivo.

comment on schema receituariovet_legacy_backup_20260801 is
  'Backup privado da reconciliação do antigo ReceituarioVET em 2026-08-01.';
