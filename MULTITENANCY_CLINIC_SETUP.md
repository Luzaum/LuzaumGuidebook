# Multitenancy (Clinica) - Setup e Fluxo

## Objetivo

- Cada usuario pertence a uma clinica.
- Primeiro acesso cria clinica + membership (`owner`).
- O app sempre resolve `clinic_id` ativo antes de permitir area protegida.
- Inserts no banco devem incluir `clinic_id`.

## Arquivos adicionados

- `supabase/migrations/20260222_000001_multitenancy_clinics_memberships.sql`
- `src/lib/clinic.ts`
- `src/components/ClinicProvider.tsx`
- `src/components/RequireClinic.tsx`
- `src/routes/ClinicSetup.tsx`
- `src/lib/clinicScopedDb.ts`

## Banco (Supabase)

1. Execute a migration:
   - `supabase/migrations/20260222_000001_multitenancy_clinics_memberships.sql`
2. Isso cria:
   - `public.clinics`
   - `public.memberships`
3. E habilita:
   - RLS por membership
   - funcao `public.bootstrap_clinic(clinic_name text)`
   - funcao `public.is_member_of_clinic(target_clinic_id uuid)`

## Policy padrao para tabelas clinicas

Em qualquer tabela que tenha coluna `clinic_id uuid`, use a regra:

```sql
clinic_id in (
  select clinic_id from public.memberships
  where user_id = auth.uid()
)
```

Exemplo para `patients`:

```sql
alter table public.patients enable row level security;

create policy patients_select_by_membership
on public.patients
for select
to authenticated
using (
  clinic_id in (
    select clinic_id from public.memberships
    where user_id = auth.uid()
  )
);
```

## Fluxo de frontend

1. Login
2. Rota protegida exige clinica (`RequireClinic`)
3. Se usuario nao tem membership:
   - redireciona para `/clinic/setup`
4. Em `/clinic/setup`:
   - chama `bootstrap_clinic`
   - grava clinic ativo no contexto e localStorage
   - retorna para `/app`

## Padrao de inserts (paciente/tutor/etc)

Use `src/lib/clinicScopedDb.ts`:

- `insertWithClinicId('tutors', payload)`
- `insertWithClinicId('patients', payload)`
- `selectByClinicId('patients')`

Ou o helper pronto de dominio:

- `src/lib/clinicRecords.ts` (`insertTutor`, `insertPatient`, `listTutors`, `listPatients`)

Esses helpers garantem filtro/insert com `clinic_id`.
