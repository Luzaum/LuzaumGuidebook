# Relatorio do App CRI VET Importado

Data: 2026-03-22

## Integracao realizada

- O CRIVET legado foi removido do host.
- O conteudo do `.zip` foi inserido em `modules/crivet` mantendo a mesma arvore de arquivos do pacote original.
- A rota `/crivet` agora hospeda a build estatica isolada do app importado em `public/apps/crivet`.
- O app principal continua compilando normalmente.

## Revisoes executadas

1. Mapeamento e remocao dos artefatos exclusivos do CRIVET legado.
2. Comparacao estrutural entre o conteudo importado e o `.zip` original.
3. Build isolada do app importado fora do workspace para evitar conflito de PostCSS/Tailwind do host.
4. Build completa do projeto host apos a integracao.

## Estrutura do app importado

- App React + Vite independente.
- 38 arquivos-fonte em `modules/crivet/src`.
- Catalogo local de farmacos em `modules/crivet/src/catalog/drugs`.
- Engine de calculo em `modules/crivet/src/calculation-engine`.
- Regras de seguranca em `modules/crivet/src/safety-rules`.
- Views de UI em `modules/crivet/src/ui/components`.
- Persistencia local apenas via `localStorage`.

## Funcionalidades identificadas

### 1. Calculadora de CRI e bolus

- Cadastro basico de paciente: especie, peso, fase de vida e comorbidades.
- Selecao de farmaco com filtros e busca.
- Configuracao de regime, dose, unidade, apresentacao, diluente, acesso, bomba, volume total e taxa de infusao.
- Calculo de:
  - volume de farmaco
  - volume de diluente
  - concentracao final
  - total de farmaco na solucao
  - dose entregue
  - memoria passo a passo do calculo
- Fluxo de bolus separado do fluxo de CRI.

### 2. Banco de farmacos

- Catalogo local com 12 farmacos:
  - dexmedetomidina
  - diazepam
  - dobutamina
  - dopamina
  - epinefrina
  - fentanil
  - cetamina
  - lidocaina
  - midazolam
  - morfina
  - noradrenalina
  - propofol
- Cada farmaco traz:
  - resumo clinico
  - indicacoes
  - contraindicacoes
  - vantagens e limitacoes
  - problemas comuns e erros de uso
  - metadados de seguranca e preparo
  - efeitos adversos
  - farmacologia detalhada
  - referencias textuais

### 3. Regras de seguranca

- Alertas por comorbidade do paciente.
- Avisos por diluente nao preferencial, nao permitido ou incompatibilidade.
- Avisos operacionais por volume muito pequeno e por preparo inviavel.
- Avisos de acesso central, bomba de seringa, fotoprotecao e linha dedicada.

### 4. Protocolos

- Biblioteca didatica local com protocolos predefinidos.
- Categorias: CRI, Bolus, Sedacao/Pre-medicacao e Emergencia.
- Protocolo exibe drogas, doses, indicacoes, cuidados, especies e notas clinicas.
- Cada farmaco do protocolo pode ser carregado individualmente na calculadora.

### 5. Favoritos e historico

- Salva favoritos no `localStorage`.
- Salva historico no `localStorage`.
- Permite recarregar itens salvos para a calculadora.

### 6. Configuracoes e tema

- Alternancia de tema claro, escuro e sistema.
- Tela de configuracoes com opcoes visuais, notificacoes e idioma.

### 7. Sobre e referencias

- Tela institucional com aviso legal.
- Lista curta de referencias base.
- Secao de contato.

## Problemas encontrados

### Criticos

1. Favoritos e historico quebram ao recarregar calculos
   - Arquivos: `modules/crivet/src/application/services/favoritesService.ts`, `modules/crivet/src/application/hooks/useCalculation.ts`, `modules/crivet/src/safety-rules/evaluator.ts`
   - Causa: o app salva `CalculationInput` completo em `localStorage`, incluindo `drug.alerts` com funcoes `condition`. Ao serializar em JSON, essas funcoes se perdem. Quando o item salvo e recarregado, `evaluateSafety()` chama `alert.condition(...)` e isso deixa de existir.
   - Impacto: recarregar favorito ou historico pode gerar erro em tempo de execucao e comprometer a calculadora.

2. Seletor de diluentes nao cobre todos os diluentes declarados no catalogo
   - Arquivos: `modules/crivet/src/ui/components/CalculationConfig.tsx`, `modules/crivet/src/catalog/drugs/noradrenaline.ts`, `modules/crivet/src/catalog/drugs/propofol.ts`
   - Causa: a UI oferece apenas `NaCl 0.9%`, `Ringer Lactato`, `Glicose 5%`, `Agua para Injecao` e `Nenhum`, mas o modelo aceita mais opcoes, incluindo `Glicose 5% + NaCl 0.9%`.
   - Impacto: alguns preparos validos do proprio catalogo nao podem ser escolhidos na interface.

### Moderados

3. Tela de Configuracoes e majoritariamente cenica
   - Arquivo: `modules/crivet/src/ui/components/SettingsView.tsx`
   - Causa: os estados de notificacao e idioma ficam apenas em memoria local da tela, sem persistencia, e o botao "Salvar Configuracoes" nao executa acao alguma.
   - Impacto: aparenta funcionalidade completa, mas nao grava preferencias reais.

4. Tela Sobre contem link placeholder
   - Arquivo: `modules/crivet/src/ui/components/AboutView.tsx`
   - Causa: "Site Oficial" usa `href="#"`.
   - Impacto: item visualmente clicavel sem destino real.

5. Modulo de Protocolos e parcialmente didatico
   - Arquivo: `modules/crivet/src/ui/components/ProtocolsView.tsx`
   - Causa: a propria tela informa que a carga de multiplos farmacos simultaneamente ainda esta "em desenvolvimento".
   - Impacto: o modulo funciona como referencia e carregamento unitario, nao como montador real de protocolos combinados.

6. Dependencias e promessa de IA nao se refletem no codigo-fonte
   - Arquivos: `modules/crivet/package.json`, `modules/crivet/README.md`, `modules/crivet/vite.config.ts`
   - Causa: o app pede `GEMINI_API_KEY` e inclui `@google/genai` e `express`, mas o codigo-fonte em `src/` nao usa essas integracoes.
   - Impacto: o pacote parece maior e mais complexo do que o necessario e gera expectativa de IA/backend que nao aparece no app entregue.

7. Bundle principal do app importado e grande
   - Evidencia: build gerou `public/apps/crivet/assets/index-DMJ9Gctr.js` com cerca de 555 kB minificados.
   - Impacto: carregamento inicial pode ser mais pesado em conexoes lentas.

## Observacao de integracao

- O codigo do `.zip` precisou ser buildado fora do workspace do host porque o projeto principal possui configuracao PostCSS/Tailwind propria, e isso conflitou com o Tailwind v4 do app importado.
- O conteudo em `modules/crivet` foi mantido igual ao pacote importado; o ajuste ocorreu apenas no ambiente de build da integracao.

## Conclusao

O app importado e funcional como calculadora didatica e banco local de farmacos, com boa interface e regras clinicas basicas. O principal problema real de logica esta em favoritos/historico, que nao preservam corretamente os dados necessarios para reexecutar as regras de seguranca apos serializacao. Fora isso, o modulo de configuracoes ainda esta incompleto, os protocolos sao parcialmente demonstrativos e ha dependencia/documentacao de IA sem uso real no codigo atual.
