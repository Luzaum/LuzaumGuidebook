# Guia de Teste Manual - Nova Receita 2.0 (Definitiva)

## Objetivo
Verificar que as funcionalidades essenciais da Nova Receita 2.0 foram restauradas após as correções.

## Pré-requisitos
1. Acesso ao sistema Vetius com clínica configurada
2. Dados de teste: pelo menos 5 tutores e 5 pacientes cadastrados
3. Navegador atualizado (Chrome/Firefox/Edge)

## Passos de Teste (10 Passos)

### 1. Acesso à Nova Receita 2.0
- [ ] Navegue para `/receituario-vet/nova-receita-2`
- [ ] Verifique se a página carrega sem erros
- [ ] Confirme que o título é "Nova Receita 2.0"

### 2. Verificação do Layout
- [ ] Confirme que a seção "Identificação de tutor + paciente" existe (antigo "Fluxo Plantão")
- [ ] Verifique se há duas colunas: Editor (esquerda) e Preview (direita)
- [ ] Confirme que o template selector está presente e funcional

### 3. Teste do Combobox de Tutor (CRÍTICO)
- [ ] Clique no campo "Buscar tutor..."
- [ ] **SEM digitar**: deve carregar automaticamente 5 tutores mais recentes
- [ ] Verifique se a lista mostra: nome + telefone/email + cidade/estado
- [ ] Digite "A" (letra A maiúscula)
- [ ] **COM digitação**: deve listar tutores com nome começando com "A" (prefix search)
- [ ] Selecione um tutor da lista
- [ ] Confirme que o campo fica verde com o nome do tutor selecionado
- [ ] Clique no ícone "X" para limpar a seleção

### 4. Teste do Combobox de Paciente (CRÍTICO)
- [ ] Clique no campo "Buscar paciente..."
- [ ] **SEM digitar**: deve carregar automaticamente 5 pacientes mais recentes
- [ ] Verifique se a lista mostra: nome + espécie/raça + idade
- [ ] Digite "B" (letra B maiúscula)
- [ ] **COM digitação**: deve listar pacientes com nome começando com "B" (prefix search)
- [ ] Selecione um paciente da lista
- [ ] Confirme que o campo fica verde com o nome do paciente selecionado
- [ ] Clique no ícone "X" para limpar a seleção

### 5. Teste de Filtro por Tutor (Opcional)
- [ ] Selecione primeiro um tutor
- [ ] Depois clique no campo de paciente
- [ ] Verifique se a lista de pacientes é filtrada apenas pelos pacientes desse tutor

### 6. Teste do Preview (Visualização)
- [ ] Selecione um tutor e um paciente
- [ ] Verifique se o preview mostra as informações básicas:
  - Nome do tutor
  - Telefone do tutor (se disponível)
  - Nome do paciente
  - Raça do paciente (se disponível)
- [ ] O preview deve atualizar em tempo real conforme seleções

### 7. Teste de Templates
- [ ] Clique no seletor de templates (dropdown)
- [ ] Selecione um template diferente
- [ ] Verifique se o estilo do preview muda conforme o template selecionado
- [ ] Teste pelo menos 3 templates diferentes

### 8. Teste de Adição de Medicamentos
- [ ] Clique no botão "Adicionar Medicamento"
- [ ] Preencha o modal com dados de um medicamento
- [ ] Clique em "Adicionar à Receita"
- [ ] Verifique se o medicamento aparece na lista de itens
- [ ] Confirme que o preview atualiza mostrando o medicamento adicionado

### 9. Teste de Responsividade
- [ ] Reduza a janela do navegador para tamanho mobile
- [ ] Verifique se o layout se adapta corretamente
- [ ] Confirme que os comboboxes ainda funcionam em mobile
- [ ] Teste em pelo menos 2 tamanhos de tela diferentes

### 10. Teste de Performance e Erros
- [ ] Monitore o console do navegador (F12 > Console)
- [ ] Verifique se há erros JavaScript durante os testes
- [ ] Teste a velocidade de carregamento dos comboboxes (deve ser < 1s)
- [ ] Verifique se o debounce funciona (não faz muitas requisições ao digitar)

## Critérios de Aprovação

### ✅ APROVADO (Todos devem passar)
- [ ] Combobox de tutor carrega 5 mais recentes ao focar (sem digitar)
- [ ] Combobox de tutor faz prefix search ao digitar (ilike 'A%')
- [ ] Combobox de paciente carrega 5 mais recentes ao focar (sem digitar)
- [ ] Combobox de paciente faz prefix search ao digitar (ilike 'B%')
- [ ] Dropdowns nunca são cortados (usam Portal com z-index alto)
- [ ] Preview mostra informações básicas em tempo real
- [ ] Templates selecionam e alteram o preview
- [ ] Botão "Adicionar Medicamento" funciona
- [ ] Build passa sem erros críticos
- [ ] Nenhum erro no console durante uso normal

### ⚠️ PENDENTE (Pode ser resolvido em futuras atualizações)
- [ ] Alguns campos opcionais podem não aparecer no preview básico

### ❌ REPROVADO (Necessita correção)
- [ ] Comboboxes não carregam dados
- [ ] Search não funciona (prefix ou substring)
- [ ] Dropdowns são cortados por overflow
- [ ] Preview não reflete as modificações e itens
- [ ] Erros no console impedem funcionalidade
- [ ] Build falha com erros TypeScript críticos

## Logs e Debug

Se qualquer teste falhar, coletar:

```json
{
  "timestamp": "2026-02-25T03:00:00Z",
  "test_step": "Combobox tutor - carregar recentes",
  "expected": "5 tutores mais recentes",
  "actual": "Lista vazia / erro",
  "console_errors": ["Copiar erros do console"],
  "network_requests": ["Verificar requests Supabase"],
  "state_at_failure": "Copiar estado da aplicação"
}
```

## Arquivos Modificados (Atualizações Recentes)

1. `modules/receituario-vet/NovaReceita2Page.tsx`
   - Renomeado "Fluxo Plantão" para "Identificação de tutor + paciente"
   - Restaurado o `RxPrintView` conectando o estado principal ao Preview formatado.
   - Adicionada leitura dos templates pré-embutidos (BUILTIN_TEMPLATES).

2. `modules/receituario-vet/novaReceita2Adapter.ts`
   - Novo adaptador criado para mapear dados da NovaReceita2State em PrescriptionState e delegar ao rxRenderer.
   - Tratamento customizado do endereço do Tutor e filtragem do microchip.

3. `modules/receituario-vet/components/TutorLookup.tsx` e `PatientLookup.tsx`
   - Simplificado clique nas opções convertendo para pointer-events protegidos para evitar desfoque e perdas de click no web.
   - Dropdown com Portal (nunca cortado).

## Próximos Passos Opcionais

1. **Melhorias**
   - Adicionar loading states mais visuais
   - Implementar cache para resultados recentes
   - Adicionar validação de campos obrigatórios
   - Melhorar acessibilidade (ARIA labels)

2. **Testes automatizados**
   - Criar testes unitários para comboboxes
   - Testes de integração para fluxo completo
   - Testes de performance para search com debounce

## Contato para Suporte

Em caso de falhas ou dúvidas durante os testes:
- Revisar logs do console do navegador
- Verificar conexão com Supabase
- Confirmar que há dados de teste na clínica
- Consultar a documentação de tipos em `rxTypes.ts`

---

*Documento gerado em: 2026-02-25*
*Versão: 1.0 - Testes Básicos Funcionais*
*Status: PRONTO PARA TESTES MANUAIS*