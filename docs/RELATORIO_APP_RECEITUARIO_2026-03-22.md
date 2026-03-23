# Relatório Técnico do App de Receituário

Data de referência: 2026-03-22
Projeto: Vetius
Workspace: `C:\PROJETOS VET\Vetius`

## 1. Resumo executivo

O projeto é um frontend React + Vite + TypeScript com autenticação e banco em Supabase, organizado como um hub com vários módulos veterinários. O módulo `receituario-vet` é protegido por autenticação e por clínica ativa, e hoje opera em arquitetura híbrida:

- parte dos dados ainda roda em `localStorage` via `rxDb.ts` e `rxStorage.ts`
- parte já foi migrada para Supabase com `clinic_id` e isolamento por clínica
- o fluxo principal novo de emissão está concentrado em `NovaReceita2Page.tsx`
- o catálogo 3.0 e os protocolos 3.0 são os blocos mais avançados em integração com Supabase

Para outra IA, o ponto mais importante é: o app não é 100% local nem 100% Supabase. Ele está em transição, e qualquer nova feature precisa respeitar essa convivência de fontes.

## 2. Stack e arquitetura global

### Frontend

- React 19
- React Router 7
- TypeScript
- Vite
- Tailwind/CSS customizado
- Framer Motion
- jsPDF

Arquivos principais:

- `App.tsx`: define rotas, lazy loading e providers globais
- `index.tsx`: bootstrap da aplicação
- `layouts/AppLayout.tsx`: shell principal, sidebar e comportamento full-bleed/imersivo
- `modules/registry.ts`: lista oficial dos módulos do app

### Back-end e serviços

- Supabase Auth
- Supabase Database
- Supabase Storage
- Supabase Functions

Arquivos centrais:

- `src/lib/supabaseClient.ts`
- `src/lib/auth.ts`
- `src/lib/clinic.ts`
- `src/lib/clinicRecords.ts`
- `src/lib/prescriptionsRecords.ts`

## 3. Controle de acesso e multitenancy

O app usa duas camadas de proteção antes de abrir o receituário:

1. `ProtectedRoute`
   - valida sessão Supabase
2. `RequireClinic`
   - exige clínica ativa

Providers relevantes:

- `AuthSessionProvider`
- `ClinicProvider`

Regras atuais:

- sessão vem de `supabase.auth.getSession()`
- contexto ativo de clínica fica em `localStorage` com chave `vetius:active-clinic-id`
- a clínica ativa é escolhida a partir da tabela `memberships`
- se o usuário não tiver clínica, vai para `/clinic/setup`

Conclusão prática: quase toda operação moderna do receituário depende de `clinicId`.

## 4. Módulos existentes no app

Pelo registro atual em `modules/registry.ts`, o app possui:

- Calculadora Energética
- Fluidoterapia
- Transfusão Sanguínea
- Hemogasometria
- Escalas de Dor
- Emergências Veterinárias
- Animais Peçonhentos
- Antibioticoterapia
- Receituário Vet
- PlantãoVET
- CRI VET
- Neurologia
- Hidroeletrovet
- Consulta VET

O receituário é um módulo interno com rota base `/receituario-vet`.

## 5. Rotas do receituário

Rotas relevantes definidas em `App.tsx`:

- `/receituario-vet`
- `/receituario-vet/nova-receita`
- `/receituario-vet/nova-receita-2`
- `/receituario-vet/nova-receita-2-print`
- `/receituario-vet/rascunhos`
- `/receituario-vet/historico`
- `/receituario-vet/configuracao`
- `/receituario-vet/clientes`
- `/receituario-vet/catalogo3`
- `/receituario-vet/protocolos`
- `/receituario-vet/protocolos-3`
- `/receituario-vet/controle-especial`
- `/receituario-vet/templates`
- `/receituario-vet/configuracoes`
- `/receituario-vet/rx/:id/print`

Observação importante:

- existem fluxos legados e novos convivendo
- `NovaReceitaPage.tsx` é legado
- `NovaReceita2Page.tsx` é o fluxo principal atual
- `RxPrintPage.tsx` e `NovaReceita2PrintPage.tsx` coexistem

## 6. Funcionalidades do módulo Receituário Vet

### 6.1 Painel inicial

Arquivo: `modules/receituario-vet/App.tsx`

Funções atuais:

- dashboard do módulo
- atalho para nova receita
- atalho para protocolos 3.0
- atalho para rascunhos
- atalho para tutores e pacientes
- atalho para catálogo de medicamentos
- atalho para histórico
- atalho para perfil
- atalho para controle especial
- atalho para templates
- atalho para backup/configurações
- exibição de rascunhos recentes
- exibição de receitas recentes do histórico local

Persistência usada nessa tela:

- histórico local vindo de `rxDb.ts`
- rascunhos vindo de `rxStorage.ts`
- tema do módulo em `localStorage`

### 6.2 Nova Receita 2.0

Arquivo principal: `modules/receituario-vet/NovaReceita2Page.tsx`

É o state container principal da emissão de receitas.

Capacidades atuais:

- seleção de tutor
- seleção de paciente
- modo rápido de prescrição
- início padrão da receita com data/hora
- importação de protocolo para a receita
- adição rápida de medicamentos
- adição manual de itens
- busca de medicamentos no catálogo
- troca de apresentação farmacêutica por item
- recomendações ao tutor
- seleção de exames
- justificativa de exames
- escolha de template de impressão
- preview em tempo real
- impressão
- geração de PDF
- envio por WhatsApp a partir do fluxo de print
- recuperação de rascunho
- reabertura de receita salva por `prescriptionId`

Estado central atual:

- `prescriber`
- `tutor`
- `patient`
- `items`
- `recommendations`
- `exams`
- `examJustification`
- `templateId`
- `printTemplateId`
- `defaultStartDate`
- `defaultStartHour`

Integrações diretas:

- `TutorLookup`
- `PatientLookup`
- `AddMedicationModal2`
- `novaReceita2Adapter.ts`
- `RxPrintView`
- `clinicRecords.ts`
- `prescriptionsRecords.ts`

Persistência usada:

- rascunho local por clínica em `rx_draft_v2:<clinicId>`
- revisão em `sessionStorage` com chave `vetius:rx2:review-draft`
- receita oficial em Supabase na tabela `prescriptions`

### 6.3 Print e revisão da Nova Receita 2.0

Arquivo: `modules/receituario-vet/NovaReceita2PrintPage.tsx`

Modos atuais:

- `review`
- `print`
- `pdf`

Capacidades:

- revisão interativa do documento
- edição em memória de tutor/paciente
- edição em memória das recomendações
- edição em memória dos itens prescritos
- seleção visual de zonas do documento
- impressão via `window.print()`
- exportação PDF
- upload do PDF para Supabase Storage
- vínculo do `pdf_path` na tabela `prescriptions`
- atalho de WhatsApp

Importante:

- essa tela trabalha em cima do snapshot da receita em sessão
- ela não é o editor principal de domínio
- serve mais como revisão/polimento antes de imprimir/exportar

### 6.4 Print legado / revisão avançada

Arquivo: `modules/receituario-vet/RxPrintPage.tsx`

Capacidades:

- renderização da prescrição em formato clássico
- split entre receita padrão e controle especial
- edição por zona e por item
- compartilhamento por WhatsApp/e-mail/Gmail/Outlook
- download de PDF a partir do preview
- salvamento de rascunho e template

Status atual:

- continua existindo e tem bastante lógica
- mas o fluxo mais moderno está em `NovaReceita2Page.tsx` + `NovaReceita2PrintPage.tsx`
- isso indica convivência de dois paradigmas de impressão/revisão

### 6.5 Rascunhos

Arquivo: `modules/receituario-vet/DraftsPage.tsx`

Funções:

- listar rascunhos salvos
- continuar edição de um rascunho
- excluir rascunho

Persistência:

- `rxStorage.ts`
- rascunhos por conta/ownerKey
- limite atual: 20 rascunhos

### 6.6 Histórico de receitas

Arquivo: `modules/receituario-vet/HistoricoReceitasPage.tsx`

Funções:

- listar receitas de um paciente
- abrir receita existente no editor 2.0
- visualizar receita salva
- exportar novamente via fluxo de print
- baixar PDF salvo no storage
- anular receita
- excluir receita definitivamente

Fonte de dados:

- Supabase
- tabela `prescriptions`

### 6.7 Tutores e pacientes

Arquivo: `modules/receituario-vet/ClientesPage.tsx`

Funções atuais:

- cadastrar tutor
- cadastrar múltiplos pacientes por tutor
- editar dados completos do tutor
- editar dados completos do paciente
- registrar peso
- manter histórico de peso
- mostrar mini gráfico de evolução de peso
- consultar histórico de receitas por animal
- remoção local
- remoção/arquivamento em Supabase
- exclusão em lote de tutores no modo Supabase
- suporte a CEP e máscaras brasileiras

Arquitetura:

- suporta `local` e `supabase`
- decide a fonte via `VITE_RX_DATA_SOURCE`
- usa `createRxDataAdapter`

Situação real:

- existe um fluxo incremental de migração
- o modo Supabase consulta `tutors`, `patients` e `patient_weights`
- o modo local usa `rxDb.ts`

### 6.8 Catálogo 3.0

Arquivo: `modules/receituario-vet/Catalogo3Page.tsx`

É o módulo de medicamentos mais importante para novas features clínicas.

Funções atuais:

- listar medicamentos da clínica
- buscar medicamento
- criar medicamento
- editar medicamento
- excluir medicamento
- cadastrar apresentações farmacêuticas
- cadastrar metadados de apresentação
- cadastrar doses recomendadas estruturadas
- importar medicamento do catálogo global via JSON/estrutura canônica
- gerenciar rotas sugeridas, espécies, tags clínicas e observações

Integrações:

- `clinicRecords.ts`
- `medicationCatalog.ts`
- `useLocalDraft`

Banco atual envolvido:

- `medications`
- `medication_presentations`
- `medication_recommended_doses`
- `global_medications` e correlatas para catálogo global

Status real:

- esse é um dos pontos mais maduros do app em Supabase
- já há preocupação explícita com whitelist de colunas e compatibilidade de schema

### 6.9 Protocolos 3.0

Arquivo: `modules/receituario-vet/Protocolos3Page.tsx`

Funções atuais:

- listar pastas de protocolos
- listar protocolos combinando escopo da clínica e escopo global
- criar pasta
- excluir pasta
- criar protocolo
- editar protocolo
- excluir protocolo
- adicionar medicamentos ao protocolo
- adicionar recomendações
- adicionar exames e justificativas
- duplicar protocolo global para a clínica
- publicar protocolo local como global
- atualizar protocolo global vinculado
- aplicar protocolo à Nova Receita

Integrações:

- `src/lib/protocols/protocolsRepo`
- `protocolMapper.ts`
- `clinicRecords.ts`
- `AddMedicationModal2`
- navegação para `NovaReceita2Page`

Ponto mais importante:

- Protocolos 3.0 já são 100% Supabase no fluxo principal
- eles funcionam como pacote pronto para preencher receita

### 6.10 Controle Especial

Arquivo: `modules/receituario-vet/ControleEspecialPage.tsx`

Funções:

- listar medicamentos controlados do catálogo
- inferir tipo de farmácia alvo
- gerar prévia do template especial
- abrir editor do template especial

Dependências:

- catálogo atual da clínica
- catálogo global
- `RxPrintView`
- templates especiais

### 6.11 Perfil profissional

Arquivo: `modules/receituario-vet/ProfilePage.tsx`

Funções:

- editar dados do prescritor
- editar dados da clínica
- salvar múltiplos perfis
- upload de assinatura
- upload de assinatura GOV.BR
- upload de logo da clínica

Persistência:

- estrutura principal em `rxDb.ts` local
- imagens sobem para Supabase Storage via `rxSupabaseStorage.ts`

Conclusão:

- perfil é híbrido: metadados ficam locais, assets vão para cloud

### 6.12 Templates

Arquivo: `modules/receituario-vet/TemplatesPage.tsx`

Funções:

- listar templates
- editar visual global
- editar por zona
- criar template
- remover template customizado
- aplicar JSON de template
- copiar JSON
- preview interativo com `RxPrintView`

Tipos de documento:

- standard
- special-control

Persistência:

- local em `rxDb.ts`

### 6.13 Configurações e backup

Arquivo: `modules/receituario-vet/SettingsPage.tsx`

Funções:

- exportar backup completo do banco local
- importar backup JSON
- mostrar estatísticas locais
- mostrar tamanho aproximado do banco local

Ponto importante:

- essa tela ainda é local-first
- não representa o estado total do Supabase
- portanto o “backup completo” descrito aqui é completo apenas para a camada local

## 7. Modelo de dados atual

### 7.1 Dados locais

Arquivo central: `modules/receituario-vet/rxDb.ts`

Entidades locais:

- `profile`
- `prescriberProfiles`
- `catalog`
- `patients`
- `clients`
- `history`
- `protocolFolders`
- `protocols`
- `templates`
- `activeTemplateId`

Arquivos complementares:

- `rxStorage.ts`: rascunhos
- `rxDefaults.ts`
- `rxTypes.ts`

### 7.2 Dados Supabase

Tabelas claramente usadas pelo receituário:

- `memberships`
- `clinics`
- `tutors`
- `patients`
- `patient_weights`
- `prescriptions`
- `medications`
- `medication_presentations`
- `medication_recommended_doses`
- `protocol_folders`
- `protocols`
- `protocol_medications`
- `protocol_recommendations`
- catálogos/protocolos globais

Storage:

- bucket `receituario-media`

Funções server-side existentes no repositório:

- publish global protocol
- duplicate global protocol
- delete global protocol

## 8. Integrações entre as partes

### 8.1 Fluxo Tutor/Paciente -> Receita

Origem:

- `ClientesPage.tsx`
- `TutorLookup`
- `PatientLookup`

Destino:

- `NovaReceita2Page.tsx`

Integração:

- tutor e paciente são selecionados ou inferidos
- IDs de tutor/paciente são carregados para o estado da receita
- ao salvar receita, o snapshot mantém vínculo com paciente e tutor

### 8.2 Catálogo -> Receita

Origem:

- `Catalogo3Page.tsx`
- `searchMedications`
- `getMedicationPresentations`

Destino:

- `NovaReceita2Page.tsx`
- `AddMedicationModal2`

Integração:

- busca do medicamento
- seleção de apresentação
- construção do item prescrito com `medication_id` e `presentation_id`
- uso de metadados para concentração, via, cálculo e controle especial

### 8.3 Protocolo -> Receita

Origem:

- `Protocolos3Page.tsx`

Destino:

- `NovaReceita2Page.tsx`

Integração:

- protocolo é carregado
- itens do protocolo são mapeados por `protocolMapper.ts`
- recomendações, exames e justificativas entram no estado da nova receita
- a importação normalmente reinicia a receita e aplica um estado limpo com o protocolo

### 8.4 Receita -> Render -> PDF

Pipeline atual:

1. `NovaReceita2Page.tsx`
2. `novaReceita2Adapter.ts`
3. `rxRenderer.ts`
4. `RxPrintView.tsx`
5. `NovaReceita2PrintPage.tsx` ou `RxPrintPage.tsx`
6. `prescriptionsRecords.ts`

Função:

- converter estado clínico da receita em documento imprimível
- separar documentos padrão e controlado
- gerar PDF
- subir PDF para storage
- salvar caminho no registro da prescrição

### 8.5 Perfil/Template -> Documento

Origem:

- `ProfilePage.tsx`
- `TemplatesPage.tsx`

Destino:

- `RxPrintView.tsx`
- telas de print/review

Integração:

- logo, assinatura, assinatura GOV.BR e dados da clínica entram no header/rodapé
- template define visual, papel, assinatura, timestamp e estilos por zona

### 8.6 Receita -> Histórico

Origem:

- `savePrescription`

Destino:

- `HistoricoReceitasPage.tsx`

Integração:

- receita salva em `prescriptions`
- histórico consulta por `patient_id`
- permite reabrir, visualizar, anular, excluir e baixar PDF

## 9. Componentes e arquivos críticos para qualquer nova feature

Se a nova função for ligada à prescrição, os arquivos mais importantes são:

- `modules/receituario-vet/NovaReceita2Page.tsx`
- `modules/receituario-vet/novaReceita2Adapter.ts`
- `modules/receituario-vet/rxRenderer.ts`
- `modules/receituario-vet/RxPrintView.tsx`
- `modules/receituario-vet/rxTypes.ts`
- `src/lib/clinicRecords.ts`
- `src/lib/prescriptionsRecords.ts`
- `modules/receituario-vet/protocolMapper.ts`

Se a nova função envolver pacientes:

- `modules/receituario-vet/ClientesPage.tsx`
- `modules/receituario-vet/adapters/*`
- `src/lib/clinicRecords.ts`

Se envolver medicamentos:

- `modules/receituario-vet/Catalogo3Page.tsx`
- `src/lib/clinicRecords.ts`
- `src/lib/medicationCatalog.ts`

Se envolver protocolos:

- `modules/receituario-vet/Protocolos3Page.tsx`
- `src/lib/protocols/protocolsRepo`
- `modules/receituario-vet/protocolMapper.ts`

Se envolver impressão/PDF:

- `modules/receituario-vet/NovaReceita2PrintPage.tsx`
- `modules/receituario-vet/RxPrintPage.tsx`
- `src/lib/prescriptionsRecords.ts`
- `src/lib/prescriptionPDFStorage.ts`

## 10. Estado atual real do projeto

### 10.1 Pontos maduros

- autenticação via Supabase
- contexto de clínica ativa
- catálogo 3.0 em Supabase
- protocolos 3.0 em Supabase
- histórico de receitas em Supabase
- upload de PDF e imagens para Supabase Storage

### 10.2 Pontos híbridos

- perfil do prescritor
- templates
- dashboard do receituário
- backups/configurações
- parte do histórico local
- rascunhos
- clientes/pacientes dependendo do data source

### 10.3 Inconsistências relevantes

- coexistem fluxos legados e novos
- coexistem dois sistemas de print/review
- coexistem armazenamento local e armazenamento cloud
- existe mais de um helper para PDF/storage (`prescriptionsRecords.ts` e `prescriptionPDFStorage.ts`)
- `SettingsPage.tsx` ainda reflete majoritariamente o banco local, não o estado completo do Supabase

Esses pontos devem ser considerados antes de qualquer refatoração grande.

## 11. Recomendações para outra IA antes de implementar algo novo

1. Tratar `NovaReceita2Page.tsx` como fluxo principal de prescrição.
2. Verificar se a nova feature deve persistir em local, Supabase ou ambos.
3. Não assumir que `rxDb.ts` é a fonte única de verdade.
4. Respeitar `clinicId` em qualquer CRUD novo.
5. Reusar `clinicRecords.ts` para dados clínicos de catálogo/paciente sempre que possível.
6. Se a feature impactar impressão, revisar os dois fluxos: `NovaReceita2PrintPage.tsx` e `RxPrintPage.tsx`.
7. Se a feature tiver valor clínico compartilhável, considerar integração com Protocolos 3.0 ou Catálogo 3.0.

## 12. Melhor resumo possível em uma frase

O receituário atual do Vetius é um módulo clínico robusto, porém híbrido, onde emissão de receita, catálogo e protocolos já gravitam em torno de Supabase e `clinic_id`, enquanto perfis, templates, backups e parte do suporte operacional ainda permanecem em camadas locais legadas.
