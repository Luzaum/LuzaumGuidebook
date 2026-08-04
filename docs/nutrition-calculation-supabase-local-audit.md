# Auditoria local — migrations NutriçãoVET (motor v3)

Documento interno — **não expor na interface do aplicativo**.

Data da auditoria: 2026-08-04  
Branch: `feature/nutrition-calculation-engine-v3`

## Ambiente local

| Item | Resultado |
|------|-----------|
| Docker Desktop | Iniciado (Server 29.2.1) |
| Supabase CLI | via `npx supabase` (projeto local) |
| `supabase start` | Parcial — falha em migration legada anterior à nutrição |
| `supabase db reset` | **Falhou** — `20260222000002_add_timestamps_tutors_patients.sql` referencia `public.tutors` antes de `20260224223905_remote_schema.sql` criar a tabela |
| Comandos remotos | **Nenhum** (`link`, `db push`, remoto) |

### Migrations nutricionais auditadas (ordem)

1. `20260804180000_nutrition_calculation_engine_v3.sql`
2. `20260804190000_nutrition_calculation_snapshots_sync.sql`
3. `20260804200000_nutrition_calculation_v3_rls_policies.sql` *(aditiva — políticas RLS)*

## Migration `180000` — achados

### Tabelas

| Tabela | RLS | Políticas (antes) | Políticas (após `200000`) |
|--------|-----|-------------------|---------------------------|
| `nutrition_calculation_runs` | ON | **Nenhuma** | SELECT/INSERT por clínica + `user_id = auth.uid()` |
| `nutrition_patient_assessments` | ON | **Nenhuma** | SELECT/INSERT via FK run |
| `nutrition_monitoring_events` | ON | **Nenhuma** | SELECT/INSERT via FK run |
| `nutrition_formula_versions` | ON | **Nenhuma** | SELECT somente leitura (`active = true`) |

### Schema

- `nutrition_calculation_runs`: usa `user_id` (não `created_by`); sem soft delete; append-only por design.
- FK: assessments/events → runs (CASCADE/SET NULL).
- `nutrition_formula_versions`: PK texto; sem FK clínica — catálogo global somente leitura.
- **Sem** políticas UPDATE/DELETE no cliente — mutações bloqueadas por ausência de policy (padrão deny).

### Dependências

- `is_member_of_clinic(uuid)` — definida em `20260222000001_multitenancy_clinics_memberships.sql`.
- `clinics`, `memberships`, `auth.users` — pré-requisitos.

## Migration `190000` — achados

### Tabelas

- `nutrition_calculation_snapshots` — isolamento por `clinic_id`, `created_by`, soft delete `deleted_at`.
- Filhas: `nutrition_calculation_inputs`, `_outputs`, `nutrition_clinician_overrides`, `nutrition_data_quality_issues`.

### Políticas existentes

- SELECT: membro da clínica + `deleted_at IS NULL`.
- INSERT: `created_by = auth.uid()` + membership.
- UPDATE draft: apenas `status = 'draft'`.
- Soft delete policy presente.
- Índice único `(clinic_id, snapshot_checksum)` WHERE `deleted_at IS NULL` — idempotência.

### Imutabilidade

- Finalizados não têm policy UPDATE explícita de edição — bloqueio efetivo.
- Checksum e revisão via `parent_calculation_id`, `revision_number`.

## Migration `200000` — correção RLS `180000`

Políticas adicionadas sem alterar migrations anteriores.

## Cenários de teste RLS (especificação)

| # | Cenário | Esperado |
|---|---------|----------|
| 1 | Usuário A insere run na clínica A | OK |
| 2 | Usuário A lê run da clínica A | OK |
| 3 | Usuário A não lê clínica B | Bloqueado |
| 4 | Usuário B não lê clínica A | Bloqueado |
| 5 | Usuário C sem membership insere | Bloqueado |
| 6 | Usuário C sem membership lê | Bloqueado |
| 7 | `user_id ≠ auth.uid()` | Bloqueado |
| 8 | UPDATE em finalizado | Bloqueado |
| 9 | DELETE físico | Bloqueado |
| 10 | Fórmula versionada INSERT cliente | Bloqueado |
| 11 | Snapshot checksum idempotente | 1 registro |
| 12 | Conflito checksum | Revisão, não sobrescrever |

Implementação: `scripts/test-nutrition-supabase-local.ts` + `tests/nutrition/supabase-local-rls.test.ts` (skip se env indisponível).

## Rollback local

```powershell
npx supabase stop
# Remover volume local se necessário (destrutivo apenas local)
```

## Limitações restantes

1. **`db reset` completo bloqueado** por ordem de migrations legadas (`tutors`) — fora do escopo nutricional; requer migration aditiva de reordenação ou squash em fase dedicada de infra.
2. Validação RLS end-to-end depende de Supabase local funcional ou CI com stack Docker.
3. Políticas UPDATE em `nutrition_calculation_runs` intencionalmente ausentes (auditoria append-only).

## Próxima etapa recomendada

1. Corrigir ordem/dependência da migration `tutors` em fase de infra separada.
2. Executar script RLS com stack local saudável.
3. Aplicar migrations nutricionais no remoto apenas após QA completo e aprovação explícita.
