# Padrão de Fontes — VETIUS/CRIVET

## Fontes Oficiais do Catálogo (`SOURCE_CATALOG`)

| source_id | Abreviação | Título completo | Ed. | Ano |
|-----------|-----------|-----------------|-----|-----|
| `plumbs_vdh_10` | Plumb's 10e | Plumb's Veterinary Drug Handbook | 10th | 2024 |
| `lumb_jones_6` | Lumb & Jones 6e | Veterinary Anesthesia and Analgesia | 6th | 2024 |
| `bsava_ecc_3` | BSAVA ECC 3e | BSAVA Manual of Canine and Feline Emergency and Critical Care | 3rd | 2012 |
| `nelson_couto_6` | Nelson & Couto 6e | Small Animal Internal Medicine | 6th | 2019 |

## Regra Geral

Toda afirmação clínica de **risco, contraindicação, dose ou titulação** deve ser sustentada por pelo menos 1 referência do catálogo.

## Formato de Referência (`DrugReference`)

```typescript
import { ref } from '@/lib/drug-sources/reference'

references: [
  ref({
    source_id: 'plumbs_vdh_10',
    drug: 'Morfina',
    section: 'Morphine Sulfate',
    pages: 'p. 717-722',
    quote_hint: 'IV rápido → liberação de histamina → hipotensão',
  }),
  ref({
    source_id: 'lumb_jones_6',
    chapter: 'Opioid Analgesics',
    pages: 'p. 212-230',
  }),
]
```

## Fontes Preferenciais por Seção

| Seção | Fonte primária | Fonte secundária |
|-------|----------------|-----------------|
| `core_concepts`, `doses`, `presentations` | Plumb's 10e | Lumb & Jones |
| `indications`, `alerts_by_comorbidity` | Nelson & Couto | BSAVA ECC |
| `contraindications`, `adverse_effects_and_toxicity` | Plumb's 10e | Lumb & Jones |
| `administration_and_titration` | Lumb & Jones | BSAVA ECC |
| `protocol_integrations`, `clinical_flowcharts` | BSAVA ECC | Nelson & Couto |

## Migração de Referências Legado

Para migrar perfis antigos (sem `source_id`) automaticamente, execute:
```bash
npm run normalize:refs
```
⚠️ **Sempre revise os diffs antes de commitar** — a normalização é heurística.

## Adicionar Nova Fonte ao Catálogo

Edite `src/lib/drug-sources/catalog.ts`, adicionando um novo `SourceId` e a entrada no `SOURCE_CATALOG`. Depois atualize `SECTION_PREFERRED_SOURCES` em `sectionSourceGuide.ts`.
