# QA FIX FINAL 2

Este documento detalha o passo a passo de como validar as correções implementadas neste patch.

## 1) Receita — Não mostrar dose (mg/kg) no documento
1. Acesse *Receituário* > *Nova Receita*.
2. Adicione um medicamento manualmente ou do catálogo com a unidade da dose em `mg/kg`. Informe peso no paciente (ex: 10 kg).
3. No modal de adição do medicamento:
  - Verifique que o campo de *Quantidade por dose (calculada)* agora é preenchido automaticamente (se o item possuir concentração legível).
  - *Regra*: `Dose(mg) = mg/kg * pesoKg`.
4. Finalize a adição. Na lista da receita, veja a instrução em termos leigos (ex: "Administrar 1.5 comprimido(s)...").
5. Vá em *Finalizar Receita* (PDF/Print) e comprove que em **nenhum lugar** aparece o termo `mg/kg` ou `dose calculada`, apenas a instrução clara de uso.
6. Teste o cenário sem concentração e sem peso (ou apenas um deles):
  - O modal vai exibir um aviso amarelo: `⚠️ [Motivo] — informe manualmente`.
  - O input *Quantidade / Volume por dose* estará liberado para que você digite algo como "2 gotinhas" e isso deverá estar refletido na instrução final.

## 2) Modal Catálogo — Data/Hora + Dose com unidade
1. Abra o modal *Adicionar Medicamento do Catálogo*.
2. Observe que a dose está dividida em input de `valor` e select de `unidades` (mg/kg, mg, mL/kg, mL, UI/kg, etc).
3. Modifique o campo "Iniciar em":
  - É possível escolher a data no calendário no seletor de input type date criado.
  - É possível escolher o horário do início (ex: 08:00, 14:00, etc) em um select.
  - Certifique-se que ambos constam na string de instrução gerada.

## 3) Modal Adicionar — Frequência e Duração
1. Na parte de duração do modal, verifique a flag *Uso contínuo*. Ativando-a o tempo some.
2. Na parte de frequência, no campo "Nx", o gerador agora transforma as frequências 1x, 2x, 3x, 4x, 6x, 8x, 12x, 24x ao dia em "a cada N horas" corretamente.
  - Ex: "4x ao dia" -> "a cada 6 horas"

## 4) Controle Especial — Tabela Ajustada
1. Gere uma receita com medicamento do tipo controle especial (ex: Fenobarbital / Tramadol com label preta).
2. Vá para o Print e clique para gerar as "vias" do documento de controle.
3. Observe a tabela no início da linha de receita e certifique-se que não sobram buracos nem espaços desconfigurados.

## 5) "Configurar Médico" — Persistência e Exclusão (Autosave)
1. Vá em *Receituário* > *Configurar Médico*.
2. Preencha algo no CPF, nome, CRMV. 
3. Feche a aba ou vá para outra página sem clicar em "Salvar".
4. Retorne à página *Configurar Médico*. Seus dados persistiram! O local storage armazena `vetius:profile_draft`.
5. Se existirem múltiplos perfis criados, o botão "Excluir" deve aparecer no topo. Teste excluir um perfil em tela (ao haver `> 1` perfil), deve reverter para um dos perfis default.

## Build Check
- Submetido na pipeline o processo `npm run build` confirmando as saídas e tipos em `0 errors`.
