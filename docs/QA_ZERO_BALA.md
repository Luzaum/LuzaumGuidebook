# QA Checklist Zero Bala

## P0 Receita 2.0 (núcleo)

### P0.1 Padronizar selects do medicamento manual com listas fixas
- [x] Formas farmacêuticas fixas
- [x] Unidades de concentração fixas
- [x] Unidades de dose fixas
- [x] Vias fixas
- [x] Frequência fixa

### P0.2 Formato do item em 5 linhas
- [x] L1: nome + conc + (comercial) + forma farmacêutica
- [x] L2: Administrar X <unidade> por via <via extenso>, a cada Y horas, por Z dias ou uso contínuo
- [x] L3: Iniciar em DD/MM às HH:MM (editável no modal)
- [x] L4: instruções (se houver)
- [x] L5: cautelas (⚠️ vermelho)
- [x] Remover "Dose calculada" do documento final (somente label auxiliar no editor)
- [x] Frequência: "4x ao dia" convertido para "a cada 6 horas"
- [x] Toggle "uso contínuo" ao lado de duração

### P0.3 Controlados: comportamento 3 cenários
- [x] Só normal → exibe apenas receita padrão
- [x] Só controlado → exibe apenas receita especial
- [x] Misto → tabs de review separados
- [x] Templates separados para padrão e controlado
- [x] Review em tabs (padrão/controlada)

### P0.4 Perfil médico
- [x] Ao selecionar perfil, importar logo/assinatura (signed URL)
- [x] Garantir preload das imagens antes do print (useEffect de preload)

### P0.5 Print/PDF
- [x] Manter window.print (texto selecionável)
- [x] Paginação A4 (paperSize: 'A4' no template)
- [x] Remover qualquer UI do app da impressão (divs com print:hidden / print:block)

## P1 Mobile tutores
- [ ] Garantir activeClinicId no mobile; se null, exigir tela "Selecionar clínica"
- [ ] Verificar memberships do usuário e logs de query
- [ ] Tutores/pacientes devem aparecer no mobile como no desktop

## P2 Catálogo + Controle especial
- [ ] Remover “nome comercial” do medicamento base (fica só em presentations)
- [ ] Controle especial deve consumir Catálogo 3.0 (medications.is_controlled=true), sem legado

## P3 Persistência local global
- [ ] Implementar drafts locais com debounce para: catálogo, tutores/pacientes, protocolos, configurar médico, controle especial
- [ ] Chave: draft:<module>:<clinicId>:<userId>[:<entityId>]
- [ ] Carregar ao entrar, limpar após salvar, botão “Limpar rascunho”

## Arquivos alterados
- modules/receituario-vet/rxTypes.ts
- modules/receituario-vet/rxRenderer.ts
- modules/receituario-vet/RxPrintView.tsx
- modules/receituario-vet/NovaReceita2Page.tsx

## Testes manuais
1. Abrir Nova Receita 2.0
2. Adicionar medicamento manual, verificar selects fixos
3. Verificar formato de 5 linhas no preview
4. Testar toggle uso contínuo
5. Testar cenários de controlados (só normal, só controlado, misto)
6. Selecionar perfil médico, verificar assinatura e logo no preview
7. Clicar em Revisar, verificar tabs
8. Clicar em Imprimir, verificar que não há UI do app na impressão
9. Verificar que o texto é selecionável
10. Verificar paginação A4