# Manual Acceptance Checklist - Protocolos 3.0 → Nova Receita 2.0

## Objetivo
Garantir que a funcionalidade "Aplicar em Nova Receita" do Protocolos 3.0 funciona corretamente e não introduz regressões.

## ✅ Funcionalidade Principal: Aplicar Protocolo em Nova Receita

### Teste 1: Aplicar protocolo com 2 medicamentos + 2 recomendações
- [ ] Navegar para Protocolos 3.0 (`/receituario-vet/protocolos-3`)
- [ ] Criar ou selecionar um protocolo existente com:
  - Pelo menos 2 medicamentos com dados completos (nome, apresentação, via, frequência, duração)
  - Pelo menos 2 recomendações de texto
- [ ] Clicar no botão "Aplicar em Nova Receita"
- [ ] Verificar que a navegação ocorre para `/receituario-vet/nova-receita-2`
- [ ] Confirmar que os medicamentos do protocolo aparecem na lista de itens da receita
- [ ] Confirmar que as recomendações do protocolo foram adicionadas ao campo de recomendações

### Teste 2: Visualização Preview com medicamentos numerados e seção por via
- [ ] Após aplicar o protocolo, verificar a coluna de preview (direita)
- [ ] Confirmar que os medicamentos aparecem numerados (1., 2., etc.)
- [ ] Verificar que os medicamentos são agrupados por via (ORAL, SC, IM, etc.)
- [ ] Confirmar que as instruções foram geradas corretamente a partir dos dados do protocolo

### Teste 3: Refresh não duplica itens
- [ ] Após aplicar o protocolo, dar refresh na página (F5)
- [ ] Verificar que os itens NÃO são duplicados
- [ ] Confirmar que o state de navegação foi limpo corretamente

### Teste 4: Navegação back/forward
- [ ] Após aplicar o protocolo, clicar no botão "Voltar" do navegador
- [ ] Verificar que retorna para Protocolos 3.0
- [ ] Clicar no botão "Avançar" do navegador
- [ ] Confirmar que os itens ainda estão presentes (não foram perdidos)

## ✅ Validação de Dados

### Teste 5: Protocolo sem medicamentos
- [ ] Criar um protocolo apenas com recomendações (sem medicamentos)
- [ ] Aplicar em Nova Receita
- [ ] Verificar que apenas as recomendações são adicionadas
- [ ] Confirmar que não há erros no console

### Teste 6: Protocolo sem recomendações
- [ ] Criar um protocolo apenas com medicamentos (sem recomendações)
- [ ] Aplicar em Nova Receita
- [ ] Verificar que apenas os medicamentos são adicionados
- [ ] Confirmar que o campo de recomendações permanece inalterado

### Teste 7: Protocolo com dados incompletos
- [ ] Criar um protocolo com medicamento sem via (route)
- [ ] Aplicar em Nova Receita
- [ ] Verificar que o medicamento é adicionado com via padrão (ORAL)
- [ ] Confirmar que não há erros de runtime

## ✅ Integração com rxRenderer

### Teste 8: Compatibilidade com PrintDoc
- [ ] Após aplicar protocolo, clicar em "Imprimir / Exportar"
- [ ] Verificar que o preview de impressão renderiza corretamente
- [ ] Confirmar que os medicamentos aparecem com:
  - Nome correto
  - Apresentação correta
  - Instruções geradas automaticamente
  - Quantidade calculada (se houver dose e peso do paciente)

### Teste 9: Status de completude
- [ ] Verificar que cada item tem status "ok" ou "incomplete" conforme dados
- [ ] Itens com nome, via e instrução devem ter status "ok"
- [ ] Itens faltando dados essenciais devem ter status "incomplete"

## ✅ Quality Gate: Validação de Payloads Supabase

### Teste 10: Executar validador de payloads
- [ ] Executar `npm run validate:dbpayloads`
- [ ] Verificar que o script executa sem erros de sintaxe
- [ ] Se houver erros de validação, revisar os campos inválidos reportados

### Teste 11: Testar com payload inválido (opcional)
- [ ] Modificar temporariamente um arquivo para incluir campo não-whitelisted
- [ ] Executar `npm run validate:dbpayloads`
- [ ] Confirmar que o validador detecta o campo inválido e falha (exit code 1)

## ✅ Regressões

### Teste 12: Funcionalidades existentes não quebradas
- [ ] Navegar para Nova Receita 2.0 sem aplicar protocolo
- [ ] Testar adição manual de medicamento via modal
- [ ] Testar busca e seleção de tutor/paciente
- [ ] Testar salvamento automático
- [ ] Testar preview com dados manuais

### Teste 13: Protocolos 3.0 não afetados
- [ ] Criar novo protocolo
- [ ] Editar protocolo existente
- [ ] Excluir protocolo
- [ ] Buscar medicamentos no catálogo
- [ ] Todas funcionalidades devem continuar funcionando

## ✅ Performance e UX

### Teste 14: Tempo de resposta
- [ ] Aplicar protocolo com 10+ medicamentos
- [ ] Medir tempo entre clique e navegação (deve ser < 2 segundos)
- [ ] Verificar que não há freeze da UI

### Teste 15: Feedback visual
- [ ] Durante o carregamento do protocolo, deve haver feedback (console.log ou spinner)
- [ ] Em caso de erro, mensagem amigável deve ser exibida
- [ ] Botão deve ter estado desabilitado durante processamento

## ✅ Logs e Debug

### Teste 16: Console logs
- [ ] Abrir console do navegador (F12)
- [ ] Aplicar protocolo
- [ ] Verificar logs informativos:
  - `[Protocolos3] Carregando protocolo para aplicar em Nova Receita`
  - `[Protocolos3] Payload para Nova Receita 2.0`
  - `[NovaReceita2] Recebendo payload do protocolo`
- [ ] Confirmar que não há erros no console

---

## Como Executar os Testes

1. **Ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acessar: http://localhost:5175/receituario-vet/protocolos-3

2. **Validador de payloads:**
   ```bash
   npm run validate:dbpayloads
   ```

3. **Logs detalhados:**
   - Abrir DevTools (F12)
   - Filtrar por "[Protocolos3]" ou "[NovaReceita2]"

## Critérios de Aceitação

- [ ] Todos os testes acima passam
- [ ] Nenhum erro no console do navegador
- [ ] Validador de payloads executa sem falhas (ou falhas são falsos positivos conhecidos)
- [ ] Código segue padrões do projeto (TypeScript, React hooks, etc.)
- [ ] Documentação atualizada (este checklist)

## Arquivos Modificados/Criados

1. `modules/receituario-vet/protocolMapper.ts` - Mapper de protocolo para receita
2. `modules/receituario-vet/Protocolos3Page.tsx` - Botão "Aplicar em Nova Receita"
3. `modules/receituario-vet/NovaReceita2Page.tsx` - Handler de navigation state
4. `scripts/validate-supabase-payloads.ts` - Validador de quality gate
5. `package.json` - Script `validate:dbpayloads`
6. `docs/QA_CHECKLIST.md` - Este checklist

---

**Responsável pela validação:** _________________________

**Data:** _________________________

**Resultado:** □ Aprovado □ Reprovado □ Com ressalvas

**Observações:**