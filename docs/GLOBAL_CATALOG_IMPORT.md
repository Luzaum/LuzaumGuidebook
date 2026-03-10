# Importação do Catálogo Global

Arquivo canônico:
- `src/data/globalMedicationCatalog.json`

Pré-requisitos:
- aplicar a migration `20260310183000_create_global_medication_catalog.sql`
- definir `SUPABASE_URL` ou `VITE_SUPABASE_URL`
- definir `SUPABASE_SERVICE_ROLE_KEY`
- usar esse processo apenas server-side, nunca browser-side

Rodar importação:

```bash
npx tsx scripts/import-global-catalog.ts
```

Ou com arquivo explícito:

```bash
npx tsx scripts/import-global-catalog.ts src/data/globalMedicationCatalog.json
```

Comportamento:
- valida o JSON pelo contrato canônico do projeto
- faz `upsert` de `global_medications` por `slug`
- faz `upsert` de `global_medication_presentations` por `global_medication_id + slug`
- faz `upsert` de `global_medication_recommended_doses` por `global_medication_id + slug`
- remove apresentações e doses globais que saíram do arquivo importado para aquele medicamento

Observações:
- o app continua lendo o catálogo da clínica das tabelas atuais
- a leitura global usa as novas tabelas e faz fallback local para o JSON canônico se elas ainda não existirem no ambiente
- a importação global é exclusivamente server-side; o script `scripts/import-global-catalog.ts` depende de `SUPABASE_SERVICE_ROLE_KEY` e não deve ser executado no front
- em Supabase, `service_role`/secret key bypassa RLS; as policies das tabelas globais existem principalmente para documentar o modelo de acesso e proteger leituras autenticadas no app, não como barreira principal contra imports administrativos
