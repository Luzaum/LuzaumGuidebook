# Auditoria interna do ConsultaVet — 13/09/2026

> Documento interno para desenvolvimento e QA. Não publicar no produto nem expor mensagens técnicas, nomes de tabelas, respostas do Supabase, stack traces ou detalhes de infraestrutura ao usuário final.

## Resumo executivo

O projeto compila e passa na checagem de tipos, conflitos e payloads de banco. Apesar disso, o estado atual não está pronto para publicação: 23 testes funcionais do ConsultaVet/Receituário falham, incluindo regressões com impacto clínico em cálculo de dose, troca de espécie, recálculo por peso, escolha de apresentação e bloqueio de formas injetáveis.

Também foram encontrados um recurso visual com caminho inválido, vazamento potencial de mensagens técnicas na interface, loaders sem limite de tempo, páginas finais semanticamente inconsistentes, busca que transforma falha em “nenhum resultado”, traduções literais/termos em inglês no conteúdo editorial e carregamento inicial excessivo.

### Resultado das verificações

| Verificação | Resultado |
|---|---:|
| `npm run typecheck` | passou |
| `npm run build` | passou com alertas de chunks grandes e importação dinâmica anulada |
| `npm run lint` | passou |
| `npm run test:receituario` | **181 passaram, 16 falharam** |
| `npx tsx --test tests/consulta-vet/*.test.ts` | **208 passaram, 7 falharam** |
| Referências estáticas locais de imagem/PDF em strings simples | **1 caminho inexistente em 402 referências verificadas** |
| Varredura automática de termos PT-BR | 69 candidatos; a maior parte é falso positivo em referências, nomes de produto ou código |

Observação: o diretório de trabalho já continha alterações não relacionadas e arquivos novos. A auditoria não alterou o código do produto.

## P0 — bloqueadores de publicação

### 1. Regressões de segurança no Receituário

Os 16 testes quebrados cobrem comportamentos que não devem ser liberados sem correção:

- maropitant perde apresentação/faixa no bloco editorial e na receita renderizada;
- maropitant e probiótico deixam de ter opções esperadas;
- sobredose grave deixa de produzir o alerta “ERRO DE DOSE P/ CONCENTRAÇÃO”;
- vínculo canônico legado por nome deixa de ser recuperado;
- apresentações injetáveis de ondansetrona reaparecem no receituário domiciliar;
- Fluimucil injetável reaparece para N-acetilcisteína;
- salbutamol pode interpretar 100 mcg como 100 jatos;
- fluticasona pode gerar jato fracionado;
- Seretide deixa de selecionar 25/125 e de manter o alerta de evidência limitada;
- maropitant felino pode escolher comprimido canino inseguro;
- maropitant canino pode preferir subdose;
- conversão pode duplicar `kg` ou perder a proteção de espécie;
- mudança de espécie e de peso não recalcula automaticamente a apresentação.

Arquivos de teste que reproduzem: `tests/receituario/clinical-medication-overrides.test.ts`, `tests/receituario/receituario-commercial-presentations.test.ts`, `tests/receituario/receituario-neurologia-models.test.ts` e demais casos reportados por `npm run test:receituario`.

Recomendação: bloquear deploy do Receituário até todos os 197 testes passarem. Corrigir a resolução canônica e a seleção de apresentação antes de ajustar snapshots/expectativas, pois várias falhas indicam mudança de comportamento e não apenas mudança textual.

### 2. Catálogo clínico e vínculos incompletos

Sete testes do próprio ConsultaVet falham:

- Arritmias não contém `figuraEstratificacaoUrgencia` onde o contrato editorial exige;
- Cetoacidose diabética e insulinoma perderam a categoria `emergencia-intensivismo`;
- `getMedicationTherapeuticClassIds` recebe registro ausente e lança `TypeError` ao ler `slug`;
- prednisolona está ausente da auditoria/integração esperada com Plumb’s 10;
- uma faixa clínica protegida mudou de `[1,3; 6]` para `[2; 4]` sem atualização coordenada do contrato;
- a cobertura automática de vínculos caiu de 29 medicamentos esperados para somente `dipirona`.

Reprodução: `npx tsx --test tests/consulta-vet/*.test.ts`.

Impacto: cartões podem desaparecer, categorias ficam incompletas, relações doença–medicamento deixam de aparecer e um consumidor que entregue valor indefinido ao classificador pode derrubar a tela.

Recomendação: verificar primeiro a composição de `medicationsSeed` e os filtros de catálogo público; depois restaurar os vínculos e tornar `getMedicationTherapeuticClassIds` defensivo para entrada inválida. Não mascarar o defeito apenas filtrando os testes.

## P1 — falhas funcionais importantes

### 3. Imagem quebrada por diferença de acentuação

- Referência no código: `modules/consulta-vet/data/seed/diseases.arritmias-cardiacas-caes-gatos.seed.ts:492`
- Caminho solicitado: `holter-gatos-saudáveis-cofaru-2026.png`
- Arquivo existente: `holter-gatos-saudaveis-cofaru-2026.png`

Em produção, o caminho com `á` não encontra o arquivo sem acento. Isso também se relaciona à falha do contrato visual de Arritmias.

Recomendação: usar somente nomes ASCII em assets e validar todos os caminhos locais no CI.

### 4. Mensagens internas podem ser exibidas ao usuário

Os seguintes fluxos colocam `error.message` diretamente na interface:

- `modules/consulta-vet/pages/ConsensoDetailPage.tsx:210-214` — falha ao carregar detalhes compartilhados;
- `modules/consulta-vet/pages/ConsensoDetailPage.tsx:281-284` — falha ao salvar detalhes;
- `modules/consulta-vet/components/consensus/PdfViewerShell.tsx:640-642` — erro do leitor de PDF;
- `modules/consulta-vet/pages/EditorialImportPage.tsx:72-78` — erro de validação/importação;
- `modules/consulta-vet/components/receituario/ReceitasTab.tsx:147` — erro ao excluir modelos.

Erros do Supabase, storage, PDF.js ou rede podem conter nomes de bucket/tabela, políticas, URLs, códigos internos ou mensagens em inglês.

Recomendação: criar uma função central `toPublicError(error, context)` que sempre retorne texto curto e neutro. Enviar o erro original somente para telemetria/console de desenvolvimento, com um identificador de ocorrência que possa ser informado ao suporte.

### 5. Falta de informação útil para o desenvolvedor nos Error Boundaries

`ConsultaVetErrorBoundary` e `src/ErrorBoundary.tsx` mostram mensagens adequadamente genéricas ao usuário, mas não registram o erro original, rota, versão do build nem identificador de correlação. O resultado é seguro para o usuário, porém pouco diagnosticável.

Recomendação: registrar internamente `error`, `componentStack`, rota, versão e `eventId`; mostrar ao usuário apenas “Não foi possível abrir esta tela” e o código curto de atendimento. Nunca renderizar stack trace ou resposta bruta.

### 6. Loader de autenticação pode ficar preso

`src/components/AuthSessionProvider.tsx` aguarda `supabase.auth.getSession()` sem timeout. Durante a auditoria, uma sessão local inválida/indisponível manteve todas as rotas protegidas apenas em “Carregando...”. O mesmo padrão existe na verificação inicial de Login/Signup.

Recomendação: impor timeout, limpar sessão corrompida quando aplicável e oferecer estado recuperável: “Não foi possível validar sua sessão”, com ações “Tentar novamente” e “Voltar ao login”.

### 7. Página de categoria pode permanecer em spinner após exceção

`modules/consulta-vet/pages/CategoryDetailPage.tsx:46-88` não possui `try/catch/finally`. Qualquer rejeição de `getBySlug` ou do `Promise.all` interrompe a função antes de `setIsLoading(false)`.

Recomendação: adotar o mesmo padrão de tratamento usado nas listas de doenças e medicamentos; diferenciar “categoria inexistente” de “falha ao carregar”.

### 8. Busca da página inicial oculta falha como resultado vazio

`modules/consulta-vet/pages/HomePage.tsx:177-201` captura qualquer erro e troca os resultados por três listas vazias. O usuário não consegue distinguir “nenhum item encontrado” de “a busca falhou”.

Recomendação: manter estado explícito de erro da busca, preservar o último resultado válido quando apropriado e incluir botão “Tentar novamente”.

## P2 — experiência, tradução e acessibilidade

### 9. Páginas finais “não encontrado” têm hierarquia inconsistente

As páginas de doença, medicamento, consenso e categoria usam `<h2>` como título principal de uma rota independente. Manejo emergencial e guias rápidos usam `<h1>` corretamente.

Arquivos: `DiseaseDetailPage.tsx`, `MedicationDetailPage.tsx`, `ConsensoDetailPage.tsx` e `CategoryDetailPage.tsx`.

Recomendação: padronizar todos os estados finais com um componente único contendo `<h1>`, descrição neutra, ação de retorno, ação para busca e, quando fizer sentido, sugestões relacionadas.

### 10. Lista de doenças fica visualmente vazia quando o filtro não encontra itens

`modules/consulta-vet/pages/DiseasesPage.tsx` renderiza o contador `0 doenças`, mas não possui um estado vazio equivalente ao já existente em `MedicationsPage.tsx`.

Recomendação: mostrar “Nenhuma doença encontrada”, botão “Limpar filtros” e sugestão de termo/categoria.

### 11. Favoritos e recentes sem próxima ação

Os estados vazios explicam que não há itens, mas não oferecem CTA. O usuário precisa descobrir sozinho para onde ir.

Recomendação: adicionar links para “Explorar doenças”, “Explorar medicamentos” e “Ver consensos”; em recentes, explicar que a lista é preenchida ao abrir um conteúdo.

### 12. Traduções literais e mistura desnecessária de inglês

Ocorrências visíveis que devem ser revisadas:

- `guideline` / `guidelines` em resumos, doses, notas e consensos: preferir `diretriz` / `diretrizes`;
- `droga de escolha`: preferir `fármaco de escolha` ou, melhor, descrever a opção preferencial no contexto;
- `ultra-low fat`: preferir `com teor ultrabaixo de gordura` e manter o limite em matéria seca;
- `Boxed Warning`: usar `alerta máximo de segurança (boxed warning)` apenas na primeira ocorrência; depois, português;
- `Open Access`: usar `acesso aberto` fora de títulos ou metadados bibliográficos;
- `Carregando autenticacao...`: falta acento em Login e Signup;
- `Proxima foto`: falta acento no rótulo acessível do carrossel de autenticação.

Exemplos: `publicCatalogCardStubs.ts:429`, `diseases.hipertensao.seed.ts:30`, `consensos.endocrinologia.seed.ts:21`, `consensos.nefrologia-urologia.seed.ts:21`, `requestedClinicalCommercialProducts.seed.ts:297`, `diseases.linfoma-cutaneo.seed.ts:98`, `src/routes/Login.tsx:92`, `src/routes/Signup.tsx:80` e `components/ui/travel-connect-signin.tsx:303`.

Nomes oficiais de artigos, produtos e documentos não devem ser traduzidos. A correção deve atingir apenas prosa editorial e interface.

### 13. A varredura automática de PT-BR atual tem baixa precisão e cobertura insuficiente

`scripts/scan-ptbr-quality.mjs` marcou `type="submit"` como palavra inglesa de interface e sinalizou referências bibliográficas/URLs, mas não detectou várias ocorrências de `guideline`, `autenticacao`, `Proxima foto` e mistura editorial de inglês.

Recomendação: separar o scanner em três contextos:

1. interface (`.tsx`, texto JSX, `aria-label`, placeholder);
2. conteúdo editorial (campos de seed, excluindo `citationText`, URL, DOI, título oficial);
3. termos clínicos preferenciais com lista de exceções explícitas.

Fazer o script retornar código diferente de zero somente para violações confirmadas, com allowlist versionada.

## P2 — desempenho e arquitetura

### 14. O shell inicia prefetch de todo o acervo editorial em qualquer rota

`modules/consulta-vet/components/layout/ConsultaVetShell.tsx` chama `prefetchConsultaVetEditorialSeeds()` ao montar. A função importa imediatamente doenças, medicamentos e consensos, mesmo quando o usuário abre receituário, favoritos ou outra seção que não precisa de todo o acervo.

O build atual produziu, entre outros:

- `App-*.js`: ~3.058 KB minificado;
- `diseases.seed-*.js`: ~1.498 KB;
- `receituarioCommercialCatalogService-*.js`: ~802 KB;
- `vendor-pdf-*.js`: ~626 KB;
- `ConsensoDetailPage-*.js`: ~538 KB.

Recomendação: remover o prefetch global ou dispará-lo após ociosidade e por intenção de navegação; dividir seeds por especialidade/entidade; carregar PDF.js apenas ao abrir o visualizador; revisar o conteúdo que permaneceu no chunk principal.

### 15. Importação dinâmica do catálogo ótico é anulada por importações estáticas

O Vite informa que `commercialOticProducts.seed.ts` é importado dinamicamente por `receituarioCommercialCatalogService.ts`, mas também estaticamente por `CommercialPresentationsPage.tsx` e `clinicalMedicationCatalogBridge.ts`. Assim, a importação dinâmica não cria chunk independente.

Recomendação: definir uma única fronteira de carregamento assíncrono para o catálogo comercial e impedir imports estáticos fora do módulo proprietário.

## Melhorias recomendadas para todo o módulo

1. Criar um componente único para estados `loading`, `empty`, `not-found` e `error`, com acessibilidade, retry e CTA consistentes.
2. Adotar contratos de erro públicos e telemetria interna com `eventId`.
3. Bloquear deploy com `typecheck`, `build`, todos os testes do ConsultaVet/Receituário, verificação de assets e scanner PT-BR refinado.
4. Adicionar testes de rota para slugs inexistentes, falha de rede, sessão expirada e dados parciais.
5. Adicionar testes visuais em 390, 820, 1366 e 1920 px, nos temas claro/escuro.
6. Medir bundle e tempo até conteúdo útil por rota, com orçamento de tamanho no CI.
7. Tornar busca e filtros compartilháveis pela URL e fornecer “Limpar filtros” em todos os estados vazios.
8. Normalizar terminologia editorial PT-BR sem alterar títulos oficiais de fontes.
9. Remover ou isolar código legado de autenticação simulada (`components/AuthProvider.tsx`), para evitar reuso acidental.
10. Revisar a geração de IDs editoriais baseada em `Date.now() + Math.random()` e preferir `crypto.randomUUID()` para reduzir colisões em importações/edições concorrentes.

## Ordem de correção sugerida

1. Corrigir os 16 testes de segurança do Receituário.
2. Restaurar catálogo/vínculos e os 7 testes do ConsultaVet.
3. Corrigir o asset de Arritmias e validar todos os recursos no CI.
4. Sanitizar erros públicos e adicionar telemetria interna.
5. Eliminar loaders infinitos e padronizar estados finais.
6. Corrigir PT-BR e fortalecer o scanner.
7. Reduzir chunks e prefetch global.
8. Executar regressão visual e funcional autenticada antes do deploy.
