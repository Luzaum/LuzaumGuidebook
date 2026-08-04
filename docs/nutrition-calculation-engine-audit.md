# Auditoria do motor de cálculos NutriçãoVET — baseline pré-v3

Data: 2026-08-04  
Branch: `feature/nutrition-calculation-engine-v3`

## Motores paralelos identificados

| Motor | Arquivo | RER | MER | UI ativa |
|-------|---------|-----|-----|----------|
| Livros (AVCN cap. 3) | `bookEnergy.ts` | 70×kg^0,75 | RER×fator ou k×kg^exp | Sim |
| FEDIAF 2025 | `fediaf.ts` | 90/70×kg^exp | Modos múltiplos | Não (testes) |
| GENUTRI legado | `nutrition.ts` | 90/70×kg^exp | RER×fator | Não |

## Inconsistências corrigidas pelo v3

1. Expoente felino: 0,67 para MER direto; 0,75 apenas para RER comparativo/hospitalar.
2. Peso-alvo: AAHA percentOverweight em vez de multiplicadores fixos por ECC.
3. Perda de peso: módulo dedicado (histórico → AAHA → fallback RER×0,8).
4. Hospital: RER inicial, sem fatores de doença automáticos.
5. Formulação: alocação calórica explícita; sem 50/50 automático; sem normalização silenciosa.
6. Macros: coeficientes conforme método energético (Atwater modificado vs natural).
7. Ausente ≠ zero em todos os caminhos.
8. Arredondamento: valor exato + valor prático + erro documentado.

## Arquivos legados preservados (leitura histórica)

- `bookEnergy.ts`, `fediaf.ts`, `nutrition.ts`, `dietEngine.ts`
- `FoodStep.tsx`, `SummaryStep.tsx`
- `vetius-energia-vet-calc-v1`, reports v4

## Novo núcleo

`modules/energia-vet/lib/nutrition-calculations/` — funções puras, versionadas, auditáveis.

Flag interna: `nutrition_calculation_engine_v3` (nunca exposta na UI).

## Hierarquia de fontes (v3)

1. Ingestão observada estável (ECC ideal)
2. FEDIAF 2025 (perfis diretos)
3. NRC 2006 / AVCN (crescimento, gestação, lactação)
4. RER×fator (fallback documentado)
5. Override clínico com justificativa
