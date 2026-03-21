# Relatorio do app de fluidoterapia

## Diagnostico

- O modulo anterior misturava logica clinica, UI e conteudo educativo em um componente unico.
- O fluxo principal mostrava manutencao, reidratacao e bolus, mas sem explicitar bem o metodo de manutencao usado.
- A navegacao por secoes era fraca para atendimento rapido e uso mobile.

## Adaptacao aplicada

- UI/UX repaginada com shell visual novo, cards de alta legibilidade e sidebar esquerda responsiva.
- Navegacao funcional por secoes com destaque ativo e drawer animado no mobile.
- Comparacao de metodos de manutencao baseada na Tabela 9 da AAHA 2024:
  - Cao: 60 mL/kg/dia
  - Cao: 132 x kg^0,75
  - Gato: 40 mL/kg/dia
  - Gato: 80 x kg^0,75
  - Ambos: 30 x kg + 70
  - Pediatrico: 3x dose adulta em cao e 2,5x em gato, com base explicita
- Inclusao das saidas extras pedidas para 1x manutencao, 1,5x manutencao e 2x manutencao.
- Reorganizacao do plano em manutencao, reidratacao, perdas continuas, taxa inicial e taxa apos reidratacao.
- Inclusao de metodos AAHA para ressuscitacao, reidratacao, SC, enteral, anestesia e solucao hipertonicca.

## Base clinica incorporada

Fonte usada: `C:/Users/Resgate/Downloads/aaha-article-p131.pdf`

- Ressuscitacao: gatos 5 a 10 mL/kg e caes 15 a 20 mL/kg em 15 a 30 min.
- Reidratacao: deficit calculado e distribuido em 12 a 24 horas.
- Subcutanea: 20 a 30 mL/kg, uma ou duas vezes ao dia, com 10 a 20 mL/kg por sitio.
- Anestesia: 5 mL/kg/h em cao e 3 a 5 mL/kg/h em gato.
- TCE: hipertonicca 3 a 7,5% em 2 a 6 mL/kg por 10 a 15 minutos quando indicada.
- Monitorizacao: peso corporal, entradas, saidas, pulsos, TPC, respiracao, PA, estado mental e sinais de sobrecarga.

## Planejamento para ser um app confiavel

1. Separar choque, desidratacao, manutencao e perdas continuas.
2. Exibir a formula usada em cada calculo.
3. Tratar comorbidades como limitadores de dose.
4. Forcar reavaliacao antes de repetir bolus.
5. Manter rastreio visual de entradas, saidas e peso corporal.
6. Tornar visiveis os sinais de sobrecarga logo no fluxo principal.

## Limites

- O app continua sendo suporte ao raciocinio, nao substituto de exame fisico, eletrólitos, pressao arterial e producao urinaria.
- Ajustes de sodio, potassio, glicose, coloides e AKI oligurica seguem dependentes de avaliacao clinica direta.
