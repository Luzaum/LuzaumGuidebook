# Auditoria — ordem das migrations `tutors` / `patients`

Documento interno de infraestrutura. Data: 2026-08-04.

## Ordem atual (trecho relevante)

| Timestamp | Arquivo | Ação |
|-----------|---------|------|
| `20260222000001` | `multitenancy_clinics_memberships.sql` | Cria `clinics`, `memberships`, `is_member_of_clinic` |
| `20260222000002` | `add_timestamps_tutors_patients.sql` | **ALTER** em `tutors` e `patients` + triggers `set_updated_at` |
| … | (várias migrations) | Sem `tutors`/`patients` |
| `20260224223905` | `remote_schema.sql` | **CREATE** `patients`, `tutors`, índices, FKs, RLS, policies |

## Ponto exato da falha

```text
npx supabase db reset
→ Applying migration 20260222000002_add_timestamps_tutors_patients.sql
→ ERROR: relation "public.tutors" does not exist (SQLSTATE 42P01)
```

A migration `000002` pressupõe tabelas criadas **22 dias antes** (lexicograficamente) do dump `remote_schema`, mas a criação canônica só ocorre em `20260224223905`.

## Migration que cria `tutors`

Definição canônica em `20260224223905_remote_schema.sql` (linhas ~139–162 `patients`, ~277–300 `tutors`).

Dependências posteriores no mesmo arquivo:

- FKs: `patients_tutor_id_fkey`, `prescriptions_tutor_id_fkey`, `tutors_clinic_id_fkey`
- Índices GIN/BTREE, policies RLS (`tutors_select`, etc.)
- Trigger `trg_tutors_updated_at` (função distinta de `set_updated_at` em `000002`)

## Causa raiz

**Ordem lexical incorreta**: migration de timestamps escrita antes da migration de bootstrap do schema remoto, não erro de nome ou schema.

## Risco de reescrever histórico

- `20260222000002` e `20260224223905` podem já estar registradas em ambientes compartilhados.
- **Não** renomear nem apagar arquivos aplicados remotamente.
- **Não** esvaziar `000002` (quebraria ambientes onde ela já rodou após `remote_schema`).

## Estratégia escolhida: **B — migration de compatibilidade anterior**

1. **`202602220000011_create_tutors_patients_base.sql`** (lexicographicamente entre `000001` e `000002`)
   - Cria `tutors` e `patients` com colunas canônicas **exceto** `created_at` / `updated_at` (adicionadas por `000002`).
   - `CREATE TABLE IF NOT EXISTS` sem PK/FK duplicados — índices/constraints permanecem no `remote_schema`.

2. **Ajuste coordenado em `20260224223905_remote_schema.sql`** (somente nesta branch de correção)
   - `CREATE TABLE` → `CREATE TABLE IF NOT EXISTS` para `tutors` e `patients`.
   - Instalações novas: tabelas já existem; dump aplica índices, FKs e RLS.
   - Instalações que já passaram pelo dump completo: `IF NOT EXISTS` é no-op seguro.

## Justificativa

- Preserva arquivos e timestamps históricos.
- Permite `db reset` limpo sem stub incompleto.
- Não usa `ALTER … IF EXISTS` para mascarar ausência estrutural.
- Compatível com ambientes onde `remote_schema` já criou as tabelas (idempotência no CREATE).

## Riscos avaliados

| Risco | Mitigação |
|-------|-----------|
| Duplicar constraints do dump | Early migration **sem** PK/FK; dump continua responsável |
| Colunas divergentes | Early migration copia colunas do dump (exceto timestamps) |
| Editar `remote_schema` | Apenas `IF NOT EXISTS` nos dois CREATE; documentado; branch separada |
| Ambiente remoto desalinhado | **Nenhum** `db push` nesta fase |

## Rollback (local)

```powershell
npx supabase stop
git checkout main
# remover branch fix/supabase-tutors-migration-order
```

Volumes Docker locais podem ser resetados sem impacto remoto.
