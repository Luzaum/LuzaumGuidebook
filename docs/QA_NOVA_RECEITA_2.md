# QA — Nova Receita 2.0

> Versão: 2.0.0-parity
> Rota: `/receituario-vet/nova-receita-2`

---

## PRÉ-REQUISITO

- Estar logado e com uma clínica selecionada (ClinicProvider)
- Pelo menos 1 tutor e 1 paciente cadastrados no Supabase
- Pelo menos 1 medicamento com apresentação no Catálogo 3.0

---

## CHECKLIST DE TESTE MANUAL

### 1. Identificação (Tutor/Paciente)

- [ ] Campo "Tutor / Responsável": digitar nome → resultado aparece → clicar → tutor aparece no preview (campo "Responsável:")
- [ ] Campo "Paciente": com tutor selecionado, buscar paciente do tutor → aparece no preview (campo "Paciente:")
- [ ] Preview mostra: `Paciente: Nome (Raça, Idade)` — sem "microchipped" na impressão
- [ ] Preview mostra: `Responsável: Nome — CPF: ... — RG: ...` (quando preenchidos)
- [ ] Preview mostra: `Endereço: Rua, Número, Bairro, Cidade/UF, CEP, Telefone`

---

### 2. Template

- [ ] Dropdown lista 5 templates: Padrão Clínico, Moderno Dark, Verde Clínico, Clássico Formal, Compacto A5
- [ ] Trocar template → preview muda de aparência visualmente (cor accent, fonte, tamanho)
- [ ] Botão "Editar templates" → navega para `/receituario-vet/templates`

---

### 3. Recomendações

- [ ] Campo de texto de recomendações → digitar texto → aparece na seção "Recomendações" do preview
- [ ] Exames: clicar chips de exames comuns → aparecem marcados
- [ ] Exame personalizado: digitar nome + Enter ou "+ Adicionar" → aparece na lista
- [ ] Exames selecionados aparecem no preview na seção de Exames

---

### 4. Medicamento do Catálogo

- [ ] Botão "+ Catálogo" → abre modal de busca
- [ ] Digitar nome → resultados aparecem em < 0,5s
- [ ] Selecionar medicamento → apresentações carregam
- [ ] Selecionar apresentação → preview mostra concentração, forma farmacêutica, nome comercial, embalagem, preço
- [ ] Doses sugeridas aparecem → clicar aplica dose/via/frequência
- [ ] Clicar "Adicionar à Receita" → item aparece na lista E no preview (seção USO ORAL / SC / etc.)
- [ ] **Preview do item deve mostrar**:
  - Título: `Nome Concentração (Nome Comercial)` — sem duplicação
  - Subtítulo: `Forma farmacêutica • Emb: Qtd Unit • R$ Preço`
  - Instrução: `Dose: X • Via: Y • Frequência • por Duração` (ou texto manual)

---

### 5. Medicamento Manual

- [ ] Botão "+ Manual" → abre modal sem busca de catálogo
- [ ] Preencher Nome (obrigatório), Concentração, **Nome comercial**, Forma farmacêutica, Via
- [ ] Preencher Dose, Frequência, Duração, Instruções, Cautelas
- [ ] Clicar "Adicionar" → item aparece com badge "manual" na lista
- [ ] Preview mostra o item na seção correta (pela via selecionada)
- [ ] Nome comercial aparece no título/subtitle do preview (ex: `Amoxicilina 500 mg (Amoxivet)`)
- [ ] Cautelas aparecem no item do preview

---

### 6. Botões da TopBar

- [ ] **Revisar** → salva em sessionStorage e navega para `/receituario-vet/nova-receita-2-print?mode=review`
- [ ] **Imprimir** → navega para `?mode=print` → auto dispara `window.print()` em ~600ms
- [ ] **Exportar PDF** → navega para `?mode=pdf` → auto gera e baixa PDF em ~600ms
- [ ] **Salvar / Atualizar** → salva receita no Supabase (requer tutor + paciente)

---

### 7. Página de Revisão Interativa (`?mode=review`)

- [ ] Layout 2 colunas: painel esquerdo (editor) + preview direito
- [ ] **Clique na zona "Identificação"** (seção Paciente/Responsável no preview) → editor esquerdo muda para formulário de tutor/paciente
  - Editar nome do tutor → preview atualiza em tempo real
  - Editar endereço → preview atualiza em tempo real
  - Editar nome do paciente → preview atualiza em tempo real
  - Editar raça/idade → preview atualiza em tempo real
- [ ] **Clique na zona "Recomendações"** → editor esquerdo muda para textarea de recomendações
  - Editar texto → preview atualiza em tempo real
- [ ] **Clique em um item no preview** → editor esquerdo muda para editor do item
  - Editar dose → instrução atualiza no preview
  - Editar instruções → preview atualiza
  - Editar cautelas → preview atualiza
- [ ] Botões de atalho (chips no painel esquerdo) também mudam o editor
- [ ] Botão **🖨️ Imprimir** dispara `window.print()`
- [ ] Botão **⬇ Exportar PDF** baixa PDF com nome `PACIENTE_TUTOR_DD-MM-AAAA.pdf`
- [ ] Botão **WhatsApp** abre wa.me com texto pré-preenchido + baixa PDF
- [ ] Botão **← Editor** volta para a página de edição

---

### 8. Impressão (`window.print()`)

- [ ] Preview imprime sem barra de topbar (`.print:hidden`)
- [ ] Fundo do papel é branco na impressão
- [ ] Todas as seções (header, tutor/paciente, medicamentos, recomendações) aparecem
- [ ] Itens de medicamento mostram instrução completa

---

### 9. Exportar PDF

- [ ] PDF gerado via jsPDF + html2canvas
- [ ] PDF tem tamanho correto (A4 ou A5 conforme template selecionado)
- [ ] Nome do arquivo: `NOME_PACIENTE_NOME_TUTOR_DD-MM-AAAA.pdf`
- [ ] Conteúdo legível e sem corte

---

### 10. Responsividade

- [ ] **Mobile (< 1024px)**: botão "Ver preview / Ocultar preview" aparece → toggle funciona
- [ ] **Tablet/Desktop (≥ 1024px)**: preview sempre visível na coluna direita
- [ ] Preview inline não estoura nem fica invisível (scale 0.6 com overflow-y scroll)
- [ ] Página de revisão em mobile: colunas empilhadas verticalmente

---

### 11. Supabase (se erros ocorrerem)

Se aparecer erro do Supabase, verificar no console:
```json
{
  "code": "...",
  "message": "...",
  "details": "...",
  "hint": "..."
}
```

Payload enviado ao salvar:
```json
{
  "patient_id": "uuid",
  "tutor_id": "uuid",
  "clinic_id": "uuid",
  "content": {
    "kind": "standard",
    "templateId": "rx_br_v1_clean",
    "stateSnapshot": { "...": "..." }
  }
}
```

---

## BUGS CORRIGIDOS NESTA VERSÃO

| Bug | Descrição | Fix |
|-----|-----------|-----|
| Título duplicado | `name` no adapter tinha o título completo, e o renderer concatenava `concentration` + `commercialName` novamente | `name` agora é apenas o nome do fármaco; renderer reconstrói sem duplicação |
| Instrução sumia / item não aparecia | `autoInstruction = true` fazia o renderer chamar `buildAutoInstruction` que não parseava dose livre ("10 mg/kg") | `autoInstruction = false` + `manualEdited = true` — instrução pré-construída é sempre usada |
| Preview cortado | `marginBottom: calc(100% * -0.35)` usava largura do pai (errado) | Substituído por container `maxHeight: 520px` + `overflow-y: auto` |
| Revisar não era interativo | PrintPage em modo review era estático sem edição | Reescrito com editor contextual por zona/item + RxPrintView com `interactive={true}` |
| Botões misturados | "Imprimir / Exportar" era um único botão sem distinção | Separados em "Revisar", "Imprimir" e "Exportar PDF" |
| `toNumber` crash | `(raw \|\| '').replace(...)` explodia quando Supabase retornava `number` ou `null` | `toNumber(raw: unknown)` com early-return por tipo |
| Tutores não apareciam no mobile | `clinicId = null` durante bootstrap assíncrono do ClinicProvider gerava queries vazias | `TutorLookup` aguarda `clinicLoading === false` antes de qualquer query |
| Impressão dark leaking | Fundo escuro do app vazava para `window.print()` | Container `print:hidden` na UI + `hidden print:block` no canvas limpo |
| Draft perdido ao navegar | Receita em andamento sumia ao trocar de rota | LocalStorage autosave debounce 600ms + restauração no mount + "Limpar rascunho" |
| Upload 22P02 | Path de storage começava com `receituario/` (não UUID), violando policy RLS | Path inicia com `clinicId` (UUID) — fallback para `userId` se clinicId ausente |
| Templates fantasmas | BUILTIN_TEMPLATES não apareciam junto com os templates customizados do rxDb | `allTemplates = useMemo` que unifica e deduplica por `id` |
| Cálculo dose/volume não exibido | Dose livre "10 mg/kg" não era parseada em campos estruturados | `parseDoseString` extrai `numericStr`+`unit`+`perKg`; subtitle mostra "Dose calculada: X mg · Total: Y mL" |
| Campos EditorItem limitados | Review page só editava 4 campos por item | EditorItem expandido: nome, concentração, nome comercial, forma, dose, via, freq, dur, instruções, cautelas |
| Sem commercial_name no modo manual | Modal manual não tinha campo de nome comercial | Adicionado campo + estado `manualCommercialName` |
| package_quantity/unit do metadata | Campos podem estar no JSON `metadata` em vez de coluna direta | `extractPresentationField` busca coluna direta com fallback em `metadata` |

---

## ARQUIVOS ALTERADOS

| Arquivo | O que mudou |
|---------|-------------|
| `modules/receituario-vet/rxRenderer.ts` | `toNumber(raw: unknown)` robusto; subtitle com cálculo dose/volume |
| `modules/receituario-vet/novaReceita2Adapter.ts` | `toSafeString`; `parseDoseString`; `name` apenas fármaco; `autoInstruction=false` |
| `modules/receituario-vet/NovaReceita2Page.tsx` | Draft localStorage autosave; allTemplates unificado; botões Revisar/Imprimir/PDF |
| `modules/receituario-vet/NovaReceita2PrintPage.tsx` | EditorItem completo (10 campos); print isolation `print:hidden` + `hidden print:block` |
| `modules/receituario-vet/components/TutorLookup.tsx` | Guard `clinicLoading` antes de queries; estados de espera no dropdown |
| `modules/receituario-vet/components/AddMedicationModal2.tsx` | `metadata` em PresentationRecord; `extractPresentationField`; `commercial_name` no modo manual |
| `modules/receituario-vet/rxSupabaseStorage.ts` | Path storage inicia com `clinicId` (UUID) — fix policy 22P02 |
| `modules/receituario-vet/ProfilePage.tsx` | Passa `clinicId` para `uploadProfileImageDataUrl` |
| `docs/QA_NOVA_RECEITA_2.md` | Este arquivo (atualizado com todos os fixes) |
