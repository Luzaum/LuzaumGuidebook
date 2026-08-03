# NutriçãoVET — Baseline V2 (Fase 0)

Documento gerado antes da evolução clínica do catálogo V2. Preserva o comportamento atual para comparação e regressão.

## Ambiente registrado

| Item | Valor |
|------|-------|
| Branch | `feature/nutrition-vet-clinical-catalog-v2` |
| Commit inicial | `61ca1c90270f078a7fd193668a78d6ef0ffd6649` |
| Node | v22.18.0 |
| npm | 10.9.3 |
| Data do baseline | 2026-08-02 |

## Rotas e identificadores preservados

- Rota pública: `/calculadora-energetica`
- ID interno do módulo: `energia-vet`
- Persistência do wizard: `vetius-energia-vet-calc-v1` (Zustand/localStorage)
- Relatórios locais: `vetius-energia-vet-reports-v4`
- Tabela Supabase: `nutrition_reports` (migration `20260405198000_create_nutrition_reports.sql`)

## Dataset GENUTRI (bundle offline)

| Métrica | Valor |
|---------|-------|
| Alimentos ativos | 223 |
| Perfis de exigência (FEDIAF + planilha) | 55 |
| Regras energéticas | 2 |
| Categorias | 27 |
| Nutrientes no catálogo | 69 |
| Avisos de auditoria (warning) | 13 |

Fonte: `modules/energia-vet/data/genutri-dataset.json` via `getDatasetStats()`.

**Nota:** O dashboard ainda exibe badges estáticos "129 alimentos" e "43 perfis" em alguns pontos (`Dashboard.tsx`), embora os contadores dinâmicos já usem 223/55.

## Scripts de validação executados

```bash
npm install          # OK
npm run build        # OK (~29s)
npm run typecheck    # OK
npm run lint         # OK
npm run validate:energia-vet-ui  # OK (Playwright)
```

Não há runner `test:nutrition` dedicado antes desta fase; testes de caracterização adicionados em `tests/nutrition/`.

## Resultados Playwright (`validate:energia-vet-ui`)

Artefatos: `tmp/energia-vet-validation/1785714748148-14480/`

| Cenário | MER (kcal/dia) |
|---------|----------------|
| Cão 15 kg, perfil íntegro (`dog_adult_moderate_low_impact`) | 838 |
| Cão 15 kg, perfil castrado (`dog_adult_low_activity`) | 724 |
| Cão 15 kg, predisposto obesidade | 686 |
| Cão castrado com perfil "íntegro" (ajuste automático) | 724 vs 838 |
| Gato 4,5 kg, ativo | 274 |
| Gato 4,5 kg, indoor | 205 |

### Falhas / limitações conhecidas (UI)

| Check | Resultado |
|-------|-----------|
| `foodModalIsClean` | **false** — modal lista nutrientes opcionais ausentes |
| `profileOptionsInPortuguese` | **false** — slugs FEDIAF visíveis no texto da página de energia |
| `hasSlugVisible` | **true** |
| `summaryUsesResolvedProfile` | **true** |
| `castrationChangedCalculation` | **true** |
| `catIndoorChangedCalculation` | **true** |

## Motor de cálculo — valores congelados (testes)

### Energia FEDIAF (`computeFediafEnergy`)

Mesmos valores da tabela Playwright acima para estados resolvidos.

### Meta de peso

- Cão 15 kg, ECC 7, perda: peso-meta 12 kg (−20%)
- Gato 4,5 kg, ECC 3, ganho: peso-meta ~5,4 kg

### Formulação (`computeDietPlan`)

- Dieta única `racao-all-canis-adultos`, meta 724 kcal: **192,04 g MN/dia**, 724 kcal entregues
- Dieta 70/30 (`racao-all-canis-adultos` + `suplemento-critical-care-caes`): **187,2 g MN/dia**, 724 kcal

### Conversão MN ↔ MS (exemplo)

Alimento `racao-all-canis-adultos`:

- Proteína MN: 22%
- MS: 90%
- Proteína MS: 24,4444%
- Roundtrip MN→MS: `(22 × 100 / 90) ≈ 24,4444`

## Relatório V4

Estrutura: `StoredCalculationReport` em `modules/energia-vet/types.ts`

- Sem campo `schemaVersion` (adicionado na V5 por cópia)
- PDF via `reportDocument.ts` + jsPDF
- Nome de arquivo: `VETIUS_NUTRICAO_{PACIENTE}_{TUTOR}_{DATA}.pdf`
- Fixture de caracterização: `tests/nutrition/fixtures/report-v4-sample.ts`

## Supabase local (esquema relevante)

Tabela existente `nutrition_reports`:

- `report_payload_json`, `energy_payload_json`, `formulation_payload_json`
- RLS por `clinic_id` + `is_member_of_clinic`
- **Nenhuma migration V2 aplicada no remoto** (política do projeto)

## Plano de rollout V2

Feature flags (inicialmente desligadas):

- `nutrition_catalog_v2`
- `nutrition_clinical_rules_v2`
- `nutrition_hospital_v2`
- `nutrition_pdf_v2`
- `nutrition_recipe_engine_v2`

Modo legado: dataset JSON + motores atuais + PDF atual + storage v4.

Modo V2: catálogo unificado + regras clínicas + PDF novo + storage v5 (`vetius-energia-vet-reports-v5`), com leitura retroativa de v4.

## Próximas fases (commits planejados)

1. `test(nutrition): characterize current nutrition module behavior`
2. `docs(nutrition): document v2 baseline and migration plan`
3. `refactor(nutrition): add versioned catalog repository abstraction`
4. `feat(nutrition): add non-destructive report v5 migration`
5. `feat(nutrition): add catalog v2 additive schema`
6. … (importadores, regras clínicas, hospital, UI, PDF, validação)

## Atualização pós Fases 5–8 (2026-08-03)

Commits: `b01ea02` (hospital), `09a7142` (PDF + UI catálogo), `8cd42d0` (testes + validação).

| Check Playwright | Antes | Depois |
|------------------|-------|--------|
| `foodModalIsClean` | false | **true** |
| `profileOptionsInPortuguese` | false | **true** |
| `hasSlugVisible` | true (falso positivo por `FEDIAF`) | **false** |
| `npm run test:nutrition` | 35 testes | **48 testes** |

Feature flags permanecem desligadas por padrão; ative com `VITE_NUTRITION_*_V2=true` para homologação.
