# Vetius — relatório de correções e validação

Este relatório atualiza o diagnóstico de `output/diagnostics-2026-10-08/RELATORIO.md`. O ciclo de correções começou em 09/10/2026, com validação final em 10/10/2026, e considera o checkout com as alterações que já estavam presentes. Não houve publicação, alteração de contas reais ou execução de migrations no Supabase remoto.

## Resultado

As falhas reproduzidas nos testes foram corrigidas. A suíte final, executada depois da compilação, apresentou **1.132 testes: 1.129 aprovados, nenhuma falha e três ignorados**. TypeScript, lint, validação de payloads, HemoGasoVet, FluidoterapiaVET e build passaram.

A comparação com a cópia anterior confirmou **41 medicamentos, 78 doenças, todos os registros e identificadores de referências anteriores, e todas as doses com seus valores, unidades, vias, frequências e demais campos preservados**. As notas de segurança deixaram de ser acrescentadas repetidamente. Foram adicionadas estruturas de apresentação e referências que estavam ausentes, aproveitando o conteúdo já cadastrado.

As correções de autorização estão implementadas e testadas localmente. **A proteção do ambiente publicado depende da implantação da migration e das duas Edge Functions corrigidas.** Ainda existem cinco alertas altos na cadeia de compilação do Tailwind e uma citação clínica pendente de revisão, detalhados abaixo.

## Antes e depois

| Verificação | Diagnóstico anterior | Resultado após correções |
|---|---|---|
| Testes | 1.118 aprovados, cinco falhas, três ignorados | 1.129 aprovados, zero falhas, três ignorados |
| TypeScript | Três erros TS2322 | Sem erros no lint final |
| Payloads do banco | 1.003 arquivos, zero erros | 1.005 arquivos, zero erros |
| Auditoria de dependências | 25 pacotes vulneráveis; um crítico, 18 altos | Cinco altos; zero críticos, moderados, baixos |
| Login com `error_description=%25` | Exceção por dupla decodificação | Formulário visível e erro exibido; zero exceções no navegador |
| Autorização global | Permissões também derivadas de metadados editáveis | Permissões derivadas de metadados administrativos e listas do servidor |
| Exclusão de protocolos | Papel em outra clínica podia conceder exclusão | Papel avaliado na clínica de origem do protocolo, além do autor e administrador confiável |
| Consensos | Escrita ampla para usuários autenticados | Escrita limitada ao autor do documento ou administrador confiável |
| Imagem Phisioderm | PNG servido de 18.237.036 bytes | WebP servido de 2.447.028 bytes, 86,6% menor, pixels idênticos; original preservado |
| CI | Comandos de validação inexistentes | Lint, validadores existentes, build e suíte completa; Node 24 |

## Segurança

### Login e retorno à aplicação

- Retirado o segundo `decodeURIComponent` da mensagem de erro, porque `URLSearchParams` já entrega o valor decodificado.
- Centralizada a validação de retornos internos em `src/lib/internalRedirect.ts`, utilizada no login, callback OAuth e funções de autenticação.
- Caminhos internos mantêm consultas e fragmentos. URLs externas, caminhos `//`, barras invertidas, caracteres de controle e escapes inválidos retornam ao destino seguro.
- Testes cobrem retornos válidos e tentativas de desvio de origem sem lançar exceções.

### Protocolos globais

- `publish-global-protocol` e `delete-global-protocol` usam o mesmo helper de autorização.
- Campos como `user_metadata.is_admin`, `user_metadata.role` e `user_metadata.global_protocol_publisher` não concedem privilégios.
- Permissões administrativas continuam disponíveis por `app_metadata` mantido pelo servidor e por listas de IDs/e-mails configuradas no servidor. A lista de e-mails exige endereço confirmado.
- A exclusão preserva os direitos do autor, dos gestores da clínica de origem e dos administradores confiáveis. O `clinicId` fornecido no corpo da requisição não concede direitos sobre outra clínica.
- Removida a consulta redundante à clínica arbitrária e a resposta de depuração com identificadores internos.

### Banco e autoria de consensos

Migration: `supabase/migrations/20261009000100_secure_editorial_and_consensus_access.sql`.

- Substitui as duas gerações de policies permissivas de consensos. Isso é necessário porque policies permissivas se combinam por OR.
- Mantém leitura pública dos consensos publicados e leitura de rascunhos pelo autor e pelo administrador.
- Preserva criação, edição, publicação e exclusão de documentos próprios pelos autores autenticados.
- Limita edição dos detalhes compartilhados ao autor do documento ou ao administrador.
- Limita escrita em PDFs do bucket `consulta-consensos` ao proprietário do objeto ou ao administrador.
- Catálogos compartilhados de doenças, medicamentos e relacionamentos passam a exigir permissão editorial global do servidor. Ser proprietário de qualquer clínica não concede administração de todo o catálogo.
- A identificação histórica de `luishvet25` usa e-mail confirmado, sem aceitar nomes de perfil editáveis.
- A migration não contém exclusão de tabelas, documentos ou registros clínicos.

A restrição de leitura de rascunhos protege os registros do banco. O bucket existente continua público para manter os links dos PDFs: conhecer um URL público permite acessar aquele arquivo. Se os PDFs de rascunhos precisarem de confidencialidade, será necessário separar armazenamento privado e URLs assinados, com migração e validação dos leitores.

A interface foi ajustada junto com o banco: autores autenticados têm acesso a **Meus consensos**, o editor lista seus próprios documentos e a edição dos detalhes verifica a autoria do consenso selecionado. Administradores mantêm acesso ao catálogo e ao conjunto editorial. Essa distinção evita remover o trabalho legítimo dos autores ao fechar a administração global indevida.

Os testes executam a migration real em **PostgreSQL isolado com PGlite**, começando com policies antigas permissivas. Verificam leitura pública, bloqueio de rascunhos alheios, rejeição de autoria falsificada, impedimento de alteração de documentos e arquivos de terceiros, preservação de operações do autor e acesso administrativo. Não substituem um ensaio com todas as migrations históricas no Supabase de homologação.

### Configuração e dependências

- Instalação limpa com lockfile sincronizado. A instalação anterior foi preservada em `tmp/vetius-dependency-backup-20261009/node_modules`.
- DOMPurify 3.4.16, jsPDF 4.2.1, React Router DOM 7.18.4, Vite 6.4.4 e Tailwind 3.4.19.
- PDF.js raiz fixado em 5.5.207, fora do intervalo vulnerável informado pela auditoria desta execução; mantida a dependência própria de `react-pdf` para preservar compatibilidade.
- Atualizada a dependência transitiva `postcss-selector-parser`; o CSS gerado e os fluxos de nutrição foram verificados.
- Retirada a substituição de `GEMINI_API_KEY` em bundles Vite da raiz e do CRIVET. Não foram encontrados consumidores desse mecanismo no código avaliado.
- Vite de desenvolvimento usa loopback e acesso estrito ao filesystem, mantendo o suporte ao caminho real/junction do projeto.
- Configurados no Netlify `nosniff`, política de referência e CSP em modo **Report-Only**. A CSP observa violações, mas não bloqueia recursos; não deve ser contabilizada como uma política de bloqueio já implantada.

## Estabilidade e preservação de conteúdo

- Corrigidas as subclasses comerciais inválidas do micofenolato sem remover produtos, apresentações, classes ou informações cadastradas pelo usuário.
- Corrigida a tipagem dos ícones da tabela de indicações e declarada a compatibilidade do alias `editorialReferences` nas doenças.
- As 19 referências existentes da paralisia laríngea agora também ficam disponíveis pelo alias esperado, mantendo `references`.
- A montagem das referências mantém a ordem e os IDs existentes, acrescenta os vínculos ausentes e produz o mesmo resultado quando reaplicada.
- Referências de estudos já presentes nas fichas são recuperadas da própria citação e do próprio resumo. Não foram inventados resultados para satisfazer a suíte.
- Reconectados IDs legados às respectivas obras e estudos já cadastrados; referências externas acrescentadas tiveram seus metadados consultados em fontes primárias.
- Abas sem estrutura recebem os avisos e instruções já disponíveis na mesma monografia. Não recebem conteúdo de outro medicamento.
- Corrigido o parser de DOI para retirar parênteses finais sem correspondência, preservando parênteses legítimos do identificador.
- A suíte passa a ter um comando portátil `npm test`. O validador de payloads utiliza `glob` nativo do Node, eliminando a dependência de um pacote que não estava declarado.
- CI compila antes dos testes que verificam imagens distribuídas. Build e testes que leem `dist` devem ser executados nessa ordem, para evitar disputa durante a cópia dos assets.

O artefato `preservation.json` registra o resultado da comparação com `catalog-before.json`, incluindo os campos de apresentação/bibliografia modificados. PDFs e imagens originais não foram apagados, e não houve limpeza de dados salvos no navegador ou no banco. As alterações preexistentes no checkout foram mantidas.

## Performance

As 13 páginas da NutriçãoVET passaram a carregar sob demanda. A visão geral apresenta os atalhos e históricos antes de carregar os dados completos do catálogo; os números aparecem quando os dados ficam disponíveis, sem apresentar zero como valor provisório. Os cálculos e o catálogo completo permanecem disponíveis.

O chunk que contém a navegação da NutriçãoVET ficou em aproximadamente **46,38 kB**, com Dashboard separado de **9,29 kB**. A base nutricional continua completa em um chunk de **2.278,82 kB**, carregado conforme necessário. O antigo bundle do módulo concentrava aproximadamente 3,06 MB. Essa divisão reduz o trabalho necessário para a primeira apresentação; não elimina o tamanho da base de dados.

### Medições no preview de produção local

Microsoft Edge, desktop 1440 × 1000, três contextos novos de navegador, sem limitação artificial de rede/CPU:

| Execução | Conteúdo da visão geral pronto | Contagem do catálogo pronta |
|---|---:|---:|
| 1 | 882 ms | 893 ms |
| 2 | 1.301 ms | 1.312 ms |
| 3 | 781 ms | 792 ms |

Cada execução registrou aproximadamente **5,49 MB** em recursos e zero exceções de página. No mobile 390 × 844, o conteúdo ficou pronto em **751 ms**, sem overflow horizontal. A navegação aquecida no desktop ficou em 589 ms, registrada separadamente para não confundir cache com medição inicial.

O diagnóstico anterior observou 14,97–17,43 s no desktop. Os novos resultados são uma melhora observada neste ambiente local; não demonstram o mesmo ganho percentual em produção, redes móveis ou computadores mais lentos. A instalação anterior estava divergente e a carga da máquina variou entre as execuções.

A compilação final passou em **1 min 53 s**, com 3.735 módulos, contra 58,46 s no diagnóstico anterior. Portanto, **não houve comprovação de melhora do tempo de build**. Houve processamento concorrente durante parte dos ensaios e os tempos não constituem um benchmark controlado; investigar o build separadamente continua recomendado.

Permanecem chunks grandes de doenças, medicamentos, base nutricional e catálogo comercial, além do aviso de importação estática/dinâmica do catálogo ótico. Não foram removidos dados nem ocultados esses avisos.

## Validações e evidências

| Validação | Resultado | Artefato |
|---|---|---|
| Lint, TypeScript, conflitos SQL/merge e payloads | Aprovados; 1.005 arquivos, zero erros | `lint-final.log` |
| Build de produção | Aprovado; avisos de chunks preservados | `build.log` |
| Suíte completa após build | 1.129 aprovados, zero falhas, três ignorados | `full-tests-final.log` |
| Segurança e policies PostgreSQL | Seis testes aprovados | `security-tests.log` e suíte completa |
| HemoGasoVet | Aprovado | `hemogasovet.log` |
| FluidoterapiaVET | Aprovado | `fluidoterapia.log` |
| Fluxo NutriçãoVET desktop/mobile | 23 verificações aprovadas | `energia-ui.json` / `energia-ui-final.log` |
| Login inválido e páginas públicas | Sem exceções; login visível | `production-browser.json` e screenshot do login |
| Performance em contextos novos | Três execuções sem exceções | `cold-nutrition.json` |
| Preservação do catálogo | Aprovada | `preservation.json` / `verify-preservation.ts` |
| Auditoria npm final | Cinco altos; zero críticos/moderados/baixos | `npm-audit-final.json` |

Os três testes ignorados são os de RLS/migrations nutricionais e sincronização offline-first com Supabase local. Faltam o ambiente/credenciais locais necessários; o Docker não estava disponível para iniciar esse ambiente. Não foram considerados aprovados. As Edge Functions tiveram verificação sintática; a implantação e a execução HTTP autenticada remota não foram realizadas.

O validador de interface agora aguarda cada etapa, distingue os botões repetidos intencionalmente e retorna falha quando qualquer verificação falha. Verifica também a abertura dos dados completos e das fontes do alimento. Foram ajustadas expectativas antigas de texto, incluindo títulos exibidos em maiúsculas pelo CSS; não foram alterados os cálculos para satisfazer as expectativas.

## Pendências e próximas melhorias

### Necessárias para ativar a proteção no ambiente publicado

1. Confirmar os administradores editoriais legítimos e suas permissões em `app_metadata`, mantidas no servidor. A propriedade de uma clínica não equivale a administração global.
2. Aplicar a migration em homologação com o histórico completo. Conferir especialmente documentos/arquivos antigos sem autoria registrada; eles permanecem disponíveis, mas só administradores podem gerenciá-los até uma atribuição de autoria verificada.
3. Implantar a migration, as funções `publish-global-protocol` e `delete-global-protocol`, incluindo o helper compartilhado, e então o frontend/configuração Netlify.
4. Executar login real, criação/edição/substituição de PDF próprio e testes negativos entre duas contas/clínicas em homologação.

Nenhuma dessas etapas de implantação foi executada em produção nesta tarefa.

### Alertas restantes de dependências

Os cinco alertas altos derivam de **braces/chokidar/micromatch/Tailwind**, usados na cadeia de compilação. O advisory [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) descreve exaustão de pilha com padrões profundamente aninhados; a auditoria não oferece uma versão corrigida dentro do ramo atual de `braces`.

A solução proposta pelo npm exige migrar para Tailwind 4. Não foi executado `npm audit fix --force`, porque isso poderia alterar componentes e estilos. Planejar a migração em etapa própria, com comparação visual de todos os módulos, inclusive impressão/PDF. Enquanto isso, limitar os padrões da compilação a arquivos confiáveis do projeto. Esses alertas continuam presentes e não devem ser tratados como resolvidos.

### Revisão editorial clínica

A citação **Hasany et al. (2024)** vinculada à miltefosina para esporotricose não foi localizada. O ID e a informação original foram preservados, e a entrada foi marcada como **referência pendente de validação**, sem inventar DOI/PMID ou afirmar que a referência valida eficácia, dose ou segurança. Requer revisão editorial da indicação original.

A referência de Shin/Ambros usada na discussão da ondansetrona foi identificada, mas seu estudo compara dimenidrinato e maropitant. A nota acrescentada esclarece que ele não avalia diretamente a associação com ondansetrona. Passar nos testes de software não valida todas as afirmações clínicas do acervo.

Fontes primárias consultadas para as referências recuperadas: [Hickman 2008](https://doi.org/10.1111/j.1365-2885.2008.00952.x), [iCatCare 2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC13554608/), [ISFM 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC11107985/), [Shin/Ambros 2026](https://pubmed.ncbi.nlm.nih.gov/42208176/), [FDA Varenzin 2023](https://www.fda.gov/news-events/press-announcements/fda-conditionally-approves-first-drug-anemia-cats-chronic-kidney-disease) e [WAVD 2025](https://pubmed.ncbi.nlm.nih.gov/40745695/).

### Evolução de performance e estabilidade

- Separar um índice leve de busca das monografias completas, mantendo carregamento sob demanda, cache e comportamento offline.
- Reduzir importações estáticas do catálogo comercial compartilhado sem quebrar os consumidores síncronos.
- Aplicar a conversão lossless usada no Phisioderm a outros assets grandes, mantendo os originais e conferindo os pixels e perfis de cor.
- Medir LCP, INP e recursos no ambiente publicado, com condições fixas de rede/CPU e orçamento de regressão por rota.
- Executar os testes Supabase ignorados em homologação/CI com banco isolado e incluir ensaios dos endpoints autenticados.
- Avaliar as violações reais da CSP e transformá-la em política de bloqueio após validar OAuth, PDFs, imagens, workers e módulos externos.

## Reprodução

Usar Node 24 e executar na raiz do projeto:

```text
npm ci
npm run lint
npm run validate:hemogasovet
npm run validate:fluidoterapia-vet
npm run build
npm test
npm run test:security
```

Para repetir o fluxo de interface sobre o build em PowerShell:

```powershell
$env:VETIUS_UI_PREVIEW='1'
npm run validate:energia-vet-ui
```

O relatório e suas evidências ficam em `output/corrections-2026-10-09/`. As capturas ficam em `output/playwright/` e no diretório de execução registrado pelo validador de interface.
