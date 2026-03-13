create table if not exists public.consulta_vet_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists consulta_vet_categories_slug_idx on public.consulta_vet_categories(slug);
create index if not exists consulta_vet_categories_title_idx on public.consulta_vet_categories(title);
create index if not exists consulta_vet_categories_sort_order_idx on public.consulta_vet_categories(sort_order);

create table if not exists public.consulta_vet_diseases (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.consulta_vet_categories(id) on delete set null,
  slug text not null unique,
  title text not null,
  synonyms text[] not null default '{}',
  species text[] not null default '{}'::text[],
  tags text[] not null default '{}',
  quick_summary text not null default '',
  thirty_second_view text[] not null default '{}',
  do_not_forget text[] not null default '{}',
  when_to_suspect text[] not null default '{}',
  initial_conduct text[] not null default '{}',
  high_yield_tests text[] not null default '{}',
  common_mistakes text[] not null default '{}',
  red_flags text[] not null default '{}',
  clinical_pearls text[] not null default '{}',
  introduction jsonb not null default '""'::jsonb,
  etiology jsonb not null default '""'::jsonb,
  transmission jsonb not null default '""'::jsonb,
  pathophysiology jsonb not null default '""'::jsonb,
  epidemiology jsonb not null default '""'::jsonb,
  clinical_presentation jsonb not null default '""'::jsonb,
  physical_exam jsonb not null default '""'::jsonb,
  differential_diagnoses jsonb not null default '""'::jsonb,
  diagnostics jsonb not null default '""'::jsonb,
  diagnostic_approach jsonb not null default '""'::jsonb,
  treatment jsonb not null default '""'::jsonb,
  prognosis jsonb not null default '""'::jsonb,
  complications jsonb not null default '""'::jsonb,
  prevention jsonb not null default '""'::jsonb,
  "references" jsonb not null default '[]'::jsonb,
  is_published boolean not null default true,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint consulta_vet_diseases_species_check check (
    species <@ array['dog', 'cat']::text[]
  )
);

create index if not exists consulta_vet_diseases_slug_idx on public.consulta_vet_diseases(slug);
create index if not exists consulta_vet_diseases_title_idx on public.consulta_vet_diseases(title);
create index if not exists consulta_vet_diseases_category_idx on public.consulta_vet_diseases(category_id);
create index if not exists consulta_vet_diseases_published_idx on public.consulta_vet_diseases(is_published);

create table if not exists public.consulta_vet_medications (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.consulta_vet_categories(id) on delete set null,
  slug text not null unique,
  title text not null,
  active_ingredient text not null,
  trade_names text[] not null default '{}',
  pharmacologic_class text not null,
  species text[] not null default '{}'::text[],
  tags text[] not null default '{}',
  mechanism_of_action text not null default '',
  indications text[] not null default '{}',
  contraindications text[] not null default '{}',
  cautions text[] not null default '{}',
  adverse_effects text[] not null default '{}',
  doses jsonb not null default '[]'::jsonb,
  presentations jsonb not null default '[]'::jsonb,
  clinical_notes_rich_text text not null default '',
  "references" jsonb not null default '[]'::jsonb,
  is_published boolean not null default true,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint consulta_vet_medications_species_check check (
    species <@ array['dog', 'cat']::text[]
  )
);

create index if not exists consulta_vet_medications_slug_idx on public.consulta_vet_medications(slug);
create index if not exists consulta_vet_medications_title_idx on public.consulta_vet_medications(title);
create index if not exists consulta_vet_medications_category_idx on public.consulta_vet_medications(category_id);
create index if not exists consulta_vet_medications_published_idx on public.consulta_vet_medications(is_published);

create table if not exists public.consulta_vet_disease_medications (
  disease_id uuid not null references public.consulta_vet_diseases(id) on delete cascade,
  medication_id uuid not null references public.consulta_vet_medications(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (disease_id, medication_id)
);

create index if not exists consulta_vet_disease_medications_medication_idx
  on public.consulta_vet_disease_medications(medication_id);

create table if not exists public.consulta_vet_disease_consensos (
  disease_id uuid not null references public.consulta_vet_diseases(id) on delete cascade,
  consensus_document_id uuid not null references public.consensus_documents(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (disease_id, consensus_document_id)
);

create index if not exists consulta_vet_disease_consensos_consensus_idx
  on public.consulta_vet_disease_consensos(consensus_document_id);

do $$
begin
  if to_regproc('public.set_updated_at') is not null then
    execute 'drop trigger if exists trg_consulta_vet_categories_updated_at on public.consulta_vet_categories';
    execute 'create trigger trg_consulta_vet_categories_updated_at before update on public.consulta_vet_categories for each row execute function public.set_updated_at()';
    execute 'drop trigger if exists trg_consulta_vet_diseases_updated_at on public.consulta_vet_diseases';
    execute 'create trigger trg_consulta_vet_diseases_updated_at before update on public.consulta_vet_diseases for each row execute function public.set_updated_at()';
    execute 'drop trigger if exists trg_consulta_vet_medications_updated_at on public.consulta_vet_medications';
    execute 'create trigger trg_consulta_vet_medications_updated_at before update on public.consulta_vet_medications for each row execute function public.set_updated_at()';
  end if;
end $$;

alter table public.consulta_vet_categories enable row level security;
alter table public.consulta_vet_diseases enable row level security;
alter table public.consulta_vet_medications enable row level security;
alter table public.consulta_vet_disease_medications enable row level security;
alter table public.consulta_vet_disease_consensos enable row level security;

drop policy if exists consulta_vet_categories_select_published on public.consulta_vet_categories;
create policy consulta_vet_categories_select_published
on public.consulta_vet_categories
for select
to anon, authenticated
using (is_published = true);

drop policy if exists consulta_vet_diseases_select_published on public.consulta_vet_diseases;
create policy consulta_vet_diseases_select_published
on public.consulta_vet_diseases
for select
to anon, authenticated
using (is_published = true);

drop policy if exists consulta_vet_medications_select_published on public.consulta_vet_medications;
create policy consulta_vet_medications_select_published
on public.consulta_vet_medications
for select
to anon, authenticated
using (is_published = true);

drop policy if exists consulta_vet_disease_medications_select_visible on public.consulta_vet_disease_medications;
create policy consulta_vet_disease_medications_select_visible
on public.consulta_vet_disease_medications
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.consulta_vet_diseases d
    join public.consulta_vet_medications m on m.id = consulta_vet_disease_medications.medication_id
    where d.id = consulta_vet_disease_medications.disease_id
      and d.is_published = true
      and m.is_published = true
  )
);

drop policy if exists consulta_vet_disease_consensos_select_visible on public.consulta_vet_disease_consensos;
create policy consulta_vet_disease_consensos_select_visible
on public.consulta_vet_disease_consensos
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.consulta_vet_diseases d
    join public.consensus_documents c on c.id = consulta_vet_disease_consensos.consensus_document_id
    where d.id = consulta_vet_disease_consensos.disease_id
      and d.is_published = true
      and c.is_published = true
  )
);

drop policy if exists consulta_vet_categories_manage_owner on public.consulta_vet_categories;
create policy consulta_vet_categories_manage_owner
on public.consulta_vet_categories
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

drop policy if exists consulta_vet_diseases_manage_owner on public.consulta_vet_diseases;
create policy consulta_vet_diseases_manage_owner
on public.consulta_vet_diseases
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

drop policy if exists consulta_vet_medications_manage_owner on public.consulta_vet_medications;
create policy consulta_vet_medications_manage_owner
on public.consulta_vet_medications
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

drop policy if exists consulta_vet_disease_medications_manage_owner on public.consulta_vet_disease_medications;
create policy consulta_vet_disease_medications_manage_owner
on public.consulta_vet_disease_medications
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

drop policy if exists consulta_vet_disease_consensos_manage_owner on public.consulta_vet_disease_consensos;
create policy consulta_vet_disease_consensos_manage_owner
on public.consulta_vet_disease_consensos
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
