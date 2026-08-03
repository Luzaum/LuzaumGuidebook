# Matriz de validação clínica — NutriçãoVET V2

Documento de referência para casos golden e regressão clínica. Resultados novos exigem revisão veterinária antes de alterar expectativas congeladas.

| # | Caso | Espécie | Perfil / contexto | Expectativa mínima |
|---|------|---------|-------------------|-------------------|
| 1 | Adulto saudável castrado | Cão | Manutenção | MER ~724 kcal (15 kg, perfil castrado) |
| 2 | Adulto indoor | Gato | Manutenção | MER ~205 kcal (4,5 kg, indoor) |
| 3 | Obesidade | Cão | Perda de peso | Meta ECC 7 → −20% peso |
| 4 | Obesidade | Gato | Perda de peso | Perfil weight_loss_cat aplicável |
| 5 | DRC estágio 2 | Gato | renal_ckd_cat | Fósforo crítico; taurina presente |
| 6 | DRC estágio 3 | Cão | renal_ckd_dog | Fósforo moderado; não suitable se dados ausentes |
| 7 | DRC + proteinúria | Ambos | renal_proteinuria | Cautela proteica |
| 8 | Estruvita dissolução | Gato | urinary_struvite_dissolution | Conflito com oxalato se ambos ativos |
| 9 | Oxalato prevenção | Gato | urinary_calcium_oxalate_prevention | Perfil distinto de estruvita |
| 10 | Hepatopatia cobre | Cão | hepatic_copper_restriction | Cobre limitado |
| 11 | Encefalopatia | Ambos | hepatic_encephalopathy | Proteína cautelosa |
| 12 | Pancreatite | Cão | pancreatitis_dog | Gordura baixa |
| 13 | Enteropatia | Ambos | gastrointestinal_highly_digestible | Digestibilidade |
| 14 | Hidrolisada | Ambos | hydrolyzed_protein | Alegação vs avaliação separadas |
| 15 | Anorexia prolongada | Gato | critical_care + hospital V2 | Risco alto realimentação |
| 16 | Sonda enteral | Cão | hospital order | PDF 1 página |
| 17 | Dieta híbrida | Cão | commercial + complement | Energia total 724 kcal |
| 18 | Receita incompleta | — | ingredient_only | avoid / insufficient_data |
| 19 | Produto só garantia | — | quality C | consider com aviso |
| 20 | Produto completo | — | quality B | suitable/consider conforme perfil |

## Invariantes automatizados

- kcal nunca negativa
- nutriente ausente ≠ zero
- contraindicação ≠ suitable
- relatório v4 abre sem schemaVersion
- PDF V2 ambulatorial ≤ 2 páginas (caso típico)
- PDF hospitalar típico = 1 página

## Status da implementação (2026-08-02)

- Casos 1–3, 17–18: cobertos em `tests/nutrition/characterization.test.ts` e `clinical-engine.test.ts`
- Casos 15–16: cobertos em `tests/nutrition/hospital-and-pdf.test.ts`
- Casos 5–14, 19–20: perfis e motor implementados; fixtures golden expandidas na próxima iteração
