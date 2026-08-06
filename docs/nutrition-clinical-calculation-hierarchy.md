# Hierarquia clínica — cálculos de peso-alvo e emagrecimento (NutriçãoVET v3)

Documento de referência interna. Aprovado clinicamente em 2026-08-06.

## Princípio

Não existe fórmula única rígida. O motor v3 implementa uma **hierarquia versionada** com rastreabilidade (método, confiança, justificativa).

## Peso-alvo

Ordem de prioridade:

1. Peso saudável anterior documentado (`previousHealthyWeightKg`)
2. Peso-alvo definido pelo médico-veterinário (`clinicianTargetWeightKg`)
3. Peso adulto esperado em crescimento (`expectedAdultWeightKg`)
4. Estimativa AAHA 2021 por ECC 6–9:
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

Ordem de apresentação (MV seleciona um método; sem média):

1. **Método padrão AAHA 2021** no peso ideal:
   - Cães: `63 × peso ideal^0,75`
   - Gatos: `52 × peso ideal^0,711`
2. **Método individualizado** quando histórico alimentar confiável + peso estável → **80%** da ingestão medida
3. **Conferência** (não prescritiva): RER no peso ideal × 1,0 (cão) ou × 0,8 (gato) — Applied Veterinary Clinical Nutrition 2024

O valor de conferência **não entra na média** nem substitui a meta selecionada.

Implementação: `modules/energia-vet/lib/nutrition-calculations/energyWeightManagement.ts`

## Monitoramento

- Meta semanal: cães 1–2%; gatos 0,5–2% (fluxo padrão felino preferencialmente 0,5–1%)
- Reavaliação: **2–4 semanas**
- Ajuste calórico típico ~10% quando adesão confirmada e perda fora da meta

## Flag de rollout

| Ambiente | Padrão |
|----------|--------|
| Novos cálculos | `nutrition_calculation_engine_v3: true` |
| Rollback interno | `VITE_NUTRITION_CALCULATION_ENGINE_V3=false` |

Relatórios históricos usam snapshot salvo — sem recálculo.

## Catálogo alimentar (estratégia multifonte)

1. TACO/NEPA — ingredientes brasileiros
2. USDA FoodData Central — lacunas
3. Dados oficiais do fabricante — produtos comerciais
4. GENUTRI — fonte secundária auditável (origem + versão por registro)
5. TBCA — `blocked_by_license` até autorização comercial explícita
6. Curadoria manual — fila `ALIMENTOS_PARA_CLASSIFICAR.md`

## Motor legado

O motor legado (`nutrition.ts` + `bookEnergy.ts`) **não será corrigido para imitar o v3**. Permanece até remoção após rollout.
