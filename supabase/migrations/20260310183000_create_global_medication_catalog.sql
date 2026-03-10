create table if not exists "public"."global_medications" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "name" text not null,
    "active_ingredient" text,
    "is_controlled" boolean not null default false,
    "is_active" boolean not null default true,
    "notes" text,
    "tags" text[],
    "species" text[],
    "routes" text[],
    "metadata" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    constraint "global_medications_pkey" primary key ("id"),
    constraint "global_medications_slug_key" unique ("slug")
);

create index if not exists "global_medications_slug_idx" on "public"."global_medications" ("slug");
create index if not exists "global_medications_name_idx" on "public"."global_medications" ("name");

alter table "public"."global_medications" enable row level security;

create table if not exists "public"."global_medication_presentations" (
    "id" uuid not null default gen_random_uuid(),
    "global_medication_id" uuid not null references "public"."global_medications"("id") on delete cascade,
    "slug" text not null,
    "pharmaceutical_form" text,
    "concentration_text" text,
    "additional_component" text,
    "presentation_unit" text,
    "commercial_name" text,
    "value" numeric,
    "value_unit" text,
    "per_value" numeric default 1,
    "per_unit" text,
    "package_quantity" numeric,
    "package_unit" text,
    "avg_price_brl" numeric,
    "pharmacy_veterinary" boolean not null default true,
    "pharmacy_human" boolean not null default false,
    "pharmacy_compounding" boolean not null default false,
    "metadata" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    constraint "global_medication_presentations_pkey" primary key ("id"),
    constraint "global_medication_presentations_slug_key" unique ("global_medication_id", "slug")
);

create index if not exists "global_medication_presentations_medication_idx" on "public"."global_medication_presentations" ("global_medication_id");
create index if not exists "global_medication_presentations_slug_idx" on "public"."global_medication_presentations" ("slug");

alter table "public"."global_medication_presentations" enable row level security;

create table if not exists "public"."global_medication_recommended_doses" (
    "id" uuid not null default gen_random_uuid(),
    "global_medication_id" uuid not null references "public"."global_medications"("id") on delete cascade,
    "slug" text not null,
    "species" text not null,
    "route" text not null,
    "dose_value" numeric not null,
    "dose_unit" text not null,
    "frequency" text,
    "notes" text,
    "metadata" jsonb not null default '{}'::jsonb,
    "is_active" boolean not null default true,
    "sort_order" integer,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    constraint "global_medication_recommended_doses_pkey" primary key ("id"),
    constraint "global_medication_recommended_doses_slug_key" unique ("global_medication_id", "slug")
);

create index if not exists "global_medication_recommended_doses_medication_idx" on "public"."global_medication_recommended_doses" ("global_medication_id");
create index if not exists "global_medication_recommended_doses_slug_idx" on "public"."global_medication_recommended_doses" ("slug");

alter table "public"."global_medication_recommended_doses" enable row level security;

drop policy if exists "global_medications_select_authenticated" on "public"."global_medications";
create policy "global_medications_select_authenticated"
  on "public"."global_medications"
  for select
  to authenticated
  using (true);

drop policy if exists "global_medications_insert_service_role" on "public"."global_medications";
create policy "global_medications_insert_service_role"
  on "public"."global_medications"
  for insert
  to service_role
  with check (true);

drop policy if exists "global_medications_update_service_role" on "public"."global_medications";
create policy "global_medications_update_service_role"
  on "public"."global_medications"
  for update
  to service_role
  using (true)
  with check (true);

drop policy if exists "global_medications_delete_service_role" on "public"."global_medications";
create policy "global_medications_delete_service_role"
  on "public"."global_medications"
  for delete
  to service_role
  using (true);

drop policy if exists "global_medication_presentations_select_authenticated" on "public"."global_medication_presentations";
create policy "global_medication_presentations_select_authenticated"
  on "public"."global_medication_presentations"
  for select
  to authenticated
  using (true);

drop policy if exists "global_medication_presentations_insert_service_role" on "public"."global_medication_presentations";
create policy "global_medication_presentations_insert_service_role"
  on "public"."global_medication_presentations"
  for insert
  to service_role
  with check (true);

drop policy if exists "global_medication_presentations_update_service_role" on "public"."global_medication_presentations";
create policy "global_medication_presentations_update_service_role"
  on "public"."global_medication_presentations"
  for update
  to service_role
  using (true)
  with check (true);

drop policy if exists "global_medication_presentations_delete_service_role" on "public"."global_medication_presentations";
create policy "global_medication_presentations_delete_service_role"
  on "public"."global_medication_presentations"
  for delete
  to service_role
  using (true);

drop policy if exists "global_medication_recommended_doses_select_authenticated" on "public"."global_medication_recommended_doses";
create policy "global_medication_recommended_doses_select_authenticated"
  on "public"."global_medication_recommended_doses"
  for select
  to authenticated
  using (true);

drop policy if exists "global_medication_recommended_doses_insert_service_role" on "public"."global_medication_recommended_doses";
create policy "global_medication_recommended_doses_insert_service_role"
  on "public"."global_medication_recommended_doses"
  for insert
  to service_role
  with check (true);

drop policy if exists "global_medication_recommended_doses_update_service_role" on "public"."global_medication_recommended_doses";
create policy "global_medication_recommended_doses_update_service_role"
  on "public"."global_medication_recommended_doses"
  for update
  to service_role
  using (true)
  with check (true);

drop policy if exists "global_medication_recommended_doses_delete_service_role" on "public"."global_medication_recommended_doses";
create policy "global_medication_recommended_doses_delete_service_role"
  on "public"."global_medication_recommended_doses"
  for delete
  to service_role
  using (true);
