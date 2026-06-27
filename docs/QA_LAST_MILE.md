# QA Last Mile (2026-02-27)

## Build
- [x] `npm run build` conclu?do com sucesso.
- Observa??es: warnings existentes de bundling/chunk-size, sem falha de build.

## 1) Review Interativo - Edi??o completa do item
### Cen?rio 1.1 - Item cat?logo
1. Abrir Nova Receita 2.0, adicionar item do cat?logo.
2. Clicar `Revisar`.
3. Clicar no item no preview.
4. Validar abertura do `AddMedicationModal2` em modo edi??o com prefill.
5. Alterar medicamento, apresenta??o, dose, via, frequ?ncia, dura??o, iniciar em, instru??es e cautelas.
6. Salvar altera??es.
- Esperado:
  - Item ? atualizado sem duplicar.
  - `id` do item permanece o mesmo (substitui??o no array).

### Cen?rio 1.2 - Item manual
1. Adicionar item manual.
2. Em revis?o, clicar no item.
3. Validar abertura do modal em `manualMode` com prefill.
4. Editar campos e salvar.
- Esperado:
  - Atualiza no lugar, sem duplica??o.

## 2) Quantidade por vez calculada + unidade correta
### Cen?rio 2.1 - mg/kg + apresenta??o mg/mL
1. Paciente com peso (ex.: 10 kg).
2. Dose: `2 mg/kg` e concentra??o `50 mg/mL`.
3. Revisar preview/print.
- Esperado:
  - Texto final: `Administrar {QTD} mL por vez...`.
  - N?o exibe `mg/kg` nem `Dose calculada` no documento final.

### Cen?rio 2.2 - mg + apresenta??o mg/comprimido
1. Dose: `75 mg`, concentra??o `100 mg/comprimido`.
2. Revisar preview/print.
- Esperado:
  - Quantidade calculada em comprimido com arredondamento em 1/4.
  - Exemplo de exibi??o: `0,75 (3/4) comprimido`.

### Cen?rio 2.3 - arredondamento 1/4 de comprimido
1. Testar valores que resultem em 0,23 / 0,51 / 0,74 comprimido.
- Esperado:
  - 0,23 -> 0,25 (1/4)
  - 0,51 -> 0,5 (1/2)
  - 0,74 -> 0,75 (3/4)

### Cen?rio 2.4 - override manual apenas quando c?lculo falhar
1. Informar caso sem peso (dose por kg) ou sem concentra??o compat?vel.
2. Abrir modal.
- Esperado:
  - Campo `Quantidade por vez (calculada)` aparece readonly quando h? c?lculo.
  - Campo de override manual s? aparece quando c?lculo falha.

## 3) Formata??o (negrito e recomenda??es)
### Cen?rio 3.1 - linha Iniciar em
1. Item com `start_date` preenchido.
2. Ver no preview/print.
- Esperado:
  - Linha `Iniciar em DD/MM ?s HH:MM` inteira em negrito.

### Cen?rio 3.2 - recomenda??es limpas
1. Inserir recomenda??o com markdown parcial (ex.: `**Repouso** por 7 dias`).
2. Ver no preview/print.
- Esperado:
  - Renderiza??o limpa da linha, sem in?cio "quebrado" com parte em negrito indevida.

## 4) Imprimir/Salvar PDF com save autom?tico + exclus?o no hist?rico
### Cen?rio 4.1 - Imprimir
1. Na revis?o, clicar `Imprimir`.
- Esperado:
  - `savePrescription()` executa antes do `window.print()`.
  - Receita recebe/usa `prescriptionId` (`supabaseId`).

### Cen?rio 4.2 - Salvar como PDF
1. Na revis?o, clicar `Salvar como PDF`.
- Esperado:
  - `savePrescription()` executa antes do `window.print()`.

### Cen?rio 4.3 - Hist?rico: excluir
1. Abrir hist?rico do paciente.
2. Clicar `Excluir` em uma receita com `pdf_path`.
3. Confirmar.
- Esperado:
  - Remove linha em `prescriptions`.
  - Remove arquivo do storage quando `pdf_path` existir.

## 5) Protocolos exemplo por especialidade + ?cones
### Cen?rio 5.1 - seed inicial idempotente
1. Abrir Protocolos 3.0 em cl?nica/usu?rio sem seed pr?via.
- Esperado:
  - Pastas criadas: Gastro, Nefro/Uro, Pneumo, Cardio, Ortopedia, Neuro, Onco, Nutri??o, Cirurgia.
  - Cada pasta com `icon_key` ?nico e `color` definido.
  - Protocolos exemplo edit?veis criados com recomenda??es/exames (sem meds fixos).
  - Dados salvos com `clinic_id` e `owner_user_id`.

2. Reabrir p?gina.
- Esperado:
  - Seed n?o duplica pastas/protocolos (idempotente).
