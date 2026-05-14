# Relatório de Auditoria do App Vetius - 2026-05-12

## Escopo executado

- App local iniciado em `http://127.0.0.1:5173/`.
- Auditoria estática de rotas, módulos, providers, configuração Vite, Supabase e scripts.
- Smoke test com Playwright nas principais rotas públicas e protegidas.
- Checagem responsiva em desktop `1440x900` e mobile `390x844`.
- Verificações automáticas: `npm run build`, `npx tsc --noEmit --pretty false`, validadores clínicos e validadores de payload/SQL.

## Resultado executivo

O app sobe localmente e o build de produção passa. A maior parte das rotas públicas renderiza sem crash: landing, hub, autenticação, NutriçãoVET, Fluidoterapia, Transfusão, HemoGasoVet, Escalas de Dor, Peçonhentos, Antibioticoterapia, CRI VET via iframe, Neurologia, Hidroeletrovet e ConsultaVET.

O principal problema técnico é que o repositório não passa no TypeScript: foram detectadas 179 linhas de erro em `npx tsc --noEmit`, concentradas em `modules/receituario-vet`, `supabase/functions`, `modules/consulta-vet`, `modules/fluidoterapia-vet` e `modules/plantao-vet`. Isso significa que o bundle Vite passa, mas a base não está type-safe.

Também há instrumentação de agente gravada no runtime (`index.tsx`, `App.tsx`, `vite.config.ts`) chamando `http://127.0.0.1:7548`, gerando erros de console e ruído em todas as navegações.

## Funcionalidades mapeadas

### Shell e navegação

- Landing page institucional em `/`.
- Hub de módulos em `/hub`.
- Layout global com menu lateral, toggle de tema e menu de autenticação.
- Rotas lazy-loaded com fallback de carregamento.
- Fallback SPA customizado no Vite para deep links.

### Autenticação e conta

- Login em `/login`.
- Cadastro em `/signup`.
- Callback OAuth em `/auth/callback`.
- Reset de senha em `/reset-password`.
- Área autenticada em `/app`, `/conta/perfil`, `/conta/configuracoes` e `/conta/clinica`.
- Proteção de rotas por sessão e por clínica ativa.

### Módulos clínicos públicos

- `NutriçãoVET` em `/calculadora-energetica`: cálculo energético, pacientes, guia BCS, alimentos, hospitalização e relatórios.
- `Fluidoterapia Vet` em `/fluidoterapia-vet`: cálculo de fluidos, ressuscitação, TCE/osmoterapia, guias clínicos, diluições, monitorização e alertas.
- `Transfusão Sanguínea` em `/transfusao-sanguinea`: cálculo, preparo, compatibilidade e guias.
- `HemoGasoVet` em `/hemogasovet`: interpretação, histórico, quiz, guias, referências e parâmetros.
- `Escalas de Dor` em `/dor`: escolha de espécie, escalas, avaliação, resultados, guias e calculadora.
- `Peçonhentos` em `/peconhentos`: dashboard, suspeitas, protocolos, triagem, enciclopédia e apoio por IA.
- `Antibioticoterapia Vet` em `/antibioticoterapia`: guia por suspeita, doenças por sistema, antimicrobianos, resistência, perioperatório, alertas e referências.
- `CRI VET` em `/crivet`: calculadora carregada em iframe a partir de `/apps/crivet/index.html`.
- `Neurologia` em `/neurologia`: exame completo, base neurológica, exame rápido, histórico e Glasgow.
- `Hidroeletrovet` em `/veteletrolitico`: reposição eletrolítica, condições clínicas e acesso rápido.
- `ConsultaVET` em `/consulta-vet`: doenças, medicamentos, consensos, favoritos, recentes, categorias, editorial, manejo emergencial e guias rápidos.

### Módulos protegidos

- `Receituário Vet` em `/receituario-vet` e subrotas: nova receita, rascunhos, histórico, clientes, catálogo, manipulados, protocolos, templates, controle especial, configurações e impressão.
- `PlantaoVET` em `/plantao-vet`: dashboard, pacientes, detalhe do paciente, pendências, passagem de turno e importação inteligente.

## Evidências de validação

- `npm run build`: passou.
- `npm run check:conflicts`: passou, nenhum marcador de conflito.
- `npm run validate:hemogasovet`: passou.
- `npm run validate:fluidoterapia-vet`: passou.
- `npm run validate:dbpayloads`: passou com 0 erros; avisou apenas diretórios dentro de `modules/crivet/node_modules`.
- `npm run lint:sql-comments`: passou.
- `npm run validate:energia-vet-ui`: falhou por timeout em `validateSummaryAndHistory`, esperando navegação para `**/calculadora-energetica` depois do clique em `#btn-save-plan`.
- `npx tsc --noEmit --pretty false`: falhou com 179 linhas de erro.

## Bugs e problemas encontrados

### P0 - Bloqueadores de qualidade técnica

1. TypeScript não passa.
   - Impacto: o projeto aceita regressões que o compilador já detecta.
   - Concentração:
     - `modules/receituario-vet`: 91 erros.
     - `supabase/functions`: 25 erros.
     - `modules/consulta-vet`: 12 erros.
     - `modules/fluidoterapia-vet`: 10 erros.
     - `modules/plantao-vet`: 10 erros.
     - `src/lib`: 7 erros.
     - `modules/energia-vet`: 7 erros.
     - `modules/neurologia`: 5 erros.
     - `modules/hemogasovet`: 4 erros.
     - `modules/crivet`: 3 erros.
     - `modules/antibioticoterapia-vet`: 1 erro.

2. Edge Functions do Supabase estão incluídas no `tsconfig` web.
   - Erros de `Deno`, imports `npm:`/`jsr:` e tipos Supabase aparecem no `npx tsc`.
   - Correção esperada: separar `tsconfig.app.json` e `tsconfig.supabase-functions.json`, ou excluir `supabase/functions` do check web e validá-las com ferramenta Deno/Supabase própria.

### P1 - Bugs funcionais ou riscos altos

1. Instrumentação residual de agente no app.
   - Arquivos: `index.tsx`, `App.tsx`, `vite.config.ts`.
   - Sintoma: várias requisições para `http://127.0.0.1:7548/ingest/...` falham no console em rotas como `/hub`, `/consulta-vet`, `/neurologia` e outras.
   - Impacto: ruído de erro, possível vazamento de metadados de sessão local, custo de rede e risco de mandar debug para código de produção se passar despercebido.

2. `validate:energia-vet-ui` falha no fluxo de salvar plano.
   - Arquivo: `scripts/validate-energia-vet-ui.ts`.
   - Linha crítica: espera `page.waitForURL('**/calculadora-energetica')` após `#btn-save-plan`.
   - Possibilidades: fluxo do app não navega mais para dashboard, botão não conclui salvamento, ou o teste está desatualizado.

3. ConsultaVET cai em fallback ao carregar consensos.
   - Sintoma no console: `[ConsultaVet] consensus fallback Error: Falha ao carregar consensos: [object Object]`.
   - Arquivo relacionado: `modules/consulta-vet/services/adapters/supabase/supabaseConsensoRepository.ts`.
   - O app continua renderizando seed/local, mas a falha real fica mal diagnosticada.

4. Contratos de dados clínicos divergentes.
   - Exemplos:
     - `supportingFindings` vs `supportiveFindings` em Neurologia.
     - `Problem` sem `createdAt`/`updatedAt` em PlantaoVET.
     - campos de manipulados/compounded ausentes em `PrescriptionItem`.
     - espécies como `string[]` onde o domínio espera `VetSpecies[]`.
   - Impacto: risco de PDF, importação, histórico, protocolos e prescrição quebrarem em fluxos específicos.

### P2 - Problemas de UX, acessibilidade e manutenção

1. Controles pequenos demais.
   - Login desktop: dots do carrossel com 8px de altura.
   - HemoGasoVet: vários botões ou controles internos com 12px de largura detectados.
   - Impacto: alvo de toque ruim, acessibilidade reduzida.

2. Avisos Base UI em NutriçãoVET.
   - Console informa que um componente com semântica de botão renderiza elemento não nativo enquanto `nativeButton` é true.
   - Impacto: acessibilidade, formulários e navegação por teclado.

3. Navegação mobile da Fluidoterapia usa faixa horizontal que deixa itens fora do viewport.
   - Pode ser intencional por scroll/snap, mas precisa affordance visual clara para o usuário perceber mais itens.

4. Dependência `next-themes` importada em app Vite.
   - Arquivo: `modules/energia-vet/components/ui/sonner.tsx`.
   - O pacote não está em `package.json`, e o erro aparece no TypeScript.
   - Correção: usar `utils/theme` existente ou remover esse wrapper se não estiver em uso.

5. Muitos `console.log` de debug em módulos de dados e receituário.
   - Impacto: poluição de console, possível exposição de payloads clínicos em ambiente dev/prod se não houver gate.

6. `modules/crivet/node_modules` parece estar versionado ou presente dentro do módulo.
   - `validate:dbpayloads` varreu `modules/crivet/node_modules` e tentou ler diretórios de pacotes.
   - Correção: garantir que sub-`node_modules` não participe de scripts, git, tsc ou varreduras.

## Plano completo de correção

### Fase 1 - Higiene crítica e sinais de execução

1. Remover instrumentação residual de agente.
   - Limpar blocos `#region agent log` em `index.tsx` e `App.tsx`.
   - Remover `console.info('[agent-debug:188c33] ...')` do fallback Vite.
   - Manter logs só atrás de flag explícita, por exemplo `VITE_DEBUG_RUNTIME=true`.

2. Corrigir configuração de TypeScript por ambiente.
   - Criar `tsconfig.app.json` para React/Vite.
   - Criar `tsconfig.scripts.json` para scripts Node.
   - Criar ou documentar check separado para `supabase/functions` com Deno/Supabase CLI.
   - Excluir `supabase/functions` e `modules/**/node_modules` do check web.

3. Adicionar scripts de qualidade padronizados.
   - `typecheck:app`.
   - `typecheck:scripts`.
   - `typecheck:functions` ou `functions:check`.
   - `validate:all` chamando os validadores existentes.

### Fase 2 - Corrigir erros TypeScript por domínio

1. Receituário Vet primeiro.
   - Resolver união `PrescriptionItem`: separar `StandardPrescriptionItem` e `CompoundedPrescriptionItem` com discriminante confiável.
   - Adicionar campos de manipulados no tipo correto ou mover para `metadata` tipado.
   - Corrigir `RxvButtonVariant` para aceitar `ghost` ou trocar usos para variantes existentes.
   - Corrigir `Protocolos3Page` removendo referências inexistentes a `setSelectedProtocolId` ou mapeando para `setSelectedProtocolKey`.

2. ConsultaVET.
   - Decidir se `relatedDiseaseSlugs` faz parte de `DiseaseRecord`; se sim, adicionar ao tipo e persistência.
   - Tipar espécies como union `dog | cat | both` desde o parser/importador.
   - Ajustar repositórios Supabase para aceitar builders thenable ou remover helper que exige `Promise<unknown>`.
   - Melhorar mensagem de fallback para exibir `error.message`, `code`, `details` e `hint`.

3. PlantaoVET.
   - Unificar `Problem`, `Task`, `Bulletin` com campos temporais obrigatórios.
   - Corrigir importação inteligente para produzir objetos completos.
   - Ajustar `ShiftType` para incluir ou substituir `night`.

4. Neurologia.
   - Corrigir `supportingFindings` para `supportiveFindings`.
   - Alinhar enum de evolução com `insidioso`, `oscilante`, `recorrente` ou normalizar antes de chamar análise.
   - Tipar variants do Framer Motion com `Variants` ou `as const`.

5. Energia, Fluidoterapia, HemoGasoVet, CRI VET e Antibioticoterapia.
   - Remover `next-themes`.
   - Corrigir componentes Base UI/Radix com tipos corretos.
   - Tipar select wrappers de Fluidoterapia.
   - Corrigir narrowing de input no HemoGasoVet.
   - Passar `usePreDilution` para `CalculationConfig` do CRI VET.
   - Inicializar `useRef<number | null>(null)` em `AnimatedBackground`.

### Fase 3 - Validadores e fluxos críticos

1. Investigar `validate:energia-vet-ui`.
   - Rodar teste em modo headed.
   - Confirmar comportamento esperado de `#btn-save-plan`.
   - Se o app mudou, atualizar o teste para esperar o estado correto.
   - Se o app deveria navegar ao dashboard, corrigir o handler de salvamento.

2. Criar smoke tests de rotas.
   - Cobrir landing, hub, login, signup e todos os módulos públicos.
   - Validar ausência de page errors e ausência de request failed inesperada.
   - Validar iframe do CRI VET lendo o frame filho, não só o body do shell.

3. Criar smoke tests protegidos.
   - Sem sessão: `/receituario-vet` e `/plantao-vet` devem redirecionar para `/login?next=...`.
   - Com sessão mockada ou ambiente seed: validar `/app`, setup de clínica, receituário e plantão.

### Fase 4 - UX e acessibilidade

1. Aumentar alvos clicáveis.
   - Dots do carrossel do login: mínimo 32x32 com indicador visual menor dentro.
   - Controles pequenos do HemoGasoVet: mínimo 40x40 em mobile.

2. Revisar navegação horizontal mobile.
   - Fluidoterapia: adicionar fade/scroll hint ou tornar nav quebrável em duas linhas.
   - ConsultaVET sidebar fechada aparece fora da tela como parte de drawer; confirmar que `aria-hidden`/inert e foco estão corretos.

3. Reduzir decoração que sai do viewport.
   - Elementos decorativos em landing, hub, dor, antibiótico e neurologia não causam scroll horizontal, mas dificultam auditoria e podem criar clipping visual. Encapsular com containers `overflow-hidden` mais específicos.

### Fase 5 - Performance e bundle

1. Reduzir chunks grandes.
   - Build avisou chunks acima de 900 kB:
     - `feature-receituario` ~1.38 MB minificado.
     - um `App` ~1.15 MB minificado.
     - `vendor-pdf` ~622 kB.
     - `vendor-three` ~486 kB.
   - Ação: dividir receituário por subrotas, lazy-load PDF/print somente nas telas de geração, lazy-load Three apenas onde usado.

2. Atualizar Browserslist.
   - Rodar `npx update-browserslist-db@latest` em uma branch dedicada.

## Ordem recomendada

1. Remover debug/instrumentação residual.
2. Separar TypeScript por ambiente e excluir Edge Functions do check web.
3. Fazer o app passar em `typecheck:app`.
4. Corrigir `validate:energia-vet-ui`.
5. Criar smoke tests de rotas públicas e protegidas.
6. Resolver UX/acessibilidade de alvos pequenos.
7. Otimizar chunks grandes.

## Status final desta auditoria

- Servidor local está ativo em `http://127.0.0.1:5173/`.
- Build de produção passa.
- TypeScript global falha.
- Validadores clínicos principais passam, exceto o fluxo UI de EnergiaVET.
- Rotas públicas principais renderizam sem crash geral.
- Há dívida técnica e de debug suficiente para priorizar uma sprint de estabilização antes de novas funcionalidades.
