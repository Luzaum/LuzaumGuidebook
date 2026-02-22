-- Multitenancy base for VETIUS SaaS
-- Date: 2026-02-22
-- Creates:
--   1) clinics
--   2) memberships
-- Enables RLS with clinic-scoped access.

create extension if not exists pgcrypto;

create table if not exists public.clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  role text not null check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  unique (user_id, clinic_id)
);

create index if not exists memberships_user_id_idx on public.memberships(user_id);
create index if not exists memberships_clinic_id_idx on public.memberships(clinic_id);

alter table public.clinics enable row level security;
alter table public.memberships enable row level security;

drop policy if exists clinics_select_by_membership on public.clinics;
create policy clinics_select_by_membership
on public.clinics
for select
to authenticated
using (
  id in (
    select m.clinic_id
    from public.memberships m
    where m.user_id = auth.uid()
  )
);

drop policy if exists memberships_select_own on public.memberships;
create policy memberships_select_own
on public.memberships
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists memberships_insert_own_member on public.memberships;
create policy memberships_insert_own_member
on public.memberships
for insert
to authenticated
with check (
  user_id = auth.uid()
  and role in ('owner', 'member')
);

create or replace function public.is_member_of_clinic(target_clinic_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.memberships m
    where m.clinic_id = target_clinic_id
      and m.user_id = auth.uid()
  );
$$;

revoke all on function public.is_member_of_clinic(uuid) from public;
grant execute on function public.is_member_of_clinic(uuid) to authenticated;

-- Helper function to bootstrap a tenant on first login.
-- If membership already exists, returns the first clinic for this user.
create or replace function public.bootstrap_clinic(clinic_name text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_existing record;
  v_clinic_id uuid;
  v_clinic_name text;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select m.clinic_id, c.name, m.role
  into v_existing
  from public.memberships m
  join public.clinics c on c.id = m.clinic_id
  where m.user_id = v_user_id
  order by m.created_at asc
  limit 1;

  if found then
    return jsonb_build_object(
      'clinic_id', v_existing.clinic_id,
      'clinic_name', v_existing.name,
      'role', v_existing.role
    );
  end if;

  v_clinic_name := coalesce(nullif(trim(clinic_name), ''), 'Minha Clinica');
  insert into public.clinics (name)
  values (v_clinic_name)
  returning id into v_clinic_id;

  insert into public.memberships (user_id, clinic_id, role)
  values (v_user_id, v_clinic_id, 'owner');

  return jsonb_build_object(
    'clinic_id', v_clinic_id,
    'clinic_name', v_clinic_name,
    'role', 'owner'
  );
end;
$$;

revoke all on function public.bootstrap_clinic(text) from public;
grant execute on function public.bootstrap_clinic(text) to authenticated;

comment on function public.bootstrap_clinic(text) is
'Creates clinic + owner membership for auth.uid() when user has no membership.';
