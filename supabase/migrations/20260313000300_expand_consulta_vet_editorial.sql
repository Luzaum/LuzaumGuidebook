alter table public.consulta_vet_diseases
  add column if not exists dog_vs_cat_differences text[] not null default '{}';

alter table public.consulta_vet_medications
  add column if not exists interactions text[] not null default '{}',
  add column if not exists routes text[] not null default '{}',
  add column if not exists admin_notes_text text not null default '';

alter table public.consensus_document_details
  add column if not exists "references" jsonb not null default '[]'::jsonb;
