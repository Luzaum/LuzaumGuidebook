# QA Gaps — Nova Receita 2.0 (pós-baseline)

Data: 2026-02-26 | Versão: 2.0.1

---

## G1 — Storage Security (Netlify Free / Supabase)

- [ ] Migration `20260226000001_secure_receituario_media_bucket.sql` aplicada no Supabase
  - Executar via Supabase Dashboard → SQL Editor, ou `supabase db push`
- [ ] Upload de imagem/arquivo com path `<clinicId>/<file>` → aceito ✓
- [ ] Upload com path inválido (sem clinicId no início) → rejeitado com RLS error ✓
- [ ] Usuário sem membership na clínica → upload rejeitado ✓
- [ ] Função `public.is_member_of_clinic(uuid)` existe no banco ✓

**Nota:** A migration já está em `supabase/migrations/`. Aplicar manualmente se `supabase db push` não estiver configurado no CI.

---

## G2 — Histórico de Receitas no App

- [ ] "Histórico de Receitas" aparece no menu lateral (ReceituarioChrome) ✓
- [ ] Acesso via sidebar sem precisar selecionar paciente
- [ ] Em `/receituario-vet/historico?patientId=<id>&patientName=<nome>` → lista do paciente
- [ ] Em `/receituario-vet/historico` (sem patientId) → mostra mensagem orientativa
- [ ] Botão "Ver Histórico →" aparece no editor quando `state.patient.id` existe (não depende de peso) ✓
- [ ] Botão "Reimprimir / PDF" → carrega snapshot no sessionStorage e navega para `/nova-receita-2-print` ✓
- [ ] Botão "Visualizar" → abre preview modal com `RxPrintView` ✓
- [ ] Botão "Anular" → confirma e chama `voidPrescription` ✓
- [ ] Botão "Baixar PDF" → só ativo se `record.pdf_path` existir → abre signed URL ✓

---

## G3 — Template Controlado Separado

- [ ] No editor (Nova Receita 2.0), seção "Template" exibe **2 selects**:
  - "Template — Receita Padrão" (campo `templateId`)
  - "Template — Receita de Controle Especial" (campo `controlledTemplateId`)
- [ ] `controlledTemplateId = null` → usa o mesmo template da receita padrão (opção "— Mesmo que o padrão —")
- [ ] No preview do editor, `specialDoc` usa `selectedControlledTemplateObj` ✓
- [ ] Na página de revisão (`?mode=review`), `specialDoc` usa `selectedControlledTemplate` ✓
- [ ] Na impressão (`?mode=print`) e PDF (`?mode=pdf`), controlado imprime com seu template ✓
- [ ] `controlledTemplateId` persiste no draft local e no `stateSnapshot` do Supabase ✓

---

## G4 — Formato Final do Item (Linha 1)

- [ ] **Quando há nome comercial:** Linha 1 = `NomeComercial Concentração (NomeFármaco)`
  - Ex: `Amoxil 500mg (Amoxicilina)`
- [ ] **Sem nome comercial:** Linha 1 = `NomeFármaco Concentração`
  - Ex: `Amoxicilina 500mg`
- [ ] **Linha 1b (subtítulo):** `Forma farmacêutica • Emb: qtd unit`
  - Ex: `Comprimido • Emb: 30 comprimidos`
- [ ] **Linha 2:** `Administrar X dose por via Y, a cada Z, por W dias.`
- [ ] **Linha 3:** `Iniciar em DD/MM às __:__` (data de hoje, editável na revisão)
- [ ] **Linha 4:** instrução extra livre (se preenchida)
- [ ] **Linha 5:** `⚠️ cautela` em vermelho por linha (se houver cautelas)

**Nota técnica:** O rxRenderer constrói Line 1 como `{name} {concentration} ({commercialName})`.
O adapter troca os campos quando `commercial_name` existe: `name = commercial_name`, `commercialName = drug_name`.
`package_quantity` e `package_unit` aparecem no subtitle (Line 1b) — dados vindos do catálogo Supabase.

---

## G5 — Mobile Tutores (sem clínica ativa)

- [ ] Ao abrir Nova Receita no mobile sem clínica selecionada:
  - `TutorLookup` exibe mensagem **"Nenhuma clínica ativa"** com CTA "Selecionar clínica →" ✓
  - O CTA leva para `/hub` onde o usuário pode selecionar a clínica ativa
- [ ] Após selecionar clínica → `clinicId` fica disponível → `TutorLookup` busca normalmente ✓
- [ ] No DEV, ao buscar recentes:
  - `console.log('[TutorLookup] recentes', { clinicId, dataLen })` ✓
- [ ] No DEV, ao fazer prefix search:
  - `console.log('[TutorLookup] busca', { clinicId, query, dataLen })` ✓
- [ ] `clinicLoading = true` → dropdown mostra "Aguardando clínica..." ✓

---

## Notas Técnicas

| Item | Status |
|------|--------|
| Histórico no menu lateral | **Adicionado** — `historico` em `NAV_ITEMS` do `ReceituarioChrome` |
| "Ver Histórico" sem peso | **Corrigido** — mostra quando `patient.id` existe |
| "Exportar" → "Reimprimir / PDF" | **Renomeado** — `HistoricoReceitasPage` |
| `controlledTemplateId` no state | **Adicionado** — `NovaReceita2State` + `createDefaultState()` |
| 2º select de template | **Adicionado** — Template card com label "Controle Especial" |
| `selectedControlledTemplate(Obj)` | **Adicionado** — memo em `NovaReceita2Page` e `NovaReceita2PrintPage` |
| Line 1: comercial first | **Ajustado** — adapter troca `name`/`commercialName` quando commercial existe |
| `buildItemTitle` removida | **Limpeza** — função nunca usada, removida do adapter |
| CTA clínica no TutorLookup | **Adicionado** — link `/hub` quando `clinicId` ausente |
| DEV log `dataLen` | **Adicionado** — logs recentes + busca com `dataLen` |
