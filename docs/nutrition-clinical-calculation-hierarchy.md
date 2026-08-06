# Hierarquia clínica — cálculos de peso-alvo e emagrecimento (NutriçãoVET v3)

Documento de referência interna. Aprovado clinicamente em 2026-08-06.

## Princípio

Não existe fórmula única rígida. O motor v3 implementa uma **hierarquia versionada** com rastreabilidade (método, confiança, justificativa).

## Peso-alvo

Ordem de prioridade:

1. Peso definido pelo médico-veterinário (`clinicianTargetWeightKg`)
2. Peso saudável anterior documentado (`previousHealthyWeightKg`)
3. Estimativa AAHA 2021 por ECC 6–9:
   - ECC 6 → 10% acima do ideal → `peso-alvo = peso atual ÷ 1,10`
   - ECC 7 → 20% → `÷ 1,20`
   - ECC 8 → 30% → `÷ 1,30`
   - ECC 9 → 40% → `÷ 1,40`

### Salvaguardas

- ECC ≥ 8/9, EMC reduzida ou discrepância >15% vs peso saudável anterior → **estimativa provisória** + revisão clínica
- ECC 6 com EMC alterada → revisão clínica recomendada
- Meta intermediária e override manual sempre disponíveis na UI

Implementação: `modules/energia-vet/lib/nutrition-calculations/bodyComposition.ts`

## Energia para perda de peso

Ordem de prioridade:

1. **Histórico alimentar confiável** + peso estável → **80%** da ingestão medida
2. **Fallback AAHA 2021** no peso ideal:
   - Cães: `63 × peso ideal^0,75` (faixa ± SD)
   - Gatos: `52 × peso ideal^0,711` (faixa ± SD)
3. **Conferência** (não prescritiva): RER no peso ideal × 1,0 (cão) ou × 0,8 (gato) — Applied Veterinary Clinical Nutrition 2024

O valor de conferência **não entra na média** nem substitui a meta.

Implementação: `modules/energia-vet/lib/nutrition-calculations/energyWeightManagement.ts`

## Monitoramento

- Meta semanal: cães 1–2%; gatos 0,5–1%
- Reavaliação: **2–4 semanas**
- Ajuste calórico típico ~10% quando adesão confirmada e perda fora da meta

## Flag de rollout

| Ambiente | `VITE_NUTRITION_CALCULATION_ENGINE_V3` |
|----------|----------------------------------------|
| Produção | `false` (padrão) |
| Homologação / dev local | `true` via `.env.local` |

Critérios para ligar por padrão: ver checklist no issue/PR de rollout (30–50 casos, PDFs, regressões, rollback).

## Catálogo alimentar (estratégia multifonte)

1. TACO/NEPA — ingredientes brasileiros
2. USDA FoodData Central — lacunas
3. Dados oficiais do fabricante — produtos comerciais
4. TBCA — somente com autorização comercial explícita
5. GENUTRI — fonte secundária auditável (origem + versão por registro)
6. Livros — validação clínica, não banco primário de ingredientes

## Motor legado

O motor legado (`nutrition.ts` + `bookEnergy.ts`) **não será corrigido para imitar o v3**. Permanece até remoção após rollout.
