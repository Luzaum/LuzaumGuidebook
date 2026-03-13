create table if not exists "public"."global_protocols" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "name" text not null,
    "description" text,
    "species" text,
    "tags" text[] not null default '{}'::text[],
    "is_control_special" boolean not null default false,
    "exams_justification" text,
    "metadata" jsonb not null default '{}'::jsonb,
    "sort_order" integer not null default 0,
    "is_active" boolean not null default true,
    "source_protocol_id" uuid,
    "source_clinic_id" uuid,
    "published_by_user_id" uuid,
    "version" integer not null default 1,
    "status" text not null default 'published',
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    constraint "global_protocols_pkey" primary key ("id"),
    constraint "global_protocols_slug_key" unique ("slug")
);

create index if not exists "global_protocols_slug_idx" on "public"."global_protocols" ("slug");
create index if not exists "global_protocols_source_idx" on "public"."global_protocols" ("source_protocol_id", "source_clinic_id");
create index if not exists "global_protocols_active_idx" on "public"."global_protocols" ("is_active", "sort_order", "name");

alter table "public"."global_protocols" enable row level security;

create table if not exists "public"."global_protocol_medications" (
    "id" uuid not null default gen_random_uuid(),
    "global_protocol_id" uuid not null references "public"."global_protocols"("id") on delete cascade,
    "sort_order" integer not null default 0,
    "global_medication_id" uuid references "public"."global_medications"("id") on delete set null,
    "presentation_slug" text,
    "medication_id" uuid,
    "manual_medication_name" text,
    "manual_presentation_label" text,
    "concentration_value" numeric,
    "concentration_unit" text,
    "dose_value" numeric,
    "dose_unit" text,
    "route" text,
    "duration_days" integer,
    "duration_mode" text,
    "frequency_type" text,
    "times_per_day" integer,
    "interval_hours" integer,
    "is_controlled" boolean not null default false,
    "metadata" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    constraint "global_protocol_medications_pkey" primary key ("id")
);

create index if not exists "global_protocol_medications_protocol_idx" on "public"."global_protocol_medications" ("global_protocol_id", "sort_order");
create index if not exists "global_protocol_medications_global_med_idx" on "public"."global_protocol_medications" ("global_medication_id");

alter table "public"."global_protocol_medications" enable row level security;

create table if not exists "public"."global_protocol_recommendations" (
    "id" uuid not null default gen_random_uuid(),
    "global_protocol_id" uuid not null references "public"."global_protocols"("id") on delete cascade,
    "sort_order" integer not null default 0,
    "text" text not null,
    "metadata" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    constraint "global_protocol_recommendations_pkey" primary key ("id")
);

create index if not exists "global_protocol_recommendations_protocol_idx" on "public"."global_protocol_recommendations" ("global_protocol_id", "sort_order");

alter table "public"."global_protocol_recommendations" enable row level security;

create table if not exists "public"."global_protocol_exam_items" (
    "id" uuid not null default gen_random_uuid(),
    "global_protocol_id" uuid not null references "public"."global_protocols"("id") on delete cascade,
    "sort_order" integer not null default 0,
    "exam_key" text not null,
    "label" text not null,
    "is_custom" boolean not null default false,
    "metadata" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    constraint "global_protocol_exam_items_pkey" primary key ("id")
);

create index if not exists "global_protocol_exam_items_protocol_idx" on "public"."global_protocol_exam_items" ("global_protocol_id", "sort_order");

alter table "public"."global_protocol_exam_items" enable row level security;

drop policy if exists "global_protocols_select_authenticated" on "public"."global_protocols";
create policy "global_protocols_select_authenticated"
  on "public"."global_protocols"
  for select
  to authenticated
  using (true);

drop policy if exists "global_protocols_insert_service_role" on "public"."global_protocols";
create policy "global_protocols_insert_service_role"
  on "public"."global_protocols"
  for insert
  to service_role
  with check (true);

drop policy if exists "global_protocols_update_service_role" on "public"."global_protocols";
create policy "global_protocols_update_service_role"
  on "public"."global_protocols"
  for update
  to service_role
  using (true)
  with check (true);

drop policy if exists "global_protocols_delete_service_role" on "public"."global_protocols";
create policy "global_protocols_delete_service_role"
  on "public"."global_protocols"
  for delete
  to service_role
  using (true);

drop policy if exists "global_protocol_medications_select_authenticated" on "public"."global_protocol_medications";
create policy "global_protocol_medications_select_authenticated"
  on "public"."global_protocol_medications"
  for select
  to authenticated
  using (true);

drop policy if exists "global_protocol_medications_insert_service_role" on "public"."global_protocol_medications";
create policy "global_protocol_medications_insert_service_role"
  on "public"."global_protocol_medications"
  for insert
  to service_role
  with check (true);

drop policy if exists "global_protocol_medications_update_service_role" on "public"."global_protocol_medications";
create policy "global_protocol_medications_update_service_role"
  on "public"."global_protocol_medications"
  for update
  to service_role
  using (true)
  with check (true);

drop policy if exists "global_protocol_medications_delete_service_role" on "public"."global_protocol_medications";
create policy "global_protocol_medications_delete_service_role"
  on "public"."global_protocol_medications"
  for delete
  to service_role
  using (true);

drop policy if exists "global_protocol_recommendations_select_authenticated" on "public"."global_protocol_recommendations";
create policy "global_protocol_recommendations_select_authenticated"
  on "public"."global_protocol_recommendations"
  for select
  to authenticated
  using (true);

drop policy if exists "global_protocol_recommendations_insert_service_role" on "public"."global_protocol_recommendations";
create policy "global_protocol_recommendations_insert_service_role"
  on "public"."global_protocol_recommendations"
  for insert
  to service_role
  with check (true);

drop policy if exists "global_protocol_recommendations_update_service_role" on "public"."global_protocol_recommendations";
create policy "global_protocol_recommendations_update_service_role"
  on "public"."global_protocol_recommendations"
  for update
  to service_role
  using (true)
  with check (true);

drop policy if exists "global_protocol_recommendations_delete_service_role" on "public"."global_protocol_recommendations";
create policy "global_protocol_recommendations_delete_service_role"
  on "public"."global_protocol_recommendations"
  for delete
  to service_role
  using (true);

drop policy if exists "global_protocol_exam_items_select_authenticated" on "public"."global_protocol_exam_items";
create policy "global_protocol_exam_items_select_authenticated"
  on "public"."global_protocol_exam_items"
  for select
  to authenticated
  using (true);

drop policy if exists "global_protocol_exam_items_insert_service_role" on "public"."global_protocol_exam_items";
create policy "global_protocol_exam_items_insert_service_role"
  on "public"."global_protocol_exam_items"
  for insert
  to service_role
  with check (true);

drop policy if exists "global_protocol_exam_items_update_service_role" on "public"."global_protocol_exam_items";
create policy "global_protocol_exam_items_update_service_role"
  on "public"."global_protocol_exam_items"
  for update
  to service_role
  using (true)
  with check (true);

drop policy if exists "global_protocol_exam_items_delete_service_role" on "public"."global_protocol_exam_items";
create policy "global_protocol_exam_items_delete_service_role"
  on "public"."global_protocol_exam_items"
  for delete
  to service_role
  using (true);

drop trigger if exists "set_global_protocols_updated_at" on "public"."global_protocols";
create trigger "set_global_protocols_updated_at"
before update on "public"."global_protocols"
for each row execute function "public"."set_updated_at"();

drop trigger if exists "set_global_protocol_medications_updated_at" on "public"."global_protocol_medications";
create trigger "set_global_protocol_medications_updated_at"
before update on "public"."global_protocol_medications"
for each row execute function "public"."set_updated_at"();

drop trigger if exists "set_global_protocol_recommendations_updated_at" on "public"."global_protocol_recommendations";
create trigger "set_global_protocol_recommendations_updated_at"
before update on "public"."global_protocol_recommendations"
for each row execute function "public"."set_updated_at"();

drop trigger if exists "set_global_protocol_exam_items_updated_at" on "public"."global_protocol_exam_items";
create trigger "set_global_protocol_exam_items_updated_at"
before update on "public"."global_protocol_exam_items"
for each row execute function "public"."set_updated_at"();
