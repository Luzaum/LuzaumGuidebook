# Diagnóstico do Vetius — performance, segurança e estabilidade

Diagnóstico iniciado em **08/10/2026** e concluído em **09/10/2026**, conforme atualização de data da sessão; timezone **America/Sao_Paulo**. Projeto: `LuzaumGuidebook`, pacote `Vetius`. Commit de base: `a77953d0d199d8cd59ace1e586ac5fbf56a29fe7`.

## Parecer executivo

**O estado local avaliado não atende aos critérios recomendados para uma liberação confiável.** O build conclui, mas a checagem de tipos falha, cinco testes falham de forma reproduzível, o teste de interface nutricional interrompe antes de completar o fluxo e existem fragilidades importantes de autorização no código do servidor e nas migrations.

A base tem pontos positivos: 1.118 testes aprovados, carregamento de módulos sob demanda, sanitização centralizada de HTML, ErrorBoundary global, timeout de sessão, validação de payloads e testes de cache. Esses controles não compensam as lacunas de autorização e de verificação contínua.

A NutriçãoVET também apresentou conteúdo pronto em **14,97–17,43 segundos no desktop local**, nas três medições que aguardaram a conclusão do carregamento. É um achado de performance relevante neste ambiente, com causa ainda não isolada; o viewport mobile variou de 0,69 a 8,92 segundos. Priorizar uma captura de perfil de CPU/rede e confirmar em ambiente limpo antes de atribuir toda a demora ao tamanho do bundle.

**Não foi comprovada invasão, vazamento ou exploração em produção.** Os problemas de autorização abaixo foram identificados por inspeção do código. Não se confirmou quais funções/migrations estão implantadas no Supabase atual. A auditoria de dependências descreve principalmente o `package-lock.json`, que diverge da instalação local.

## Ambiente, escopo e método

- Windows, PowerShell, Node **24.16.0**, npm **11.13.0**, Vite instalado **6.4.3**, navegador Microsoft Edge via Playwright.
- Avaliado o checkout atual, incluindo alterações preexistentes do usuário e arquivos ainda não versionados. Portanto, este diagnóstico não representa apenas o commit citado, nem necessariamente o site publicado.
- Executados lint/TypeScript, build de produção, suíte ampliada de testes, repetição das suítes com falha, três validadores de módulos, auditoria npm completa e sem dependências de desenvolvimento, análise dos arquivos gerados, varredura limitada de segredos, revisão de autorização/RLS e diagnósticos no navegador.
- Teste de carga limitado a arquivos estáticos no preview local em `127.0.0.1:4188`; nenhuma carga foi aplicada ao Supabase.
- Não foram feitas correções funcionais, publicação, migrations ou alterações em dados de usuários. Foram criados apenas artefatos do diagnóstico e executados os scripts existentes.

## Resultados de estabilidade

| Verificação | Resultado | Evidência |
|---|---|---|
| Marcadores de conflito | Aprovado | `lint.log` |
| Comentários SQL | Aprovado | `lint.log` |
| Payloads Supabase | 1.003 arquivos; zero erros | `lint.log` |
| TypeScript | Reprovado; três erros TS2322 | `lint.log` |
| Build | Aprovado; 3.697 módulos; 58,46 s; avisos de chunks grandes | `build.log` |
| Suíte ampliada | 1.126 testes: 1.118 aprovados, 5 falhos, 3 ignorados; 62,30 s | `tests.log` |
| Reexecução das suítes com falha | 18 testes: 13 aprovados, as mesmas 5 falhas | `failures-recheck.log` |
| HemoGasoVet | Aprovado | `hemogasovet.log` |
| FluidoterapiaVet | Aprovado | `fluidoterapia.log` |
| NutriçãoVET — interface | Interrompido por seletor ambíguo | `energia-ui.log` |

### Erros que precisam ser resolvidos

**E1 — Tipagem inconsistente, prioridade alta.** Em `modules/consulta-vet/data/mycophenolateCommercialProducts.seed.ts`, linhas 13, 139 e 241, a subclasse `neurologic` não pertence a `CommercialMedicationSubclass`. O Vite transpila mesmo assim; por isso build aprovado não significa TypeScript aprovado. Decidir se a taxonomia deve aceitar a nova subclasse ou se o cadastro precisa usar uma existente. Critério de aceite: `npm run lint` com código de saída zero.

**E2 — Conteúdo de medicamentos, prioridade alta.** Quatro falhas em `tests/consulta-vet/medication-content-isolation.test.tsx`:

1. Ciclosporina sem os tópicos didáticos/de evidência esperados pelo contrato.
2. Domperidona com a referência `ref-domp-sabate-2014` rejeitada pela regra de integridade do teste.
3. A aplicação repetida de `applyMedicationBookFoundations` altera novamente a ficha de enrofloxacina, duplicando texto de alerta. A transformação não é idempotente.
4. A ficha de ciclosporina não atende à checagem de campos obrigatórios; a execução falha na presença de `attentionData.precautions`.

Esses testes demonstram divergências em contratos de conteúdo e transformação; não constituem uma auditoria independente da exatidão clínica. Corrigir origem e normalização, conferir referências no material primário e assegurar que reaplicar a transformação produza o mesmo objeto.

**E3 — Referências da paralisia laríngea, prioridade média.** Em `tests/consulta-vet/respiratory-paralisia-laringea-caes-gatos.test.ts:93`, o registro não tem o conjunto `editorialReferences` exigido, com pelo menos 15 referências. Não reduzir arbitrariamente o teste: verificar se houve migração de estrutura ou perda de conteúdo e ajustar o contrato de maneira explícita.

**E4 — Teste de interface ambíguo, prioridade média.** `scripts/validate-energia-vet-ui.ts:78` procura o botão “Próximo: Formulação”, mas encontra dois. Trata-se de uma falha do seletor de automação, não prova de que o usuário não consiga avançar. O fluxo posterior, resumo, alimentação e verificações responsivas desse script ficam sem validação. Definir um contêiner/identificador estável para a ação e concluir o roteiro; avaliar se os dois botões são intencionais.

**E5 — CI desalinhado, prioridade alta.** `.github/workflows/quality-gate.yml` usa Node 20 e executa `validate:profiles`, `validate:profiles:strict`, `validate:refs` e `validate:rulesets`, que não existem no `package.json` avaliado. Não executa a suíte ampliada, nem `npm run lint`. A falha é identificada na configuração; não foi consultada uma execução remota. Atualizar workflow/scripts e exigir tipos, testes e build antes do deploy. Fixar a mesma versão suportada de Node para desenvolvimento e CI.

**Integração ainda não validada.** Foram ignorados três testes: isolamento RLS de `nutrition_calculation_runs`, presença de tabelas/migrations nutricionais v3 no Supabase local e E2E offline-first com sync/idempotência/conflito/PDF. Faltam as variáveis de ambiente do banco de teste. Executar em instância isolada com usuários de clínicas distintas e jamais interpretar “skip” como aprovação.

## Segurança

### S1 — Autorização baseada em metadados editáveis: alta prioridade

`supabase/functions/publish-global-protocol/index.ts:301` e `supabase/functions/delete-global-protocol/index.ts:141` aceitam flags administrativas em `user.user_metadata`. A [documentação do Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security) explica que esse campo pode ser alterado pelo usuário autenticado; permissões devem vir de dados controlados pelo servidor.

As funções usam um cliente administrativo. Aceitar essas flags cria um caminho de elevação de permissão em publicação/exclusão global, sujeito aos demais requisitos da função. A falha de confiança está confirmada no código, mas não foi explorada contra o serviço implantado.

**Melhoria:** retirar `user_metadata` de toda decisão de autorização; usar `app_metadata` mantido pelo servidor ou tabela dedicada de administradores com acesso restrito. Validar token, recurso, clínica e papel em cada operação. Critério de aceite: alterar metadados de perfil de um usuário comum não muda a autorização; tentativas de publicação/exclusão indevidas recebem 403 e não alteram dados.

### S2 — Escrita ampla em consensos e armazenamento: alta prioridade

As migrations `20260307203000_create_consensus_documents.sql` e `20260308000100_create_consensus_documents.sql` concedem inserção, atualização e exclusão em `consensus_documents` a `authenticated`, com `true` nas condições. Também concedem escrita/exclusão de objetos no bucket `consulta-consensos` mediante apenas identificação do bucket. Não foi localizada uma migration posterior que retire essas políticas da tabela principal/bucket.

A migration `20260312150000_restrict_consensus_document_details_writes.sql` restringe **os detalhes** a `owner`, mas não elimina as permissões amplas da tabela principal. Além disso, `owner` de qualquer clínica pode editar conteúdo compartilhado quando a regra apenas verifica a existência de uma membership com esse papel. A função `bootstrap_clinic` cria uma clínica com membership `owner` para um usuário sem clínica. Isso exige uma decisão explícita: dono de clínica não deve automaticamente equivaler a editor global se o catálogo for administrado centralmente.

**Melhoria:** separar editor global de dono de clínica; revogar todas as políticas permissivas antigas, inclusive nomes legados; criar regras por operação e por recurso. Conferir o catálogo real de `pg_policies`, grants e storage em staging. As políticas permissivas podem se combinar por OR; acrescentar uma regra restrita sem remover a ampla não fecha o acesso. Critério: usuário comum, membro e dono de outra clínica não conseguem modificar/excluir conteúdo global nem PDFs alheios.

### S3 — Dependências e falta de reprodutibilidade: alta prioridade

| Auditoria do lockfile | Críticos | Altos | Moderados | Baixos | Total de pacotes |
|---|---:|---:|---:|---:|---:|
| Completa | 1 | 18 | 4 | 2 | 25 |
| `--omit=dev` | 1 | 15 | 4 | 0 | 20 |

Os totais representam pacotes sinalizados, não vulnerabilidades independentes nem explorações demonstradas. A propagação transitiva também conta pacotes relacionados ao mesmo problema. Mesmo a árvore sem dev contém ferramentas transitivas/peers; isso não prova que todos os alertas alcancem o navegador.

| Pacote | Lockfile | Instalação local examinada |
|---|---|---|
| jsPDF | 4.0.0 | 4.2.1 |
| DOMPurify | 3.2.6 | 3.4.14 |
| Vite | 6.3.5 | 6.4.3 |
| React Router DOM | 7.12.0 | 7.18.3 no nível raiz; verificar árvore transitiva |
| Tailwind | 3.4.17 | 3.4.19 |

O alerta crítico do jsPDF é [GHSA-wfv2-pwc8-crg5](https://github.com/parallax/jsPDF/security/advisories/GHSA-wfv2-pwc8-crg5), que afeta versões até 4.2.0 e foi corrigido em 4.2.1. Logo, **esse alerta específico atinge a instalação reproduzida a partir do lockfile, mas não a versão local 4.2.1**. Os usos examinados de geração PDF usam `output('blob')`; não foi encontrado uso dos modos de nova janela que caracterizam esse alerta. Não há exploração confirmada no Vetius.

**Melhoria:** atualizar dependências e lockfile de forma revisada, testar PDFs/sanitização/navegação, instalar com `npm ci` em checkout isolado e repetir auditoria e testes. Verificar versões efetivamente resolvidas em cada dependência, não apenas o nível raiz. Não aplicar `npm audit fix --force` indiscriminadamente: a auditoria sugere migração de Tailwind 3 para 4 para parte da cadeia, exigindo avaliação de compatibilidade.

`npm ls jspdf dompurify react-router react-router-dom vite postcss --json` também terminou com `ELSPROBLEMS`: quatro problemas de árvore, incluindo dependências `invalid` e `extraneous`. A instalação contém caminhos de uma estrutura `.pnpm`, embora o CI use npm. Isso reforça que o build medido não é uma reprodução limpa do lockfile. Padronizar o gerenciador e verificar a resolução transitiva antes de concluir quais versões entram em cada rota. Evidências: `installed-dependencies.json` e seu log bruto.

### S4 — Configuração e defesa adicional: prioridade média

- `vite.config.ts` define valores de `GEMINI_API_KEY` para substituição no cliente. Se código frontend usar essa constante, o segredo pode entrar no bundle. Não se confirmou exposição de chave nesta execução. Mover chamadas com credenciais privadas para backend; variáveis substituídas no cliente não são armazenamento secreto, conforme a [documentação do Vite](https://vite.dev/guide/env-and-mode).
- O servidor de desenvolvimento usa `host: true` e `fs.strict: false`. Restringir a `127.0.0.1` e reativar a proteção de arquivos para uso diário; abrir rede somente quando necessário. Isso se refere a desenvolvimento, não ao servidor publicado.
- `netlify.toml` não declara CSP, proteção de enquadramento, `nosniff` ou política de referrer. Conferir primeiro os headers efetivos da hospedagem, que não foram medidos; então adotar CSP em Report-Only e ajustar fontes/integrações antes de impor bloqueio.
- `AuthCallback.tsx` aceita `next` apenas por `startsWith('/')`, enquanto Login também rejeita `//`. Unificar uma função de validação de destinos internos. Não foi demonstrado redirecionamento externo autenticado nesta execução.

**Controles positivos:** os quatro usos de `dangerouslySetInnerHTML` encontrados nos módulos examinados passam por `sanitizeHTML`, com lista restrita de tags/atributos. A busca por quatro padrões de credenciais em 1.800 arquivos versionados não encontrou ocorrências. Essa busca não cobre histórico Git, todos os formatos de segredo, arquivos não versionados nem conteúdo de produção; não é certificação de ausência de segredos.

## Performance: build e volume de ativos

O build produziu **225 arquivos JS/CSS**, somando **18,62 MB**; a soma de seus tamanhos gzip calculados é **5,09 MB**. Isso é o conjunto da aplicação, não o download inicial de cada visitante. Foram encontrados quatro chunks acima do limite configurado de 900 kB.

| Chunk | Minificado | Gzip |
|---|---:|---:|
| Catálogo de doenças | 4,03 MB | 1,34 MB |
| App de módulo | 3,06 MB | 349 kB |
| Catálogo de medicamentos | 2,66 MB | 843 kB |
| Serviço de catálogo comercial do receituário | 1,03 MB | 257 kB |
| Receituário | 756 kB | 195 kB |
| Vendor PDF | 626 kB | 187 kB |

O CSS principal tem **416 kB**, ou aproximadamente **62 kB gzip**. Existe aviso de importação simultaneamente estática/dinâmica de `commercialOticProducts.seed.ts`, o que impede o isolamento esperado desse módulo por importação dinâmica.

A pasta `public` contém **1.158 arquivos e 444,79 MB**. Os maiores incluem um PDF de **59,43 MB**, a imagem comercial `phisioderm-virbac.png` de **18,24 MB** e um PDF de **13,84 MB**. Esses arquivos não são necessariamente carregados juntos, mas aumentam custo de distribuição e podem afetar muito as páginas que os usam.

**Melhorias com maior retorno:**

1. Separar catálogos por especialidade/registro; carregar índice leve de busca e conteúdo detalhado sob demanda. Preservar estratégia explícita para funcionamento offline.
2. Retirar dependências estáticas que anulam o lazy loading; conferir a árvore de imports antes de criar manualChunks adicionais.
3. Converter imagens comerciais para WebP/AVIF, ajustar dimensões ao uso e criar thumbnails. Para a imagem de 18 MB, definir como meta de trabalho uma versão de até 200 kB, validando legibilidade.
4. Otimizar PDFs sem comprometer texto/figuras e usar carregamento por demanda/range quando suportado.
5. Rever geração CSS, fontes e ícones; aplicar orçamento por rota. Gzip calculado não comprova que a hospedagem entrega compressão.
6. Medir p75 de LCP, INP e CLS em usuários reais antes de declarar conformidade. Como metas iniciais, usar LCP até 2,5 s, INP até 200 ms e CLS até 0,1; são metas de trabalho, não resultados certificados deste diagnóstico.

## Teste de carga local

Foram feitas **360 requisições**, em três lotes de 120, distribuídas entre HTML de três rotas e um arquivo JS estático. Todas receberam HTTP 200, sem timeout.

| Concorrência | Requisições | Erros | p50 | p95 | Vazão observada |
|---:|---:|---:|---:|---:|---:|
| 1 | 120 | 0 | 23,70 ms | 90,52 ms | 33,13 req/s |
| 6 | 120 | 0 | 88,43 ms | 172,59 ms | 60,96 req/s |
| 12 | 120 | 0 | 185,68 ms | 255,75 ms | 61,99 req/s |

O crescimento da latência e a estabilização da vazão são observações deste processo local, enquanto outras ferramentas do diagnóstico também podiam estar ativas. Não extrapolar para número de usuários simultâneos, capacidade de CDN, latência de consultas, limites do Supabase ou disponibilidade de produção. O teste não é um ensaio prolongado de saturação ou vazamento de memória.

## Plano de melhorias e critérios de conclusão

| Ordem | Ação | Critério de conclusão |
|---|---|---|
| P0 | Retirar permissões de `user_metadata`; revisar escrita global em consensos/storage | Testes negativos de autorização com usuário comum e clínicas distintas; 403 sem alterações |
| P0 | Tornar dependências reproduzíveis e corrigir alerta crítico do lockfile | Instalação limpa auditada, PDF/sanitização/navegação aprovados |
| P1 | Corrigir 3 erros de tipos e 5 falhas reproduzíveis | Lint e suíte ampliada verdes |
| P1 | Atualizar CI e recuperar roteiro nutricional | Workflow executa scripts existentes, inclui tipos/testes/build; fluxo UI completo |
| P1 | Executar RLS e offline/sync em staging isolado | Zero testes de integração ignorados; cenários entre clínicas e conflitos aprovados |
| P1 | Reduzir imagem de 18 MB e dividir os catálogos maiores | Orçamento por rota, medição antes/depois e conteúdo íntegro |
| P1 | Investigar carregamento demorado/variável da NutriçãoVET | Perfil de CPU/rede, reprodução em máquina limpa e orçamento de prontidão por rota |
| P2 | Medir headers de produção; implementar CSP gradualmente | Headers verificados e integrações funcionais |
| P2 | Acrescentar telemetria de erros, performance e sync | Dashboards e alertas com metas mensuráveis e sem dados pessoais nos logs |
| P2 | Ensaiar recuperação de rede, sessão expirada, deploy com chunk antigo e storage cheio | Falhas explicadas ao usuário, sem duplicação/perda silenciosa de dados |

Sugestão de execução: segurança e reprodutibilidade primeiro; depois os bloqueios de testes/CI; por fim a redução de ativos e a medição de produção. O esforço depende das regras pretendidas de administração global, do acesso a staging e da revisão dos contratos de conteúdo.

## Limitações e evidências

Não foram validados login com conta real, fluxo autenticado completo, carga de API/banco, migrations implantadas, RLS efetiva do banco remoto, headers/TLS da hospedagem, backup/restore, exportações de todos os módulos, longa duração, todos os navegadores ou acurácia clínica independente.

Não foi calculada cobertura de código. A suíte ampliada inclui os testes localizados nas famílias Consulta Vet, receituário, nutrição, transfusão e neurologia; não certifica todos os caminhos possíveis de todos os módulos.

Os arquivos desta pasta preservam os logs, JSONs e scripts de reprodução. As métricas de navegador e incidentes reproduzidos seguem abaixo.

## Navegador: medições e falhas reproduzidas

Build de produção servido pelo Vite preview local. Edge, viewport desktop 1440 × 1000 e mobile 390 × 844, três navegações por rota e viewport, cache HTTP desabilitado. Sem redução de velocidade de CPU ou rede. Foram amostrados FCP, LCP e deslocamentos de layout por PerformanceObserver. O navegador continua compartilhando ambiente/sistema; não se trata de dispositivo móvel físico.

Na primeira passagem a coleta aguardou 1,2 s após o evento load. As três amostras desktop da NutriçãoVET ainda exibiam a tela de carregamento e foram excluídas da tabela inicial. Foi executada uma segunda passagem para a NutriçãoVET aguardando conteúdo, limitada a 20 s, antes de amostrar por mais 1 s. Esses tempos são de laboratório e não substituem Core Web Vitals de campo. O indicador de bloqueio usa long tasks no intervalo observado e não é uma nota Lighthouse.

| Viewport | Rota | FCP mediano | LCP mediano | Deslocamento acumulado | Recursos observados |
|---|---|---:|---:|---:|---:|
| desktop | / | 604 ms | 1404 ms | 0.0001 | 4.21 MB |
| desktop | /login | 500 ms | 920 ms | 0.0000 | 0.81 MB |
| desktop | /signup | 500 ms | 1428 ms | 0.0000 | 0.81 MB |
| desktop | /calculadora-energetica | 3888 ms | 15908 ms | 0.0001 | 5.67 MB |
| mobile | / | 756 ms | 1488 ms | 0.0010 | 4.21 MB |
| mobile | /login | 376 ms | 756 ms | 0.0000 | 0.81 MB |
| mobile | /signup | 504 ms | 872 ms | 0.0000 | 0.81 MB |
| mobile | /calculadora-energetica | 2460 ms | 4312 ms | 0.0000 | 5.67 MB |

Tamanhos de recursos são encodedBodySize quando informado pelo navegador; recursos externos sem Timing-Allow-Origin podem não contribuir. Eles não representam tamanho total de protocolo ou dados completos de todos os módulos. O preview local não reproduz a compressão/configuração da CDN.

**Prontidão da NutriçãoVET:** desktop, execução 1: conteúdo detectado em 14.97 s; desktop, execução 2: conteúdo detectado em 17.43 s; desktop, execução 3: conteúdo detectado em 15.13 s; mobile, execução 1: conteúdo detectado em 3.82 s; mobile, execução 2: conteúdo detectado em 0.69 s; mobile, execução 3: conteúdo detectado em 8.92 s.

**Interface:** não houve overflow horizontal nem imagens quebradas nas amostras iniciais. Não houve pageerror não capturado nessas navegações normais; isso não cobre erros capturados internamente, problemas de teclado, contraste, todos os formulários ou todo o conteúdo autenticado.

**Rotas protegidas:** 11/11 redirecionaram o visitante sem sessão para /login: /hub, /app, /consulta-vet, /consulta-vet/receituario, /fluidoterapia-vet, /transfusao-sanguinea, /hemogasovet, /dor, /antibioticoterapia, /crivet, /neurologia. É uma verificação do guard de interface, não da autorização do banco/API.

**E6 — Login derrubado por parâmetro de erro, prioridade alta para estabilidade.** Reproduzido ao navegar para `/login?error_description=%25`. A tela passou a exibir “Não foi possível carregar esta página”. Em `src/routes/Login.tsx:35`, URLSearchParams já decodifica o parâmetro, mas o código chama decodeURIComponent novamente; o valor `%` provoca URIError. Usar o valor já decodificado, ou tratar a decodificação sem lançar exceção. Critério de aceite: parâmetros malformados mostram uma mensagem de erro e preservam o formulário. A reprodução não demonstrou execução de scripts ou vazamento.

**Offline:** recarregar /calculadora-energetica sem rede falhou na navegação. Recuperar uma página nova offline é diferente de persistir um cálculo já aberto localmente. Não foi encontrado registro de Service Worker nos arquivos de entrada examinados. Definir se a promessa do produto inclui abertura/reload offline; se incluir, implementar app shell/cache versionado e testar atualização, reconexão e consistência. Os testes E2E de sincronização com banco continuaram ignorados.

**Volume por rota:** a home teve aproximadamente 4,21 MB de recursos observados no preview. Isso torna otimização de mídia/fontes e compressão na hospedagem relevantes, mesmo com tempos de laboratório aparentemente bons. A amostra de apenas três execuções não permite estimar p75 real ou certificar metas de performance.

## Reprodução e leitura dos artefatos

```powershell
npm run lint
npm run build
npx tsx --test tests/receituario/*.test.ts tests/nutrition/*.test.ts tests/consulta-vet/*.test.ts tests/consulta-vet/*.test.tsx tests/transfusion-products.test.ts modules/neurologia/lib/__tests__/*.test.ts modules/neurologia/lib/*/__tests__/*.test.ts
npm run validate:hemogasovet
npm run validate:fluidoterapia-vet
npm run validate:energia-vet-ui
npm audit --json
npm audit --omit=dev --json
npm run preview -- --host 127.0.0.1 --port 4188 --strictPort
```

Os scripts de navegador exigem sessão Playwright CLI `vetius-diagnostics` aberta em Edge e preview ativo. `run-browser.cjs` usa o caminho local do CLI desta sessão; em outro computador ajustar esse caminho. `load-diagnostics.mjs` reproduz o teste estático local. Logs e JSONs estão na mesma pasta deste relatório. A captura visual final fica em `output/playwright/vetius-diagnostics-home-mobile.png`.

A liberação deve aguardar pelo menos: correção dos controles de autorização identificados, instalação reproduzível auditada, lint/suíte verdes e execução das integrações em staging. O diagnóstico de produção permanece pendente dos cenários explicitados nas limitações.
