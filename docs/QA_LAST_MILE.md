# QA Last Mile (2026-02-27)

## Build
- [x] `npm run build` concluído com sucesso.
- Observações: warnings existentes de bundling/chunk-size, sem falha de build.

## 1) Review Interativo - Edição completa do item
### Cenário 1.1 - Item catálogo
1. Abrir Nova Receita 2.0, adicionar item do catálogo.
2. Clicar `Revisar`.
3. Clicar no item no preview.
4. Validar abertura do `AddMedicationModal2` em modo edição com prefill.
5. Alterar medicamento, apresentação, dose, via, frequência, duração, iniciar em, instruções e cautelas.
6. Salvar alterações.
- Esperado:
  - Item é atualizado sem duplicar.
  - `id` do item permanece o mesmo (substituição no array).

### Cenário 1.2 - Item manual
1. Adicionar item manual.
2. Em revisão, clicar no item.
3. Validar abertura do modal em `manualMode` com prefill.
4. Editar campos e salvar.
- Esperado:
  - Atualiza no lugar, sem duplicação.

## 2) Quantidade por vez calculada + unidade correta
### Cenário 2.1 - mg/kg + apresentação mg/mL
1. Paciente com peso (ex.: 10 kg).
2. Dose: `2 mg/kg` e concentração `50 mg/mL`.
3. Revisar preview/print.
- Esperado:
  - Texto final: `Administrar {QTD} mL por vez...`.
  - Não exibe `mg/kg` nem `Dose calculada` no documento final.

### Cenário 2.2 - mg + apresentação mg/comprimido
1. Dose: `75 mg`, concentração `100 mg/comprimido`.
2. Revisar preview/print.
- Esperado:
  - Quantidade calculada em comprimido com arredondamento em 1/4.
  - Exemplo de exibição: `0,75 (3/4) comprimido`.

### Cenário 2.3 - arredondamento 1/4 de comprimido
1. Testar valores que resultem em 0,23 / 0,51 / 0,74 comprimido.
- Esperado:
  - 0,23 -> 0,25 (1/4)
  - 0,51 -> 0,5 (1/2)
  - 0,74 -> 0,75 (3/4)

### Cenário 2.4 - override manual apenas quando cálculo falhar
1. Informar caso sem peso (dose por kg) ou sem concentração compatível.
2. Abrir modal.
- Esperado:
  - Campo `Quantidade por vez (calculada)` aparece readonly quando há cálculo.
  - Campo de override manual só aparece quando cálculo falha.

## 3) Formatação (negrito e recomendações)
### Cenário 3.1 - linha Iniciar em
1. Item com `start_date` preenchido.
2. Ver no preview/print.
- Esperado:
  - Linha `Iniciar em DD/MM às HH:MM` inteira em negrito.

### Cenário 3.2 - recomendações limpas
1. Inserir recomendação com markdown parcial (ex.: `**Repouso** por 7 dias`).
2. Ver no preview/print.
- Esperado:
  - Renderização limpa da linha, sem início “quebrado” com parte em negrito indevida.

## 4) Imprimir/Salvar PDF com save automático + exclusão no histórico
### Cenário 4.1 - Imprimir
1. Na revisão, clicar `Imprimir`.
- Esperado:
  - `savePrescription()` executa antes do `window.print()`.
  - Receita recebe/usa `prescriptionId` (`supabaseId`).

### Cenário 4.2 - Salvar como PDF
1. Na revisão, clicar `Salvar como PDF`.
- Esperado:
  - `savePrescription()` executa antes do `window.print()`.

### Cenário 4.3 - Histórico: excluir
1. Abrir histórico do paciente.
2. Clicar `Excluir` em uma receita com `pdf_path`.
3. Confirmar.
- Esperado:
  - Remove linha em `prescriptions`.
  - Remove arquivo do storage quando `pdf_path` existir.

## 5) Protocolos exemplo por especialidade + ícones
### Cenário 5.1 - seed inicial idempotente
1. Abrir Protocolos 3.0 em clínica/usuário sem seed prévia.
- Esperado:
  - Pastas criadas: Gastro, Nefro/Uro, Pneumo, Cardio, Ortopedia, Neuro, Onco, Nutrição, Cirurgia.
  - Cada pasta com `icon_key` único e `color` definido.
  - Protocolos exemplo editáveis criados com recomendações/exames (sem meds fixos).
  - Dados salvos com `clinic_id` e `owner_user_id`.

2. Reabrir página.
- Esperado:
  - Seed não duplica pastas/protocolos (idempotente).
