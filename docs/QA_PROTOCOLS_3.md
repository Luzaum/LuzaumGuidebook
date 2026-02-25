# QA Protocols 3 — Checklist de Validação Manual

## Pré-requisitos
- App rodando em `http://localhost:5173`
- Usuário autenticado com clínica ativa

---

## QA-001 — Criar pasta e protocolo

1. Abrir `/receituario-vet/protocolos`
2. Verificar que sidebar de pastas aparece
3. Clicar em "+ Novo Protocolo"
4. Preencher: Nome="Teste QA", Espécie="Canina"
5. Clicar em Salvar
6. **Esperado**: Protocolo aparece na lista, sem erro PGRST204

---

## QA-002 — Adicionar medicamentos do catálogo

1. Editar o protocolo criado em QA-001
2. Clicar em "+ Adicionar" na seção de Medicamentos
3. Digitar nome de medicamento existente no catálogo
4. Clicar em um resultado
5. Editar: dose=5, unidade=mg/kg, via=Oral, 2x/dia, 7 dias
6. Clicar Salvar
7. **Esperado**: Salvou no Supabase sem PGRST204

### Validação no Supabase
```sql
SELECT * FROM protocol_medications WHERE protocol_id = '<id>';
-- NÃO deve conter coluna `instructions`
-- Deve conter: dose_value, dose_unit, route, times_per_day, duration_days
```

---

## QA-003 — Adicionar recomendações

1. Editar o mesmo protocolo
2. Na seção Recomendações, clicar "+ Adicionar"
3. Digitar: "Oferecer água fresca em abundância."
4. Clicar Salvar
5. **Esperado**: Salvo sem erro

### Validação no Supabase
```sql
SELECT * FROM protocol_recommendations WHERE protocol_id = '<id>';
-- Coluna deve ser `text` (não `recommendation_text`)
```

---

## QA-004 — Recarregar página e verificar persistência

1. Recarregar a página
2. Clicar no protocolo criado
3. **Esperado**: Bundle carrega com medicamentos e recomendações exatamente como foram salvos

---

## QA-005 — Editar e re-salvar

1. Editar protocolo existente
2. Mudar dose de um medicamento
3. Salvar
4. **Esperado**: Salvo sem PGRST204. Dados atualizados no Supabase.

---

## QA-006 — Excluir protocolo

1. Clicar no ícone de lixeira de um protocolo
2. Confirmar exclusão
3. **Esperado**: Protocolo removido da lista. Sem filhos órfãos no Supabase.

```sql
SELECT * FROM protocol_medications WHERE protocol_id = '<id>'; -- deve estar vazio
SELECT * FROM protocol_recommendations WHERE protocol_id = '<id>'; -- deve estar vazio
```

---

## QA-007 — Aplicar protocolo em Nova Receita 2.0

1. Clicar em "UTILIZAR PROTOCOLO" em um protocolo com medicamentos e recomendações
2. **Esperado**: Navega para `/receituario-vet/nova-receita-2`
3. Itens do protocolo aparecem na lista de medicamentos
4. Recomendações aparecem no campo de recomendações
5. Não usa localStorage — payload via `navigate(state)`

---

## QA-008 — `npm run build` deve passar

```bash
npm run build
# Esperado: sem erros TypeScript relacionados a `instructions`, `is_active`, `target_species`, `recommendation_text`, `exam_items`
```

---

## Colunas banidas (Quality Gate)

| Tabela | Coluna Banida | Status |
|--------|--------------|--------|
| protocols | is_active | ✅ Removida |
| protocols | target_species | ✅ Removida (usa `species`) |
| protocol_medications | instructions | ✅ Removida |
| protocol_medications | medication_name | ✅ Removida (UI-only) |
| protocol_medications | presentation_text | ✅ Removida (UI-only) |
| protocol_recommendations | recommendation_text | ✅ Removida (usa `text`) |
| protocol_exam_items | (toda tabela) | ✅ Removida (não existe no schema) |

---

## Arquivos alterados nesta sprint

| Arquivo | O que mudou |
|---------|-------------|
| `src/lib/clinicScopedDb.ts` | `logSbError` usa `safeStringify` para logs legíveis |
| `src/lib/protocols/protocolsRepo.ts` | Reescrito: whitelist rigorosa, removido `instructions`/`exam_items`, `ProtocolBundle` sem `exam_items` |
| `src/lib/clinicRecords.ts` | Tipos corrigidos (`species` não `target_species`, sem `is_active`, sem `instructions`, `text` não `recommendation_text`), `saveProtocol` reescrito, `loadProtocol` corrigido |
| `modules/receituario-vet/Protocolos3Page.tsx` | Removido `exam_items`, `instructions`, `manual_presentation_text`, fix `is_default` |
| `modules/receituario-vet/protocolMapper.ts` | Removido `instructions`/`manual_presentation_text`, geração dinâmica de instrução |
| `docs/QA_PROTOCOLS_3.md` | **[NOVO]** Este arquivo |
