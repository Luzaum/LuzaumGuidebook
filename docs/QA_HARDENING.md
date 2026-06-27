# QA Hardening (Last Mile)

## Objetivo
Validar endurecimento de seguran?a/storage, anti-perda de dados em formul?rios e bloqueio de regress?o em CI.

## Pr?-requisitos
- Ambiente Supabase configurado (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Usu?rio autenticado e membro da cl?nica alvo.
- Migration aplicada: `20260227000100_harden_receituario_media_policies.sql`.

## Checklist P1 - Storage Policies e Path
1. Confirmar bucket `receituario-media` privado no Supabase.
2. Validar policies em `storage.objects` para `SELECT/INSERT/UPDATE/DELETE`:
   - `bucket_id = 'receituario-media'`
   - `split_part(name,'/',1)` v?lido como UUID
   - `is_member_of_clinic(split_part(name,'/',1)::uuid) = true`
3. Fluxo de upload de assinatura/logo (Configurar M?dico):
   - Upload deve funcionar para membro da cl?nica.
   - Em DEV, log deve mostrar `path` iniciando com `clinicId`.
4. Fluxo de upload de PDF de receita:
   - Gerar/imprimir receita.
   - Verificar `pdf_path` salvo iniciando com `clinicId`.
5. Teste negativo de autoriza??o:
   - Tentar acessar arquivo de outra cl?nica (path com UUID de cl?nica n?o membro).
   - Esperado: bloqueio por RLS/policy.

## Checklist P2 - Draft Local Global (Anti-perda)

### Cat?logo 3.0
1. Abrir edi??o de medicamento e alterar campos sem salvar.
2. Recarregar a p?gina.
3. Esperado: rascunho reidratado.
4. Clicar `Limpar rascunho`.
5. Esperado: rascunho removido.

### Tutores/Pacientes
1. Clicar `Novo tutor` e preencher dados sem salvar.
2. Navegar para outra rota e voltar.
3. Esperado: rascunho do novo tutor restaurado.
4. Selecionar tutor existente do Supabase.
5. Esperado: dados carregados do banco n?o s?o sobrescritos por rascunho local.
6. Clicar `Limpar rascunho`.

### Protocolos 3.0
1. Criar novo protocolo (modal), preencher nome/recomenda??es e fechar sem salvar.
2. Reabrir cria??o.
3. Esperado: rascunho restaurado.
4. Editar protocolo j? existente.
5. Esperado: dados carregados do Supabase (sem sobrescrita por rascunho de novo).
6. Clicar `Limpar rascunho`.

### Configurar M?dico
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
   - Valida??o de payloads verde
   - Demais valida??es (`validate:profiles`, `validate:refs`, `validate:rulesets`) verdes.

## Observabilidade DEV
- Em falhas de Supabase/Storage, logs DEV devem conter:
  - `code`
  - `message`
  - `details`
  - `hint`

## Regress?o funcional r?pida (smoke manual)
1. Abrir Nova Receita 2.0.
2. Adicionar medicamento.
3. Abrir Review.
4. Esperado: fluxo completo sem erro de navega??o/render.
