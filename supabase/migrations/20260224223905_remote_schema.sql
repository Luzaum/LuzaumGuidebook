drop extension if exists "pg_net";

create extension if not exists "pg_trgm" with schema "public";


  create table "public"."catalog_drugs" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "name" text not null,
    "route_group" text,
    "dose_unit" text,
    "controlled" boolean not null default false,
    "species_targets" text[] not null default '{}'::text[],
    "notes" text,
    "created_by" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."catalog_drugs" enable row level security;


  create table "public"."catalog_presentations" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "drug_id" uuid not null,
    "dosage_form" text,
    "concentration_text" text,
    "additional_component" text,
    "unit_label" text,
    "product_name" text,
    "value" numeric,
    "value_unit" text,
    "per_value" numeric,
    "per_unit_label" text,
    "per_unit" numeric,
    "avg_price" numeric,
    "pharmacy_tags" text[] not null default '{}'::text[],
    "created_by" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."catalog_presentations" enable row level security;


  create table "public"."medication_presentations" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "medication_id" uuid not null,
    "pharmaceutical_form" text,
    "concentration_text" text,
    "additional_component" text,
    "presentation_unit" text,
    "commercial_name" text,
    "value" numeric,
    "value_unit" text,
    "per_value" numeric default 1,
    "per_unit" text,
    "avg_price_brl" numeric,
    "pharmacy_veterinary" boolean not null default true,
    "pharmacy_human" boolean not null default false,
    "pharmacy_compounding" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "metadata" jsonb not null default '{}'::jsonb,
    "package_quantity" numeric,
    "package_unit" text
      );


alter table "public"."medication_presentations" enable row level security;


  create table "public"."medication_recommended_doses" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "medication_id" uuid not null,
    "species" text not null default 'ambos'::text,
    "route" text not null default 'VO'::text,
    "dose_value" numeric not null,
    "dose_unit" text not null,
    "frequency" text not null,
    "notes" text,
    "is_active" boolean not null default true,
    "sort_order" integer,
    "metadata" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."medication_recommended_doses" enable row level security;


  create table "public"."medications" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "created_by" uuid not null,
    "is_private" boolean not null default false,
    "owner_user_id" uuid,
    "name" text not null,
    "active_ingredient" text,
    "concentration" text,
    "pharmaceutical_form" text,
    "routes" text[],
    "species" text[],
    "is_controlled" boolean not null default false,
    "notes" text,
    "tags" text[],
    "metadata" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "is_active" boolean not null default true
      );


alter table "public"."medications" enable row level security;


  create table "public"."patient_weights" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "patient_id" uuid not null,
    "measured_at" date not null,
    "weight_kg" numeric not null,
    "notes" text,
    "created_by" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."patient_weights" enable row level security;


  create table "public"."patients" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "tutor_id" uuid not null,
    "name" text not null,
    "species" text,
    "breed" text,
    "sex" text,
    "neutered" boolean,
    "age_text" text,
    "weight_kg" numeric(6,2),
    "microchip" text,
    "coat" text,
    "notes" text,
    "created_by" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "last_weight_date" date,
    "anamnesis" text,
    "deleted_at" timestamp with time zone,
    "microchipped" boolean not null default false,
    "reproductive_condition" text,
    "microchip_number" text
      );


alter table "public"."patients" enable row level security;


  create table "public"."prescriptions" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "patient_id" uuid not null,
    "tutor_id" uuid not null,
    "content" jsonb not null,
    "status" text not null default 'draft'::text,
    "version" integer not null default 1,
    "created_by" uuid default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."prescriptions" enable row level security;


  create table "public"."protocol_exam_items" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "protocol_id" uuid not null,
    "exam_key" text not null,
    "label" text not null,
    "is_custom" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."protocol_exam_items" enable row level security;


  create table "public"."protocol_folders" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "owner_user_id" uuid not null,
    "name" text not null,
    "icon_key" text,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "color" text
      );


alter table "public"."protocol_folders" enable row level security;


  create table "public"."protocol_medications" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "protocol_id" uuid not null,
    "sort_order" integer not null default 0,
    "medication_id" uuid,
    "presentation_id" uuid,
    "concentration_value" numeric,
    "concentration_unit" text,
    "dose_value" numeric,
    "dose_unit" text,
    "route" text,
    "duration_days" integer,
    "frequency_type" text,
    "times_per_day" integer,
    "interval_hours" integer,
    "is_controlled" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "manual_medication_name" text,
    "manual_presentation_label" text
      );


alter table "public"."protocol_medications" enable row level security;


  create table "public"."protocol_recommendations" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "protocol_id" uuid not null,
    "sort_order" integer not null default 0,
    "text" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."protocol_recommendations" enable row level security;


  create table "public"."protocols" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "owner_user_id" uuid not null,
    "folder_id" uuid,
    "name" text not null,
    "description" text,
    "species" text,
    "duration_summary" text,
    "tags" text[] not null default '{}'::text[],
    "is_control_special" boolean not null default false,
    "exams_justification" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."protocols" enable row level security;


  create table "public"."tutors" (
    "id" uuid not null default gen_random_uuid(),
    "clinic_id" uuid not null,
    "full_name" text not null,
    "document_id" text,
    "email" text,
    "phone" text,
    "address" jsonb,
    "notes" text,
    "created_by" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "cpf" text,
    "rg" text,
    "street" text,
    "number" text,
    "neighborhood" text,
    "city" text,
    "state" text,
    "zipcode" text,
    "complement" text,
    "deleted_at" timestamp with time zone,
    "address_complement" text
      );


alter table "public"."tutors" enable row level security;

CREATE UNIQUE INDEX catalog_drugs_clinic_id_name_key ON public.catalog_drugs USING btree (clinic_id, name);

CREATE UNIQUE INDEX catalog_drugs_pkey ON public.catalog_drugs USING btree (id);

CREATE UNIQUE INDEX catalog_presentations_pkey ON public.catalog_presentations USING btree (id);

CREATE INDEX idx_catalog_drugs_clinic_name ON public.catalog_drugs USING btree (clinic_id, name);

CREATE INDEX idx_catalog_drugs_name_trgm ON public.catalog_drugs USING gin (name public.gin_trgm_ops);

CREATE INDEX idx_catalog_presentations_clinic_drug ON public.catalog_presentations USING btree (clinic_id, drug_id);

CREATE INDEX idx_catalog_presentations_drug ON public.catalog_presentations USING btree (drug_id);

CREATE INDEX idx_medication_presentations_package ON public.medication_presentations USING btree (package_quantity, package_unit) WHERE (package_quantity IS NOT NULL);

CREATE INDEX idx_mrd_clinic ON public.medication_recommended_doses USING btree (clinic_id);

CREATE INDEX idx_mrd_clinic_id ON public.medication_recommended_doses USING btree (clinic_id);

CREATE INDEX idx_mrd_med ON public.medication_recommended_doses USING btree (medication_id);

CREATE INDEX idx_mrd_medication_id ON public.medication_recommended_doses USING btree (medication_id);

CREATE INDEX idx_mrd_meta ON public.medication_recommended_doses USING gin (metadata);

CREATE INDEX idx_patient_weights_clinic_patient_date ON public.patient_weights USING btree (clinic_id, patient_id, measured_at DESC);

CREATE INDEX idx_patient_weights_patient_date ON public.patient_weights USING btree (patient_id, measured_at DESC);

CREATE INDEX idx_patients_clinic_id ON public.patients USING btree (clinic_id);

CREATE INDEX idx_patients_clinic_tutor ON public.patients USING btree (clinic_id, tutor_id);

CREATE INDEX idx_patients_deleted_at ON public.patients USING btree (deleted_at);

CREATE INDEX idx_patients_microchipped ON public.patients USING btree (microchipped) WHERE (microchipped = true);

CREATE INDEX idx_patients_name_trgm ON public.patients USING gin (name public.gin_trgm_ops);

CREATE INDEX idx_patients_reproductive_condition ON public.patients USING btree (reproductive_condition);

CREATE INDEX idx_patients_tutor_id ON public.patients USING btree (tutor_id);

CREATE INDEX idx_tutors_deleted_at ON public.tutors USING btree (deleted_at);

CREATE UNIQUE INDEX medication_presentations_pkey ON public.medication_presentations USING btree (id);

CREATE UNIQUE INDEX medication_recommended_doses_pkey ON public.medication_recommended_doses USING btree (id);

CREATE INDEX medications_clinic_id_idx ON public.medications USING btree (clinic_id);

CREATE INDEX medications_name_idx ON public.medications USING btree (name);

CREATE INDEX medications_name_trgm_idx ON public.medications USING gin (name public.gin_trgm_ops);

CREATE UNIQUE INDEX medications_pkey ON public.medications USING btree (id);

CREATE INDEX medpres_clinic_idx ON public.medication_presentations USING btree (clinic_id);

CREATE INDEX medpres_medication_idx ON public.medication_presentations USING btree (medication_id);

CREATE INDEX patient_weights_by_patient_date ON public.patient_weights USING btree (clinic_id, patient_id, measured_at DESC);

CREATE UNIQUE INDEX patient_weights_patient_id_measured_at_key ON public.patient_weights USING btree (patient_id, measured_at);

CREATE UNIQUE INDEX patient_weights_pkey ON public.patient_weights USING btree (id);

CREATE INDEX patients_clinic_id_idx ON public.patients USING btree (clinic_id);

CREATE INDEX patients_name_idx ON public.patients USING btree (name);

CREATE UNIQUE INDEX patients_pkey ON public.patients USING btree (id);

CREATE INDEX patients_tutor_id_idx ON public.patients USING btree (tutor_id);

CREATE UNIQUE INDEX prescriptions_pkey ON public.prescriptions USING btree (id);

CREATE UNIQUE INDEX protocol_exam_items_pkey ON public.protocol_exam_items USING btree (id);

CREATE INDEX protocol_exams_protocol_idx ON public.protocol_exam_items USING btree (protocol_id);

CREATE INDEX protocol_folders_clinic_idx ON public.protocol_folders USING btree (clinic_id);

CREATE INDEX protocol_folders_owner_idx ON public.protocol_folders USING btree (owner_user_id);

CREATE UNIQUE INDEX protocol_folders_pkey ON public.protocol_folders USING btree (id);

CREATE UNIQUE INDEX protocol_medications_pkey ON public.protocol_medications USING btree (id);

CREATE INDEX protocol_meds_clinic_idx ON public.protocol_medications USING btree (clinic_id);

CREATE INDEX protocol_meds_protocol_idx ON public.protocol_medications USING btree (protocol_id);

CREATE UNIQUE INDEX protocol_recommendations_pkey ON public.protocol_recommendations USING btree (id);

CREATE INDEX protocol_recs_protocol_idx ON public.protocol_recommendations USING btree (protocol_id);

CREATE INDEX protocols_clinic_idx ON public.protocols USING btree (clinic_id);

CREATE INDEX protocols_folder_idx ON public.protocols USING btree (folder_id);

CREATE INDEX protocols_owner_idx ON public.protocols USING btree (owner_user_id);

CREATE UNIQUE INDEX protocols_pkey ON public.protocols USING btree (id);

CREATE INDEX tutors_clinic_id_idx ON public.tutors USING btree (clinic_id);

CREATE INDEX tutors_email_idx ON public.tutors USING btree (email);

CREATE INDEX tutors_full_name_idx ON public.tutors USING btree (full_name);

CREATE UNIQUE INDEX tutors_pkey ON public.tutors USING btree (id);

alter table "public"."catalog_drugs" add constraint "catalog_drugs_pkey" PRIMARY KEY using index "catalog_drugs_pkey";

alter table "public"."catalog_presentations" add constraint "catalog_presentations_pkey" PRIMARY KEY using index "catalog_presentations_pkey";

alter table "public"."medication_presentations" add constraint "medication_presentations_pkey" PRIMARY KEY using index "medication_presentations_pkey";

alter table "public"."medication_recommended_doses" add constraint "medication_recommended_doses_pkey" PRIMARY KEY using index "medication_recommended_doses_pkey";

alter table "public"."medications" add constraint "medications_pkey" PRIMARY KEY using index "medications_pkey";

alter table "public"."patient_weights" add constraint "patient_weights_pkey" PRIMARY KEY using index "patient_weights_pkey";

alter table "public"."patients" add constraint "patients_pkey" PRIMARY KEY using index "patients_pkey";

alter table "public"."prescriptions" add constraint "prescriptions_pkey" PRIMARY KEY using index "prescriptions_pkey";

alter table "public"."protocol_exam_items" add constraint "protocol_exam_items_pkey" PRIMARY KEY using index "protocol_exam_items_pkey";

alter table "public"."protocol_folders" add constraint "protocol_folders_pkey" PRIMARY KEY using index "protocol_folders_pkey";

alter table "public"."protocol_medications" add constraint "protocol_medications_pkey" PRIMARY KEY using index "protocol_medications_pkey";

alter table "public"."protocol_recommendations" add constraint "protocol_recommendations_pkey" PRIMARY KEY using index "protocol_recommendations_pkey";

alter table "public"."protocols" add constraint "protocols_pkey" PRIMARY KEY using index "protocols_pkey";

alter table "public"."tutors" add constraint "tutors_pkey" PRIMARY KEY using index "tutors_pkey";

alter table "public"."catalog_drugs" add constraint "catalog_drugs_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."catalog_drugs" validate constraint "catalog_drugs_clinic_id_fkey";

alter table "public"."catalog_drugs" add constraint "catalog_drugs_clinic_id_name_key" UNIQUE using index "catalog_drugs_clinic_id_name_key";

alter table "public"."catalog_drugs" add constraint "catalog_drugs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."catalog_drugs" validate constraint "catalog_drugs_created_by_fkey";

alter table "public"."catalog_presentations" add constraint "catalog_presentations_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."catalog_presentations" validate constraint "catalog_presentations_clinic_id_fkey";

alter table "public"."catalog_presentations" add constraint "catalog_presentations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."catalog_presentations" validate constraint "catalog_presentations_created_by_fkey";

alter table "public"."catalog_presentations" add constraint "catalog_presentations_drug_id_fkey" FOREIGN KEY (drug_id) REFERENCES public.catalog_drugs(id) ON DELETE CASCADE not valid;

alter table "public"."catalog_presentations" validate constraint "catalog_presentations_drug_id_fkey";

alter table "public"."medication_presentations" add constraint "medication_presentations_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."medication_presentations" validate constraint "medication_presentations_clinic_id_fkey";

alter table "public"."medication_presentations" add constraint "medication_presentations_medication_id_fkey" FOREIGN KEY (medication_id) REFERENCES public.medications(id) ON DELETE CASCADE not valid;

alter table "public"."medication_presentations" validate constraint "medication_presentations_medication_id_fkey";

alter table "public"."medication_presentations" add constraint "medpres_nonnegative_check" CHECK ((((value IS NULL) OR (value >= (0)::numeric)) AND ((avg_price_brl IS NULL) OR (avg_price_brl >= (0)::numeric)) AND ((per_value IS NULL) OR (per_value > (0)::numeric)))) not valid;

alter table "public"."medication_presentations" validate constraint "medpres_nonnegative_check";

alter table "public"."medication_recommended_doses" add constraint "medication_recommended_doses_medication_id_fkey" FOREIGN KEY (medication_id) REFERENCES public.medications(id) ON DELETE CASCADE not valid;

alter table "public"."medication_recommended_doses" validate constraint "medication_recommended_doses_medication_id_fkey";

alter table "public"."medications" add constraint "medications_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."medications" validate constraint "medications_clinic_id_fkey";

alter table "public"."medications" add constraint "medications_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."medications" validate constraint "medications_created_by_fkey";

alter table "public"."medications" add constraint "medications_owner_user_id_fkey" FOREIGN KEY (owner_user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."medications" validate constraint "medications_owner_user_id_fkey";

alter table "public"."medications" add constraint "medications_private_owner_check" CHECK ((((is_private = false) AND (owner_user_id IS NULL)) OR ((is_private = true) AND (owner_user_id IS NOT NULL)))) not valid;

alter table "public"."medications" validate constraint "medications_private_owner_check";

alter table "public"."patient_weights" add constraint "patient_weights_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."patient_weights" validate constraint "patient_weights_clinic_id_fkey";

alter table "public"."patient_weights" add constraint "patient_weights_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."patient_weights" validate constraint "patient_weights_created_by_fkey";

alter table "public"."patient_weights" add constraint "patient_weights_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE not valid;

alter table "public"."patient_weights" validate constraint "patient_weights_patient_id_fkey";

alter table "public"."patient_weights" add constraint "patient_weights_patient_id_measured_at_key" UNIQUE using index "patient_weights_patient_id_measured_at_key";

alter table "public"."patients" add constraint "patients_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."patients" validate constraint "patients_clinic_id_fkey";

alter table "public"."patients" add constraint "patients_tutor_id_fkey" FOREIGN KEY (tutor_id) REFERENCES public.tutors(id) ON DELETE CASCADE not valid;

alter table "public"."patients" validate constraint "patients_tutor_id_fkey";

alter table "public"."prescriptions" add constraint "prescriptions_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."prescriptions" validate constraint "prescriptions_clinic_id_fkey";

alter table "public"."prescriptions" add constraint "prescriptions_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE RESTRICT not valid;

alter table "public"."prescriptions" validate constraint "prescriptions_patient_id_fkey";

alter table "public"."prescriptions" add constraint "prescriptions_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'signed'::text, 'void'::text]))) not valid;

alter table "public"."prescriptions" validate constraint "prescriptions_status_check";

alter table "public"."prescriptions" add constraint "prescriptions_tutor_id_fkey" FOREIGN KEY (tutor_id) REFERENCES public.tutors(id) ON DELETE RESTRICT not valid;

alter table "public"."prescriptions" validate constraint "prescriptions_tutor_id_fkey";

alter table "public"."prescriptions" add constraint "prescriptions_version_check" CHECK ((version >= 1)) not valid;

alter table "public"."prescriptions" validate constraint "prescriptions_version_check";

alter table "public"."protocol_exam_items" add constraint "protocol_exam_items_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."protocol_exam_items" validate constraint "protocol_exam_items_clinic_id_fkey";

alter table "public"."protocol_exam_items" add constraint "protocol_exam_items_protocol_id_fkey" FOREIGN KEY (protocol_id) REFERENCES public.protocols(id) ON DELETE CASCADE not valid;

alter table "public"."protocol_exam_items" validate constraint "protocol_exam_items_protocol_id_fkey";

alter table "public"."protocol_folders" add constraint "protocol_folders_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."protocol_folders" validate constraint "protocol_folders_clinic_id_fkey";

alter table "public"."protocol_folders" add constraint "protocol_folders_owner_user_id_fkey" FOREIGN KEY (owner_user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."protocol_folders" validate constraint "protocol_folders_owner_user_id_fkey";

alter table "public"."protocol_medications" add constraint "protocol_medications_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."protocol_medications" validate constraint "protocol_medications_clinic_id_fkey";

alter table "public"."protocol_medications" add constraint "protocol_medications_medication_id_fkey" FOREIGN KEY (medication_id) REFERENCES public.medications(id) ON DELETE SET NULL not valid;

alter table "public"."protocol_medications" validate constraint "protocol_medications_medication_id_fkey";

alter table "public"."protocol_medications" add constraint "protocol_medications_presentation_id_fkey" FOREIGN KEY (presentation_id) REFERENCES public.medication_presentations(id) ON DELETE SET NULL not valid;

alter table "public"."protocol_medications" validate constraint "protocol_medications_presentation_id_fkey";

alter table "public"."protocol_medications" add constraint "protocol_medications_protocol_id_fkey" FOREIGN KEY (protocol_id) REFERENCES public.protocols(id) ON DELETE CASCADE not valid;

alter table "public"."protocol_medications" validate constraint "protocol_medications_protocol_id_fkey";

alter table "public"."protocol_recommendations" add constraint "protocol_recommendations_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."protocol_recommendations" validate constraint "protocol_recommendations_clinic_id_fkey";

alter table "public"."protocol_recommendations" add constraint "protocol_recommendations_protocol_id_fkey" FOREIGN KEY (protocol_id) REFERENCES public.protocols(id) ON DELETE CASCADE not valid;

alter table "public"."protocol_recommendations" validate constraint "protocol_recommendations_protocol_id_fkey";

alter table "public"."protocols" add constraint "protocols_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."protocols" validate constraint "protocols_clinic_id_fkey";

alter table "public"."protocols" add constraint "protocols_folder_id_fkey" FOREIGN KEY (folder_id) REFERENCES public.protocol_folders(id) ON DELETE SET NULL not valid;

alter table "public"."protocols" validate constraint "protocols_folder_id_fkey";

alter table "public"."protocols" add constraint "protocols_owner_user_id_fkey" FOREIGN KEY (owner_user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."protocols" validate constraint "protocols_owner_user_id_fkey";

alter table "public"."tutors" add constraint "tutors_clinic_id_fkey" FOREIGN KEY (clinic_id) REFERENCES public.clinics(id) ON DELETE CASCADE not valid;

alter table "public"."tutors" validate constraint "tutors_clinic_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.ensure_patient_tutor_same_clinic()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
  tutor_clinic uuid;
begin
  select clinic_id into tutor_clinic from public.tutors where id = new.tutor_id;
  if tutor_clinic is null then
    raise exception 'Tutor inválido';
  end if;

  if tutor_clinic <> new.clinic_id then
    raise exception 'Tutor e Paciente devem pertencer à mesma clínica';
  end if;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

grant delete on table "public"."catalog_drugs" to "anon";

grant insert on table "public"."catalog_drugs" to "anon";

grant references on table "public"."catalog_drugs" to "anon";

grant select on table "public"."catalog_drugs" to "anon";

grant trigger on table "public"."catalog_drugs" to "anon";

grant truncate on table "public"."catalog_drugs" to "anon";

grant update on table "public"."catalog_drugs" to "anon";

grant delete on table "public"."catalog_drugs" to "authenticated";

grant insert on table "public"."catalog_drugs" to "authenticated";

grant references on table "public"."catalog_drugs" to "authenticated";

grant select on table "public"."catalog_drugs" to "authenticated";

grant trigger on table "public"."catalog_drugs" to "authenticated";

grant truncate on table "public"."catalog_drugs" to "authenticated";

grant update on table "public"."catalog_drugs" to "authenticated";

grant delete on table "public"."catalog_drugs" to "service_role";

grant insert on table "public"."catalog_drugs" to "service_role";

grant references on table "public"."catalog_drugs" to "service_role";

grant select on table "public"."catalog_drugs" to "service_role";

grant trigger on table "public"."catalog_drugs" to "service_role";

grant truncate on table "public"."catalog_drugs" to "service_role";

grant update on table "public"."catalog_drugs" to "service_role";

grant delete on table "public"."catalog_presentations" to "anon";

grant insert on table "public"."catalog_presentations" to "anon";

grant references on table "public"."catalog_presentations" to "anon";

grant select on table "public"."catalog_presentations" to "anon";

grant trigger on table "public"."catalog_presentations" to "anon";

grant truncate on table "public"."catalog_presentations" to "anon";

grant update on table "public"."catalog_presentations" to "anon";

grant delete on table "public"."catalog_presentations" to "authenticated";

grant insert on table "public"."catalog_presentations" to "authenticated";

grant references on table "public"."catalog_presentations" to "authenticated";

grant select on table "public"."catalog_presentations" to "authenticated";

grant trigger on table "public"."catalog_presentations" to "authenticated";

grant truncate on table "public"."catalog_presentations" to "authenticated";

grant update on table "public"."catalog_presentations" to "authenticated";

grant delete on table "public"."catalog_presentations" to "service_role";

grant insert on table "public"."catalog_presentations" to "service_role";

grant references on table "public"."catalog_presentations" to "service_role";

grant select on table "public"."catalog_presentations" to "service_role";

grant trigger on table "public"."catalog_presentations" to "service_role";

grant truncate on table "public"."catalog_presentations" to "service_role";

grant update on table "public"."catalog_presentations" to "service_role";

grant delete on table "public"."medication_presentations" to "anon";

grant insert on table "public"."medication_presentations" to "anon";

grant references on table "public"."medication_presentations" to "anon";

grant select on table "public"."medication_presentations" to "anon";

grant trigger on table "public"."medication_presentations" to "anon";

grant truncate on table "public"."medication_presentations" to "anon";

grant update on table "public"."medication_presentations" to "anon";

grant delete on table "public"."medication_presentations" to "authenticated";

grant insert on table "public"."medication_presentations" to "authenticated";

grant references on table "public"."medication_presentations" to "authenticated";

grant select on table "public"."medication_presentations" to "authenticated";

grant trigger on table "public"."medication_presentations" to "authenticated";

grant truncate on table "public"."medication_presentations" to "authenticated";

grant update on table "public"."medication_presentations" to "authenticated";

grant delete on table "public"."medication_presentations" to "service_role";

grant insert on table "public"."medication_presentations" to "service_role";

grant references on table "public"."medication_presentations" to "service_role";

grant select on table "public"."medication_presentations" to "service_role";

grant trigger on table "public"."medication_presentations" to "service_role";

grant truncate on table "public"."medication_presentations" to "service_role";

grant update on table "public"."medication_presentations" to "service_role";

grant delete on table "public"."medication_recommended_doses" to "anon";

grant insert on table "public"."medication_recommended_doses" to "anon";

grant references on table "public"."medication_recommended_doses" to "anon";

grant select on table "public"."medication_recommended_doses" to "anon";

grant trigger on table "public"."medication_recommended_doses" to "anon";

grant truncate on table "public"."medication_recommended_doses" to "anon";

grant update on table "public"."medication_recommended_doses" to "anon";

grant delete on table "public"."medication_recommended_doses" to "authenticated";

grant insert on table "public"."medication_recommended_doses" to "authenticated";

grant references on table "public"."medication_recommended_doses" to "authenticated";

grant select on table "public"."medication_recommended_doses" to "authenticated";

grant trigger on table "public"."medication_recommended_doses" to "authenticated";

grant truncate on table "public"."medication_recommended_doses" to "authenticated";

grant update on table "public"."medication_recommended_doses" to "authenticated";

grant delete on table "public"."medication_recommended_doses" to "service_role";

grant insert on table "public"."medication_recommended_doses" to "service_role";

grant references on table "public"."medication_recommended_doses" to "service_role";

grant select on table "public"."medication_recommended_doses" to "service_role";

grant trigger on table "public"."medication_recommended_doses" to "service_role";

grant truncate on table "public"."medication_recommended_doses" to "service_role";

grant update on table "public"."medication_recommended_doses" to "service_role";

grant delete on table "public"."medications" to "anon";

grant insert on table "public"."medications" to "anon";

grant references on table "public"."medications" to "anon";

grant select on table "public"."medications" to "anon";

grant trigger on table "public"."medications" to "anon";

grant truncate on table "public"."medications" to "anon";

grant update on table "public"."medications" to "anon";

grant delete on table "public"."medications" to "authenticated";

grant insert on table "public"."medications" to "authenticated";

grant references on table "public"."medications" to "authenticated";

grant select on table "public"."medications" to "authenticated";

grant trigger on table "public"."medications" to "authenticated";

grant truncate on table "public"."medications" to "authenticated";

grant update on table "public"."medications" to "authenticated";

grant delete on table "public"."medications" to "service_role";

grant insert on table "public"."medications" to "service_role";

grant references on table "public"."medications" to "service_role";

grant select on table "public"."medications" to "service_role";

grant trigger on table "public"."medications" to "service_role";

grant truncate on table "public"."medications" to "service_role";

grant update on table "public"."medications" to "service_role";

grant delete on table "public"."patient_weights" to "anon";

grant insert on table "public"."patient_weights" to "anon";

grant references on table "public"."patient_weights" to "anon";

grant select on table "public"."patient_weights" to "anon";

grant trigger on table "public"."patient_weights" to "anon";

grant truncate on table "public"."patient_weights" to "anon";

grant update on table "public"."patient_weights" to "anon";

grant delete on table "public"."patient_weights" to "authenticated";

grant insert on table "public"."patient_weights" to "authenticated";

grant references on table "public"."patient_weights" to "authenticated";

grant select on table "public"."patient_weights" to "authenticated";

grant trigger on table "public"."patient_weights" to "authenticated";

grant truncate on table "public"."patient_weights" to "authenticated";

grant update on table "public"."patient_weights" to "authenticated";

grant delete on table "public"."patient_weights" to "service_role";

grant insert on table "public"."patient_weights" to "service_role";

grant references on table "public"."patient_weights" to "service_role";

grant select on table "public"."patient_weights" to "service_role";

grant trigger on table "public"."patient_weights" to "service_role";

grant truncate on table "public"."patient_weights" to "service_role";

grant update on table "public"."patient_weights" to "service_role";

grant delete on table "public"."patients" to "anon";

grant insert on table "public"."patients" to "anon";

grant references on table "public"."patients" to "anon";

grant select on table "public"."patients" to "anon";

grant trigger on table "public"."patients" to "anon";

grant truncate on table "public"."patients" to "anon";

grant update on table "public"."patients" to "anon";

grant delete on table "public"."patients" to "authenticated";

grant insert on table "public"."patients" to "authenticated";

grant references on table "public"."patients" to "authenticated";

grant select on table "public"."patients" to "authenticated";

grant trigger on table "public"."patients" to "authenticated";

grant truncate on table "public"."patients" to "authenticated";

grant update on table "public"."patients" to "authenticated";

grant delete on table "public"."patients" to "service_role";

grant insert on table "public"."patients" to "service_role";

grant references on table "public"."patients" to "service_role";

grant select on table "public"."patients" to "service_role";

grant trigger on table "public"."patients" to "service_role";

grant truncate on table "public"."patients" to "service_role";

grant update on table "public"."patients" to "service_role";

grant delete on table "public"."prescriptions" to "anon";

grant insert on table "public"."prescriptions" to "anon";

grant references on table "public"."prescriptions" to "anon";

grant select on table "public"."prescriptions" to "anon";

grant trigger on table "public"."prescriptions" to "anon";

grant truncate on table "public"."prescriptions" to "anon";

grant update on table "public"."prescriptions" to "anon";

grant delete on table "public"."prescriptions" to "authenticated";

grant insert on table "public"."prescriptions" to "authenticated";

grant references on table "public"."prescriptions" to "authenticated";

grant select on table "public"."prescriptions" to "authenticated";

grant trigger on table "public"."prescriptions" to "authenticated";

grant truncate on table "public"."prescriptions" to "authenticated";

grant update on table "public"."prescriptions" to "authenticated";

grant delete on table "public"."prescriptions" to "service_role";

grant insert on table "public"."prescriptions" to "service_role";

grant references on table "public"."prescriptions" to "service_role";

grant select on table "public"."prescriptions" to "service_role";

grant trigger on table "public"."prescriptions" to "service_role";

grant truncate on table "public"."prescriptions" to "service_role";

grant update on table "public"."prescriptions" to "service_role";

grant delete on table "public"."protocol_exam_items" to "anon";

grant insert on table "public"."protocol_exam_items" to "anon";

grant references on table "public"."protocol_exam_items" to "anon";

grant select on table "public"."protocol_exam_items" to "anon";

grant trigger on table "public"."protocol_exam_items" to "anon";

grant truncate on table "public"."protocol_exam_items" to "anon";

grant update on table "public"."protocol_exam_items" to "anon";

grant delete on table "public"."protocol_exam_items" to "authenticated";

grant insert on table "public"."protocol_exam_items" to "authenticated";

grant references on table "public"."protocol_exam_items" to "authenticated";

grant select on table "public"."protocol_exam_items" to "authenticated";

grant trigger on table "public"."protocol_exam_items" to "authenticated";

grant truncate on table "public"."protocol_exam_items" to "authenticated";

grant update on table "public"."protocol_exam_items" to "authenticated";

grant delete on table "public"."protocol_exam_items" to "service_role";

grant insert on table "public"."protocol_exam_items" to "service_role";

grant references on table "public"."protocol_exam_items" to "service_role";

grant select on table "public"."protocol_exam_items" to "service_role";

grant trigger on table "public"."protocol_exam_items" to "service_role";

grant truncate on table "public"."protocol_exam_items" to "service_role";

grant update on table "public"."protocol_exam_items" to "service_role";

grant delete on table "public"."protocol_folders" to "anon";

grant insert on table "public"."protocol_folders" to "anon";

grant references on table "public"."protocol_folders" to "anon";

grant select on table "public"."protocol_folders" to "anon";

grant trigger on table "public"."protocol_folders" to "anon";

grant truncate on table "public"."protocol_folders" to "anon";

grant update on table "public"."protocol_folders" to "anon";

grant delete on table "public"."protocol_folders" to "authenticated";

grant insert on table "public"."protocol_folders" to "authenticated";

grant references on table "public"."protocol_folders" to "authenticated";

grant select on table "public"."protocol_folders" to "authenticated";

grant trigger on table "public"."protocol_folders" to "authenticated";

grant truncate on table "public"."protocol_folders" to "authenticated";

grant update on table "public"."protocol_folders" to "authenticated";

grant delete on table "public"."protocol_folders" to "service_role";

grant insert on table "public"."protocol_folders" to "service_role";

grant references on table "public"."protocol_folders" to "service_role";

grant select on table "public"."protocol_folders" to "service_role";

grant trigger on table "public"."protocol_folders" to "service_role";

grant truncate on table "public"."protocol_folders" to "service_role";

grant update on table "public"."protocol_folders" to "service_role";

grant delete on table "public"."protocol_medications" to "anon";

grant insert on table "public"."protocol_medications" to "anon";

grant references on table "public"."protocol_medications" to "anon";

grant select on table "public"."protocol_medications" to "anon";

grant trigger on table "public"."protocol_medications" to "anon";

grant truncate on table "public"."protocol_medications" to "anon";

grant update on table "public"."protocol_medications" to "anon";

grant delete on table "public"."protocol_medications" to "authenticated";

grant insert on table "public"."protocol_medications" to "authenticated";

grant references on table "public"."protocol_medications" to "authenticated";

grant select on table "public"."protocol_medications" to "authenticated";

grant trigger on table "public"."protocol_medications" to "authenticated";

grant truncate on table "public"."protocol_medications" to "authenticated";

grant update on table "public"."protocol_medications" to "authenticated";

grant delete on table "public"."protocol_medications" to "service_role";

grant insert on table "public"."protocol_medications" to "service_role";

grant references on table "public"."protocol_medications" to "service_role";

grant select on table "public"."protocol_medications" to "service_role";

grant trigger on table "public"."protocol_medications" to "service_role";

grant truncate on table "public"."protocol_medications" to "service_role";

grant update on table "public"."protocol_medications" to "service_role";

grant delete on table "public"."protocol_recommendations" to "anon";

grant insert on table "public"."protocol_recommendations" to "anon";

grant references on table "public"."protocol_recommendations" to "anon";

grant select on table "public"."protocol_recommendations" to "anon";

grant trigger on table "public"."protocol_recommendations" to "anon";

grant truncate on table "public"."protocol_recommendations" to "anon";

grant update on table "public"."protocol_recommendations" to "anon";

grant delete on table "public"."protocol_recommendations" to "authenticated";

grant insert on table "public"."protocol_recommendations" to "authenticated";

grant references on table "public"."protocol_recommendations" to "authenticated";

grant select on table "public"."protocol_recommendations" to "authenticated";

grant trigger on table "public"."protocol_recommendations" to "authenticated";

grant truncate on table "public"."protocol_recommendations" to "authenticated";

grant update on table "public"."protocol_recommendations" to "authenticated";

grant delete on table "public"."protocol_recommendations" to "service_role";

grant insert on table "public"."protocol_recommendations" to "service_role";

grant references on table "public"."protocol_recommendations" to "service_role";

grant select on table "public"."protocol_recommendations" to "service_role";

grant trigger on table "public"."protocol_recommendations" to "service_role";

grant truncate on table "public"."protocol_recommendations" to "service_role";

grant update on table "public"."protocol_recommendations" to "service_role";

grant delete on table "public"."protocols" to "anon";

grant insert on table "public"."protocols" to "anon";

grant references on table "public"."protocols" to "anon";

grant select on table "public"."protocols" to "anon";

grant trigger on table "public"."protocols" to "anon";

grant truncate on table "public"."protocols" to "anon";

grant update on table "public"."protocols" to "anon";

grant delete on table "public"."protocols" to "authenticated";

grant insert on table "public"."protocols" to "authenticated";

grant references on table "public"."protocols" to "authenticated";

grant select on table "public"."protocols" to "authenticated";

grant trigger on table "public"."protocols" to "authenticated";

grant truncate on table "public"."protocols" to "authenticated";

grant update on table "public"."protocols" to "authenticated";

grant delete on table "public"."protocols" to "service_role";

grant insert on table "public"."protocols" to "service_role";

grant references on table "public"."protocols" to "service_role";

grant select on table "public"."protocols" to "service_role";

grant trigger on table "public"."protocols" to "service_role";

grant truncate on table "public"."protocols" to "service_role";

grant update on table "public"."protocols" to "service_role";

grant delete on table "public"."tutors" to "anon";

grant insert on table "public"."tutors" to "anon";

grant references on table "public"."tutors" to "anon";

grant select on table "public"."tutors" to "anon";

grant trigger on table "public"."tutors" to "anon";

grant truncate on table "public"."tutors" to "anon";

grant update on table "public"."tutors" to "anon";

grant delete on table "public"."tutors" to "authenticated";

grant insert on table "public"."tutors" to "authenticated";

grant references on table "public"."tutors" to "authenticated";

grant select on table "public"."tutors" to "authenticated";

grant trigger on table "public"."tutors" to "authenticated";

grant truncate on table "public"."tutors" to "authenticated";

grant update on table "public"."tutors" to "authenticated";

grant delete on table "public"."tutors" to "service_role";

grant insert on table "public"."tutors" to "service_role";

grant references on table "public"."tutors" to "service_role";

grant select on table "public"."tutors" to "service_role";

grant trigger on table "public"."tutors" to "service_role";

grant truncate on table "public"."tutors" to "service_role";

grant update on table "public"."tutors" to "service_role";


  create policy "catalog_drugs_delete"
  on "public"."catalog_drugs"
  as permissive
  for delete
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "catalog_drugs_insert"
  on "public"."catalog_drugs"
  as permissive
  for insert
  to authenticated
with check (public.is_member_of_clinic(clinic_id));



  create policy "catalog_drugs_select"
  on "public"."catalog_drugs"
  as permissive
  for select
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "catalog_drugs_update"
  on "public"."catalog_drugs"
  as permissive
  for update
  to authenticated
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));



  create policy "catalog_presentations_delete"
  on "public"."catalog_presentations"
  as permissive
  for delete
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "catalog_presentations_insert"
  on "public"."catalog_presentations"
  as permissive
  for insert
  to authenticated
with check (public.is_member_of_clinic(clinic_id));



  create policy "catalog_presentations_select"
  on "public"."catalog_presentations"
  as permissive
  for select
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "catalog_presentations_update"
  on "public"."catalog_presentations"
  as permissive
  for update
  to authenticated
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));



  create policy "medpres_delete"
  on "public"."medication_presentations"
  as permissive
  for delete
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "medpres_insert"
  on "public"."medication_presentations"
  as permissive
  for insert
  to public
with check (public.is_member_of_clinic(clinic_id));



  create policy "medpres_select"
  on "public"."medication_presentations"
  as permissive
  for select
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "medpres_update"
  on "public"."medication_presentations"
  as permissive
  for update
  to public
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));



  create policy "mrd_delete"
  on "public"."medication_recommended_doses"
  as permissive
  for delete
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "mrd_insert"
  on "public"."medication_recommended_doses"
  as permissive
  for insert
  to public
with check (public.is_member_of_clinic(clinic_id));



  create policy "mrd_select"
  on "public"."medication_recommended_doses"
  as permissive
  for select
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "mrd_update"
  on "public"."medication_recommended_doses"
  as permissive
  for update
  to public
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));



  create policy "medications_delete"
  on "public"."medications"
  as permissive
  for delete
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "medications_insert"
  on "public"."medications"
  as permissive
  for insert
  to public
with check ((public.is_member_of_clinic(clinic_id) AND (created_by = auth.uid())));



  create policy "medications_select"
  on "public"."medications"
  as permissive
  for select
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "medications_update"
  on "public"."medications"
  as permissive
  for update
  to public
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));



  create policy "patient_weights_delete"
  on "public"."patient_weights"
  as permissive
  for delete
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "patient_weights_delete_member"
  on "public"."patient_weights"
  as permissive
  for delete
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "patient_weights_insert"
  on "public"."patient_weights"
  as permissive
  for insert
  to authenticated
with check (public.is_member_of_clinic(clinic_id));



  create policy "patient_weights_select"
  on "public"."patient_weights"
  as permissive
  for select
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "patient_weights_update"
  on "public"."patient_weights"
  as permissive
  for update
  to authenticated
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));



  create policy "patients_delete"
  on "public"."patients"
  as permissive
  for delete
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "patients_delete_member"
  on "public"."patients"
  as permissive
  for delete
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "patients_insert"
  on "public"."patients"
  as permissive
  for insert
  to public
with check ((public.is_member_of_clinic(clinic_id) AND (created_by = auth.uid())));



  create policy "patients_select"
  on "public"."patients"
  as permissive
  for select
  to public
using ((public.is_member_of_clinic(clinic_id) AND (deleted_at IS NULL)));



  create policy "patients_update"
  on "public"."patients"
  as permissive
  for update
  to public
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));



  create policy "prescriptions_delete"
  on "public"."prescriptions"
  as permissive
  for delete
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "prescriptions_insert"
  on "public"."prescriptions"
  as permissive
  for insert
  to authenticated
with check (public.is_member_of_clinic(clinic_id));



  create policy "prescriptions_select"
  on "public"."prescriptions"
  as permissive
  for select
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "prescriptions_update"
  on "public"."prescriptions"
  as permissive
  for update
  to authenticated
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));



  create policy "pe_delete"
  on "public"."protocol_exam_items"
  as permissive
  for delete
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_exam_items.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pe_insert"
  on "public"."protocol_exam_items"
  as permissive
  for insert
  to public
with check ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_exam_items.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pe_select"
  on "public"."protocol_exam_items"
  as permissive
  for select
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_exam_items.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pe_update"
  on "public"."protocol_exam_items"
  as permissive
  for update
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_exam_items.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))))
with check ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_exam_items.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pf_delete"
  on "public"."protocol_folders"
  as permissive
  for delete
  to public
using ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())));



  create policy "pf_insert"
  on "public"."protocol_folders"
  as permissive
  for insert
  to public
with check ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())));



  create policy "pf_select"
  on "public"."protocol_folders"
  as permissive
  for select
  to public
using ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())));



  create policy "pf_update"
  on "public"."protocol_folders"
  as permissive
  for update
  to public
using ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())))
with check ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())));



  create policy "pm_delete"
  on "public"."protocol_medications"
  as permissive
  for delete
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_medications.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pm_insert"
  on "public"."protocol_medications"
  as permissive
  for insert
  to public
with check ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_medications.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pm_select"
  on "public"."protocol_medications"
  as permissive
  for select
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_medications.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pm_update"
  on "public"."protocol_medications"
  as permissive
  for update
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_medications.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))))
with check ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_medications.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pr_delete"
  on "public"."protocol_recommendations"
  as permissive
  for delete
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_recommendations.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pr_insert"
  on "public"."protocol_recommendations"
  as permissive
  for insert
  to public
with check ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_recommendations.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pr_select"
  on "public"."protocol_recommendations"
  as permissive
  for select
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_recommendations.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "pr_update"
  on "public"."protocol_recommendations"
  as permissive
  for update
  to public
using ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_recommendations.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))))
with check ((public.is_member_of_clinic(clinic_id) AND (EXISTS ( SELECT 1
   FROM public.protocols p
  WHERE ((p.id = protocol_recommendations.protocol_id) AND (p.owner_user_id = auth.uid()) AND (p.clinic_id = p.clinic_id))))));



  create policy "p_delete"
  on "public"."protocols"
  as permissive
  for delete
  to public
using ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())));



  create policy "p_insert"
  on "public"."protocols"
  as permissive
  for insert
  to public
with check ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())));



  create policy "p_select"
  on "public"."protocols"
  as permissive
  for select
  to public
using ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())));



  create policy "p_update"
  on "public"."protocols"
  as permissive
  for update
  to public
using ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())))
with check ((public.is_member_of_clinic(clinic_id) AND (owner_user_id = auth.uid())));



  create policy "tutors_delete"
  on "public"."tutors"
  as permissive
  for delete
  to authenticated
using (public.is_member_of_clinic(clinic_id));



  create policy "tutors_delete_member"
  on "public"."tutors"
  as permissive
  for delete
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "tutors_insert"
  on "public"."tutors"
  as permissive
  for insert
  to public
with check ((public.is_member_of_clinic(clinic_id) AND (created_by = auth.uid())));



  create policy "tutors_select"
  on "public"."tutors"
  as permissive
  for select
  to public
using (public.is_member_of_clinic(clinic_id));



  create policy "tutors_update"
  on "public"."tutors"
  as permissive
  for update
  to public
using (public.is_member_of_clinic(clinic_id))
with check (public.is_member_of_clinic(clinic_id));


CREATE TRIGGER trg_catalog_drugs_updated_at BEFORE UPDATE ON public.catalog_drugs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_catalog_presentations_updated_at BEFORE UPDATE ON public.catalog_presentations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_medication_presentations_set_updated_at BEFORE UPDATE ON public.medication_presentations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_mrd_updated_at BEFORE UPDATE ON public.medication_recommended_doses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_medications_set_updated_at BEFORE UPDATE ON public.medications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_patient_weights_updated_at BEFORE UPDATE ON public.patient_weights FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_patient_tutor_same_clinic BEFORE INSERT OR UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.ensure_patient_tutor_same_clinic();

CREATE TRIGGER trg_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_protocol_exam_items_set_updated_at BEFORE UPDATE ON public.protocol_exam_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_protocol_folders_set_updated_at BEFORE UPDATE ON public.protocol_folders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_protocol_medications_set_updated_at BEFORE UPDATE ON public.protocol_medications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_protocol_recommendations_set_updated_at BEFORE UPDATE ON public.protocol_recommendations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_protocols_set_updated_at BEFORE UPDATE ON public.protocols FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_tutors_updated_at BEFORE UPDATE ON public.tutors FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

drop policy "rxv_media_delete" on "storage"."objects";

drop policy "rxv_media_insert" on "storage"."objects";

drop policy "rxv_media_read" on "storage"."objects";

drop policy "rxv_media_update" on "storage"."objects";


