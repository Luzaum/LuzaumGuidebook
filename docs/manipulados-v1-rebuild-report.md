# Manipulados V1.0 — relatório de reconstrução

## Estrutura legada encontrada

O runtime atual de manipulados depende de:

- `public.compounded_medications`
- `public.compounded_medication_ingredients`
- `public.compounded_medication_regimens`
- `src/lib/compoundedRecords.ts`
- `modules/receituario-vet/ManipuladosPage.tsx`
- `modules/receituario-vet/compoundedItemBuilder.ts`
- `modules/receituario-vet/compoundedUi.ts`
- `modules/receituario-vet/compoundedV2*.ts`
- `modules/receituario-vet/NovaReceita2Page.tsx`
- `modules/receituario-vet/protocolMapper.ts`
- `modules/receituario-vet/Protocolos3Page.tsx`
- `modules/receituario-vet/components/AddCompoundedMedicationModal.tsx`

## Problemas estruturais do legado

- O modelo expõe farmacotécnica demais na UI.
- A lógica clínica e a farmacotécnica estão misturadas.
- Ingredientes dependentes de peso/dose/concentração exigem combinação frágil de campos.
- Há acoplamento forte entre `metadata`, snapshot de receita, renderização e editor.
- O catálogo, a Nova Receita e os Protocolos não compartilham um contrato simples.

## Estratégia aprovada para a rodada atual

Nesta rodada:

- preservar o legado
- gerar backup SQL e JSON
- parar de depender do legado no runtime novo
- introduzir `Manipulados V1.0` com modelagem nova

Nesta rodada, **não**:

- dropar tabelas legadas remotas
- executar limpeza irreversível

## Nova modelagem V1.0

O runtime novo passa a usar um payload canônico único por fórmula:

- `identity`
- `prescribing`
- `pharmacy`
- `ingredients`
- `variants`
- `display`

### Entradas suportadas

- cadastro rápido por texto
- cadastro estruturado simples
- cadastro por regime/variante clínica

### Saídas obrigatórias

- catálogo de manipulados
- item da Nova Receita 2.0
- item de Protocolos
- preview/review/PDF
- texto copiável
- texto para farmácia

## Estado alvo

- legado preservado e fora do runtime principal
- runtime novo dependente apenas de `Manipulados V1.0`
- migração destrutiva do legado deixada para etapa posterior
