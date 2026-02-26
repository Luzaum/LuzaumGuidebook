# QA_NEXT — Nova Receita 2.0 + Protocolos 3.0 (pós-baseline 2026-02-26)

Data: 2026-02-26 | Versão: 2.1.0

---

## A — Formatação da Receita

### A1 — Linha 1: Nome + Concentração + Comercial + Forma

- [ ] **Com nome comercial:** Linha 1 = `Amoxil 500mg (Amoxicilina) – Comprimido`
- [ ] **Sem nome comercial:** Linha 1 = `Amoxicilina 500mg – Comprimido`
- [ ] **Sem concentração e sem forma:** Linha 1 = `Amoxicilina`
- [ ] Nenhum campo extra aparece após a linha 1 (concentration/commercialName vazios no adapter)

### A2 — Linha 2: Instrução leiga

- [ ] Frequência convertida: "4x ao dia" → "a cada 6 horas"; "2x ao dia" → "a cada 12 horas"; "1x ao dia" → "uma vez ao dia"
- [ ] Frequência por intervalo: "q8h" → "a cada 8 horas"; "q24h" → "uma vez ao dia"
- [ ] Via convertida: VO → "oral"; SC → "subcutânea"; IM → "intramuscular"; IV → "intravenosa"; OF → "oftálmica"
- [ ] Unidade derivada da forma farmacêutica: Comprimido → "comprimido(s)"; Cápsula → "cápsula(s)"; Gotas → "gotas"; Solução injetável → "mL"; (fallback) → "dose(s)"
- [ ] Formato final: `Administrar X unidade(s) por via oral, a cada 6 horas, por 7 dias.`
- [ ] Uso contínuo: `Administrar X unidade(s) por via oral, a cada 6 horas, uso contínuo.`
- [ ] Dose manual (sem catálogo): usa `dose` + `doseUnit` do state

### A3 — Toggle Uso Contínuo (modal)

- [ ] Toggle "Uso contínuo" aparece ao lado do label "Duração" no modal (modo catálogo e modo manual)
- [ ] Quando toggle ON: campo de duração desaparece; instrução usa "uso contínuo"
- [ ] Quando toggle OFF (padrão): campo de duração aparece; instrução usa "por X dias"
- [ ] Estado resetado corretamente ao fechar e reabrir o modal

### A4 — Iniciar em (data + hora)

- [ ] Campo "Iniciar em" (data) e "Horário de início" (time) aparecem no modal (modo catálogo e modo manual)
- [ ] Ao adicionar: `start_date = "DD/MM às HH:MM"` (ou `"DD/MM às __:__"` se sem horário)
- [ ] Linha 3 da receita exibe: `Iniciar em DD/MM às HH:MM` (ou linha "Iniciar em DD/MM às __:__" se sem horário)
- [ ] Data padrão = data de hoje no formato DD/MM ao abrir modal

### A5 — Cautelas por linha

- [ ] Cada cautela aparece em linha separada com ⚠️ em vermelho/laranja
- [ ] Itens com `is_controlled = true` exibem badge laranja no card do editor

### A6 — Cabeçalho do Paciente

- [ ] Preview exibe: `Nome, Espécie, Raça, Idade, X kg`
- [ ] Campos opcionais (raça, idade, peso) omitidos se ausentes

---

## C4 — Abas Padrão / Controlada na Revisão

- [ ] Em `?mode=review`, quando há itens controlados e não-controlados:
  - Duas abas aparecem no preview: "📄 Padrão" e "💊 Controlada"
  - Clicar em "Padrão" mostra o documento sem controlados
  - Clicar em "Controlada" mostra o documento apenas com controlados
- [ ] Quando há apenas um tipo de item: nenhuma aba aparece (preview simples)
- [ ] Template da aba "Controlada" usa `selectedControlledTemplate`

---

## D — Protocolos — Pastas

### D1 — Auto-criação de pastas padrão

- [ ] Na primeira vez que o usuário acessa Protocolos (sem nenhuma pasta):
  - 14 pastas são criadas automaticamente: Ortopedia, Cirurgia Geral, Oncologia, Gastroenterologia,
    Pneumologia, Cardiologia, Neurologia, Oftalmologia, Endocrinologia, Nefrologia/Urologia,
    Dermatologia, Emergência/UTI, Infectologia, Reprodução
  - A lista de pastas é exibida após a criação
- [ ] Se o usuário já tiver pastas: nenhuma pasta padrão é criada

### D2 — Criar nova pasta

- [ ] Botão "+" no header da sidebar exibe o formulário inline
- [ ] Campo de texto com autoFocus recebe o nome da pasta
- [ ] Enter confirma; Escape cancela
- [ ] Botão "Criar" desabilitado quando campo vazio
- [ ] Pasta criada aparece na lista sem recarregar a página

### D3 — Excluir pasta

- [ ] Botão de lixeira aparece ao hover em cada pasta
- [ ] Confirmação pergunta sobre mover protocolos para Raiz
- [ ] Após confirmar: protocolos movidos para `folder_id = null`, pasta excluída
- [ ] Se a pasta excluída estava selecionada: volta para "Todos"
- [ ] Lista de pastas e protocolos atualizada automaticamente

### D4 — Bug do botão "+" (corrigido)

- [ ] O botão "+" estava sem `onClick` — agora abre o formulário inline ✓

---

## Notas Técnicas

| Item | Status |
|------|--------|
| `frequencyToText()` no adapter | **Adicionado** — converte tokens para texto leigo |
| `routeToFullText()` no adapter | **Adicionado** — VO/SC/IM/IV → texto completo |
| `presentationUnit()` no adapter | **Adicionado** — deriva unidade da forma farmacêutica |
| `buildLineOneTitle()` no adapter | **Adicionado** — monta Linha 1 completa no campo `name` |
| `concentration: ''` e `commercialName: ''` no adapter | **Limpos** — evita duplicação no rxRenderer |
| `isContinuous` toggle no modal | **Adicionado** — alterna "uso contínuo" vs duração |
| `startDate` + `startTime` no modal | **Adicionados** — gera `start_date` formatado |
| Abas Padrão/Controlada na revisão | **Adicionadas** — `activeReviewTab` state em PrintPage |
| Auto-criação 14 pastas padrão | **Implementado** — no effect `listFolders`, quando vazio |
| `handleCreateFolder` + form inline | **Implementado** — `createFolderOpen` state + Input |
| `handleDeleteFolder` com migração | **Implementado** — move protocols para null, exclui pasta |
| Botão delete nos itens da sidebar | **Adicionado** — visível ao hover, confirma antes de excluir |

---

## Pendentes (próximas iterações)

- [ ] B2: Preload de imagens (logo/assinatura) via signed URL antes do print
- [ ] B3: Print mode limpo (sem UI do app)
- [ ] E: Catálogo — remover nome comercial do fármaco base (apenas em apresentações)
- [ ] F: Persistência local global (draft para catálogo, tutores, protocolos, médico)
- [ ] G: Controle especial — filtro `is_controlled = true` no Catálogo 3.0
