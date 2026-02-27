# QA Hardening (Last Mile)

## Objetivo
Validar endurecimento de segurança/storage, anti-perda de dados em formulários e bloqueio de regressão em CI.

## Pré-requisitos
- Ambiente Supabase configurado (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Usuário autenticado e membro da clínica alvo.
- Migration aplicada: `20260227000100_harden_receituario_media_policies.sql`.

## Checklist P1 - Storage Policies e Path
1. Confirmar bucket `receituario-media` privado no Supabase.
2. Validar policies em `storage.objects` para `SELECT/INSERT/UPDATE/DELETE`:
   - `bucket_id = 'receituario-media'`
   - `split_part(name,'/',1)` válido como UUID
   - `is_member_of_clinic(split_part(name,'/',1)::uuid) = true`
3. Fluxo de upload de assinatura/logo (Configurar Médico):
   - Upload deve funcionar para membro da clínica.
   - Em DEV, log deve mostrar `path` iniciando com `clinicId`.
4. Fluxo de upload de PDF de receita:
   - Gerar/imprimir receita.
   - Verificar `pdf_path` salvo iniciando com `clinicId`.
5. Teste negativo de autorização:
   - Tentar acessar arquivo de outra clínica (path com UUID de clínica não membro).
   - Esperado: bloqueio por RLS/policy.

## Checklist P2 - Draft Local Global (Anti-perda)

### Catálogo 3.0
1. Abrir edição de medicamento e alterar campos sem salvar.
2. Recarregar a página.
3. Esperado: rascunho reidratado.
4. Clicar `Limpar rascunho`.
5. Esperado: rascunho removido.

### Tutores/Pacientes
1. Clicar `Novo tutor` e preencher dados sem salvar.
2. Navegar para outra rota e voltar.
3. Esperado: rascunho do novo tutor restaurado.
4. Selecionar tutor existente do Supabase.
5. Esperado: dados carregados do banco não são sobrescritos por rascunho local.
6. Clicar `Limpar rascunho`.

### Protocolos 3.0
1. Criar novo protocolo (modal), preencher nome/recomendações e fechar sem salvar.
2. Reabrir criação.
3. Esperado: rascunho restaurado.
4. Editar protocolo já existente.
5. Esperado: dados carregados do Supabase (sem sobrescrita por rascunho de novo).
6. Clicar `Limpar rascunho`.

### Configurar Médico
1. Alterar dados do perfil sem salvar.
2. Recarregar tela.
3. Esperado: rascunho restaurado.
4. Clicar `Limpar rascunho`.

## Checklist P3 - Quality Gate
1. Rodar local:
   - `npm run validate:dbpayloads`
   - `npm run build`
2. Abrir PR e validar workflow `quality-gate` no GitHub Actions.
3. Esperado:
   - Build verde
   - Validação de payloads verde
   - Demais validações (`validate:profiles`, `validate:refs`, `validate:rulesets`) verdes.

## Observabilidade DEV
- Em falhas de Supabase/Storage, logs DEV devem conter:
  - `code`
  - `message`
  - `details`
  - `hint`

## Regressão funcional rápida (smoke manual)
1. Abrir Nova Receita 2.0.
2. Adicionar medicamento.
3. Abrir Review.
4. Esperado: fluxo completo sem erro de navegação/render.
