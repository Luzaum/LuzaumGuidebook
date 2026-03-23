create table if not exists public.compounded_medications (
    id uuid not null default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,
    name text not null,
    slug text,
    description text,
    pharmaceutical_form text not null,
    default_route text,
    species text[] not null default '{}'::text[],
    routes text[] not null default '{}'::text[],
    is_controlled boolean not null default false,
    control_type text,
    is_active boolean not null default true,
    notes text,
    manipulation_instructions text,
    default_quantity_text text,
    default_qsp_text text,
    default_flavor text,
    default_vehicle text,
    default_excipient text,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    created_by uuid references auth.users(id) on delete set null,
    constraint compounded_medications_pkey primary key (id)
);

create unique index if not exists compounded_medications_clinic_slug_key
    on public.compounded_medications (clinic_id, slug)
    where slug is not null;
create index if not exists compounded_medications_clinic_name_idx
    on public.compounded_medications (clinic_id, is_active, name);
create index if not exists compounded_medications_name_trgm_idx
    on public.compounded_medications using gin (name public.gin_trgm_ops);

alter table public.compounded_medications enable row level security;

drop policy if exists compounded_medications_select on public.compounded_medications;
create policy compounded_medications_select
    on public.compounded_medications
    for select
    to authenticated
    using (public.is_member_of_clinic(clinic_id));

drop policy if exists compounded_medications_insert on public.compounded_medications;
create policy compounded_medications_insert
    on public.compounded_medications
    for insert
    to authenticated
    with check (
        public.is_member_of_clinic(clinic_id)
        and (created_by is null or created_by = auth.uid())
    );

drop policy if exists compounded_medications_update on public.compounded_medications;
create policy compounded_medications_update
    on public.compounded_medications
    for update
    to authenticated
    using (public.is_member_of_clinic(clinic_id))
    with check (public.is_member_of_clinic(clinic_id));

drop policy if exists compounded_medications_delete on public.compounded_medications;
create policy compounded_medications_delete
    on public.compounded_medications
    for delete
    to authenticated
    using (public.is_member_of_clinic(clinic_id));

create table if not exists public.compounded_medication_ingredients (
    id uuid not null default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,
    compounded_medication_id uuid not null references public.compounded_medications(id) on delete cascade,
    sort_order integer not null default 0,
    ingredient_name text not null,
    ingredient_role text not null,
    quantity_value numeric,
    quantity_unit text,
    concentration_value numeric,
    concentration_unit text,
    per_value numeric,
    per_unit text,
    free_text text,
    is_controlled_ingredient boolean not null default false,
    notes text,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint compounded_medication_ingredients_pkey primary key (id),
    constraint compounded_medication_ingredients_role_check
        check (ingredient_role in ('active', 'vehicle', 'excipient', 'flavor', 'adjuvant', 'preservative', 'other'))
);

create index if not exists compounded_medication_ingredients_medication_idx
    on public.compounded_medication_ingredients (compounded_medication_id, sort_order);

alter table public.compounded_medication_ingredients enable row level security;

drop policy if exists compounded_medication_ingredients_select on public.compounded_medication_ingredients;
create policy compounded_medication_ingredients_select
    on public.compounded_medication_ingredients
    for select
    to authenticated
    using (public.is_member_of_clinic(clinic_id));

drop policy if exists compounded_medication_ingredients_insert on public.compounded_medication_ingredients;
create policy compounded_medication_ingredients_insert
    on public.compounded_medication_ingredients
    for insert
    to authenticated
    with check (public.is_member_of_clinic(clinic_id));

drop policy if exists compounded_medication_ingredients_update on public.compounded_medication_ingredients;
create policy compounded_medication_ingredients_update
    on public.compounded_medication_ingredients
    for update
    to authenticated
    using (public.is_member_of_clinic(clinic_id))
    with check (public.is_member_of_clinic(clinic_id));

drop policy if exists compounded_medication_ingredients_delete on public.compounded_medication_ingredients;
create policy compounded_medication_ingredients_delete
    on public.compounded_medication_ingredients
    for delete
    to authenticated
    using (public.is_member_of_clinic(clinic_id));

create table if not exists public.compounded_medication_regimens (
    id uuid not null default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,
    compounded_medication_id uuid not null references public.compounded_medications(id) on delete cascade,
    sort_order integer not null default 0,
    regimen_name text,
    indication text,
    dosing_mode text not null,
    species text not null,
    route text,
    dose_min numeric,
    dose_max numeric,
    dose_unit text,
    per_weight_unit text,
    fixed_administration_value numeric,
    fixed_administration_unit text,
    concentration_value numeric,
    concentration_unit text,
    concentration_per_value numeric,
    concentration_per_unit text,
    frequency_value_min numeric,
    frequency_value_max numeric,
    frequency_unit text,
    frequency_label text,
    duration_mode text,
    duration_value numeric,
    duration_unit text,
    inherit_default_start boolean not null default true,
    notes text,
    allow_edit boolean not null default true,
    default_prepared_quantity_text text,
    default_administration_sig text,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint compounded_medication_regimens_pkey primary key (id),
    constraint compounded_medication_regimens_dosing_mode_check
        check (dosing_mode in ('fixed_per_patient', 'calculated'))
);

create index if not exists compounded_medication_regimens_medication_idx
    on public.compounded_medication_regimens (compounded_medication_id, sort_order);

alter table public.compounded_medication_regimens enable row level security;

drop policy if exists compounded_medication_regimens_select on public.compounded_medication_regimens;
create policy compounded_medication_regimens_select
    on public.compounded_medication_regimens
    for select
    to authenticated
    using (public.is_member_of_clinic(clinic_id));

drop policy if exists compounded_medication_regimens_insert on public.compounded_medication_regimens;
create policy compounded_medication_regimens_insert
    on public.compounded_medication_regimens
    for insert
    to authenticated
    with check (public.is_member_of_clinic(clinic_id));

drop policy if exists compounded_medication_regimens_update on public.compounded_medication_regimens;
create policy compounded_medication_regimens_update
    on public.compounded_medication_regimens
    for update
    to authenticated
    using (public.is_member_of_clinic(clinic_id))
    with check (public.is_member_of_clinic(clinic_id));

drop policy if exists compounded_medication_regimens_delete on public.compounded_medication_regimens;
create policy compounded_medication_regimens_delete
    on public.compounded_medication_regimens
    for delete
    to authenticated
    using (public.is_member_of_clinic(clinic_id));

alter table public.protocol_medications
    add column if not exists item_type text not null default 'standard',
    add column if not exists compounded_medication_id uuid,
    add column if not exists compounded_regimen_id uuid;

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'protocol_medications_item_type_check'
          and conrelid = 'public.protocol_medications'::regclass
    ) then
        alter table public.protocol_medications
            add constraint protocol_medications_item_type_check
            check (item_type in ('standard', 'compounded'));
    end if;
end $$;

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'protocol_medications_compounded_medication_id_fkey'
          and conrelid = 'public.protocol_medications'::regclass
    ) then
        alter table public.protocol_medications
            add constraint protocol_medications_compounded_medication_id_fkey
            foreign key (compounded_medication_id)
            references public.compounded_medications(id)
            on delete set null;
    end if;
end $$;

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'protocol_medications_compounded_regimen_id_fkey'
          and conrelid = 'public.protocol_medications'::regclass
    ) then
        alter table public.protocol_medications
            add constraint protocol_medications_compounded_regimen_id_fkey
            foreign key (compounded_regimen_id)
            references public.compounded_medication_regimens(id)
            on delete set null;
    end if;
end $$;

create index if not exists protocol_meds_item_type_idx
    on public.protocol_medications (item_type, compounded_medication_id);

create table if not exists public.prescription_documents (
    id uuid not null default gen_random_uuid(),
    clinic_id uuid not null references public.clinics(id) on delete cascade,
    prescription_id uuid not null references public.prescriptions(id) on delete cascade,
    document_type text not null,
    pdf_path text,
    pdf_bucket text,
    snapshot_json jsonb,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint prescription_documents_pkey primary key (id),
    constraint prescription_documents_document_type_check
        check (document_type in ('standard', 'controlled'))
);

create index if not exists prescription_documents_prescription_idx
    on public.prescription_documents (prescription_id, document_type);
create index if not exists prescription_documents_clinic_idx
    on public.prescription_documents (clinic_id, created_at desc);

alter table public.prescription_documents enable row level security;

drop policy if exists prescription_documents_select on public.prescription_documents;
create policy prescription_documents_select
    on public.prescription_documents
    for select
    to authenticated
    using (public.is_member_of_clinic(clinic_id));

drop policy if exists prescription_documents_insert on public.prescription_documents;
create policy prescription_documents_insert
    on public.prescription_documents
    for insert
    to authenticated
    with check (public.is_member_of_clinic(clinic_id));

drop policy if exists prescription_documents_update on public.prescription_documents;
create policy prescription_documents_update
    on public.prescription_documents
    for update
    to authenticated
    using (public.is_member_of_clinic(clinic_id))
    with check (public.is_member_of_clinic(clinic_id));

drop policy if exists prescription_documents_delete on public.prescription_documents;
create policy prescription_documents_delete
    on public.prescription_documents
    for delete
    to authenticated
    using (public.is_member_of_clinic(clinic_id));

drop trigger if exists trg_compounded_medications_set_updated_at on public.compounded_medications;
create trigger trg_compounded_medications_set_updated_at
before update on public.compounded_medications
for each row execute function public.set_updated_at();

drop trigger if exists trg_compounded_medication_ingredients_set_updated_at on public.compounded_medication_ingredients;
create trigger trg_compounded_medication_ingredients_set_updated_at
before update on public.compounded_medication_ingredients
for each row execute function public.set_updated_at();

drop trigger if exists trg_compounded_medication_regimens_set_updated_at on public.compounded_medication_regimens;
create trigger trg_compounded_medication_regimens_set_updated_at
before update on public.compounded_medication_regimens
for each row execute function public.set_updated_at();

drop trigger if exists trg_prescription_documents_set_updated_at on public.prescription_documents;
create trigger trg_prescription_documents_set_updated_at
before update on public.prescription_documents
for each row execute function public.set_updated_at();

grant select, insert, update, delete on public.compounded_medications to authenticated;
grant select, insert, update, delete on public.compounded_medication_ingredients to authenticated;
grant select, insert, update, delete on public.compounded_medication_regimens to authenticated;
grant select, insert, update, delete on public.prescription_documents to authenticated;

grant select, insert, update, delete on public.compounded_medications to service_role;
grant select, insert, update, delete on public.compounded_medication_ingredients to service_role;
grant select, insert, update, delete on public.compounded_medication_regimens to service_role;
grant select, insert, update, delete on public.prescription_documents to service_role;
