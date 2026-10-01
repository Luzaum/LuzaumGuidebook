# Resumos com aprofundamento progressivo — 30/09/2026

A organização anterior foi recuperada: abas de visão geral, diagnóstico e tratamento nas doenças; pilares, indicações e avisos nos medicamentos. O editor, a importação e o mapeamento do banco voltaram ao comportamento anterior. Não houve gravação no banco ou publicação.

## Leitura

1. Abertura breve em palavras simples, redigida para cada ficha.
2. Prévia própria para cada cartão, conservando o assunto e o título original.
3. Explicação original integral disponível no mesmo bloco, por expansão. Indicações mantêm todos os esquemas, doses, vias, durações e ressalvas.
4. Planos diagnósticos e terapêuticos continuam nas abas originais. Os capítulos completos não foram reorganizados.

As prévias de `progressiveSummaryPreviews.ts` cobrem as 69 doenças e os 28 medicamentos encontrados no catálogo durante esta revisão, incluindo a nova ficha de intermação. Foram redigidas 348 prévias para os pilares. São paráfrases dos assuntos das fichas, sem corte por caracteres ou reticências. As sínteses bibliográficas da revisão anterior são utilizadas como prévias clínicas complementares, não como substituição das monografias.

## Preservação e verificação

- Cinco testes percorrem todas as fichas e conferem abertura simples, cobertura e extensão das prévias, preservação literal dos textos e dados posológicos, ausência de mutação dos registros e disponibilidade das notas além da quinta.
- As expansões começam fechadas, têm controles nativos acessíveis e não descartam o conteúdo original.
- Conferência visual com componentes e CSS reais em 1440 px e 390 px; abertura de cartão e navegação entre as três abas verificadas no navegador. A página de componentes é usada porque a rota completa exige autenticação.
- Capturas: `output/playwright/progressive-summaries-desktop.png` e `output/playwright/progressive-summaries-mobile.png`.
- A revisão não constitui auditoria integral dos protocolos clínicos originais.

## Resultado final das verificações

- `node --import tsx --test tests/consulta-vet/progressive-summaries.test.tsx`: 5/5 passaram, percorrendo todas as fichas.
- Build Vite: passou; avisos de tamanho de chunks e importação mista já existentes.
- Checagem global de tipos: bloqueada por campos de referências (`issue`, `edition`) na nova ficha de intermação e `controlNotice` na ficha de amitriptilina, arquivos de outras alterações em andamento. Não houve erro apontado nos componentes e dados desta revisão. Esses arquivos foram preservados.
