# Prompt para novo app de HemogasometriaVET

Crie um novo app web chamado `HemogasometriaVET` integrado visualmente ao ecossistema Vetius.

## Objetivo do produto

Construir um modulo veterinario de hemogasometria para caes e gatos, com foco em:

- interpretacao clinica rapida
- interface responsiva mobile-first
- shell visual igual ao Vetius
- fluxo de analise e ensino no mesmo produto
- possibilidade de evoluir para relatorios, historico, impressao e recursos avancados

## Requisitos visuais e de navegacao

- usar a navbar superior padrao do Vetius
- usar sidebar lateral propria do modulo com navegacao interna
- sidebar com itens:
  - Visao geral
  - Parametros iniciais
  - Resultados
  - Modo quiz
  - Boas praticas
- incluir tambem atalhos visuais para outros modulos relacionados do Vetius
- layout responsivo sem overflow horizontal em mobile
- cards com hierarquia visual clara
- inputs grandes, legiveis e faceis de usar em plantao
- botao principal de acao sempre visivel e claro

## Comportamento inicial

- ao abrir, o app deve iniciar com valores normais predefinidos
- os valores devem mudar automaticamente conforme a especie selecionada
- suportar pelo menos duas especies:
  - cao
  - gato
- trocar a especie deve recalibrar os valores default e as referencias
- deve haver um botao para resetar para os valores normais da especie atual

## Parametros de entrada obrigatorios

### Parametros iniciais

- especie
- temperatura
- FiO2
- tipo de amostra
  - arterial
  - venosa

### Gases sanguineos

- pH
- pCO2
- pO2
- sO2
- cTCO2

### Eletrolitos

- sodio
- potassio
- cloro
- calcio ionizado
- magnesio

### Metabolitos e perfusao

- HCO3
- albumina
- BE
- glicose
- lactato
- hematocrito
- hemoglobina

## Funcoes obrigatorias do app

### 1. Interpretacao automatica

Ao clicar em analisar, o app deve calcular e exibir:

- identificacao da amostra provavel
- status do pH
- disturbio acido-base primario
- avaliacao da ventilacao
- avaliacao da compensacao
- avaliacao da oxigenacao
- eletrólitos e proteinas
- parametros complementares
- anion gap
- diferenciais clinicos

### 2. Alertas clinicos

Gerar alertas automáticos para:

- pH critico
- hipercalemia
- incompatibilidade entre tipo de amostra declarado e pO2 encontrada
- compensacao inadequada
- lactato elevado
- alteracoes relevantes dos parametros complementares

### 3. Faixas de referencia por especie

Cada parametro deve ter:

- valor atual
- unidade
- faixa de referencia
- classificacao
  - normal
  - baixo
  - alto
  - ou classificacao clinica equivalente

### 4. Modo quiz

O app deve ter modo quiz com:

- geracao automatica de casos
- exibicao dos parametros do caso
- perguntas de interpretacao
- resposta por selecao
- correcao imediata
- feedback textual
- explicacao didatica

### 5. Ajuda contextual

Cada area importante deve poder abrir conteudo explicativo, como:

- fisiologia da origem da amostra
- identificacao do disturbio primario
- compensacao
- oxigenacao
- ventilacao
- anion gap
- disturbs eletroliticos principais

### 6. Boas praticas de coleta

Incluir secao expansivel com:

- coleta e armazenamento
- erros comuns
- interferencias pre-analiticas

## Funcionalidades futuras desejadas

Estruture o app para facilitar implementacao futura de:

- geracao de relatorio clinico
- exportacao em PDF
- impressao
- historico de analises
- comparacao serial entre gasometrias
- modo pronto-socorro
- simulador de disturbios mistos
- calculadora de correcoes
- checklist de conduta por alteracao encontrada
- integracao com prontuario
- favoritos e casos salvos

## Regras de UX

- mobile-first de verdade
- sem scroll horizontal
- sem menus escondendo conteudo principal
- sidebar recolhivel no mobile
- targets de toque grandes
- labels sempre visiveis
- estados de focus claros
- bom contraste em dark e light mode
- cards devem empilhar corretamente em telas pequenas

## Requisitos tecnicos

- React
- TypeScript
- Tailwind
- componentes reutilizaveis
- separacao clara entre:
  - logica clinica
  - formulario
  - resultados
  - quiz
  - ajuda contextual
  - shell de navegacao
- evitar componente monolitico gigante
- criar dados de referencia e presets em arquivos separados
- preparar arquitetura para testes

## Resultado esperado

Quero um app novo, do zero, mas aproveitando a logica e as funcoes essenciais do modulo atual, com UI mais madura, responsiva, modular e preparada para crescer.
