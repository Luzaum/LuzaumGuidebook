-- Compatibilidade: disponibiliza tutors/patients antes de 20260222000002.
-- Colunas alinhadas a 20260224223905_remote_schema.sql (exceto created_at/updated_at → migration 000002).
-- NÃO aplicar no remoto nesta fase — branch fix/supabase-tutors-migration-order.

create table if not exists public.tutors (
  id uuid not null default gen_random_uuid(),
  clinic_id uuid not null,
  full_name text not null,
  document_id text,
  email text,
  phone text,
  address jsonb,
  notes text,
  created_by uuid not null default auth.uid(),
  cpf text,
  rg text,
  street text,
  number text,
  neighborhood text,
  city text,
  state text,
  zipcode text,
  complement text,
  deleted_at timestamptz,
  address_complement text
);

create table if not exists public.patients (
  id uuid not null default gen_random_uuid(),
  clinic_id uuid not null,
  tutor_id uuid not null,
  name text not null,
  species text,
  breed text,
  sex text,
  neutered boolean,
  age_text text,
  weight_kg numeric(6, 2),
  microchip text,
  coat text,
  notes text,
  created_by uuid not null default auth.uid(),
  last_weight_date date,
  anamnesis text,
  deleted_at timestamptz,
  microchipped boolean not null default false,
  reproductive_condition text,
  microchip_number text
);

comment on table public.tutors is 'Bootstrap local — schema canônico completado em remote_schema';
comment on table public.patients is 'Bootstrap local — schema canônico completado em remote_schema';
