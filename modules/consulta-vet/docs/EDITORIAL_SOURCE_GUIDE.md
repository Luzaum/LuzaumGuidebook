# Guia editorial — Consulta Vet (fontes locais e citações)

Este documento define **como** pesquisar nos PDFs em `modules/antibioticoterapia-vet/docs/sources/`, **como** redigir conteúdo no app e **como** formatar referências. Não substitui revisão clínica por um veterinário responsável.

## 1. Hierarquia de fontes

| Prioridade | Uso típico | Exemplos no acervo local |
|------------|------------|---------------------------|
| 1 | Doenças, conduta, quadros clínicos | Nelson & Couto (Medicina interna) |
| 2 | Doses, monografias, interações | Plumb’s Veterinary Drug Handbook |
| 3 | Órgão/sistema (nefro, GI, reprodução) | Manuais BSAVA correspondentes |
| 4 | Fisiopatologia, fisiologia | Cunningham’s Physiology |
| 5 | Imunopatologia | Veterinary Immunology (ed. citada no acervo) |
| 6 | Oncologia | Withrow & MacEwen (quando o tópico for oncológico) |

Sempre que um facto clínico ou dose for integrado na ficha, deve existir **pelo menos uma referência** identificável (livro + edição + localização).

## 2. Síntese versus transcrição

- **Síntese (preferida):** reescrever em português clínico (PT-BR), com estrutura própria (listas, tabelas no modelo do app). Indicar fonte.
- **Transcrição:** evitar copiar parágrafos longos dos livros. Trechos curtos só se indispensáveis, entre aspas ou com indicação explícita de citação, e sempre com referência.
- **Figuras:** não reproduzir figuras protegidas por copyright dos livros sem permissão. Preferir **tabelas originais** no app, **fluxos em texto**, ou imagens **próprias** em `public/` com legenda citando a ideia da fonte.

## 3. Formato de citação no campo `EditorialReference.citationText`

Padrão recomendado (uma linha):

`Autor(es). Título abreviado ou completo, edição, ano — capítulo/seção ou páginas.`

Exemplos:

- `Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — cap. Hipertensão sistêmica, pp. XXX–YYY.`
- `Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — Pimobendan, pp. XXX–YYY.`

Quando a página exata não estiver anotada na extração, usar `seção indicada em [tópico]` até completar na revisão.

## 4. Fluxo de trabalho com PDFs (extração dirigida)

1. **Identificar a entidade** (doença ou medicamento) e os **capítulos** prováveis no índice do PDF (ou sumário).
2. **Busca por palavras-chave** no leitor de PDF (inglês e português): nomes de fármaco, síndrome, espécie.
3. **Anotar** em folha de trabalho: `obra | edição | capítulo/página | facto | destino no app` (ex.: `treatment.dieta`, `MedicationDose` linha 2).
4. **Redigir** no modelo TypeScript (`DiseaseRecord` / `MedicationRecord`) sem duplicar o mesmo conceito em três secções — preferir **uma tabela central** e remissões curtas.
5. **Validar** medicamentos com `validateMedicationDoses` e build do projeto.

### Folha mínima por ficha (template)

```
Slug:
Fonte: [livro]
Trecho: pp. ___–___
Facto clínico:
Onde no app: [campo / bloco estruturado]
Revisado: sim/não
```

## 5. Integração com o código

- Doenças: [`modules/consulta-vet/data/seed/diseases*.ts`](../data/seed/)
- Medicamentos: [`modules/consulta-vet/data/seed/medications.seed.ts`](../data/seed/medications.seed.ts)
- Catálogo público: [`modules/consulta-vet/constants/publicCatalog.ts`](../constants/publicCatalog.ts)

## 6. Quando escalar para o utilizador

- Divergência forte entre **Plumb’s** e **rótulo brasileiro** de um produto.
- Posologia que **não cabe** no modelo atual de `MedicationDose` (ex.: dose fixa por animal sem mg/kg).
- Necessidade de **figura** que reproduza ilustração protegida do livro (pedir alternativa ou permissão).
