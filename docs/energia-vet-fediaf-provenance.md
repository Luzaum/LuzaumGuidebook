# Energia Vet: Proveniencia Cientifica

## O que vem da planilha GENUTRI

- Base de alimentos, composicao em materia natural e materia seca.
- Regras de energia basal importadas do workbook (`Exigencias Energetica`).
- Estrutura operacional de formulacao e conversao MS -> MN.
- Auditoria de inconsistencias do workbook documentada em `docs/energia-vet-genutri-audit.md`.

## O que agora vem do FEDIAF 2025

- Estados fisiologicos do modulo de energia:
  - cao adulto 110 kcal/kg^0.75 (Tabela VII-7, p. 55)
  - cao adulto 95 kcal/kg^0.75 / obeso-prone (Tabela VII-7, p. 55)
  - cao jovem adulto 1-2 anos (Tabela VII-6, p. 54)
  - cao senior > 7 anos (Tabela VII-6, p. 54)
  - cao crescimento, gestacao e lactacao com formulas da Tabela VII-8b (p. 56)
  - gato adulto 100 kcal/kg^0.67 (Tabela VII-9, p. 57)
  - gato adulto 75 kcal/kg^0.67 castrado/indoor (Tabela VII-9, p. 57)
  - gato crescimento, gestacao e lactacao com Tabela VII-10 (p. 57)
- Perfis de exigencia operacionais por base:
  - `%MS`
  - `por 1000 kcal`
  - `por peso metabolico` para manutencao adulta
- Tabelas usadas:
  - VII-11 (p. 58)
  - VII-17a-d (pp. 73-76)
  - VII-18a-c (pp. 77-79)

## Como o app usa cada fonte

- `modules/energia-vet/lib/fediaf.ts`
  - perfis FEDIAF de comparacao nutricional
  - estados fisiologicos e formulas energeticas
- `modules/energia-vet/lib/genutriData.ts`
  - merge entre perfis FEDIAF e dataset GENUTRI
- `modules/energia-vet/lib/dietEngine.ts`
  - aplica a base de comparacao do perfil selecionado (`%MS`, `1000 kcal`, `peso metabolico`)

## Limites atuais

- Parte da classificacao de alimentos do GENUTRI continua dependente da categoria original da planilha e de normalizacao previa.
- O FEDIAF foi integrado como fonte primaria para energia e exigencias, mas a cobertura clinica nao substitui julgamento nutricional para doencas especificas fora dos perfis gerais.
