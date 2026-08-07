# Padrão de importação de doenças — ConsultaVET

Este documento define o **modelo editorial obrigatório** para novas fichas de doença. Referência ouro: `diseases.miastenia-gravis.seed.ts` (alinhada a `diseases.cardiomiopatia-dilatada.seed.ts`).

## 1. Arquivos a criar/alterar

| Passo | Arquivo | Ação |
|-------|---------|------|
| 1 | `data/seed/diseases.<slug>.seed.ts` | Criar ficha completa |
| 2 | `data/seed/diseasePlainLanguage.ts` | Entrada “O que é em palavras simples?” |
| 3 | `data/seed/diseases.seed.ts` | Import + incluir no array (plain language aplicada via `withPlainLanguage`) |
| 4 | `constants/publicCatalog.ts` | Slug público |
| 5 | `data/publicCatalogCardStubs.ts` | Cartão de listagem |
| 6 | `utils/editorialSubsectionLabels.ts` | Rótulos PT-BR para chaves novas (com acentuação) |
| 7 | `public/assets/consulta-vet/diseases/<slug>/` | Figuras locais (se houver) |
| 8 | `tests/consulta-vet/` | Teste estrutural mínimo |

## 2. Estrutura `DiseaseRecord` (checklist)

### Metadados
- `id`, `slug`, `title`, `synonyms`, `species`, `category`, `tags`
- `isPublished: true`, `source: 'seed'`

### Resumo rápido (hero)
- `quickSummary` — parágrafo técnico denso com citações `(Autor, ano)`
- `quickDecisionStrip` — 5–10 frases curtas de decisão
- `quickSummaryRich` — `lead`, `leadHighlights`, `pillars`, `diagnosticFlow`, `treatmentFlow`

### Linguagem simples (obrigatório)
- `plainLanguage` no seed **ou** entrada em `diseasePlainLanguage.ts` (aplicada automaticamente)
```ts
plainLanguage: {
  whatIsIt: '... linguagem acessível para tutor ...',
  keyPoints: ['...', '...', '...'], // 3 bullets
}
```

### Etiologia
- Objeto com chaves descritivas: `definicao`, `mecanismo`, `associacoes`, etc.
- **Não** usar só `visaoGeral` sem resumo clínico
- Citações inline com **resumo do estudo + conclusão**:
  > *Autor et al. (ano), em [tipo de estudo] com N casos, descreveram X. Conclusão: Y.*

### Epidemiologia / patogênese
- Chaves por espécie quando aplicável (`caes`, `gatos`)
- `pathogenesisTransmission.cascata` em array

### Fisiopatologia
- Texto narrativo **ou** objeto com figuras `clinicalFigure`
- Figuras externas: baixar para `public/assets/...` e citar **ABNT** na legenda:
  > AUTOR. Título. Disponível em: URL. Acesso em: dia mês. ano.

### Sinais clínicos (obrigatório — padrão CMD)
Cada achado como objeto:
```ts
{
  finding: '...',
  mechanism: '... por que acontece fisiologicamente ...',
  clinicalMeaning: '... o que muda na conduta ...',
  priority: 'common' | 'emergency' | 'systemic' | ...,
  context?: ['...'],
}
```

### Diagnóstico
Array de passos com:
- `purpose`, `description`, `interpretation`, `limitations`
- `isGoldStandard: true` quando aplicável

### Tratamento
- Objeto com blocos narrativos (`sintomatico`, `aguda`, `cronica`, etc.)
- Doses em tabela `clinicalTable` quando útil
- **Sem** imunossupressão/cirurgia “automática” sem evidência

### Prevenção
- Objeto com chaves descritivas

### Referências
- `references[]` com `citationText`, `sourceType`, `evidenceLevel`, `url` quando houver
- **Proibido:** VIN, `{{ref:N}}`

### Relacionamentos
- `relatedDiseaseSlugs`, `relatedMedicationSlugs`

## 3. Regras editoriais

1. **MG adquirida ≠ CMS** — fichas separadas, slugs distintos
2. Citações no corpo: `(Autor, ano)` — nunca marcadores `{{ref:1}}`
3. Divergências de dose: apresentar faixa conservadora + nota de literatura alternativa
4. Títulos de subseções via chaves camelCase → rótulo em `editorialSubsectionLabels.ts` **com acentos**
5. Conteúdo = síntese própria; não copiar redação proprietária de fontes pagas

## 4. Template mínimo

Ver `diseases.miastenia-gravis.seed.ts` e copiar estrutura de seções.

## 5. Teste mínimo

```ts
// tests/consulta-vet/<area>-<slug>.test.ts
- slug em diseasesSeed
- slug em CONSULTA_VET_PUBLIC_DISEASE_SLUGS
- cartão em PUBLIC_CATALOG_DISEASE_CARD_STUBS
- plainLanguage ou DISEASE_PLAIN_LANGUAGE[slug]
- clinicalSignsPathophysiology com objetos { finding, mechanism, ... }
- quickDecisionStrip.length >= 5
- references.length >= 5
```

## 6. Doenças relacionadas (exemplo neuromuscular)

| Ficha | Slug |
|-------|------|
| Miastenia gravis adquirida | `miastenia-gravis-caes-gatos` |
| Síndromes miastênicas congênitas | `sindromes-miastenicas-congenitas-caes-gatos` |

Ambas com `relatedDiseaseSlugs` apontando uma para a outra.
