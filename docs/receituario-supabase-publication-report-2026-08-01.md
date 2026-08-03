# Relatório de alinhamento e publicação do Receituário

Data: 01/08/2026  
Projeto Supabase confirmado: `Vetius` (`hdnwcyymxgjxdkhovvhw`)  
Resultado: histórico alinhado, migration publicada, RLS validada local e remotamente.

## 1. Histórico de migrations

Nenhum `migration repair` foi executado. Nenhuma versão foi marcada manualmente como aplicada. As seis migrations que apareciam no remoto e estavam ausentes da cópia local foram recuperadas do próprio histórico Git, preservando timestamp e conteúdo aplicado.

| Versão | Local antes | Remoto antes | Origem recuperada | Descrição e objetos principais | Tabelas afetadas | Funções / triggers | Policies RLS | Risco de conflito | Ação executada |
|---|---:|---:|---|---|---|---|---|---|---|
| `20260224220030` | Não | Sim | Commit `1941394` (correção da primeira tentativa em `b385`) | Bucket histórico `receituario-media` e acesso a objetos | `storage.buckets`, `storage.objects` | Nenhum trigger | Policies de Storage `rxv_*` | Alto: a primeira versão tentava alterar permissões de `storage.objects`; a versão efetivamente corrigida não faz isso | Restaurado `20260224220030_fix_storage_bucket_receituario_media.sql` com o conteúdo corrigido |
| `20260224223905` | Não | Sim | Commit `746c32d` | Baseline remoto de pacientes, tutores, prescrições, protocolos e catálogos | `patients`, `tutors`, `patient_weights`, `prescriptions`, `protocols`, itens e catálogos relacionados | `set_updated_at`, `ensure_patient_tutor_same_clinic` e respectivos triggers | Policies por usuário/clínica dos objetos da baseline | Muito alto: baseline ampla e dependente de estado anterior criado fora da sequência | Restaurado `20260224223905_remote_schema.sql` exatamente do commit de origem |
| `20260225150000` | Não | Sim | Commit `1a33312` | Metadados de PDF em prescrições | `prescriptions` (`pdf_path`, `pdf_url`, `document_kind`, `storage_bucket`) | Nenhuma | Nenhuma nova | Médio: a tabela não existe mais no estado funcional remoto atual | Restaurado `20260225150000_add_pdf_columns_to_prescriptions.sql`; nenhuma reaplicação remota |
| `20260227000100` | Não | Sim | Commit `16042cd` | Endurecimento do acesso ao bucket histórico por clínica | `storage.objects` | Usa `is_member_of_clinic` | Substitui policies permissivas do `receituario-media` | Médio: depende do formato do caminho e da função de membresia | Restaurado `20260227000100_harden_receituario_media_policies.sql` exatamente |
| `20260322010000` | Não | Sim | Commit `0beb3b2` | Catálogo de manipulados, ingredientes, regimes e documentos de prescrição | `compounded_medications`, `compounded_medication_ingredients`, `compounded_medication_regimens`, `prescription_documents`, `protocol_medications` | Atualização de timestamps e triggers | Policies dos novos objetos | Alto: objetos funcionais foram removidos posteriormente no remoto | Restaurado `20260322010000_create_compounded_catalog.sql`; o estado removido foi formalizado na migration de reconciliação |
| `20260330190000` | Não | Sim | Commit `4270af9` | Backup do catálogo antigo e criação de `manipulados_v1_formulas` | `compounded_*_legacy_backup`, `manipulados_v1_formulas` | Trigger de atualização | Policies de leitura/gestão das fórmulas | Médio: contém tabelas de preservação que não devem ser descartadas | Restaurado `20260330190000_backup_legacy_and_create_manipulados_v1.sql` exatamente |

As seis versões foram removidas juntas do repositório pelo commit `601e6e200b9a826a64def6aeef1c1a134861c024` (`ok`, 26/07/2026), junto de código do antigo ReceituarioVet. Não foram encontradas migrations equivalentes com outros timestamps. Quatro arquivos coincidem byte a byte com os commits de origem; dois coincidem semanticamente e diferem somente na quebra de linha final.

O comando final `npx supabase migration list` mostrou todas as versões locais e remotas alinhadas, incluindo `20260801110000` e `20260801120000`.

### Defeito histórico identificado

`20260222000002_add_timestamps_tutors_patients.sql` altera `public.tutors` e `public.patients`, mas essas tabelas só são criadas por `20260224223905_remote_schema.sql`. Isso prova que o remoto tinha estado prévio não representado pela cadeia.

As migrations remotas já aplicadas não foram alteradas. Para validar um replay limpo, foi usado um bootstrap exclusivamente no banco temporário local: duas tabelas vazias mínimas foram criadas antes da migration problemática; após as migrations dependentes, confirmou-se zero registros e elas foram removidas antes da baseline recuperada. Esse procedimento não foi executado no remoto e não representa mudança funcional.

## 2. Drift de schema

Foi gerado um diff integral entre o remoto e o banco local reconstruído em:

`C:\Users\Resgate\AppData\Local\Temp\vetius-schema-drift-20260801-173640.sql`

SHA-256: `35741CEABA163FAE26A814F44306A66F07A50890F3F75EE699D748E7142B70F4` (606 linhas; 25.061 bytes).

| Diferença | Origem provável | Impacto | Decisão | Ação |
|---|---|---|---|---|
| Tabelas antigas `prescriptions`, `prescription_documents` e catálogo `compounded_*` não existem no remoto atual | Remoção manual/legada junto ao antigo ReceituarioVet | A cadeia recuperada tentaria deixá-las no replay local | Preservar o estado funcional remoto | Criada `20260801110000_reconcile_legacy_receituariovet_schema.sql`, com backup prévio e reconciliação explícita |
| Colunas históricas de manipulados não existem mais em `protocol_medications` | Mesma limpeza legada | Drift estrutural | Preservar | Remoção formalizada pela reconciliação, sem tocar dados compartilhados |
| Bucket histórico `receituario-media` ausente no remoto | Limpeza do módulo antigo | O replay local pode deixar bucket vazio e sem policies | Preservar ausência remota | Policies antigas removidas; o bucket não foi excluído por SQL direto porque o Storage proíbe essa operação. No replay local fica inerte e vazio |
| Trigger de evento `ensure_rls`, privilégios padrão, comentários e grants de funções diferem | Hardening/plataforma ou ajuste manual remoto | Não relacionado ao Receituário | Preservar remoto | O diff gerado não foi executado; nenhuma dessas diferenças foi sobrescrita |
| Quatro migrations de consenso anteriores ao Receituário estavam pendentes | Desenvolvimento local válido | Precisavam ser aplicadas em ordem | Migrar | Aplicadas `20260726000100`, `20260727000100`, `20260727000200` e `20260727000300` |
| Novas tabelas, índices, policies, colunas canônicas e bucket privado do Receituário | Funcionalidade nova | Drift esperado | Migrar | Aplicada `20260801120000` |

Não foi encontrada diferença inexplicada que exigisse alterar migrations remotas já aplicadas. O dump/diff não foi usado como script de alteração.

## 3. Dados legados do ReceituarioVet

Foram inspecionados nomes e conteúdo estrutural de tabelas, funções, pacientes, tutores, pesos, prescrições, protocolos, medicamentos, documentos, drafts, colunas JSON/metadados, campos de origem, buckets, objetos do Storage, seeds e referências no código.

Contagens anteriores à publicação:

| Conjunto | Antes | Evidência de origem | Removido | Depois | Decisão |
|---|---:|---|---:|---:|---|
| Pacientes | 13 | Sem identificador confiável do aplicativo de origem | 0 | 13 | Preservados por serem compartilháveis |
| Tutores/responsáveis | 28 | Sem identificador confiável do aplicativo de origem | 0 | 28 | Preservados por serem compartilháveis |
| Pesos de pacientes | 11 | Dependem dos pacientes compartilhados | 0 | 11 | Preservados |
| Protocolos | 92 | Um registro tinha metadata explícita `validacao E2E do ReceituarioVET` | 1 | 91 | Somente o registro inequivocamente E2E foi removido |
| Medicamentos de protocolos | 83 | Um filho dependia do protocolo E2E identificado | 1 | 82 | Somente o filho inequívoco foi removido |
| Relatórios nutricionais | 4 | Outro módulo | 0 | 4 | Preservados |
| Objetos de Storage | 6 | Nenhum ligado ao antigo bucket do Receituário | 0 | 6 | Preservados |

O protocolo e seu medicamento dependente foram copiados antes da exclusão para o schema privado `receituariovet_legacy_backup_20260801`. A remoção e suas contagens foram registradas por SQL. O backup remoto contém 1 protocolo e 1 medicamento de protocolo. Não houve exclusão por nome, nem exclusão de pacientes/tutores.

Após os testes remotos e a limpeza dos dados efêmeros, as novas tabelas pessoais ficaram com zero registros. A tabela de auditoria da migration contém três entradas e confirma que não havia versões prévias de `document_templates`, `generated_documents` ou `template_favorites` a migrar.

## 4. Backups

Backup anterior à aplicação, fora do Git:

`C:\Users\Resgate\Documents\Vetius-private-backups\supabase-20260801-171516-hdnwcyymxgjxdkhovvhw`

- `schema-public-storage.sql`: 160.018 bytes; SHA-256 `750B622458A42C36C3F7492E271C72A17252D24D21D37BB693DF891C6CC2BC78`
- `data-public-storage.sql`: 1.521.084 bytes; SHA-256 `BDCFA1E518D93CEDCCBB00E62D3444170571AD3DE455E5A216783D0C925E0510`
- `manifest.json`
- criação: 01/08/2026 17:16:26 BRT

Snapshot posterior à aplicação:

`C:\Users\Resgate\Documents\Vetius-private-backups\supabase-20260801-171516-hdnwcyymxgjxdkhovvhw\post-apply-20260801-174423`

- `schema.sql`: 178.177 bytes; SHA-256 `B04221E6EB3FE98110368916DBBA1C419CC02A1D26AA62FE1658AAF72EBFACA8`
- `data.sql`: 1.528.980 bytes; SHA-256 `4E4231DFA01F925AEE4A756265E00E6F914ABFE94FA394FE0178E9A41E7EB7E4`
- `manifest.json`
- captura: 01/08/2026 17:45:14 BRT

Os dumps foram lidos, tiveram hashes calculados e blocos `COPY` analisados. Podem conter dados pessoais e, por isso, permaneceram fora do workspace e do Git.

## 5. Migration do Receituário

Arquivo aplicado: `supabase/migrations/20260801120000_create_receituario_simplified_tables.sql`  
Aplicação remota: aproximadamente 01/08/2026 17:42 BRT  
Projeto: `Vetius` (`hdnwcyymxgjxdkhovvhw`)

Objetos criados:

- tabelas `document_templates`, `generated_documents`, `generated_document_medications`, `template_favorites`, `receituario_drafts`, `medication_precautions`, `global_medication_precautions` e `receituario_migration_audit`;
- schema privado de backup `receituario_backup_20260801`;
- bucket privado `receituario-signed-copies`;
- índices simples e compostos para proprietário, clínica, categoria, data e ordem dos medicamentos;
- policies RLS para modelos, documentos, medicamentos emitidos, favoritos, rascunhos, precauções e anexos privados.

Revisões feitas antes da aplicação:

- leitura de precauções por clínica passou de acesso global para `is_member_of_clinic(clinic_id)`;
- permissões explícitas foram adicionadas para o frontend autenticado;
- `TRUNCATE` e privilégios herdados foram revogados de `anon` e `authenticated`, pois `TRUNCATE` contorna RLS;
- modelos globais são somente leitura para usuários comuns;
- audit e schemas de backup não são acessíveis a usuários comuns;
- índices compostos por usuário/clínica foram adicionados;
- nenhuma policy permite insert anônimo;
- não há recursão de RLS, dados clínicos fictícios, dependência obrigatória de paciente/tutor ou alteração desnecessária de outro módulo.

O `db push --dry-run` listou somente as quatro migrations de consenso pendentes, a reconciliação e a nova migration. Em seguida, `npx supabase db push --yes` aplicou exatamente essas seis versões. Nenhuma migration antiga foi reaplicada.

## 6. Validação local limpa

Todas as migrations foram aplicadas desde o início em um projeto Supabase temporário isolado, usando o bootstrap mínimo documentado para o defeito histórico. Seeds válidos foram aplicados; nenhum seed criou pacientes ou tutores legados.

Testes reais contra Auth, PostgREST, RLS e Storage locais, com dois usuários e duas sessões:

1. login de duas contas;
2. criação, leitura, edição e exclusão de modelo pessoal;
3. bloqueio de leitura/alteração cruzada;
4. leitura de modelo global e bloqueio de alteração por usuário comum;
5. favoritar e desfavoritar com isolamento;
6. salvar rascunho e abrir em outra sessão do mesmo usuário;
7. emitir e recuperar documento depois de logout/login;
8. gerar PDF do documento recuperado;
9. anexar arquivo privado e bloquear outro usuário;
10. negar acesso anônimo a conteúdo pessoal.

Resultado: 7 grupos de cenários, 7 aprovados. O ambiente temporário foi encerrado sem backup depois da conclusão.

## 7. Testes reais no Supabase remoto

O script `scripts/test-receituario-supabase.ts` executou os mesmos cenários no projeto remoto com duas contas efêmeras distintas. Não foram usados mocks de RLS.

Resultado remoto: 7 grupos, 7 aprovados. Foram confirmados:

- CRUD completo do modelo pessoal;
- favoritos e remoção;
- rascunho sincronizado em segunda sessão;
- documento persistente após logout e novo login;
- PDF gerado a partir do documento recuperado;
- upload/download privado da via assinada;
- isolamento entre usuários e bloqueio anônimo;
- modelo global legível e não editável por usuário comum.

Os usuários, linhas e arquivos efêmeros foram removidos ao final. Como o teste é executado fora do navegador e recuperou dados em outra sessão, `localStorage` não foi a fonte principal.

## 8. Auditoria clínica dos modelos

Relatórios atualizados:

- `docs/receituario-models-audit.md`
- `docs/receituario-models-audit.json`

Resultado atual:

- modelos analisados: 19;
- incompletos: 12;
- com medicamento histórico sem vínculo completo: 15;
- sem fonte estruturada: 15;
- com recomendações genéricas: 15.

O critério não considera um modelo completo apenas por conter texto; exige condição, espécie, vínculos estruturados, apresentação/unidade, fonte, recomendações, precauções, sinais de alerta, retorno e ausência de placeholders técnicos, conforme aplicável.

## 9. Validação completa do projeto

| Validação | Comando | Resultado | Totais / duração |
|---|---|---|---|
| Lint | `npm run lint` | Aprovado | 641 arquivos validados, 0 ignorados, 0 erros; 13,2 s |
| TypeScript | `npm run typecheck` | Aprovado | 0 erros; 29,4 s |
| Receituário específico | `npm run test:receituario` | Aprovado | 18/18, 0 falhas, 0 ignorados; 1,8 s |
| Neurologia | suíte de análise/qualidade | Aprovado | 5/5 verificações; testes antigos foram corrigidos para realmente falhar em vez de apenas imprimir `console.assert` |
| Integração local | `npm run test:receituario:integration -- --target local` | Aprovado | 7/7 grupos |
| Integração remota | `npm run test:receituario:integration -- --target remote` | Aprovado | 7/7 grupos |
| Validadores de módulos | HemoGasoVet, Fluidoterapia e EnergiaVet | Aprovado | 3/3 validadores |
| Build | `npm run build` | Aprovado | 3.417 módulos; Vite 19,55 s, comando 21,77 s |

Total explicitamente contado: 23 testes/verificações unitárias, 14 grupos de integração e 3 validadores de módulos, todos aprovados.

Correções auxiliares necessárias para a validação integral:

- ajuste de tipo em `DiseaseSectionRenderer.tsx` para renderizar o texto do achado clínico;
- atualização das expectativas obsoletas dos testes de Neurologia;
- validação HemoGasoVet passou a aceitar a expressão atual “reconhecimento de texto”;
- capturas do validador EnergiaVet passaram a usar diretório exclusivo por execução, evitando bloqueio de arquivo.

O build mantém dois avisos não bloqueantes já existentes: base do Browserslist desatualizada e um chunk maior que 900 kB. Não houve erro ou warning relevante no console da página do Receituário. A validação visual no navegador confirmou as quatro abas, filtros, 15 cards visíveis no estado anônimo, layout desktop íntegro e ausência do seletor antigo de pacientes.

## 10. Git e segurança

- `.env` e `.env.local` são ignorados por `.gitignore`;
- nenhum dump privado ou diretório de backup está rastreado;
- nenhum JWT, token `sbp_` ou valor de service role foi encontrado nas linhas adicionadas;
- a service role não está no frontend;
- não houve stage, commit, push Git, reset ou force push;
- nenhum segredo foi incluído neste relatório.

Estado observado antes deste relatório: 19 arquivos modificados e 12 caminhos não rastreados. O worktree já continha alterações amplas de outros módulos; elas foram preservadas. As migrations relevantes no diff atual são:

- nova: `supabase/migrations/20260801110000_reconcile_legacy_receituariovet_schema.sql`;
- alterada e aplicada: `supabase/migrations/20260801120000_create_receituario_simplified_tables.sql`;
- seis migrations históricas recuperadas: presentes, rastreadas e sem diferença pendente em relação ao índice atual.

Existem também artefatos de validação não rastreados em `artifacts/`, `tmp/` e `supabase/.temp/pgdelta/`; eles não foram adicionados ao Git. Não foram removidos automaticamente para evitar apagar arquivos do usuário em um worktree previamente sujo.

## 11. Conclusão

Os critérios de publicação do banco foram atendidos: as seis migrations foram recuperadas com origem comprovada, o drift foi explicado, o replay local passou, backups legíveis foram produzidos, a migration foi aplicada ao projeto remoto correto, RLS e sincronização foram testadas com duas contas reais e o histórico final coincide. Nenhum paciente ou responsável compartilhado foi excluído.
