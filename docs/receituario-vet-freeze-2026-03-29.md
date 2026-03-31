# ReceituárioVET Freeze - 2026-03-29

Estado congelado do ReceituárioVET após recuperação do Manipulados V2, Nova Receita V2-first e Protocolos 3.0 com fluxo V2.

## Escopo congelado

Arquivos-base oficiais do núcleo recuperado:

- `modules/receituario-vet/ManipuladosPage.tsx`
- `modules/receituario-vet/NovaReceita2Page.tsx`
- `modules/receituario-vet/Protocolos3Page.tsx`
- `modules/receituario-vet/ReceituarioChrome.tsx`
- `modules/receituario-vet/receituarioChrome.css`
- `modules/receituario-vet/compoundedClinicalText.ts`
- `modules/receituario-vet/compoundedItemBuilder.ts`
- `modules/receituario-vet/compoundedUi.ts`
- `modules/receituario-vet/novaReceita2Adapter.ts`
- `modules/receituario-vet/protocolMapper.ts`
- `modules/receituario-vet/compoundedV2.ts`
- `modules/receituario-vet/compoundedV2Engine.ts`
- `modules/receituario-vet/compoundedV2Mapper.ts`
- `modules/receituario-vet/compoundedV2Options.ts`
- `modules/receituario-vet/compoundedV2Render.ts`
- `modules/receituario-vet/textSanitizer.ts`
- `modules/receituario-vet/components/ManipuladosV2Editor.tsx`
- `modules/receituario-vet/components/ManipuladosV2CatalogCard.tsx`
- `modules/receituario-vet/components/AddCompoundedMedicationModal.tsx`
- `src/lib/compoundedRecords.ts`
- `src/lib/protocols/protocolsRepo.ts`

## Regras de freeze

- Não refatorar contrato canônico V2 sem bug real comprovado.
- Não alterar schema/persistência base sem necessidade validada.
- Não reintroduzir UI antiga como caminho principal.
- Não espalhar renderização textual fora das funções puras V2.

## Provas mínimas obrigatórias da regressão

- Novo manipulado V2 criado pela UI.
- Item legado convertido para V2.
- Benazepril `0,5 mg/kg` em paciente `5 kg` resolvendo para `2,5 mg`.
- Protocolo com manipulado V2.
- Aplicação do protocolo na Nova Receita.
- Edição na Nova Receita refletindo no review.
- Fluxo controlado e não controlado.

## Artefatos de freeze

- Backup lógico de arquivos em `tmp/receituario-vet-freeze-20260329/`
- Agregador de regressão em `supabase/.temp/e2e/run-receituario-freeze-regression.mjs`
- Resultado consolidado em `supabase/.temp/e2e/receituario-freeze-regression.json`
