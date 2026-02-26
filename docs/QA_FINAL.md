# QA Final — Nova Receita 2.0

Data: 2026-02-26 | Versão: 2.0.0

---

## P1 — Receita de Controle Especial (Controlados)

- [ ] Adicionar medicamento DO CATÁLOGO marcado como `is_controlled = true`
  - Verificar badge **"controlado"** amarelo no card da lista de itens
  - No preview da coluna direita, verificar que aparecem **2 documentos**: Receituário padrão + Receituário de Controle Especial
- [ ] Adicionar medicamento MANUAL com checkbox "Medicamento controlado" marcado
  - Mesmos comportamentos acima
- [ ] No modo **Print** e **Revisar**, confirmar que AMBAS as receitas aparecem com `page-break` entre elas
- [ ] Impressão via "🖨️ Imprimir" → duas páginas distintas

---

## P2 — Modal Medicamento Manual

- [ ] Abrir "+ Manual" no editor
- [ ] Preencher: Nome, Nome comercial, Concentração (valor + unidade select), Forma farmacêutica (select), Dose (valor + unidade select), Frequência (select), Via, Duração, Instruções, Cautelas
- [ ] Marcar checkbox "Medicamento controlado" → verificar badge na lista
- [ ] Clicar "Adicionar à Receita" → item aparece na lista
- [ ] Cautelas com múltiplas linhas → cada linha aparece como ⚠️ vermelho no preview

---

## P3 — Formato do Item (5 linhas)

Para cada item adicionado (catálogo ou manual), no preview verificar:

- [ ] **Linha 1 (título):** `Nome + Concentração (Nome comercial)`
- [ ] **Linha 1b (subtítulo):** `Forma farmacêutica • Emb: qtd unit`
- [ ] **Linha 2:** `Administrar X por via Y, a cada Z, por W dias.`
- [ ] **Linha 3:** `Iniciar em DD/MM às __:__` (preenchido com data de hoje)
- [ ] **Linha 4:** instruções extras (se preenchidas)
- [ ] **Linha 5:** `⚠️ cautelas em vermelho` (se houver)

---

## P4 — Paginação A4 Real

- [ ] Imprimir receita com 3+ medicamentos → cards **não são cortados** entre páginas
- [ ] Cada receita (standard + controlada) ocupa sua própria página
- [ ] Margens de 10mm (@page)
- [ ] Nenhum scale/compress no conteúdo impresso

---

## P5 — PDF com Texto Selecionável

- [ ] Botão **"📄 Salvar como PDF"** → toast `"💡 No diálogo que abrir, escolha 'Salvar como PDF'"` aparece
- [ ] Diálogo de impressão do browser abre em ~500ms
- [ ] PDF gerado via "Salvar como PDF" no browser → texto é **selecionável** (não rasterizado)
- [ ] Botão **"🖨️ Imprimir"** → abre diálogo de impressão diretamente
- [ ] **NÃO** há mais `html2canvas` ou `jsPDF` raster sendo usado
- [ ] No modo `?mode=pdf` (auto), chama `window.print()` automaticamente

---

## P6 — Histórico de Receitas

- [ ] Acessar `/receituario-vet/historico?patientId=<id>&patientName=<nome>`
- [ ] Link "Ver Histórico →" no editor (aparece quando paciente tem peso preenchido)
- [ ] Lista de prescrições ordenadas por data
- [ ] Botão "Abrir" → redireciona para editor com o snapshot carregado
- [ ] Botão "Anular" → confirma e chama `voidPrescription`
- [ ] Botão "Baixar PDF" → só ativo se `record.pdf_path` existir → abre signed URL

---

## P7 — Mobile: Tutores

- [ ] No mobile, acessar Nova Receita 2.0 sem clínica selecionada
  - Verificar que `clinicId` não está null antes de fazer queries
  - TutorLookup não dispara busca com `clinicId = null`
- [ ] Selecionar clínica → TutorLookup funciona normalmente
- [ ] No DEV, log exibe `clinicId` e resultados da busca

---

## P8 — Storage Security

- [ ] Migration `20260226000001_secure_receituario_media_bucket.sql` aplicada no Supabase
- [ ] Upload de imagem de perfil → path começa com `clinicId UUID` ✓
- [ ] Usuário sem membership na clínica → upload rejeitado (RLS error)
- [ ] Usuário com membership → upload aceito

---

## P9 — Botão Salvar (Supabase)

- [ ] Na página de revisão, clicar "💾 Salvar"
  - Sem tutor/paciente → toast de erro "Preencha tutor e paciente"
  - Com tutor/paciente → receita salva → toast "✅ Receita salva no sistema!"
  - Segunda vez → atualiza (usa `supabaseId` existente)
- [ ] No editor (NovaReceita2Page), botão "Salvar/Atualizar" também funciona

---

## P10 — Build

- [ ] `npm run build` → sem erros de TypeScript (warnings de `use client` são normais)
- [ ] Bundle gerado em `dist/`
- [ ] Chunk size warnings são aceitos (não bloqueantes)

---

## Regressão

- [ ] Fluxo completo: Criar receita → Revisar → Imprimir → Salvar
- [ ] Draft local: autosave funciona a cada 600ms, "Limpar rascunho" funciona
- [ ] Templates: seletor mostra templates embutidos + customizados
- [ ] Catálogo: busca de medicamentos funciona, apresentações carregam
- [ ] Doses recomendadas: sugestão de dose por espécie funciona
- [ ] Preview em tempo real: atualiza ao editar itens/campos

---

## Notas Técnicas

| Item | Status |
|------|--------|
| html2canvas/jsPDF | **Removido** — PDF via `window.print()` |
| `controlled` no adapter | **Fixado** — `item.is_controlled \|\| false` |
| `start_date` no item | **Implementado** — editável na revisão, linha 3 da instrução |
| `is_controlled` no modal manual | **Implementado** — checkbox |
| `is_controlled` no catálogo | **Implementado** — herdado de `selectedMedication.is_controlled` |
| Print CSS `break-inside: avoid` | **Implementado** — `article { break-inside: avoid }` |
| `@page { size: A4; margin: 10mm }` | **Implementado** |
| Storage policies membership-based | **Migration criada** — aplicar no Supabase |
