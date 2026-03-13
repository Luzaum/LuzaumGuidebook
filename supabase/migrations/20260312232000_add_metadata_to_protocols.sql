alter table if exists "public"."protocols"
  add column if not exists "metadata" jsonb not null default '{}'::jsonb;
