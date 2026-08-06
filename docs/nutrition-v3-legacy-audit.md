# Auditoria — dependências do motor legado vs V3 canônico

Branch: `fix/nutrition-canonical-v3-cutover`

## Rotas do wizard (novos cálculos)

| Etapa | Motor ativo (V3 ON) |
|-------|---------------------|
| PatientStep | assessment V3 via `validatePatientStepForV3` |
| EnergyStep | `calculatePatientEnergy` |
| TargetStep | `computeBodyTargetPlan` — **sem** `calculateIdealWeightCustom` |
| FormulationStep | validação proporções V3 |
| SummaryStep | snapshot V3 |

## Funções legadas preservadas (somente leitura histórica)

| Símbolo | Uso |
|---------|-----|
| `calculateIdealWeightCustom` | Relatórios/snapshots anteriores; **removido do wizard novo** |
| `calculateEnergyGoalFromBcs` | Idem |
| `bookEnergy.ts` | Perfis fisiológicos etapa Energia + referência AVCN |

## Flag

- Padrão: `nutrition_calculation_engine_v3: true`
- Rollback interno: `VITE_NUTRITION_CALCULATION_ENGINE_V3=false`

## Catálogo

- Prioridade: TACO → USDA → fabricante → GENUTRI secundário
- TBCA: `blocked_by_license`
