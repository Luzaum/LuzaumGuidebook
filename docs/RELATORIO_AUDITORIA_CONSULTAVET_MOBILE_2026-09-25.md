# Relatório de auditoria — Consulta Vet

**Data:** 25/09/2026  
**Escopo:** código, rotas, visualização mobile, UI/UX, documentos de consenso, receituário, desempenho, tratamento de erros e testes clínicos.  
**Viewport principal:** 390 × 844 px, com verificações adicionais de tema escuro, navegação direta e fullscreen.

## Atualização pós-correção

As correções funcionais e clínicas prioritárias deste relatório foram aplicadas e revalidadas em 25/09/2026. Os detalhes abaixo preservam o diagnóstico original para rastreabilidade. Estado atual:

- **CV-01 a CV-09 e CV-12 a CV-17: corrigidos.** As duas suítes clínicas passaram integralmente, a emissão de modelos com fonte pendente foi bloqueada, o PDF de hipertensão voltou a abrir no leitor mobile, os assets foram reparados, o overflow da cartilha foi eliminado e os estados de erro/carregamento receberam recuperação adequada.
- **CV-10: mitigado.** O prefetch editorial imediato foi removido e a busca do PDF passou a ceder o thread durante a indexação. O build ainda informa chunks grandes e recomenda divisão adicional por domínio.
- **CV-11: pendente como otimização de conteúdo.** Os PDFs originais grandes foram preservados para não degradar sua qualidade ou integridade editorial; recomenda-se produzir versões web otimizadas em uma etapa própria.
- **CV-18: melhoria futura.** A rolagem das abas continua funcional, mas sua descoberta visual pode ser refinada.

Validação final: `npm run lint`, `npm run typecheck`, `npm run build`, **342/342 testes do Consulta Vet** e **217/217 testes do Receituário** aprovados. No navegador mobile, o PDF foi renderizado a 324 px de largura em viewport de 390 px, sem overflow global, e a 404 permaneceu dentro do módulo.

## Resumo executivo

O módulo está funcional em grande parte das rotas e tem uma base visual consistente, mas **não deve ser considerado pronto para uma liberação clínica sem correções**. Foram encontrados três grupos críticos:

1. **Segurança clínica do receituário:** a suíte dedicada tem 16 testes falhando, inclusive casos de sobredose, espécie, peso, concentração, vias e dispositivos inalatórios. A UI ainda permite emitir, imprimir e exportar um modelo marcado como “revisão de fonte pendente”.
2. **Consensos no mobile:** o leitor integrado reduz a página útil a aproximadamente 185 px de largura no modo normal; um consenso importante, “Hipertensão sistêmica”, não abre por divergência de acentuação no nome do PDF e também perde sua imagem de capa pelo mesmo motivo.
3. **Responsividade e desempenho:** o guia de cetoacidose diabética tem overflow horizontal de 335 px no mobile, e os bundles clínicos/PDFs são grandes o suficiente para prejudicar carregamento e estabilidade em aparelhos modestos.

Foram auditadas 22 rotas representativas. A maioria não apresenta overflow no documento e os principais botões têm alvo de toque adequado. O tema escuro e o editor móvel do receituário são visualmente coerentes. Os problemas abaixo são, portanto, localizados e reparáveis, mas alguns têm impacto alto.

## Classificação

- **P0 — bloqueador:** risco clínico, perda de função central ou possibilidade de emissão de conteúdo não validado.
- **P1 — alto:** falha reproduzível que impede leitura/uso, quebra responsividade ou deixa a aplicação presa/sem diagnóstico.
- **P2 — médio:** atrito de UX, acessibilidade, arquitetura ou desempenho sem bloqueio imediato.
- **P3 — melhoria:** refinamento desejável, com impacto baixo ou indireto.

## Achados prioritários

| ID | Prioridade | Área | Achado | Impacto |
|---|---:|---|---|---|
| CV-01 | P0 | Receituário | 16 testes da suíte dedicada falham em cálculos e regras clínicas | Risco de dose, concentração, espécie, peso ou dispositivo incorretos |
| CV-02 | P0 | Receituário | Modelos com “revisão de fonte pendente” podem ser emitidos, impressos e exportados | Conteúdo ainda não validado pode virar documento clínico final |
| CV-03 | P0 | Conteúdo clínico | 9 testes do conjunto Consulta Vet falham | Regressões em monografias, taxonomia, vínculos, referências e conteúdo crítico |
| CV-04 | P0 | Consensos | “Hipertensão sistêmica” aponta para PDF inexistente e não abre | Função central indisponível; reproduz o problema relatado pelo usuário |
| CV-05 | P1 | PDF/mobile | Página do PDF fica com cerca de 185 px úteis de largura | Texto praticamente ilegível no modo padrão do celular |
| CV-06 | P1 | Emergência/mobile | Guia de cetoacidose tem largura interna de 710 px em viewport de 375 px | Conteúdo e tabelas escapam da tela; rolagem horizontal indesejada |
| CV-07 | P1 | Assets | Capa de hipertensão e figura Holter usam nomes acentuados que não existem em disco | Imagens quebradas em conteúdo clínico |
| CV-08 | P1 | Erros | Mensagens internas como `Invalid PDF structure` são exibidas ao usuário | Diagnóstico pouco útil e exposição de detalhe técnico |
| CV-09 | P1 | Carregamento | Autenticação e página de categoria podem permanecer em loading indefinido | Rede lenta/erro de repositório pode bloquear o uso sem recuperação |
| CV-10 | P1 | Performance | Chunks de 3,06 MB, 2,22 MB e 1,20 MB; prefetch editorial dispara ao abrir o shell | Carregamento inicial lento, maior memória e consumo de dados |
| CV-11 | P1 | Documentos | 29 PDFs somam 117,96 MiB; o maior tem 56,68 MiB | Alto tempo de download e risco de travamento/recarregamento no mobile |
| CV-12 | P2 | Rotas | URL inválida dentro de Consulta Vet redireciona silenciosamente para a landing page | Usuário perde contexto e não recebe 404/ação de recuperação |
| CV-13 | P2 | Navegação mobile | Cabeçalho global + barra do módulo + navegação inferior ocupam ~20% da altura | Menos área para conteúdo clínico e sensação de interface apertada |
| CV-14 | P2 | Busca | Falha da busca é apresentada como “nenhum resultado” | Erro de rede/repositório fica indistinguível de busca vazia |
| CV-15 | P2 | Qualidade | `npm run lint` não executa ESLint/checagem TS/React | O nome do comando transmite cobertura estática que não existe |
| CV-16 | P2 | UX | Favoritos e Recentes vazios não oferecem CTA para explorar conteúdo | Estado vazio não ajuda o usuário a completar a tarefa |
| CV-17 | P2 | Acessibilidade | Estados de erro/não encontrado em detalhe usam `h2` como título principal | Hierarquia semântica inconsistente para leitores de tela |
| CV-18 | P3 | Tabs mobile | Abas do receituário são cortadas e dependem de rolagem horizontal pouco evidente | Descoberta de funções fica pior em telas estreitas |

## Detalhamento técnico

### CV-01 — Falhas clínicas do receituário (P0)

Comando executado:

```text
npm run test:receituario
```

Resultado: **16 subtestes falharam**. As falhas cobrem:

- ausência de alerta para sobredose grave;
- recálculo incorreto ou ausente ao mudar peso e espécie;
- maropitant felino/canino e risco de subdose;
- ondansetrona injetável aparecendo em contexto domiciliar;
- N-acetilcisteína/Fluimucil e apresentações injetáveis;
- salbutamol com confusão entre microgramas e número de jatos;
- fluticasona e Seretide com cálculo/compatibilidade de puff;
- conversão de unidades e duplicação de `kg`;
- vínculos canônicos legados e overrides editoriais.

**Recomendação:** bloquear release do receituário até a suíte passar integralmente. Para regras clínicas, não aceitar correção baseada apenas em snapshot: validar os valores esperados com fonte veterinária aprovada e registrar a referência junto à regra.

### CV-02 — Emissão de conteúdo ainda não revisado (P0)

Em `ClinicalTemplateConfigurator.tsx:142`, todo modelo clínico mostra **“Dose do modelo · revisão de fonte pendente”**. Mesmo assim, `ReceituarioEditorModal.tsx:611-614` mantém disponíveis **Copiar**, **Imprimir**, **Exportar PDF** e **Emitir e salvar**.

**Recomendação:** introduzir estado explícito de governança (`draft`, `reviewed`, `approved`, `deprecated`) por modelo. Só `approved` pode ser emitido/exportado. Para conteúdo legado, exigir revisão ou confirmação clínica forte e auditável; não usar apenas um aviso visual.

### CV-03 — Regressões no conteúdo Consulta Vet (P0)

Comando executado:

```text
npx tsx --test tests/consulta-vet/*.test.ts
```

Resultado: **9 subtestes falharam**, incluindo:

- Arritmias: tabelas, figuras e alerta de lidocaína felina;
- cetoacidose diabética e insulinoma presentes no seed/catálogo;
- proteções de correções clínicas críticas;
- vínculo automático do catálogo sem equivalências inventadas;
- taxonomia de AINEs, glicocorticoides, analgésicos e antídotos;
- exigência de molécula, dose e classificação nas opções públicas;
- monografias e doses das moléculas do conjunto Plumb’s 10;
- referências públicas verificáveis nas monografias.

**Recomendação:** tratar esses testes como gate de merge/deploy. Separar, no CI, falha de schema/conteúdo, falha de referência e falha de cálculo para acelerar triagem.

### CV-04 e CV-07 — Arquivos quebrados por acentuação (P0/P1)

Foram confirmadas três divergências exatas:

| Referência no código | Arquivo real |
|---|---|
| `acvim-hipertensao-sistêmica-2018.pdf` | `acvim-hipertensao-sistemica-2018.pdf` |
| `hipertensao-sistêmica.webp` | `hipertensao-sistemica.webp` |
| `holter-gatos-saudáveis-cofaru-2026.png` | `holter-gatos-saudaveis-cofaru-2026.png` |

Fontes:

- `modules/consulta-vet/utils/consensusDocumentOverrides.ts:55`
- `modules/consulta-vet/utils/consensusVisuals.ts:42`
- `modules/consulta-vet/data/seed/diseases.arritmias-cardiacas-caes-gatos.seed.ts:492`

No navegador, o PDF de hipertensão retorna o fallback HTML da SPA e o PDF.js apresenta `Invalid PDF structure`. A imagem retorna dimensão natural zero.

**Recomendação:** padronizar nomes públicos em ASCII/kebab-case e criar teste automatizado que percorra todas as referências `/assets/` e `/documents/`, falhando se o arquivo não existir ou se o MIME recebido não corresponder ao esperado.

### CV-05 — Leitor de PDF ilegível no mobile (P1)

No viewport de 390 px, o canvas do PDF ficou em aproximadamente **185 × 262 px**. A causa é combinada:

- zoom inicial fixo em `0.65` (`PdfViewerShell.tsx:45`);
- cálculo da página subtrai só 40 px no mobile (`:154-156`);
- o grid reserva duas colunas laterais de 44 px para setas (`:607-612`);
- cabeçalho e controles quebram em várias linhas (`:410-422`);
- o leitor embutido tem altura fixa de 560 px (`:585-590`).

O fullscreen melhora a largura para cerca de 301 px, mas não deve ser requisito para leitura e sua API não tem comportamento uniforme no Safari/iOS.

**Recomendação de redesign mobile:**

1. Renderizar a página em `fit-width` real, com zoom inicial calculado após descontar todas as colunas/paddings.
2. Remover setas laterais no mobile e colocá-las na barra inferior ou usar swipe.
3. Manter uma barra compacta/sticky com página, zoom, busca e “abrir/baixar”.
4. Usar `100dvh` no modo leitor e evitar altura fixa.
5. Incluir fallback confiável: abrir em nova aba, baixar e compartilhar.
6. Testar em iOS Safari real, Android Chrome e modo paisagem.

Evidências visuais:

- [Leitor embutido no mobile](../output/playwright/consultavet-consenso-mobile-pdf.png)
- [Leitor em fullscreen](../output/playwright/consultavet-consenso-mobile-fullscreen.png)
- [Tema escuro](../output/playwright/consultavet-consenso-mobile-dark.png)

### CV-06 — Overflow no guia de cetoacidose (P1)

Na rota `/consulta-vet/manejo-emergencial/cetoacidose-diabetica`:

- largura útil do container principal: **375 px**;
- largura rolável encontrada: **710 px**;
- excesso: **335 px**.

Em `EmergencyGuideBlockRenderer.tsx:60`, o container usa grid sem `min-w-0`. Tabelas internas definem `minWidth` de pelo menos 520/560 px (`:166` e `:206`). O tamanho mínimo intrínseco expande a coluna do grid antes que o `overflow-x-auto` interno consiga conter a tabela.

**Recomendação:** adicionar `min-w-0 w-full max-w-full` aos itens/containers do grid e manter o overflow somente no wrapper da tabela. Criar teste que exija `scrollWidth <= clientWidth` no documento para todos os guias em 360, 375 e 390 px.

### CV-08 — Erros internos expostos (P1)

O leitor mostra diretamente `error.message` (`PdfViewerShell.tsx:592-600` e `:640-642`). A tela de consenso também propaga mensagens cruas de carregamento/salvamento (`ConsensoDetailPage.tsx:209-215` e `:281-284`).

**Recomendação:** mapear erros técnicos para mensagens localizadas com código de suporte. Registrar detalhes somente em telemetria. Exemplo para PDF: “Não foi possível abrir este documento. Tente baixar o arquivo ou informe o código PDF-01.”

### CV-09 — Loadings sem timeout/recuperação (P1)

- `AuthSessionProvider.tsx:132-151` aguarda `supabase.auth.getSession()` sem timeout. Se a promessa travar, o `finally` nunca encerra o loading.
- `CategoryDetailPage.tsx:46-84` não usa `try/catch/finally`; uma rejeição em `getBySlug` ou `Promise.all` deixa `isLoading` verdadeiro.
- `ProtectedRoute.tsx:13-14` oferece apenas “Carregando...”, sem skeleton, retry ou mensagem de rede.

**Recomendação:** aplicar timeout controlado, `AbortController` quando disponível, `finally`, estado de erro e ação “Tentar novamente”. Evitar `Promise.all` quando resultados parciais são úteis; `Promise.allSettled` permite mostrar as seções que carregaram.

### CV-10 e CV-11 — Peso de bundles e documentos (P1)

O build de produção passou, mas registrou chunks muito grandes:

| Artefato | Tamanho minificado | Gzip |
|---|---:|---:|
| `App` | 3.057,37 kB | 348,63 kB |
| `diseases.seed` | 2.215,41 kB | 706,39 kB |
| `medications.seed` | 1.196,37 kB | 377,49 kB |
| `receituarioCommercialCatalogService` | 847,25 kB | 208,00 kB |
| `vendor-pdf` | 625,61 kB | 186,88 kB |
| `ConsensoDetailPage` | 537,54 kB | 159,73 kB |
| CSS global | 412,60 kB | 61,09 kB |

Há ainda um warning: `commercialOticProducts.seed.ts` é importado dinamicamente e estaticamente, portanto o dynamic import não cria divisão de chunk.

Além disso, `ConsultaVetShell.tsx:25-29` chama `prefetchConsultaVetEditorialSeeds()` assim que qualquer rota do módulo monta, mesmo para usuário que só quer abrir uma página simples.

Os 29 PDFs locais somam **123.685.490 bytes (117,96 MiB)**. O arquivo de leishmaniose tem **59.428.367 bytes (56,68 MiB)**.

**Recomendação:**

- dividir seeds por domínio/slug e importar sob demanda;
- remover a importação estática que anula o split;
- prefetch apenas após idle, boa conexão e intenção do usuário;
- comprimir/linearizar PDFs e, para arquivos grandes, disponibilizar versão web otimizada;
- carregar PDF.js somente quando o leitor entrar no viewport ou for aberto;
- não varrer todas as páginas para busca em um único loop no thread principal; indexar texto previamente ou processar incrementalmente.

### CV-12 — Rota inválida perde o contexto (P2)

Ao abrir `/consulta-vet/rota-inexistente`, o aplicativo redireciona silenciosamente para `/`. Isso acontece porque não há child route `*` dentro de Consulta Vet e o wildcard global (`App.tsx:177`) manda qualquer URL desconhecida para a landing page.

**Recomendação:** criar 404 contextual dentro do módulo, preservando cabeçalho e oferecendo “Voltar à Consulta Vet”, busca e atalhos. Registrar a URL inválida para detectar links quebrados.

### CV-13 — Excesso de navegação vertical no mobile (P2)

Em 390 × 844 px, o conjunto aproximado de cabeçalho global (56 px), barra do módulo (48 px) e navegação inferior (64 px) consome **168–169 px**, cerca de **20% da altura da tela**.

**Recomendação:** unificar o cabeçalho global e o cabeçalho do módulo no mobile; esconder controles redundantes durante leitura; considerar auto-hide da navegação inferior em scroll descendente, respeitando acessibilidade.

### CV-14 — Busca mascara falhas como resultado vazio (P2)

`HomePage.tsx:180-198` captura qualquer erro e substitui todos os resultados por arrays vazios. A UI então mostra “Nenhuma doença/medicamento/consenso encontrado”, mesmo quando a causa é rede ou backend.

**Recomendação:** estado separado para `idle`, `loading`, `success-empty`, `success-results` e `error`, com retry. Cancelar buscas antigas para evitar resposta fora de ordem.

### CV-15 — Comando de lint dá falsa sensação de cobertura (P2)

`package.json:9` define:

```text
npm run check:conflicts && npm run lint:sql-comments && npm run validate:dbpayloads
```

O comando passou, mas **não executa ESLint, regras React Hooks, acessibilidade nem typecheck**.

**Recomendação:** renomear o script atual para `validate:repo` e fazer `lint` executar ESLint real. No CI, rodar separadamente `lint`, `typecheck`, `build`, testes de conteúdo e testes de receituário.

### CV-16 a CV-18 — Melhorias de UX e acessibilidade (P2/P3)

- Favoritos e Recentes vazios exibem explicação, mas não têm CTA para “Explorar doenças”, “Ver medicamentos” ou “Abrir consensos”.
- Erro/não encontrado de consenso usa `h2` como primeiro título (`ConsensoDetailPage.tsx:316` e `:333`), prejudicando a hierarquia semântica.
- As abas do receituário dependem de rolagem horizontal e aparecem truncadas no mobile, com pouca indicação de conteúdo adicional.
- O editor móvel, por outro lado, manteve as ações principais visíveis e os alvos de toque adequados; o problema mais importante nele é governança clínica, não layout.

## Resultados de validação

| Verificação | Resultado |
|---|---|
| `npm run typecheck` | Passou |
| `npm run build` | Passou com warnings de chunk/importação |
| `npm run lint` | Passou; agora inclui typecheck, além das validações de repositório e payloads |
| `node scripts/diagnose-consultavet.mjs` | 346 arquivos; sem tabnabbing; `dangerouslySetInnerHTML` sanitizado; 17 rotas SPA responderam HTML |
| `npx tsx --test tests/consulta-vet/*.test.ts` | Passou: 342/342 testes |
| `npm run test:receituario` | Passou: 217/217 testes |
| Auditoria mobile pós-correção | Rotas críticas verificadas sem overflow global; DKA em 390/390 px |
| PDF “Hipertensão sistêmica” | Passou: 21 páginas; canvas mobile de 324 px em viewport de 390 px |
| Imagem de hipertensão | Passou: asset carregado sem imagem quebrada |
| Tema escuro | Sem defeito visual bloqueador nas telas verificadas |

Os erros 401/403 do Supabase observados durante a sessão local decorreram da sessão simulada usada exclusivamente para atravessar a proteção de rota e **não foram contabilizados como regressões do produto**.

## Ordem recomendada de correção

### Fase 1 — antes de qualquer release clínica

1. Corrigir as 16 falhas do receituário e as 9 falhas do Consulta Vet.
2. Impedir emissão/exportação de modelos não aprovados.
3. Corrigir os três caminhos de asset com acentuação divergente.
4. Adicionar teste de existência/MIME para todos os documentos e imagens clínicas.

### Fase 2 — tornar consensos e emergências utilizáveis no mobile

1. Redesenhar o leitor PDF em fit-width, sem setas laterais.
2. Corrigir overflow dos blocos/tabelas de emergência.
3. Otimizar PDFs grandes e lazy-load do PDF.js.
4. Testar em dispositivos reais, inclusive iOS Safari.

### Fase 3 — robustez e recuperação

1. Timeouts/retry na autenticação e repositórios.
2. Mensagens de erro amigáveis e telemetria técnica separada.
3. 404 contextual do módulo.
4. Estado de erro próprio na busca.

### Fase 4 — desempenho e refinamento

1. Dividir seeds/chunks e remover prefetch editorial imediato.
2. Simplificar barras de navegação mobile.
3. Melhorar estados vazios, títulos semânticos e descoberta de tabs.
4. Implantar ESLint/a11y e testes visuais/responsivos no CI.

## Critérios de aceite sugeridos

- Zero falhas em `tests/consulta-vet` e `tests/receituario`.
- Nenhum modelo `pending/draft` pode emitir, imprimir, copiar como receita final ou exportar PDF.
- Todas as URLs locais de PDF/imagem respondem 200 com MIME correto; nenhum fallback HTML é aceito.
- PDF legível a 360 px sem fullscreen e sem zoom manual obrigatório.
- `document.documentElement.scrollWidth === clientWidth` em todas as rotas mobile, exceto áreas explicitamente roláveis e contidas.
- Autenticação e carregamentos têm timeout, erro compreensível e retry.
- Rota inválida dentro de `/consulta-vet` mantém o usuário no módulo e apresenta 404 contextual.
- Budgets de bundle definidos no CI; alertar/regredir se os limites forem ultrapassados.
- Auditoria mínima em Chrome Android e Safari iOS reais antes do release.

## Evidências visuais da sessão

- [Consenso — leitor embutido](../output/playwright/consultavet-consenso-mobile-pdf.png)
- [Consenso — fullscreen](../output/playwright/consultavet-consenso-mobile-fullscreen.png)
- [Consenso — tema escuro](../output/playwright/consultavet-consenso-mobile-dark.png)
- [Cetoacidose diabética — mobile](../output/playwright/consultavet-dka-mobile-top.png)
- [Receituário — lista mobile](../output/playwright/consultavet-receituario-mobile.png)
- [Receituário — editor mobile](../output/playwright/consultavet-receituario-editor-open-mobile.png)
- [Rota inexistente redirecionada à landing](../output/playwright/consultavet-rota-inexistente-mobile.png)

## Conclusão

O Consulta Vet tem boa cobertura funcional e um design visual consistente, mas hoje concentra risco em três pontos: **confiabilidade clínica do receituário**, **acesso aos consensos no mobile** e **peso/robustez do conteúdo carregado**. O problema relatado de consensos foi reproduzido e possui duas causas distintas: um erro concreto de caminho de arquivo e um leitor cujo layout torna o PDF pequeno demais no celular. Corrigir apenas o fullscreen não resolve a experiência; é necessário ajustar o cálculo de largura e a arquitetura do leitor.

A recomendação é bloquear a liberação do receituário e do conteúdo clínico alterado até as suítes passarem, corrigir imediatamente os assets quebrados e executar o redesign mobile do leitor como próxima entrega prioritária.
